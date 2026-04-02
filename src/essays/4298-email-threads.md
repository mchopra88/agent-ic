---
layout: essay.njk
title: "What 4,298 Email Threads Taught an AI About Selling Circuit Breakers"
status: "Coming soon — with pipeline visualization"
order: 16
---

A private equity firm brought me a portfolio company. Commercial electrical distribution — the kind of business that sells circuit breakers, conduit, wire, panel boards. 180,000 SKUs. Three sales reps. No CRM. The entire customer relationship existed in email inboxes and the heads of people who might leave.

The first thing I did was mine the email. 4,298 threads across three accounts. Not reading them — processing them. Entity extraction on every message: customer names, company names, product references, quantities, prices, delivery dates. Cross-referencing against the product catalog. Building a relationship graph from scratch.

657 net-new contacts emerged. Not scraped from LinkedIn. Extracted from actual business correspondence — people who had placed orders, requested quotes, asked questions, complained about deliveries. Each contact came with context: what they'd bought before, what they'd asked about, how frequently they engaged, which sales rep they preferred.

Then the quoting engine. 180,000 SKUs is too many for a human to hold in memory. The sales reps worked from spreadsheets and manufacturer catalogs, manually looking up part numbers and cross-referencing prices. The AI trains on the full catalog and achieves roughly 90% accuracy on quote generation.

The arbitrage opportunities were immediate. SUSOL breakers vs. WL breakers — functionally identical products at 55-60% margin difference. The AI spotted this across thousands of historical quotes. A human would need months to identify that pattern. The machine found it in hours.

This project taught me two things. First: the agent-ic thesis works outside real estate. A quoting desk is the same pattern as an apartment locator — conversational agent, product database, matching logic. Different inventory, same architecture. Second: the most valuable thing in any business isn't the product or the customer. It's the data about the relationship between the two. And most businesses leave that data buried in email.

<p class="coming-soon">Full essay coming soon — will include the email mining pipeline architecture, the SKU matching accuracy curve, and the before/after economics.</p>
