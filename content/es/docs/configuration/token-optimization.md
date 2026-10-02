---
title: Optimización de Tokens
weight: 12
---

Referencia de los ajustes que recortan lo que Pando envía al modelo. Paso a paso: [Ahorra tokens]({{< relref "/guides/save-tokens" >}}). Relacionado: [Descubrimiento de herramientas]({{< relref "/docs/features/tool-discovery" >}}).

Todos son a prueba de fallos: si una lectura comprimida fuera a gastar más tokens que la original, Pando envía la original.

{{< shot src="images/webui/pando-webui-settings-token-optimization.jpg" alt="Ajustes de optimización de tokens" >}}

## `[TokenOptimization]`

```toml
[TokenOptimization]
ReadModeDefault = "full"         # full | auto | signatures | map
ReadDedupDisabled = false        # true sends unchanged re-reads again in full
ReadModeLearning = false         # extra learning layer for auto mode
BuildCodeGraph = true            # record file relationships while indexing
RelatedFilesHint = false         # add a short list of related files to reads and searches
SavingsLedgerDisabled = false    # true stops recording savings
```

```json
{
  "tokenOptimization": {
    "readModeDefault": "full",
    "readDedupDisabled": false,
    "readModeLearning": false,
    "buildCodeGraph": true,
    "relatedFilesHint": false,
    "savingsLedgerDisabled": false
  }
}
```

| Ajuste (nombre en la Web UI) | Clave | Por defecto | Significado |
|---|---|---|---|
| Modo de lectura por defecto | `ReadModeDefault` | `full` | `full`: el fichero tal cual. `auto`: según tamaño y tipo. `signatures`: nombres de funciones y clases con sus firmas. `map`: imports y declaraciones de primer nivel |
| Deduplicar relecturas sin cambios | `ReadDedupDisabled` | activado | Releer una sección sin cambios devuelve una referencia corta |
| Aprendizaje del modo auto | `ReadModeLearning` | desactivado | En `auto`, Pando siempre cuenta los «rebotes» (una lectura comprimida seguida al momento de una lectura completa del mismo fichero) por fichero y por extensión, y envía lecturas más completas donde se repiten. Este interruptor añade una capa estadística que los predice antes de que ocurran |
| Construir grafo de propiedades del código | `BuildCodeGraph` | activado | Necesario para el análisis de impacto y las sugerencias de ficheros relacionados |
| Sugerencia de ficheros relacionados | `RelatedFilesHint` | desactivado | Cuesta unos pocos tokens por lectura |
| Registrar el libro de ahorro de tokens | `SavingsLedgerDisabled` | activado | Alimenta el contador de ahorro y `pando gain`. Se guarda en `<data dir>/savings/ledger.jsonl` |

El contador de rebotes solo se aplica a `auto`. Con `full`, `signatures` o `map` elegidos a mano no se aprende nada.

`PANDO_READ_MODE_DEFAULT=auto` cambia el modo de lectura para una sola ejecución.

## Salida de shell (`[Bash]`)

```toml
[Bash]
OutputFilterDisabled = false   # true returns raw command output to the model
OutputFilterPaths = []         # extra TOML filter files; earlier paths win, all override the built-ins
```

| Ajuste (nombre en la Web UI) | Por defecto | Significado |
|---|---|---|
| Activar compresión de salida | activado | Recorta texto de relleno, cabeceras repetidas y formato de la salida de los comandos (git, compilaciones, tests, linters). Se conservan los códigos de salida y los errores |
| Ficheros de filtro adicionales | vacío | Tus propias definiciones de filtro |

## Descubrimiento de herramientas (`[ToolDiscovery]`)

```toml
[ToolDiscovery]
Enabled = true
Mode = 'auto'            # auto | always | off
MaxDirectTools = 64      # threshold for auto
SearchLimit = 8          # results per tool_search
NonDeferredTools = []    # tools always visible
DeferredSources = []     # sources to keep back, e.g. "mcp", "lua"
```

| Modo | Comportamiento |
|---|---|
| `auto` | Empieza cuando el número de herramientas supera `MaxDirectTools` |
| `always` | Siempre reserva las herramientas que no son básicas |
| `off` | Todas las herramientas visibles |

Orígenes de herramientas: `core` (integradas, siempre visibles), `internal`, `mcp`, `lua`, `mesnada`, `rag` (base de conocimiento e índice de código), `gateway` (herramientas MCP favoritas).

`tool_search` busca y ejecuta herramientas. Con una consulta busca, ordenando según lo bien que encajan las palabras con el nombre, los alias, el nombre del servidor, la descripción y los nombres de los parámetros:

```json
{ "query": "search code in repository" }
```

Con el nombre de una herramienta la ejecuta, sea integrada o de un servidor MCP:

```json
{
  "tool_name": "github_create_issue",
  "parameters": { "title": "Fix login redirect" }
}
```

## Otros ahorradores

```toml
[LLMCache]
Enabled = true     # provider prompt cache
```

**Optimize images** y **Catálogo de modelos (models.dev)** son interruptores de **Configuración > General**.

## Informe de ahorro

```bash
pando gain                 # all-time summary (aliases: stats, savings)
pando gain --days 30       # a period
pando gain --price 3       # estimate $ saved at this price per 1M tokens
pando gain --json
```

La herramienta `pando_stats` da al agente los mismos números durante una conversación, con un parámetro opcional `days`.

## Resumen rápido

| Función | Por defecto | Recomendado | Ahorro |
|---|---|---|---|
| Modo de lectura | Completo | Completo o Auto | Medio a alto |
| Deduplicación | Activada | Activada | Medio |
| Aprendizaje adaptativo | Desactivado | Desactivado | Bajo |
| Compresión de salida | Activada | Activada | Alto |
| Grafo de código | Activado | Activado | Habilita funciones |
| Ficheros relacionados | Desactivado | Opcional | Bajo |
| Libro de ahorro | Activado | Activado | Ninguno (solo mide) |
