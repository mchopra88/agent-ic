---
layout: essay.njk
title: "Cosplay as Quality Assurance: Running 300 Fake Clients Through Production Code"
order: 27
date: 2026-03-05
---

I run adversarial simulations against my own production systems. I call them "cosplay sessions" because the AI pretends to be clients — hundreds of different client archetypes — and runs them through the actual conversation flows. Not unit tests. Not integration tests. Full role-play simulations against production code with production data.

When I explain this to other founders, the reaction splits cleanly in two. Technical people immediately get it — "that's just fuzzing with natural language." Non-technical people look at me like I've lost my mind. "You have the AI pretend to be customers? And then it yells at itself?"

Yes. And it finds bugs that nothing else catches.

## What Cosplay Actually Is

Traditional software testing works bottom-up. You write unit tests for individual functions. You write integration tests for connected systems. You write end-to-end tests for user flows. Each layer catches a different class of bugs. The coverage is decent for the scenarios you thought to test.

The problem: you only test scenarios you thought of. And the scenarios you think of are biased by the scenarios you've seen. David McRaney writes about confirmation bias — we seek information that confirms what we already believe. Testing has the same bias. You test for the bugs you expect. The bugs that kill you are the ones you didn't expect.

Cosplay inverts this. Instead of writing test scenarios from my mental model of what could go wrong, I have the AI generate client archetypes from the full space of possible clients. Then I run each archetype through the production conversation flow and watch what happens.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Traditional testing:
  Developer thinks of 20 scenarios.
  Tests pass for all 20.
  Developer ships with confidence.
  Client #21 breaks the system.
  "We didn't think of that case."

Cosplay testing:
  AI generates 300 client archetypes from the full
  distribution of possible inputs:

  - Income levels: $20K to $200K
  - Credit scores: 480 to 800
  - Household sizes: 1 to 8
  - Special situations: voucher, cosigner, ESA pet,
    broken lease, eviction history, no SSN,
    undocumented, corporate relocation, military PCS
  - Communication styles: terse, verbose, angry,
    confused, non-native English, mixed languages
  - Move timelines: urgent (3 days), normal (30 days),
    exploratory (no date)
  - Geographic preferences: specific building,
    specific neighborhood, specific city, flexible

  Each archetype runs through the ACTUAL production
  conversation engine.

  Result: bugs surface in combinations that no
  developer would think to test.
</pre>

The key insight is that real clients don't come in neat categories. They come in combinations. A real client might have a Section 8 voucher AND a cosigner AND a move date that's flexible AND need a pet-friendly unit AND have a broken lease history AND speak primarily Spanish. No unit test covers that combination. But that's a real person who will text us tonight.

## The Five Waves

The most thorough cosplay session I've run was the YGL (landlord rep) simulation in February 2026. Five waves, 300 scenarios, running overnight on the Mac Studio.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Wave 1: First Contact (60 scenarios)
  → "Hi, I saw a listing online for 123 Main St"
  → "Someone told me you have apartments in Humboldt Park"
  → "I need a place ASAP, what do you have?"
  → "How much are your 2-bedrooms?"
  Pass rate: ~80%
  Failures: Wrong brand reveal timing (said "HomeEasy"
    when should have said "Blue Lake Leasing").
    No handling for inquiries about specific buildings
    we don't manage. Response too slow for "ASAP" urgency.

Wave 2: Engagement (60 scenarios)
  → Leads who responded to first contact
  → Budget discussions
  → Neighborhood preferences
  → Timeline confirmation
  Pass rate: ~82%
  Failures: Price anchoring wrong — showed most expensive
    option first instead of best-value option.
    Geographic scoring still overweighting price vs proximity.

Wave 3: Qualification / Document Submission (60 scenarios)
  → "I'm sending my pay stubs to renterdocs@homeeasy.com"
  → "My credit score is 580, is that OK?"
  → "I have a cosigner, how does that work?"
  → "Here's my voucher letter from CHA"
  Pass rate: ~65%
  Failures: 4 CRITICAL
    1. Voucher processing completely broken — routing
       leads to buildings that explicitly reject vouchers.
    2. Cosigner flow had no implementation — agent said
       "we can work with a cosigner" but had no next step.
    3. Document receipt confirmation never triggered —
       leads sent docs and got silence.
    4. Income verification threshold wrong for Chicago
       market (used national average, not local).

Wave 4: Objection Handling (60 scenarios)
  → "That's too expensive"
  → "I found something cheaper on a classified site"
  → "I don't want to share my social security number"
  → "My current landlord won't give me a reference"
  → "I changed my mind about moving"
  Pass rate: ~90%
  This was the strongest area. The Socratic framework
  handled most objections cleanly. The only failures
  were edge cases: renters who went silent mid-conversation
  (no re-engagement trigger), and renters who asked to be
  called instead of texted (call routing wasn't wired).

Wave 5: Post-Approval / Operations (60 scenarios)
  → "When is my move-in date?"
  → "How do I set up utilities?"
  → "The building manager hasn't contacted me"
  → "I need to change my move-in date"
  → "Where do I pick up my keys?"
  Pass rate: ~40%
  9 CRITICAL gaps found.
  Almost ZERO infrastructure for:
    - Tour scheduling (agent could talk about tours
      but couldn't actually book one)
    - Post-approval logistics (no move-in checklist)
    - Building manager handoff (no notification system)
    - Key pickup coordination (not even a concept)
    - Lease signing workflow (said "you'll get a link"
      but no link existed)
</pre>

The pass rate curve tells the story: 80% → 82% → 65% → 90% → 40%. The front of the funnel was strong (I'd obsessed over first impressions). The middle had objection handling down (the Socratic framework is battle-tested). But the back — the operational side, the part after someone says "yes" — was barely built. The agent could convince someone to move in. It just couldn't actually help them do it.

This is exactly the kind of insight you can't get from looking at conversion metrics. The conversion rate might look fine because leads were moving through the funnel. But they were hitting a wall at the back end that only showed up as "lead went silent" — which looks like a lead quality issue, not a system failure.

## The Full-System Simulation

The overnight simulation on February 20 went further — it ran scenarios against all four business units simultaneously, treating the entire platform as one interconnected system:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Full-System Simulation Results (one night, zero humans):

Business Unit        CRITICAL  HIGH  MEDIUM  LOW   Total
─────────────────────────────────────────────────────
Locator Agent             7      7      5      1     20
Landlord Rep Agent        3     10      9      5     27
Ken Insurance Agent       6      7     10      0     23
Financial Analysis        4      1      3      0      8
─────────────────────────────────────────────────────
TOTAL                    20     25     27      6     78

Revenue leakage estimate: $380K — $1.27M annually

The range is wide because some bugs affect every lead
(high impact, high confidence) and some affect edge cases
(potentially high impact, low confidence on frequency).
</pre>

78 bugs. In one night. The AI generated the scenarios, ran them through production code, identified failures, categorized severity, and estimated revenue impact. I woke up to a comprehensive bug report.

The most alarming findings weren't the obvious crashes. They were the silent failures — the things that looked like they worked but didn't:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Silent failures (the worst kind):

1. TCPA violation: Leads who texted STOP were marked
   as opted-out in the DNC table. But the follow-up
   scheduler didn't check the DNC table — it checked
   a different field on the lead record. That field
   wasn't getting updated. Leads who opted out were
   still getting follow-up messages.

   This had been in production for weeks.
   Zero errors logged.
   Zero alerts triggered.
   Potential class action exposure.

2. Insurance payment link: Ken Agent generated quotes
   correctly. Presented them correctly. The renter
   said "yes, I want to buy." The agent responded
   with "Great! Here's your payment link: [LINK]"
   — a literal placeholder. The carrier checkout URL
   was never generated. Every insurance sale attempt
   for that cohort was a dead end.

   The renter saw [LINK] and assumed it was broken.
   They didn't reply. It showed up in the data as
   "lead went silent after quote" — a pattern that
   looks like price objection, not a broken link.

3. Document upload: The landlord rep pipeline accepted
   documents via email and was supposed to create
   Asana tickets for processing. The ASANA_TOKEN
   environment variable was undefined in the container.
   The code caught the error, logged it at DEBUG level
   (nobody reads DEBUG logs), and returned a success
   response. The renter got a "thanks for sending your
   docs!" confirmation. The docs went nowhere.

   This is the most dangerous class of bug:
   the system tells you it worked when it didn't.
</pre>

None of these would have been found by traditional testing. Unit tests test the happy path. Integration tests test the expected failures. Cosplay tests the unexpected combinations that real clients produce every day.

## Why This Works Better Than a QA Team

A QA engineer runs the same 50 test cases every sprint. They know the system. They know where the bugs usually hide. They test those places. The bugs that escape are the ones hiding in places the QA engineer doesn't think to look.

Cosplay has no blind spots because it generates scenarios from the full input space. It doesn't know where bugs usually hide, so it tests everywhere — including the places a human tester would skip because "that combination is unlikely." But with 30,000 conversations a month, every unlikely combination happens several times.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
QA Engineer:
  Salary: $60-$80K/year (or $25-$40/hour contract)
  Test cases: 50-100 per cycle
  Cycle time: 1-2 weeks
  Blind spots: tests what they expect to fail
  Coverage: scenarios the engineer thought of

Cosplay Session:
  Cost: ~$20-$50 in API calls per overnight session
  Test cases: 300+ per session
  Cycle time: 6-8 hours (overnight)
  Blind spots: random exploration of input space
  Coverage: scenarios generated from full distribution

  The cosplay session costs less than one hour
  of a QA contractor and runs 3-6x more scenarios
  with zero human involvement.
</pre>

The trade-off: cosplay doesn't catch everything. It's probabilistic, not exhaustive. A QA engineer with deep domain knowledge will catch specific business logic errors that random simulation might miss. But the volume advantage — 300 scenarios overnight, every night if you want — more than compensates. You trade precision for coverage, and at scale, coverage wins.

## The Abraham Wald Connection

David McRaney's survivorship bias story about Abraham Wald and the bombers is directly applicable. The military wanted to armor the parts of returning planes that had bullet holes. Wald pointed out those planes came back *because* the bullets hit non-critical areas. The armor goes where the bullet holes aren't — on the parts of the planes that didn't come back.

QA testing is looking at the returning planes. You test the features you know about. You verify the flows that work. You report on the scenarios that pass. The green checkmarks accumulate and you feel confident.

Cosplay testing is looking for the planes that didn't come back. What scenarios did you never think to test? What client archetypes fall through every crack in your system? What combination of inputs produces a silent failure that looks like success?

The 40% pass rate on Wave 5 — post-approval operations — was a plane that didn't come back. I never tested it because I was focused on acquisition. The leads who made it through the funnel and then went silent were the planes with bullet holes in the engine. I was armoring the wings.

## The Meta Loop

Cosplay sessions feed into the three-loop feedback system. The retro loop catches individual conversation failures. The macro loop catches market-level patterns. The meta loop asks: is the cosplay itself catching what it should?

After the February simulation found 78 bugs, I ran a meta-analysis: how many of those bugs had been in production for more than 30 days? Answer: 23. Nearly a third had been live for over a month without detection. That meant my monitoring, my daily reports, my manual reviews — all of it was missing a significant class of bugs. The meta loop lesson: run cosplay sessions monthly, not quarterly. The bugs accumulate faster than the normal monitoring catches them.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Cosplay schedule (current):

  Weekly:   Quick wave — 50 scenarios focused
            on areas that changed this week.
            ~2 hours. Run Sunday night.

  Monthly:  Full simulation — 300+ scenarios
            across all business units.
            ~6-8 hours. Run overnight.

  On-demand: After any significant deploy,
             targeted cosplay on the affected
             conversation flows. ~1 hour.

  The scheduled automation catches regressions.
  The on-demand catches deploy-specific bugs.
  The monthly catches the slow drift — the
  scenarios that broke gradually as multiple
  small changes accumulated.
</pre>

The most valuable thing about cosplay isn't the bugs it finds. It's the confidence it builds. When I deploy a change to the conversation engine, I can run 50 targeted scenarios in an hour and know — with real evidence, not hope — that the change didn't break anything unexpected. That confidence is what allows the 133-commit months. Without it, every deploy would be a prayer.

With it, every deploy is a test.
