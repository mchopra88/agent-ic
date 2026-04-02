---
layout: essay.njk
title: "One tmux, Eight Sessions, Zero Engineers"
order: 18
date: 2025-11-10
---

Right now, on a Mac Studio M4 Pro with 96GB of RAM sitting in my home office, there are eight tmux sessions running. Each one has Claude Code active. Each one is a different workstream. This is what my "engineering team" looks like:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
$ tmux list-sessions

agent-v4:     3 windows  — Apartment Locator
ygl-service:  2 windows  — Landlord Rep (Blue Lake)
ken-agent:    2 windows  — Insurance Agent (Assurant)
ci-pipeline:  1 window   — CI/CD, testing, deploys
data-pipe:    2 windows  — Inventory pipeline
financial:    1 window   — Revenue, P&L, payments
red-team:     1 window   — Adversarial testing
infra:        1 window   — GKE, monitoring, debugging
</pre>

I work in one session, switch to another, come back. The sessions don't lose state because they're tmux — they persist. The AI doesn't lose context because the CLAUDE.md loads fresh on every interaction, and the session memory carries what happened in the last conversation. I can leave the insurance agent mid-conversation, go fix a matching bug in the locator, deploy it, come back to the insurance agent, and it knows exactly where we left off.

Mutagen keeps the local filesystem in sync with the remote development environment. The Mac Studio is both the development machine and the deployment staging server. When I SSH from my MacBook Air — whether I'm on the couch or in a Vienna airport lounge — I'm looking at the same tmux sessions, the same git state, the same running services.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# What each session has loaded:

1. Its own CLAUDE.md (business-unit specific rules)
2. The master CLAUDE.md (cross-cutting governance)
3. Session memory from the last conversation
4. Pre-session hook output:
   - Current deployment state
   - Last session summary
   - Fresh-eyes debt
   - Current git state
5. All hooks active:
   - bash-guard (blocks destructive commands)
   - post-edit-lint (catches syntax errors)
   - session-end-save (preserves state)
   - Ralph Wiggum (autonomous loop control)
</pre>

The 96GB of RAM matters because Claude Code is memory-hungry when running multiple instances. Each session loads the full context — CLAUDE.md files, session memory, the entire codebase index. Eight sessions × roughly 8-10GB each = most of the RAM. The M4 Pro handles it without thermal throttling, which matters at 3 AM when you've been running overnight batch jobs for six hours.

This is the one-person engineering team. Not a heroic individual working 80-hour weeks. A system designed so that one person, with the right tools and architecture, can operate at the same throughput as a small engineering department. The leverage isn't working harder — it's the CLAUDE.md files, the hooks, the session memory, and the governance layer that makes every AI interaction build on every previous one.

The machine on my desk costs less than one month of a junior engineer's salary. It runs 24/7. It doesn't take PTO. And every session it runs makes the next session better, because the rules accumulate and the scars persist.
