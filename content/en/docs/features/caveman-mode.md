---
title: Caveman Mode (Output Brevity)
weight: 28
---

Caveman mode reduces Pando's output tokens by constraining expression — it cuts filler, restatements, and unnecessary prose while preserving code, commands, paths, errors, and verification output. This is a **token-saving feature** that helps reduce costs and keep responses focused.

Caveman mode does not reduce reasoning, tool use, testing, or verification — only how the AI expresses itself.

## How to Use

### Slash Commands

Type these in the chat input:

| Command | What it does |
|---------|--------------|
| `/caveman lite` | Enable light brevity — removes filler and preambles |
| `/caveman full` | Enable standard brevity — concise answers, no unnecessary explanation |
| `/caveman ultra` | Maximum brevity — fragments and bullets only, no paragraphs |
| `/caveman off` or `/caveman-finish` | Disable caveman mode |

### Settings

Set a default mode that applies to all new sessions:

**Web UI:** Settings > Token Optimization > Caveman Mode

**TUI:** Settings > Tools > Caveman

**Configuration file:**

```toml
[Caveman]
# "" (empty) = off, "lite", "full", or "ultra"
DefaultMode = "lite"
```

## Behavior Levels

| Level | Style | When to use |
|-------|-------|-------------|
| **Lite** | Normal sentences, filler removed. Answer first, then a short paragraph of context. | Everyday coding — saves tokens without changing communication style significantly |
| **Full** | Fragments and bullets. One idea per line. Cut greetings, sign-offs, self-narration. | High-volume sessions where every token counts |
| **Ultra** | Maximum compression. Only the essential facts survive. | Budget-constrained sessions or very long conversations |

## What Gets Cut

- Greetings, sign-offs, self-narration ("I'll now...", "Let me...")
- Restating the request back to the user before answering
- Preamble before answers and summaries that repeat what was just said
- Generic transitions, hedging, apologies, praise, filler adjectives
- Explanation nobody asked for

## What Is Preserved (Never Compressed)

- Code and code blocks
- Command lines and file paths
- Error text and stack traces
- Test output and verification results
- API signatures and URLs
- Security warnings
- Anything the user explicitly asked for detail about

{{< callout type="info" >}}
A direct request for detail (e.g., "explain", "walk me through") overrides caveman mode for that reply. The AI will give the full explanation when you ask for it.
{{< /callout >}}

## Per-Session Override

You can change caveman mode during a session without affecting the default:

```bash
/caveman lite     # switch to lite for this session
/caveman-finish   # turn off for this session
```

The session-level setting overrides the global default. When you start a new session, it reverts to the configured default.

## Configuration Reference

| Setting | Location | Values | Default |
|---------|----------|--------|---------|
| `Caveman.DefaultMode` | `.pando.toml` | `""`, `"lite"`, `"full"`, `"ultra"` | `""` (off) |

{{< callout >}}
Caveman mode is off by default. Existing installations see no behavior change until you explicitly enable it via slash command or configuration.
{{< /callout >}}
