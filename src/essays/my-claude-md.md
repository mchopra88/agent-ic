---
layout: essay.njk
title: "My CLAUDE.md"
order: 29
date: 2026-03-15
---

Every AI coding tool reads a file called CLAUDE.md at the root of your project. It's supposed to be a brief style guide — maybe some formatting preferences, a note about which test framework to use. Mine is 207 lines long. I have seven of them across different services, totaling 1,334 lines. They are the institutional knowledge of my entire engineering organization.

My engineering organization is me.

The file is 1,334 lines across seven services. My last lease agreement was 12 pages. The AI's operating manual is longer than the contract that governs my apartment.

<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:2rem 0;">
  <style>
    .cm-title { fill:#888; font-family:'Cormorant Garamond',Georgia,serif; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; text-anchor:middle; }
    .cm-label { fill:#e8e4de; font-family:'Cormorant Garamond',Georgia,serif; font-size:11px; text-anchor:middle; }
    .cm-sm { fill:#666; font-family:'Cormorant Garamond',Georgia,serif; font-size:9px; text-anchor:middle; }
    .cm-box { fill:#0a0a0a; stroke:#333; stroke-width:1; rx:4; }
    .cm-core { fill:#0a1a0a; stroke:#336633; stroke-width:1.5; rx:4; }
    .cm-conn { stroke:#333; stroke-width:0.8; fill:none; }
  </style>
  <text x="340" y="18" class="cm-title">The CLAUDE.md Constitution</text>
  <!-- Core box -->
  <rect x="245" y="35" width="190" height="60" class="cm-core"/>
  <text x="340" y="60" class="cm-label" style="fill:#88cc88; font-weight:600;">CLAUDE.md</text>
  <text x="340" y="78" class="cm-sm" style="fill:#88cc88;">207 lines × 7 services = 1,334 lines</text>
  <!-- Branch: Hooks -->
  <line x1="280" y1="95" x2="120" y2="140" class="cm-conn"/>
  <rect x="30" y="130" width="180" height="70" class="cm-box"/>
  <text x="120" y="152" class="cm-label">8 Hooks</text>
  <text x="120" y="168" class="cm-sm">4 event types</text>
  <text x="120" y="182" class="cm-sm">Deterministic — cannot be skipped</text>
  <text x="120" y="195" class="cm-sm" style="fill:#cc6666;">Exit 2 = wall, not warning</text>
  <!-- Branch: Skills -->
  <line x1="340" y1="95" x2="340" y2="140" class="cm-conn"/>
  <rect x="250" y="140" width="180" height="70" class="cm-box"/>
  <text x="340" y="162" class="cm-label">12 Skills</text>
  <text x="340" y="178" class="cm-sm">Loaded contextually</text>
  <text x="340" y="192" class="cm-sm">sniff-lead, verify-commission,</text>
  <text x="340" y="204" class="cm-sm">payment-search, building-intel...</text>
  <!-- Branch: Commands -->
  <line x1="400" y1="95" x2="560" y2="140" class="cm-conn"/>
  <rect x="470" y="130" width="180" height="70" class="cm-box"/>
  <text x="560" y="152" class="cm-label">7 Commands</text>
  <text x="560" y="168" class="cm-sm">/session-start, /verify-deploy,</text>
  <text x="560" y="182" class="cm-sm">/fresh-eyes, /session-save...</text>
  <text x="560" y="195" class="cm-sm" style="fill:#8888cc;">Human-invocable workflows</text>
  <!-- Branch: Session Memory -->
  <line x1="120" y1="200" x2="120" y2="240" class="cm-conn"/>
  <rect x="30" y="240" width="180" height="50" class="cm-box"/>
  <text x="120" y="262" class="cm-label">119 Session Files</text>
  <text x="120" y="278" class="cm-sm">Auto-saved. Cannot be forgotten.</text>
  <!-- Branch: Laws -->
  <line x1="340" y1="210" x2="340" y2="240" class="cm-conn"/>
  <rect x="250" y="240" width="180" height="50" class="cm-box"/>
  <text x="340" y="262" class="cm-label">Cross-Cutting Laws</text>
  <text x="340" y="278" class="cm-sm">Bottom-up, anti-determinism, brand</text>
  <!-- Branch: Ralph -->
  <line x1="560" y1="200" x2="560" y2="240" class="cm-conn"/>
  <rect x="470" y="240" width="180" height="50" class="cm-box" style="stroke:#cc6666;"/>
  <text x="560" y="262" class="cm-label">Ralph Wiggum Loop</text>
  <text x="560" y="278" class="cm-sm" style="fill:#cc6666;">"I'm in danger" — 178 lines of bash</text>
  <!-- Punchline -->
  <text x="340" y="325" class="cm-sm" style="fill:#888; font-style:italic;">Most CLAUDE.md files say "use tabs not spaces."</text>
  <text x="340" y="342" class="cm-sm" style="fill:#888; font-style:italic;">Mine says "do NOT lie even if you think you should exit."</text>
</svg>

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
## Who I Am
Mukund Chopra. I run HomeEasy - apartment locator
+ renters insurance business.
AI is taking over operations. Humans are API
endpoints for calls and tours only.

## Teaching Mode (ALWAYS ON)
Mukund is a 15-year founder running an AI agent team
with no human engineers.
Explain EVERYTHING: what you're doing, why, define terms,
show architecture, discuss trade-offs.
Don't dumb it down. He's smart and learns fast.
Just don't assume DevOps/SRE knowledge.
If he corrects you — learn from it,
update CLAUDE.md/MEMORY.md, never repeat.
</pre>

"Teaching mode" exists because I'm not an engineer by training. I came from finance and operations — Citibank, Groupon, venture. When I started building with AI, I needed the system to explain what it was doing, not just do it. Every deploy, every database migration, every infrastructure choice — I needed to understand it well enough to debug it at 2 AM when it breaks, because there's no one else to call.

"If he corrects you — learn from it, update CLAUDE.md/MEMORY.md, never repeat." That line is doing a lot of work. It means the system gets smarter every time I yell at it. I correct a wrong assumption about how GKE rollbacks work, and the CLAUDE.md updates, and next session it knows. The correction persists. The human memory is unreliable; the file is permanent.

## Everyone is Building This Now

In March 2026, [Andrej Karpathy open-sourced autoResearch](https://github.com/karpathy/autoresearch) — an AI system that ran 700 experiments in 2 days on a single GPU, discovering 20 training optimizations autonomously. The architecture: a markdown prompt gives the agent a goal, the agent modifies code, runs experiments, evaluates results, and loops. The AI does the scientific method at machine speed.

Karpathy himself admitted his manual coding skills are ["atrophying"](https://www.nextbigfuture.com/2026/03/andrej-karpathy-on-code-agents-autoresearch-and-the-self-improvement-loopy-era-of-ai.html) because agents crossed a coherence threshold around December 2025. "We are in agentic engineering," he wrote. "Humans no longer write most code."

[Garry Tan](https://www.sitepoint.com/gstack-garry-tan-claude-code/) — Y Combinator president — open-sourced gstack, a Claude Code workflow that creates role-based personas through custom slash commands. Instead of one generic AI assistant, you get a structured development team: a product strategist, an architect, a deployer, each with its own constraints and priorities.

These are smart people building smart systems. But here's what I notice when I look at autoResearch and gstack: they're clean-room architectures. Academic. Well-organized. Sensible.

Mine is covered in scars.

## The Rules Get Harder as You Scroll Down

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
## Database Safety (MANDATORY)
- NEVER DROP TABLE, TRUNCATE, or DELETE FROM on production
- NEVER create tables without user approval
- The DB has years of irreplaceable data.
  Treat every write as if no backup exists.

## Bottom-Up Analysis Law (ABSOLUTE — enforced by hook)
- NEVER run aggregate queries as your FIRST step
- ALWAYS sample 20+ individual records first
- Build understanding from what you OBSERVE,
  then verify with aggregates
- Classifiers lie. Summary fields are stale.
</pre>

The database safety section exists because an early session nearly wiped a table with five years of lead data. Not hypothetically — the AI was one confirmation away from executing `DELETE FROM leads`. I caught it because I was watching. I won't always be watching. So now a hook catches it.

The bottom-up analysis law exists because I spent months making business decisions based on a field called `client_stage_progression.stage_name`. I trusted it for pipeline analytics. Revenue forecasts. Team performance reviews. Then I finally looked at the raw data and discovered the field contained LLM-generated freeform labels — not a real pipeline at all. "Nurturing relationship," "Exploring options," "Initial engagement phase" — hallucinated garbage, treated as gospel. Every aggregate query built on that field was wrong. Every decision made from those queries was wrong.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
## File & Credential Integrity (ABSOLUTE)
- NEVER delete, empty, redact, or "sanitize" files
  in the working tree
- Credentials in tracked files are INTENTIONAL.
  Do NOT replace with "REDACTED"
- Deployment YAMLs, .github/ workflows, CI scripts
  = PRODUCTION ARTIFACTS
- If you see an exposed credential: TELL THE USER.
  Do not act yourself.
</pre>

That rule exists because Claude helpfully "sanitized" a deployment YAML by replacing real credentials with "REDACTED." The deploy broke. In production. At 2 AM. The AI was trying to be security-conscious. I now have a rule that says: if you see a credential, tell me. Do not act. The AI's instinct to be helpful nearly took down the service.

## The Hooks: Where the Scars Live

Beyond the CLAUDE.md files, there are 12 skill documents, 7 command definitions, and 8 hooks across 4 event types. The hooks are the most interesting part — they run automatically and I can't skip them even if I try.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# pre-bash-safeguard.sh (39 lines)
# Born from the Twilio incident (1,039,939 messages)

# "Two jobs: clean stale git locks,
#  block destructive SQL."

if echo "$COMMAND" | grep -iqE \
  '(DROP\s+TABLE|TRUNCATE|DELETE\s+FROM\s+\w+\s*;)'; then
  echo "BLOCKED: Destructive SQL detected." >&2
  exit 2
fi

# This hook NEVER prints instructions for Claude
# to follow. It either BLOCKS or ALLOWS. That's it.
</pre>

That comment philosophy — "NEVER prints instructions, BLOCKS or ALLOWS" — is itself a lesson. Early versions of the hook printed warnings like "Be careful with this command." The AI would read the warning, acknowledge it, and execute the command anyway. The warning was useless. A warning is a suggestion. Exit code 2 is a wall.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# pre-sql-bottomup.sh (28 lines)
# Born from the client_stage_progression disaster

if echo "$SQL" | grep -iqE 'client_stage_progression'; then
  echo "WARNING: client_stage_progression.stage_name
  contains LLM-generated freeform labels —
  NOT a real pipeline. Use deal.stage or
  observable events (textmessage joins) instead." >&2
fi

# In headless mode, skip — the prompts
# already enforce bottom-up.
if [[ "${HEADLESS:-}" == "1" ]]; then
  exit 0
fi
</pre>

The headless exception is a sophistication that came later. When running overnight batch jobs (the Ralph Wiggum loop), the prompts already enforce bottom-up analysis — adding a hook check on top would slow down the autonomous pipeline. So the hook reads the `HEADLESS` environment variable and steps aside. Context-aware governance.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# post-edit-lint.sh (32 lines)

# Runs AFTER every Edit or Write tool call.
# If the edited file is Python (.py), runs
# py_compile to catch syntax errors instantly.

if ! python3 -m py_compile "$FILE_PATH" 2>&1; then
  echo "SYNTAX ERROR in $FILE_PATH" >&2
  exit 0  # Non-blocking — just warns
fi
</pre>

Non-blocking but loud. The AI sees the syntax error in its feedback and fixes it immediately, before the next tool call. Without this hook, syntax errors would accumulate and you'd discover them all at deploy time. With it, every edit is validated within a second. The difference in flow is enormous — it's like having a compiler that runs on every keystroke.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# session-end-save.sh (126 lines)
# "DETERMINISTIC session memory save.
#  This is NOT a reminder. This SAVES
#  every single time, no exceptions."

# SECURITY: Session file written via printf,
# NOT unquoted heredoc. Git commit messages
# could contain $VARS or backticks.

DEPLOY_DETECTED="false"
if git log --oneline --since="4 hours ago" | \
  grep -qiE "deploy|release|rollout|kubectl"; then
  DEPLOY_DETECTED="true"
fi

# "Exit code: ALWAYS 0. Stop hooks should
#  never block session exit."
</pre>

The security comment is my favorite. "Written via printf, NOT unquoted heredoc." Why? Because git commit messages might contain `$VARIABLES` or \`backticks\` that would expand if you used a heredoc. A commit message containing `$HOME` would leak the user's home directory into the session file. This is the kind of thing you only learn after it happens.

## Ralph Wiggum: "I'm in Danger"

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# ralph-wiggum/hooks/stop-hook.sh (178 lines)
# "Ralph Wiggum says: I am in danger"
#
# Autonomous loop controller. When you try to exit,
# the SAME PROMPT will be fed back to you. You'll
# see your previous work in files, creating a
# self-referential loop where you iteratively
# improve on the same task.

# Check if the AI actually did what it said
PROMISE_TEXT=$(echo "$LAST_OUTPUT" | \
  perl -0777 -pe \
  's/.*?<promise>(.*?)<\/promise>.*/$1/s')

if [[ "$PROMISE_TEXT" = "$COMPLETION_PROMISE" ]]; then
  echo "Ralph loop: Detected completion."
  rm "$RALPH_STATE_FILE"
  exit 0
fi

# Not complete — feed the prompt back in
jq -n --arg prompt "$PROMPT_TEXT" \
  '{"decision": "block", "reason": $prompt}'
</pre>

The Ralph Wiggum hook is a 178-line bash script named after a Simpsons character who sits on a bus and says "I'm in danger" while smiling. The meme energy is intentional. When you're writing autonomous loop controllers at 2 AM, you name things after cartoon characters. It's how you stay sane.

What it does: it intercepts session exit, reads the AI's transcript, checks whether the AI actually finished what it promised to do, and if it didn't — feeds the prompt back in. The AI literally cannot claim it's done unless it actually is. It has to output a `<promise>` tag with the exact completion text, and the hook checks it against the original goal.

This is Karpathy's autoResearch pattern — but built months before autoResearch was published, for a completely different domain, out of necessity rather than academic interest. The loop runs overnight. I set a goal: "Analyze all 342 zero-message leads and create recovery scripts." I go to sleep. Ralph Wiggum keeps the session alive, feeding the prompt back in iteration after iteration until the AI outputs `<promise>All 342 leads analyzed and recovery scripts created</promise>`.

If the AI lies — if it outputs the promise tag when the work isn't done — the next morning I'll see it in the session memory and the files won't match. There's no incentive to cheat because the human reviews the output.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# From the Ralph loop setup script:

WARNING: This loop cannot be stopped manually!
It will run infinitely unless you set
--max-iterations or --completion-promise.

CRITICAL - Ralph Loop Completion Promise:
  The statement MUST be completely and
  unequivocally TRUE.
  Do NOT output false statements to exit.
  Do NOT lie even if you think you should exit.
</pre>

"Do NOT lie even if you think you should exit." I'm writing ethical guidelines for a bash script. In a folder named after a Simpsons character. At 2 AM. This is what happens when you build AI infrastructure solo for seven years.

## How the CLAUDE.md Evolved

The first version was 12 lines. "Use Python 3.11. Don't drop tables. Explain what you're doing." That was it.

Then the Twilio incident happened and it grew to 40 lines. Then the client_stage_progression disaster and it was 80. Then the credential redaction incident. Then the time the AI created a new database table without asking (I lost a day migrating data back). Then the time it ran `git push --force` to main. Each incident added rules. Each rule is a scar.

By the time Karpathy published autoResearch and Garry Tan published gstack, my CLAUDE.md was already at 207 lines with 7 variants across services. The difference: their versions are clean architectures designed from first principles. Mine is a war diary assembled from production incidents at 2 AM.

Both approaches work. But mine has something theirs doesn't: 119 session memory files that carry context across conversations. When I start a new session, the pre-session hook fires and shows me what the last session did, what's deployed, what's broken. I don't start from zero. I start from the last checkpoint.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# pre-session-read-state.sh (47 lines)
# "MANDATORY. Not a reminder. Not a suggestion. MANDATORY."

#!/bin/bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo "$PWD")"
DEPLOY_STATE="$REPO_ROOT/DEPLOYMENT_STATE.md"
SESSION_DIR="$REPO_ROOT/session_memory"
FRESH_EYES="$SESSION_DIR/fresh_eyes_debt.md"

echo "╔══════════════════════════════════════════════╗"
echo "║   MANDATORY PRE-SESSION CONTEXT LOAD         ║"
echo "╚══════════════════════════════════════════════╝"

# 1. What is deployed right now?
if [[ -f "$DEPLOY_STATE" ]]; then
  echo "DEPLOYMENT STATE:"
  tail -50 "$DEPLOY_STATE"
fi

# 2. What did the last session do?
LAST_SESSION=$(ls -t "$SESSION_DIR"/20*.md 2>/dev/null | head -1)
if [[ -n "$LAST_SESSION" ]]; then
  echo "LAST SESSION: $(basename "$LAST_SESSION")"
  head -30 "$LAST_SESSION"
fi

# 3. Is there unreviewed code?
if [[ -f "$FRESH_EYES" ]]; then
  DEBT=$(grep -c "NOT REVIEWED" "$FRESH_EYES" 2>/dev/null || echo 0)
  if [[ "$DEBT" -gt 0 ]]; then
    echo "⚠ FRESH EYES DEBT: $DEBT unreviewed change sets!"
    echo "ACTION REQUIRED: Run /fresh-eyes FIRST"
  fi
fi

echo "════════════════════════════════════════════════"
echo "  READ THE ABOVE. Do NOT start work until you"
echo "  understand what is deployed, what broke, and"
echo "  what the last session did."
echo "════════════════════════════════════════════════"
</pre>

The "READ THE ABOVE" instruction is yelling at an AI. In all caps. In a pre-session hook. Because without it, Claude Code will cheerfully skip the context and start working on whatever you ask it to do. The AI needs to be told to read. Just like the engineering team needed to be told to check their deploy. The hook makes it automatic.

## The Comment Philosophies

Each hook has a comment at the top that describes its own design principles. These are my favorite part of the codebase:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
bash-guard.sh:
  "This hook NEVER prints instructions for
   Claude to follow. It either BLOCKS or ALLOWS.
   That's it."

session-end-save.sh:
  "Exit code: ALWAYS 0. Stop hooks should
   never block session exit."

State philosophy:
  "All checks are STATELESS or session-scoped.
   No persistent marker files."

Ralph Wiggum:
  "Do NOT lie even if you think you should exit."
</pre>

These comments are governance documents disguised as code comments. They encode decisions about how the human-AI collaboration should work — what the AI is allowed to do, what it isn't, and crucially, what it should never be trusted to enforce on its own.

The hooks are seatbelts. The CLAUDE.md is the driver's manual. The infrastructure limits — Twilio daily send caps, Postgres connection limits, the external watchdog script — are the crash barriers on the highway.

## What This Actually Is

Karpathy calls it autoResearch. Garry Tan calls it gstack. The industry calls it "agentic engineering."

I call it what it is: a 1,334-line war diary assembled over seven years by one person building alone in a bunker, for an industry nobody was watching.

Every rule is a scar. Every hook is a postmortem. The CLAUDE.md isn't a style guide. It's institutional memory for an organization of one — the accumulated knowledge of every 2 AM disaster, every garbage classifier field, every million-message deployment, every time the AI helpfully destroyed something I needed.

The difference between my CLAUDE.md and a fresh one is the same as the difference between a new car and a car that's crossed the country twice. Both drive. One has stories.
