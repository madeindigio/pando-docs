---
title: Tool Discovery
weight: 14
---

When Pando accumulates many tools (from MCP servers, Lua hooks, and built-in tools), the Tool Discovery system manages complexity by showing only a visible subset and providing on-demand search for the rest.

## How It Works

Inspired by VS Code Copilot's approach:

1. **Core tools** (bash, edit, view, glob, grep, write) are always visible
2. **MCP and Lua tools** are deferred by default
3. When the total tool count exceeds `MaxDirectTools`, the `tool_search` tool activates
4. The LLM searches the full registry by natural language
5. Discovered tools remain visible for the rest of the session

## Configuration

```toml
[ToolDiscovery]
Enabled = true
Mode = 'auto'            # 'auto', 'always', or 'off'
MaxDirectTools = 64       # Threshold for auto mode
SearchLimit = 8           # Default results from tool_search
NonDeferredTools = []     # Tools always visible
DeferredSources = []      # Sources to defer (e.g. "mcp", "lua")
```

## Modes

| Mode | Behavior |
|------|----------|
| `auto` | Activates when tools exceed `MaxDirectTools` |
| `always` | Always defers non-core tools |
| `off` | All tools visible (default for small setups) |

## Tool Search

`tool_search` both **finds** and **runs** tools. With a query it searches:

```json
{
  "query": "search code in repository"
}
```

With a tool name it executes, whether the tool is built into Pando or lives on an MCP server:

```json
{
  "tool_name": "github_create_issue",
  "parameters": { "title": "Fix login redirect" }
}
```

Results are ranked using term-frequency scoring over name, aliases, server name, description, and parameter names.

## One switch for MCP tools too

Tool Discovery and the MCP gateway used to be two separate mechanisms with their own tools and their own switches. They are now a single one: `ToolDiscovery.Enabled` is all you need.

With it on and MCP servers configured:

- your **favourite MCP tools stay directly visible**, exactly as before;
- the rest of the catalog — however many servers you have connected — stays out of the context window and is reached through `tool_search`;
- once the model has discovered a tool, it stays visible for the rest of the session.

The practical effect: you can connect a dozen MCP servers without paying for their entire tool list on every single message.

## Source Filtering

Tools are categorized by source:

- `core` - Built-in tools (always visible)
- `internal` - Pando internal tools
- `mcp` - External MCP server tools
- `lua` - Lua hook tools
- `mesnada` - Orchestration tools
- `rag` - Knowledge base and code index tools
- `gateway` - MCP gateway re-exports

{{< callout >}}
For most users with fewer than 64 tools, Tool Discovery stays inactive. It only activates when the tool count grows large enough to impact context window usage.
{{< /callout >}}
