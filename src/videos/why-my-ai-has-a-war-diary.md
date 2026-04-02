---
layout: video.njk
title: "Why My AI Has a War Diary"
series: "The Code"
duration: "3 min"
order: 30
date: 2026-03-20
---

<div style="color:#666; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:2rem;">Script &middot; Code Walkthrough</div>

## COLD OPEN

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
[SCREEN: A file. CLAUDE.md. 207 lines.
The cursor scrolls slowly.]

NARRATOR (V.O.):
Every AI coding tool reads a file
called CLAUDE.md at the root of your
project. It's supposed to be a brief
style guide.

Mine is 207 lines long.

I have seven of them across different
services, totaling 1,334 lines.

They are the institutional knowledge
of my entire engineering organization.

And my engineering organization is me.
</pre>

---

## THE CODE (0:30–1:30)

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
[CODE ON SCREEN — actual production CLAUDE.md]

## Who I Am
Mukund Chopra. I run HomeEasy — apartment
locator + renters insurance business.
AI is taking over operations. Humans are
API endpoints for calls and tours only.

## Teaching Mode (ALWAYS ON)
Mukund is a 15-year founder running an AI agent
team with no human engineers.
Explain EVERYTHING: what you're doing, why,
define terms, show architecture,
discuss trade-offs.
Don't dumb it down. He's smart and
learns fast.
Just don't assume DevOps/SRE knowledge.
If he corrects you — learn from it,
update CLAUDE.md/MEMORY.md, never repeat.
</pre>

**NARRATION:** "'Teaching mode' exists because I'm not an engineer by training. I came from finance and operations — Citibank, Groupon, venture. When I started building with AI, I needed the system to explain what it was doing. Every deploy, every database migration, every infrastructure choice — I needed to understand it well enough to debug it at 2 AM, because there's no one else to call."

---

## THE HOOKS (1:30–2:30)

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
[CODE ON SCREEN — actual hooks]

# pre-bash-safeguard.sh — 39 lines
# "Two jobs: clean stale git locks,
#  block destructive SQL."

if echo "$COMMAND" | grep -iqE \
  '(DROP\s+TABLE|TRUNCATE|DELETE\s+FROM)'; then
  echo "BLOCKED: Destructive SQL." >&2
  exit 2
fi

# session-end-save.sh — 126 lines
# "DETERMINISTIC session memory save.
#  This is NOT a reminder. This SAVES
#  every single time, no exceptions."

DEPLOY_DETECTED="false"
if git log --oneline --since="4 hours ago" | \
  grep -qiE "deploy|release|rollout"; then
  DEPLOY_DETECTED="true"
fi

# pre-sql-bottomup.sh — 28 lines
# Blocks aggregate queries before sampling

if echo "$SQL" | grep -iqE \
  'client_stage_progression'; then
  echo "WARNING: stage_name contains
  LLM-generated freeform labels —
  NOT a real pipeline." >&2
fi
</pre>

**NARRATION:** "Eight hooks across four event types. They run automatically. I can't skip them even if I try. The bash guard blocks destructive commands. The session-end hook saves everything I did. The SQL hook prevents me from trusting garbage classifier fields."

**NARRATION:** "And then there's Ralph Wiggum."

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
[CODE ON SCREEN]

# ralph-wiggum/hooks/stop-hook.sh — 178 lines
# "Ralph Wiggum says: I am in danger"
# Autonomous loop controller

# When you try to exit, the SAME PROMPT
# will be fed back to you. You'll see
# your previous work in files, creating
# a self-referential loop where you
# iteratively improve on the same task.

if [[ "$COMPLETION_PROMISE" != "null" ]]; then
  # Check if the AI actually did what it said
  PROMISE_TEXT=$(echo "$LAST_OUTPUT" | \
    perl -0777 -pe \
    's/.*?&lt;promise&gt;(.*?)&lt;\/promise&gt;.*/$1/s')

  if [[ "$PROMISE_TEXT" = "$COMPLETION_PROMISE" ]]; then
    echo "Ralph loop: Detected completion."
    rm "$RALPH_STATE_FILE"
    exit 0
  fi
fi

# Not complete — feed the prompt back in
jq -n --arg prompt "$PROMPT_TEXT" \
  '{"decision": "block", "reason": $prompt}'
</pre>

**NARRATION:** "Ralph Wiggum is a 178-line bash script that intercepts session exit, reads the transcript, checks whether the AI actually finished its work, and if it didn't — feeds the prompt back in. It's named after a Simpsons character because humor in infrastructure is how you stay sane at 2 AM. It's an autonomous loop controller. The AI can't claim it's done unless it actually is."

---

## THE PRINCIPLE (2:30–3:00)

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
NARRATOR (V.O.):
Each hook has a comment philosophy at the top.

[SCREEN: Comments scrolling]

bash-guard: "This hook NEVER prints
instructions for Claude to follow.
It either BLOCKS or ALLOWS. That's it."

session-end: "Exit code: ALWAYS 0. Stop hooks
should never block session exit."

State philosophy: "All checks are STATELESS
or session-scoped. No persistent marker files."

[BEAT.]

These comments are governance documents.
They encode decisions about how human-AI
collaboration should work.

The hooks are seatbelts.
The CLAUDE.md is the driver's manual.
The infrastructure limits are the crash
barriers on the highway.

[FADE TO BLACK.]

This is what engineering governance
looks like when you have no team
to govern.

You encode the discipline into the
system itself.

[TEXT ON SCREEN]
"Every rule is a scar.
 Every hook is a postmortem.
 The CLAUDE.md isn't a style guide —
 it's a war diary."
</pre>

---

<p class="coming-soon">Production notes: Screen recording of actual CLAUDE.md file scrolling, with key sections highlighting. Code snippets rendered in Carbon with the black theme. Terminal recording showing hook output in real time. Short, punchy — Ben Thompson style. One concept, one artifact, one principle.</p>
