---
title: Fast User Feedback (Steering)
weight: 20
---

Steering is talking to the driver without stopping the car. While Pando is in the middle of a job you can send a new message, "only the login part, please", and it adjusts course at the next safe moment instead of making you cancel and start again.

## What it does for you

- **No lost work.** Whatever Pando has already finished stays finished. Your message changes what comes next.
- **No need to wait.** You do not have to sit until it finishes to say "not like that".
- **Cheaper than starting over.** Cancelling throws away the progress and the cost of getting there; steering keeps both.
- **Safe timing.** Pando does not drop what it is holding. It finishes the step in hand, then reads your message.
- **Patient.** If you reload the page, a message you queued is still delivered.

## How it feels in practice

1. Pando starts tidying up the whole project.
2. You realise that is far too much.
3. You type "Focus only on the login module" and send it.
4. Pando finishes the file it was on, reads your message and narrows down.

In the Web UI and desktop app you simply write in the chat while Pando works; the message is queued by itself. In the terminal interface you type it and press `Ctrl+S`, and a counter shows how many messages are waiting. In an editor's assistant panel, sending a message to a busy session does the same.

## When to use it

- Pando misunderstood and is heading the wrong way.
- You remembered a detail that matters.
- The job is turning out bigger than you wanted.

If what it is doing is harmful or plainly wrong, stop it instead. Steering is a nudge on the wheel; the stop button is the brake.

## Good to know

- Your message is delivered between steps, never in the middle of one, so there can be a short wait if the current step is slow.
- If the conversation has grown too long, Pando summarises the older part by itself to make room.
- Other programs can steer a session too, through the API.

## Next steps

- Guide: [Your first session]({{< relref "/guides/first-session" >}}) shows it in context.
- Reference: [the steering API call]({{< relref "/docs/configuration/webui" >}}).
- Related: [Interactive User Questions]({{< relref "/docs/features/ask-user-question" >}}), [Session Compaction]({{< relref "/docs/features/session-compaction" >}}).
