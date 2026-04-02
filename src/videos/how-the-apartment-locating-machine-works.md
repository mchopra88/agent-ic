---
layout: video.njk
title: "How the Apartment Locating Machine Works"
series: "How It Works"
duration: "6 min"
order: 50
date: 2026-03-01
---

<div style="color:#666; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:2rem;">Script &middot; Animated Explainer</div>

## COLD OPEN

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
[SCREEN: Black. A single blinking cursor.]

NARRATOR (V.O.):
Every day, 30,000 people text us looking
for an apartment. Every day, zero humans
answer them.

[The cursor multiplies — one becomes ten becomes
a hundred becomes a grid of 30,000 blinking dots.]

This is how the machine works.
</pre>

---

## ACT 1: THE LEAD ENTERS (0:00–1:30)

<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:2rem 0;">
  <style>
    .s-box { fill:#111; stroke:#333; stroke-width:1; rx:4; }
    .s-label { fill:#e8e4de; font-family:'Cormorant Garamond',Georgia,serif; font-size:11px; text-anchor:middle; }
    .s-sm { fill:#666; font-family:'Cormorant Garamond',Georgia,serif; font-size:9px; text-anchor:middle; }
    .s-arrow { stroke:#444; stroke-width:1; marker-end:url(#arrowhead); }
  </style>
  <defs><marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="#444"/></marker></defs>

  <text x="10" y="15" class="s-sm" style="text-anchor:start; fill:#555; text-transform:uppercase; letter-spacing:0.1em;">Storyboard Frame: Lead Intake Flow</text>

  <rect x="10" y="35" width="100" height="50" class="s-box"/>
  <text x="60" y="55" class="s-label">Zillow</text>
  <text x="60" y="70" class="s-sm">Apartments.com</text>

  <rect x="10" y="100" width="100" height="50" class="s-box"/>
  <text x="60" y="120" class="s-label">Craigslist</text>
  <text x="60" y="135" class="s-sm">Direct ads</text>

  <line x1="110" y1="60" x2="170" y2="95" class="s-arrow"/>
  <line x1="110" y1="125" x2="170" y2="95" class="s-arrow"/>

  <rect x="170" y="70" width="120" height="50" class="s-box" style="stroke:#555;"/>
  <text x="230" y="90" class="s-label">Lead Intake</text>
  <text x="230" y="105" class="s-sm">phone, name, city</text>

  <line x1="290" y1="95" x2="350" y2="95" class="s-arrow"/>

  <rect x="350" y="70" width="120" height="50" class="s-box" style="stroke:#555;"/>
  <text x="410" y="90" class="s-label">Sniff Test</text>
  <text x="410" y="105" class="s-sm">8 qualification checks</text>

  <line x1="470" y1="95" x2="530" y2="95" class="s-arrow"/>

  <rect x="530" y="70" width="120" height="50" class="s-box" style="fill:#0a1a0a; stroke:#336633;"/>
  <text x="590" y="90" class="s-label" style="fill:#6b6;">AI Agent</text>
  <text x="590" y="105" class="s-sm" style="fill:#4a4;">starts conversation</text>
</svg>

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
NARRATOR (V.O.):
A renter in Dallas clicks a listing on Zillow.
That click generates a lead — a name, a phone
number, a city. Within seconds, it arrives.

[ANIMATION: A dot travels from a phone screen
through a series of pipes into a database.]

But here's the thing most people miss about
apartment locating: the building the renter
clicked on? That's almost never where they
end up.

[SHOW: The Zillow listing fading, replaced by
a different building — nicer, closer, cheaper.]

The lead is a signal, not a destination.
</pre>

**NARRATION:** "We are a middleman. A leasing company that works for many property managers. The renter inquires on one building — we redirect them to buildings that pay us commission. Commission varies from 50% to 100% or more of the first month's rent. This is the business model that nobody in tech takes seriously, and that generates thousands of dollars per conversion."

**CODE ON SCREEN:**

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# From the actual CLAUDE.md — the AI's operating instructions

## Core Philosophy: DRIVERS, NOT ORDER TAKERS

WE DO NOT TAKE ORDERS. WE DRIVE DEALS.

When client says "I want X" - we don't just find X. We:
1. Find the VULNERABILITY (their pain point)
2. Find the FLEX (where they can bend)
3. DRIVE them to a property that PAYS US

The answer is on the PHONE, not in the data.
Every "no" is just a "not yet."
</pre>

---

## ACT 2: THE SNIFF TEST (1:30–3:00)

**NARRATION:** "Before we spend a dollar on a lead, we run eight checks. This is the sniff test — it runs in seconds, and it decides whether this lead is worth a conversation."

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# The 8-check sniff test — from production

1. Google the lead — verify identity (2-3 signals)
2. Who are they? — job, household, why moving
3. Likely income? — budget x3 rule, ZIP demographics
4. Sketch? — evasive, red flags
5. Likely credit? — estimate before confirming
6. Where will they end up? — match style preference
7. What ad did they click? — inquiry address != where they LIVE
8. History? — new lead or repeat, prior denials

CRITICAL: ZIP demographics lookup is MANDATORY.
The ZIP tells you who they are.
</pre>

**NARRATION:** "Step 7 is where the magic is. The building someone clicked on tells you almost nothing about where they'll live. But the ZIP code they're coming FROM — their current address — tells you everything. Income bracket, household size, credit profile, price sensitivity. The inquiry is noise. The ZIP is signal."

**[ANIMATION: A heat map of Dallas ZIP codes, with income brackets fading in. A dot appears on a Zillow listing in Uptown, but the renter's current ZIP is in Garland. The AI recalculates — different buildings light up.]**

---

## ACT 3: THE INVERSION (3:00–4:30)

**NARRATION:** "Now here's where it gets interesting. David McRaney wrote about survivorship bias — how we study the bullet holes on returning planes and miss the ones that didn't come back. Apartment locating has the same problem."

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
[ANIMATION: Abraham Wald's bomber diagram —
bullet holes on wings and fuselage.]

NARRATOR (V.O.):
Every brokerage in America studies their
closed deals. "What worked? What converted?"

But the deals that closed are the returning
planes. The insight is in the ones that
didn't come back.

[ANIMATION: The bullet holes fade. The missing
areas — the engines, the cockpit — glow red.]

Our AI doesn't study conversions.
It studies drop-offs.

Where in the conversation did the lead
go silent? What question killed the deal?
What building presented too late?

37% of leads in Chicago were being shown
buildings outside their geographic comfort
zone. The data was right there — but only
if you looked at the failures, not the wins.
</pre>

**CODE ON SCREEN:**

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
## Bottom-Up Analysis Law (ABSOLUTE — enforced by hook)

- NEVER run aggregate queries as your FIRST step
- ALWAYS sample 20+ individual records first
- Build understanding from what you OBSERVE
- Classifiers lie. Summary fields are stale.
- If an aggregate contradicts raw records,
  the aggregate is wrong
</pre>

---

## ACT 4: THE CONVERSATION (4:30–5:30)

**NARRATION:** "The AI agent starts a text conversation. It's not a chatbot — it's a sales agent. It asks questions designed so the only honest answer moves the deal forward."

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
[SCREEN: A text conversation, animated
message by message.]

AI: Hey Marcus — I'm in leasing, you inquired
    on a unit of mine on Zillow. When are you
    looking to move?

MARCUS: Next month. But that unit was too
        expensive.

AI: Got it — what's your budget?

[SIDE PANEL: The AI's internal state updates.
Budget = $1,400. Credit = estimated 620-660.
ZIP demographics: household income $48K.
Matching algorithm recalculates...]

AI: I've got three units that might work better.
    Two of them are running move-in specials
    this month. Want me to set up tours?

[NARRATION: The renter clicked on a $2,100
unit in Uptown. The AI moved him to a $1,350
unit in Richardson that pays us full commission.
He didn't know he wanted Richardson. We knew
before he did.]
</pre>

---

## ACT 5: THE MACHINE AT SCALE (5:30–6:00)

<svg viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:2rem 0;">
  <style>
    .m-label { fill:#e8e4de; font-family:'Cormorant Garamond',Georgia,serif; font-size:12px; text-anchor:middle; }
    .m-num { fill:#6b6; font-family:'Cormorant Garamond',Georgia,serif; font-size:20px; font-weight:700; text-anchor:middle; }
    .m-sm { fill:#666; font-family:'Cormorant Garamond',Georgia,serif; font-size:9px; text-anchor:middle; }
  </style>

  <text x="10" y="15" class="m-sm" style="text-anchor:start; fill:#555; text-transform:uppercase; letter-spacing:0.1em;">Storyboard Frame: Scale Metrics</text>

  <text x="85" y="60" class="m-num">30,000</text>
  <text x="85" y="80" class="m-label">leads/month</text>

  <text x="255" y="60" class="m-num">0</text>
  <text x="255" y="80" class="m-label">human agents</text>

  <text x="425" y="60" class="m-num">97%</text>
  <text x="425" y="80" class="m-label">contribution margin</text>

  <text x="595" y="60" class="m-num">$0.003</text>
  <text x="595" y="80" class="m-label">cost/conversation</text>

  <line x1="30" y1="110" x2="650" y2="110" stroke="#222" stroke-width="1"/>

  <text x="340" y="140" class="m-label" style="fill:#888;">One person. One Mac Studio. Eight tmux sessions.</text>
  <text x="340" y="160" class="m-label" style="fill:#555;">The machine runs whether I believe in it or not.</text>
</svg>

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
NARRATOR (V.O.):
30,000 conversations a month. Zero human agents.
97% contribution margins in a 20% industry.
Cost per conversation: fractions of a cent.

This is what happens when you decompose a
sales organization into atomic components
and replace each one with code.

The renter gets a better experience.
The building gets a qualified tenant.
The machine runs at 3 AM.

[FADE TO BLACK.]

And the guy who built it?
He's asleep.
</pre>

---

<p class="coming-soon">Production notes: Animated with Remotion (React-based animation framework). Code snippets rendered via Carbon. Architecture diagrams as animated SVGs. Voiceover recorded in home studio. Target: YouTube, LinkedIn, agent-ic.co embed.</p>
