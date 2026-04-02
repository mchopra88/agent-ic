const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = function() {
  const entries = [];

  // Try multiple repo locations: homeeasy-hq (local dev), then current repo
  const repoDirs = [
    '/Users/mukundchopra/homeeasy-hq',
    path.resolve(__dirname, '../..')
  ];

  // Also check for pre-generated data (for CI/CD where homeeasy-hq doesn't exist)
  const pregenPath = path.resolve(__dirname, 'journal-cache.json');
  let usePregen = false;

  for (const repoDir of repoDirs) {
    try {
      // Verify it's a git repo
      execSync('git rev-parse --git-dir', { cwd: repoDir, encoding: 'utf-8', timeout: 5000 });

      const log = execSync(
        `git log --all --since="90 days ago" --pretty=format:"%H|%ai|%s" --no-merges`,
        { cwd: repoDir, encoding: 'utf-8', timeout: 10000 }
      );

      const lines = log.trim().split('\n').filter(Boolean);
      if (lines.length === 0) continue;

      const byDate = {};
      for (const line of lines) {
        const parts = line.split('|');
        if (parts.length < 3) continue;
        const hash = parts[0].substring(0, 7);
        const dateStr = parts[1].substring(0, 10);
        const message = parts.slice(2).join('|');

        if (!byDate[dateStr]) byDate[dateStr] = [];

        let tag = 'build';
        const msg = message.toLowerCase();
        if (msg.includes('fix') || msg.includes('hotfix') || msg.includes('bug')) tag = 'fix';
        else if (msg.includes('deploy') || msg.includes('release') || msg.includes('rollout')) tag = 'deploy';
        else if (msg.includes('incident') || msg.includes('revert') || msg.includes('emergency')) tag = 'incident';
        else if (msg.includes('feat') || msg.includes('add') || msg.includes('implement') || msg.includes('new')) tag = 'feature';

        byDate[dateStr].push({ hash, message, tag });
      }

      const dates = Object.keys(byDate).sort().reverse();
      for (const date of dates) {
        const commits = byDate[date];
        const tags = [...new Set(commits.map(c => c.tag))];
        entries.push({
          date,
          displayDate: formatDate(date),
          commits,
          commitCount: commits.length,
          tags,
          summary: generateSummary(commits)
        });
      }

      // Cache the data for CI builds
      if (entries.length > 0) {
        try { fs.writeFileSync(pregenPath, JSON.stringify(entries, null, 2)); } catch(e) {}
      }

      break; // Found a working repo
    } catch (e) {
      continue;
    }
  }

  // If no git repo worked, try pre-generated cache
  if (entries.length === 0) {
    try {
      if (fs.existsSync(pregenPath)) {
        return JSON.parse(fs.readFileSync(pregenPath, 'utf-8'));
      }
    } catch(e) {}
  }

  return entries;
};

function formatDate(dateStr) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const d = new Date(dateStr + 'T12:00:00');
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function generateSummary(commits) {
  const fixes = commits.filter(c => c.tag === 'fix').length;
  const features = commits.filter(c => c.tag === 'feature').length;
  const deploys = commits.filter(c => c.tag === 'deploy').length;
  const incidents = commits.filter(c => c.tag === 'incident').length;

  const parts = [];
  if (features > 0) parts.push(`${features} feature${features > 1 ? 's' : ''}`);
  if (fixes > 0) parts.push(`${fixes} fix${fixes > 1 ? 'es' : ''}`);
  if (deploys > 0) parts.push(`${deploys} deploy${deploys > 1 ? 's' : ''}`);
  if (incidents > 0) parts.push(`${incidents} incident${incidents > 1 ? 's' : ''}`);

  if (parts.length === 0) return `${commits.length} commit${commits.length > 1 ? 's' : ''}`;
  return parts.join(', ');
}
