---
title: Superpowers Mode (Specs-Driven Development)
weight: 29
---

Superpowers mode turns Pando into the builder who will not lay a brick without a plan. First understand what you want, then show you a design and wait for your OK, then write the plan, then build with tests, then check that it really works. It follows the ideas of the [superpowers](https://github.com/obra/superpowers) workflow, built into Pando.

You switch it on for one session, when the change deserves the care.

## What it does for you

- **No surprises.** You approve the design before any code is written.
- **A written plan** for work that touches several files: steps ordered by risk, with a way to check each one.
- **Tests first**, in small steps.
- **Bugs are reproduced before they are fixed**, so you know the fix fixes that bug.
- **Checked with real results.** Pando runs the tests and shows the output; it does not just say "this should work".
- **A second look.** It reviews its own changes before showing them to you.

## How it feels in practice

You type `/superpowers Fix login bug`. Instead of jumping into the code, Pando comes back with what it understood and a proposal, and waits. Once you agree, it works through the plan one step at a time, showing test results as it goes. When you close with `/superpowers-finish`, it takes one more turn to tell you what was done, what was not, and what could come next.

## When to use it

| Situation | Superpowers? |
|----------|-----------------|
| A change across many files | Yes: it keeps the work in order |
| A new feature with tests | Yes: tests come first |
| Changes that must not break production | Yes: more checkpoints |
| A quick bug fix | No: too much ceremony |
| Trying ideas out | No: too rigid |

It combines with other modes: add `/caveman` for the same careful process with short answers.

## Good to know

- **It never touches your git history.** While it is on, Pando does not commit, merge or push, does not switch branches, does not throw away work and does not change your git settings.
- Your direct instructions and your project rules (AGENTS.md) always win over the mode.
- Permission prompts work as usual.
- Small or read-only requests skip the ceremony.
- It is always switched on by hand, session by session, and does not survive closing Pando.
- It only switches off when the closing step ends well.

## Next steps

- Guide: [Change how Pando thinks and talks]({{< relref "/guides/working-modes" >}}).
- Reference: [Working modes]({{< relref "/docs/configuration/modes" >}}).
- Related: [Learning mode]({{< relref "/docs/features/learning-mode" >}}) to keep a record of what was decided.
