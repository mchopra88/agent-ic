---
layout: essay.njk
title: "There Is No Winning, Only Surviving"
order: 26
date: 2026-03-01
---

The Bureau of Labor Statistics publishes survival rates for US businesses. The numbers are brutal, and nobody reads them because the people who start businesses are, by definition, people who believe the numbers don't apply to them.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Business survival rates (BLS, 2024):

  Year 1:    ~80% survive  (20% dead)
  Year 2:    ~70% survive  (30% dead)
  Year 3:    ~62% survive  (38% dead)
  Year 5:    ~50% survive  (half are gone)
  Year 7:    ~40% survive
  Year 10:   ~33% survive  (2 out of 3 dead)
  Year 15:   ~25% survive  (3 out of 4 dead)
  Year 20:   ~20% survive

  HomeEasy: founded 2017. Year 9.
  We are in the 40% that's still breathing.

  But "still breathing" is generous.
  Some of those survivors are zombies —
  businesses that exist but don't grow,
  don't profit, just persist on inertia
  and the founder's refusal to admit it's over.

  Real survival — growing, profitable,
  building capability — is rarer.
  Maybe 15-20% at year 10.
</pre>

Half of all businesses are dead by year five. That's not a pessimistic estimate. That's the median. If you started a business today, the most likely outcome — the single most probable scenario — is that it won't exist in five years.

People in tech don't talk about this because the narrative is about disruption and innovation and changing the world. Nobody raises a Series A by saying "our primary strategic objective is to not die." But that's the actual game. The game isn't winning. The game is surviving long enough for the compounding to kick in.

## I Wasn't Laying Foundations

There's a narrative I could tell — the retrospective one — where every decision I made was strategic. "I focused on cost leadership first to build a structural advantage." "I invested in automation to create non-linear scaling." "I built the CLAUDE.md governance framework to ensure operational excellence."

That's the cleaned-up version. The one you put in pitch decks. The one that makes it sound like there was a plan.

There wasn't a plan. There was paranoia.

I cut costs because I was terrified of running out of money. Not because I had a framework for cost leadership. Not because I'd read Porter's Five Forces and decided to compete on cost. Because I looked at the bank account every morning and calculated how many months of runway we had, and the number was always smaller than I wanted it to be.

The BPO experiment in 2024 — hiring offshore agents through providers in Pakistan — wasn't a strategic test of labor arbitrage. It was desperation. I needed more capacity and the in-house approach had run its course. The fact that it failed and taught me that cheap labor isn't cost leadership — that was an accident. The lesson was real. The strategy was retroactive.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Decisions that look strategic in retrospect
but were actually survival instincts:

  "Built cost leadership early"
    → Was terrified of running out of money.
      Cut everything that didn't immediately
      generate revenue.

  "Invested in automation before competitors"
    → Couldn't afford to hire more agents.
      Automation was the only way to handle
      volume without headcount.

  "Created the CLAUDE.md governance framework"
    → AI nearly wiped the database.
      Wrote rules in a panic after an incident.
      The rules accumulated into a framework
      because the incidents kept happening.

  "Replaced engineering team with AI"
    → The team sent a million messages and
      generated zero revenue for three months.
      I couldn't justify the cost.

  "Built multi-vertical (insurance)"
    → Needed more revenue. Already had the
      customer. Insurance was the lowest-cost
      adjacent product to add.

  "Built overnight autonomous operations"
    → Couldn't afford to work 18-hour days
      anymore. The machine had to run while
      I slept or it wasn't going to run at all.

  None of these were strategies.
  All of them were survival responses.
  They look strategic because the ones
  that didn't work killed the businesses
  that tried them and nobody's left to
  talk about the failures.
</pre>

That last line is the key. The things I did that look smart now look smart because I survived long enough for them to compound. The businesses that made different choices — the ones that hired more aggressively, that spent more on marketing, that didn't automate, that didn't cut costs to the bone — some of them made better choices than I did. We'll never know, because they're dead. They're not writing essays about their strategies. They're in the BLS survival statistics, in the 50% that didn't make it to year five.

This is survivorship bias applied to business strategy. David McRaney writes about Abraham Wald and the bombers — the military wanted to armor the parts of planes that had bullet holes, and Wald pointed out that those planes came back BECAUSE the bullets hit non-critical areas. The insight was in the planes that didn't come back.

Business strategy has the same problem. Every business book is written by survivors. Every case study features companies that succeeded. The strategies that "worked" are the strategies of survivors. We have no data on the identical strategies that killed other companies, because those companies aren't around to report their results.

My cost-cutting looks like strategic genius now. But if the BPO experiment had worked — if cheap labor HAD been a viable substitute — then the "strategic genius" narrative would be about labor arbitrage, not automation. The strategy didn't determine the outcome. The outcome retroactively determined which decisions look strategic.

## The Paranoia Architecture

Andy Grove — Intel's CEO during the processor wars — wrote a book called *Only the Paranoid Survive*. His thesis: in technology businesses, there are "strategic inflection points" where the competitive landscape shifts so dramatically that companies either adapt or die. The companies that survive are the ones run by people who are paranoid enough to see the inflection point coming.

Grove was talking about industry transitions — the shift from memory chips to microprocessors, the emergence of the internet, the move to mobile. But the principle applies at every scale. For a company processing 30,000 conversations a month with zero human engineers, the inflection points are constant and personal:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Things that could kill the business RIGHT NOW:

  Twilio changes pricing or terms
    → Entire communication layer depends on one vendor
    → Mitigation: daily send caps, external watchdog,
       pre-negotiated rates

  API costs spike (Anthropic, OpenAI, Google)
    → $400-600/month is current. Could be $4,000.
    → Mitigation: Gemini for bulk work, local models
       for classification, Opus only for high-value

  A carrier pulls the insurance partnership
    → Ken Agent revenue goes to zero overnight
    → Mitigation: multiple carrier relationships,
       own the customer relationship, not the policy

  ILS platforms change lead delivery terms
    → Lead volume could drop 80% in a month
    → Mitigation: multi-source diversification,
       direct traffic, property manager partnerships

  I get hit by a bus
    → Literally everything stops
    → Mitigation: CLAUDE.md, session memory, hooks,
       documentation. Someone could pick this up.
       Not easily. But not from zero.

  Competitor with funding replicates the model
    → They have engineers, capital, brand recognition
    → Mitigation: 7 years of data, 7 CLAUDE.md files,
       119 session memories, hundreds of thousands of
       lead conversations as training data.
       Good luck replicating that from scratch.
</pre>

Every one of those risks has a mitigation, and every mitigation exists because I woke up at 3 AM worrying about it. The daily Twilio send cap exists because the million-message incident proved that code bugs can generate catastrophic costs before anyone notices. The multi-source lead diversification exists because I watched a competitor lose 60% of their volume overnight when a single ILS changed terms. The external watchdog script — the one that texts my personal phone if message volume spikes — exists because I'm paranoid about the thing that happened once happening again.

This isn't strategic planning. This is anxiety monetized. I lie awake thinking about what can kill the business, and then I build systems to prevent it. The systems accumulate into what looks like a sophisticated risk management framework. In reality, it's a map of my nightmares, encoded in bash scripts and CLAUDE.md rules.

## The Real Game

The cleaned-up version of my story goes: "Visionary founder sees the potential of AI in apartment locating, builds a cost-leadership position, creates a multi-vertical platform, and generates 97% margins through automation."

The real version goes: "Paranoid founder who can't afford to hire anyone builds janky automation because he's terrified of running out of money. The automation happens to work. He can't afford an engineering team so he fires them and uses AI instead. The AI happens to work better. He's still terrified, so he keeps cutting costs and building defenses. The defenses happen to create a moat. He's been doing this for nine years and hasn't died yet, which puts him in the top 40%."

Both stories describe the same company. The first one is the pitch deck. The second one is the truth.

In business, there's no such thing as winning. There's only surviving. The 50% that die by year five didn't necessarily make worse decisions. They made different decisions, and the universe selected against those decisions. The universe didn't select FOR my decisions — it just hasn't selected against them yet.

The margin is extraordinary. 97% contribution margins are real. The technology works. The system runs overnight. The leads flow. But every morning I check the bank account and calculate runway, same as I did in year one. The number is bigger now. The paranoia is the same.

Andy Grove survived Intel's inflection points because he was paranoid. I've survived nine years in apartment locating because I was paranoid. In both cases, the paranoia isn't a personality flaw. It's the survival mechanism.

The businesses that aren't paranoid — the ones that trust their runway, that hire ahead of revenue, that build for the future before securing the present — some of them become unicorns. Most of them become statistics.

I'd rather be breathing than be a unicorn.

That's the whole strategy. Stay alive. Keep the costs below the revenue. Build the defense before you need it. Run the overnight machine. Wake up tomorrow. Do it again.

The fact that this produced a 97% margin business with an AI-powered multi-vertical platform is, genuinely, an accident. A beautiful, compounding, deeply unlikely accident — built not on vision, but on the simple, animal refusal to die.
