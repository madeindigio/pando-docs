---
title: Features
weight: 3
---

## Interactive TUI

Pando is built with [Bubble Tea](https://github.com/charmbracelet/bubbletea), a framework for building terminal user interfaces. It provides a smooth and responsive experience directly in your terminal.

## Vim-like Editor & Editor Integration

- **Built-in Editor**: Includes an editor with Vim-style keybindings for composing messages and editing code without leaving the TUI.
- **External Editor**: Support for opening your preferred editor (Neovim, Emacs, VS Code, etc.) for complex editing tasks.

## Native Desktop App & WebUI

Pando is available as a premium **Native Desktop Application** for macOS and Windows, as well as a fully responsive **Web interface and PWA**. This allows you to interact with your projects in a distraction-free, native window with system notifications and multitasking, or access it from any browser on desktop and mobile. All your data and private database remain safely on your local machine.

## Local LLM Proxy

Pando can turn your computer into a centralized AI gateway. By launching the local proxy server, Pando unifies all your configured AI providers (including GitHub Copilot subscription models) and serves them through a single local endpoint compatible with other developer tools in your ecosystem.


## Session Management & Persistence

- Save and restore previous conversations automatically.
- Support for multiple simultaneous sessions.
- All data is stored locally in a SQLite database for maximum privacy and performance.

## Tool Integration

The AI can execute tools directly in your project to enhance your workflow:

- **Run commands**: Integrated shell for building, testing, or running scripts.
- **File manipulation**: Read, write, and search files with user confirmation.
- **Atomic Patches**: Apply coordinated changes across multiple files simultaneously.
- **Web Search**: Integration with Google, Brave, Perplexity, and Exa for real-time, up-to-date information.

## Interactive Web Navigation

Pando can interact with the web in advanced ways:

- **Browser Automation**: Navigate, click, fill forms, and execute JavaScript.
- **Content Capture**: Extract clean text from complex sites and generate screenshots or PDFs of web pages.
- **Network & Console Analysis**: Access console logs and network traffic for web application debugging.

## Model Context Protocol (MCP)

- **MCP Client**: Connect to any MCP server to extend Pando's capabilities with third-party tools.
- **MCP Server**: Pando can act as an MCP server (`pando mcp-server`), exposing its internal tools (filesystem, terminal, browser, search) to other agents or applications via `stdio` and `HTTP` transports.

## Isolation & Containers

Pando supports multiple execution environments for enhanced security and reproducibility:

- **Isolated Execution**: Native support for running commands and tools inside **Docker** or **Podman** containers.
- **Devcontainers**: Integration with standardized development environments.
- **Embedded Runtime**: Controlled execution to minimize side effects on the host system.

## Multi-Provider & Multi-Account

- **Broad Support**: Compatible with Anthropic (Claude), OpenAI (GPT), Google (Gemini), AWS (Bedrock), Azure, Groq, Ollama, OpenRouter, and the secure **Antigravity** provider.
- **Account Management**: Configure multiple accounts for the same provider and switch between them or between different models instantly.

## Automatic Indexing & RAG

Pando understands your code and documentation through Retrieval-Augmented Generation (RAG):

- **Automatic Context Injection**: The enrichment engine searches in parallel across the knowledge base, code index, and past session events to inject relevant information into every prompt.
- **Code Indexing**: Uses tree-sitter and embeddings to create a semantic map of your project.
- **Knowledge Base (KB)**: Sync Markdown documentation for intelligent retrieval.

## Personas & Customization

- **Persona Support**: Define different AI "personas" with specific system instructions. Pando can switch between them to adapt to different tasks (coding, review, doc, etc.).
- **Self-Improvement**: Built-in tools for evaluating and self-improving prompts based on performance metrics and task success rates.

## Agent Orchestration (Mesnada)

Pando includes **Mesnada**, a powerful agent delegation framework that allows you to spawn specialized sub-agents to tackle complex programming tasks:

- **Seamless Background Work**: Sub-agents work concurrently in the background while you focus on your code. Pando manages multiple running instances without conflicts or resource locking.
- **Auto-Relaunch Resilience**: If a sub-agent experiences a connection loss or minor failure, Pando automatically recovers and restarts the agent to complete the task.
- **Simplified Agent Spawning**: Launch and orchestrate agents with a single command or sidebar toggle in the interface.

## Contextual Intelligence & LSP

- **LSP Integration**: Real-time code intelligence with diagnostics, errors, and autocompletion informed by the Language Server Protocol.
- **Event Memory**: Record important decisions and observations for later recall.
- **Change Tracking**: Real-time diff visualization of all changes made by the AI.

## Automation & Hooks

- **Custom Commands**: Define your own reusable prompts with argument support via Markdown files.
- **Lua Hooks**: Customize Pando's behavior with Lua scripts to automate specific workflows.
- **REST API & SSE**: Pando is fully API-fied, allowing integration into other workflows via its programmatic API.

## Vulnerability Hunter

Adversarial security audit workflow ported from [Capital One's VulnHunter](https://github.com/capitalone/VulnHunter). Three slash commands provide a complete security workflow:

- **`/vulnhunt`**: Full security audit — recon, parallel vulnerability hunting, exploitability verification, and adversarial disproof.
- **`/vulnhunter-fix`**: Test-driven remediation — exploit proof, failing security test, fix, and regression-free verification.
- **`/vulnhunt-fix-verify`**: Read-only independent verification of claimed fixes with per-finding verdicts.

Findings are persisted to the knowledge base and can be referenced across sessions.

## Internal Tool Optimizations

### Tool Response Caching & Pagination

When a tool returns a large response (above configurable byte or line thresholds), Pando automatically intercepts the response before returning it to the LLM and stores it in a **per-session LRU cache**. Instead of sending the full content to the model — consuming precious tokens — a compact summary is returned with the cache ID, size metadata, and an inline preview with **line numbering**. The agent can then use the `cache_read` tool to retrieve specific pages of cached content as needed. This dramatically reduces token consumption for large tool responses such as extensive searches or file reads.

### Lua Filters in the MCP Gateway (pre/post tool hooks)

Pando exposes an **MCP Gateway** that centralizes tool calls to external MCP servers. This gateway supports **Lua-written filters** that run at two strategic points:

- **Input filter (`<server-name>-input`)**: Runs just before calling the tool, allowing modification, sanitization, or enrichment of invocation parameters.
- **Output filter (`<server-name>-output`)**: Runs immediately after receiving the tool response, allowing transformation or cleaning of the result before returning it to the agent.

If no server-specific filter exists, a global fallback filter is used (`global-input` / `global-output`). Filters run in a Lua sandbox with configurable timeout, and shell/OS modules are explicitly excluded for security.

### Lua Hook Engine in the Prompt System

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

### Line Numbering When Reading Files

The `view` tool renders file contents with **automatic line numbering** (6-digit padded), making it easy for the agent to reference specific lines in its edits or explanations. When content exceeds the display limit, a note is appended indicating how many additional lines exist and how to use the `offset` parameter to continue reading.

### High-Speed Search Engine

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