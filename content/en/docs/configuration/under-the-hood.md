---
title: Under the Hood
weight: 90
---

Technical notes on how some of Pando's inner machinery works. You do not need any of this to use Pando; it is here for the curious and for people writing Lua hooks. For the plain-language tour, see [Features]({{< relref "/docs/features" >}}).

## Tool Response Caching & Pagination

When a tool returns a large response (above configurable byte or line thresholds), Pando automatically intercepts the response before returning it to the LLM and stores it in a **per-session LRU cache**. Instead of sending the full content to the model — consuming precious tokens — a compact summary is returned with the cache ID, size metadata, and an inline preview with **line numbering**. The agent can then use the `cache_read` tool to retrieve specific pages of cached content as needed. This dramatically reduces token consumption for large tool responses such as extensive searches or file reads.

## Lua Filters in the MCP Gateway (pre/post tool hooks)

Pando exposes an **MCP Gateway** that centralizes tool calls to external MCP servers. This gateway supports **Lua-written filters** that run at two strategic points:

- **Input filter (`<server-name>-input`)**: Runs just before calling the tool, allowing modification, sanitization, or enrichment of invocation parameters.
- **Output filter (`<server-name>-output`)**: Runs immediately after receiving the tool response, allowing transformation or cleaning of the result before returning it to the agent.

If no server-specific filter exists, a global fallback filter is used (`global-input` / `global-output`). Filters run in a Lua sandbox with configurable timeout, and shell/OS modules are explicitly excluded for security.

## Lua Hook Engine in the Prompt System

In addition to tool filters, Pando has a **complete Lua hook system** that fires at every stage of system prompt composition:

- `hook_system_prompt` — Final modification of the complete prompt.
- `hook_session_start` / `hook_session_restore` — Session lifecycle events.
- `hook_user_prompt` — Sanitize the user message before storing it.
- `hook_agent_response_finish` — Notification when model generation completes.
- `hook_template_section` — Modify or remove individual template sections.
- `hook_capability_check` — Override automatic capability detection.
- `hook_provider_select` — Dynamic provider template selection.
- `hook_prompt_compose` — Reorder, add, or remove entire prompt sections.

Hooks are written in `.lua` files and support hot reloading (`HotReload`), ideal for iterative development. They include helper functions such as `pando_get_config`, `pando_load_file`, and `pando_list_mcp_servers`.

## Line Numbering When Reading Files

The `view` tool renders file contents with **automatic line numbering** (6-digit padded), making it easy for the agent to reference specific lines in its edits or explanations. When content exceeds the display limit, a note is appended indicating how many additional lines exist and how to use the `offset` parameter to continue reading.

## High-Speed Search Engine

Pando includes a **custom search engine** (`internal/search`) optimized for walking directory trees with multiple concurrent workers (4 by default). Features include:

- **Concurrent scanning**: Producer-consumer pattern with parallel workers processing files simultaneously.
- **Skip binaries**: Heuristic binary file detection (same heuristic as ripgrep) to avoid false positives.
- **File ignores**: Native support for `.gitignore` and `.pandoignore`, walking the directory hierarchy up to the root.
- **Type filters**: Search restricted to specific language extensions (`type: go`, `type: ts`, etc.).
- **Match context**: `before` and `after` parameters for context lines, with a circular buffer for efficiency.
- **Regex caching**: Regular expressions are compiled once and reused across the entire session via `sync.Map`.
- **Multiline**: Support for patterns spanning multiple lines by loading the full file.
- **Native pagination**: Results are sorted by modification time (newest first) and support `offset` and `head_limit` for navigating result pages.

This internal search layer is entirely separate from web search tools, operating exclusively on the local filesystem for maximum speed and privacy.