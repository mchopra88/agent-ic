---
layout: essay.njk
title: "Why I Work in the Terminal"
order: 32
date: 2026-04-01
---

A friend keeps asking me why I don't just use the chat interface.

We get dinner every few weeks and he always brings it up. "Claude.ai works fine. Cursor is great. Why are you in the terminal like it's 1997?" He says this while I'm eating pasta, which weakens his rhetorical position, because nobody has ever changed their mind about anything while eating pasta.

Fair question though. I used the chat for months — Claude.ai, then ChatGPT, then Cursor's sidebar thing. They're good products. He builds real shit with them. I won't pretend they don't work.

What I will tell you is there's a tax.

Copy your code, paste it into the chat, type "this function doesn't match Dallas leads correctly, here's the error output," wait for the response, mentally diff the suggestion against what you've got, copy the relevant fix back into your editor, realize you forgot to include the database schema, go back to the chat, paste the schema, re-explain the problem with new context. Each cycle: maybe forty seconds. Fifty cycles a day. Over thirty minutes of clipboard management. Every day. For months.

(I can already hear him: "thirty minutes, that's nothing." Sure. But every paste loses context. The code you paste is a snapshot from when you copied it. By cycle thirty the file has changed five times and the AI is reasoning about a version that no longer exists. That part isn't measured in minutes. That part is measured in bugs you can't explain.)

Claude Code runs inside the codebase. Same directory, same file system, same git repo. When I type "Dallas matching is returning zero results" it doesn't wait for my clipboard. It reads the file. Reads the git log. Reads the test output. Queries the production database. Then tells me the ILS feed flipped their coordinate format three days ago. Ninety seconds from Slack notification to root cause. I wrote about that specific bug in [Stranded in Delhi](/essays/stranded-in-delhi/).

Here's what the terminal gives the AI access to — right now, in my current session:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;"># What Claude Code can reach from my terminal</span>

<span style="color:#88cc88;">File system:</span>
  Read, write, create, delete any file in ~/homeeasy-hq/
  Glob: find files by pattern across the entire repo
  Grep: search contents by regex
  Git: full access to 531+ commits of history, every branch, every diff

<span style="color:#88cc88;">Database (via MCP Postgres — direct SQL, no separate app):</span>
  READONLY_DATABASE_URL       → production read replica
  READONLY_OLD_DATABASE_URL   → legacy database, records back to 2021
  "Query the leads table" and it just... does.

<span style="color:#88cc88;">Shell:</span>
  kubectl, gcloud, gh, git, python, npm, everything.
  Deploy to GKE from the same window I debug in.
  Run tests. Check pod status. Tail logs.

<span style="color:#88cc88;">APIs:</span>
  ANTHROPIC_API_KEY  → Claude (Opus for everything — deals are worth thousands)
  GOOGLE_API_KEY     → Gemini (bulk mechanical work only)
</pre>

Five databases, two LLM APIs, the full file system, direct SQL to production Postgres — all accessible from the same place I type commands. His chat can see whatever fits in his paste buffer.

I described the difference to a friend as: the chat interface is like texting your plumber about a leak. "Water on the kitchen floor. Here's a photo." They suggest turning a valve. You try it. Text back: "still water." Another photo. More suggestions. Back and forth, each message incomplete.

The terminal is the plumber standing in your kitchen with his tools. Looking at the pipe. Turning the valve. Checking the water heater. Running outside to look at the shutoff. No photos needed. He just fixes it.

My CLAUDE.md has this section that I've never shown in any other essay:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;">## Teaching Mode (ALWAYS ON)</span>
Mukund is a 15-year founder running an AI agent team
with no human engineers.
Explain EVERYTHING: what you're doing, why, define terms,
show architecture, discuss trade-offs.
Don't dumb it down. He's smart and learns fast.
Just don't assume DevOps/SRE knowledge.
If he corrects you — learn from it, update CLAUDE.md/MEMORY.md,
never repeat.
</pre>

I wrote that in June 2025 after a session where the AI was explaining Kubernetes StatefulSets and I was nodding along like I understood. (I did not understand.) The instruction fixed it. Now every interaction teaches me something. I went from not knowing what a PostgreSQL vacuum run is to [catching an engineer fabricating screenshots using vacuum run forensics](/essays/i-caught-every-single-thing/). That learning happened in the terminal, where the explanation and the code exist in the same place. In a chat, the AI explains something and you go act on it somewhere else. In the terminal, the AI explains and then does it, right there, while you watch and learn.

Here's what a real debugging session looks like. This is the Dallas ILS coordinate bug I mentioned — the Locator Agent's matching suddenly returning zero results:

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#e8e4de;">Me:</span> "Dallas matching is returning zero results for leads from the last two days."

<span style="color:#88cc88;">Claude Code reads:</span> agent-v4/src/services/matching.py
  → Found match_buildings_by_radius() on line 412

<span style="color:#88cc88;">Claude Code queries (MCP Postgres):</span>
  SELECT id, lat, lng, city FROM buildings
  WHERE city = 'Dallas' AND updated_at > now() - interval '3 days'
  ORDER BY updated_at DESC LIMIT 10

  → lat/lng values look inverted. 32.78 in the lng column.

<span style="color:#88cc88;">Claude Code reads:</span> git log --oneline -5 -- src/services/inventory_poller.py
  → "sync: update ILS feed parser for new format" committed 3 days ago

<span style="color:#88cc88;">Claude Code reads:</span> inventory_poller.py lines 180-210
  → The ILS feed switched from (lat, lng) to (lng, lat).
  → Parser was updated but the field mapping wasn't flipped.
  → Every building imported in the last 3 days has swapped coordinates.
  → Radius search matches nothing because Dallas is now in the ocean.

<span style="color:#cc8888;">Claude Code edits:</span> inventory_poller.py line 195
  <span style="color:#cc8888;">- lat=row['coordinates'][0], lng=row['coordinates'][1]</span>
  <span style="color:#88cc88;">+ lat=row['coordinates'][1], lng=row['coordinates'][0]</span>

<span style="color:#88cc88;">Claude Code runs:</span> python -m pytest tests/test_inventory.py
  8 passed, 0 failed.

<span style="color:#e8e4de;">Time from "matching is broken" to working fix: 90 seconds.
Zero copy-paste. Zero context lost.</span>
</pre>

Six tool calls. Ninety seconds. In the chat version, each of those steps would have been a separate copy-paste cycle. By step four the AI would have lost the context from step one, and I'd be re-pasting the query output for the third time while muttering profanity. (Which, OK, I do in the terminal too. But for different reasons.)

I'll be honest about the limitations. The context window fills up on long sessions and the AI starts forgetting things you told it three hours ago. The [hooks I built](/essays/scar-tissue/) — eight of them, 400 lines of bash — exist because of this exact problem. The MCP database connection drops and needs resetting. Two Claude Code instances occasionally fight over the same git index file and both hang until you manually clear the lock.

The chat has those same problems plus the copy-paste tax. And in the chat, the context problem is worse — you're burning tokens on pasted code that might already be stale. In the terminal, it reads the file fresh. Every time. The file is the context, and it's always current.

His setup works for him. He builds smaller things, ships fast, his projects fit in a conversation window. The chat is great for that.

My project has four business units, eight tmux sessions, 30,000 conversations a month, and [seven CLAUDE.md files](/essays/my-claude-md/) totaling 1,334 lines of institutional knowledge. It doesn't fit in a conversation. It fits in a terminal.
