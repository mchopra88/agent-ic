const { execSync } = require('child_process');

module.exports = function() {
  // Get git log from the main homeeasy-hq repo for real build data
  const repoDir = '/Users/mukundchopra/homeeasy-hq';

  // Try to get recent commits from all repos
  const entries = [];

  try {
    // Get last 60 days of commits from homeeasy-hq
    const log = execSync(
      `git log --all --since="60 days ago" --pretty=format:"%H|%ai|%s" --no-merges`,
      { cwd: repoDir, encoding: 'utf-8', timeout: 10000 }
    );

    const lines = log.trim().split('\n').filter(Boolean);

    // Group by date
    const byDate = {};
    for (const line of lines) {
      const parts = line.split('|');
      if (parts.length < 3) continue;
      const hash = parts[0].substring(0, 7);
      const dateStr = parts[1].substring(0, 10); // YYYY-MM-DD
      const message = parts.slice(2).join('|');

      if (!byDate[dateStr]) {
        byDate[dateStr] = [];
      }

      // Categorize the commit
      let tag = 'build';
      const msg = message.toLowerCase();
      if (msg.includes('fix') || msg.includes('hotfix') || msg.includes('bug')) tag = 'fix';
      else if (msg.includes('deploy') || msg.includes('release') || msg.includes('rollout')) tag = 'deploy';
      else if (msg.includes('incident') || msg.includes('revert') || msg.includes('emergency')) tag = 'incident';
      else if (msg.includes('feat') || msg.includes('add') || msg.includes('implement') || msg.includes('new')) tag = 'feature';

      byDate[dateStr].push({ hash, message, tag });
    }

    // Convert to sorted array
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
  } catch (e) {
    // If git log fails, return empty
    entries.push({
      date: new Date().toISOString().substring(0, 10),
      displayDate: 'Today',
      commits: [{ hash: '0000000', message: 'Journal data unavailable — git log failed', tag: 'build' }],
      commitCount: 0,
      tags: ['build'],
      summary: 'Build data unavailable in this environment.'
    });
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
