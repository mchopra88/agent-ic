---
layout: essay.njk
title: "The Decomposition: From Monolith to Microservices in a Sales Organization"
status: "Draft"
order: 5
date: 2025-08-10
---

Alex Rampell at a16z wrote an investment memo about Fly Homes that decomposed a real estate transaction into its component services. I read it and thought: he's describing what I already built. But he stopped at the first level. I went three levels deeper.

Level zero is the monolith. One sales agent does everything — qualifies the lead, searches inventory, books tours, collects documents, submits applications, follows up. This is how every brokerage in America works. It's also why every brokerage in America has the same margin problem: the human is the bottleneck and the cost center simultaneously.

Level one is special teams. Decompose the sales agent into functions: lead qualification, inventory matching, tour booking, document collection, application processing, follow-up. Each function is a team. Each team can be measured independently. This is where most organizations stop because it's already hard enough to manage.

Level two is atomic tasks. Decompose each function into its smallest meaningful unit of work: parse intent, check budget, query database, rank results, draft message, check compliance, send, log. Each task is a ticket. Each ticket has an input, an output, a cost, and a success metric. This is where the architecture starts looking like Amazon's internal services.

Level three is replaceable executors. Each atomic task can be performed by any executor that satisfies the interface: an LLM at $0.003/task, a voice AI at $0.09/minute, a human at $3-7/task, or deterministic code at $0/task. The executor is interchangeable. The interface is sacred.

Four principles govern the whole thing. Modularization: every function is a service. Replaceability: any executor can be swapped without changing the system. Sanctity: each module owns its data and contracts. Operating leverage: cost per task approaches zero as volume scales.

This is the same architecture that makes Amazon work at planetary scale. I applied it to a leasing office.

The benefits are the same as software microservices: independent deployability, fault isolation, team autonomy, measurability. The challenges are also the same: coordination overhead, data consistency, the temptation to over-decompose. But the payoff — being able to replace a $7 human task with a $0.003 machine task without touching anything else in the system — that's the entire game.

<p class="coming-soon">Full essay coming soon.</p>
