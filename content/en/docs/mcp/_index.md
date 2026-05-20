---
title: MCP Server
weight: 5
---

Pando includes a built-in **Model Context Protocol (MCP)** server that allows external tools, agents, and IDEs to connect to Pando as an AI context and tools provider.

## Starting the MCP server

```bash
# Start as MCP server (stdio + HTTP /mcp)
pando mcp-server

# Stdio only
pando mcp-server --no-http

# HTTP only
pando mcp-server --no-stdio
```

## Configuration in MCP clients

Add Pando as an MCP server in your compatible client (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "pando": {
      "command": "pando",
      "args": ["mcp-server", "--no-http"]
    }
  }
}
```

## Available tools

Pando's MCP server exposes tools that allow clients to:

- Execute commands in the project context
- Read, modify, and search files (with page-by-page reading optimizations and pagination)
- Browse the web using an integrated high-speed browser, including lightweight **Lightpanda** browser support
- Interact with session history and recall memory

## Consuming external MCP servers

Pando can also **consume** external MCP servers as a source of additional tools for the AI. Configure them in `.pando.toml`:

```toml
[mcpServers.my-server]
command = "my-mcp-server"
args = ["--flag"]
env = { MY_VAR = "value" }
```

### Encrypting Sensitive MCP Parameters

If your external MCP server requires credentials or secret tokens, you can encrypt them using AGE:

```toml
[mcpServers.my-secure-server]
command = "database-connector"
env = { SECRET_TOKEN = "age1y7g9w...encrypted-value..." }
```
Pando automatically decrypts these parameters securely in memory at startup, protecting your private credentials.

Or in JSON:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "my-mcp-server",
      "args": ["--flag"],
      "env": {
        "MY_VAR": "value"
      }
    }
  }
}
```
