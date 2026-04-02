---
layout: essay.njk
title: "The Twilio Incident"
status: "Coming soon"
order: 17
---

The engineering team deployed on a Friday. They said it was a minor update. It wasn't.

The code had a loop that was supposed to send follow-up SMS messages to leads who hadn't responded. The loop didn't have a proper termination condition. It also didn't check whether a message had already been sent. It ran against the production database.

Over a million text messages went out. Not over days — over hours. The Twilio bill spiked to five figures before anyone noticed. The database buckled under the write load. Leads who had explicitly opted out received messages. Leads who had already converted received re-engagement texts. Some leads received the same message dozens of times.

I was watching the monitoring dashboard when the numbers stopped making sense. Message volume that should have been in the hundreds was in the tens of thousands. By the time I killed the process, the damage was done.

The aftermath was worse than the incident. Twilio flagged the account. Leads complained. The TCPA exposure — sending unsolicited messages to people who had opted out — was the kind of thing that generates class action lawsuits. We spent weeks cleaning up the data, responding to complaints, and rebuilding trust with the carrier.

The engineering team's response: "The deploy didn't land in production." It had. The evidence was in a million message logs.

That was the moment I stopped trusting humans with production systems. Not because humans are bad at engineering — they're not. But because the cost of a mistake in a system processing 30,000 conversations a day is catastrophic, and humans make mistakes at a rate that's incompatible with that scale.

Everything I built after that — the pre-bash safeguards, the hook system, the guardrails architecture, the mandatory fresh-eyes review — traces back to this incident. Every safety mechanism is a monument to the Twilio disaster.

<p class="coming-soon">Full essay coming soon — will include the actual sequence of events, the safeguard code that was born from it, and the architecture that ensures it can never happen again.</p>
