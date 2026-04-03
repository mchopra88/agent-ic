---
layout: essay.njk
title: "30,000 Conversations a Day: What the Data Looks Like"
order: 19
date: 2025-11-25
---

Everyone quotes the number. 30,000 leads a day. It sounds impressive in a pitch. It means nothing without the data underneath.

But before the data underneath, the number itself has a story. It didn't start at 30,000. It started at zero and grew in a way that's hard to explain to anyone who hasn't watched a lead pipeline compound over years.

## The Lead Volume Story

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Lead volume by year (approximate):

  2017:    ~500/month     First buildings, manual everything
  2018:    ~2,000/month   ILS integrations online
  2019:    ~5,000/month   Multi-market expansion
  2020:    ~3,000/month   Covid crater — leads halved overnight
  2021:    ~8,000/month   Recovery + new source partnerships
  2022:    ~12,000/month  Early automation scaling
  2023:    ~18,000/month  AI conversation engine live
  2024:    ~25,000/month  Full automation, multi-vertical
  2025:    ~30,000/day    BlueLake purchasing intent platform live
  2026:    ~30,000/day    Current steady state

  Cumulative leads processed: millions
  Cumulative conversations: millions
  Cumulative text messages: tens of millions
</pre>

The cumulative number is what matters. Not what we process this month — what the database contains. Hundreds of thousands of leads, each with a full conversation history, each with building preferences, geographic signals, price sensitivity, objection patterns, move dates, household composition. Every failed conversation is a training signal. Every drop-off point is a data point. Every ghosted follow-up tells you something about timing, pricing, or positioning that you can't learn from the deals that closed.

The composition shifted over the years too. In 2017, leads came from one source: a single ILS (Internet Listing Service) partnership. By 2025, leads flow from multiple listing services, direct web traffic, referrals, property manager partnerships, and landlord rep channels. The source matters because different sources produce different lead quality:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Lead quality by source (observed patterns):

  ILS (high-intent): High intent, specific building clicked
                   Often aspirational — clicks Lincoln Park,
                   budget fits Rogers Park

  ILS (broad):     Medium intent, broader search
                   Better geographic realism

  Direct/referral: Highest quality, already warm
                   Smallest volume

  Landlord rep:    Different funnel entirely
                   These are Blue Lake/YGL tenants
                   Doc submissions, voucher processing

  The insight: source determines conversation strategy.
  A listing site lead needs redirection (away from the
  aspirational building toward reality).
  A direct referral needs confirmation (they already
  know what they want).
  A landlord rep lead needs qualification (docs,
  income verification, credit check).
</pre>

This is what I mean when I say "the listing the renter clicked on is noise." They clicked a unit in Lincoln Park because it had nice photos and a virtual tour. They live in Albany Park. Their budget fits Rogers Park. They'll sign a lease in Ravenswood. The click is a signal of intent to move — not a signal of where.

## What the Data Actually Shows

Here's what it looks like inside the machine when you stop trusting the top-line numbers and start reading individual records.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Chicago market anomalies (discovered via bottom-up analysis):

  44% of leads → wrong geographic match
      Renter in Rogers Park shown buildings in Bridgeport.
      The matching algorithm optimized for inventory
      availability, not geographic proximity.
      Result: tours booked, tours no-showed.

  $280 gap → average delta between 2br listed price
      and actual available price on ILS platforms.
      The listing site shows $1,400. Actual available is $1,680.
      The renter inquires expecting $1,400. We have to
      reframe the conversation around the real number.
      This is not a bug — it's the nature of ILS data.
      Listings are stale by definition.

  68% of placements → different neighborhood
      than original inquiry.
      This is the statistic that defines the business.
      The renter almost never ends up where they clicked.
      We are a REDIRECT engine, not a FULFILLMENT engine.

Dallas market anomalies:

  37% geographic waste → leads shown buildings
      outside 3-mile comfort zone.
      Caused by a radius bug: miles vs kilometers.
      5-mile radius was filtering at 5km = 3.1 miles.
      Every building between 3.1 and 5 miles was
      invisible. 37% of Dallas inventory, gone.
      (See: "Stranded in Delhi, Deploying From Vienna")

  Tour-to-close ratio 2x higher when building
      within 3mi of renter's current ZIP.
      This validated the geographic comfort zone thesis.
      Proximity > price > amenities > reviews.

  Renter's inquiry ZIP ≠ where they live.
      Inquiry is aspirational. ZIP is real.
      The ZIP tells you income bracket, household size,
      credit profile, and price sensitivity.
      The inquiry tells you they like nice photos.
</pre>

The bottom-up analysis law in my CLAUDE.md exists because of what happened when I trusted aggregate data instead of reading individual records. For months, I made business decisions based on a field called `client_stage_progression.stage_name`. I used it for pipeline analytics, revenue forecasts, team performance reviews. I trusted it because it was in the database, in a column with a sensible name, and the aggregate queries returned numbers that looked reasonable.

Then I finally looked at the raw data:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# What I expected in client_stage_progression.stage_name:
#   "New Lead" → "Qualified" → "Tour Booked" →
#   "Application" → "Closed"

# What I actually found:
  "Nurturing relationship"
  "Exploring options"
  "Initial engagement phase"
  "Building rapport and understanding needs"
  "Transitioning to active search"
  "Preliminary interest expressed"

# Every single value was LLM-generated freeform text.
# Not a pipeline. Not a stage. Not anything.
# Just hallucinated garbage that LOOKED like stages
# because someone piped the output of a classifier
# into a column without validating it.

# Every aggregate query built on that field was wrong.
# Every business decision made from those queries was wrong.
# For months.
</pre>

That's where the [bottom-up analysis law](/essays/my-claude-md/) comes from — it's one of the absolute rules in the governance system that every AI session reads on startup. A specific database field name, called out as garbage, in a governance document. Because I will never make that mistake again, and neither will any AI that reads that file. The rule is enforced by a hook that literally blocks aggregate queries until you've read 20+ individual records first.

## The Sniff Test

The sniff test — the 8-check lead qualification that runs before we spend a dollar — exists because of these data patterns:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# From the CLAUDE.md — the 8-check sniff test

## Phase 1: SNIFF TEST (8 checks)

1. Duplicate? → Check phone/email against existing leads
2. DNC? → Check do-not-contact list
3. Employee? → Filter internal/competitor leads
4. Geography? → Lead in a market we serve?
5. Timeline? → Moving within actionable window?
6. Budget? → Can they afford our inventory?
7. What ad did they click?
   INQUIRY address != where they LIVE
8. History? → New lead or repeat, prior denials

CRITICAL: ZIP demographics lookup is MANDATORY.
The ZIP tells you who they are.
The inquiry tells you what they wish they could afford.
</pre>

Check 7 is where the magic is. The building someone clicked on tells you almost nothing about where they'll live. But the ZIP code they're coming from — their current address — tells you everything. Income bracket. Household size. Credit profile. Price sensitivity. The inquiry is aspirational noise. The ZIP is ground truth.

This is survivorship bias in reverse. David McRaney writes about Abraham Wald and the bomber bullet holes — how the military wanted to armor the parts of returning planes that had bullet holes, and Wald pointed out that those planes survived *because* the bullets hit non-critical areas. The planes that didn't come back had bullets in different places. You have to study the failures, not the survivors.

Every brokerage in America studies their closed deals. "What worked? What converted?" But the deals that closed are the returning planes. The insight is in the ones that didn't come back. 30,000 conversations a month means 30,000 data points about where deals fail. The geographic waste pattern — 44% of Chicago leads getting wrong neighborhood matches — was invisible when you looked at individual conversations. It only appeared when you looked at thousands of failed conversations and asked: what went wrong?

The AI doesn't study its wins. It studies its drop-offs. That's the whole insight. And it only works at scale.

## The Fuck-Ups

The data also shows every failure. And there have been spectacular ones.

The Twilio incident — 1,039,939 messages in five days — is the one I've written about. But it wasn't the only one. There's a pattern to the failures, and the pattern is always the same: someone thinks they deployed something, and they didn't. Or they think they didn't deploy something, and they did.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
The "deploy that didn't deploy" pattern:

  Incident 1: Twilio runaway
    Team said: "The deploy didn't land in production."
    Reality:    1,039,939 messages say otherwise.

  Incident 2: Matching update
    I said:     "Push to production tonight."
    Team said:  "Done."
    Reality:    They pushed to staging. Production
                ran old code for 3 days. 900+ leads
                got stale matching results.
                Nobody checked. I found it in the data.

  Incident 3: Rate limiter
    We deployed a Twilio rate limiter to prevent
    another runaway incident.
    Checked on deploy day: working.
    Checked one week later: disabled.
    Someone had commented it out "temporarily"
    during debugging and pushed the change.
    The safety system designed to prevent the last
    disaster was silently removed.

  Every one of these has the same root cause:
  no automated verification.
  Humans said they deployed. Nobody checked.
  The hooks exist because humans lie —
  not maliciously, but because checking is boring
  and ego depletion is real.
</pre>

Then there was the PR reviewer experiment. After the Twilio incident but before I fired the team entirely, I tried a middle path: keep the engineers, but make them PR reviewers instead of primary developers. I'd write the code with AI assistance. They'd review it. This would combine my speed with their expertise.

It lasted about two months.

The reviews were perfunctory. "LGTM" with no comments. Or nitpicks on formatting while missing actual logic bugs. Or — the worst — disagreements about architecture that would hold up a deploy for days while we argued about patterns that didn't matter for a system processing 30,000 leads a day. The team was demoralized. They went from building things to rubber-stamping things someone else built, and the resentment was palpable.

The screaming matches were about accountability. I'd find a bug in production. I'd ask why the PR review didn't catch it. The answer was always some variation of "the code was complex" or "we were focused on the architecture, not the logic" or "that edge case wasn't in the test suite." All true. All irrelevant. The question wasn't why they missed it. The question was why I was paying $4,350 a month for reviews that didn't catch anything.

I replaced the PR reviewers with hooks. The hooks don't get demoralized. The hooks don't argue about architecture. The hooks don't say "LGTM" on code they didn't read. The hooks either pass or fail, and when they fail, they fail with a specific error message and an exit code that blocks the deploy.

## The Ticketing Problem

There's one thing the data shows that I haven't solved: ticketing.

The CRM — ClientMGR — is supposed to track every lead through the pipeline. Ticket creation, assignment, status updates, notes, follow-up scheduling. In theory, it's the source of truth for what happened to every lead.

In practice, it's unstable. The interface is slow. The mobile experience is unusable. The API has undocumented behaviors that break integrations randomly. Status updates don't propagate reliably. And the fundamental problem: nobody — human or AI — consistently updates tickets.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Ticketing reality:

  Tickets created automatically:  ~95% (API does this)
  Tickets with accurate status:   ~40%
  Tickets with complete notes:    ~15%
  Tickets updated after tour:     ~30%
  Tickets closed correctly:       ~25%

  The CRM is a write-only database.
  Data goes in. Nobody reads it.
  Nobody trusts it.
  When I need to know what happened to a lead,
  I read the Twilio message logs directly.
  The CRM is decoration.
</pre>

This is the current unsolved problem. The conversation engine works. The matching works. The qualification works. The overnight operations work. But the record of what happened — the institutional memory that should live in the CRM — is garbage. And I can't get anyone to fix it because "anyone" is me, and I'm building five other things.

The honest truth about running a 30,000-conversation-a-month operation as one person: some things don't get built. Some things get built badly. Some things that should be table stakes — like reliable ticketing — just sit there, broken, because the priority queue is infinite and the builder is finite.

The data tells the story. The data is beautiful and ugly at the same time. The beautiful part: 30,000 conversations, fractions of a cent each, 97% margins, matching that actually works when you get the geography right. The ugly part: 44% geographic mismatch, $280 price gaps from stale data, a CRM that nobody trusts, a ticketing system that's "write-only," and a deploy verification process that only exists because three previous processes failed.

Thirty thousand conversations a month. One person. Zero engineers. And the machine is both extraordinary and deeply, honestly broken. Both things are true at the same time.

That's what the data looks like.
