/**
 * Fetch commits from ALL production repos via GitHub API.
 * Dynamically discovers repos in the homeeasy-repo org.
 * Runs in GitHub Actions with JOURNAL_PAT secret for cross-org access.
 * Generates src/_data/journal-cache.json for the 11ty build.
 */

import { writeFileSync } from 'fs';

const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const SINCE = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Extra repos outside the homeeasy-repo org
const EXTRA_REPOS = [
  { owner: 'JamboreeInsurance', repo: 'ken-agent' },
  { owner: 'mchopra88', repo: 'agent-ic' },
];

// Map repo names to business unit labels
function labelRepo(repoName) {
  const n = repoName.toLowerCase();

  // Apartment Locator
  if (n.includes('agent-v4') || n.includes('amy-agent-v4')) return 'Locator Agent (V4)';
  if (n.includes('agent-v3') || n.includes('amy-agent-v3') || n === 'agentic-service-v3') return 'Locator Agent (V3)';
  if (n === 'agentic-client-service') return 'Locator + Landlord Rep';
  if (n.includes('inventory') || n.includes('sparkapt') || n.includes('zillow') || n.includes('apartments.com')) return 'Inventory & Scraping';
  if (n.includes('cooperating_voice') || n.includes('voice_agent') || n.includes('cartesia')) return 'Voice Agent';
  if (n.includes('cooperating_email') || n.includes('email_agent')) return 'Email Agent';

  // Landlord Rep
  if (n === 'landlord-rep') return 'Landlord Rep';
  if (n.includes('bluelake')) return 'Blue Lake';
  if (n.includes('sla-agentic') || n.includes('sla_agentic')) return 'SLA Agentic';

  // Ken Insurance
  if (n === 'ken-agent' || n.includes('jamboree')) return 'Ken Insurance';

  // CRM & Dashboard
  if (n.includes('crm') || n === 'homeeasy-crm') return 'CRM';
  if (n.includes('streamlit') || n.includes('dashboard') || n.includes('reporting')) return 'Dashboards';
  if (n.includes('leads-monitoring') || n.includes('sales_progression')) return 'Dashboards';

  // Infrastructure
  if (n.includes('twilio') || n.includes('texting')) return 'Twilio / SMS';
  if (n.includes('cognee')) return 'Cognee Service';
  if (n.includes('database') || n.includes('readonly-api')) return 'Database';
  if (n.includes('cloud_functions')) return 'Cloud Functions';

  // Site
  if (n === 'homeeasy-site-v2' || n === 'homeeasy_blog_website') return 'HomeEasy Site';
  if (n === 'agent-ic') return 'agent-ic';
  if (n === 'homeeasy-hq') return 'homeeasy-hq';

  // Everything else
  return repoName;
}

async function apiFetch(url) {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;
  return fetch(url, { headers });
}

async function discoverOrgRepos(org) {
  const repos = [];
  let page = 1;
  while (true) {
    const resp = await apiFetch(`https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}&sort=pushed&direction=desc`);
    if (!resp.ok) {
      console.error(`Failed to list ${org} repos: HTTP ${resp.status}`);
      break;
    }
    const data = await resp.json();
    if (!Array.isArray(data) || data.length === 0) break;
    for (const r of data) {
      repos.push({ owner: org, repo: r.name, pushedAt: r.pushed_at });
    }
    if (data.length < 100) break;
    page++;
  }
  return repos;
}

async function fetchCommits(owner, repo) {
  const commits = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?since=${SINCE}&per_page=${perPage}&page=${page}`;
    try {
      const resp = await apiFetch(url);
      if (!resp.ok) {
        if (resp.status !== 409) { // 409 = empty repo
          console.error(`  ${owner}/${repo}: HTTP ${resp.status}`);
        }
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
          message: c.commit.message.split('\n')[0],
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
  if (m.includes('deploy') || m.includes('release') || m.includes('rollout')) return 'deploy';
  if (m.includes('incident') || m.includes('revert') || m.includes('emergency') || m.includes('rollback')) return 'incident';
  if (m.includes('fix') || m.includes('hotfix') || m.includes('bug') || m.includes('patch')) return 'fix';
  if (m.includes('feat') || m.includes('add') || m.includes('implement') || m.includes('new') || m.includes('introduce')) return 'feature';
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
  if (!TOKEN) {
    console.error('WARNING: No GH_TOKEN or GITHUB_TOKEN set. API rate limit will be 60 req/hr.');
  }

  // Step 1: Discover ALL repos in the org
  console.log('Discovering repos in homeeasy-repo org...');
  const orgRepos = await discoverOrgRepos('homeeasy-repo');
  console.log(`Found ${orgRepos.length} repos in homeeasy-repo`);

  // Add extra repos (other orgs/users)
  const allRepos = [...orgRepos, ...EXTRA_REPOS.map(r => ({ ...r, pushedAt: null }))];

  // Skip repos not pushed in the last 365 days
  const cutoff = SINCE.substring(0, 10);
  const activeRepos = allRepos.filter(r => {
    if (!r.pushedAt) return true; // always include extras
    return r.pushedAt.substring(0, 10) >= cutoff;
  });
  console.log(`${activeRepos.length} repos active in the last 365 days\n`);

  // Step 2: Fetch commits from each
  const allCommits = [];
  for (const { owner, repo } of activeRepos) {
    const label = labelRepo(repo);
    const commits = await fetchCommits(owner, repo);
    if (commits.length > 0) {
      console.log(`  ${label} (${repo}): ${commits.length} commits`);
    }
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

  // Step 3: Deduplicate by hash
  const seen = new Set();
  const unique = [];
  for (const c of allCommits) {
    if (!seen.has(c.hash)) {
      seen.add(c.hash);
      unique.push(c);
    }
  }

  // Step 4: Group by date
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

  const totalReposWithCommits = new Set(unique.map(c => c.repo)).size;
  console.log(`\nTotal: ${unique.length} unique commits across ${dates.length} days from ${totalReposWithCommits} repos`);

  const outPath = 'src/_data/journal-cache.json';
  writeFileSync(outPath, JSON.stringify(entries, null, 2));
  console.log(`Written to ${outPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
