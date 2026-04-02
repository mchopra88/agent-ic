---
layout: essay.njk
title: "Why I Replaced My Engineering Team With AI"
order: 8
date: 2025-09-15
---

I didn't fire my engineering team because AI is trendy. I fired them because they sent a million text messages in a single deployment, killed the database, racked up five figures in Twilio charges, and then claimed the deploy hadn't landed in production.

That was the breaking point, but not the beginning. The beginning was years of the same cycle: hire contractors, explain the vision, wait for builds that arrived late and wrong, debug their code myself, realize I understood the system better than the people I was paying to build it. The cycle repeated with different people, different rates, different promises, identical outcomes.

## The Cycle

The first team was a development shop in India. They built the initial CRM integration. It worked, mostly, until it didn't — and when it didn't, I couldn't debug it because the code had no comments, no tests, and a deployment process that consisted of someone SSHing into a server and running scripts. When I asked for documentation, they sent a PDF with screenshots of the UI. Not the code. The UI.

The second team was US-based freelancers. Better communication, higher rates, same fundamental problem: they built what I described, not what I needed. The gap between description and need is where software projects die. I'd say "build a lead routing system" and get a system that routed leads based on a round-robin algorithm. I needed one that routed based on geographic proximity, building commission rates, and agent availability. Same words, completely different system. By the time I realized the gap, we'd burned two months.

The third team — the ones who sent the million messages — were the best I'd had. Competent engineers. Good communicators. They understood the domain. And they still couldn't verify their own deployments.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
The engineering team cost structure:

  Developer 1:    $2,000/month (part-time contractor)
  Developer 2:    $1,500/month (part-time contractor)
  Twilio charges: $800/month (normal operations)
  Total:          ~$4,350/month

  Output in the last 3 months before termination:
  - 2 features shipped (one broken, one incomplete)
  - 1 "deploy" that didn't land in production
  - 1 deploy that sent 1,039,939 messages
  - 0 tests written
  - 0 deployment verification procedures
  - 0 incident postmortems
  - Net revenue generated: $0

  Cost per useful output: undefined (division by zero)
</pre>

David McRaney writes about ego depletion — the idea that willpower is a finite resource. You spend it resisting one temptation and have less for the next. The classic experiment: people who resisted eating chocolate chip cookies gave up faster on an impossible puzzle.

The engineering team had the same problem. The 1,039,939 messages weren't malicious. They were the result of a team that was too depleted to check their work. The deploy was supposed to go to 200 test leads. Nobody verified the WHERE clause. Checking your work is effortful. Verification is boring. After a long day of coding, the last thing anyone wants to do is open the production logs and count records. So they didn't. And a million messages went out.

## The PR Reviewer Experiment

After the Twilio incident but before I fired the team entirely, I tried a middle path. I'd heard from other founders that the "keep engineers as reviewers" model worked well — you do the building, they catch the bugs. Separation of concerns. The best of both worlds.

I started writing code with Claude Code. The engineers would review every PR before it merged. Their job changed from builders to gatekeepers. In theory, this would combine my speed (AI-assisted development, understanding the full system, no context-switching between teams) with their expertise (catching logic errors, security issues, edge cases I'd miss).

It lasted about two months. Here's what actually happened:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
The PR Reviewer Experiment (8 weeks):

  Week 1-2: Enthusiastic reviews. Detailed comments.
    "This could have a race condition on line 47."
    "Consider using a connection pool here."
    Useful. Worth the cost.

  Week 3-4: Reviews get shorter.
    "LGTM" — no comments.
    "Looks good, minor nit on formatting."
    Not catching logic bugs. Not testing.

  Week 5-6: Reviews become a bottleneck.
    3-day turnaround on reviews.
    I'd write a feature in 2 hours, wait 3 days for review.
    PRs piling up. Deploy velocity drops 70%.

  Week 7-8: The screaming matches.
    I find a production bug. "Why didn't the review catch this?"
    "The code was complex." "We were focused on architecture."
    "That edge case wasn't in the test suite."
    All true. All irrelevant.

  Result: The reviews caught formatting issues and
    style inconsistencies. They did NOT catch:
    - The matching bug that made 37% of Dallas
      inventory invisible
    - A Twilio webhook that silently dropped messages
    - A database query that ran without an index
      (3-second response times in production)

  The things the reviews caught were cosmetic.
  The things they missed were catastrophic.
</pre>

The screaming matches were about accountability, and they were ugly. I'd find a bug in production that had passed review. I'd ask why the review didn't catch it. The answer was always some version of "that's a logic issue, not a code issue" or "we reviewed the code, not the business logic" or "we didn't have the context to know that was wrong."

That last one was the killer. "We didn't have the context." Of course they didn't. They weren't building the system — they were reviewing diffs. A diff shows you what changed, not why it changed, not what it's supposed to do, not what breaks if it's wrong. Reviewing code without context is like proofreading a legal document without knowing the law. You can catch typos. You can't catch the thing that matters.

The engineers were demoralized too. They went from building things — creative, challenging, autonomous work — to rubber-stamping things someone else built. The resentment was palpable. They didn't say it directly, but it came through in the declining quality of reviews, the increasing turnaround times, the perfunctory "LGTM" approvals. They were going through the motions. Ego depletion again — the willpower to carefully review someone else's code, line by line, when you used to be the one writing it, depletes fast.

I was paying $4,350 a month for reviews that didn't catch anything that mattered and slowed down every deploy by three days.

## What I Built Instead

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# What replaced the PR reviewers

# pre-bash-safeguard.sh
# "Two jobs: clean stale git locks,
#  block destructive SQL."

if echo "$COMMAND" | grep -iqE \
  '(DROP\s+TABLE|TRUNCATE|DELETE\s+FROM\s+\w+\s*;)'; then
  echo "BLOCKED: Destructive SQL detected." >&2
  exit 2
fi

# This hook NEVER prints instructions for Claude
# to follow. It either BLOCKS or ALLOWS. That's it.

# post-edit-lint.sh
# Runs AFTER every Edit or Write tool call.
if ! python3 -m py_compile "$FILE_PATH" 2>&1; then
  echo "SYNTAX ERROR in $FILE_PATH" >&2
  exit 0  # Non-blocking — just warns
fi

# stop-fresh-eyes-check.sh
# Runs on session exit.
# If files were changed without a /fresh-eyes review,
# logs them to fresh_eyes_debt.md.
# Next session, the pre-session hook shows the debt.
# The review WILL happen. Not because someone remembers.
# Because the system forces it.
</pre>

The hooks replaced the PR reviewers. Not because hooks are smarter than humans — they're not. A hook can't evaluate business logic. A hook can't assess whether a matching algorithm makes sense for the Dallas market. But the hooks have two properties that human reviewers don't:

**They never get depleted.** The hook runs at 2 AM with the same diligence as at 10 AM. The hook runs on the 500th PR with the same attention as on the first. The hook doesn't get frustrated, bored, resentful, or distracted.

**They never need context.** The hook doesn't need to understand the business to block a DROP TABLE. The hook doesn't need to understand the matching algorithm to verify that the edited file compiles. The hook doesn't need to understand the deploy strategy to require a /fresh-eyes review before pushing.

The fresh-eyes system is the closest thing to a real PR review: it spawns a new Claude Code context — one that hasn't been working on the code all day, one that isn't biased by the decisions made during the session — and asks it to review the changes with cold eyes. It catches things the session context normalized. It's not as good as a great human reviewer. It's better than a depleted one. And it runs every time, automatically, without asking.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# From the actual CLAUDE.md

## Teaching Mode (ALWAYS ON)
Mukund is a 15-year founder running an AI agent
team with no human engineers.
Explain EVERYTHING: what you're doing, why,
define terms, show architecture, discuss trade-offs.
Don't dumb it down. He's smart and learns fast.
Just don't assume DevOps/SRE knowledge.
If he corrects you — learn from it,
update CLAUDE.md/MEMORY.md, never repeat.
</pre>

Teaching mode exists because of the identity shift. I went from "I'm a business operator who hires engineers" to "I am the engineer." Every deployment, every database migration, every infrastructure choice — I needed to understand it well enough to debug it at 2 AM, because there was no one else to call. The AI doesn't just execute. It explains. It teaches. It makes the hard thing accessible without making it simple.

## The Velocity

Today I operate with zero human engineers. My collaborator is an AI coding tool running in tmux sessions on a Mac Studio — eight sessions at a time, each handling a different part of the system. CI/CD, matching, insurance, collections, alerts, deployment.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Monthly commit velocity (agent-v4 + agentic-client-service):

  2025-01  ██████████████░░░░░░░░░░░░░░  47
  2025-02  ██████████████████░░░░░░░░░░  58
  2025-03  ████████████████████████░░░░  78
  2025-04  ██████████████████████████░░  85
  2025-05  ████████████████████████░░░░  76
  2025-06  ██████████████████████████░░  82
  2025-07  ██████████████████████████████░░  98
  2025-08  ██████████████████████████████░░░░  108
  2025-09  █████████████████████████████░░░  102
  2025-10  ██████████████████████████████░░░░░  115
  2025-11  ██████████████████████████████████░  118
  2025-12  ████████████████████████████████░░░  112
  2026-01  ████████████████████████████████████░  124
  2026-02  ████████████████████████████████████████  133

  Total: 531 commits in 15 months. One person.
  Previous team output: ~20-30 commits/month, 2 people.
</pre>

The velocity is increasing, not decreasing. This is the opposite of what happens in traditional engineering teams, where velocity peaks early and gradually slows as the codebase grows, technical debt accumulates, and coordination overhead compounds. Solo AI-assisted development has a different curve: each session builds on the last because the CLAUDE.md encodes cumulative lessons, the session memory preserves context, and the hooks prevent regression.

The hardest part isn't the technology. It's the identity shift. For most of this journey, I thought that made me unemployable — the guy who builds alone in a bunker for an industry nobody takes seriously. Turns out the skills I built — orchestrating AI agents at production scale, building autonomous overnight operations, collapsing entire business functions into code — are the exact thing every company is trying to figure out.

Marc Andreessen has this thing about Joe Pike, the character with the red arrows tattooed on his deltoids, always pointing forward. "We don't stop. We don't slow down. We don't revisit past decisions." The question Andreessen will never answer is "what would you have done differently?" because you didn't know what you didn't know.

I don't revisit the Twilio incident as a regret. I don't revisit the PR reviewer experiment as a failure. I don't revisit the screaming matches as something I wish I'd handled differently. I revisit them as the origin story. The million messages created the hook. The failed reviews created the fresh-eyes system. The screaming matches taught me that accountability without automation is theater. The architecture that replaced the team was born from every failure the team produced.

Forward.
