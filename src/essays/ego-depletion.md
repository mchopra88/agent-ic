---
layout: essay.njk
title: "Ego Depletion: Why I Built an AI to Compensate for Being Human"
order: 26
date: 2026-03-01
private: true
---

David McRaney tells the story of the radish experiment. Researchers put people in a room with two bowls — chocolate chip cookies and radishes. One group could eat the cookies. The other had to resist them and eat only radishes. Then both groups were given an unsolvable puzzle.

The cookie group worked on the puzzle for an average of 19 minutes. The radish group — the ones who'd spent their willpower resisting chocolate — quit after 8.

Willpower is not a metaphor. It's a battery. You drain it resisting one temptation and you have less for the next. Baumeister called it ego depletion. McRaney, in *[You Are Not So Smart](https://youarenotsosmart.com/2012/04/17/ego-depletion/)*, calls it "the reason you make bad decisions when you're tired."

I call it the reason my AI agents exist.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
The Misconception:
  Willpower is just a metaphor.

The Truth:
  Willpower is a finite resource that
  depletes as you use it.

    — David McRaney, You Are Not So Smart
</pre>

Here's what I observed, for seven years, watching human agents handle apartment leads: the quality of their work degraded predictably over the course of every day. First conversation at 9 AM — thorough qualification, detailed notes, proper follow-up scheduled. Last conversation at 5 PM — surface-level questions, no notes, follow-up forgotten. Not because they stopped caring. Because they ran out of battery.

The same thing happened to me. I am avoidant. I am neglectful of issues I know need attention. When things are hard and require focused thinking, I drift. I procrastinate. I find easier things to do. This is not a confession I make reluctantly — it's the core insight that drove the entire architecture.

When I say the human agents were burning out and not doing the work and costing us deals — I know that because I do it too. I am deeply, fundamentally subject to the same ego depletion that affects everyone. I'm using this technology to compensate for the parts of human nature that I can observe in myself and have observed in others for fifteen years: **people don't like doing things that are hard and require them to think.**

Here's what depletion looks like in production data. I pulled the actual agent conversation quality from a single Wednesday in October 2025 — a day where our human agent handled 23 leads:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Agent conversation quality — one Wednesday, 23 leads:

  9:02 AM  Lead #1  — 14 messages, 3 qualifying questions,
                      asked about move date, budget, pets.
                      Notes: "2br, $1400 max, cat, Jan move"
                      Follow-up: scheduled for Friday.

  9:38 AM  Lead #2  — 11 messages, full qualification.
                      Notes: "3br voucher, 2 kids, ASAP"
                      Follow-up: docs requested same day.

  ...

  3:47 PM  Lead #19 — 4 messages. "What area?"
                      "South side." "Ok I'll look."
                      Notes: empty.
                      Follow-up: none.

  4:22 PM  Lead #20 — 3 messages. "Budget?"
                      "$1200" "Ok."
                      Notes: empty.
                      Follow-up: none.

  4:51 PM  Lead #22 — 1 message. "Hi are you still looking?"
                      No response. No follow-up. Lead died.

  Morning leads:  avg 12.3 messages, 94% had notes
  Afternoon leads: avg 3.8 messages, 15% had notes
  The battery drained in real time.
</pre>

I wrote about this phenomenon in [my CLAUDE.md essay](/essays/my-claude-md/) — the governance file that runs the whole system. One of its rules is "Teaching mode: ALWAYS ON." The AI explains everything it does, defines every term, shows every trade-off. Not because the AI needs to be didactic. Because at 2 AM, when I'm debugging and depleted, I need the cognitive cost of every interaction to be as low as possible. The system explains itself to me the way a pharmacist labels pills: not because you're stupid, but because you might be exhausted.

The hooks are the same pattern. There are 8 of them — deterministic scripts that run on every tool call, every edit, every session start and stop. They can't be skipped. They don't deplete. One blocks destructive SQL. One catches syntax errors on every file save. One forces context loading before any session starts.

I don't trust myself to remember the database safety rules when I'm depleted. The hook doesn't deplete. It doesn't have a bad day. It doesn't get tired at 5 PM. It just runs, deterministically, every single time. When I'm tired and I reach for the aggregate query — the fast answer, the summary table, the dashboard number — the hook blocks me. "Have you read individual records first?" It forces me to do the hard thing, even when my ego is depleted and I want the shortcut.

McRaney also writes about the [survivorship bias](https://youarenotsosmart.com/2013/05/23/survivorship-bias/) — the Abraham Wald story about studying bullet holes on returning bombers. Every founder biography is a returning bomber. You read about the ones who pushed through, who ground it out, who "just kept going." You don't read about the ones who burned out, made bad decisions from ego depletion, and quietly failed. Those planes didn't come back.

I nearly didn't come back. There was a health crisis — the kind that comes from years of avoidance, from pouring every unit of willpower into the machine and leaving nothing for the maintenance of being a human body. There was a 75-page medical package that Karin helped me assemble. There was a period where I built myself a calorie tracking app — DBF, "Don't Be Fat" — because I needed the most prescriptive, lowest-activation-energy possible instruction. Not because I lack self-awareness about how that sounds. Because the depleted brain needs the checkbox. It needs the yes/no. It needs the thing that requires no thinking. The same design principle as the hooks: make the right behavior automatic, because willpower won't be there when you need it.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.85rem; line-height:1.7; color:#888; overflow-x:auto; margin:2rem 0;">
The architecture of my AI systems is the
architecture of my own weakness:

If it's hard → make it prescriptive
If it requires judgment → encode the rules
If willpower fails at 2 AM → automate it
If the human forgets → the hook remembers
If ego depletes → the system doesn't
</pre>

This is what I mean when I say I'm building systems that compensate for being human. Not in the aspirational Silicon Valley sense of "augmenting human potential." In the honest, 2 AM, radish-experiment sense of: I know exactly how I fail, and I'm building machines that don't fail in the same ways.

The AI agent doesn't get tired at 5 PM. It qualifies the 30,000th lead the same as the first. It doesn't skip the follow-up because it's Friday. It doesn't reach for the aggregate query because reading individual records is boring. It doesn't procrastinate on the hard conversation because the easy email is right there.

It doesn't have an ego to deplete.

That's the whole insight. Not that AI is smarter than humans. That AI doesn't run out of willpower. And in a business where the difference between a closed deal and a lost lead is often just "did someone follow up on time" — that's everything.

Marc Andreessen talks about Joe Pike, the character with the red arrows tattooed on his deltoids, always pointing forward. "We don't stop. We don't slow down. We don't revisit past decisions." Forward.

I love that. But I'd add one thing: build the systems that keep you moving forward even when the battery runs out. The arrows point forward. The hooks make sure you don't drift.

<p class="coming-soon">Recommended reading: David McRaney, <a href="https://youarenotsosmart.com/2012/04/17/ego-depletion/" style="color:#888;">Ego Depletion</a> and <a href="https://youarenotsosmart.com/2013/05/23/survivorship-bias/" style="color:#888;">Survivorship Bias</a> from You Are Not So Smart.</p>
