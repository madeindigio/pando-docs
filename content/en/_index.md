---
title: Pando
layout: hextra-home
---

{{< hextra/hero-badge >}}
  <div class="hx-w-2 hx-h-2 hx-rounded-full hx-bg-primary-400"></div>
  <span>Free, open source</span>
  {{< icon name="arrow-circle-right" attributes="height=14" >}}
{{< /hextra/hero-badge >}}

<div class="hx-mt-8 hx-mb-2 hx-flex hx-justify-start">
  <img src="/images/pando-logo.svg" alt="Pando" class="pando-home-logo" width="180" height="203" />
</div>

<div class="hx-mt-6 hx-mb-6">
{{< hextra/hero-headline >}}
  AI assistant in your terminal
{{< /hextra/hero-headline >}}
</div>

<div class="hx-mb-10">
{{< hextra/hero-subtitle >}}
  Pando is a powerful terminal-based AI assistant for developers.&nbsp;<br class="sm:hx-block hx-hidden" />Extensible and with support for multiple AI providers.
{{< /hextra/hero-subtitle >}}
</div>

<div class="hx-mb-12 hx-flex hx-flex-wrap hx-gap-4">
{{< hextra/hero-button text="Get Started" link="docs/getting-started" >}}
{{< hextra/hero-button text="GitHub" link="https://github.com/digiogithub/pando" style="outline" >}}
</div>

<div class="hx-mt-4">
{{< hextra/feature-grid >}}
  {{< hextra/feature-card
    title="Interactive TUI"
    subtitle="Terminal UI built with Bubble Tea for a smooth developer experience."
    icon="terminal"
  >}}
  {{< hextra/feature-card
    title="Multiple AI Providers"
    subtitle="Support for OpenAI, Anthropic Claude, Google Gemini, AWS Bedrock, Groq, Azure and OpenRouter."
    icon="chip"
  >}}
  {{< hextra/feature-card
    title="Session Management"
    subtitle="Save and manage multiple conversations with SQLite persistence."
    icon="document-duplicate"
  >}}
  {{< hextra/feature-card
    title="Tool Integration"
    subtitle="AI can execute commands, search files and modify code directly."
    icon="cog"
  >}}
  {{< hextra/feature-card
    title="MCP Support"
    subtitle="Built-in MCP server to integrate with compatible editors and tools."
    icon="puzzle"
  >}}
  {{< hextra/feature-card
    title="ACP Protocol"
    subtitle="Agent Client Protocol support — use Pando as an AI assistant in your favorite editor."
    icon="code"
  >}}
{{< /hextra/feature-grid >}}
</div>
