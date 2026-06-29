---
title: "Pando June 2026: Delegation, Memory, and TUI Revolution"
date: 2026-06-28
tags: ["Release", "Features", "Roundup", "Delegation", "Memory"]
---

June 2026 brought massive improvements to Pando's delegation system, persistent memory, and Terminal UI. Here's everything that landed this month.

## Multi-Project Delegation

The headline feature: Pando can now **delegate tasks to other running instances across different projects**. The `mesnada_spawn_agent` tool includes a `project` parameter that routes work to the correct project's warm instance:

```json
{
  "prompt": "Analyze the API module",
  "project": "my-api-project",
  "background": true
}
```

This enables cross-project workflows where a single orchestrator dispatches work across your entire development ecosystem.

## Delegation Supervisor

Subagents can now **automatically send finalization events** to the parent agent in real-time:

- **Inject into live loop**: Results injected while parent is running
- **Resurrect idle loop**: Parent woken up when tasks complete
- **Await-aware resurrection**: Parent resumes only when join conditions are met

No more polling—the parent agent is notified automatically.

## Persistent Memory System

A complete **persistent memory system** built on the Knowledge Base backend:

- **`remember`** tool: Store facts with key, scope, importance, TTL
- **`recall`** tool: Search memories by natural language
- **`forget`** tool: Delete memories by key
- **Automatic injection**: Relevant memories injected into context
- **TTL expiration**: Memories expire after configurable period
- **Hit counting**: Frequently recalled memories stay alive longer

```toml
[Remembrances]
MemoryEnabled = true
MemoryContextMaxItems = 3
```

## Tool Discovery

Inspired by VS Code Copilot, Pando now **manages large tool sets dynamically**:

- Core tools always visible
- MCP and Lua tools deferred until needed
- `tool_search` tool for on-demand discovery
- Discovered tools stay visible for the session

```toml
[ToolDiscovery]
Enabled = true
Mode = 'auto'
MaxDirectTools = 64
```

## Agent-VCS

Replaced the snapshot feature with a **lightweight version control system** for agent changes:

```bash
pando agent-vcs sessions          # List sessions
pando agent-vcs log <session>     # Show commit log
pando agent-vcs show <commit>     # Show diff
pando agent-vcs revert <commit>   # Revert to commit
pando agent-vcs compact --keep 20 # Keep recent sessions
```

Immutable commits, per-session changelogs, file-level diffs, and revert capability.

## Ponytail (YAGNI Mode)

A **"lazy senior developer"** instruction set that enforces YAGNI principles:

```
/ponytail full     # Enforce stdlib-first, shortest diff
/ponytail ultra    # YAGNI extremist: deletion before addition
```

Makes the agent write more concise code, prefer standard library solutions, and challenge unnecessary complexity.

## MarkItDown Integration

Convert rich documents to Markdown for RAG:

- **PDF**, **DOCX**, **XLSX**, **PPTX**, **EPUB**, **CSV**, **HTML**
- Automatic conversion during KB sync
- CLI: `pando convert document.pdf`

Place documents in a KB-watched directory and they're automatically indexed.

## Interactive User Questions

The `ask_user_question` tool lets agents **ask structured, selectable questions** mid-task:

- 1-4 questions per call
- Multi-select support
- Free-text "Other" option
- TUI/Web UI interactive dialogs
- ACP formatted text mode

## Fast User Feedback (Steering)

**Real-time course corrections** while the agent is running:

- TUI: Type message + Ctrl+S
- Web UI: Submit during active run
- API: `POST /api/v1/sessions/:id/steer`

Messages injected at the next safe boundary without cancelling progress.

## TUI Revolution

Major Terminal UI enhancements:

### Workspace Tabs
Switch between Chat, Editor, and Editor+Chat with **Alt+1/2/3**.

### Chat Info Sidebar
Right-hand panel showing session info, plan, modified files, and LSP config. Toggle with **Ctrl+Shift+B**.

### Themes
10+ built-in themes with instant switching (**Ctrl+T**): dracula, gruvbox, tokyonight, catppuccin, monokai, and more.

### Auto-Approve Toggle
**Shift+Tab** toggles auto-approve mode for all tool permissions.

### File Selector
**@** character opens file completion dialog (replaces old `/`).

### Realtime Token Estimation
Status bar shows live context-window usage with warnings at 80%+.

### Enhanced Status Bar
Clickable help, breadcrumbs, project badge, diagnostics, model name.

### Mouse Support
Full mouse support across all components.

### File Tree Enhancements
Git status indicators, new file creation, lazy loading, fuzzy search.

### Integrated Terminal
**Ctrl+U** toggle, **Ctrl+Y** new tab, **Ctrl+Shift+Y** switch tabs.

## Custom Engine Templates

Define custom agent engines with **YAML templates**:

```toml
[Mesnada.Orchestrator]
EnginesDir = ''   # defaults to engines directory
```

Place `*.template.yaml` files to register custom engines dynamically.

## Cross-Platform Installers

New installer scripts for all platforms:

```bash
# Linux
bash <(curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-linux.sh)

# Windows
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)

# macOS
# Download .app or .pkg from GitHub Releases
```

Auto-detects architecture, installs dependencies, configures PATH.

## Infrastructure

- **DB Compact** command for SQLite VACUUM with IPC support
- **Memory tools as MCP server** for external agent access
- **KB front-matter metadata** with tags and chronological ordering
- **Fuzzy tag search** in Knowledge Base
- **Apple notarization** for macOS app signing
- **Ollama test connection** button in remembrances tools
- **Auto LSP activation** based on edited file language
- **Preferred output format** (TOON > TOML > JSON)

## What's Next

July brings more delegation improvements, advanced memory features, and enhanced editor integrations. The foundation laid in May and June enables increasingly powerful autonomous workflows.

---

*Pando is open source and under active development. Try it at [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
