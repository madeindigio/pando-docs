---
title: Pando
layout: hextra-home
---

<div class="hx:mt-10 hx:mb-2 hx:flex hx:items-start hx:justify-between hx:flex-col hx:sm:flex-row hx:w-full">
<img src="https://raw.githubusercontent.com/madeindigio/pando-docs/refs/heads/main/static/images/pando_mascot.svg" alt="Pando" class="pando-home-logo" width="180" height="203" />
<div class="hx:mt-4 hx:sm:mt-0">
{{< hextra/hero-badge link="https://github.com/digiogithub/pando?tab=MIT-1-ov-file#readme" >}}
<div class="hx-w-2 hx-h-2 hx-rounded-full hx-bg-primary-400"></div>
<span>Libre, de código abierto</span>
{{< icon name="arrow-circle-right" attributes="height=14" >}}
{{< /hextra/hero-badge >}}
</div>
</div>

<div class="hx-mt-6 hx-mb-6">
{{< hextra/hero-headline >}}
  Asistente AI multimodal avanzado
{{< /hextra/hero-headline >}}
</div>
<p>&nbsp;</p>
<div class="hx-mb-10">
{{< hextra/hero-subtitle >}}
  Pando es un asistente de AI multiplataforma avanzado.&nbsp;<br class="sm:hx-block hx-hidden" />Potente, extensible y con soporte para múltiples modos de trabajo.&nbsp;<br class="sm:hx-block hx-hidden" />Proporciona máxima flexibilidad para la completa automatización.
{{< /hextra/hero-subtitle >}}
</div>
<p>&nbsp;</p>
<div class="hx-mb-12 hx-flex hx-flex-wrap hx-gap-4">
{{< hextra/hero-button text="Comenzar" link="docs/getting-started" >}}
{{< hextra/hero-button text="GitHub" link="https://github.com/digiogithub/pando" style="outline" >}}
</div>

<p>&nbsp;</p>
<div class="hx-mt-20">
{{< hextra/feature-grid >}}
  {{< hextra/feature-card
    title="TUI Interactiva"
    subtitle="Interfaz de usuario en terminal construida con Bubble Tea para una experiencia fluida."
    icon="desktop-computer"
  >}}
  {{< hextra/feature-card
    title="Asistente CLI"
    subtitle="Puede sugerir o ejecutar comandos de shell con un simple prompt con `pando cli-assist <prompt>`"
    icon="terminal"
  >}}
  {{< hextra/feature-card
    title="WebUI PWA"
    subtitle="Instalable como aplicación, embebido y accesible desde desktop y móvil."
    icon="device-tablet"
  >}}
  {{< hextra/feature-card
    title="Múltiples Proveedores IA"
    subtitle="Soporte para OpenAI, Anthropic Claude, Google Gemini, AWS Bedrock, Groq, Azure y OpenRouter."
    icon="chip"
  >}}
  {{< hextra/feature-card
    title="Orquestación de Subagentes"
    subtitle="Soporta los principales Agentes AI: OpenCode, Github Copilot, Gemini Cli, Claude Code y cualquier agente con soporte ACP."
    icon="cube"
  >}}
  {{< hextra/feature-card
    title="Soporte de \"Persona\""
    subtitle="Selección automática según la tarea (Asistente, QA, Senior Engineer), con personas personalizadas ilimitadas."
    icon="user-circle"
  >}}
  {{< hextra/feature-card
    title="Contexto Automático"
    subtitle="Un subagente obtiene información previa de sesiones, código del proyecto y knowledge base."
    icon="academic-cap"
  >}}
  {{< hextra/feature-card
    title="Búsqueda Inteligente"
    subtitle="Indexación AST con tree-sitter para múltiples lenguajes y RAG para búsqueda semántica."
    icon="magnifying-glass"
  >}}
  {{< hextra/feature-card
    title="Integración de Herramientas"
    subtitle="La IA puede ejecutar comandos, buscar archivos y modificar código directamente."
    icon="cog"
  >}}
  {{< hextra/feature-card
    title="Tools Integradas"
    subtitle="Búsqueda web (Google, Perplexity, Brave, Exa), fetch avanzado y navegación autónoma con Chromium."
    icon="wrench-screwdriver"
  >}}
  {{< hextra/feature-card
    title="Tareas Programadas"
    subtitle="Soporte para tareas programadas. Puedes usar Pando o añadirlo a tu cronjob y sistema de tareas en Windows. Sólo escribe el prompt y cuándo ejecutarlo."
    icon="calendar"
  >}}
  {{< hextra/feature-card
    title="Soporte de Skills"
    subtitle="Capacidades extensibles con búsqueda sobre catálogo y actualización automática."
    icon="sparkles"
  >}}
  {{< hextra/feature-card
    title="Soporte MCP"
    subtitle="Servidor MCP integrado para conectarse con editores y herramientas compatibles."
    icon="puzzle"
  >}}
  {{< hextra/feature-card
    title="MCP Gateway"
    subtitle="Integra cientos de servidores MCP con selección inteligente y filtrado a través de Lua."
    icon="server"
  >}}
  {{< hextra/feature-card
    title="Protocolo ACP"
    subtitle="Soporte para el Agent Client Protocol, úsalo como asistente en tu editor favorito."
    icon="code"
  >}}
  {{< hextra/feature-card
    title="Personalizable con Lua"
    subtitle="Capaz de establecer hooks a cualquier comportamiento de Pando y gestionar flujos de datos."
    icon="variable"
  >}}
  {{< hextra/feature-card
    title="Ejecución Aislada"
    subtitle="Compatible con Docker, Podman y sistema propio de contenedores embebido."
    icon="shield-check"
  >}}
  {{< hextra/feature-card
    title="Gestión de Sesiones"
    subtitle="Guarda y gestiona múltiples conversaciones con persistencia en SQLite."
    icon="document-duplicate"
  >}}
  {{< hextra/feature-card
    title="Multiproyecto"
    subtitle="Desde una sola instancia puedes manejar múltiples proyectos con su propia configuración."
    icon="briefcase"
  >}}
  {{< hextra/feature-card
    title="Basado en Golang"
    subtitle="Gran velocidad y poco consumo de recursos para una experiencia ágil."
    icon="bolt"
  >}}
{{< /hextra/feature-grid >}}
</div>
