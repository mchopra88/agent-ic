---
layout: essay.njk
title: "30,000 Conversations a Day: What the Data Looks Like"
status: "Draft"
order: 19
date: 2025-11-25
---

Everyone quotes the number. 30,000 leads a day. It sounds impressive in a pitch. It means nothing without the data underneath.

Here's what it actually looks like inside the machine.

The lead flow is not uniform. It peaks between 10 AM and 2 PM local time, drops to near-zero after 10 PM, and there's a secondary spike around 6-7 PM when people browse apartments after work. The system doesn't sleep during the trough — that's when the overnight machine runs: inventory refresh, lead scoring recalculation, stale data detection, follow-up cadence execution.

The match rates vary by market and they tell you everything about the real constraints of this business. Chicago runs around 44%. Dallas and Houston run closer to 68%. The difference isn't agent quality — it's inventory density. Chicago has a structural gap: the median renter budget for a 2-bedroom is around $1,500, but the minimum commission-paying 2-bedroom in the system starts at $1,780. That $280 gap is where deals go to die. No amount of AI can close a gap between what people can afford and what buildings charge.

Geographic waste runs about 37%. Leads that come in from locations where we don't have inventory coverage, or where the commuting math doesn't work. We process them anyway — sometimes they relocate, sometimes they flex on location — but the conversion rate on geographic mismatches is 8% vs 34% for in-zone leads.

The budget distribution looks like a log-normal curve with a hard floor. Almost nothing below $800/month (not enough inventory). A fat cluster at $1,200-$1,800 (the sweet spot where most commission-paying buildings price). A long tail past $2,500 where conversion rates actually drop because high-end renters have more options and shop longer.

<p class="coming-soon">Full essay coming soon — will include real (anonymized) data visualizations: lead flow heatmaps, market-by-market funnels, the budget-inventory gap analysis, and annotated SQL queries showing how the machine thinks about matching.</p>
