---
title: Bajo el capó
weight: 90
---

Notas técnicas sobre cómo funcionan algunas piezas internas de Pando. No necesitas nada de esto para usarlo; está aquí para curiosos y para quien escriba hooks en Lua. Para el recorrido en lenguaje llano, mira [Características]({{< relref "/docs/features" >}}).

## Caché y Paginación de Respuestas de Tools

Cuando una herramienta devuelve una respuesta grande (por encima de los umbrales configurables de bytes o líneas), Pando intercepta automáticamente la respuesta antes de devolverla al LLM y la almacena en una **caché LRU por sesión**. En lugar de enviar el contenido completo al modelo — consumiendo tokens preciosos — se devuelve un resumen compacto con el identificador de caché, metadatos de tamaño y una previsualización inline con **numeración de línea**. El agente puede entonces usar la herramienta `cache_read` para recuperar páginas específicas del contenido cacheado según las necesite. Esto reduce drásticamente el consumo de tokens en respuestas de herramientas grandes como búsquedas extensas o lectura de archivos.

## Filtros Lua en el MCP Gateway (antes y después de tools)

Pando expone un **MCP Gateway** que centraliza las llamadas a herramientas de servidores MCP externos. Este gateway soporta **filtros escritos en Lua** que se ejecutan en dos puntos estratégicos:
- **Filtro de entrada (`<server-name>-input`)**: Se ejecuta justo antes de llamar a la herramienta, permitiendo modificar, sanitizar o enriquecer los parámetros de la invocación.
- **Filtro de salida (`<server-name>-output`)**: Se ejecuta inmediatamente después de recibir la respuesta de la herramienta, permitiendo transformar o limpiar el resultado antes de devolverlo al agente.

Si no existe un filtro específico para un servidor, se usa un filtro global de caída (`global-input` / `global-output`). Los filtros se ejecutan en un sandbox Lua con timeout configurable, y los módulos de shell/OS están explícitamente excluidos por seguridad.

## Motor de Hooks Lua en el Sistema de Prompts

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

## Numeración de Línea al Leer Ficheros

La herramienta `view` renderiza el contenido de los ficheros con **numeración de línea automática** (padding a 6 dígitos), facilitando que el agente se refiera a líneas específicas en sus ediciones o explicaciones. Cuando el contenido supera el límite de visualización, se añade una nota indicando cuántas líneas adicionales existen y cómo usar el parámetro `offset` para continuar la lectura.

## Motor de Búsqueda de Alta Velocidad

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
