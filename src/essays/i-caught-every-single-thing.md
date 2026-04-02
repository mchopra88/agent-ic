---
layout: essay.njk
title: "I Caught Every Single Thing"
order: 15
date: 2025-10-30
---

An engineer on my team didn't work for two weeks. Then, when I started asking questions about the lead data — persistent questions, the same question asked different ways, checking the answers against each other — a million leads suddenly appeared in the database. All at once. After two weeks of nothing.

Then he fabricated screenshots. Different timestamps on the same data. Screenshots that were supposed to show work done over days, but the data told a different story. He thought I couldn't tell.

I ran everything through Claude. Every screenshot. Every timestamp. Every database log. And I caught something most people wouldn't think to look for: a vacuum run.

## What a Vacuum Run Tells You

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
PostgreSQL runs "vacuum" automatically when large
amounts of data are inserted or modified at once.
It's a maintenance operation — reclaiming dead rows,
updating statistics, preventing table bloat.

A vacuum run is like tire tracks at a crime scene.
You can't insert a million records without the
database noticing. The vacuum logs tell you:

  WHEN the data actually landed (not when someone
  claims they uploaded it)

  HOW MUCH data was inserted in one batch
  (a "gradual upload over two weeks" doesn't
  trigger the same vacuum pattern as
  "everything at once on Tuesday afternoon")

  The timestamps on the vacuum run don't match
  the timestamps on the screenshots.

The engineer fabricated the screenshots to show
work happening over days.
The database logs showed everything happening
in one burst.
The vacuum run confirmed the burst.
</pre>

He didn't know I knew what a vacuum run was. Honestly, six months earlier, I didn't know either. But that's what teaching mode does — the CLAUDE.md instruction that says "explain EVERYTHING, what you're doing, why, define terms." Every time the AI explained a database concept, I learned it. The cumulative effect: I understand my own infrastructure well enough to catch someone lying about it.

I didn't say anything to him at the time. There wasn't a point. I was still getting into grips with everything myself. I didn't want to take abrupt action. I just filed it away and watched.

Then, weeks later, another data anomaly. 19 million leads appeared. It quadruple-confirmed what I'd seen before. The pattern wasn't a one-time lapse. It was the operating mode.

## The Persistent Question

The way I caught it wasn't technical sophistication. It was persistence. I kept asking the same question: "Where are the leads?" Not once. Not twice. I asked it from different angles, in different conversations, checking the answers against each other and against the data.

This is the Socratic method applied to management, and it's the same pattern as the Socratic sales framework in the conversation engine. You ask questions where the only honest answer reveals the truth. You don't accuse. You don't argue. You ask. And you watch the answers start contradicting each other.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
The question chain:

  "How many leads did we process this week?"
  → [answer: X]

  "When did the latest batch upload?"
  → [answer: over the past few days]

  "Can you show me the upload log?"
  → [fabricated screenshots with spread-out timestamps]

  "Why does the database vacuum log show
   everything arriving at 2:47 PM on Tuesday?"
  → [silence]

  Each question has one honest answer.
  The honest answers are inconsistent
  with the fabricated ones.
  The inconsistency IS the evidence.
</pre>

McRaney writes about confirmation bias — we seek information that confirms what we already believe. But there's a deliberate inversion of confirmation bias that's useful: you seek information that DISCONFIRMS what someone is telling you. Not because you assume they're lying. Because the truth is consistent and lies are not. If someone is telling the truth, disconfirmation attempts will fail. If they're lying, the inconsistencies accumulate.

I didn't assume the engineer was lying. I assumed the data was the truth and tested everything against it. The data said one thing. The screenshots said another. The data doesn't lie. Screenshots do.

## The AI as Forensic Tool

I didn't catch the fabrication by being smarter than the engineer. I caught it by having a tool that could process the full dataset and surface inconsistencies faster than a human could fabricate consistent ones.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
What Claude analyzed in minutes:

  1. Screenshot metadata — timestamps, resolution,
     OS version, window positioning
  2. Database logs — actual insert times,
     vacuum runs, connection patterns
  3. Git history — commit timestamps,
     diff sizes, merge patterns
  4. Cross-reference — does the screenshot data
     match the database data match the git data?

  A human reviewing this would take hours.
  The AI did it in minutes.
  And it caught things I wouldn't have thought
  to look for — like the vacuum run pattern
  that reveals bulk insertion vs gradual upload.
</pre>

This is the bottom-up analysis law applied to people management. Don't trust the summary ("I've been uploading leads all week"). Read the raw data (database logs, timestamps, vacuum runs). The summary is what someone wants you to believe. The raw data is what actually happened.

## Why I Didn't Confront

I didn't say anything because confrontation wasn't the point. The point was understanding the operating reality of my team. And the operating reality was:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
What I learned from not confronting:

  1. The fabrication told me more than a confession would.
     A confession gives you one data point: they lied.
     The fabrication gives you multiple:
     - They didn't work for 2 weeks (timeline)
     - They thought I couldn't detect it (contempt)
     - They could produce the work in one day
       when motivated (capability exists, effort doesn't)
     - They chose to fabricate evidence rather than
       admit the gap (ethics, not competence)

  2. I was still learning the system myself.
     Taking abrupt action while I didn't fully
     understand the infrastructure would have been
     reckless. What if the "fabricated" data was
     actually a legitimate batch upload I didn't
     understand? I needed to be sure.

  3. The vacuum run confirmed it. The git history
     confirmed it. The second incident (19M leads)
     triple-confirmed it. By then, the pattern was
     undeniable.
</pre>

The broader lesson: when you catch someone in a deception, the deception itself is information. How they fabricate, what they fabricate, how sophisticated the fabrication is — all of it tells you about their capabilities, their contempt for your ability to detect it, and their calculation of the consequences.

## "I Don't Know Why You Guys Seem to Think I Got Here by Magic"

People who work with me sometimes assume I'm a business guy who got lucky with AI. A non-technical founder who happened to stumble into a good market. They don't realize that "non-technical" doesn't mean "non-rigorous." I came from Citibank. I came from Groupon through the IPO. I came from venture capital, where the job is literally detecting when founders are lying about their metrics.

The skills transfer. Due diligence on a startup's financials uses the same pattern as due diligence on an engineer's work product: you read the raw data, you check it against the narrative, and you look for inconsistencies. The person who thinks they can fabricate screenshots past someone who spent years in VC due diligence has miscalculated badly.

The AI just makes the pattern detection faster. The judgment was already there.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
The pattern, applied everywhere:

  VC due diligence:
    Founder says: "We're growing 20% month-over-month."
    Check: Does the bank statement match the dashboard?
    Finding: Dashboard shows MRR, bank shows one-time payments.

  Engineer accountability:
    Engineer says: "I've been uploading leads all week."
    Check: Does the vacuum log match the screenshots?
    Finding: Everything arrived Tuesday afternoon.

  Lead data analysis:
    Database says: "Client stage: Nurturing relationship."
    Check: Does the raw conversation match the stage?
    Finding: Stage field is LLM-generated garbage.

  Same method. Same rigor. Different domain.
  Read the raw data. Trust nothing summarized.
</pre>

The bottom-up analysis law isn't just about databases. It's about everything. Don't trust the summary. Read the source. The summary is someone's interpretation. The source is what happened.

I caught every single thing. Not because I'm paranoid (though I am). Not because I'm technical (I'm learning). Because the data is the truth, and everything else is a story someone is telling you.
