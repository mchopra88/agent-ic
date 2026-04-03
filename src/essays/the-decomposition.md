---
layout: essay.njk
title: "The Decomposition: From Monolith to Microservices in a Sales Organization"
order: 5
date: 2025-08-10
---

Alex Rampell at a16z wrote an investment memo about Fly Homes that decomposed a real estate transaction into its component services. I read it and thought: he's describing what I already built. But he stopped at the first level. I went three levels deeper.

<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;margin:2rem 0;">
  <style>
    .d-box { fill:#111; stroke:#333; stroke-width:1; rx:4; }
    .d-active { fill:#0a1a0a; stroke:#363; stroke-width:1; rx:4; }
    .d-label { fill:#e8e4de; font-family:'Cormorant Garamond',Georgia,serif; font-size:11px; text-anchor:middle; }
    .d-sm { fill:#666; font-family:'Cormorant Garamond',Georgia,serif; font-size:9px; text-anchor:middle; }
    .d-level { fill:#555; font-family:'Cormorant Garamond',Georgia,serif; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; }
  </style>

  <!-- Level 0 -->
  <text x="10" y="20" class="d-level">Level 0: The Monolith</text>
  <rect x="120" y="30" width="440" height="40" class="d-box"/>
  <text x="340" y="55" class="d-label">One Leasing Agent Does Everything</text>

  <!-- Level 1 -->
  <text x="10" y="100" class="d-level">Level 1: Special Teams</text>
  <rect x="20" y="110" width="100" height="35" class="d-box"/>
  <text x="70" y="132" class="d-sm">Qualify</text>
  <rect x="130" y="110" width="100" height="35" class="d-box"/>
  <text x="180" y="132" class="d-sm">Match</text>
  <rect x="240" y="110" width="100" height="35" class="d-box"/>
  <text x="290" y="132" class="d-sm">Tour</text>
  <rect x="350" y="110" width="100" height="35" class="d-box"/>
  <text x="400" y="132" class="d-sm">Docs</text>
  <rect x="460" y="110" width="100" height="35" class="d-box"/>
  <text x="510" y="132" class="d-sm">Apply</text>
  <rect x="570" y="110" width="100" height="35" class="d-box"/>
  <text x="620" y="132" class="d-sm">Follow-up</text>

  <!-- Level 2 -->
  <text x="10" y="180" class="d-level">Level 2: Atomic Tasks</text>
  <rect x="20" y="190" width="75" height="30" class="d-box"/>
  <text x="57" y="209" class="d-sm">parse intent</text>
  <rect x="100" y="190" width="75" height="30" class="d-box"/>
  <text x="137" y="209" class="d-sm">check budget</text>
  <rect x="180" y="190" width="75" height="30" class="d-box"/>
  <text x="217" y="209" class="d-sm">query DB</text>
  <rect x="260" y="190" width="75" height="30" class="d-box"/>
  <text x="297" y="209" class="d-sm">rank results</text>
  <rect x="340" y="190" width="75" height="30" class="d-box"/>
  <text x="377" y="209" class="d-sm">draft msg</text>
  <rect x="420" y="190" width="75" height="30" class="d-box"/>
  <text x="457" y="209" class="d-sm">compliance</text>
  <rect x="500" y="190" width="55" height="30" class="d-box"/>
  <text x="527" y="209" class="d-sm">send</text>
  <rect x="560" y="190" width="55" height="30" class="d-box"/>
  <text x="587" y="209" class="d-sm">log</text>
  <rect x="620" y="190" width="55" height="30" class="d-box"/>
  <text x="647" y="209" class="d-sm">score</text>

  <!-- Level 3 -->
  <text x="10" y="260" class="d-level">Level 3: Replaceable Executors</text>
  <rect x="40" y="270" width="130" height="40" class="d-active"/>
  <text x="105" y="286" class="d-label" style="fill:#6b6;">LLM</text>
  <text x="105" y="300" class="d-sm" style="fill:#4a4;">$0.003/task</text>
  <rect x="185" y="270" width="130" height="40" class="d-box"/>
  <text x="250" y="286" class="d-label">Voice AI</text>
  <text x="250" y="300" class="d-sm">$0.09/min</text>
  <rect x="330" y="270" width="130" height="40" class="d-box"/>
  <text x="395" y="286" class="d-label">Human</text>
  <text x="395" y="300" class="d-sm">$3-7/task</text>
  <rect x="475" y="270" width="130" height="40" class="d-active"/>
  <text x="540" y="286" class="d-label" style="fill:#6b6;">Code</text>
  <text x="540" y="300" class="d-sm" style="fill:#4a4;">$0/task</text>

  <line x1="40" y1="340" x2="640" y2="340" stroke="#222" stroke-width="1"/>
  <text x="340" y="360" class="d-sm">The executor is interchangeable. The interface is sacred.</text>
  <text x="340" y="375" class="d-sm" style="fill:#555;">Same architecture as Amazon's internal services. Applied to a leasing office.</text>
</svg>

**Level zero** is the monolith. One leasing agent does everything — qualifies the lead, searches inventory, books tours, collects documents, submits applications, follows up. This is how every brokerage in America works. It's also why every brokerage in America has the same margin problem: the human is the bottleneck and the cost center simultaneously.

**Level one** is special teams. Decompose the leasing agent into functions: lead qualification, inventory matching, tour booking, document collection, application processing, follow-up. Each function is a team. Each team can be measured independently. This is where Rampell stopped. This is where most organizations stop because it's already hard enough to manage.

**Level two** is atomic tasks. Decompose each function into its smallest meaningful unit of work: parse intent, check budget, query database, rank results, draft message, check compliance, send, log. Each task is a ticket. Each ticket has an input, an output, a cost, and a success metric. This is where the architecture starts looking like Amazon's internal services.

**Level three** is replaceable executors. Each atomic task can be performed by any executor that satisfies the interface: an LLM at $0.003/task, a voice AI at $0.09/minute, a human at $3-7/task, or deterministic code at $0/task. The executor is interchangeable. The interface is sacred.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# From the actual production code — Ken Insurance Agent

class KenAgent:
    """
    Handles:
    - Initial outreach to new leads
    - Response classification and handling
    - Info gathering (address, move-in date, email)
    - Quote delivery (only after carrier API call)
    - Follow-up sequencing
    - Objection handling
    """

    def handle_inbound(self, lead, message):
        """
        Returns: (response, event, action_needed)

        action_needed can be:
        - {"action": "generate_quote", ...}
        - {"action": "lookup_property", ...}
        - {"action": "escalate_to_human", ...}
        - None
        """
        classification = classify_message(message)
        self._extract_statements(lead, message)
        response, event, action = \
            self._handle_intent(lead, classification, message)

        if event:
            self.state_machine.process_event(lead, event)

        return response, event, action
</pre>

Look at that interface. `handle_inbound` takes a lead and a message. It returns a response, an event, and an optional action. The action might be "generate a quote" or "escalate to a human." The caller doesn't know or care whether the response was generated by an LLM, a template, or a human agent. The interface is the contract. The executor is swappable.

Four principles govern the whole thing:

1. **Modularization:** Every function is a service. The locator agent, the insurance agent, the landlord rep agent, the financial analysis pipeline — four business units, four independent services, shared infrastructure.

2. **Replaceability:** Any executor can be swapped without changing the system. When I switched from GPT-4 to Claude for the insurance agent, exactly zero business logic changed. The interface stayed the same. The executor swapped out.

3. **Sanctity:** Each module owns its data and its contracts. The insurance agent doesn't touch the locator database. The locator agent doesn't know insurance exists. Clean boundaries.

4. **Operating leverage:** Cost per task approaches zero as volume scales. The 30,000th conversation costs the same fractions of a cent as the first.

This is the same architecture that makes Amazon work at planetary scale. The difference is that Amazon needed millions of dollars and thousands of engineers to build each service. I needed a new prompt and a new API integration.

Ben Thompson would call this the aggregation theory applied to a sales organization. The platform aggregates demand (leads), owns the customer relationship (the conversation), and modularizes supply (buildings, insurance, services). The advantage accrues to the aggregator — the one who owns the conversation interface and can plug in any supplier behind it.

The benefits are the same as software microservices: independent deployability, fault isolation, team autonomy, measurability. The challenges are also the same: coordination overhead, data consistency, the temptation to over-decompose. But the payoff — being able to replace a $7 human task with a $0.003 machine task without touching anything else in the system — that's the entire game.
