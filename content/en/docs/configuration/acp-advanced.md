---
title: ACP Advanced Configuration
weight: 33
---

Advanced ACP (Agent Client Protocol) configuration for editor integration.

## Server Configuration

```toml
[Mesnada.ACP]
Enabled = false
DefaultAgent = 'pando'
AutoPermission = true

[Mesnada.ACP.Server]
Enabled = true
Transports = ['http']
Host = '0.0.0.0'
Port = 8766
MaxSessions = 100
SessionTimeout = '30m'
RequireAuth = false
```

## Per-Session Overrides

ACP sessions support per-session configuration:

| Field | Description |
|-------|-------------|
| `cleanMode` | Disable extra system/prompt-builder instructions |
| `persona` | Override persona for this session |
| `model` | Override model for this session |
| `mode` | Override mode for this session |
| `thinkingMode` | Override thinking mode (`disabled`, `low`, `medium`, `high`) |
| `thinkingStreamMode` | Control how reasoning is streamed |
| `askPermission` | Per-session permission requirement |

## Slash Commands in ACP

| Command | Description |
|---------|-------------|
| `/goal <objective>` | Start goal mode |
| `/goal-status` | Show goal status |
| `/goal-cancel` | Cancel goal |
| `/compact` | Compact session context |
| `/summarize` | Alias for `/compact` |
| `/db-compact` | Database VACUUM |
| `/ponytail [mode]` | Toggle YAGNI mode |

## Clean Persona Mode

When `cleanMode` is enabled, Pando disables all extra system/prompt-builder instructions, giving the editor full control over the system prompt:

```json
{
  "cleanMode": true
}
```

This is useful for editors that manage their own system prompts.

## Plan Display

ACP sessions can display the agent's task plan (TodoWrite entries) in the editor UI:

- Real-time progress updates
- Per-task status (completed, in-progress, pending)
- Tool execution tracking

## Thinking Stream

Control how reasoning is streamed to the editor:

```json
{
  "thinkingStreamMode": "header"
}
```

Options: `header`, `full`, `disabled`

{{< callout >}}
ACP integration works with VS Code, Zed, and JetBrains IDEs. See the main ACP documentation for setup instructions.
{{< /callout >}}
