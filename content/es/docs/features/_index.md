---
title: Características
weight: 3
---

## TUI Interactiva

Pando está construido con [Bubble Tea](https://github.com/charmbracelet/bubbletea), un framework para crear interfaces de usuario en terminal. Proporciona una experiencia fluida y responsiva directamente en tu terminal.

## Editor Vim-like e Integración de Editores

- **Editor Integrado**: Incluye un editor con atajos estilo Vim para componer mensajes y editar código sin salir de la TUI.
- **Editor Externo**: Soporte para abrir tu editor preferido (Neovim, Emacs, VS Code, etc.) para tareas de edición complejas.

## Aplicación de Escritorio Nativa y WebUI

Pando está disponible como una **Aplicación de Escritorio Nativa** premium para macOS y Windows, así como una **interfaz web y PWA** totalmente responsiva. Esto te permite interactuar con tus proyectos en una ventana independiente libre de distracciones, con notificaciones del sistema y multitarea, o acceder a él desde cualquier navegador en escritorio y móvil. Todos tus datos y tu base de datos privada permanecen seguros en tu máquina local.

## Proxy de Modelos Local

Pando puede transformar tu ordenador en una pasarela centralizada de Inteligencia Artificial. Al iniciar el servidor proxy local, Pando unifica todos tus proveedores de IA configurados (incluidos los modelos de tu suscripción de GitHub Copilot) y los expone a través de un único endpoint local compatible con otras herramientas de desarrollo de tu ecosistema.


## Gestión de Sesiones y Persistencia

- Guarda y recupera conversaciones anteriores de forma automática.
- Soporta múltiples sesiones simultáneas.
- Toda la información se almacena localmente en una base de datos SQLite para máxima privacidad y rendimiento.

## Integración de Herramientas (Tooling)

La IA puede ejecutar herramientas directamente en tu proyecto para potenciar el flujo de trabajo:
- **Ejecutar comandos**: Shell integrado para compilar, testear o ejecutar scripts.
- **Manipulación de archivos**: Lectura, escritura y búsqueda de archivos con confirmación del usuario.
- **Parches Atómicos**: Aplicación de cambios coordinados en múltiples archivos simultáneamente.
- **Búsqueda Web**: Integración con Google, Brave, Perplexity y Exa para obtener información actualizada en tiempo real.

## Navegación Web Interactiva

Pando puede interactuar con la web de manera avanzada:
- **Automatización de Navegador**: Navegar, hacer clic, rellenar formularios y ejecutar JavaScript.
- **Captura de Contenido**: Extracción de texto limpio de sitios complejos y generación de pantallazos o PDFs de páginas web.
- **Análisis de Red y Consola**: Acceso a logs de consola y tráfico de red para depuración de aplicaciones web.

## Model Context Protocol (MCP)

- **Cliente MCP**: Conéctate a cualquier servidor MCP para expandir las capacidades de Pando con herramientas de terceros.
- **Servidor MCP**: Pando puede funcionar como un servidor MCP (`pando mcp-server`), exponiendo sus herramientas internas (filesystem, terminal, navegador, búsqueda) a otros agentes o aplicaciones mediante transportes `stdio` y `HTTP`.

## Aislamiento y Contenedores

Pando soporta múltiples entornos de ejecución para mayor seguridad y reproducibilidad:
- **Ejecución Aislada**: Soporte nativo para ejecutar comandos y herramientas dentro de contenedores **Docker** o **Podman**.
- **Devcontainers**: Integración con entornos de desarrollo estandarizados.
- **Runtime Embebido**: Capacidad de ejecución controlada para minimizar efectos secundarios en el sistema host.

## Multiproveedor y Multicuenta

- **Soporte Amplio**: Compatible con Anthropic (Claude), OpenAI (GPT), Google (Gemini), AWS (Bedrock), Azure, Groq, Ollama, OpenRouter y el proveedor seguro **Antigravity**.
- **Gestión de Cuentas**: Permite configurar múltiples cuentas para un mismo proveedor y alternar entre ellas o entre diferentes modelos de forma instantánea.

## Indexación y RAG Automático

Pando entiende tu código y documentación mediante recuperación aumentada por generación (RAG):
- **Inyección de Contexto Automática**: El motor de enriquecimiento busca en paralelo en la base de conocimientos, el índice de código y eventos de sesiones pasadas para inyectar información relevante en cada prompt.
- **Indexación de Código**: Utiliza tree-sitter y embeddings para crear un mapa semántico de tu proyecto.
- **Base de Conocimiento (KB)**: Sincronización de documentación Markdown para una recuperación inteligente.

## Personas y Personalización

- **Soporte de Personas**: Define diferentes "personas" o perfiles de IA con instrucciones de sistema específicas. Pando puede alternar entre ellas para adaptarse a diferentes tareas (coding, review, doc, etc.).
- **Self-Improvement**: Herramientas integradas para la evaluación y auto-mejora de prompts basándose en métricas de rendimiento y éxito de las tareas.

## Orquestación de Agentes (Mesnada)

Pando incluye **Mesnada**, un potente sistema de delegación de agentes que te permite crear subagentes especializados para abordar tareas de programación complejas:

- **Multitarea en Segundo Plano Silenciosa**: Los subagentes trabajan simultáneamente en segundo plano mientras tú te concentras en tu código. Pando gestiona múltiples procesos en paralelo sin conflictos ni bloqueos de recursos.
- **Resiliencia con Auto-Reinicio**: Si un subagente experimenta una desconexión o fallo menor de red, Pando lo recupera y reinicia automáticamente para completar la tarea con éxito.
- **Creación Simplificada de Agentes**: Inicia y coordina agentes con un solo comando o desde la barra lateral de la interfaz.

## Inteligencia Contextual y LSP

- **Integración LSP**: Inteligencia de código en tiempo real con diagnósticos, errores y autocompletado informado por el Language Server Protocol.
- **Memoria de Eventos**: Registro de decisiones y observaciones importantes para su recuperación posterior.
- **Seguimiento de Cambios**: Visualización de diffs en tiempo real de todos los cambios realizados por la IA.

## Automatización y Hooks

- **Comandos Personalizados**: Define tus propios prompts reutilizables con soporte para argumentos mediante archivos Markdown.
- **Hooks en Lua**: Personaliza el comportamiento de Pando con scripts en Lua para automatizar flujos de trabajo específicos.
- **API REST y SSE**: Pando está totalmente "apificado", permitiendo su integración en otros flujos de trabajo mediante su API programática.

## Vulnerability Hunter

Flujo de auditoría de seguridad adversarial portado desde [VulnHunter de Capital One](https://github.com/capitalone/VulnHunter). Tres comandos slash proporcionan un flujo de seguridad completo:

- **`/vulnhunt`**: Auditoría de seguridad completa — recon, caza paralela de vulnerabilidades, verificación de explotabilidad y refutación adversarial.
- **`/vulnhunter-fix`**: Remediación basada en tests — prueba de exploit, test de seguridad fallido, fix y verificación sin regresiones.
- **`/vulnhunt-fix-verify`**: Verificación independiente de solo lectura de fixes reclamados con veredicto por hallazgo.

Los hallazgos se persisten en la base de conocimientos y pueden ser referenciados entre sesiones.

## Optimizaciones Internas de Herramientas

### Caché y Paginación de Respuestas de Tools

Cuando una herramienta devuelve una respuesta grande (por encima de los umbrales configurables de bytes o líneas), Pando intercepta automáticamente la respuesta antes de devolverla al LLM y la almacena en una **caché LRU por sesión**. En lugar de enviar el contenido completo al modelo — consumiendo tokens preciosos — se devuelve un resumen compacto con el identificador de caché, metadatos de tamaño y una previsualización inline con **numeración de línea**. El agente puede entonces usar la herramienta `cache_read` para recuperar páginas específicas del contenido cacheado según las necesite. Esto reduce drásticamente el consumo de tokens en respuestas de herramientas grandes como búsquedas extensas o lectura de archivos.

### Filtros Lua en el MCP Gateway (antes y después de tools)

Pando expone un **MCP Gateway** que centraliza las llamadas a herramientas de servidores MCP externos. Este gateway soporta **filtros escritos en Lua** que se ejecutan en dos puntos estratégicos:
- **Filtro de entrada (`<server-name>-input`)**: Se ejecuta justo antes de llamar a la herramienta, permitiendo modificar, sanitizar o enriquecer los parámetros de la invocación.
- **Filtro de salida (`<server-name>-output`)**: Se ejecuta inmediatamente después de recibir la respuesta de la herramienta, permitiendo transformar o limpiar el resultado antes de devolverlo al agente.

Si no existe un filtro específico para un servidor, se usa un filtro global de caída (`global-input` / `global-output`). Los filtros se ejecutan en un sandbox Lua con timeout configurable, y los módulos de shell/OS están explícitamente excluidos por seguridad.

### Motor de Hooks Lua en el Sistema de Prompts

Además de los filtros de herramientas, Pando dispone de un **sistema completo de hooks Lua** que se ejecutan en cada etapa de la composición del prompt del sistema:
- `hook_system_prompt` — Modificación final del prompt completo.
- `hook_session_start` / `hook_session_restore` — Eventos del ciclo de vida de la sesión.
- `hook_user_prompt` — Sanitización del mensaje del usuario antes de almacenarlo.
- `hook_agent_response_finish` — Notificación al finalizar la generación del modelo.
- `hook_template_section` — Modificación o eliminación de secciones individuales de la plantilla.
- `hook_capability_check` — Anulación de la detección automática de capacidades.
- `hook_provider_select` — Selección dinámica de plantilla de proveedor.
- `hook_prompt_compose` — Reordenación, adición o eliminación de secciones completas del prompt.

Los hooks se escriben en ficheros `.lua` y se cargan con recarga en caliente (`HotReload`), ideal para desarrollo iterativo. Incluyen funciones helper como `pando_get_config`, `pando_load_file` y `pando_list_mcp_servers`.

### Numeración de Línea al Leer Ficheros

La herramienta `view` renderiza el contenido de los ficheros con **numeración de línea automática** (padding a 6 dígitos), facilitando que el agente se refiera a líneas específicas en sus ediciones o explicaciones. Cuando el contenido supera el límite de visualización, se añade una nota indicando cuántas líneas adicionales existen y cómo usar el parámetro `offset` para continuar la lectura.

### Motor de Búsqueda de Alta Velocidad

Pando incorpora un **motor de búsqueda propio** (`internal/search`) optimizado para recorrer árboles de directorios con múltiples workers concurrentes (4 por defecto). Las características incluyen:
- **Escaneo concurrente**: Productor-consumidor con workers paralelos que procesan ficheros simultáneamente.
- **Omitir binarios**: Detección heurística de ficheros binarios (misma heurística que ripgrep) para evitar falsos positivos.
- **Ignorar ficheros**: Soporte nativo para `.gitignore` y `.pandoignore`, recorriendo la jerarquía de directorios hasta la raíz.
- **Filtros por tipo**: Búsqueda restringida a extensiones de lenguaje específicas (`type: go`, `type: ts`, etc.).
- **Contexto alrededor del match**: Parámetros `before` y `after` para líneas de contexto, con buffer circular para eficiencia.
- **Caché de expresiones regulares**: Las regex se compilan una sola vez y se reutilizan durante toda la sesión mediante `sync.Map`.
- **Multilínea**: Soporte para patrones que abarcan múltiples líneas cargando el fichero completo.
- **Paginación nativa**: Los resultados se ordenan por fecha de modificación (más recientes primero) y soportan `offset` y `head_limit` para navegar por páginas de resultados.

Esta capa de búsqueda interna está totalmente separada de las herramientas de búsqueda web, operando exclusivamente sobre el sistema de ficheros local para máxima velocidad y privacidad.
