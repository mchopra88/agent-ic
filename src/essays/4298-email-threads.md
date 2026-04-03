---
layout: essay.njk
title: "What 4,298 Email Threads Taught an AI About Selling Circuit Breakers"
status: "Draft"
order: 23
date: 2026-02-05
private: true
permalink: false
---

A PE-backed portfolio company in commercial electrical distribution. Switchboards, panelboards, circuit breakers. 180,000 SKUs in the catalog. Three sales reps. No CRM. The entire customer relationship existed in email inboxes and the heads of people who might quit.

The fund's managing partner asked me to look at the technology layer. He'd acquired the company at roughly eight figures with significant leverage and an earnout to the seller. Revenue around $15 million. Twenty-five employees. Seven to eight quotes per day at $30,000-$100,000 each. Everything was manual — spreadsheets, manufacturer catalogs, sales reps looking up part numbers by hand.

The first thing I did was mine the email.

<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:2rem 0;">
  <style>
    .box { fill:none; stroke:#444; stroke-width:1; }
    .box-active { fill:#111; stroke:#666; stroke-width:1; }
    .label { fill:#e8e4de; font-family:'Cormorant Garamond',Georgia,serif; font-size:12px; }
    .label-sm { fill:#888; font-family:'Cormorant Garamond',Georgia,serif; font-size:10px; }
    .label-metric { fill:#e8e4de; font-family:'Cormorant Garamond',Georgia,serif; font-size:10px; font-weight:600; }
    .line { stroke:#333; stroke-width:1; }
  </style>
  <text x="10" y="20" class="label-sm" style="fill:#666; text-transform:uppercase; letter-spacing:0.1em;">Email Mining Pipeline</text>

  <rect x="10" y="35" width="120" height="55" rx="3" class="box-active"/>
  <text x="70" y="55" text-anchor="middle" class="label">4,298 Threads</text>
  <text x="70" y="70" text-anchor="middle" class="label-sm">3 inboxes</text>
  <text x="70" y="82" text-anchor="middle" class="label-sm" style="fill:#555;">Raw email</text>

  <line x1="130" y1="62" x2="160" y2="62" class="line"/>

  <rect x="160" y="35" width="130" height="55" rx="3" class="box-active"/>
  <text x="225" y="55" text-anchor="middle" class="label">Entity Extraction</text>
  <text x="225" y="70" text-anchor="middle" class="label-sm">Names, orgs, products</text>
  <text x="225" y="82" text-anchor="middle" class="label-sm" style="fill:#555;">Quantities, prices, dates</text>

  <line x1="290" y1="62" x2="320" y2="62" class="line"/>

  <rect x="320" y="35" width="130" height="55" rx="3" class="box-active"/>
  <text x="385" y="55" text-anchor="middle" class="label">Cross-Reference</text>
  <text x="385" y="70" text-anchor="middle" class="label-sm">180K SKU catalog</text>
  <text x="385" y="82" text-anchor="middle" class="label-sm" style="fill:#555;">Relationship graphing</text>

  <line x1="450" y1="62" x2="480" y2="62" class="line"/>

  <rect x="480" y="35" width="180" height="55" rx="3" class="box-active"/>
  <text x="570" y="55" text-anchor="middle" class="label">Structured CRM</text>
  <text x="570" y="70" text-anchor="middle" class="label-sm">Zero manual data entry</text>

  <!-- Output stats -->
  <text x="10" y="120" class="label-sm" style="fill:#666; text-transform:uppercase; letter-spacing:0.1em;">What Emerged</text>

  <rect x="10" y="132" width="100" height="40" rx="3" class="box"/>
  <text x="60" y="148" text-anchor="middle" class="label-metric">142</text>
  <text x="60" y="162" text-anchor="middle" class="label-sm">organizations</text>

  <rect x="120" y="132" width="100" height="40" rx="3" class="box"/>
  <text x="170" y="148" text-anchor="middle" class="label-metric">657</text>
  <text x="170" y="162" text-anchor="middle" class="label-sm">contacts found</text>

  <rect x="230" y="132" width="100" height="40" rx="3" class="box"/>
  <text x="280" y="148" text-anchor="middle" class="label-metric">4,305</text>
  <text x="280" y="162" text-anchor="middle" class="label-sm">deals identified</text>

  <rect x="340" y="132" width="100" height="40" rx="3" class="box"/>
  <text x="390" y="148" text-anchor="middle" class="label-metric">14,264</text>
  <text x="390" y="162" text-anchor="middle" class="label-sm">attachments</text>

  <rect x="450" y="132" width="100" height="40" rx="3" class="box"/>
  <text x="500" y="148" text-anchor="middle" class="label-metric">1,016</text>
  <text x="500" y="162" text-anchor="middle" class="label-sm">quote PDFs</text>

  <rect x="560" y="132" width="110" height="40" rx="3" class="box"/>
  <text x="615" y="148" text-anchor="middle" class="label-metric">~90%</text>
  <text x="615" y="162" text-anchor="middle" class="label-sm">quote accuracy</text>

  <text x="10" y="200" class="label-sm">657 contacts the sales team didn't know existed — extracted from their own email without anyone doing data entry.</text>
  <text x="10" y="217" class="label-sm">1,016 historical quotes reverse-engineered into a training set for the quoting engine.</text>
</svg>

4,298 threads across three sales rep accounts. Not reading them — processing them. Entity extraction on every message: customer names, company names, product references, quantities, prices, delivery dates. Cross-referencing against the full 180,000-SKU product catalog. Building a relationship graph from scratch.

657 net-new contacts emerged. Not scraped from LinkedIn. Extracted from actual business correspondence — people who had placed orders, requested quotes, asked about products, complained about deliveries. Each contact came with context: what they'd bought before, how frequently they engaged, which sales rep they preferred. The sales team had no idea these relationships existed in their own email archive.

Then the quoting engine. 180,000 SKUs is too many for a human to hold in working memory. The sales reps worked from spreadsheets and manufacturer catalogs, manually looking up part numbers and cross-referencing prices. Trained on twelve months of historical quotes and the full catalog, the AI achieves roughly 90% accuracy on automated quote generation.

The arbitrage opportunities were immediate. SUSOL breakers versus WL CP breakers — functionally equivalent products at a 55-60% margin difference. The AI spotted this pattern across thousands of historical quotes. A human would need months to identify that kind of systematic substitution opportunity. The machine found it in hours. That single finding could be worth more than everything else combined.

The compensation negotiation for this work was itself instructive. The fund's managing partner asked a friend what it would cost. The friend said $5,000-$40,000 total. I told him to get real quotes from development shops. Senior AI engineers on Upwork quoted $50,000-$150,000 for the quoting engine alone. Larger firms quoted higher. My argument: "A lawyer doesn't charge less because they used Westlaw instead of reading case law in a library. You're paying for the outcome, not the hours."

This project taught me two things.

First: the agent-ic thesis works outside real estate. A quoting desk is the same pattern as an apartment locator — conversational agent, product database, matching logic. Different inventory, same architecture. The same system I built for matching renters to apartments, adapted for matching RFP line items to SKUs.

Second: the most valuable thing in any business isn't the product or the customer. It's the data about the relationship between the two. And most businesses leave that data buried in email inboxes attached to people who might leave tomorrow.
