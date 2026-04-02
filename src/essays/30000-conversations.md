---
layout: essay.njk
title: "30,000 Conversations a Day: What the Data Looks Like"
order: 19
date: 2025-11-25
---

Everyone quotes the number. 30,000 leads a month. It sounds impressive in a pitch. It means nothing without the data underneath.

Here's what it actually looks like inside the machine.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Chicago market anomalies:

  44% of leads → wrong geographic match
      (renter in Rogers Park shown buildings
       in Bridgeport)

  $280 gap → average delta between 2br
      listed price and actual available price

  68% of placements → different neighborhood
      than original inquiry

Dallas market anomalies:

  37% geographic waste → leads shown buildings
      outside 3-mile comfort zone

  Tour-to-close ratio 2x higher when building
      within 3mi of renter's current ZIP

  Renter's inquiry ZIP ≠ where they live
      (inquiry is aspirational; ZIP is real)
</pre>

The first thing the data tells you is that the listing the renter clicked on is noise. They clicked a unit in Lincoln Park because it had nice photos. They live in Albany Park. Their budget fits Rogers Park. They'll sign a lease in Ravenswood. The click is a signal of intent to move — not a signal of where.

The second thing is the geographic comfort zone. Renters will tour a building 2.5 miles from their current address. They will not tour a building 7 miles away, even if it's cheaper and objectively better. The 37% geographic waste in Dallas was leads being shown buildings that no reasonable person would drive to see. The AI was optimizing for inventory match. It should have been optimizing for proximity to current location first, then inventory match.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# From the CLAUDE.md — the sniff test that catches this

## Phase 1: SNIFF TEST (8 checks)

7. What ad did they click?
   INQUIRY address != where they LIVE

8. History?
   New lead or repeat, prior denials

CRITICAL: ZIP demographics lookup is MANDATORY.
The ZIP tells you who they are.
</pre>

Check 7 of the sniff test exists because of this data. The inquiry address is not where they live. The ZIP code they're coming from — their current address — tells you income bracket, household size, credit profile, and price sensitivity. The inquiry is aspirational noise. The ZIP is ground truth.

The third pattern is the $280 gap. Listed prices on ILS platforms (Zillow, Apartments.com) are often weeks stale. By the time a renter inquires, the unit at that price is gone or the price has changed. The average 2-bedroom had a $280 delta between listed and actual available price in Chicago. The AI learned to present this as an opportunity rather than a disappointment: "That unit is gone, but I found three in the same neighborhood that are actually available — and one of them is $150 cheaper."

David McRaney writes about survivorship bias — we study the deals that closed and miss the ones that died silently. 30,000 conversations a month means 30,000 data points about where deals fail. The geographic waste pattern was invisible at the individual level. It only appeared when you looked at thousands of failed conversations and asked: what went wrong?

The AI doesn't study its wins. It studies its drop-offs.

That's the whole insight. And it only works at scale.
