---
title: Pando
layout: hextra-home
---

<div class="hx:mt-10 hx:mb-2 hx:flex hx:items-start hx:justify-between hx:flex-col hx:sm:flex-row hx:w-full">
<img src="{{< asset-url "images/brand/pando-logo-dark.svg" >}}" alt="Pando" class="pando-home-logo brand-logo-light-only" width="245" height="64" />
<img src="{{< asset-url "images/brand/pando-logo-light.svg" >}}" alt="Pando" class="pando-home-logo brand-logo-dark-only" width="245" height="64" />
<div class="hx:mt-4 hx:sm:mt-0">
{{< hextra/hero-badge link="https://github.com/digiogithub/pando?tab=MIT-1-ov-file#readme" >}}
<div class="hx:w-2 hx:h-2 hx:rounded-full hx:bg-primary-400"></div>
<span>Free, open source</span>
{{< icon name="arrow-circle-right" attributes="height=14" >}}
{{< /hextra/hero-badge >}}
</div>
</div>

<div class="hx:mt-6 hx:mb-6">
{{< hextra/hero-headline >}}
  Advanced multimodal AI assistant
{{< /hextra/hero-headline >}}
</div>
<p>&nbsp;</p>
<div class="hx:mb-10">
{{< hextra/hero-subtitle >}}
  Powerful, extensible, and with support for multiple working modes.&nbsp;<br class="hx:sm:block hx:hidden" />Provides maximum flexibility for full automation.
{{< /hextra/hero-subtitle >}}
</div>
<p>&nbsp;</p>
<div class="hx:mb-12 hx:flex hx:flex-wrap hx:gap-4">
{{< hextra/hero-button text="Get Started" link="docs/getting-started" >}}
{{< hextra/hero-button text="GitHub" link="https://github.com/digiogithub/pando" style="outline" >}}
</div>

<div class="hx:mt-16 hx:mb-16">
<h3 class="hx:text-lg hx:font-semibold hx:mb-3">One root, many trunks</h3>
<p class="hx:text-sm hx:opacity-80 hx:mb-4">Pando 木 shares its visual system with two sibling marks: <strong>Remembrances</strong> 本, the persistent memory and knowledge base, and <strong>Mesnada</strong> 众, the multi-agent orchestrator. See the <a class="hx:text-primary-600 hx:underline" href="{{< relref "/docs/brand" >}}">Brand &amp; Identity</a> guide.</p>
<div class="brand-family">
  <figure><img src="{{< asset-url "images/brand/pando-icon.svg" >}}" alt="Pando" width="48" height="48" /><figcaption>Pando 木</figcaption></figure>
  <figure><img src="{{< asset-url "images/brand/remembrances-icon.svg" >}}" alt="Remembrances" width="48" height="48" /><figcaption>Remembrances 本</figcaption></figure>
  <figure><img src="{{< asset-url "images/brand/mesnada-icon.svg" >}}" alt="Mesnada" width="48" height="48" /><figcaption>Mesnada 众</figcaption></figure>
</div>
</div>

<p>&nbsp;</p>
<div class="hx:mt-8">
{{< hextra/feature-grid >}}
  {{< hextra/feature-card
    title="Interactive TUI"
    subtitle="Terminal UI built with Bubble Tea for a smooth developer experience."
    icon="desktop-computer"
  >}}
  {{< hextra/feature-card
    title="CLI Assistant"
    subtitle="Can suggest or execute shell commands with a simple prompt using `pando cli-assist <prompt>`"
    icon="terminal"
  >}}
  {{< hextra/feature-card
    title="WebUI PWA"
    subtitle="Installable as an application, embedded and accessible from desktop and mobile."
    icon="device-tablet"
  >}}
  {{< hextra/feature-card
    title="Multiple AI Providers"
    subtitle="Support for OpenAI, Anthropic Claude, Google Gemini, AWS Bedrock, Groq, Azure and OpenRouter."
    icon="chip"
  >}}
  {{< hextra/feature-card
    title="Subagent Orchestration"
    subtitle="Supports major AI Agents: OpenCode, Github Copilot, Gemini Cli, Claude Code, and any ACP-compatible agent."
    icon="cube"
  >}}
  {{< hextra/feature-card
    title="\"Persona\" Support"
    subtitle="Automatic agent selection based on the task (Assistant, QA, Senior Engineer), with unlimited custom personas."
    icon="user-circle"
  >}}
  {{< hextra/feature-card
    title="Automatic Context"
    subtitle="Subagent-driven retrieval from past sessions, project code, and knowledge base with semantic search."
    icon="academic-cap"
  >}}
  {{< hextra/feature-card
    title="Smart Search"
    subtitle="AST syntax tree indexing via tree-sitter for multiple languages and RAG for semantic search."
    icon="magnifying-glass"
  >}}
  {{< hextra/feature-card
    title="Tool Integration"
    subtitle="AI can execute commands, search files and modify code directly."
    icon="cog"
  >}}
  {{< hextra/feature-card
    title="Integrated Tools"
    subtitle="Web search (Google, Perplexity, Brave, Exa), advanced fetch, and autonomous Chromium navigation."
    icon="wrench-screwdriver"
  >}}
  {{< hextra/feature-card
    title="Scheduled Tasks"
    subtitle="Scheduled tasks support. Use Pando or add it to your cronjob or Windows scheduler. Just write the prompt and when to run it."
    icon="calendar"
  >}}
  {{< hextra/feature-card
    title="Skills Support"
    subtitle="Extensible capabilities with catalog search and automatic updates."
    icon="sparkles"
  >}}
  {{< hextra/feature-card
    title="MCP Support"
    subtitle="Built-in MCP server to integrate with compatible editors and tools."
    icon="puzzle"
  >}}
  {{< hextra/feature-card
    title="MCP Gateway"
    subtitle="Integrate hundreds of MCP servers with intelligent selection and Lua-based filtering."
    icon="server"
  >}}
  {{< hextra/feature-card
    title="ACP Protocol"
    subtitle="Agent Client Protocol support — use Pando as an AI assistant in your favorite editor."
    icon="code"
  >}}
  {{< hextra/feature-card
    title="Customizable with Lua"
    subtitle="Hook into any Pando behavior and manage tool data flows with embedded Lua scripting."
    icon="variable"
  >}}
  {{< hextra/feature-card
    title="Isolated Execution"
    subtitle="Support for dev-containers (Docker, Podman) and a built-in embedded container system."
    icon="shield-check"
  >}}
  {{< hextra/feature-card
    title="Session Management"
    subtitle="Save and manage multiple conversations with SQLite persistence."
    icon="document-duplicate"
  >}}
  {{< hextra/feature-card
    title="Multi-project"
    subtitle="Manage multiple projects with their own configuration from a single instance."
    icon="briefcase"
  >}}
  {{< hextra/feature-card
    title="Built on Golang"
    subtitle="High performance and low resource footprint for a snappy experience."
    icon="bolt"
  >}}
{{< /hextra/feature-grid >}}
</div>
