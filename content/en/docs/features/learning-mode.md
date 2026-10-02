---
title: Learning Mode
weight: 30
---

Learning mode turns Pando into a careful note-taker. Picture a new colleague with a notebook: before starting they read what was written the last time, they ask you the things only you can decide, and at the end of the day they write down what they found out. The next morning nobody starts from zero.

You switch it on for one session, when the work is worth remembering.

## What it does for you

- **Reads before it builds.** Before continuing earlier work, Pando looks up what it already knows about it, so it does not work out the same thing twice.
- **Asks instead of guessing.** Decisions that are really yours are put to you as a question.
- **Writes down what it discovers.** Anything that was not obvious goes into the knowledge base, and short lasting facts go into memory.
- **Keeps the notes honest.** When a plan or a fix is replaced, the old note is marked as outdated, so two notes never contradict each other.

## How it feels in practice

You type `/learning auth system changes` and carry on as usual. During the session Pando stops now and then to ask you a real question. When you close with `/learning-finish`, it takes one more turn to tidy what it learned into your notes. A week later, in a fresh session, you ask about the same area and Pando already knows the decisions you took.

## When to use it

| Situation | Learning mode? |
|----------|-------------------|
| Starting on a new area of the project | Yes: it leaves a trail for later sessions |
| A project that will last months | Yes: knowledge piles up |
| Research and exploration | Yes: findings are saved as you go |
| A one-off task you will never revisit | No: note-taking with no reader |
| A quick fix | No |

It mixes well with other modes. With [Caveman]({{< relref "/docs/features/caveman-mode" >}}) the answers are short and the notes are still complete. With [Superpowers]({{< relref "/docs/features/superpowers-mode" >}}) you get a careful process and a written record of it.

## Good to know

- It is always switched on by hand, session by session. There is no setting to make it permanent.
- It does not survive closing Pando. Switch it on again when you come back.
- It only switches off when the closing step ends well. If that step is interrupted, the mode stays on.
- It needs [Remembrances]({{< relref "/docs/features/persistent-memory" >}}) to have somewhere to write.

## Next steps

- Guide: [Change how Pando thinks and talks]({{< relref "/guides/working-modes" >}}) shows the commands step by step.
- Guide: [Teach Pando your project]({{< relref "/guides/remembrances" >}}) sets up the notebook it writes in.
- Reference: [Working modes]({{< relref "/docs/configuration/modes" >}}).
