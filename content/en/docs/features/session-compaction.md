---
title: Session Compaction
weight: 29
---

A model can only keep so much conversation in its head. Compaction is what you do with twenty pages of meeting notes: you write one page of conclusions and put the rest away. Pando replaces the old part of a long conversation with a summary, and there is room again to keep working.

## What it does for you

- **Long sessions that do not run out of room.** You can keep going in the same conversation instead of starting over.
- **Sharper answers.** A head full of old tool output gets distracted. After compacting, the model sees the decisions and not the noise.
- **Lower cost.** Every message carries the conversation along; a shorter conversation is cheaper to carry.

## How it feels in practice

You can compact on demand with a command, or let Pando do it by itself when the conversation is nearly full. Either way, the chat shows that a summary was made, and you continue as if nothing had happened.

The summary keeps what matters: decisions taken, files changed and where the work stands. What goes is the bulk: long tool output and intermediate steps.

## When to use it

- A long conversation is getting close to the model's limit.
- You finished one task and are starting another in the same session.
- Answers are getting vaguer and you suspect the conversation is cluttered.

## Good to know

- A summary keeps conclusions, not every detail. If an exact detail matters later, say it again or keep it in [memory]({{< relref "/docs/features/persistent-memory" >}}).
- The summary is written by its own agent, and a cheap model is enough for it.
- Automatic compaction can be switched on or off for everything, or agent by agent.

## Next steps

- Guide: [Change how Pando thinks and talks]({{< relref "/guides/working-modes" >}}) shows the command and the automatic switch.
- Reference: [Working modes and session housekeeping]({{< relref "/docs/configuration/modes" >}}).
