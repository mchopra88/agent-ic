---
layout: essay.njk
title: "Deployment Manifests"
order: 34
date: 2026-04-01
---

Pop quiz: what's running in production right now?

Not what git says. Not what the CI/CD dashboard shows. Not what you deployed last Tuesday. What is actually, physically, right now running on the server that's handling live customer traffic?

I couldn't answer that question for eight days in February 2026 and it almost killed the business.

## The Doom Loop

February 14. A Friday. (Of course it was a Friday.) A Claude Code session found something wrong in the lead pipeline. A pattern that didn't look right. The AI suggested a fix. I reviewed it. Looked reasonable. We deployed. The fix broke something else — something subtle, a behavioral change that made leads process differently. Not an error. Just... different.

Saturday: new session. New session has no memory of yesterday's fix. No context about what had been deployed or why. It scans the codebase, finds the behavioral change, assumes it's a bug, "fixes" it — reverting yesterday's intentional change while adding something new on top. Deploys that.

Sunday: another session. Another blank slate. Another confident, technically-correct fix layered on top of two conflicting previous fixes.

Monday. Tuesday. Wednesday. Thursday.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
The doom loop — from session_memory/ filenames:

  Feb 14  nightly-slop-prd-fix
  Feb 14  inventory-pipeline-fix
  Feb 14  guidance-leak-hotfix
  Feb 15  ci-fix-and-wiring
  Feb 15  codebase-decomposition-pr7
  Feb 15  multi-signal-inventory-search
  Feb 15  verification-rootcause-fix
  Feb 16  duplicate-message-dedup
  Feb 16  gemini-timeout-hotfix
  Feb 17  ygl-audit-inbox-rescue
  Feb 18  inventory-recovery-overnight
  Feb 18  lead-intelligence-gemini-fix
  Feb 18  overnight-recovery-continued
  Feb 19  overnight-system-health-fix
  Feb 20  overnight-full-simulation
  Feb 21  infinite-loop-fix

  17 sessions in 8 days.
  Each one confident it was fixing things.
  No session knew what the previous sessions had done.
</pre>

Every session was technically competent. The code was clean. The fixes made sense if you only looked at the codebase as it existed in that moment. The problem: no session had the full picture. Each one saw the repo, tried to improve it, and had no idea that yesterday's session had already tried something, or that the thing it was "fixing" was actually last Tuesday's intentional change to solve a different problem.

Revenue impact: $4-5K per day in degraded lead processing. Leads that should have matched to buildings didn't. Leads that should have gotten follow-ups went silent. Eight days. At least $32K in deals damaged or lost.

I felt like I was going crazy. Every morning I'd open a session, think I was making progress, deploy something, and then the next morning realize things were worse. Like shoveling snow during a blizzard. Like the guy in that Greek myth pushing the rock up the hill. (Sisyphus. I had to Google it.)

## Three Files

Three markdown files fixed everything. I am completely serious. No infrastructure change. No new service. No monitoring tool. Three text files in the repo root.

First: DEPLOYMENT_STATE.md. This is the actual file, sitting in the repo right now:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#e8e4de;"># DEPLOYMENT STATE — HomeEasy Production</span>

<span style="color:#cc8888;">> **READ THIS FIRST.** Every Claude Code session MUST read</span>
<span style="color:#cc8888;">> this file before doing ANY work. This is enforced by the</span>
<span style="color:#cc8888;">> pre-session hook. This file is the single source of truth</span>
<span style="color:#cc8888;">> for what is deployed, what broke, and what was tried</span>
<span style="color:#cc8888;">> and failed.</span>

<span style="color:#888;">## Current Production State</span>
- <span style="color:#cc8888;">**Last Known Working Commit:**</span> _UNKNOWN — establish baseline
  by rolling back_
- <span style="color:#cc8888;">**Last Deploy Date:**</span> _multiple deploys Feb 14-21, 2026_
- <span style="color:#cc8888;">**What's Running:**</span> _uncertain — 8 days of broken deploys,
  needs kubectl audit_

<span style="color:#888;">## What's Broken Right Now</span>
- Lead processing pipeline may not be sending leads
  (unverified since doom loop)
- 8 consecutive days of deploys that introduced regressions
- No verified working state exists — MUST rollback and
  establish baseline

<span style="color:#888;">## What Was Tried And Failed</span>
  - 2026-02-14: nightly slop PRD fix
  - 2026-02-15: CI fix, codebase decomposition PR7,
    multi-signal inventory, verification rootcause
  - 2026-02-16: duplicate message dedup, Gemini timeout hotfix
  - 2026-02-17: YGL audit inbox rescue
  - 2026-02-18: inventory recovery, lead intelligence Gemini fix
  - 2026-02-19: overnight system health fix
  - 2026-02-20: overnight full simulation
  - 2026-02-21: infinite loop fix

<span style="color:#cc8888;">**Pattern:** Each fix introduced new breakage.</span>
<span style="color:#cc8888;">No session knew what previous sessions tried.</span>

<span style="color:#888;">## Recovery Plan</span>
1. kubectl rollout history — find last good revision
2. kubectl rollout undo — to that revision
3. Verify leads actually sending
4. Record working commit hash HERE
5. THEN and only then begin new work
</pre>

Look at that "What's Broken Right Now" section. "No verified working state exists." I wrote that sentence at 2 AM after eight days of progressive deterioration. The most honest sentence in the entire repo.

The point of DEPLOYMENT_STATE.md is that it gets shoved in the AI's face before every session starts. The [pre-session hook](/essays/scar-tissue/) prints it. There's a line in all caps that says "READ THE ABOVE. Do NOT start work until you understand what is deployed, what broke, and what the last session did." You have to yell at the AI. In all caps. Because without that, it will cheerfully skip the context and start hacking on whatever you ask it to.

Second: ARCHITECTURE.md. The system map:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#e8e4de;"># ARCHITECTURE — HomeEasy HQ</span>

<span style="color:#666;">> Why this file exists: Claude Code has no memory between</span>
<span style="color:#666;">> sessions. Every new session must understand the system</span>
<span style="color:#666;">> architecture BEFORE making changes.</span>

<span style="color:#888;">                 INTERNET / LEADS
      (Zillow, Apartments.com, Rent.com, etc.)
                      │
                      ▼
              LEAD INGESTION LAYER
       leads_incoming ← email parser + API webhooks
                      │
            ┌─────────┼──────────┐
            ▼         ▼          ▼
       LOCATOR    LANDLORD    INSURANCE
       AGENT      REP AGENT   (KEN AGENT)
       agent-v4/  Agentic-    Workflows/
                  Client-     ken-insurance/
                  Service/
            │         │          │
            └─────────┼──────────┘
                      ▼
            SHARED INFRASTRUCTURE
       Cloud SQL Postgres, Celery + Redis,
       GKE Cluster, Twilio, Asana, CRM</span>
</pre>

Every session reads this. An AI about to modify the Locator Agent sees the whole system first — the Postgres database shared with the other agents, the Celery queue (which is a shared blast radius — one agent's runaway tasks can starve the others), the GKE deployment names. Those names are legacy and confusing: "homeeasy-agent-v4" is the Locator, "homeeasy-ai-service-v3" is the Landlord Rep. Because naming things is the hardest problem in computer science and I solved it badly.

Third: the session_memory/ directory. Auto-generated summaries that capture what happened. Every time a session ends, a [hook fires](/essays/scar-tissue/) and writes a file:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#e8e4de;"># Auto-Saved Session — 2026-04-02_020337</span>

<span style="color:#888;">## Git State</span>
- <span style="color:#88cc88;">Branch:</span> codex/inventory-forensic-rewrite-20260313
- <span style="color:#88cc88;">Last Commit:</span> 2c917d4 fix: resolve mypy type errors
- <span style="color:#88cc88;">Commit Hash:</span> 2c917d4
- <span style="color:#88cc88;">Uncommitted Changes:</span> 180 files
- <span style="color:#88cc88;">Deploy Detected:</span> false

<span style="color:#888;">## Session Context</span>
<span style="color:#666;">_If these say AUTO-STUB, Claude Code did not run
 /session-save before ending._</span>

<span style="color:#888;">### What was done this session:</span>
<span style="color:#cc8888;">_[AUTO-STUB — next session should review git log
  above to reconstruct]_</span>

<span style="color:#888;">### What broke or failed:</span>
<span style="color:#cc8888;">_[AUTO-STUB]_</span>

<span style="color:#888;">### What needs to happen next:</span>
<span style="color:#cc8888;">_[AUTO-STUB]_</span>
</pre>

See those AUTO-STUB markers? They mean I forgot to run `/session-save` before closing the session. I always forget. The hook captures the git state anyway — the branch, the last commit, the uncommitted files. Next session reads this and reconstructs what happened from the stubs. Imperfect memory beats no memory by an infinite margin.

119 of these files in the directory as of this writing. 119 sessions, each one leaving a trail for the next. Before this system existed, each session was an amnesiac genius — extremely capable, zero continuity.

## The Gap

There's a gap between what git says and what's actually running. Git says commit abc123 is the latest on main. Great. Is that commit deployed? Did the container build succeed? Did the GKE rollout complete? Is the pod actually running that code, or is it still running the previous version because the rollout failed silently and nobody noticed?

During the doom loop, I was looking at git and thinking things were deployed. They weren't. Or they were, but a different version than I thought. Container builds fail for dependency reasons. Rollouts get stuck. Pods restart and pull a cached image instead of the latest. The gap between "I pushed to main" and "this code is handling customer traffic" is where things go to die.

DEPLOYMENT_STATE.md closes that gap. The recovery plan says: "Verify leads actually sending. Record working commit hash HERE. THEN and only then begin new work." The file doesn't track what was attempted. It tracks what was verified. Big difference.

The [pre-session hook](/essays/scar-tissue/) forces every session to read this file before touching anything. The session-end hook forces every session to write what it did before closing. Together they create continuity. Each session knows what the last one did, what's deployed, what's broken, what's been tried and failed.

Before these files existed, I had something similar to what my [engineering team used to do](/essays/i-caught-every-single-thing/) — screenshots of dashboards, Slack messages saying "deployed," verbal assurances. The screenshots can be fabricated. The Slack messages can be wrong. The verbal assurances are worthless. The markdown file in the repo, updated by a deterministic hook, version-controlled by git, read by every session automatically — that's the closest thing I have to truth.

The files are boring. A markdown file listing what's deployed. An ASCII diagram. A directory of auto-stubs. They're boring the way a foundation is boring. Nobody photographs foundations. Foundations keep the building standing.

I still don't always know what's running. Sometimes the deploy state is stale, sometimes I forget to verify, sometimes a rollout happens between sessions and the hook doesn't catch it. The system is imperfect. But imperfect and systematic beats perfect and imaginary. Before the doom loop, I had no system at all, and it cost me $32K and eight days of my life.

These days, when I open a session, the first thing I see is:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
╔══════════════════════════════════════════════════════════╗
║          MANDATORY PRE-SESSION CONTEXT LOAD             ║
╚══════════════════════════════════════════════════════════╝
📋 DEPLOYMENT STATE (last 50 lines):
...
🧠 LAST SESSION MEMORY: 2026-04-02_020337_session_auto.md
...
🏗️  ARCHITECTURE loaded from ARCHITECTURE.md
...
════════════════════════════════════════════════════════════
  READ THE ABOVE. Do NOT start work until you understand
  what is deployed, what broke, and what the last session did.
════════════════════════════════════════════════════════════
</pre>

The AI reads it. Sometimes it even listens.
