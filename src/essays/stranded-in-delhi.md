---
layout: essay.njk
title: "Stranded in Delhi, Deploying From Vienna"
order: 13
date: 2025-10-20
---

The Indian airspace closed while I was in Delhi. No flights out. Full stop.

I was running a 30,000-lead-per-day operation from a hotel room on the other side of the planet. The systems were still processing. The agents were still conversing. The overnight machine was still running. But I needed to deploy a fix — a matching logic update that was causing leads in Dallas to miss buildings that should have been in their result set.

The routing to get out went Delhi → Vienna → Chicago. Seventeen hours of travel. Somewhere over the Arabian Sea, the Dallas team reported the matching bug was costing us deals. I couldn't wait.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
# What a deploy looks like from a Vienna airport lounge

1. SSH into Mac Studio from hotel WiFi
   (Mutagen sync keeps local and remote in sync)

2. Open tmux session — agent-v4

3. The CLAUDE.md loads. The pre-session hook fires:
   "Branch: main"
   "Last commit: fix matching radius ..."
   "Uncommitted: 0 files"
   "Deploy detected: false"

4. Fix the WHERE clause. Test locally.
   The post-edit hook auto-lints.

5. git push. GKE picks it up.

6. The bash-guard hook confirms:
   no destructive commands in the deploy.

7. /verify-deploy — 7-step checklist.
   All green.

Total time: 22 minutes from Vienna to production.
</pre>

This is what the overnight machine buys you. Not just "the system runs while you sleep" — the system runs while you're stranded in another continent, debugging over airport WiFi, deploying from a lounge chair. The architecture doesn't care where I am. The hooks run the same. The CLAUDE.md loads the same. The verification checklist is the same.

The matching bug was a radius calculation that used miles instead of kilometers for the Dallas market. A 5-mile radius was actually filtering at 5 kilometers — about 3 miles. Every building between 3 and 5 miles from the renter was invisible. 37% of Dallas inventory, gone from the results.

I found it because the macro loop — the pattern-level feedback system — flagged it. Tour bookings in Dallas dropped 18% over two days. The retro loop showed individual conversations where renters were saying "you don't have anything near me." The meta loop asked: did something change in the matching system? Yes — a commit three days earlier that refactored the distance calculation.

The fix was one line. The deploy was 22 minutes. The architecture that made it possible was seven years.

Marc Andreessen says "forward." The arrows always point forward. But forward from Delhi goes through Vienna. And the machine keeps running the whole way.
