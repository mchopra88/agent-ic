---
layout: essay.njk
title: "The Scar Tissue: How Every Fuckup Became a Hook"
order: 31
date: 2026-04-01
---

People ask me about my development setup and I show them my `.claude/settings.json`. Eight hooks firing on every session start, every tool use, every session end. They ask where it came from. The answer is: every one of these hooks is scar tissue. Every line traces back to a specific disaster. I didn't design this system. I survived my way into it.

Here is the actual file. This is what runs on my machine right now:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;">// .claude/settings.json — the scar registry</span>
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {"type": "command", "command": ".claude/hooks/session-end-save.sh"},
          {"type": "command", "command": ".claude/hooks/stop-fresh-eyes-check.sh"}
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {"type": "command", "command": ".claude/hooks/pre-bash-safeguard.sh"},
          {"type": "command", "command": ".claude/hooks/pre-push-fresh-eyes.sh"}
        ]
      },
      {
        "matcher": "mcp",
        "hooks": [
          {"type": "command", "command": ".claude/hooks/pre-sql-bottomup.sh"}
        ]
      },
      {
        "matcher": "",
        "hooks": [
          {"type": "command", "command": ".claude/hooks/session-start-context.sh"},
          {"type": "command", "command": ".claude/hooks/pre-session-read-state.sh"}
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {"type": "command", "command": ".claude/hooks/post-edit-lint.sh"}
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {"type": "command", "command": "echo 'Ralph Wiggum says: I am in danger'"}
        ]
      }
    ]
  }
}
</pre>

Eight hooks. Four event types. Every one of them born from something that went wrong. Let me show you each file, and the disaster that created it.

## Hook 1: pre-bash-safeguard.sh

**The disaster:** The [Twilio incident](/essays/the-twilio-incident/). A code bug triggered a runaway SMS process. 1,039,939 messages in five days. The PostgreSQL database was overwhelmed and crashed. My Chase card got flagged for fraud. 33,900 messages were still sitting in the Twilio queue when we finally caught it.

**The scar:**

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#88cc88;">#!/bin/bash</span>
<span style="color:#666;"># Pre-Bash Safeguard Hook</span>
<span style="color:#666;"># Runs BEFORE every Bash tool call. Two jobs:</span>
<span style="color:#666;"># 1. Clean stale .git/index.lock (prevents git hangs)</span>
<span style="color:#666;"># 2. Block destructive SQL commands</span>

set -euo pipefail

HOOK_INPUT=$(cat)
COMMAND=$(echo "$HOOK_INPUT" | jq -r '.tool_input.command // empty')

<span style="color:#666;"># --- Job 1: Clean stale git lock files ---</span>
<span style="color:#666;"># Git lock files get left behind when a process crashes mid-operation.</span>
<span style="color:#666;"># They block ALL subsequent git commands. Auto-clean if older than 60 seconds.</span>
LOCK_FILE=".git/index.lock"
if [[ -f "$LOCK_FILE" ]]; then
  if [[ "$(uname)" == "Darwin" ]]; then
    LOCK_AGE=$(( $(date +%s) - $(stat -f %m "$LOCK_FILE") ))
  else
    LOCK_AGE=$(( $(date +%s) - $(stat -c %Y "$LOCK_FILE") ))
  fi
  if [[ $LOCK_AGE -gt 60 ]]; then
    rm -f "$LOCK_FILE"
    echo "Cleaned stale .git/index.lock (${LOCK_AGE}s old)" >&2
  fi
fi

<span style="color:#666;"># --- Job 2: Block destructive SQL in Bash commands ---</span>
<span style="color:#cc8888;">if echo "$COMMAND" | grep -iqE \
  '(DROP\s+TABLE|TRUNCATE\s|DELETE\s+FROM\s+\w+\s*;|DELETE\s+FROM\s+\w+\s*$)'; then
  echo "BLOCKED: Destructive SQL detected in command." >&2
  exit 2
fi</span>

exit 0
</pre>

39 lines. Two jobs. The git lock cleanup came from a session that hung for 20 minutes because a previous crash left a stale lock file. The SQL blocking came from a session that was one confirmation away from executing `DELETE FROM leads` — which would have wiped five years of data.

The critical design principle is in the comments: "exit 2 = blocking error." Early versions printed warnings. The AI would read the warning, acknowledge it, and execute the command anyway. A warning is a suggestion. Exit code 2 is a wall.

## Hook 2: pre-sql-bottomup.sh

**The disaster:** I spent months making business decisions based on a database field called `client_stage_progression.stage_name`. Pipeline analytics. Revenue forecasts. Team performance reviews. Then I finally looked at the raw data and discovered every value was LLM-generated freeform text — "Nurturing relationship," "Exploring options," "Initial engagement phase." Not a pipeline. Not a stage. Hallucinated garbage.

**The scar:**

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#88cc88;">#!/bin/bash</span>
<span style="color:#666;"># Bottom-Up Analysis Enforcement Hook</span>
<span style="color:#666;"># Fires BEFORE any SQL query via the MCP Postgres tool.</span>
<span style="color:#666;"># In headless mode (HEADLESS=1), skip — prompts already enforce bottom-up.</span>

set -euo pipefail

<span style="color:#666;"># Skip in headless mode — prompts have their own enforcement</span>
if [[ "${HEADLESS:-}" == "1" ]]; then
  exit 0
fi

HOOK_INPUT=$(cat)
SQL=$(echo "$HOOK_INPUT" | jq -r '.tool_input.sql // empty' 2>/dev/null || echo "")

<span style="color:#cc8888;"># Hard warning: never use client_stage_progression</span>
<span style="color:#cc8888;">if echo "$SQL" | grep -iqE 'client_stage_progression'; then
  echo "WARNING: client_stage_progression.stage_name contains LLM-generated
  freeform labels — NOT a real pipeline. Use deal.stage or observable events
  (textmessage joins) instead." >&2
fi</span>

<span style="color:#666;"># Soft reminder: aggregate queries should follow individual sampling</span>
if echo "$SQL" | grep -iqE 'GROUP\s+BY' && echo "$SQL" | grep -iqE 'COUNT\(\*\)'; then
  echo "REMINDER: Bottom-up law — have you read individual records first?" >&2
fi

exit 0
</pre>

28 lines. The field name is called out explicitly: `client_stage_progression`. That's not abstraction — that's a specific scar from a specific disaster. The headless exception came later: when running [overnight batch jobs](/essays/the-overnight-machine/), the prompts already enforce bottom-up analysis, so adding a hook check would slow the autonomous pipeline. Context-aware governance.

## Hook 3: session-end-save.sh

**The disaster:** The doom loop. Eight days in late February 2026. Claude Code would scan the codebase, find something it didn't like, "fix" it. The fix would deploy. The deploy would break something. I'd open a new session. The new session had no memory of the previous fix. It would find something else wrong. Another refactor. Another deploy. Another break. Eight days. Revenue bleeding at $4-5K per day.

The root cause: sessions had no memory. Every new session started from zero. Nobody knew what was deployed.

**The scar:**

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#88cc88;">#!/bin/bash</span>
<span style="color:#666;"># Session End Hook — DETERMINISTIC session memory save</span>
<span style="color:#666;"># This is NOT a reminder. This SAVES every single time, no exceptions.</span>
<span style="color:#666;"># Fires on Stop event. Non-blocking (exit 0) but captures everything.</span>

set -euo pipefail

REPO_DIR="$(git rev-parse --show-toplevel 2>/dev/null || echo '.')"
SESSION_DIR="${REPO_DIR}/session_memory"
DEPLOY_LOG="${REPO_DIR}/DEPLOYMENT_STATE.md"
TIMESTAMP=$(date +%Y-%m-%d_%H%M%S)
SESSION_FILE="${SESSION_DIR}/${TIMESTAMP}_session_auto.md"

mkdir -p "$SESSION_DIR"

<span style="color:#666;"># Gather state automatically — no human or AI intervention needed</span>
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
LAST_COMMIT=$(git log --oneline -1 2>/dev/null || echo "no commits")
LAST_COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
RECENT_COMMITS=$(git log --oneline --since="4 hours ago" 2>/dev/null || echo "none")
CHANGED_FILES=$(git diff --name-only HEAD~5 HEAD 2>/dev/null | head -30 || echo "none")
DIRTY_FILES=$(git status --porcelain 2>/dev/null | head -20 || echo "clean")

<span style="color:#666;"># Detect if any deploys happened this session</span>
DEPLOY_DETECTED="false"
if git log --oneline --since="4 hours ago" 2>/dev/null | grep -qiE \
  "deploy|release|rollout|kubectl|gcloud|push.*prod|merge.*main"; then
  DEPLOY_DETECTED="true"
fi

<span style="color:#666;"># Write session file with git state + AUTO-STUB markers</span>
<span style="color:#666;"># for narrative context that /session-save will fill in later</span>
cat > "$SESSION_FILE" << ENDOFSESSION
# Auto-Saved Session — ${TIMESTAMP}

## Git State
- **Branch:** ${BRANCH}
- **Last Commit:** ${LAST_COMMIT}
- **Commit Hash:** ${LAST_COMMIT_HASH}
- **Uncommitted Changes:** ${UNCOMMITTED} files
- **Deploy Detected:** ${DEPLOY_DETECTED}

### Recent Commits (last 4 hours)
\`\`\`
${RECENT_COMMITS}
\`\`\`

## Session Context
_If these say AUTO-STUB, Claude Code did not run /session-save before ending._

### What was done this session:
_[AUTO-STUB — next session should review git log above to reconstruct]_

### What broke or failed:
_[AUTO-STUB]_

### What needs to happen next:
_[AUTO-STUB]_
ENDOFSESSION

<span style="color:#666;"># If deploy detected, append to DEPLOYMENT_STATE.md</span>
if [[ "$DEPLOY_DETECTED" == "true" ]]; then
  {
    echo ""
    echo "### Deploy — ${TIMESTAMP}"
    echo "- **Commit:** ${LAST_COMMIT_HASH} — ${LAST_COMMIT}"
    echo "- **Branch:** ${BRANCH}"
    echo "- **Changed Files:**"
    echo "\`\`\`"
    echo "${CHANGED_FILES}"
    echo "\`\`\`"
    echo "- **Status:** ⚠️ UNVERIFIED — run /verify-deploy"
    echo "---"
  } >> "$DEPLOY_LOG"
fi

echo "✅ SESSION MEMORY SAVED: ${SESSION_FILE}"
exit 0
</pre>

126 lines. The most important hook in the system. The philosophy: never trust the human (or the AI) to remember. Make remembering automatic and make forgetting impossible. If I forget to run `/session-save` — and I always forget — the hook still captures the git state. The AUTO-STUB markers tell the next session exactly what's missing.

The deploy detection reads the git log for keywords and automatically appends to [DEPLOYMENT_STATE.md](/essays/deployment-manifests/). Every deploy gets logged whether I remember to log it or not.

## Hook 4: pre-session-read-state.sh

**Also born from the doom loop.** The fix for sessions that don't know what's deployed.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#88cc88;">#!/bin/bash</span>
<span style="color:#666;"># Pre-Session Hook — DETERMINISTIC context loading</span>
<span style="color:#666;"># Forces Claude Code to SEE deployment state + last session + architecture.</span>
<span style="color:#666;"># This is the antidote to session amnesia.</span>

set -euo pipefail

REPO_DIR="$(git rev-parse --show-toplevel 2>/dev/null || echo '.')"

echo "╔══════════════════════════════════════════════════════════╗"
echo "║          MANDATORY PRE-SESSION CONTEXT LOAD             ║"
echo "╚══════════════════════════════════════════════════════════╝"

<span style="color:#666;"># 1. Deployment State</span>
if [[ -f "$REPO_DIR/DEPLOYMENT_STATE.md" ]]; then
  echo "📋 DEPLOYMENT STATE (last 50 lines):"
  tail -50 "$REPO_DIR/DEPLOYMENT_STATE.md"
fi

<span style="color:#666;"># 2. Last session memory</span>
LAST_SESSION=$(ls -t "$REPO_DIR/session_memory"/*.md 2>/dev/null \
  | grep -v fresh_eyes | head -1)
if [[ -n "$LAST_SESSION" ]]; then
  echo "🧠 LAST SESSION MEMORY: $(basename "$LAST_SESSION")"
  cat "$LAST_SESSION"
fi

<span style="color:#666;"># 3. Fresh eyes debt</span>
FRESH_EYES="$REPO_DIR/session_memory/fresh_eyes_debt.md"
if [[ -f "$FRESH_EYES" ]]; then
  DEBT=$(grep -c "NOT REVIEWED" "$FRESH_EYES" 2>/dev/null || echo "0")
  if [[ "$DEBT" -gt 0 ]]; then
    echo "🔴 FRESH EYES DEBT: ${DEBT} unreviewed change sets!"
    echo "⚡ ACTION REQUIRED: Run /fresh-eyes BEFORE new work."
  fi
fi

<span style="color:#666;"># 4. Architecture</span>
if [[ -f "$REPO_DIR/ARCHITECTURE.md" ]]; then
  echo "🏗️  ARCHITECTURE loaded from ARCHITECTURE.md"
  head -80 "$REPO_DIR/ARCHITECTURE.md"
fi

<span style="color:#666;"># 5. Current git state</span>
echo "Branch: $(git branch --show-current 2>/dev/null)"
echo "Last commit: $(git log --oneline -1 2>/dev/null)"
echo "Uncommitted: $(git status --porcelain 2>/dev/null | wc -l) files"

echo "════════════════════════════════════════════════════════════"
echo "  READ THE ABOVE. Do NOT start work until you understand"
echo "  what is deployed, what broke, and what the last session did."
echo "════════════════════════════════════════════════════════════"

exit 0
</pre>

80 lines. The "READ THE ABOVE" instruction is yelling at an AI. In all caps. Because without it, Claude Code will cheerfully skip the context and start working on whatever you ask.

## Hook 5: stop-fresh-eyes-check.sh

**The disaster:** I kept pushing code to production without reviewing it first. Moving fast, feeling productive. Then discovering bugs in production that a two-minute review would have caught.

**The scar:**

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#88cc88;">#!/bin/bash</span>
<span style="color:#666;"># Stop Hook — DETERMINISTIC Fresh Eyes Check</span>
<span style="color:#666;"># This is NOT a reminder. This CAPTURES what needs review.</span>

set -euo pipefail

REPO_DIR="$(git rev-parse --show-toplevel 2>/dev/null || echo '.')"
REVIEW_LOG="${REPO_DIR}/session_memory/fresh_eyes_debt.md"
MARKER_FILE="/tmp/.claude-fresh-eyes-$(date +%Y%m%d)"

UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
RECENT_COMMITS=$(git log --oneline --since="2 hours ago" 2>/dev/null | wc -l | tr -d ' ')

<span style="color:#666;"># Only trigger if significant work happened</span>
if [[ $UNCOMMITTED -gt 3 || $RECENT_COMMITS -gt 2 ]]; then
  if [[ ! -f "$MARKER_FILE" ]]; then
    CHANGED_FILES=$(git diff --name-only 2>/dev/null | head -20)
    COMMITTED_FILES=$(git log --name-only --pretty=format: \
      --since="2 hours ago" 2>/dev/null | sort -u | head -20)

    <span style="color:#666;"># Append to review debt log</span>
    {
      echo "## Unreviewed Changes — $(date +%Y-%m-%d_%H%M%S)"
      echo "- **Uncommitted files:** ${UNCOMMITTED}"
      echo "- **Recent commits:** ${RECENT_COMMITS}"
      echo "### Files needing fresh-eyes review:"
      echo "${CHANGED_FILES}"
      echo "${COMMITTED_FILES}"
      echo "- **Status:** ❌ NOT REVIEWED"
    } >> "$REVIEW_LOG"

    echo "⚠️  FRESH EYES DEBT logged." >&2
  fi
fi

exit 0
</pre>

48 lines. The concept: "fresh eyes" means spawning a new Claude Code context — one that hasn't been working on the code all day — and asking it to review the changes cold. It catches things the session context normalized. The debt system makes this unavoidable: unreviewed changes accumulate in `fresh_eyes_debt.md`, and the pre-session hook shows the debt before every session. You can't start new work until you've reviewed the old work.

## Hooks 6-8: post-edit-lint, pre-push-fresh-eyes, session-start-context

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;">// post-edit-lint.sh — 32 lines</span>
<span style="color:#666;">// Born from: syntax errors accumulating through a session,</span>
<span style="color:#666;">// discovered all at once at deploy time.</span>
<span style="color:#666;">// Fix: py_compile runs on EVERY file edit, instantly.</span>
<span style="color:#666;">// Exit 0 (non-blocking) — Claude sees the error and self-corrects.</span>

if ! python3 -m py_compile "$FILE_PATH" 2>&1; then
  echo "SYNTAX ERROR in $FILE_PATH — fix before continuing." >&2
  exit 0
fi

<span style="color:#666;">// pre-push-fresh-eyes.sh — 38 lines</span>
<span style="color:#666;">// Born from: pushing to production without reviewing changes.</span>
<span style="color:#666;">// Fix: warns before any `git push` if /fresh-eyes hasn't run today.</span>
<span style="color:#666;">// Non-blocking (exit 0) — just a reminder.</span>
<span style="color:#666;">// The stop-fresh-eyes hook is the enforcement.</span>

if [[ -f "/tmp/.claude-fresh-eyes-$(date +%Y%m%d)" ]]; then
  exit 0  <span style="color:#666;"># Fresh eyes was run today — all clear</span>
fi
echo "=== FRESH EYES REMINDER ===" >&2
echo "You're about to push without running /fresh-eyes." >&2

<span style="color:#666;">// session-start-context.sh — 42 lines</span>
<span style="color:#666;">// Born from: sessions starting without knowing what happened before.</span>
<span style="color:#666;">// Fix: shows 5 most recent session files, MEMORY.md size,</span>
<span style="color:#666;">// and current git state on every session start.</span>

for f in $(ls -t session_memory/*.md | head -5); do
  BASENAME=$(basename "$f")
  FIRST_LINE=$(head -1 "$f" | sed 's/^#* *//')
  echo "  - $BASENAME: $FIRST_LINE"
done
</pre>

## The Maturity Ladder

Here's what I learned from all of this. There are three levels of safety, and only Level 3 is actually trustworthy:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Level 1: Hooks in Claude Code (instructions to the AI)
  → Can be bypassed if context window fills up
  → Can be ignored if the AI is determined
  → Necessary but not sufficient
  → Example: pre-bash-safeguard.sh

Level 2: Safeguards in application code (code that checks itself)
  → Better, but the AI writes the code too
  → A bug in the safeguard = no safeguard
  → Example: rate limiting in the SMS service

Level 3: Walls in the infrastructure (external to the system)
  → Twilio daily send limit (set in Twilio console, not my code)
  → Postgres statement timeout + max connections (database config)
  → External watchdog script in its own tmux session
  → Claude Code never sees it. Never edits it. Never deploys it.
  → It just watches.

The Twilio incident was a Level 1/2 failure.
The fix required Level 3: infrastructure walls that exist
OUTSIDE the system that the AI can modify.
</pre>

## The Hooks Broke Too

And then the hooks themselves broke. I had them all wired up — eight hooks in settings.json — and overnight, six Cloud Builds went through with zero gating. The deploy gate was supposed to block all deploys. It didn't.

The root cause: Windows line endings. The hook scripts had `\r\n` instead of `\n`. Bash couldn't execute them. They silently failed instead of blocking.

I fixed the line endings. Added a check. And learned: your safety systems need their own safety systems. It's turtles all the way down.

## The Notification

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
"Notification": [
  {
    "matcher": "",
    "hooks": [
      {"type": "command", "command": "echo 'Ralph Wiggum says: I am in danger'"}
    ]
  }
]
</pre>

Because humor is how you stay sane when you're writing ethical guidelines for bash scripts at 2 AM in a folder named after a Simpsons character.

Every hook is a scar. Every infrastructure wall is a bone that healed stronger after breaking. If you want to build with AI, start with the hooks. Not because they'll save you — they won't, not alone. Start with them because when things break, the hooks turn each disaster into a permanent improvement. The system gets harder to break over time.

That's the real product: a codebase that remembers every way it's been hurt and refuses to be hurt that way again.
