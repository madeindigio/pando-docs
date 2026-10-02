---
title: Agent Self-Service (pando_setup)
weight: 31
---

Pando's agent has its own control panel. Like a new employee with access to the company handbook, it can look up how Pando is set up, which models are available and how much the session has cost, without stopping to ask you. The panel is a built-in tool called `pando_setup`.

You never call it yourself. The agent uses it when it needs to.

## What it does for you

- **Answers about your own setup.** Ask "which models can I use?" or "what has this session cost?" and Pando checks instead of guessing.
- **Better choices.** Before suggesting a model, the agent can see its price, how much it can keep in its head and what it is able to do.
- **Modes on request.** Say "be briefer" and the agent can switch on [Caveman]({{< relref "/docs/features/caveman-mode" >}}) for the session by itself.
- **Nothing to configure.** It is always there.

## How it feels in practice

In the middle of a conversation you ask "is my Copilot account set up?". The agent looks at the list of accounts and answers. You ask it to compare two models; it reads their details from the live list, which is enriched with the public [models.dev](https://models.dev) catalogue. You never see a settings screen.

What the agent can look up: the active settings, your provider accounts, the available models, the usage and cost of the session, and the list of commands. It can also switch on the working modes (Caveman, Ponytail, Superpowers, Learning) and run your custom commands.

## When to use it

There is nothing to switch on. Just remember you can ask Pando about itself in plain words.

## Good to know

- **Look, don't touch.** The agent can read the settings but cannot change them. There is no way for it to write to your configuration through this tool.
- **Secrets stay secret.** Keys and passwords are masked; the agent sees only that one exists and its last four characters.
- **Some commands are not for the agent.** Starting or cancelling a goal, compacting the session and closing a mode need you at the controls.
- It is designed to cost very few tokens: it carries a tiny description and fetches details only when needed.

## Next steps

- Reference: the full list of what the tool can do is in [Delegation and Mesnada configuration]({{< relref "/docs/configuration/delegation" >}}#agent-self-service-pando_setup).
- Guide: [Change how Pando thinks and talks]({{< relref "/guides/working-modes" >}}) for the modes it can switch on.
- Related: [Slash commands]({{< relref "/docs/features/slash-commands" >}}).
