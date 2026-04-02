/**
 * Fetch commits from all production repos via GitHub API.
 * Runs in GitHub Actions with JOURNAL_PAT secret for cross-org access.
 * Generates src/_data/journal-cache.json for the 11ty build.
 */

import { writeFileSync, readFileSync } from 'fs';

const REPOS = [
  // Core production
  { owner: 'homeeasy-repo', repo: 'Agentic-Client-Service', label: 'Locator + Landlord Rep' },
  { owner: 'homeeasy-repo', repo: 'homeeasy-hq', label: 'homeeasy-hq' },
  { owner: 'homeeasy-repo', repo: 'homeeasy-site-v2', label: 'HomeEasy Site' },
  { owner: 'homeeasy-repo', repo: 'Agentic-Service-v3', label: 'Agent Service v3' },
  { owner: 'homeeasy-repo', repo: 'Twilio-Service-Homeeasy', label: 'Twilio Service' },
  { owner: 'homeeasy-repo', repo: 'SLA-AGENTIC-CODEBASE', label: 'SLA Agentic' },
  { owner: 'homeeasy-repo', repo: 'Homeeasy_TextingService_v1', label: 'Texting Service' },
  { owner: 'homeeasy-repo', repo: 'agentic-cognee-service', label: 'Cognee Service' },
  { owner: 'homeeasy-repo', repo: 'cooperating_voice_agent', label: 'Voice Agent' },
  { owner: 'homeeasy-repo', repo: 'cooperating_email_agent', label: 'Email Agent' },
  { owner: 'homeeasy-repo', repo: 'Inventory_trigger', label: 'Inventory Trigger' },
  { owner: 'homeeasy-repo', repo: 'Streamlit-HomeEasy', label: 'Streamlit Dashboard' },
  { owner: 'homeeasy-repo', repo: 'leads-monitoring-dashboard', label: 'Leads Dashboard' },
  { owner: 'homeeasy-repo', repo: 'sales_progression_dashboard', label: 'Sales Dashboard' },
  // Insurance
  { owner: 'JamboreeInsurance', repo: 'ken-agent', label: 'Ken Insurance' },
  // This site
  { owner: 'mchopra88', repo: 'agent-ic', label: 'agent-ic' },
];

const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const SINCE = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

async function fetchCommits(owner, repo) {
  const commits = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?since=${SINCE}&per_page=${perPage}&page=${page}`;
    const headers = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

    try {
      const resp = await fetch(url, { headers });
      if (!resp.ok) {
        console.error(`  ${owner}/${repo}: HTTP ${resp.status}`);
        break;
      }
      const data = await resp.json();
      if (!Array.isArray(data) || data.length === 0) break;

      for (const c of data) {
        // Skip merge commits
        if (c.parents && c.parents.length > 1) continue;
        commits.push({
          hash: c.sha.substring(0, 7),
          date: c.commit.author.date.substring(0, 10),
          message: c.commit.message.split('\n')[0], // first line only
        });
      }

      if (data.length < perPage) break;
      page++;
    } catch (e) {
      console.error(`  ${owner}/${repo}: ${e.message}`);
      break;
    }
  }

  return commits;
}

function categorize(msg) {
  const m = msg.toLowerCase();
  if (m.includes('fix') || m.includes('hotfix') || m.includes('bug')) return 'fix';
  if (m.includes('deploy') || m.includes('release') || m.includes('rollout')) return 'deploy';
  if (m.includes('incident') || m.includes('revert') || m.includes('emergency')) return 'incident';
  if (m.includes('feat') || m.includes('add') || m.includes('implement') || m.includes('new')) return 'feature';
  return 'build';
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
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

async function main() {
  console.log(`Fetching commits since ${SINCE.substring(0, 10)} from ${REPOS.length} repos...`);

  const allCommits = [];

  for (const { owner, repo, label } of REPOS) {
    const commits = await fetchCommits(owner, repo);
    console.log(`  ${label}: ${commits.length} commits`);
    for (const c of commits) {
      allCommits.push({
        hash: c.hash,
        dateStr: c.date,
        message: c.message,
        tag: categorize(c.message),
        repo: label,
      });
    }
  }

  // Deduplicate by hash
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
      summary: generateSummary(commits, repos),
    });
  }

  console.log(`\nTotal: ${unique.length} unique commits across ${dates.length} days`);

  const outPath = 'src/_data/journal-cache.json';
  writeFileSync(outPath, JSON.stringify(entries, null, 2));
  console.log(`Written to ${outPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
