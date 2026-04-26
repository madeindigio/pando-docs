---
title: Pando
layout: hextra-home
---

{{< hextra/hero-badge >}}
  <div class="hx-w-2 hx-h-2 hx-rounded-full hx-bg-primary-400"></div>
  <span>Libre, de código abierto</span>
  {{< icon name="arrow-circle-right" attributes="height=14" >}}
{{< /hextra/hero-badge >}}

<div class="hx-mt-8 hx-mb-2 hx-flex hx-justify-start">
  <img src="/images/pando-logo.svg" alt="Pando" class="pando-home-logo" width="180" height="203" />
</div>

<div class="hx-mt-6 hx-mb-6">
{{< hextra/hero-headline >}}
  Asistente IA en tu terminal
{{< /hextra/hero-headline >}}
</div>

<div class="hx-mb-10">
{{< hextra/hero-subtitle >}}
  Pando es un asistente de IA basado en terminal para desarrolladores.&nbsp;<br class="sm:hx-block hx-hidden" />Potente, extensible y con soporte para múltiples proveedores de IA.
{{< /hextra/hero-subtitle >}}
</div>

<div class="hx-mb-12 hx-flex hx-flex-wrap hx-gap-4">
{{< hextra/hero-button text="Comenzar" link="docs/getting-started" >}}
{{< hextra/hero-button text="GitHub" link="https://github.com/digiogithub/pando" style="outline" >}}
</div>

<div class="hx-mt-4">
{{< hextra/feature-grid >}}
  {{< hextra/feature-card
    title="TUI Interactiva"
    subtitle="Interfaz de usuario en terminal construida con Bubble Tea para una experiencia fluida."
    icon="terminal"
  >}}
  {{< hextra/feature-card
    title="Múltiples Proveedores IA"
    subtitle="Soporte para OpenAI, Anthropic Claude, Google Gemini, AWS Bedrock, Groq, Azure y OpenRouter."
    icon="chip"
  >}}
  {{< hextra/feature-card
    title="Gestión de Sesiones"
    subtitle="Guarda y gestiona múltiples conversaciones con persistencia en SQLite."
    icon="document-duplicate"
  >}}
  {{< hextra/feature-card
    title="Integración de Herramientas"
    subtitle="La IA puede ejecutar comandos, buscar archivos y modificar código directamente."
    icon="cog"
  >}}
  {{< hextra/feature-card
    title="Soporte MCP"
    subtitle="Servidor MCP integrado para integrarse con editores y herramientas compatibles."
    icon="puzzle"
  >}}
  {{< hextra/feature-card
    title="Protocolo ACP"
    subtitle="Soporte para el Agent Client Protocol, úsalo como asistente en tu editor favorito."
    icon="code"
  >}}
{{< /hextra/feature-grid >}}
</div>
