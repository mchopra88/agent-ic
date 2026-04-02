const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = function() {
  const allCommits = [];
  const pregenPath = path.resolve(__dirname, 'journal-cache.json');

  // All production repositories — the REAL work, not just this site
  const repoDirs = [
    { dir: '/Users/mukundchopra/homeeasy-hq', label: 'homeeasy-hq' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/Agentic-Client-Service', label: 'Locator + Landlord Rep' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/Agentic-Service-v3', label: 'Agent Service v3' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/Twilio-Service-Homeeasy', label: 'Twilio Service' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/SLA-AGENTIC-CODEBASE', label: 'SLA Agentic' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/homeeasy-site-v2', label: 'HomeEasy Site' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/Homeeasy_TextingService_v1', label: 'Texting Service' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/jamboree-insurance', label: 'Ken Insurance' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/cooperating_voice_agent', label: 'Voice Agent' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/cooperating_email_agent', label: 'Email Agent' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/agentic-cognee-service', label: 'Cognee Service' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/Inventory_trigger', label: 'Inventory Trigger' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/Streamlit-HomeEasy', label: 'Streamlit Dashboard' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/leads-monitoring-dashboard', label: 'Leads Dashboard' },
    { dir: '/Users/mukundchopra/homeeasy-hq/repos/sales_progression_dashboard', label: 'Sales Dashboard' },
    { dir: path.resolve(__dirname, '../..'), label: 'agent-ic' },
  ];

  let foundAny = false;

  for (const { dir, label } of repoDirs) {
    try {
      execSync('git rev-parse --git-dir', { cwd: dir, encoding: 'utf-8', timeout: 5000 });

      const log = execSync(
        `git log --all --since="365 days ago" --pretty=format:"%H|%ai|%s" --no-merges`,
        { cwd: dir, encoding: 'utf-8', timeout: 30000 }
      );

      const lines = log.trim().split('\n').filter(Boolean);
      if (lines.length === 0) continue;

      foundAny = true;
      for (const line of lines) {
        const parts = line.split('|');
        if (parts.length < 3) continue;
        const hash = parts[0].substring(0, 7);
        const dateStr = parts[1].substring(0, 10);
        const message = parts.slice(2).join('|');

        let tag = 'build';
        const msg = message.toLowerCase();
        if (msg.includes('fix') || msg.includes('hotfix') || msg.includes('bug')) tag = 'fix';
        else if (msg.includes('deploy') || msg.includes('release') || msg.includes('rollout')) tag = 'deploy';
        else if (msg.includes('incident') || msg.includes('revert') || msg.includes('emergency')) tag = 'incident';
        else if (msg.includes('feat') || msg.includes('add') || msg.includes('implement') || msg.includes('new')) tag = 'feature';

        allCommits.push({ hash, dateStr, message, tag, repo: label });
      }
    } catch (e) {
      continue;
    }
  }

  // Deduplicate by hash (same commit can appear in nested repos)
  const seen = new Set();
  const unique = [];
  for (const c of allCommits) {
    if (!seen.has(c.hash)) {
      seen.add(c.hash);
      unique.push(c);
    }
  }

  // Group by date
  const byDate = {};
  for (const c of unique) {
    if (!byDate[c.dateStr]) byDate[c.dateStr] = [];
    byDate[c.dateStr].push(c);
  }

  const entries = [];
  const dates = Object.keys(byDate).sort().reverse();
  for (const date of dates) {
    const commits = byDate[date];
    const tags = [...new Set(commits.map(c => c.tag))];
    const repos = [...new Set(commits.map(c => c.repo))];
    entries.push({
      date,
      displayDate: formatDate(date),
      commits,
      commitCount: commits.length,
      tags,
      repos,
      summary: generateSummary(commits, repos)
    });
  }

  // Cache for CI builds
  if (entries.length > 0) {
    try { fs.writeFileSync(pregenPath, JSON.stringify(entries, null, 2)); } catch(e) {}
  }

  // If nothing found locally, try cache
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

function generateSummary(commits, repos) {
  const fixes = commits.filter(c => c.tag === 'fix').length;
  const features = commits.filter(c => c.tag === 'feature').length;
  const deploys = commits.filter(c => c.tag === 'deploy').length;
  const incidents = commits.filter(c => c.tag === 'incident').length;

  const parts = [];
  if (features > 0) parts.push(`${features} feature${features > 1 ? 's' : ''}`);
  if (fixes > 0) parts.push(`${fixes} fix${fixes > 1 ? 'es' : ''}`);
  if (deploys > 0) parts.push(`${deploys} deploy${deploys > 1 ? 's' : ''}`);
  if (incidents > 0) parts.push(`${incidents} incident${incidents > 1 ? 's' : ''}`);

  const summary = parts.length > 0 ? parts.join(', ') : `${commits.length} commits`;
  const repoStr = repos.length > 1 ? ` across ${repos.length} repos` : ` in ${repos[0]}`;
  return summary + repoStr;
}
