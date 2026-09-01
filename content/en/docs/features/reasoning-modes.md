---
title: Thinking & Reasoning Effort
weight: 37
---

Modern models expose a "how hard should I think" dial: extended thinking on Claude, reasoning effort on GPT and Copilot models. Pando now resolves that dial **per model**, so you never send a value a model rejects.

## Why this matters

The values are not the same everywhere. Some models only accept `high`. Others accept only `low` and `high`. Some accept nothing at all. Sending the wrong one used to be an error from the provider in the middle of your work.

Pando now knows the accepted values for the model you have selected, and:

- offers you only the values that model actually supports,
- clamps anything out of range instead of failing,
- picks a sensible default (`medium` when available, otherwise the closest thing).

The full range across providers is `none`, `minimal`, `low`, `medium`, `high`, `xhigh` and `max` — but what you see depends on the model.

## Changing it

- **TUI and WebUI**: the model selector shows the effort options available for the selected model.
- **Zed / VS Code / JetBrains (ACP)**: the session settings menu lists the same options, rebuilt whenever you switch models.
- **Configuration**, per agent:

```toml
[Agents.coder]
Model           = 'anthropic.claude-sonnet-5'
ReasoningEffort = 'high'
ThinkingMode    = ''
```

Leave `ReasoningEffort` empty to let Pando choose the model's default.

## Practical guidance

| Effort | Good for |
|--------|----------|
| `none` / `minimal` | Mechanical edits, formatting, translations, bulk work where speed and cost matter |
| `low` | Everyday coding on a well-understood codebase |
| `medium` | The default. Most tasks. |
| `high` / `xhigh` / `max` | Architecture decisions, debugging something you do not understand, planning a multi-step change |

Higher effort costs more tokens and takes longer. Since Pando lets you switch models and effort mid-session, a common pattern is planning at high effort, then dropping to low for the mechanical part.

{{< callout >}}
Model capabilities are also enriched from [models.dev](https://models.dev), so pricing, context window and reasoning support show up in the model picker without any configuration.
{{< /callout >}}
