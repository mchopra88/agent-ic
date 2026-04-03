---
layout: essay.njk
title: "Why I'm Always Talking to My Computer"
order: 35
date: 2026-04-02
---

People in coffee shops stare at me. This is not because I'm handsome. It's because I'm sitting alone at a table talking into my laptop with the intensity of someone arguing with Comcast billing, except there's no one on the other end. Just a text cursor blinking in a terminal window.

I'm dictating. Into a tool called Wispr Flow. Into Claude Code. I'm talking to my computer and my computer is writing code.

Let me explain.

## The Numbers

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Wispr Flow — personal usage dashboard:

  Daily streak:          38 days
  Average speed:         203 words per minute
  Percentile:            Top 1% of all Flow users
  Total words dictated:  324,006
  Total apps used:       37
</pre>

324,006 words. In about three months. That's three complete books, if I were writing books, which I'm not — I'm mostly yelling at AI about lead matching algorithms and insurance checkout flows. But the volume is real.

203 words per minute. A fast typist does 80. An average one does 40-50. I'm running at roughly 3x the speed of a fast typist and 4-5x the speed of a normal one. That's not a marginal improvement. That's a different category of input speed.

And I know where those words go: almost all of it into Claude Code. The vast majority of everything I dictate goes straight into the terminal — prompts, instructions, context dumps. The rest is scattered across messages and occasional long-form writing. (These essays, for instance. The ones you're reading right now. Dictated, not typed.)

## What Wispr Flow Actually Is

Wispr Flow is a macOS app that sits in the background and turns speech into text. You hold down a key — I use the Fn key — talk, and release. Your words appear wherever your cursor is. Any app. Any text field. Claude Code, iMessage, Gmail, a Google Doc, whatever.

The key difference from Siri dictation or whatever Apple ships: Wispr Flow uses AI to format the output. It adds punctuation. It capitalizes correctly. It handles paragraph breaks. When I say "open paren not because I'm handsome close paren" it produces `(not because I'm handsome)`. When I say "new line new line" it doesn't type the words "new line." It actually inserts line breaks. This sounds trivial. It is absolutely not trivial. Bad formatting in dictation makes the whole thing useless because you spend all the time you saved on editing.

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.75rem; line-height:1.5; color:#b0aca6; overflow-x:auto; margin:2rem 0; font-family:monospace;">
<span style="color:#666;"># My Wispr Flow configuration (from config.json)</span>

<span style="color:#888;">Push-to-talk key:</span>        Fn (hold to dictate)
<span style="color:#888;">AI formatting:</span>           enabled
<span style="color:#888;">Smart formatting:</span>        enabled
<span style="color:#888;">Auto cleanup:</span>            light
<span style="color:#888;">Style detection:</span>         enabled
<span style="color:#888;">Personalization:</span>
  <span style="color:#888;">Work messages:</span>         casual
  <span style="color:#888;">Email:</span>                 formal
  <span style="color:#888;">Personal:</span>              casual
<span style="color:#888;">Polish instructions:</span>
  ✓ Make more concise
  ✓ Maintain your tone
  ✓ Reword for clarity
  ✓ Reorder for readability
  ✓ Add structure for readability
<span style="color:#888;">Auto-learn words:</span>       true
<span style="color:#888;">Open at login:</span>          true
</pre>

"Make more concise. Maintain your tone." I set those on day one and haven't changed them. The tool adapts to context — formal for email, casual for everything else. It knows when I'm in Gmail versus when I'm in Claude Code and adjusts accordingly.

## What a Session Looks Like

Here's how it actually works. I'm sitting at my desk. Eight [tmux sessions](/essays/one-tmux-eight-sessions/) running on the [Mac Studio](/essays/the-hardware-thesis/). I'm in the insurance agent session. Something is wrong with the checkout flow.

I hold Fn and say:

"Ken checkout is dropping leads after the quote step. The last five leads all went silent after receiving a quote. Can you check the send_quote_response function and look at recent textmessages for client 47203 to see what happened."

That's one continuous thought, spoken in maybe eight seconds. Wispr Flow formats it, adds the punctuation, capitalizes the function name, and pastes it into the Claude Code prompt. Claude Code reads the file, queries the database, finds the bug.

In the typing version of this, I'd have been typing for forty seconds. Switching between looking at the screen and looking at the keyboard. Backspacing typos. Formatting the function name. By the time I finished typing the prompt, I'd have lost the thread of what I was thinking. The thought would have decayed in transit.

At 203 WPM, the thought leaves my brain and arrives in the terminal in roughly the same shape it started. That's the whole thesis. Speech is the highest-bandwidth human output channel. We evolved to talk. We did not evolve to type. (We definitely did not evolve to type on those flat butterfly keyboards Apple sold for five years. Crimes against humanity.)

## The Peak Days

<pre style="background:#0a0a0a; border:1px solid #222; padding:1.5rem; font-size:0.8rem; line-height:1.6; color:#888; overflow-x:auto; margin:2rem 0;">
Daily usage from the local Wispr Flow database:

  Feb 11:  319 dictations   22,793 words   104 min of speech
  Feb 12:  245 dictations   16,810 words    81 min
  Feb 13:  107 dictations   10,889 words    54 min
  Feb 14:  112 dictations    9,498 words    47 min
  Feb 15:   78 dictations    5,556 words    26 min
  Feb 10:  100 dictations    8,939 words    45 min
  Feb 09:  107 dictations   11,844 words    57 min
</pre>

February 11th. 319 dictations. 22,793 words. One day. At typing speed — say 70 WPM for a fast typist — that's 5.4 hours of continuous typing. At dictation speed, it was 104 minutes. I saved over three hours of pure input time. On one day.

(What happened on February 11th that required 22,000 words of dictation? Looking at the [session memory](/essays/deployment-manifests/): I ran ten different work sessions that day — employee filter, triple messaging fix, universal compliance layer, pattern fixes, Ken agent core, SLM wiring, brain architecture, edge case wiring, jamboree cleanup, consolidation. Ten sessions. All dictated. That was a Tuesday.)

## How I Found It

I don't remember exactly. I think someone on Twitter — probably some founder I follow — posted about it in late 2025. I signed up, did the onboarding, and within a day I was dictating every prompt to Claude Code instead of typing them. The activation energy was basically zero. Install, grant mic permission, hold Fn, talk. That's it.

The thing that made it stick: the AI formatting. Every other dictation tool I'd tried — Apple's built-in, Google's, random apps from the App Store — produced garbage. No punctuation. Random capitalization. "New paragraph" typed literally. I'd spend so long editing the output that I was slower than typing. Wispr Flow's formatting is good enough that I rarely edit. Maybe 5% of dictations need a tweak. The other 95% go in clean.

I'm still on the trial, technically. $170/month for the Mac Studio, whatever Wispr Flow charges me when the trial ends, and $200-400/month in Claude API costs. My entire engineering stack — hardware, AI, and input method — costs less than one week of one contractor.

## The Crazy Person Problem

The people in coffee shops have adjusted. The regulars at the place on Lincoln Avenue stopped staring after week two. My wife stopped asking who I'm talking to after week one. Ved sometimes talks to me when I'm mid-dictation, which creates interesting prompts. ("Fix the matching algorithm papa what's for dinner" is not a valid Claude Code instruction, but I've submitted worse.)

The home office is where most of the dictation happens. Eight tmux sessions on the Mac Studio, Wispr Flow running in the background, me pacing around the room talking about database schemas and Twilio webhook timeouts. My wife Yamini thinks I'm a loon. My son Ved — he's four — walks in and asks "why is papa talking to his laptop?" which is a reasonable question that I don't have a four-year-old-friendly answer to. ("Papa is dictating natural language prompts to an autonomous code generation agent" does not land with the preschool crowd.)

I'm producing [531 commits](/essays/git-log/) and [processing 30,000 conversations a month](/essays/30000-conversations/). The output speaks for itself even if what I'm saying sounds unhinged.

324,006 words. 38 days straight. Three books of dictation, almost all of it directed at an AI that writes code. The keyboard is the bottleneck. I removed the bottleneck. Now the bottleneck is my own thinking speed, which — given the [ego depletion problem](/essays/ego-depletion/) — degrades by about 4 PM anyway. But until 4 PM, I'm operating at 203 words per minute, top 1%, talking to my computer like a crazy person in a coffee shop on Lincoln Avenue.

Worth it.
