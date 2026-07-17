---
title: Slash Commands
weight: 18
---

Slash commands provide quick access to Pando features without leaving the chat interface. Type `/` at the start of an empty input to see available commands.

## How to Use Slash Commands

### TUI (Terminal User Interface)

Type `/` in the chat input. A fuzzy-searchable dialog appears showing all available commands organized by category. Use arrow keys or type to filter, then press Enter to select.

### Web UI

Type `/` in the chat input. Commands appear in an autocomplete dropdown that filters as you type.

### ACP (Editor Integration)

Type `/` in the editor chat panel. Commands are available in VS Code, Zed, and JetBrains through the Agent Client Protocol.

### CLI (Non-Interactive)

Use flags instead of slash commands:

```bash
pando --goal "Fix tests"           # equivalent to /goal
pando --goal "Refactor auth" --model copilot.gpt-5.4
```

---

## Goal Mode Commands

| Command | Description |
|---------|-------------|
| `/goal <objective>` | Start autonomous goal mode with a persistent objective |
| `/autopilot <objective>` | Alias for `/goal` |
| `/goal-status` | Show the status of the current goal (progress, iterations, elapsed time) |
| `/goal-cancel` | Cancel the running goal |

Goal mode lets Pando work autonomously across multiple turns without requiring user input after each step. See [Goal Mode](/docs/features/goal-mode) for full details.

---

## Session Management Commands

| Command | Description |
|---------|-------------|
| `/compact` | Create a manual compact summary for the current session (frees tokens) |
| `/summarize` | Alias for `/compact` |
| `/db-compact` | Compact the database (SQLite VACUUM) to reclaim free space |

**`/compact`** summarizes the conversation history to free up context window tokens. Use this when the session is getting long and you want to continue working without starting a new session.

**`/db-compact`** runs SQLite VACUUM on Pando's database to reclaim disk space from deleted records. This is useful after长时间使用 or after cleaning up old sessions.

---

## Code Quality Commands

### Ponytail Mode

Ponytail is a "lazy senior developer" mode that applies YAGNI (You Aren't Gonna Need It) principles to code suggestions.

| Command | Description |
|---------|-------------|
| `/ponytail lite` | Enable lite YAGNI mode - suggests simpler alternatives |
| `/ponytail full` | Enable full YAGNI mode - more aggressive about simplicity |
| `/ponytail ultra` | Enable ultra YAGNI mode - maximum simplicity enforcement |
| `/ponytail off` | Disable ponytail mode |

### Caveman Mode

Caveman reduces output verbosity to save output tokens while keeping code, commands, and errors exact.

| Command | Description |
|---------|-------------|
| `/caveman lite` | Drop filler and restatement. Normal sentences, fewer of them |
| `/caveman full` | Terse by default. Conclusions and fragments, no unrequested explanation |
| `/caveman ultra` | Maximum brevity. The answer and nothing around it |
| `/caveman wenyan` | Render prose in Classical Chinese (文言文). Code stays verbatim |
| `/caveman-finish` | Disable caveman and return to normal output |

{{< callout type="info" >}}
Caveman only constrains expression. It never reduces reasoning, tool use, testing, or verification requirements. Ask for detail anytime and you get it in full.
{{< /callout >}}

---

## Workflow Commands

### Superpowers Mode

Superpowers enforces a disciplined development workflow: plan-first, verify-always.

| Command | Description |
|---------|-------------|
| `/superpowers [objective]` | Enable the disciplined development workflow |
| `/superpowers-finish` | Verify, report, and return to normal mode |

When active, work follows this lifecycle:
1. Understand before designing
2. Design, then get approval
3. Plan long work explicitly
4. Implement test-first, in small increments
5. Verify with evidence, not claims
6. Review before declaring ready

### Learning Mode

Learning mode makes Pando work as a deliberate learner and documentarian.

| Command | Description |
|---------|-------------|
| `/learning [focus]` | Enable learner mode: read KB more, document discoveries, ask questions |
| `/learning-finish` | Consolidate learnings into KB/memory and return to normal mode |

When active, Pando:
- Searches the knowledge base before acting
- Asks the user instead of guessing
- Captures non-trivial discoveries as documentation
- Keeps existing docs honest (updates stale, marks superseded)

---

## Project Management Commands

| Command | Description |
|---------|-------------|
| `/improve-agents-md [guidance]` | Create or reinforce AGENTS.md with mandatory AI-agent operating rules |

---

## Custom Commands

Pando supports custom slash commands via markdown files. Place `.md` files in:

- **Project commands**: `<data-dir>/commands/` (shown as `project:command-name`)
- **User commands**: `~/.config/pando/commands/` or `~/.pando/commands/` (shown as `user:command-name`)

Custom commands appear in the command palette alongside built-in commands.

---

## Command Categories

Commands are organized into categories in the command palette:

- **General**: Goal, compact, db-compact
- **Code Quality**: Ponytail and Caveman modes
- **Workflow**: Superpowers and Learning modes
- **Project**: AGENTS.md management

{{< callout >}}
Slash commands work across all Pando interfaces (TUI, Web UI, ACP). The command palette provides fuzzy search to quickly find the command you need.
{{< /callout >}}
