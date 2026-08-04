---
title: Learning Mode
weight: 30
---

Learning mode is an opt-in per-session knowledge-capture policy. When enabled, Pando actively searches for prior context before building on work, asks the user for genuine decisions instead of guessing, and documents discoveries to the knowledge base.

This mode helps ensure continuity across sessions by capturing what the AI learns during a conversation and keeping documentation up to date.

## How to Use

### Enable

Type `/learning [focus]` in the chat input:

```bash
/learning                          # enable with no specific focus
/learning auth system changes      # enable with a stated focus area
```

This is a synchronous command — it activates immediately without an AI turn.

### Disable

Type `/learning-finish` in the chat input:

```bash
/learning-finish
```

This triggers a real AI turn that:
1. Consolidates what was learned into the KB/memory
2. Returns to normal mode

The mode only disables on a successful response. If the turn is cancelled or fails, learning stays active.

## What It Does

When learning mode is active, Pando follows these principles on every turn:

### 1. Recover Context First

Before building on prior work, Pando searches the KB (`kb_search_documents`, `hybrid_search_remembrances`) and reads relevant memories (`recall`). This avoids re-deriving information that was already discovered in previous sessions.

### 2. Ask What Matters

For decisions that genuinely belong to the user, Pando uses `AskUserQuestion` instead of guessing. This ensures important choices are made by you, not assumed by the AI.

### 3. Capture Discoveries

Non-obvious findings are documented via `kb_add_document`. Short durable facts are stored via `remember`. This means insights from the current session are available in future sessions.

### 4. Keep Docs Honest

Superseded plans, features, or fixes are marked outdated with `kb_mark_outdated`, and up-to-date documentation is added. This prevents contradictory documents from accumulating in the knowledge base.

## Composition with Other Modes

Learning mode composes with other modes:

- **With Caveman**: Documentation depth is independent from output brevity. You can have thorough documentation while keeping responses short.
- **With Superpowers**: Both policies apply — superpowers controls the development workflow, learning controls knowledge capture.

## Configuration

Learning mode has no configurable default by design — it is always opt-in per session. There is no TOML setting to enable it globally.

{{< callout type="info" >}}
Learning mode is ephemeral in v1 — it does not survive a restart. If you close and reopen Pando, you need to re-enable it with `/learning`.
{{< /callout >}}

## When to Use

| Scenario | Use Learning Mode? |
|----------|-------------------|
| Starting a new project area | Yes — captures context for future sessions |
| One-off task, no future work | No — overhead with no benefit |
| Long-running project | Yes — builds institutional knowledge |
| Quick fix with no documentation need | No |
| Research and exploration | Yes — captures findings automatically |

## Related Tools

Learning mode activates several knowledge-management tools:

| Tool | Purpose |
|------|---------|
| `kb_search_documents` | Search existing KB docs semantically |
| `kb_add_document` | Store new documentation or updates |
| `kb_mark_outdated` | Mark superseded docs as outdated |
| `remember` | Store short durable facts |
| `recall` | Retrieve stored facts |
| `hybrid_search_remembrances` | Search across KB, sessions, and code |

{{< callout >}}
Learning mode helps Pando become a better assistant over time by capturing knowledge that would otherwise be lost between sessions. The more you use it, the more context accumulates for future work.
{{< /callout >}}
