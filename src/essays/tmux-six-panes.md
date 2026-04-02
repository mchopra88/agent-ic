---
layout: essay.njk
title: "One tmux, Eight Sessions, Zero Engineers"
status: "Draft"
order: 18
date: 2025-11-10
---

Right now, on a Mac Studio M4 Pro with 96GB of RAM sitting in my home office, there are eight tmux sessions running. Each one has Claude Code active. Each one is a different workstream. This is what my "engineering team" looks like:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
tmux sessions:
  cicd          — CI/CD pipeline, Cloud Build, GKE deployments
  ygl           — Landlord Rep agent (YGL/Blue Lake deals)
  insurance     — Ken agent (renters insurance SMS sales)
  matching-fix  — Lead-to-inventory matching logic
  collections   — Commission tracking and payment reconciliation
  alerts        — Discord webhooks, monitoring, error channels
  deploy-fix    — Production hotfixes when something breaks at 2am
  redteam       — Adversarial testing against production agents
</pre>

I context-switch between these the way an engineering manager would context-switch between team standups. But I'm not managing. I'm building. In each session, Claude Code has the full context of that workstream — the CLAUDE.md, the session memory, the relevant skill documents. When I come back to a session after four hours, the context is still there.

The Mac Studio matters. 96GB of unified memory means I can run multiple LLM sessions, a local PostgreSQL connection, Docker builds, and Mutagen file sync simultaneously without swapping. The M4 Pro's single-thread performance means compilation is instant. The machine is an investment — but it costs less than one month of one junior engineer's salary, and it will last three years.

Mutagen syncs my local filesystem to the GKE cluster. When I save a file locally, it's on the cluster within seconds. When I `git push`, Cloud Build triggers, Docker builds, and the new image rolls out to production. The entire deploy pipeline is 3-4 minutes from commit to live.

This is not how software engineering is supposed to work. One person shouldn't be able to run eight parallel workstreams across four business units. But that's the whole point of AI-native development: the bottleneck is no longer typing speed or engineering headcount. The bottleneck is architectural judgment and domain knowledge. I have both. The machine handles the rest.

<p class="coming-soon">Full essay coming soon — will include actual tmux screenshots, the Mutagen config, the Mac Studio build vs. previous team output, and the daily workflow documented hour by hour.</p>
