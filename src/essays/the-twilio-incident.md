---
layout: essay.njk
title: "The Twilio Incident"
status: "Draft"
order: 25
date: 2026-02-28
---

A code bug triggered a runaway SMS process through Twilio. In five days:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Total messages sent:     1,039,939
Failed:                    528,000
Undelivered:               394,000
Actually delivered:        117,000
Still queued when caught:   33,900
</pre>

The code had a loop that was supposed to send follow-up SMS messages to leads who hadn't responded. The loop didn't have a proper termination condition. It also didn't check whether a message had already been sent. It ran against the production database.

Over a million messages went out in hours, not days. The database buckled under the write load — connections overwhelmed. Chase flagged the charges as fraud. First a $100 decline, then $200. But Twilio's queue doesn't stop when your credit card declines. The messages kept queuing and retrying. 33,900 were sitting in the pipeline when we finally killed the process.

Leads who had opted out received messages. Leads who had already converted received re-engagement texts. Some leads got the same message dozens of times. The TCPA exposure — sending unsolicited messages to people who had explicitly opted out — is the kind of thing that generates class action lawsuits.

The engineering team's response: "The deploy didn't land in production."

It had. The evidence was in a million message logs.

<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:2rem 0;">
  <style>
    .box { fill:none; stroke:#444; stroke-width:1; }
    .box-active { fill:#111; stroke:#666; stroke-width:1; }
    .box-danger { fill:#1a0000; stroke:#660000; stroke-width:1; }
    .label { fill:#e8e4de; font-family:'Cormorant Garamond',Georgia,serif; font-size:12px; }
    .label-sm { fill:#888; font-family:'Cormorant Garamond',Georgia,serif; font-size:10px; }
    .label-danger { fill:#cc4444; font-family:'Cormorant Garamond',Georgia,serif; font-size:10px; }
    .line { stroke:#333; stroke-width:1; }
    .line-danger { stroke:#660000; stroke-width:1; stroke-dasharray:4,4; }
  </style>
  <!-- Timeline header -->
  <text x="10" y="20" class="label-sm" style="fill:#666; text-transform:uppercase; letter-spacing:0.1em;">The Incident Timeline</text>

  <rect x="10" y="30" width="120" height="45" rx="3" class="box-active"/>
  <text x="70" y="50" text-anchor="middle" class="label-sm">Bad merge</text>
  <text x="70" y="64" text-anchor="middle" class="label-sm" style="fill:#555;">Day 0</text>

  <line x1="130" y1="52" x2="155" y2="52" class="line"/>

  <rect x="155" y="30" width="120" height="45" rx="3" class="box-danger"/>
  <text x="215" y="50" text-anchor="middle" class="label-danger">Runaway loop</text>
  <text x="215" y="64" text-anchor="middle" class="label-sm" style="fill:#555;">1M+ messages</text>

  <line x1="275" y1="52" x2="300" y2="52" class="line-danger"/>

  <rect x="300" y="30" width="120" height="45" rx="3" class="box-danger"/>
  <text x="360" y="50" text-anchor="middle" class="label-danger">DB overwhelmed</text>
  <text x="360" y="64" text-anchor="middle" class="label-sm" style="fill:#555;">Connections maxed</text>

  <line x1="420" y1="52" x2="445" y2="52" class="line-danger"/>

  <rect x="445" y="30" width="110" height="45" rx="3" class="box-danger"/>
  <text x="500" y="50" text-anchor="middle" class="label-danger">Chase fraud alert</text>
  <text x="500" y="64" text-anchor="middle" class="label-sm" style="fill:#555;">Cards declined</text>

  <line x1="555" y1="52" x2="580" y2="52" class="line"/>

  <rect x="580" y="30" width="90" height="45" rx="3" class="box-active"/>
  <text x="625" y="50" text-anchor="middle" class="label-sm">Kill process</text>
  <text x="625" y="64" text-anchor="middle" class="label-sm" style="fill:#555;">Day 5</text>

  <!-- The response -->
  <text x="10" y="110" class="label-sm" style="fill:#666; text-transform:uppercase; letter-spacing:0.1em;">What I Built After — Three Layers of Defense</text>

  <!-- Layer 1 - weakest -->
  <rect x="10" y="125" width="210" height="55" rx="3" class="box"/>
  <text x="115" y="145" text-anchor="middle" class="label-sm">Layer 1: Code-Level Hooks</text>
  <text x="115" y="160" text-anchor="middle" class="label-sm" style="fill:#555;">pre-bash-safeguard blocks dangerous commands</text>
  <text x="115" y="173" text-anchor="middle" class="label-sm" style="fill:#444;">Weakest — same system that caused the bug</text>

  <!-- Layer 2 -->
  <rect x="235" y="125" width="210" height="55" rx="3" class="box-active"/>
  <text x="340" y="145" text-anchor="middle" class="label-sm">Layer 2: Infrastructure Limits</text>
  <text x="340" y="160" text-anchor="middle" class="label-sm" style="fill:#555;">Twilio daily caps, Postgres statement timeouts</text>
  <text x="340" y="173" text-anchor="middle" class="label-sm" style="fill:#888;">Strong — code can't override infrastructure</text>

  <!-- Layer 3 - strongest -->
  <rect x="460" y="125" width="210" height="55" rx="3" class="box-active"/>
  <text x="565" y="145" text-anchor="middle" class="label-sm">Layer 3: External Watchdog</text>
  <text x="565" y="160" text-anchor="middle" class="label-sm" style="fill:#555;">Standalone script, separate Twilio number</text>
  <text x="565" y="173" text-anchor="middle" class="label-sm" style="fill:#e8e4de;">Strongest — fully independent of the app</text>

  <!-- Key insight -->
  <text x="10" y="215" class="label-sm">The real lesson: hooks are instructions to the AI. The AI is the thing that caused the disaster.</text>
  <text x="10" y="232" class="label-sm">You're asking the thing that broke your system to follow rules about not breaking your system.</text>
  <text x="10" y="249" class="label-sm" style="fill:#888;">The wall isn't in the code. It's in the infrastructure around the code. Twilio caps on Twilio's side.</text>
  <text x="10" y="266" class="label-sm" style="fill:#888;">Postgres limits on Postgres's side. A watchdog that runs independently of everything else.</text>
</svg>

Twilio offered $5,119 back — 75% of the charges. I took it immediately.

That was the moment I stopped trusting humans with production systems. Not because humans are bad at engineering. But because the cost of a mistake in a system processing 30,000 conversations a month is catastrophic, and humans make mistakes at a rate that's incompatible with that scale.

The engineers who manually intervened to kill the queue — the same team I was about to fire — did solid crisis response. They canceled the 33,900 queued messages via the Twilio API. I was grateful. I told them so. They went right back to doing nothing the next week. They fixed the acute crisis but never built anything to prevent the next one. That pattern — heroic firefighting, zero prevention — is why the team no longer exists.

Everything I built after traces back to this incident:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# From bash-guard.sh — the PreToolUse hook born from this incident
#
# THREE jobs, each deterministic:
#   1. BLOCK destructive commands (SQL, kubectl mutations, rm -rf)
#   2. DETECT deploy commands (set IS_DEPLOY flag)
#   3. GATE git push → require fresh-eyes + syntax check
#
# Exit codes: 0 = allow, 2 = BLOCK
# This hook NEVER prints instructions for Claude to follow.
# It either BLOCKS or ALLOWS. That's it.
#
# STATE PHILOSOPHY (Mar 22, 2026):
#   All checks are STATELESS or session-scoped.
#   No persistent marker files.
</pre>

But the hook is the seatbelt. The infrastructure limits are the crash barriers on the highway. Twilio's daily send cap, set in the Twilio console, is something no code bug can override. Postgres connection limits and statement timeouts mean the database says no when the application goes insane. The external watchdog — a standalone Python script on the Mac Studio in its own tmux session, querying the database every five minutes via a completely separate Twilio number — texts my personal phone if anything looks wrong.

The AI that builds my code never sees the watchdog script. Never edits it. Never deploys it. It exists in a different tmux session, on a different code path, using different credentials. Defense in depth, where each layer is physically separate from the others.

Every safety mechanism in my system is a monument to this incident. Every hook is a scar. The CLAUDE.md database safety section, the bottom-up analysis law, the fresh-eyes review gate, the pre-push check — all of it starts here, in a million text messages and a database on its knees.
