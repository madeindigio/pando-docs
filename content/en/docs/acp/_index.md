---
title: ACP Protocol
weight: 4
---

Pando supports the [Agent Client Protocol (ACP)](https://agentclientprotocol.com), allowing it to be used directly in compatible editors as an AI coding assistant.

## Quick start

Run Pando as an ACP server (stdio mode, for editors):

```bash
pando acp
```

## Editor configuration

### VS Code

Add to your `settings.json`:

```json
{
  "agent_servers": {
    "Pando": {
      "command": "pando",
      "args": ["acp"]
    }
  }
}
```

### Zed

Add to `~/.config/zed/settings.json`:

```json
{
  "agent_servers": {
    "Pando": {
      "command": "pando",
      "args": ["acp"]
    }
  }
}
```

### JetBrains IDEs

Add to your `acp.json`:

```json
{
  "agent_servers": {
    "Pando": {
      "command": "/path/to/pando",
      "args": ["acp"]
    }
  }
}
```

## ACP Configuration

Configure ACP behavior in `.pando.toml`:

```toml
[acp]
enabled = true
max_sessions = 10
idle_timeout = "30m"
log_level = "info"
auto_permission = false  # set true for CI/batch environments
```

## Management commands

```bash
# Start ACP server (stdio, for editors)
pando acp

# Start with explicit flags
pando acp start --debug --cwd /path/to/project

# Check server status (HTTP mode)
pando acp status

# List active sessions
pando acp sessions

# View server statistics
pando acp stats

# Stop server
pando acp stop
```

## Transports

Pando ACP supports two transports:

- **Stdio**: For use as an editor subprocess
- **HTTP + SSE**: For real-time updates via Server-Sent Events

```bash
# Disable stdio
pando mcp-server --no-stdio

# Disable HTTP
pando mcp-server --no-http
```

## Active Task Checklist & Planning

When integrated with your editor via ACP, Pando displays an **Active Task Checklist** directly inside the editor UI. This provides high-level transparency into what the AI agent is currently doing:
- **Real-Time Steps**: See which files the agent plans to modify and the progress of each task.
- **In-Editor Decisions**: Approve or suggest adjustments to the agent's work plan before it executes.
- **Clean Inactive Sessions**: Pando automatically cleans up inactive sessions to conserve system resources.

## Security features

- Path validation to prevent access outside project directory
- Permission system for tool execution
- Auto-approval mode for trusted environments
