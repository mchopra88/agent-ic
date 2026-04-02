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

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# pre-session-read-state.sh — fires on every session start

echo "╔══════════════════════════════════════════════╗"
echo "║   MANDATORY PRE-SESSION CONTEXT LOAD         ║"
echo "╚══════════════════════════════════════════════╝"

# 1. Deployment State
tail -50 "$DEPLOY_LOG"

# 2. Last session memory
cat "$LAST_SESSION"

# 3. Fresh eyes debt
DEBT_COUNT=$(grep -c "NOT REVIEWED" "$FRESH_EYES_DEBT")
if [[ "$DEBT_COUNT" -gt 0 ]]; then
  echo "ACTION REQUIRED: Run /fresh-eyes FIRST"
fi

# 4. Current git state
echo "Branch: $(git branch --show-current)"
echo "Last commit: $(git log --oneline -1)"
echo "Uncommitted: $(git status --porcelain | wc -l) files"
</pre>

This hook runs before every session. It's deterministic — can't be skipped, can't be ignored. It forces context loading before any new work starts. The equivalent in a traditional engineering team would be a mandatory standup where everyone reads the incident log before writing any code. Except the standup happens automatically and takes two seconds.

The velocity numbers tell the story:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
531 commits in 15 months (one person)

7 CLAUDE.md files — 1,334 lines of governance
12 skills — reusable domain knowledge
7 commands — slash commands for workflows
8 hooks — deterministic guardrails
119 session memory files — institutional memory
</pre>

The definition of "technical" has changed. It used to mean "can you write a sorting algorithm on a whiteboard?" Now it means "can you orchestrate AI systems at production scale?" I can't write a sorting algorithm on a whiteboard. I can orchestrate eight concurrent AI workstreams, each running production services handling thousands of conversations a day, with governance hooks that prevent the catastrophic failures that used to require a team to catch.

In the new definition, I'm more technical than most people with CS degrees. Not because I'm smarter. Because the definition shifted to what I'm good at: systems thinking, architecture, judgment, and the stubborn refusal to stop building.
