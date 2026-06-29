---
title: Persistent Memory System
weight: 12
---

Pando includes a persistent memory system built on top of the Knowledge Base (KB) backend. Memories survive across sessions, are automatically injected into context when relevant, and support importance-weighted ranking with TTL expiration.

## Core Tools

### Store a Memory

Use the `remember` tool to store or update a memory:

```json
{
  "content": "The user prefers TypeScript over JavaScript for new projects",
  "key": "user.preferred_lang",
  "scope": "user/",
  "importance": 0.8
}
```

| Parameter | Description |
|-----------|-------------|
| `content` | The fact or preference to remember |
| `key` | Optional upsert key (same key replaces previous memory) |
| `scope` | Optional prefix: `user/`, `project/`, `session/` |
| `importance` | Weight for injection ranking, 0.0–1.0 (default 0.5) |
| `ttl_days` | Override default TTL (default 180 days) |

### Recall Memories

Search stored memories with the `recall` tool:

```json
{
  "query": "user language preference",
  "scope": "user/",
  "limit": 5
}
```

Memories are ranked by relevance, recency, and access frequency. Each recall automatically increments the hit counter and extends TTL.

### Delete a Memory

Use the `forget` tool to remove a memory:

```json
{
  "key": "user.preferred_lang"
}
```

## Automatic Context Injection

Memories are automatically injected into the system prompt as a `<memories>` XML block when relevant to the current conversation. The injection is ranked by:

1. **Recency** - newer memories score higher
2. **Relevance** - semantic similarity to current context
3. **Access frequency** - frequently recalled memories are prioritized
4. **Importance** - configured weight boosts ranking

## Configuration

```toml
[Remembrances]
MemoryEnabled = true
MemoryContextEnrichmentEnabled = true
MemoryContextMaxItems = 3          # Max memories injected per prompt
MemoryContextMaxChars = 0          # 0 = unlimited
MemoryDefaultTTLDays = 0           # 0 = default 180 days
MemoryGCInterval = ''              # Garbage collection interval
MemoryAutoCapture = false          # Auto-capture conversations
MemoryPinnedScopes = []            # Scopes exempt from GC
```

## Exposed as MCP Server

Memory tools (`remember`, `recall`, `forget`) are exposed when running as MCP server:

```bash
pando mcp-server
```

External agents can use these tools through the MCP protocol.

## Garbage Collection

A background garbage collector automatically removes expired memories based on TTL. Memories with higher hit counts have their TTL extended on each recall.

{{< callout >}}
Use descriptive keys like `user/preferences/language` or `project/architecture/decisions` to organize memories. Scoped memories (prefixed with `user/`, `project/`) allow targeted searches.
{{< /callout >}}
