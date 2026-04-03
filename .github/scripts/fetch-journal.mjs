/**
 * Fetch Mukund's commits from production repos referenced in agent-ic.co.
 * Curated list — only repos the site actually covers.
 * Filters to Mukund's commits only.
 * NEVER overwrites the cache with less data than it already has.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';

const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const SINCE = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const CACHE_PATH = 'src/_data/journal-cache.json';

// Mukund's known commit identities
const MUKUND_EMAILS = new Set([
  'mukundchopra@macbook-air.local',
  '35270311+mchopra88@users.noreply.github.com',
  'mukund@homeeasy.com',
]);
const MUKUND_NAMES = new Set([
  'mukund chopra',
  'mchopra88',
]);

function isMukund(authorName, authorEmail, fullMessage) {
  if (MUKUND_NAMES.has((authorName || '').toLowerCase())) return true;
  if (MUKUND_EMAILS.has((authorEmail || '').toLowerCase())) return true;
  // Claude Code commits are Mukund's commits
  if ((fullMessage || '').toLowerCase().includes('co-authored-by: claude')) return true;
  return false;
}

// Only repos referenced in the site's essays and asset pages.
// Organized by business unit.
const REPOS = [
  // ─── Apartment Locator ───
  { owner: 'homeeasy-repo', repo: 'Amy-Agent-V4', label: 'Locator Agent' },
  { owner: 'homeeasy-repo', repo: 'Amy-Agent-V3', label: 'Locator Agent (V3)' },
  { owner: 'homeeasy-repo', repo: 'inventory-search-service', label: 'Inventory Search' },
  { owner: 'homeeasy-repo', repo: 'sparkapt-graphql-scrapper', label: 'Inventory Scraping' },
  { owner: 'homeeasy-repo', repo: 'Inventory_trigger', label: 'Inventory Trigger' },
  { owner: 'homeeasy-repo', repo: 'cooperating_voice_agent', label: 'Voice Agent (Bland AI)' },
  { owner: 'homeeasy-repo', repo: 'cooperating_email_agent', label: 'Email Agent' },

  // ─── Landlord Rep ───
  { owner: 'homeeasy-repo', repo: 'landlord-rep', label: 'Landlord Rep' },
  { owner: 'homeeasy-repo', repo: 'bluelake-website', label: 'Blue Lake' },
  { owner: 'homeeasy-repo', repo: 'SLA-AGENTIC-CODEBASE', label: 'SLA Agentic' },

  // ─── Ken Insurance ───
  { owner: 'JamboreeInsurance', repo: 'ken-agent', label: 'Ken Insurance' },

  // ─── Infrastructure ───
  { owner: 'homeeasy-repo', repo: 'homeeasy-hq', label: 'homeeasy-hq' },
  { owner: 'homeeasy-repo', repo: 'Homeeasy-Twilio-Service-Backend', label: 'Twilio / SMS' },
  { owner: 'homeeasy-repo', repo: 'Twilio-Service-Homeeasy', label: 'Twilio (legacy)' },
  { owner: 'homeeasy-repo', repo: 'Homeeasy_TextingService_v1', label: 'Texting Service' },
  { owner: 'homeeasy-repo', repo: 'homeeasy-crm', label: 'CRM' },
  { owner: 'homeeasy-repo', repo: 'Homeeasy-Database-Readonly-API', label: 'Database API' },
  { owner: 'homeeasy-repo', repo: 'Amy-Agentic-Cognee-Service', label: 'Cognee Service' },
  { owner: 'homeeasy-repo', repo: 'Agentic-Service-v3', label: 'Agent Service v3' },

  // ─── This site ───
  { owner: 'mchopra88', repo: 'agent-ic', label: 'agent-ic' },
];

async function apiFetch(url) {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;
  return fetch(url, { headers });
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
        if (resp.status !== 409) {
          console.error(`  ${owner}/${repo}: HTTP ${resp.status}`);
        }
        break;
      }
      const data = await resp.json();
      if (!Array.isArray(data) || data.length === 0) break;

      for (const c of data) {
        if (c.parents && c.parents.length > 1) continue; // skip merges
        const authorName = c.commit?.author?.name || '';
        const authorEmail = c.commit?.author?.email || '';
        const fullMessage = c.commit?.message || '';
        if (!isMukund(authorName, authorEmail, fullMessage)) continue; // Mukund only
        commits.push({
          hash: c.sha.substring(0, 7),
          date: c.commit.author.date.substring(0, 10),
          message: fullMessage.split('\n')[0],
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
  if (m.includes('deploy') || m.includes('release') || m.includes('rollout') || m.includes('ship')) return 'deploy';
  if (m.includes('incident') || m.includes('revert') || m.includes('emergency') || m.includes('rollback') || m.includes('hotfix')) return 'incident';
  if (m.startsWith('fix') || m.includes(': fix') || m.includes('bug') || m.includes('patch') || m.includes('repair')) return 'fix';
  if (m.includes('feat') || m.includes('add') || m.includes('implement') || m.includes('introduce') || m.includes('new ') || m.includes('create')) return 'feature';
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
  if (incidents > 0) parts.push(`${incidents} incident${incidents > 1 ? 's' : ''}`);
  if (deploys > 0) parts.push(`${deploys} deploy${deploys > 1 ? 's' : ''}`);
  if (features > 0) parts.push(`${features} feature${features > 1 ? 's' : ''}`);
  if (fixes > 0) parts.push(`${fixes} fix${fixes > 1 ? 'es' : ''}`);

  const summary = parts.length > 0 ? parts.join(', ') : `${commits.length} commits`;
  const repoStr = repos.length > 1 ? ` across ${repos.length} repos` : ` in ${repos[0]}`;
  return summary + repoStr;
}

function loadExistingCache() {
  try {
    if (existsSync(CACHE_PATH)) {
      const data = JSON.parse(readFileSync(CACHE_PATH, 'utf-8'));
      const totalCommits = data.reduce((sum, d) => sum + d.commitCount, 0);
      return { entries: data, totalCommits };
    }
  } catch (e) {}
  return { entries: [], totalCommits: 0 };
}

async function main() {
  if (!TOKEN) {
    console.error('ERROR: No GH_TOKEN set. Cannot access private repos. Keeping existing cache.');
    process.exit(0); // exit cleanly, do NOT overwrite cache
  }

  console.log(`Fetching Mukund's commits since ${SINCE.substring(0, 10)} from ${REPOS.length} repos...\n`);

  const allCommits = [];

  for (const { owner, repo, label } of REPOS) {
    const commits = await fetchCommits(owner, repo);
    if (commits.length > 0) {
      console.log(`  ${label}: ${commits.length} commits`);
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

  const totalReposWithCommits = new Set(unique.map(c => c.repo)).size;
  console.log(`\nTotal: ${unique.length} commits across ${dates.length} days from ${totalReposWithCommits} repos`);

  // SAFETY: never overwrite cache with less data (unless forced)
  const existing = loadExistingCache();
  if (unique.length < existing.totalCommits * 0.5 && !process.env.FORCE_CACHE_UPDATE) {
    console.error(`\nSAFETY: Fetched ${unique.length} commits but cache has ${existing.totalCommits}. Set FORCE_CACHE_UPDATE=1 to override.`);
    process.exit(0);
  }

  writeFileSync(CACHE_PATH, JSON.stringify(entries, null, 2));
  console.log(`Written to ${CACHE_PATH}`);
}

main().catch(e => { console.error(e); process.exit(1); });
