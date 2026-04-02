---
layout: essay.njk
title: "The One-Person Engineering Team: How I Push More Code Than a Department"
order: 4
date: 2025-07-20
---

On a typical day I have eight or nine tmux sessions running on a Mac Studio with 96GB of RAM. Each session is a different workstream: CI/CD pipeline, lead matching, insurance agent, collections, alerts, deployment, YGL deals, red team testing, financial analysis. Claude Code runs in each one.

I push more code in a day than my previous engineering team pushed in a month. That's not hyperbole — I can measure it in commits, in lines changed, in features shipped. But the interesting thing isn't the volume. It's the architecture of the workflow.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# My "engineering team" — 8 tmux sessions on one machine

Session 1: agent-v4     → Apartment Locator Agent
Session 2: ygl-service  → Landlord Rep Agent (Blue Lake)
Session 3: ken-agent    → Insurance Agent (Assurant)
Session 4: ci-pipeline  → CI/CD, testing, deploys
Session 5: data-pipe    → Inventory pipeline, building data
Session 6: financial    → Revenue tracking, P&L, payments
Session 7: red-team     → Adversarial testing across all agents
Session 8: infra        → GKE, alerts, monitoring, debugging

Each session: Claude Code + full CLAUDE.md context
Each session: independent git branch
Each session: own set of hooks and guardrails
</pre>

The key insight is that AI coding tools don't just write code faster — they change the coordination model. The reason engineering teams exist is coordination: you need multiple people because one person can't hold the entire system in their head. But when the AI holds the context (via CLAUDE.md, session memory, and hooks), a single person can switch between eight workstreams without losing state.

The CLAUDE.md is the critical piece. It's not a style guide — it's the institutional knowledge of the entire engineering organization. Seven CLAUDE.md files across different services, totaling 1,334 lines. They encode every rule, every lesson, every scar from every production incident. When I switch from the insurance agent session to the CI/CD session, the AI already knows the context. It read the CLAUDE.md. It loaded the session memory. It knows what was deployed, what broke, and what's next.

Here's what context switching actually looks like. I'm in session 3 (insurance agent), debugging a Socratic question that's misfiring on "already have insurance" objections. I get a Slack notification: matching is returning zero results for Dallas leads. I switch to session 1:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# The switch — tmux session 3 → session 1

$ tmux select-window -t agent-v4

# Session 1 loads. CLAUDE.md already loaded.
# Session memory shows last context:

  Last session: 2025-10-14 22:30
  Task: Geographic scoring fix (Dallas)
  Status: Deployed, monitoring
  Note: "Watch for zero-result queries in Dallas.
         The radius bug may have siblings."

# The session PREDICTED the current bug.
# I don't need to re-explain the context.
# I type one sentence:

Me: "Dallas zero-result queries are back.
     Check if the radius fix regressed."

AI: "Reading the deploy log...
     The fix from Oct 14 is still live (commit a3f91c2).
     But there's a new issue: the ILS feed for
     Apartments.com changed their coordinate format
     from (lat,lng) to (lng,lat) on Oct 16.
     Every Dallas building imported since then has
     inverted coordinates. 847 buildings affected."

# Total time from Slack notification to root cause: 90 seconds.
# No standup. No context doc. No "let me catch up."
# The session memory already knew the context.
</pre>

That's the coordination model. The AI holds the context via the CLAUDE.md (governance), the session memory (what happened last time), and the hooks (what to check before starting). The equivalent in a traditional team would be a mandatory standup where everyone reads the incident log before writing any code. Except it happens automatically and takes two seconds. I wrote about the full hook system — including the one that yells "READ THE ABOVE" at the AI in all caps — in [My CLAUDE.md](/essays/my-claude-md/).

The velocity: [531 commits in 15 months](/essays/git-log/), one person. 7 CLAUDE.md files (1,334 lines), 8 hooks, 12 skills, 119 session memory files. The institutional memory of an entire engineering organization, stored in text files that the AI reads on every interaction.

The definition of "technical" has changed. It used to mean "can you write a sorting algorithm on a whiteboard?" Now it means "can you orchestrate AI systems at production scale?" I can't write a sorting algorithm on a whiteboard. I can orchestrate eight concurrent AI workstreams, each running production services handling thousands of conversations a day, with governance hooks that prevent the catastrophic failures that used to require a team to catch.

In the new definition, I'm more technical than most people with CS degrees. Not because I'm smarter. Because the definition shifted to what I'm good at: systems thinking, architecture, judgment, and the stubborn refusal to stop building.
