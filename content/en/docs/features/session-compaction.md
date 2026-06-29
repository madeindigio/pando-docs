---
title: Session Compaction
weight: 29
---

Session compaction compresses conversation history into a summary, freeing context space for long conversations.

## Manual Compaction

Use slash commands to compact on demand:

```
/compact
/summarize
```

## Auto-Compaction

Pando automatically compacts when the context window fills up during an agent run:

```toml
AutoCompact = true
```

Per-agent configuration:

```toml
[Agents.coder]
AutoCompact = false
AutoCompactThreshold = 0.0

[Agents.summarizer]
Model = 'ollama.qwopus:latest'
```

## How It Works

1. The `Summarize` method compresses conversation history
2. Messages before the summary are replaced by it
3. The summary is stored as a special message boundary
4. Context space is freed for new messages

## Configuration

| Setting | Description |
|---------|-------------|
| `AutoCompact` | Global auto-compact toggle |
| `AutoCompactThreshold` | Context usage threshold to trigger (0.0 = automatic) |
| `[Agents.summarizer].Model` | Model used for summarization |

## When to Use

- Long conversations approaching context limits
- After completing a major task and starting a new one
- When response quality degrades due to context noise

{{< callout >}}
Compaction preserves the most important information while removing verbose tool outputs and intermediate steps. The summary captures key decisions, file changes, and progress.
{{< /callout >}}
