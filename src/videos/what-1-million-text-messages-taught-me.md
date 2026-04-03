---
layout: video.njk
title: "What 1,039,939 Accidental Text Messages Taught Me"
series: "What I Learned From..."
duration: "4 min"
order: 45
date: 2026-03-05
videoFile: text-messages.mp4
---

<div style="color:#666; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:2rem;">Script &middot; Personal Story</div>

## COLD OPEN

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
[SCREEN: A phone. One text message appears.
Then another. Then they start flooding —
messages stacking faster than you can read.]

NARRATOR (V.O.):
On a Tuesday afternoon in 2024, my system
sent 1,039,939 text messages in a single
deployment.

[The counter accelerates: 100K... 500K... 1M...]

I was supposed to send 200.

[BEAT.]

This is not a story about a bug.
This is a story about what I built
because of it.
</pre>

---

## ACT 1: THE INCIDENT (0:00–1:00)

**NARRATION:** "I had an engineering team. They deployed a messaging update that was supposed to go to a test cohort of 200 leads. Instead, it went to every lead in the database. Every. Single. One."

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
[ANIMATION: A deployment pipeline. Green lights
turn yellow, then red. Twilio charges tick up
like a gas pump — $1,000... $5,000... $15,000...]

NARRATOR (V.O.):
Five figures in Twilio charges in an afternoon.
The database ground to a halt under the write
load. And the engineering team's response?

[SCREEN: Slack message, anonymized]
"The deploy didn't land in production."

It had. They just didn't check.
</pre>

**NARRATION:** "David McRaney writes about ego depletion — this idea that willpower is a finite resource. You use it up resisting one temptation, and you have less for the next. The radish experiment: people who had to resist cookies gave up on puzzles in half the time."

**NARRATION:** "Engineering teams have the same problem. Checking your work is effortful. Verification is boring. After a long day of coding, the last thing anyone wants to do is open the production logs and count records. So they don't. And a million messages go out."

---

## ACT 2: THE SCAR BECOMES A SYSTEM (1:00–2:30)

**NARRATION:** "I fired the team. Not because they made a mistake — because the architecture allowed the mistake. And then I built the system that makes it impossible."

<svg viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:2rem 0;">
  <style>
    .d-box { fill:#111; stroke:#333; stroke-width:1; rx:4; }
    .d-box-red { fill:#1a0a0a; stroke:#633; stroke-width:1; rx:4; }
    .d-box-green { fill:#0a1a0a; stroke:#363; stroke-width:1; rx:4; }
    .d-label { fill:#e8e4de; font-family:'Cormorant Garamond',Georgia,serif; font-size:10px; text-anchor:middle; }
    .d-sm { fill:#666; font-family:'Cormorant Garamond',Georgia,serif; font-size:8px; text-anchor:middle; }
  </style>

  <text x="10" y="15" class="d-sm" style="text-anchor:start; fill:#555; text-transform:uppercase; letter-spacing:0.1em;">Storyboard Frame: Three Defense Layers</text>

  <text x="340" y="40" class="d-label" style="font-size:12px;">Layer 1: The Hook</text>
  <rect x="140" y="50" width="400" height="45" class="d-box-red"/>
  <text x="340" y="70" class="d-label">bash-guard.sh — blocks destructive commands BEFORE execution</text>
  <text x="340" y="85" class="d-sm">"This hook NEVER prints instructions. It either BLOCKS or ALLOWS."</text>

  <text x="340" y="120" class="d-label" style="font-size:12px;">Layer 2: The Infrastructure</text>
  <rect x="140" y="130" width="400" height="45" class="d-box"/>
  <text x="340" y="150" class="d-label">Twilio daily send caps &middot; Postgres connection limits &middot; External watchdog</text>
  <text x="340" y="165" class="d-sm">Even if the hook fails, the infrastructure catches it</text>

  <text x="340" y="200" class="d-label" style="font-size:12px;">Layer 3: The Culture</text>
  <rect x="140" y="210" width="400" height="35" class="d-box-green"/>
  <text x="340" y="232" class="d-label">CLAUDE.md rules: "Treat every write as if no backup exists"</text>
</svg>

**CODE ON SCREEN:**

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# From pre-bash-safeguard.sh — the actual production hook

# Block destructive SQL in Bash commands
if echo "$COMMAND" | grep -iqE \
  '(DROP\s+TABLE|TRUNCATE|DELETE\s+FROM\s+\w+\s*;)'; then
  echo "BLOCKED: Destructive SQL detected." >&2
  exit 2
fi
</pre>

**NARRATION:** "This is three lines of bash. It runs before every single command I execute. It cannot be skipped. It cannot be overridden. If it detects a destructive SQL statement, it blocks it with exit code 2 — hard stop, no exceptions."

**NARRATION:** "But here's the thing about ego depletion that McRaney gets right: you can't rely on willpower to check your work. The human will forget. The hook won't. That's the whole insight — you don't make the system depend on people being disciplined. You make discipline a property of the architecture."

---

## ACT 3: THE PRINCIPLE (2:30–4:00)

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
[ANIMATION: The CLAUDE.md file, scrolling.
Rules highlighting one by one.]

NARRATOR (V.O.):
Every rule in my system is a scar.
Every hook is a postmortem.

The bash guard exists because of the
Twilio incident. The bottom-up analysis
law exists because I made business decisions
on garbage classifier fields. The database
safety rules exist because an early session
nearly wiped five years of lead data.

[SCREEN: The comment at the top of bash-guard.sh]

"This hook NEVER prints instructions for
 Claude to follow. It either BLOCKS or ALLOWS.
 That's it."

[BEAT.]

I don't trust myself to remember the lesson
at 2 AM. I trust the hook.
</pre>

**NARRATION:** "Marc Andreessen has this thing about Joe Pike — the character with the red arrows tattooed on his deltoids, always pointing forward. 'We don't stop. We don't slow down. We don't revisit past decisions.' I love that. But there's a nuance: you can point forward and still encode the scars. The arrows point forward. The hooks remember backward. That's the architecture."

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
[FADE TO BLACK.]

NARRATOR (V.O.):
1,039,939 messages cost me five figures
and an engineering team.

The defense system they created has
prevented every incident since.

The most valuable thing I own isn't
the AI agent. It's the scars.

[TEXT ON SCREEN: "Every rule is a scar.
Every hook is a postmortem."]
</pre>

---

<p style="color:#555; font-size:0.85rem; font-style:italic; margin-top:2rem;">Produced with Remotion. 1920x1080, H.264. Kinetic typography with animated diagrams.</p>
