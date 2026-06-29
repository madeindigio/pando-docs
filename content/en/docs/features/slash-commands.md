---
title: Slash Commands
weight: 18
---

Pando supports slash commands for quick access to features without leaving the chat interface. Type `/` at the start of an empty input to see available commands.

## Available Commands

### Goal Mode

| Command | Description |
|---------|-------------|
| `/goal <objective>` | Start autonomous goal mode |
| `/autopilot <objective>` | Alias for `/goal` |
| `/goal-status` | Show current goal status |
| `/goal-cancel` | Cancel running goal |

### Session Management

| Command | Description |
|---------|-------------|
| `/compact` | Compact session context (free tokens) |
| `/summarize` | Alias for `/compact` |
| `/db-compact` | Run SQLite VACUUM to reclaim space |

### Code Quality

| Command | Description |
|---------|-------------|
| `/ponytail lite` | Enable lite YAGNI mode |
| `/ponytail full` | Enable full YAGNI mode |
| `/ponytail ultra` | Enable ultra YAGNI mode |
| `/ponytail off` | Disable ponytail |

## Usage in Different Interfaces

### TUI

Type `/` in the chat input. A fuzzy-searchable dialog appears with all available commands and categories.

### Web UI

Type `/` in the chat input. Commands appear in an autocomplete dropdown.

### ACP (Editor Integration)

Type `/` in the editor chat panel. Commands are available in VS Code, Zed, and JetBrains.

### CLI (Non-Interactive)

Use flags instead of slash commands:

```bash
pando --goal "Fix tests"           # equivalent to /goal
pando -p "/compact summary text"   # not applicable in non-interactive
```

## Command Categories

Commands are organized into categories:

- **General**: Goal, compact, db-compact
- **Code Quality**: Ponytail modes
- **Files**: File operations (context-dependent)
- **Sessions**: Session management
- **Models**: Model switching
- **View**: UI layout changes

{{< callout >}}
Slash commands work across all Pando interfaces (TUI, Web UI, ACP, CLI). The command palette provides fuzzy search to quickly find the command you need.
{{< /callout >}}
