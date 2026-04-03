---
layout: essay.njk
title: "The Best $4,000 I Ever Spent"
order: 33
date: 2026-04-01
---

The Micro Center on Elston Avenue in Chicago does not feel like the site of a strategic inflection point. It feels like a Best Buy that gave up on aesthetics. Fluorescent lights, beige carpet, a teenager at the door who does not care about your business problems.

I walked in on a Tuesday in October 2024 and walked out with a Mac Studio M4 Pro. 96GB of unified memory. 1TB SSD. Apple Card. 0% APR. 24 monthly payments. Zero dollars down.

That machine replaced my engineering team.

I realize that sounds like startup founder delusion. "I bought a computer and fired everyone!" No. I fired them because one of them [fabricated screenshots](/essays/i-caught-every-single-thing/) and another caused a [$5,000 Twilio incident](/essays/the-twilio-incident/) and the team collectively shipped two features in three months (one broken, one incomplete). The Mac Studio is what came after. The foundation for the thing I built instead of rehiring.

The math, though. The math is ridiculous.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
The engineering team (last 3 months before termination):

  Developer 1:        $2,000/month
  Developer 2:        $1,500/month
  Twilio (normal):      $800/month
  Total:             ~$4,350/month

  Output: 75 commits. 2 features (one broken, one incomplete).
  Tests written: 0. Deploys verified: 0 out of 4.

The Mac Studio (first 3 months):

  Hardware:            $4,099 (one time, 0% APR × 24mo)
  Claude API costs:     ~$200/month average
  Electricity:          I honestly don't know. Less than coffee.
  Total:              ~$4,700 for the whole quarter

  Output: ~330 commits. 14 features. 14/14 deploys verified.
  Tests written: still 0 (working on it). Hooks compensate.

Break-even: about 5 weeks.
</pre>

Five weeks. After that it's been free money. I'm paying $170/month on the Apple Card installment plan for a machine that replaced $4,350/month in contractor costs. The API costs fluctuate — a heavy month with lots of Opus calls across eight sessions runs $300-400, a light month is $150 — but even the heavy months are a rounding error compared to what I was spending.

The 0% APR thing is genuinely funny to me. Apple designed the Apple Card financing to sell iPhones to college students. I used it to finance the replacement of an engineering department. Tim Cook didn't have that use case in mind, but here we are.

The machine runs 24 hours a day. Right now:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#88cc88;">$</span> uptime
 16:12  up 36 days,  5:42, 4 users, load averages: 2.14 1.89 1.94

<span style="color:#88cc88;">$</span> tmux list-sessions
agent-v4:     3 windows  — Apartment Locator
ygl-service:  2 windows  — Landlord Rep (Blue Lake)
ken-agent:    2 windows  — Insurance Agent
ci-pipeline:  1 window   — CI/CD, testing, deploys
data-pipe:    2 windows  — Inventory pipeline
financial:    1 window   — Revenue, P&L, payments
red-team:     1 window   — Adversarial testing
infra:        1 window   — GKE, monitoring, debugging

<span style="color:#666;"># 8 sessions. Each running Claude Code.</span>
<span style="color:#666;"># Each with its own CLAUDE.md context.</span>
<span style="color:#666;"># 36 days of uptime. The sessions have been running even longer —</span>
<span style="color:#666;"># they survive reboots because tmux doesn't care.</span>
</pre>

36 days since I last updated macOS. The tmux sessions persist through SSH disconnects, through me going to sleep, through me leaving the country. I wrote about the [eight sessions and what they do](/essays/one-tmux-eight-sessions/) already — the point here is the machine underneath them.

The 96GB matters because Claude Code is a memory hog when you run eight instances simultaneously. Each session loads the full codebase context — CLAUDE.md files, session memory, the entire project index. Eight sessions at 8-10GB each eats most of the RAM. The M4 Pro handles it without thermal throttling, which matters at 3 AM when you're six hours into an [overnight batch job](/essays/the-overnight-machine/) and the chip needs to not melt.

The architecture that makes one machine feel like an office:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
┌─────────────────────────────────────────────────────┐
│              Mac Studio M4 Pro 96GB                  │
│              (Elston Ave, Oct 2024)                  │
│              (always on, always running)             │
│                                                     │
│  tmux ── 8 sessions ── 8 Claude Code instances      │
│  git  ── all repos ── full history                  │
│  python, kubectl, gcloud ── the whole stack         │
│                                                     │
│  Mutagen ←→ bidirectional sync ←→ MacBook Air       │
│  SSH server (via Tailscale mesh)                    │
└───────────┬─────────────────┬───────────────────────┘
            │                 │
     ┌──────┴──────┐   ┌─────┴──────────────┐
     │  Tailscale  │   │  Tailscale          │
     │  mesh VPN   │   │  mesh VPN           │
     └──────┬──────┘   └─────┬──────────────┘
            │                 │
     ┌──────┴──────┐   ┌─────┴──────────────┐
     │ MacBook Air │   │ iPhone              │
     │ (couch,     │   │ (monitoring,        │
     │  coffee     │   │  panic checks       │
     │  shop,      │   │  anytime)           │
     │  airport    │   │                     │
     │  lounge)    │   └────────────────────┘
     └─────────────┘
</pre>

Tailscale is a mesh VPN — all my devices on one private network, no port forwarding, no public IP, no VPN server to babysit. The Mac Studio, my MacBook Air, and my phone all see each other. Encrypted tunnel, works everywhere. I SSH from my MacBook at a coffee shop in Lincoln Park and I'm on the same connection as when I'm on the couch.

Mutagen keeps the filesystems in sync. Bidirectional, sub-second. If I edit something on the MacBook, it's on the Studio in 300 milliseconds. If Claude Code edits something on the Studio, it's on the MacBook before I've finished reading the output.

The workflow:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;"># From the MacBook Air. From anywhere with internet.</span>

<span style="color:#88cc88;">$</span> ssh studio -t "tmux attach -t agent-v4"

<span style="color:#666;"># That's it. I'm looking at the Locator Agent session.</span>
<span style="color:#666;"># Same terminal, same state, same cursor position</span>
<span style="color:#666;"># as when I last detached.</span>
<span style="color:#666;">#</span>
<span style="color:#666;"># The session didn't close when I disconnected.</span>
<span style="color:#666;"># I can start debugging at 10 PM, disconnect,</span>
<span style="color:#666;"># reconnect from bed, and pick up mid-thought.</span>
</pre>

I tested this architecture about as hard as you can test it: I got stranded in India. Airspace closed. No flights out. I [deployed a production fix from a Vienna airport lounge](/essays/stranded-in-delhi/) — SSH into the Studio, tmux attach, fix the bug, push, verify. Twenty-two minutes. The hooks ran the same. The CLAUDE.md loaded the same. The verification checklist was the same. The machine was in Chicago doing the work. I was in Austria eating an overpriced airport sandwich.

People hear this story and ask "what happens if the Mac Studio dies?" I buy another one from Micro Center on Elston and restore from the git repos that are already on GitHub. An afternoon of inconvenience. Maybe I spring for the M4 Max this time. (I won't. The M4 Pro is fine. I'm not made of money — which is the entire thesis of this essay.)

The comparison that keeps running through my head:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
                       Eng. Team        Mac Studio + AI
────────────────────────────────────────────────────────
Monthly cost           $4,350/mo        ~$370/mo (avg)
Year one               $52,200          $4,099 + ~$2,800
Break-even             —                ~5 weeks
Commits/month          ~25              85-133 (growing)
Context switch         30+ min          2 seconds (tmux)
Availability           business hours   24/7/365
Knowledge retention    zero on exit     permanent (CLAUDE.md)
Fabricated output      yes (caught)     no (hooks verify)
Can deploy from        their laptops    anywhere on earth
  a Vienna airport?
</pre>

Year one all-in: about $7,000. The engineering team was $52,200 a year. And the engineering team's output included a million-message Twilio runaway, fabricated QA screenshots, and zero tests. The Mac Studio's output includes [531 commits](/essays/git-log/), 8 deterministic hooks, 7 CLAUDE.md governance files, and a system that runs while I sleep.

I'm still making Apple Card payments. $170 a month. Zero percent APR. For the machine that runs my entire engineering operation 24/7, surviving power outages via UPS, thermal-throttle-free through overnight batch jobs, accessible from any continent with WiFi.

There's a version of this essay where I talk about the theoretical implications of hardware replacing labor, what it means for the future of engineering teams, the macro trend of solo operators leveraging AI. I'll spare you. The essay is this:

Micro Center. Elston Avenue. Beige carpet. A teenager who did not care. $170 a month. Best money I ever spent.
