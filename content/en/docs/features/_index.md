---
title: Features
weight: 3
---

## Interactive TUI

Pando is built with [Bubble Tea](https://github.com/charmbracelet/bubbletea), a framework for building terminal user interfaces. It provides a smooth and responsive experience directly in your terminal.

## Vim-like Editor

Pando includes an integrated editor with Vim-style keybindings for composing messages and editing code without leaving the TUI.

## External Editor Support

You can open your preferred editor (Neovim, Emacs, etc.) to compose long or complex messages.

## Session Management

- Save and restore previous conversations
- Multiple simultaneous sessions
- Persistence in a local SQLite database

## Tool Integration

The AI can execute tools directly in your project:

- **Run commands**: Execute shell commands to build, test, etc.
- **File search**: Find and read project files
- **Code modification**: Edit files directly with user confirmation
- **Web search**: Search the internet for up-to-date information

## Custom Commands

Custom commands are predefined prompts stored as Markdown files:

1. **User commands** (prefix `user:`): `$XDG_CONFIG_HOME/pando/commands/` or `$HOME/.pando/commands/`
2. **Project commands** (prefix `project:`): `<PROJECT_DIR>/.pando/commands/`

Commands support **named arguments** as placeholders:

```markdown
Analyze the file {{filename}} and explain the function {{function_name}}
```

## LSP Integration

Pando includes **Language Server Protocol (LSP)** support for contextual code intelligence:

- LSP-informed autocompletion
- Real-time diagnostics and errors
- Code navigation

## File Change Tracking

Pando tracks and visualizes file changes made during a session, showing a diff of what the AI modified.

## Auto Compaction

With `autoCompact = true`, Pando automatically compacts long conversation histories to optimize token usage.

## Lua Hooks

Pando supports **Lua** hooks for customizing and automating behaviors:

- Before/after message hooks
- Session start/end hooks
- Workflow automation

See the `docs/` directory in the repository for Lua hook examples.
