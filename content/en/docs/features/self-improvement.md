---
title: Self-Improvement System
weight: 25
---

Pando can learn from how your sessions go. It scores each finished session, notices what worked, and proposes short rules for next time. You review those rules, and only the ones you approve are used.

It is **off by default**.

## How it works

1. **Every session gets a score.** When a session ends or goes idle, Pando scores it without calling any model. It looks at whether you had to correct the agent, how many tool errors and cancellations there were, and how many tokens it took.
2. **You can say it yourself.** `/feedback good` or `/feedback bad` in the chat overrides the automatic score.
3. **A judge looks at the clear cases.** For sessions that went clearly well or clearly badly, a model reads the conversation and may propose a rule, such as "verify the build before reporting done". The judge has a daily budget, so it does not run up your bill.
4. **You review the proposals.** Each proposed rule is a file you can read and edit. Nothing reaches your prompts until you approve it.
5. **Approved rules are used in new sessions.** Rules that do not help are retired automatically.

## Turn it on

{{< shot src="images/webui/pando-webui-settings-self-improvement.jpg" alt="Self-improvement settings" >}}

In **Settings > Self-Improvement** (Web UI and TUI), or in the config file:

```toml
[evaluator]
enabled = true
model = 'anthropic.claude-haiku-4'   # the judge; a cheap model is enough
```

## Reviewing learned rules

In the Web UI, the Self-Improvement view lists the pending proposals with **Approve** and **Reject** buttons. From the terminal:

```bash
pando skills list --status pending
pando skills approve verify-the-build-before-reporting-done
pando skills reject some-skill-id
```

The proposals are files under `.pando/skills/learned/`. Edit them before approving if you want to change the wording. An approval applies to sessions you start afterwards.

## Is it working?

```bash
pando evaluator doctor
```

The doctor says in plain words whether the loop is running and, if not, why: disabled, no judge model, no sessions scored yet, budget used up. The Web UI shows the same report in a banner at the top of the Self-Improvement view.

The view also shows the scores of your recent sessions, why each got its score, and how the average evolved over the last 14 days.

To score sessions by hand:

```bash
pando evaluate --all --limit 20
```

## Trying different prompt wordings

If you want to compare two ways of instructing the agent, put an alternative version of a prompt section in `.pando/prompts/variants/<section>/<name>.md.tpl`. Pando uses one variant per session, tracks the scores and gradually prefers the one that works better.

## Settings you may want

{{< shot src="images/webui/pando-webui-settings-self-improvement-evaluation.jpg" alt="When sessions are evaluated" >}}

{{< shot src="images/webui/pando-webui-settings-self-improvement-judge-limits.jpg" alt="Judge limits and prompt variants" >}}

{{< shot src="images/webui/pando-webui-settings-self-improvement-correction-patterns.jpg" alt="Correction patterns" >}}

```toml
[evaluator]
idleTimeout = '30m'        # score a session after this long without activity

[evaluator.judge]
dailyCalls  = 20           # judge calls per day; 0 = no limit
dailyTokens = 200000       # judge tokens per day; 0 = no limit
```

{{< callout >}}
Pando never rewrites its own prompts behind your back. Prompt variants are files you write, and learned rules are files you approve.
{{< /callout >}}
