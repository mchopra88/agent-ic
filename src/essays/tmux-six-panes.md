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
ken-agent:    2 windows  — Insurance Agent
ci-pipeline:  1 window   — CI/CD, testing, deploys
data-pipe:    2 windows  — Inventory pipeline
financial:    1 window   — Revenue, P&L, payments
red-team:     1 window   — Adversarial testing
infra:        1 window   — GKE, monitoring, debugging
</pre>

I work in one session, switch to another, come back. The sessions don't lose state because they're tmux — they persist. The AI doesn't lose context because the CLAUDE.md loads fresh on every interaction, and the session memory carries what happened in the last conversation. I can leave the insurance agent mid-conversation, go fix a matching bug in the locator, deploy it, come back to the insurance agent, and it knows exactly where we left off.

Mutagen keeps the local filesystem in sync with the remote development environment. The Mac Studio is both the development machine and the deployment staging server. When I SSH from my MacBook Air — whether I'm on the couch or in a Vienna airport lounge — I'm looking at the same tmux sessions, the same git state, the same running services.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# What Mutagen syncs — the invisible layer

$ mutagen sync list
  Name: homeeasy-main
  Alpha: /Users/mukund/homeeasy-hq (Mac Studio)
  Beta:  mukund@macbook:/Users/mukund/homeeasy-hq
  Status: Watching for changes
  Last sync: 0.3s ago

# When I SSH from the MacBook Air:
$ ssh studio -t "tmux attach -t agent-v4"

# I'm looking at the same terminal, same git state,
# same running services. Whether I'm on the couch,
# in a Vienna airport lounge, or at a coffee shop
# in Connaught Place.

# The Mac Studio is always on. tmux is always running.
# The sessions don't close when I disconnect.
# I can start debugging a matching bug at 10 PM,
# disconnect, reconnect at 2 AM from bed,
# and the cursor is exactly where I left it.
</pre>

The 96GB of RAM matters because Claude Code is memory-hungry when running multiple instances. Each session loads the full context — CLAUDE.md files, session memory, the entire codebase index. Eight sessions × roughly 8-10GB each = most of the RAM. The M4 Pro handles it without thermal throttling, which matters at 3 AM when you've been running overnight batch jobs for six hours.

This is the one-person engineering team. Not a heroic individual working 80-hour weeks. A system designed so that one person, with the right tools and architecture, can operate at the same throughput as a small engineering department. The leverage isn't working harder — it's the CLAUDE.md files, the hooks, the session memory, and the governance layer that makes every AI interaction build on every previous one.

The machine on my desk costs less than one month of a junior engineer's salary. It runs 24/7. It doesn't take PTO. And every session it runs makes the next session better, because the rules accumulate and the scars persist.
