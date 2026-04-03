---
layout: essay.njk
title: "git log --oneline | wc -l"
order: 12
date: 2025-10-05
tier: commercial
---

531 commits across two main repositories in the last 15 months. One person. No engineering team.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
$ git log --oneline | wc -l
531

$ find . -name "*.py" | xargs wc -l | tail -1
  1,004,287 total

$ find . -name "CLAUDE.md" | wc -l
7

$ cat CLAUDE.md | wc -l
207

$ cat */CLAUDE.md Workflows/*/CLAUDE.md | wc -l
1334

$ ls session_memory/ | wc -l
119

Monthly commit velocity:

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
</pre>

The velocity is increasing, not decreasing. This is the opposite of what happens in traditional engineering teams, where velocity peaks early and gradually slows as the codebase grows, technical debt accumulates, and coordination overhead compounds. Solo AI-assisted development has a different curve: each session builds on the last because the CLAUDE.md encodes cumulative lessons, the session memory preserves context, and the hooks prevent regression.

The 1,004,287 lines of Python includes generated code, test fixtures, and configuration. The actual hand-directed code is closer to 200,000 lines. But the distinction matters less than you'd think — I directed every line, I understand every module, and I can debug any part of the system when it breaks. That's the trade-off of building solo — you know everything, but nobody catches your blind spots.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
What those 531 commits look like — a real week (Feb 10-16, 2026):

  Mon  fix: YGL pipeline — recover 17 zero-message leads
  Mon  add: employee filter to prevent internal lead leakage
  Mon  fix: triple-messaging bug in follow-up cadence
  Tue  feat: universal compliance layer for TCPA
  Tue  fix: Ken agent — Gemini timeout causing silent drops
  Tue  feat: daily qualification report (auto-email)
  Wed  feat: inventory gate — block stale buildings from matching
  Wed  fix: hotsheet email pipeline (201 unread, 11 days stale)
  Wed  feat: hourly scorecard for lead flow monitoring
  Thu  fix: duplicate message dedup (Twilio webhook retry)
  Thu  feat: doc screening classifier for YGL voucher lane
  Fri  fix: LTV checkout upgrade for Ken insurance flow
  Fri  feat: overnight full-system simulation (78 bugs found)
  Sat  fix: infinite loop in Ralph Wiggum promise checker
  Sun  feat: lead intelligence — Gemini extraction pipeline

  15 commits in 7 days. Features, fixes, incidents, infra.
  No sprints. No standups. No planning poker.
  Just the next thing that's broken or needed.
</pre>

The most interesting metric isn't the commit count. It's the ratio: 531 commits / 1 person = 531. A typical 5-person engineering team might produce 200-300 commits per month across the team. I'm producing 85-133 per month solo. The per-person velocity is roughly 2x a traditional developer, but the coordination overhead is zero.

Zero standups. Zero PRs waiting for review (the hooks are the reviewer). Zero merge conflicts between team members. Zero "I was waiting on the API team" blockers. Zero onboarding time for new contexts (the CLAUDE.md handles it). Zero knowledge loss when someone quits.

The cost of this: no one catches my blind spots except the red team agents. No one pushes back on architecture decisions except the meta loop. No one says "this is a bad idea" except the hooks, and hooks can only enforce rules I've already written. The things I don't know I don't know — the unknown unknowns — have no defense.

That's the honest trade-off. And it's worth it.
