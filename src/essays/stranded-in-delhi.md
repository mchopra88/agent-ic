---
layout: essay.njk
title: "Stranded in Delhi, Deploying From Vienna"
status: "Draft"
order: 13
date: 2025-10-20
---

The Indian airspace closed while I was in Delhi. No flights out. Full stop.

I was running a 30,000-lead-per-day operation from a hotel room on the other side of the planet. The systems were still processing. The agents were still conversing. The overnight machine was still running. But I needed to deploy a fix — a matching logic update that was causing leads in Dallas to miss buildings that should have been in their result set.

I got rerouted through Vienna on Air India AI-127. Somewhere over Central Asia, connected to whatever Wi-Fi the Dreamliner was offering, I was reviewing logs from the overnight run. The matching fix needed to ship before the next morning's lead wave.

I deployed from the Vienna airport lounge during a layover. Pushed the code, watched Cloud Build compile, confirmed the pods rolled over in GKE, verified the fix in production. The whole thing took twenty minutes.

This is what I mean when I talk about the overnight machine. Not that I work from airports — that's just circumstance. But that the system is designed to be operated from anywhere, by one person, with a laptop and an internet connection. There's no office to go to. There's no team to coordinate. There's a tmux session and a deployment pipeline.

The question people always ask is: "Doesn't it stress you out, running everything solo?" The honest answer is yes, sometimes, at 2 AM when something breaks and there's no one to call. But the alternative — managing a team of humans across time zones, hoping they don't push a million text messages on a Friday, trusting that the deploy actually landed — that stressed me out more.

The machine is reliable. The machine doesn't sleep, but it also doesn't make mistakes at scale. If something breaks, I can see exactly what broke, exactly when, and exactly why. Try getting that from a team of five engineers.

<p class="coming-soon">Full essay coming soon.</p>
