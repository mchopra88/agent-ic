---
layout: essay.njk
title: "Three Loops: Retro, Macro, Meta"
order: 2
date: 2025-06-15
---

Most teams have one feedback loop. They do retrospectives. What happened this sprint? What went well? What didn't? This is the retro loop and it operates at the level of individual events. It's necessary and insufficient.

The **retro loop** operates at the conversation level. This lead went cold — why? The AI agent misclassified a response. The follow-up cadence was too aggressive. The building match was wrong. Each failure is a lesson. Each lesson becomes a rule. The CLAUDE.md grows by one line.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# Retro loop example — a real incident becomes a rule

November 2025: Lead #47203 showed as "Closed - Won"
in the dashboard. Revenue report counted it.

I read the actual conversation:
  Renter: "I found a place on my own, thanks"
  Agent: "Great, glad you found something!"
  Status: "Closed - Won"

The AI classified "found a place" as a win.
It wasn't our place. Zero commission. The "won"
status was hallucinated by a classifier that
confused "outcome: resolved" with "outcome: revenue."

One incident. One line added to the rules.
Now a hook checks: does "Closed - Won" have
a matching invoice? If not, flag it.

That's the retro loop: incident → lesson → rule → hook.
The lesson persists even when I forget it.
</pre>

That's a retro loop output. A specific failure, a specific lesson, encoded as a rule that a hook enforces automatically. (I wrote about how these rules accumulate into the [CLAUDE.md governance system](/essays/my-claude-md/) — 1,334 lines of scars across 7 files.)

The **macro loop** operates at the pattern level. Not "what happened in this conversation" but "what's happening across 30,000 conversations this month?" Are qualification rates trending down? Is a particular building generating complaints? Are follow-up cadences converting differently in Dallas than Chicago?

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
The macro loop found these patterns:

Chicago:
  44% of leads → wrong geographic match
  $280 gap between 2br listed vs actual
  68% of successful placements → different
  neighborhood than inquiry

Dallas:
  37% geographic waste (leads shown buildings
  outside comfort zone)
  Tour-to-close ratio 2x higher when building
  is within 3 miles of current ZIP
</pre>

The macro loop requires data infrastructure that most organizations don't have because they're still manually reviewing individual cases. When you have 30,000 conversations a month, you can see patterns that are invisible at the individual level. The geographic waste pattern — 37% of Dallas leads being shown buildings outside their comfort zone — only emerged from aggregate analysis across thousands of conversations. No single conversation would reveal it.

The **meta loop** is the interesting one. It operates at the system level. Not "what's happening in conversations" and not "what patterns emerge across conversations" — but "is the system that generates conversations getting better?"

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Meta loop questions:

- Is the CLAUDE.md getting more precise or more bloated?
- Are the hooks catching real problems or generating noise?
- Is session memory actually helping, or am I ignoring it?
- Are the red team agents finding new failure modes,
  or just re-finding old ones?
- Is the 1:1000 operating leverage ratio improving?
</pre>

The meta loop is where you audit the auditors. The hooks prevent bad deploys — but are the hooks themselves correct? The CLAUDE.md encodes rules — but are the rules still relevant, or has the system evolved past them? The session memory persists context — but is it useful context, or noise that clutters the next session?

<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:2rem 0;">
  <style>
    .l-label { fill:#e8e4de; font-family:'Cormorant Garamond',Georgia,serif; font-size:11px; text-anchor:middle; }
    .l-sm { fill:#666; font-family:'Cormorant Garamond',Georgia,serif; font-size:9px; text-anchor:middle; }
  </style>

  <!-- Loop 1: Retro -->
  <circle cx="120" cy="100" r="60" fill="none" stroke="#444" stroke-width="1"/>
  <text x="120" y="95" class="l-label">Retro</text>
  <text x="120" y="112" class="l-sm">Conversations</text>
  <text x="120" y="175" class="l-sm" style="fill:#555;">individual events</text>

  <!-- Loop 2: Macro -->
  <circle cx="340" cy="100" r="60" fill="none" stroke="#555" stroke-width="1"/>
  <text x="340" y="95" class="l-label">Macro</text>
  <text x="340" y="112" class="l-sm">Patterns</text>
  <text x="340" y="175" class="l-sm" style="fill:#555;">across 30,000 conversations</text>

  <!-- Loop 3: Meta -->
  <circle cx="560" cy="100" r="60" fill="none" stroke="#666" stroke-width="1"/>
  <text x="560" y="95" class="l-label">Meta</text>
  <text x="560" y="112" class="l-sm">System</text>
  <text x="560" y="175" class="l-sm" style="fill:#555;">is the system improving?</text>

  <!-- Connecting arrows -->
  <line x1="185" y1="100" x2="275" y2="100" stroke="#333" stroke-width="1"/>
  <line x1="405" y1="100" x2="495" y2="100" stroke="#333" stroke-width="1"/>
</svg>

Most organizations never get past the retro loop. They review incidents, write postmortems, and move on. The best organizations build the macro loop — dashboards, analytics, trend detection. Almost nobody builds the meta loop, because it requires asking uncomfortable questions about whether your own processes are working.

I run all three loops simultaneously, on every business unit, continuously. The retro loop is the hooks and the CLAUDE.md rules. The macro loop is the data pipeline that aggregates across all conversations. The meta loop is the skill called `/audit-claude-md` that reviews the entire governance system for bloat, outdated rules, and content that should be moved or deleted.

The meta loop is also this essay. Writing about the system forces me to examine it from outside. Is the three-loop framework actually making things better? Or is it just adding complexity that makes me feel productive?

The honest answer: I don't always know. But the loops keep running whether I'm confident or not.
