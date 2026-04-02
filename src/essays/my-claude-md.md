---
layout: essay.njk
title: "My CLAUDE.md"
status: "Draft — with artifacts"
order: 29
date: 2026-03-15
---

Every AI coding tool reads a file called CLAUDE.md at the root of your project. It's supposed to be a brief style guide. Mine is 207 lines long. I have seven of them across different services, totaling 1,334 lines. They are the institutional knowledge of my entire engineering organization, and my engineering organization is me.

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

The rules get harder as you scroll down:

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

The database safety section exists because an early session nearly wiped a table with five years of lead data. The bottom-up analysis law exists because I spent months making business decisions based on classifier fields that turned out to be garbage. `client_stage_progression.stage_name` — a field I trusted for pipeline analytics — contained LLM-generated freeform labels that had nothing to do with actual deal stages. Every aggregate query built on that field was wrong. Every decision made from those queries was wrong.

Beyond the CLAUDE.md files, there are 12 skill documents, 7 command definitions, and the hooks. The hooks are the most interesting part — they run automatically and I can't skip them even if I try:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# From the actual settings.json — 8 hooks across 4 event types

SessionStart:
  session-start.sh
    → Loads deployment state, last session, architecture
    → Shows what's broken before you start anything new
    → "SEVEN sections, all concise" — its own comment

PreToolUse (Bash):
  bash-guard.sh
    → "THREE jobs, each deterministic:
       1. BLOCK destructive commands
       2. DETECT deploy commands
       3. GATE git push → require fresh-eyes"
    → Born from the Twilio incident (1M+ messages)
    → "This hook NEVER prints instructions for Claude
       to follow. It either BLOCKS or ALLOWS."
  pre-push-fresh-eyes.sh
    → Warns before git push without review

PreToolUse (SQL):
  pre-sql-bottomup.sh
    → Blocks aggregate queries before individual sampling
    → Warns on client_stage_progression (garbage field)
    → Skips in headless mode

PostToolUse (Edit/Write):
  post-edit-lint.sh
    → Auto-lints Python after every edit
    → Blocks on syntax errors
    → Detects secret leaks in deployment files

Stop:
  session-stop.sh
    → Auto-saves session memory + git state
    → "SECURITY: Session file written via printf,
       NOT unquoted heredoc. Git commit messages
       could contain $VARS or backticks"
  stop-fresh-eyes-check.sh
    → Logs unreviewed changes to debt file
  ralph-wiggum stop-hook.sh
    → "Ralph Wiggum says: I am in danger"
    → Autonomous loop controller
</pre>

The Ralph Wiggum hook deserves its own paragraph. It's an autonomous loop controller — a 170-line bash script that intercepts the session exit, reads the transcript, checks for a completion promise, and feeds the prompt back in if the work isn't done. It's named after a Simpsons character because humor in infrastructure is how you stay sane at 2 AM.

Each hook has a comment philosophy at the top. The bash guard: "This hook NEVER prints instructions for Claude to follow. It either BLOCKS or ALLOWS. That's it." The session stop: "Exit code: ALWAYS 0. Stop hooks should never block session exit." The state philosophy: "All checks are STATELESS or session-scoped. No persistent marker files."

These comments are governance documents. They encode decisions about how the human-AI collaboration should work — what the AI is allowed to do, what it isn't, and crucially, what it should never be trusted to enforce on its own. The hooks are seatbelts. The infrastructure limits — Twilio daily caps, Postgres connection limits, the external watchdog script — are the crash barriers on the highway.

119 session memory files persist context across conversations. When I come back to a session after a week, the system knows where I left off, what was deployed, what broke, and what the next priority is. This isn't a to-do list. It's institutional memory for an organization of one.

This is what engineering governance looks like when you have no team to govern. You encode the discipline into the system itself. Every rule is a scar. Every hook is a postmortem. The CLAUDE.md isn't a style guide — it's a war diary.
