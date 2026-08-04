---
title: Token Optimization
weight: 12
---

Token Optimization helps you reduce the number of tokens Pando uses during conversations. Lower token usage means faster responses and lower costs with your AI provider. These settings are safe to use — compressed reads never cost more than full reads, and the defaults preserve standard behavior.

You can configure these options in the **Settings > Token Optimization** section of the Web UI, or directly in your `.pando.toml` configuration file.

## File Read Optimization

When Pando reads files, it sends the content to the AI model as tokens. These settings control how much detail is included.

### Default Read Mode

Controls how much of a file Pando shows to the AI when reading it.

| Value | What it does | When to use |
|-------|--------------|-------------|
| **Full** (default) | Shows the raw file content exactly as stored | Best for small files or when you need the AI to see everything |
| **Auto** | Automatically picks the best mode based on file size and type | Good general-purpose option that balances detail and efficiency |
| **Signatures** | Shows only function/class names and their signatures | Great for large files where you only need the structure |
| **Map** | Shows imports and top-level declarations only | Useful for understanding file organization quickly |

**Recommendation**: Start with **Full** (the default). Switch to **Auto** if you work with large files and want to save tokens automatically.

### Deduplicate Unchanged Re-reads

| Setting | Default | What it does |
|---------|---------|--------------|
| **Enabled** | Yes | When Pando reads the same file section again without changes, it sends a short reference instead of the full content |

**Recommendation**: Keep this **enabled**. It saves tokens with no downside — if the file hasn't changed, the AI gets the same information in fewer tokens.

### Adaptive Auto-Mode Learning

When you set the Read Mode to **Auto**, Pando uses a bounce tracker to learn from experience — it watches for cases where compressed reads don't give the AI enough detail, and automatically escalates to fuller reads for files or file types that need them.

A "bounce" happens when Pando reads a file in compressed mode (signatures or map) and then immediately re-reads it in full mode — the AI needed more detail than the compressed view provided. The bounce tracker counts these events per file path and per file extension. If a file or extension bounces frequently, the next Auto read automatically escalates toward full mode.

| Setting | Default | What it does |
|---------|---------|--------------|
| **Disabled** | Yes | The bounce tracker still works (protecting you from bad compression), but Pando doesn't use statistical learning to predict which files need more detail. The tracker escalates purely based on hard bounce counts. |
| **Enabled** | No | Enables a statistical learning layer (Beta posterior) that can predict, based on extension patterns, when to escalate even before a bounce occurs. Use this if you want Auto mode to be more aggressive about learning. |

**Recommendation**: Leave this **disabled** unless you notice the auto mode compressing files that need full detail. When enabled, it learns from experience but may occasionally get things wrong. The bounce tracker itself is always active in Auto mode — this setting only controls the extra statistical learning layer.

{{< callout type="info" >}}
The bounce tracker only applies when using **Auto** mode. If you use Full, Signatures, or Map explicitly, no learning occurs.
{{< /callout >}}

## Shell Output Optimization (RTK)

When Pando runs shell commands (like `git status`, `npm test`, or `cargo build`), the output can be very verbose. RTK compression strips out unnecessary noise while keeping the important information.

### Enable Output Compression

| Setting | Default | What it does |
|---------|---------|--------------|
| **Enabled** | Yes | Compresses shell command output to remove boilerplate, repeated headers, and formatting while preserving exit codes and errors |

**Recommendation**: Keep this **enabled**. It significantly reduces tokens from command output without losing useful information.

### Extra Filter Files

Add custom TOML filter files to extend the built-in compression rules. This is for advanced users who want to customize how specific commands are compressed.

**Recommendation**: Leave this **empty** unless you have specific compression needs for custom tools.

## Code Graph

The code graph tracks relationships between files (imports, function calls, references). This powers features like impact analysis and related file suggestions.

### Build Code Property Graph

| Setting | Default | What it does |
|---------|---------|--------------|
| **Enabled** | Yes | Extracts file relationships during code indexing to enable impact analysis |

**Recommendation**: Keep this **enabled** if you use code indexing. It enables useful features like "what will this change affect?"

### Related Files Hint

| Setting | Default | What it does |
|---------|---------|--------------|
| **Disabled** | Yes | Adds a list of related files to the end of file reads and search results |

**Recommendation**: Enable this if you often need to understand how files connect. It adds a small amount of tokens but can save you from manually searching for related files.

## Savings Tracking

### Record Token-Savings Ledger

| Setting | Default | What it does |
|---------|---------|--------------|
| **Enabled** | Yes | Tracks how many tokens each optimization feature saves, shown in the Savings widget |

**Recommendation**: Keep this **enabled** to see how much Pando is saving you. The tracking has negligible overhead.

### Viewing Your Savings

The **Savings** widget in the Token Optimization settings shows:
- Total tokens saved
- Percentage reduction
- Breakdown by source (file reads, shell output, deduplication)

You can also view savings from the command line:

```bash
# Show cumulative savings summary
pando gain

# Show savings for the last 30 days
pando gain --days 30

# Estimate cost savings (price per million tokens)
pando gain --price 3

# Output as JSON (for scripting)
pando gain --json
```

### Savings via MCP

The `pando_stats` tool is available to agents during conversations. It reports the same savings data — tokens saved, reduction percentage, and per-source breakdown — so the AI can reference its own optimization stats when relevant. Use `pando_stats` with an optional `days` parameter to limit the reporting window.

## Configuration File

All settings can be configured in `.pando.toml`:

```toml
[TokenOptimization]
# File read mode: "full" (default), "auto", "signatures", "map"
ReadModeDefault = "full"

# Deduplicate unchanged re-reads (default: true)
ReadDedupDisabled = false

# Adaptive learning for auto mode (default: false)
ReadModeLearning = false

# Build code property graph (default: true)
BuildCodeGraph = true

# Show related files in results (default: false)
RelatedFilesHint = false

# Track token savings (default: true)
SavingsLedgerDisabled = false
```

You can also override the read mode via environment variable:

```bash
# Force auto mode for all sessions
PANDO_READ_MODE_DEFAULT=auto pando serve
```

Or in `.pando.json`:

```json
{
  "tokenOptimization": {
    "readModeDefault": "full",
    "readDedupDisabled": false,
    "readModeLearning": false,
    "buildCodeGraph": true,
    "relatedFilesHint": false,
    "savingsLedgerDisabled": false
  }
}
```

## Quick Reference

| Feature | Default | Recommended | Token Savings |
|---------|---------|-------------|---------------|
| Read Mode | Full | Full or Auto | Medium-High |
| Deduplication | On | On | Medium |
| Adaptive Learning | Off | Off | Low |
| Output Compression | On | On | High |
| Code Graph | On | On | Enables features |
| Related Files | Off | Optional | Low |
| Savings Ledger | On | On | None (tracking only) |

**CLI commands:**
| Command | Description |
|---------|-------------|
| `pando gain` | Show cumulative token savings summary |
| `pando gain --days 30` | Show savings for a time period |
| `pando gain --price 3` | Estimate USD cost savings |
| `pando gain --json` | JSON output for scripting |

{{< callout >}}
All optimization features are additive and fail-safe. Compressed reads never cost more than full reads — if compression produces more tokens than the raw content, Pando falls back to the full read automatically. You can safely experiment with different settings — if something doesn't work well, just change it back. The defaults preserve Pando's standard behavior.
{{< /callout >}}
