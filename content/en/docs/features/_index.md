---
title: Features
weight: 3
---

Pando is named after a forest in Utah that looks like thousands of trees and is really one single plant, joined underground by its roots. The assistant works the same way: on top you see one chat; underneath, memory, helpers and tools share the same roots.

This section **explains** each part: what it is, what it does for you and when it is worth using. When you want to set something up, each page sends you to the [guide]({{< relref "/guides" >}}) that walks you through it click by click, and to the [reference]({{< relref "/docs/configuration" >}}) with the exact option names.

## 表 Surface: what you touch

The trunks above ground. Different doors into the same assistant: pick the one that suits the moment, your conversations follow you.

| Feature | In one line |
|---|---|
| [Web UI & PWA]({{< relref "/docs/features/web-ui" >}}) | Pando in a browser tab, on your computer or your phone. |
| [Native Desktop App]({{< relref "/docs/features/desktop-app" >}}) | The same screens in a window of their own, with a tray icon. |
| [Setup Assistant]({{< relref "/docs/features/setup-assistant" >}}) | A short welcome tour that gets you ready to chat in five steps. |
| [Project Workspaces]({{< relref "/docs/features/project-workspaces" >}}) | Several projects open at once, each in its own tab. |
| [WebUI Access]({{< relref "/docs/features/webui-access" >}}) | A lock on the door when you open Pando to other devices. |
| [Design Studio]({{< relref "/docs/features/design-studio" >}}) | Ask for a landing page or a slide deck and watch it take shape. |
| [Terminal UI]({{< relref "/docs/features/terminal-interface" >}}) | The keyboard-first version, for people who live in a terminal. |
| [TUI Enhancements]({{< relref "/docs/features/tui-enhancements" >}}) | The comforts of the terminal version: tabs, themes, file picker. |
| [Command Line Interface]({{< relref "/docs/features/cli" >}}) | One question, one answer, no window. Handy for scripts. |
| [Slash Commands]({{< relref "/docs/features/slash-commands" >}}) | Shortcuts you type with `/` to ask for common jobs. |
| [Interactive User Questions]({{< relref "/docs/features/ask-user-question" >}}) | When Pando is unsure, it asks you with buttons instead of guessing. |
| [Fast User Feedback]({{< relref "/docs/features/steering" >}}) | Correct the course while Pando is still working. |
| [Learning Mode]({{< relref "/docs/features/learning-mode" >}}) | Pando explains as it goes, like a patient colleague. |
| [Caveman Mode]({{< relref "/docs/features/caveman-mode" >}}) | Short answers, no filler. Cheaper and faster to read. |

## 根 Roots: what works unseen

Under the surface, three things keep the grove alive: how Pando thinks, what it remembers and who it hands work to.

### 木 Pando: how it thinks

| Feature | In one line |
|---|---|
| [Goal Mode]({{< relref "/docs/features/goal-mode" >}}) | Give it a destination and let it drive until it gets there. |
| [Model Auto Mode]({{< relref "/docs/features/model-auto-mode" >}}) | A receptionist that sends each question to the right AI model. |
| [Decision Model]({{< relref "/docs/features/decision-model" >}}) | Pando's reflexes: a tiny model for the quick choices. |
| [Thinking & Reasoning Effort]({{< relref "/docs/features/reasoning-modes" >}}) | Decide how long Pando thinks before it answers. |
| [Superpowers Mode]({{< relref "/docs/features/superpowers-mode" >}}) | Plan first, build second: a written plan before any code. |
| [Tool Discovery]({{< relref "/docs/features/tool-discovery" >}}) | Pando keeps most tools in the drawer and takes out only what it needs. |

### 本 Remembrances: what it remembers

| Feature | In one line |
|---|---|
| [Persistent Memory]({{< relref "/docs/features/persistent-memory" >}}) | A notebook Pando keeps between conversations. |
| [Context Enrichment]({{< relref "/docs/features/context-enrichment" >}}) | Before answering, Pando looks up what it already knows about your project. |
| [Code Search by Meaning]({{< relref "/docs/features/code-embeddings" >}}) | A librarian trained on code, so Pando finds functions by what they do. |
| [Session Compaction]({{< relref "/docs/features/session-compaction" >}}) | A long conversation folded into a summary so it can keep going. |
| [Agent VCS]({{< relref "/docs/features/agent-vcs" >}}) | A diary of what each conversation changed, to read it and get your code back. |

### 众 Mesnada: who it works with

| Feature | In one line |
|---|---|
| [Agent Delegation & Orchestration]({{< relref "/docs/features/agent-delegation" >}}) | A crew of helpers that take jobs in parallel. |
| [Agent Self-Service]({{< relref "/docs/features/pando-setup-tool" >}}) | Ask Pando to change its own settings instead of opening menus. |
| [Self-Improvement]({{< relref "/docs/features/self-improvement" >}}) | Pando reviews its finished work and learns from your corrections. |

## 土 Soil: what it grows from

The ground everything feeds on: the AI models, the tools Pando can pick up, and the fences that keep it safe.

### AI models

Pando works with Anthropic (Claude), OpenAI, Google Gemini, AWS Bedrock, Azure, Groq, xAI, Ollama, OpenRouter, GitHub Copilot and any service that speaks the OpenAI format. You can keep several accounts and switch model mid-conversation.

| Feature | In one line |
|---|---|
| [GitHub Copilot Auth]({{< relref "/docs/features/copilot-auth" >}}) | Use the Copilot subscription you already pay for. |
| [Local LLM Proxy]({{< relref "/docs/features/llm-proxy" >}}) | Lend your AI accounts to your other tools through one local address. |

### Connections

| Feature | In one line |
|---|---|
| [MCP]({{< relref "/docs/mcp" >}}) | Power strips for extra tools: plug in a server, get new abilities. |
| [MCP Server Authentication]({{< relref "/docs/features/mcp-authentication" >}}) | How Pando shows its ID to tool servers that ask for it. |
| [ACP]({{< relref "/docs/acp" >}}) | Pando inside your code editor: Zed, VS Code, JetBrains, Xcode. |
| [AG-UI for Web Apps]({{< relref "/docs/features/agui" >}}) | Put a Pando chat inside your own web page. |
| [LSP Auto-Activation]({{< relref "/docs/features/lsp-auto-activation" >}}) | Pando borrows your editor's spell-checker for code. |
| [Inter-Process Communication]({{< relref "/docs/features/ipc" >}}) | Several Pando windows that talk to each other and stay in sync. |

### Hands

| Feature | In one line |
|---|---|
| [Browser Automation]({{< relref "/docs/features/browser-automation" >}}) | Pando opens web pages, clicks and reads them for you. |
| [Desktop Controller]({{< relref "/docs/features/desktop-controller" >}}) | Pando can see and use the apps on your desktop. |
| [Document Conversion]({{< relref "/docs/features/markitdown" >}}) | PDFs, Word and Excel files turned into text Pando can read. |

Web search through Google, Brave, Perplexity and Exa is built in: add a key and Pando can look things up.

### Extend

| Feature | In one line |
|---|---|
| [Extensions]({{< relref "/docs/features/extensions" >}}) | Add-ons for teams that need Pando to do something of their own. |
| [Ponytail Skill]({{< relref "/docs/features/ponytail" >}}) | A rule set that keeps Pando from building more than you asked for. |

Skills (recipe cards Pando follows for a kind of job), custom commands and Lua scripts also live here. See the guide [Write your first skill]({{< relref "/guides/first-skill" >}}).

### Trust

| Feature | In one line |
|---|---|
| [Command Sandbox]({{< relref "/docs/features/sandbox" >}}) | A playpen: the agent's commands cannot leave your project. |
| [AGE encryption]({{< relref "/docs/configuration/age-encryption" >}}) | Your keys and passwords stored in a locked box. |
| [Auto HTTPS Certificates]({{< relref "/docs/features/https-auto-cert" >}}) | The padlock in the address bar, set up for you. |

Docker and Podman containers are supported for people who want the agent in a room of its own. See [Isolate work in dev containers]({{< relref "/guides/dev-containers" >}}).

### Day to day

| Feature | In one line |
|---|---|
| [Cross-Platform Installers]({{< relref "/docs/features/installers" >}}) | One download for macOS, Linux and Windows. |
| [Self-Update]({{< relref "/docs/features/self-update" >}}) | Pando updates itself with one command. |
| [Remote Diagnostics]({{< relref "/docs/features/remote-diagnostics" >}}) | A black box you can switch on when you report a problem. |
| [Database Compact]({{< relref "/docs/features/db-compact" >}}) | A spring clean for Pando's storage. |
| [Config File Discovery]({{< relref "/docs/features/config-discovery" >}}) | How Pando finds your settings, wherever you start it. |

## Also part of every session

- **Your conversations are kept.** Every session is saved on your computer and you can pick it up later, from any of the surfaces.
- **Personas.** Pando can wear different hats (assistant, software engineer, QA…) and switch between them, by hand or on its own.
- **It asks before it acts.** Running a command or changing a file needs your OK, unless the sandbox makes it safe or you have allowed it.
- **You see every change.** Files the agent touched are listed next to the chat, with the before and after.
- **Everything stays local.** Conversations, memory and settings live on your machine.

Curious about the machinery? [Under the Hood]({{< relref "/docs/configuration/under-the-hood" >}}) has the technical notes.
