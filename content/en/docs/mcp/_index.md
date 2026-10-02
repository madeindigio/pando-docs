---
title: MCP Server
weight: 5
---

MCP is a common plug that lets AI programs share tools. Pando can sit on both sides of it. This page is about one side: **offering Pando's own tools to other programs** (another assistant, an editor), so they can use its web search, browser, memory and file tools. It is reference material: commands and settings.

Looking for the other side, plugging extra tools *into* Pando? Follow the guide [Connect MCP servers]({{< relref "/guides/mcp-servers" >}}) and see the [MCP reference]({{< relref "/docs/configuration/mcp" >}}).

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
- Browse the web with the built-in browser tools, including the light **Lightpanda** browser
- Interact with session history and recall memory

## Consuming external MCP servers

Pando can also **use** MCP servers made by others as extra tools. The easy way is the Web UI, as shown in the guide [Connect MCP servers]({{< relref "/guides/mcp-servers" >}}). In `.pando.toml` it looks like this (all keys are in the [MCP reference]({{< relref "/docs/configuration/mcp" >}})):

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

## HTTP access token

When Pando runs as an MCP server over HTTP, every request needs an access token: `Authorization: Bearer <token>`. This applies on your own machine too.

- On `localhost`, Pando creates a token the first time, shows it once in the terminal and reuses it on later starts.
- To choose the token yourself, set `MCPServer.HttpToken`.
- On any other address, Pando does not start without a token.
- Browsers can connect only from the origins listed in `MCPServer.HttpAllowedOrigins`.

Clients that connect over `stdio` are not affected.

{{< callout type="warning" >}}
If you used the HTTP transport before September 2026 without a token, your client now receives `401`. Add the `Authorization` header to its configuration.
{{< /callout >}}
