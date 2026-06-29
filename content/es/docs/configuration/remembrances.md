---
title: Configuración de Remembrances
weight: 30
---

El sistema Remembrances administra la Base de Conocimiento, Índice de Código, Eventos y Memoria. Configúralo en `.pando.toml`.

## Configuración de Memoria

```toml
[Remembrances]
# Habilitar sistema de memoria persistente
MemoryEnabled = true

# Inyectar memorias en el contexto automáticamente
MemoryContextEnrichmentEnabled = true

# Máximas memorias inyectadas por prompt
MemoryContextMaxItems = 3

# Máximos caracteres para bloque de memoria (0 = sin límite)
MemoryContextMaxChars = 0

# TTL predeterminado para memorias en días (0 = 180 días)
MemoryDefaultTTLDays = 0

# Intervalo de recolección de basura
MemoryGCInterval = ''

# Auto-capturar conversaciones como memorias
MemoryAutoCapture = false

# Scopes exentos de recolección de basura
MemoryPinnedScopes = []
```

## Configuración de Base de Conocimiento

```toml
[Remembrances]
# Directorio de sincronía para documentos KB
KBPath = ''

# Número de workers paralelos de sincronía (2-8)
IndexWorkers = 4

# Habilitar espejo de sistema de archivos para documentos KB
FilesystemMirror = false
```

## Configuración de Enriquecimiento de Contexto

```toml
[Remembrances]
# Habilitar enriquecimiento automático de contexto
ContextEnrichmentEnabled = false

# Resultados de búsqueda KB
ContextEnrichmentKBResults = 2
ContextEnrichmentKBMaxChars = 0

# Resultados de búsqueda de código
ContextEnrichmentCodeResults = 5
ContextEnrichmentCodeProject = 'pando'
ContextEnrichmentCodeMaxChars = 0

# Resultados de búsqueda de eventos
ContextEnrichmentEventsResults = 5
ContextEnrichmentEventsMaxChars = 0

# Configuración global
ContextEnrichmentMinScore = 0.0
ContextEnrichmentTotalMaxChars = 0

# Selección de planificador
ContextEnrichmentUseAgentPlanner = false
ContextEnrichmentPlannerFallbackToCoder = false
```

## Configuración de Índice de Código

```toml
[Remembrances]
# Auto-indexar código al iniciar
CodeIndexAutoStart = true

# Idiomas a indexar (vacío = todos)
CodeIndexLanguages = []
```

## Configuración de Descubrimiento de Herramientas

```toml
[ToolDiscovery]
Enabled = true
Mode = 'auto'            # 'auto', 'always', u 'off'
MaxDirectTools = 64
SearchLimit = 8
NonDeferredTools = []
DeferredSources = []
```

## Configuración del Navegador

```toml
[InternalTools]
BrowserEnabled = true
BrowserType = 'chrome'
BrowserExecutable = ''
BrowserHeadless = false
BrowserTimeout = 30
BrowserUserDataDir = ''
BrowserMaxSessions = 3
```

## Configuración de Auto-Mejora

```toml
[evaluator]
enabled = false
model = 'ollama.qwopus:latest'
provider = 'ollama'
alphaWeight = 0.8
betaWeight = 0.2
explorationC = 1.41
minSessionsForUCB = 5
maxTokensBaseline = 50
maxSkills = 100
async = true
```

{{< callout >}}
La mayoría de las características de Remembrances funcionan de serie con valores predeterminados sensatos. Habilita características adicionales como Enriquecimiento de Contexto o Auto-Mejora según sea necesario.
{{< /callout >}}
