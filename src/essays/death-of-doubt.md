---
layout: essay.njk
title: "The Death of Doubt"
status: "Draft"
order: 20
date: 2026-02-01
private: true
---

For most of the last few years, I believed I was unemployable.

Not in the dramatic way. In the quiet, 2 AM way — the way you believe something that you never say out loud because saying it would make it real. I'd left a career that made sense on paper: Citibank after undergrad, Groupon through the IPO, the Slack liquidity event, venture partner at Panache Ventures — a $200 million fund where I've known Patrick Lohr for 15 years — board seats, the whole resume arc that makes people nod at dinner parties. I'd traded it for a bunker in Chicago where I built AI systems for an industry nobody in tech takes seriously.

Apartment locating. Try explaining that at a dinner party in River North. "So you... help people find apartments?" Yes. With robots. At 3 AM. For buildings you've never heard of. In markets that VCs think are too boring to fund. Watch the eyes glaze.

The doubt wasn't about the business. The business worked. Revenue came in. The systems ran. The margins were extraordinary — 97% contribution margins in an industry that operates at 20%. The doubt was about me. About whether the skills I'd built in seven years of solitary construction had any value outside the specific machine I'd built them for. I didn't have a CS degree. I didn't have a GitHub profile that looked like a software engineer's. I had a finance background, an operations background, and a system that nobody in tech understood well enough to evaluate.

The resume arc tells one story. The reality tells another. At Citi, I learned that financial systems are just plumbing — complex plumbing, but plumbing. At Groupon, I watched a company scale from nothing to IPO and learned that the hardest problem isn't technology, it's operations at speed. At Panache, I sat in LP meetings and rooms with founders and learned to spot the gap between what they said and what the data showed. At Slack, I got the liquidity event that was supposed to mean something. It did mean something: it meant I could afford to build alone.

But building alone, for years, in an industry that doesn't register on anyone's radar — that does something to your sense of professional identity. You stop having peers. You stop getting feedback. You stop knowing whether you're brilliant or delusional, because both look the same from the inside.

## Anfield

My dad died just before the world turned upside down. The last match I was at before Covid shut everything down — before everything changed — was Liverpool against Manchester United at Anfield. Salah scored. One of those goals that makes 54,000 people lose their minds simultaneously. Straight from a Becker assist. The Kop was shaking. YNWA.

*Walk on, walk on, with hope in your heart.*

I didn't know that would be the last normal moment for a long time. I didn't know the world would close. I didn't know I'd lose my father. I didn't know I'd spend the next years building alone in a way that felt less like a business strategy and more like an act of survival — something you do because the alternative is worse, not because you chose it.

There's a particular quality to grief that compounds with isolation. You build systems at 2 AM because you can't sleep. You deploy code because it's the only thing that responds predictably. You debug because debugging has clear answers — the function works or it doesn't, the test passes or it fails — and the rest of life has no clear answers at all. The machine becomes a refuge. Not from the world, but from the parts of yourself that don't have clean outputs.

My father would have understood what I was building. He was an engineer — the real kind, the kind that builds physical things. He would have looked at the architecture diagrams and asked the right questions. He would have told me when I was overcomplicating something. He's not here to ask. So I built a system that asks for me. The CLAUDE.md teaching mode, the session memory, the pre-session hooks that force context review — these are all proxies for the conversations I can't have anymore.

## The Things I Avoided

David McRaney writes about ego depletion in *You Are Not So Smart* — the idea that willpower is a finite resource. You spend it on one thing and have less for the next. The classic experiment: people who resisted eating chocolate chip cookies gave up faster on an impossible puzzle. The act of resisting depleted their capacity for persistence.

I know ego depletion from the inside. Not from reading about it — from living it. For years, I poured every unit of willpower into building the machine. The machine got better. Everything else got worse. Health. Relationships. The basic maintenance of being a human being. I'm very avoidant. I'm very neglectful of things that need attention. The easy thing to avoid is the thing that doesn't have a deploy button and a green checkmark.

I went through a period where someone close to me drew a map on a whiteboard. Not a system architecture diagram. A personal one. At the center, in a circle, it said: "Don't be fat." Around it, all the avoidance patterns: don't go to the doctor, don't look at the scale, don't address the thing that's actually wrong. Focus on the machine instead. I ended up building myself a calorie tracking app — DBF, "Don't Be Fat" — because I needed the lowest-activation-energy possible system. A checkbox. A yes/no. The same design principle as the hooks: make the right behavior automatic. Karin helped me assemble a 75-page health package. The depleted version of me won't take care of himself. The system has to do it.

The honest truth about building autonomous systems is that the autonomy cuts both ways. The machine runs while you sleep — that's the pitch. But it also runs while you avoid. While you neglect. While you pour every ounce of energy into the thing with clean outputs and ignore everything with messy ones. The system compensates for your weaknesses. That's the design. But a system that compensates for your weaknesses can also enable them.

The hooks I built — the bash guards, the session memory, the pre-session context loads, the post-edit linting — all exist because of ego depletion. I don't trust myself at 2 AM to check a deployment. I don't trust myself after a 14-hour session to verify a database migration. I don't trust the depleted version of me to do the right thing. So I built infrastructure that doesn't depend on my willpower. The hook runs whether I'm sharp or exhausted. Whether I'm focused or avoiding. Whether I'm at my best or my worst.

That's not a feature. That's a confession.

## Vishwamitra and Arjuna

Vishwamitra bent reality with his will. In the stories, he was a king who wanted to become a sage, and every force in the universe conspired to stop him. He lost his kingdom, his family, his identity. He sat and meditated and the world burned around him and he didn't move. Not because he was strong. Because stopping was worse than continuing. That's what it felt like — not talent, not strategy, just the stubborn refusal to stop building.

The Bhagavad Gita puts Arjuna on a battlefield, paralyzed by doubt. He's the greatest warrior alive and he can't move. He sees his teachers, his cousins, his grandfather on the other side and he drops his bow. Krishna doesn't tell him the outcome will be good. He doesn't promise victory. He says: action without attachment to outcome is the only path. You do the work. You build the system. You deploy at 2 AM. You don't get to know if it matters. You don't get to know if anyone will see it. You just keep going.

*Karmanye vadhikaraste, Ma phaleshu kadachana.*
You have the right to work, but never to the fruit of work.

That line sat on a Post-it on my monitor for months. Not as inspiration. As instruction. Stop checking if it matters. Stop wondering if the skills translate. Stop looking for validation. Build the thing. Deploy the thing. Fix what breaks. Don't look up.

Kipling wrote the same thing, in English, in a different century:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.95rem; line-height:1.9; color:#888; overflow-x:auto; margin:2rem 0; font-style:italic;">
If you can force your heart and nerve and sinew
    To serve your turn long after they are gone,
And so hold on when there is nothing in you
    Except the Will which says to them: "Hold on!"
</pre>

That was it. For years. Hold on. Build. Ship. Fix what breaks. Don't look up. Don't check if anyone's watching. The machine runs whether I believe in it or not. The leads flow whether I have faith or not. The hooks fire whether I'm confident or paralyzed. The system is indifferent to my emotional state. That's the point.

## The Accumulation

About three months ago, something broke through. I was showing someone the architecture — the tmux sessions, the CLAUDE.md files, the hook systems, the adversarial testing pipelines, the session memory architecture — and I watched their face change. Not impressed in the polite way. Not the "oh, that's interesting" nod. Impressed in the "wait, one person built this?" way. The recalibration. The pause where someone re-evaluates what they thought they knew about you.

Then it happened again. And again. With technical people who build software for a living. With investors who evaluate companies for a living. With operators trying to figure out how to deploy AI into their own organizations. The same pause. The same recalibration.

I showed Eric and Eddie the full view — the Claude Code evolution, the commit history, the CLAUDE.md architecture, the eight tmux sessions, the autonomous overnight runs, the adversarial testing pipeline, how I push more code solo than engineering teams of five or ten. The response wasn't polite interest. It was visceral. "Wait — this is one person?"

One person. Zero engineers. 531 commits in 15 months. Eight business-critical services in production. 30,000 conversations a month. 97% contribution margins. An insurance vertical bolted onto the same infrastructure in weeks. A quoting engine for a PE-backed distributor built in the same architecture. The system teaches me as it builds. The hooks prevent the disasters. The session memory carries context across conversations. The CLAUDE.md files encode every lesson from every 2 AM incident.

And the person who built all of this didn't have a computer science degree. Didn't come from engineering. Came from Citibank and Groupon and venture capital and operations and the specific, peculiar conviction that if you decompose any business function into atomic components, you can replace each component with code.

The death of doubt wasn't a single moment. It was the accumulation of evidence that the skills I'd built — orchestrating AI agents at production scale, building autonomous overnight operations, collapsing entire business functions into code, writing governance systems that make AI reliable enough to trust with real money — aren't niche skills for an obscure industry. They're the exact skills that every company in the world is trying to figure out right now. I just happened to figure them out early, alone, in a bunker, for an industry nobody was watching.

Marc Andreessen has this thing about Joe Pike — the character from Robert Crais novels with the red arrows tattooed on his deltoids, always pointing forward. "We don't stop. We don't slow down. We don't revisit past decisions." The question Andreessen says he'll never answer is "what would you have done differently?" — because you didn't know what you didn't know, and looking backward is a waste of the only resource that matters, which is time.

I love that. But there's a nuance Andreessen doesn't address: you can point forward and still carry the scars. The arrows point forward. The hooks remember backward. The CLAUDE.md is a war diary. The session memory files are 119 records of things that went wrong and what we built to prevent them from going wrong again. Forward isn't the same as forgetful. Forward means you encode the lesson and keep moving. The lesson lives in the code. You don't have to carry it in your head.

## The Question

"Do you want to be worth $600,000 a year to someone else, or do you want to own the machine?"

That's not rhetorical. For a long time, the honest answer was: I don't know. The $600K is safe. The $600K has a title and a Slack channel and people who tell you you're smart. The machine is alone. The machine is 2 AM deploys and database fires and nobody to call when it breaks. The machine is explaining "apartment locating" at dinner parties and watching the eyes glaze. The machine is building in a bunker while the industry you're in doesn't even know you exist.

I know the answer now. I didn't for a long time.

The machine generates more than $600K. The machine scales without headcount. The machine runs while I sleep. The machine doesn't need my willpower to function — it has hooks. It doesn't need my attention to persist — it has session memory. It doesn't need me to be at my best — it's designed for my worst.

The $600K buys you a seat at someone else's table. The machine is the table.

## For Ved and Reya

Everything I build is for them. Not in the sentimental way — in the structural way. The Gayatri Mantra runs continuously. You set it in motion and it generates benefit without active attention. The overnight machine does the same thing — inventory refreshes, lead scoring, stale data detection, automated outreach. You wake up to a dashboard, not a backlog.

A machine that runs while their father sleeps. Not a job to inherit. A system. Something that keeps working after you stop. Something that doesn't depend on willpower, or attention, or the fragile human capacity to do the right thing when you're tired.

The death of doubt was never about proving something to the world. It was about proving something to myself: that the years in the bunker weren't wasted. That building alone isn't the same as building wrong. That the skills I accumulated — by necessity, by stubbornness, by the refusal to stop when everything said stop — are exactly the skills the world needs now.

Walk on, walk on, with hope in your heart.

And you'll never walk alone.
