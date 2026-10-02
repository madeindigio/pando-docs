---
title: Características
weight: 3
---

Pando toma su nombre de un bosque de Utah que parece miles de árboles y en realidad es una sola planta, unida bajo tierra por sus raíces. El asistente funciona igual: arriba ves un chat; debajo, la memoria, los ayudantes y las herramientas comparten las mismas raíces.

Esta sección **explica** cada parte: qué es, qué te aporta y cuándo merece la pena usarla. Cuando quieras ponerla en marcha, cada página te lleva a la [guía]({{< relref "/guides" >}}) que te acompaña clic a clic, y a la [referencia]({{< relref "/docs/configuration" >}}) con el nombre exacto de cada opción.

## 表 Superficie: lo que tocas

Los troncos que asoman. Distintas puertas al mismo asistente: elige la que mejor te venga en cada momento, tus conversaciones te siguen.

| Característica | En una línea |
|---|---|
| [Web UI y PWA]({{< relref "/docs/features/web-ui" >}}) | Pando en una pestaña del navegador, en el ordenador o en el móvil. |
| [App de escritorio nativa]({{< relref "/docs/features/desktop-app" >}}) | Las mismas pantallas en su propia ventana, con icono en la bandeja. |
| [Asistente de configuración]({{< relref "/docs/features/setup-assistant" >}}) | Una bienvenida corta que te deja listo para chatear en cinco pasos. |
| [Espacios de proyecto]({{< relref "/docs/features/project-workspaces" >}}) | Varios proyectos abiertos a la vez, cada uno en su pestaña. |
| [Acceso a la WebUI]({{< relref "/docs/features/webui-access" >}}) | Un cerrojo en la puerta cuando abres Pando a otros dispositivos. |
| [Design Studio]({{< relref "/docs/features/design-studio" >}}) | Pide una landing o una presentación y mira cómo toma forma. |
| [Interfaz de terminal]({{< relref "/docs/features/terminal-interface" >}}) | La versión de teclado, para quien vive en una terminal. |
| [Mejoras de la TUI]({{< relref "/docs/features/tui-enhancements" >}}) | Las comodidades de la versión de terminal: pestañas, temas, selector de ficheros. |
| [Interfaz de línea de comandos]({{< relref "/docs/features/cli" >}}) | Una pregunta, una respuesta, sin ventana. Útil para scripts. |
| [Comandos slash]({{< relref "/docs/features/slash-commands" >}}) | Atajos que escribes con `/` para pedir tareas habituales. |
| [Preguntas interactivas]({{< relref "/docs/features/ask-user-question" >}}) | Cuando Pando duda, te pregunta con botones en vez de adivinar. |
| [Feedback rápido del usuario]({{< relref "/docs/features/steering" >}}) | Corrige el rumbo mientras Pando sigue trabajando. |
| [Modo aprendizaje]({{< relref "/docs/features/learning-mode" >}}) | Pando explica sobre la marcha, como un compañero paciente. |
| [Modo cavernícola]({{< relref "/docs/features/caveman-mode" >}}) | Respuestas cortas, sin relleno. Más baratas y rápidas de leer. |

## 根 Raíces: lo que trabaja sin verse

Bajo la superficie, tres cosas mantienen vivo el bosque: cómo piensa Pando, qué recuerda y a quién le pasa trabajo.

### 木 Pando: cómo piensa

| Característica | En una línea |
|---|---|
| [Goal Mode]({{< relref "/docs/features/goal-mode" >}}) | Dale un destino y deja que conduzca hasta llegar. |
| [Modo automático de modelos]({{< relref "/docs/features/model-auto-mode" >}}) | Un recepcionista que manda cada pregunta al modelo de IA adecuado. |
| [Modelo de decisión]({{< relref "/docs/features/decision-model" >}}) | Los reflejos de Pando: un modelo diminuto para las decisiones rápidas. |
| [Pensamiento y esfuerzo de razonamiento]({{< relref "/docs/features/reasoning-modes" >}}) | Decide cuánto piensa Pando antes de contestar. |
| [Modo Superpowers]({{< relref "/docs/features/superpowers-mode" >}}) | Primero el plan, luego la obra: un plan escrito antes de tocar código. |
| [Descubrimiento de herramientas]({{< relref "/docs/features/tool-discovery" >}}) | Pando deja casi todas las herramientas en el cajón y saca solo la que necesita. |

### 本 Remembrances: qué recuerda

| Característica | En una línea |
|---|---|
| [Memoria persistente]({{< relref "/docs/features/persistent-memory" >}}) | Una libreta que Pando conserva entre conversaciones. |
| [Enriquecimiento de contexto]({{< relref "/docs/features/context-enrichment" >}}) | Antes de responder, Pando consulta lo que ya sabe de tu proyecto. |
| [Búsqueda de código por significado]({{< relref "/docs/features/code-embeddings" >}}) | Un bibliotecario formado en código: Pando encuentra funciones por lo que hacen. |
| [Compactación de sesión]({{< relref "/docs/features/session-compaction" >}}) | Una conversación larga plegada en un resumen para poder seguir. |
| [Agent VCS]({{< relref "/docs/features/agent-vcs" >}}) | Un diario de lo que cambió cada conversación, para leerlo y recuperar tu código. |

### 众 Mesnada: con quién trabaja

| Característica | En una línea |
|---|---|
| [Delegación y orquestación de agentes]({{< relref "/docs/features/agent-delegation" >}}) | Una cuadrilla de ayudantes que cogen tareas en paralelo. |
| [Autoservicio del agente]({{< relref "/docs/features/pando-setup-tool" >}}) | Pídele a Pando que cambie sus propios ajustes en vez de abrir menús. |
| [Sistema de automejora]({{< relref "/docs/features/self-improvement" >}}) | Pando repasa su trabajo terminado y aprende de tus correcciones. |

## 土 Suelo: de lo que se alimenta

La tierra de la que todo se nutre: los modelos de IA, las herramientas que Pando puede coger y las vallas que lo mantienen seguro.

### Modelos de IA

Pando funciona con Anthropic (Claude), OpenAI, Google Gemini, AWS Bedrock, Azure, Groq, xAI, Ollama, OpenRouter, GitHub Copilot y cualquier servicio que hable el formato de OpenAI. Puedes tener varias cuentas y cambiar de modelo en mitad de una conversación.

| Característica | En una línea |
|---|---|
| [GitHub Copilot Auth]({{< relref "/docs/features/copilot-auth" >}}) | Aprovecha la suscripción de Copilot que ya pagas. |
| [Proxy LLM local]({{< relref "/docs/features/llm-proxy" >}}) | Presta tus cuentas de IA a tus otras herramientas desde una sola dirección local. |

### Conexiones

| Característica | En una línea |
|---|---|
| [MCP]({{< relref "/docs/mcp" >}}) | Regletas para herramientas extra: enchufas un servidor y ganas habilidades. |
| [Autenticación de servidores MCP]({{< relref "/docs/features/mcp-authentication" >}}) | Cómo enseña Pando su carné a los servidores de herramientas que lo piden. |
| [ACP]({{< relref "/docs/acp" >}}) | Pando dentro de tu editor de código: Zed, VS Code, JetBrains, Xcode. |
| [AG-UI para aplicaciones web]({{< relref "/docs/features/agui" >}}) | Mete un chat de Pando en tu propia página web. |
| [Autoactivación de LSP]({{< relref "/docs/features/lsp-auto-activation" >}}) | Pando toma prestado el corrector ortográfico de código de tu editor. |
| [Comunicación entre procesos]({{< relref "/docs/features/ipc" >}}) | Varias ventanas de Pando que se hablan entre sí y se mantienen al día. |

### Manos

| Característica | En una línea |
|---|---|
| [Automatización del navegador]({{< relref "/docs/features/browser-automation" >}}) | Pando abre páginas web, hace clic y las lee por ti. |
| [Control del escritorio]({{< relref "/docs/features/desktop-controller" >}}) | Pando puede ver y usar las aplicaciones de tu escritorio. |
| [Conversión de documentos]({{< relref "/docs/features/markitdown" >}}) | PDF, Word y Excel convertidos en texto que Pando puede leer. |

La búsqueda web con Google, Brave, Perplexity y Exa viene de serie: añades una clave y Pando puede consultar cosas.

### Ampliar

| Característica | En una línea |
|---|---|
| [Extensiones]({{< relref "/docs/features/extensions" >}}) | Complementos para equipos que necesitan que Pando haga algo propio. |
| [Ponytail Skill]({{< relref "/docs/features/ponytail" >}}) | Un reglamento que evita que Pando construya más de lo que pediste. |

Las skills (fichas de receta que Pando sigue para un tipo de trabajo), los comandos propios y los scripts en Lua también viven aquí. Mira la guía [Escribe tu primera skill]({{< relref "/guides/first-skill" >}}).

### Confianza

| Característica | En una línea |
|---|---|
| [Sandbox de comandos]({{< relref "/docs/features/sandbox" >}}) | Un parque infantil: los comandos del agente no pueden salir de tu proyecto. |
| [Cifrado AGE]({{< relref "/docs/configuration/age-encryption" >}}) | Tus claves y contraseñas guardadas en una caja con llave. |
| [Certificados HTTPS automáticos]({{< relref "/docs/features/https-auto-cert" >}}) | El candado de la barra de direcciones, puesto por ti. |

Hay soporte para contenedores Docker y Podman, para quien quiera al agente en una habitación aparte. Mira [Aísla el trabajo en dev containers]({{< relref "/guides/dev-containers" >}}).

### El día a día

| Característica | En una línea |
|---|---|
| [Instaladores multiplataforma]({{< relref "/docs/features/installers" >}}) | Una descarga para macOS, Linux y Windows. |
| [Autoactualización]({{< relref "/docs/features/self-update" >}}) | Pando se actualiza solo con un comando. |
| [Diagnóstico remoto]({{< relref "/docs/features/remote-diagnostics" >}}) | Una caja negra que enciendes cuando informas de un problema. |
| [Compactación de la base de datos]({{< relref "/docs/features/db-compact" >}}) | Una limpieza de primavera para el almacén de Pando. |
| [Descubrimiento de configuración]({{< relref "/docs/features/config-discovery" >}}) | Cómo encuentra Pando tus ajustes, lo arranques donde lo arranques. |

## También en cada sesión

- **Tus conversaciones se guardan.** Cada sesión queda en tu ordenador y puedes retomarla después, desde cualquiera de las superficies.
- **Personas.** Pando puede ponerse distintos sombreros (asistente, ingeniero de software, QA…) y cambiar entre ellos, a mano o por su cuenta.
- **Pregunta antes de actuar.** Ejecutar un comando o cambiar un fichero necesita tu visto bueno, salvo que el sandbox lo haga seguro o lo hayas permitido.
- **Ves cada cambio.** Los ficheros que tocó el agente aparecen junto al chat, con el antes y el después.
- **Todo se queda en local.** Conversaciones, memoria y ajustes viven en tu máquina.

¿Curiosidad por la maquinaria? En [Bajo el capó]({{< relref "/docs/configuration/under-the-hood" >}}) están las notas técnicas.
