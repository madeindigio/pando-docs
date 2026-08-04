---
title: "Pando July 2026: Token Intelligence, New Modes, and Enterprise MCP"
date: 2026-07-31
tags: ["Release", "Features", "Roundup", "Token Optimization", "lean-ctx", "RTK"]
---

July 2026 was Pando's biggest month yet for token optimization and workflow intelligence. The lean-ctx integration landed all five phases, new session modes arrived, and MCP authentication reached enterprise-grade maturity.

## Token Optimization (lean-ctx Integration)

The headline feature: a complete **Token Optimization system** that cuts 50-90% of tokens on file reads and shell output, with every optimization being additive and fail-safe.

### Smart File Read Modes

The `view` tool now supports four read modes:

| Mode | What it shows | Token savings |
|------|---------------|---------------|
| **Full** (default) | Raw file content, byte-identical to before | None — standard behavior |
| **Auto** | Automatically picks the best mode based on file size/type | 50-90% on large files |
| **Signatures** | Function/class names and signatures only | ~75-90% on large source files |
| **Map** | Imports and top-level declarations | ~60-80% for structural overview |

Every mode preserves line numbers so you can jump back to full content with `offset`/`limit`.

### Content-Hash Deduplication

Re-reading an unchanged file section now collapses to a ~15-token reference instead of resending the full content. On by default — no configuration needed.

### Bounce Tracker

When using Auto mode, Pando watches for "bounces" — cases where a compressed read didn't give the AI enough detail and it immediately re-reads in full. Files and extensions that bounce frequently get automatically escalated to fuller reads.

### Code Property Graph

The symbol index now tracks relationships between files — imports, function calls, and references. Two new tools power this:

- **`code_impact_analysis`**: "What breaks if I change this symbol?"
- **`code_related_files`**: "What files relate to this one?"

Currently supports Go, TypeScript, and JavaScript edge extraction.

### Savings Ledger

Every token-reduction event is tracked in an append-only JSONL ledger. View your savings with:

```bash
pando gain                    # cumulative summary
pando gain --days 30          # last 30 days
pando gain --price 3          # estimated USD savings
pando gain --json             # for scripting
```

The `pando_stats` MCP tool gives agents access to savings data during conversations.

### Token Optimization Settings

All settings are unified in **Settings > Token Optimization** (WebUI/TUI) or `[TokenOptimization]` in TOML:

```toml
[TokenOptimization]
ReadModeDefault = "full"       # "full", "auto", "signatures", "map"
ReadDedupDisabled = false       # content-hash dedup (default: on)
ReadModeLearning = false        # statistical bounce learning
BuildCodeGraph = true           # relationship graph
RelatedFilesHint = false        # related files in results
SavingsLedgerDisabled = false   # savings tracking
```

## Caveman Mode (Output Brevity)

A new **token-saving expression mode** that cuts filler, restatements, and unnecessary prose while preserving code, commands, errors, and verification output.

```bash
/caveman lite     # remove filler, keep normal sentences
/caveman full     # fragments and bullets, one idea per line
/caveman ultra    # maximum compression
/caveman off      # disable
```

Set a default in configuration:

```toml
[Caveman]
DefaultMode = "lite"
```

Caveman composes with other modes — you can use it alongside superpowers or learning mode.

## Superpowers Mode (Specs-Driven Development)

An opt-in **workflow discipline** that enforces structured development:

```bash
/superpowers                    # enable
/superpowers Fix login bug      # enable with objective
/superpowers-finish             # verify and close
```

When active, every turn follows: understand → design + approval → written plan → test-first implementation → verify → self-review.

Safety guarantees: never commits, merges, pushes, or touches git config.

## Learning Mode

An opt-in **knowledge-capture policy** that ensures continuity across sessions:

```bash
/learning auth system changes   # enable with focus
/learning-finish                # consolidate and close
```

When active, Pando:
1. Searches KB for prior context before building on work
2. Asks the user for genuine decisions instead of guessing
3. Documents discoveries to the knowledge base
4. Marks superseded docs as outdated

## Agent Self-Service (`pando_setup`)

A new internal tool that gives agents **their own control panel**:

- `config` — read configuration (read-only, secrets masked)
- `providers` — list configured provider accounts
- `models` — browse available models with pricing from models.dev
- `session` — check token usage and cost
- `commands` — list and activate slash commands

The tool is always available and costs minimal tokens — it discovers detail on demand through `help`.

## MCP Server Authentication

Full **OAuth 2.1 + mTLS** support for authenticating with MCP servers:

### Auth Types
- **Bearer token** — static API keys
- **Basic auth** — username + password
- **OAuth 2.1** — browser-based login flow
- **Client credentials** — server-to-server, no user interaction

### Enterprise mTLS

```toml
[McpServers.Auth]
Type = "oauth_client_credentials"
ClientCert = "/path/to/client.crt"
ClientKey = "/path/to/client.key"
CACert = "/path/to/internal-ca.crt"
TLSServerName = "internal-mcp.corp.com"
MinTLSVersion = "1.2"
```

Supports PKCS#8 encrypted keys, custom CA trust, hostname pinning, and TLS version constraints.

### CLI Management

```bash
pando mcp list              # server statuses
pando mcp login my-server   # OAuth login (opens browser)
pando mcp status my-server  # check auth status
pando mcp logout my-server  # clear tokens
```

## LSP Auto-Activation

Pando now **automatically detects file languages** and starts the matching LSP server:

- 22 built-in language presets (Go, TypeScript, Python, Rust, C/C++, Java, etc.)
- On-demand activation when you open a file
- Autostart option for frequently used languages
- Workspace file watcher for automatic server startup

```toml
LSPAutoActivate = true

[LSP.gopls]
Autostart = false  # start only when opening .go files

[LSP.pyright]
Autostart = true   # start at boot
```

## Configuration Discovery

Pando now **searches upward** for `.pando.toml` — place your config at a repo root and all subdirectories inherit it automatically.

## WebUI Enhancements

- **Real terminal** powered by xterm.js — full shell interaction with zsh, ANSI colors, command history
- **Chat info sidebar** — session details, modified files, repository info (like the TUI)
- **Basic authentication** — secure your instance when binding to external IPs

## Models.dev Integration

The model selection dialog now shows enriched metadata from [models.dev](https://models.dev):

- Context window size
- Per-million-token pricing
- Capabilities (reasoning, image support)
- Knowledge cutoff dates

## Infrastructure

- **KB Wiki Links** — documents can link to each other with `[[wiki-links]]`, forming a navigable graph
- **MCP mTLS for enterprise** — client certificates, encrypted keys, custom CA trust
- **Vulnerability Hunter mode** — security audit commands based on Capital One's VulnHunter
- **Custom MCP OAuth** — configurable OAuth logic with TOML and Lua functions
- **UI-AI protocol** — structured communication between UI and agent
- **Hermes Kanban** — subagent coordination with blackboard and swarm patterns

## What's Next

August brings the final lean-ctx phase (transcript compaction and session briefs), more language support for the code graph, and continued MCP ecosystem improvements.

---

*Pando is open source and under active development. Try it at [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
