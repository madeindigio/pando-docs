---
title: Configuración de Remembrances
weight: 30
---

Todas las opciones de la memoria, la base de conocimiento, el índice de código y el enriquecimiento de contexto. Para saber qué son, lee [Memoria persistente]({{< relref "/docs/features/persistent-memory" >}}) y [Enriquecimiento de contexto]({{< relref "/docs/features/context-enrichment" >}}). Para configurarlo paso a paso en la Web UI, sigue la guía [Enseña tu proyecto a Pando]({{< relref "/guides/remembrances" >}}).

Todas las claves van en `.pando.toml` (proyecto) o `~/.pando.toml` (global). En la Web UI están en **Configuración > Remembrances**.

{{< shot src="images/webui/pando-webui-settings-remembrances.jpg" alt="Ajustes de Remembrances: sincronización de la base de conocimiento" >}}

## Ajustes de memoria

```toml
[Remembrances]
# Enable persistent memory system
MemoryEnabled = true

# Inject memories into context automatically
MemoryContextEnrichmentEnabled = true

# Max memories injected per prompt
MemoryContextMaxItems = 3

# Max characters for memory block (0 = unlimited)
MemoryContextMaxChars = 0

# Default TTL for memories in days (0 = 180 days)
MemoryDefaultTTLDays = 0

# Garbage collection interval
MemoryGCInterval = ''

# Auto-capture conversations as memories
MemoryAutoCapture = false

# Scopes exempt from garbage collection
MemoryPinnedScopes = []
```

| Etiqueta en la Web UI | Clave |
|---|---|
| Memory enabled | `MemoryEnabled` |
| Auto-inject in context | `MemoryContextEnrichmentEnabled` |
| Context max items | `MemoryContextMaxItems` |
| Context max chars | `MemoryContextMaxChars` |
| Default TTL (days) | `MemoryDefaultTTLDays` |
| GC interval | `MemoryGCInterval` |

### Herramientas de memoria

El agente guarda y lee memorias con tres herramientas. También quedan disponibles para otros programas cuando Pando funciona como servidor MCP (`pando mcp-server`).

`remember` guarda o actualiza una memoria:

```json
{
  "content": "The user prefers TypeScript over JavaScript for new projects",
  "key": "user.preferred_lang",
  "scope": "user/",
  "importance": 0.8
}
```

| Parámetro | Descripción |
|-----------|-------------|
| `content` | El dato o la preferencia que hay que recordar |
| `key` | Clave opcional de actualización (la misma clave sustituye a la memoria anterior) |
| `scope` | Prefijo opcional: `user/`, `project/`, `session/` |
| `importance` | Peso para el orden de inyección, 0.0–1.0 (por defecto 0.5) |
| `ttl_days` | Sustituye la caducidad por defecto (180 días) |

`recall` busca en las memorias guardadas. Los resultados se ordenan por relevancia, antigüedad y frecuencia de uso; cada consulta suma un acierto y alarga la caducidad.

```json
{
  "query": "user language preference",
  "scope": "user/",
  "limit": 5
}
```

`forget` borra una memoria:

```json
{
  "key": "user.preferred_lang"
}
```

Las memorias inyectadas llegan al prompt de sistema en un bloque `<memories>`, ordenadas por antigüedad, parecido semántico, frecuencia de uso e importancia. Un recolector en segundo plano borra las memorias caducadas.

Las claves descriptivas, como `user/preferences/language` o `project/architecture/decisions`, mantienen las memorias ordenadas, y los prefijos permiten búsquedas dirigidas.

## Ajustes de la base de conocimiento

{{< shot src="images/webui/pando-webui-settings-remembrances-document-embeddings.jpg" alt="Ajustes de embeddings de documentos" >}}

```toml
[Remembrances]
# Sync directory for KB documents
KBPath = ''

# Number of parallel sync workers (2-8)
IndexWorkers = 4

# Enable filesystem mirror for KB documents
FilesystemMirror = false
```

La Web UI ofrece además los interruptores **Watch KB path**, **Auto import on startup**, **Convert documents** y **Wiki links**, el proveedor, el modelo, la URL base y la clave de API de los embeddings de documentos y de código, y **Chunk size**, **Chunk overlap** e **Index workers** en **Chunking**.

## Ajustes de enriquecimiento de contexto

{{< shot src="images/webui/pando-webui-settings-remembrances-chunking-context.jpg" alt="Ajustes de troceado, indexado de código y enriquecimiento de contexto" >}}

```toml
[Remembrances]
# Enable automatic context enrichment
ContextEnrichmentEnabled = false

# KB search results
ContextEnrichmentKBResults = 2
ContextEnrichmentKBMaxChars = 0

# Code search results
ContextEnrichmentCodeResults = 5
ContextEnrichmentCodeProject = 'pando'
ContextEnrichmentCodeMaxChars = 0

# Events search results
ContextEnrichmentEventsResults = 5
ContextEnrichmentEventsMaxChars = 0

# Global settings
ContextEnrichmentMinScore = 0.0
ContextEnrichmentTotalMaxChars = 0

# Planner selection
ContextEnrichmentUseAgentPlanner = false
ContextEnrichmentPlannerFallbackToCoder = false
```

### Cómo se enriquece un mensaje

1. **Planificación de la consulta**: un planificador analiza el mensaje del usuario.
2. **Búsqueda en paralelo**: se busca a la vez en la base de conocimiento, el índice de código y los eventos pasados.
3. **Filtro por puntuación**: se descartan los resultados por debajo de `ContextEnrichmentMinScore`.
4. **Inyección de contexto**: lo que queda se antepone al mensaje del usuario.

### Planificadores

- **Planificador heurístico** (por defecto): extrae palabras clave y patrones para decidir en qué fuentes buscar. Rápido y determinista.
- **Planificador con LLM** (`ContextEnrichmentUseAgentPlanner = true`): una llamada a un modelo barato elige la estrategia de búsqueda. Más preciso, con algo más de latencia y coste de tokens.

### Enriquecimiento como bucle de agente

{{< shot src="images/webui/pando-webui-settings-remembrances-context-enrichment.jpg" alt="Ajustes del bucle de enriquecimiento y del filtro de relevancia" >}}

Un pequeño agente dedicado consulta la memoria, la base de conocimiento, los eventos pasados y el índice de código en varias rondas y devuelve un único bloque de contexto ya terminado. Funciona con su propio modelo:

```toml
[Agents.context-enricher]
Model = 'openrouter.some-cheap-model'

[Remembrances]
ContextEnrichmentAgentLoopEnabled        = true
ContextEnrichmentAgentLoopTimeoutSeconds = 60      # bound for one run
ContextEnrichmentAgentLoopMaxChars       = 6000    # cap on the injected context
ContextEnrichmentAgentLoopEveryMessage   = false   # true = every turn, not only session start
```

- Por defecto solo se ejecuta en el primer mensaje de la sesión.
- El chat muestra `🧠 Context enrichment agent gathering project context...` y después cuánto contexto añadió.
- La ejecución aparece como una sesión hija del chat; su coste se suma a la sesión padre.
- Si se le agota el tiempo o no devuelve nada, se recurre a la búsqueda de un solo paso.
- El agente se prepara en segundo plano mientras arranca Pando, así que el primer mensaje no lo espera.

Interruptores de la Web UI: **Agent loop enrichment**, **Loop timeout (s)**, **Loop max chars**, **Run on every message**, **Announce in chat**, **Fallback to search**, **Show loop in chat**. También disponible en la TUI (Remembrances → Context Enrichment).

### Filtro de relevancia con el modelo de decisión

Un [modelo de decisión]({{< relref "/docs/configuration/auto-mode" >}}) puede descartar los fragmentos recuperados que no vienen al caso antes de inyectarlos. Si no está disponible, el contexto se inyecta sin filtrar. Campos de la Web UI: **Filtrar el contexto recuperado con el modelo de decisión**, **Filtrar las memorias inyectadas con el modelo de decisión**, **Umbral de relevancia** (0–1, por defecto 0.6), **Máx. de candidatos**, **Máx. de caracteres por candidato**, **Permitir proveedores de decisión alojados** (desactivado: solo filtran proveedores locales, así los fragmentos no salen de tu equipo).

### Perfil de contexto

El recortador de contexto clasifica cada mensaje del usuario para poder saltarse las secciones del prompt que no vienen al caso:

```json
{
  "task_type": "code|debug|refactor|explain|test|search|general",
  "relevant_tool_names": ["tool1", "tool2"],
  "skip_sections": ["capabilities/web_search"],
  "confidence": 0.85
}
```

## Ajustes del índice de código

Qué modelo usar para el código, y por qué conviene que sea distinto del de documentos: [Modelos de embeddings para código]({{< relref "/docs/configuration/embedding-models" >}}).

{{< shot src="images/webui/pando-webui-settings-remembrances-code-embeddings.jpg" alt="Ajustes de embeddings de código" >}}

```toml
[Remembrances]
# Auto-index code on startup
CodeIndexAutoStart = true

# Languages to index (empty = all)
CodeIndexLanguages = []
```

## Ajustes de descubrimiento de herramientas

Se explica en [Descubrimiento de herramientas]({{< relref "/docs/features/tool-discovery" >}}).

```toml
[ToolDiscovery]
Enabled = true
Mode = 'auto'            # 'auto', 'always', or 'off'
MaxDirectTools = 64
SearchLimit = 8
NonDeferredTools = []
DeferredSources = []
```

## Referencia relacionada

- Navegador y demás herramientas integradas: [referencia de herramientas]({{< relref "/docs/configuration/tools" >}}).
- El bloque `[evaluator]`: [referencia de automejora]({{< relref "/docs/configuration/self-improvement" >}}).
