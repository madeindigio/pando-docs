---
title: TUI Enhancements
weight: 26
---

Pando's Terminal UI has received significant enhancements for productivity and visual appeal.

## Workspace Tabs

Switch between three workspace modes with **Alt+1/2/3** or click the tabs:

| Tab | Mode | Description |
|-----|------|-------------|
| 1 | Chat | Full-width chat interface |
| 2 | Editor | File editor with sidebar |
| 3 | Editor+Chat | Split view with both |

## Chat Info Sidebar

A right-hand information panel showing:

- Session title
- LSP configuration
- Plan (TodoWrite entries with status)
- Modified files with live diff stats
- Repository URL and CWD

Toggle with **Ctrl+Shift+B**. Auto-shows when terminal width ≥ 120 columns.

```toml
[tui]
chatSidebar = 'auto'           # 'auto' or 'off'
chatSidebarMinWidth = 120      # minimum terminal width
```

## Themes

Switch themes instantly with **Ctrl+T**:

Available themes: pando, light, dracula, gruvbox, opencode, onedark, tron, flexoki, tokyonight, catppuccin, monokai

Each theme has a `-nobg` variant for transparent backgrounds.

```toml
[tui]
theme = 'pando'
```

## File Selector (@)

Type **@** in chat input to open a file completion dialog with fuzzy search. Replaces the old `/` character (now reserved for slash commands).

## Model Details

The model selection dialog now shows enriched metadata for each model:

- **Context window**: Token limit displayed compactly (e.g., 200K, 1M)
- **Pricing**: Per-million-token input/output costs when available from the provider or [models.dev](https://models.dev) catalog
- **Capabilities**: Reasoning and image support indicators
- **Knowledge cutoff**: Training data cutoff date

This information appears as a footer line for the highlighted model entry, helping you choose the right model for your task.

## Auto-Approve Toggle

Press **Shift+Tab** to toggle auto-approve mode. When active, all tool permissions are automatically approved.

```toml
[permissions]
autoApproveTools = false
```

## Realtime Token Estimation

The status bar shows live context-window token usage with a `~` prefix while the agent is running. Displays warning at 80%+ usage.

## Hidden Files Toggle

Press **Ctrl+Shift+H** to show/hide dotfiles in the file tree.

```toml
[tui]
showHiddenFiles = false
```

## Nerd Fonts

Toggle between Nerd Font glyphs and plain ASCII:

```toml
[tui]
nerdFonts = true
```

Or via environment variable:

```bash
PANDO_NERD_FONTS=0
```

## Enhanced Status Bar

- Help widget (clickable)
- Breadcrumbs trail (recently edited files)
- Active project badge
- Context token usage
- Auto-approve badge
- MCP gateway favorites count
- LSP diagnostics (errors/warnings)
- Model name badge

## Mouse Support

Full mouse support across all components:

- File tree: click to open, scroll to navigate
- Chat messages: click copy buttons, drag to select
- Status bar: clickable zones
- Permission dialog: click Allow/Deny

## File Tree Enhancements

- Git status indicators (+, -, ?, →)
- New file creation (**Ctrl+Shift+N**)
- Lazy loading of directories
- Fuzzy search filter

## Input History

Press **Up/Down** arrow keys to navigate through previously sent messages.

## Integrated Terminal

- **Ctrl+U**: Toggle terminal panel
- **Ctrl+Y**: New terminal tab
- **Ctrl+Shift+Y**: Switch terminal tabs

{{< callout >}}
Press **Ctrl+h** in any view to see available keyboard shortcuts for that panel.
{{< /callout >}}
