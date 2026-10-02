---
title: Goal Mode (Autopilot)
weight: 10
---

Normally Pando does one thing and then waits for you, like a taxi that stops at every corner to ask "where now?". Goal Mode is giving the driver the final address. You describe where you want to end up, and Pando keeps going, step after step, until it arrives, gets stuck or you stop it.

## What it does for you

- **Long tasks without you watching.** Fixing a pile of failing tests, a refactor in many small steps, a migration.
- **It checks its own progress.** After every step Pando looks at what it achieved and decides the next one.
- **It knows when to stop.** It stops when the goal is reached, when it hits a wall it cannot climb alone, or when it notices it is going in circles.

## How it feels in practice

You type the goal in the chat. A card appears showing that the goal is running, which lap it is on, how long it has been working, what it has done so far and what it will try next. You can go for a coffee or close the laptop lid on another task: the goal keeps running. When you come back, the card tells you how it ended.

A goal can end in several ways: completed, blocked waiting for something only you can give, cancelled by you, out of time, or stalled after several laps without progress.

It works in every interface, and it can also run with no window at all, which is handy for jobs you leave overnight.

## When to use it

Use it when the finish line is clear and checkable: "all tests pass", "the build is green", "every file in this folder is converted". Do not use it for open questions or for work where you want to decide at each step.

## Good to know

- While a goal runs, Pando normally does not stop to ask permission for each action. Keep the [command sandbox]({{< relref "/docs/features/sandbox" >}}) on so it works inside a playpen.
- There are limits on how many laps and how much time a goal may take, so a goal cannot run for ever. You can change them.
- You can list commands that must never be run during a goal.
- Start with small goals and make them bigger as you gain trust.

## Next steps

- Guide: [Goal Mode: long tasks without babysitting]({{< relref "/guides/goal-mode" >}}).
- Reference: [Goal Mode configuration]({{< relref "/docs/configuration/goal" >}}).
- Related: [Agent delegation]({{< relref "/docs/features/agent-delegation" >}}) to split a big goal among helpers.
