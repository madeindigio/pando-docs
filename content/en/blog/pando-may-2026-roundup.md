---
title: "Pando May 2026: Major Feature Roundup"
date: 2026-05-31
tags: ["Release", "Features", "Roundup"]
---

May 2026 was a transformative month for Pando, with over 40 new features and improvements landed. Here's a comprehensive look at everything that shipped.

## Goal Mode (Autopilot)

The most requested feature—**Goal Mode**—is now available. Let Pando pursue a persistent objective autonomously across multiple agent turns:

```
/goal "Fix all failing tests in the project"
```

The agent iterates, evaluates progress, and continues until the goal is achieved, blocked, or cancelled. Includes heuristic evaluation, stall detection, and configurable limits.

## Inter-Process Communication (IPC)

A complete **ZeroMQ-based IPC system** enables multiple Pando instances to communicate:

- **Primary/Secondary failover** with automatic promotion
- **Session synchronization** across instances
- **Hot-peer delegation** for cross-project task routing
- **Write coordination** ensuring database consistency

Built across 8 implementation phases, this foundation enables Pando to scale as a multi-process system.

## Context Enrichment

Automatic **pre-prompt enrichment** searches your Knowledge Base, code index, and past events in parallel:

- **Heuristic planner** (default) for fast, deterministic enrichment
- **LLM-based planner** for more accurate context selection
- **Score filtering** to ensure relevance
- **Configurable budgets** per search source

## Self-Update

Pando can now **update itself**:

```bash
pando update
```

Downloads the latest release from GitHub, verifies your architecture, and atomically replaces the binary. Background update checks notify you of new versions on startup.

## Context-Aware Trimmer

A **cheap LLM** analyzes your first message to produce a context profile, classifying the task type and determining which prompt sections to skip. This saves tokens and improves response quality.

## Agent-Client Protocol (ACP) Improvements

Major ACP enhancements for editor integration:

- **Plan display** showing task progress in VS Code/Zed
- **Thinking stream** for reasoning model transparency
- **Clean persona mode** for editors managing their own prompts
- **Per-session overrides** for model, persona, and permissions
- **ACP messages** like Claude's ACP proxy

## LLM Proxy Unified API

The LLM Proxy now serves **all providers through a single OpenAPI-compatible endpoint**, including GitHub Copilot models:

```bash
pando llm-proxy
# All providers at http://localhost:8765/v1
```

## Browser Automation Enhancements

- **Lightpanda browser** support for lightweight headless automation
- **Browser tool fixes** and improved session management
- **Hybrid search** improvements for better code understanding

## IPC Protocol (8 Phases)

The new instances communication protocol was built across 8 phases:

1. **Phase 1-2**: Basic bus setup and RPC framework
2. **Phase 3-4**: Session and message synchronization
3. **Phase 5-6**: Tool execution and LLM streaming events
4. **Phase 7-8**: Delegation and failover support

## Infrastructure Improvements

- **HTTPS auto-certificates** for `pando serve` and `pando app`
- **AGE encryption** for all MCP server parameters
- **Multiple background sessions** in Web UI and Desktop
- **Mobile Web UI** improvements with offline reconnection
- **Windows version** improvements and alternative AGE key support
- **Non-interactive mode** enhancements for CI/CD

## Code Tools

- **Incremental code index** on startup with file watcher
- **Pattern search** with grep fallback
- **JSON auto-repair** in tool calls
- **Max tokens improvements** in agents and summary loop
- **Line numbers and pagination** in grep and read tools

## Developer Experience

- **Model selector** improvements in TUI settings
- **Snapshot configuration** toggle
- **Command launcher** update in Web UI
- **Single DB writer** with multiple instances per project
- **Mesnada subagents** with relaunch capability

## What's Next

June brings even more features: delegation multi-project support, Ponytail YAGNI mode, MarkItDown document conversion, and major TUI enhancements. Stay tuned!

---

*Pando is open source and under active development. Try it at [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
