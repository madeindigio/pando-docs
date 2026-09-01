---
title: Enriquecimiento de Contexto
weight: 13
---

El enriquecimiento de contexto busca automáticamente en tu Base de Conocimiento, índice de código y eventos de sesiones pasadas para inyectar información relevante en cada prompt, dando al agente de IA mayor conocimiento del proyecto sin intervención manual.

## Cómo Funciona

Cuando está habilitado, Pando enriquece cada mensaje del usuario antes de enviarlo al LLM:

1. **Planificación de Consulta** - Un planificador (heurístico o basado en LLM) analiza el mensaje del usuario
2. **Búsqueda Paralela** - Busca en KB, índice de código y eventos simultáneamente
3. **Filtrado por Puntuación** - Los resultados por debajo del umbral mínimo se descartan
4. **Inyección de Contexto** - Los resultados relevantes se anteponen al mensaje del usuario

## Configuración

```toml
[Remembrances]
ContextEnrichmentEnabled = true

# Enriquecimiento KB
ContextEnrichmentKBResults = 2
ContextEnrichmentKBMaxChars = 0

# Enriquecimiento de código
ContextEnrichmentCodeResults = 5
ContextEnrichmentCodeProject = 'pando'
ContextEnrichmentCodeMaxChars = 0

# Enriquecimiento de eventos
ContextEnrichmentEventsResults = 5
ContextEnrichmentEventsMaxChars = 0

# Configuración global
ContextEnrichmentMinScore = 0.0
ContextEnrichmentTotalMaxChars = 0

# Selección de planificador
ContextEnrichmentUseAgentPlanner = false
ContextEnrichmentPlannerFallbackToCoder = false
```

## Enriquecimiento como bucle de agente

En lugar de una única ronda de búsquedas, Pando puede ejecutar el enriquecimiento como un **pequeño agente dedicado** que consulta de forma iterativa la memoria, la base de conocimiento, los eventos pasados y el índice de código hasta tener lo que necesita. El agente principal nunca ve esas búsquedas: solo recibe el bloque de contexto ya terminado.

El bucle usa su propio modelo, independiente del que hayas elegido para programar, así que puedes asignarle uno barato y rápido:

```toml
[Agents.context-enricher]
Model = 'openrouter.un-modelo-barato'

[Remembrances]
ContextEnrichmentAgentLoopEnabled        = true
ContextEnrichmentAgentLoopTimeoutSeconds = 60      # límite de una ejecución
ContextEnrichmentAgentLoopMaxChars       = 6000    # tope del contexto inyectado
ContextEnrichmentAgentLoopEveryMessage   = false   # true = cada turno, no solo al iniciar sesión
```

Lo que vas a notar:

- **Por defecto solo se ejecuta en el primer mensaje de la sesión**, que es donde aporta valor: el momento en que el agente no sabe nada de tu proyecto. Pon `ContextEnrichmentAgentLoopEveryMessage = true` para enriquecer en cada turno.
- **Lo ves trabajar.** El chat muestra `🧠 Context enrichment agent gathering project context...` y después cuánto contexto ha añadido, igual que hace la compactación.
- **La ejecución aparece como sesión hija** de tu chat, así que puedes abrirla y leer exactamente qué buscó y qué encontró. Su coste se suma al de la sesión padre.
- **Tiene respaldo**: si agota el tiempo o vuelve vacío, cae al enriquecimiento clásico de una sola pasada, así que activarlo no puede dejarte con menos contexto que antes.
- **Sin arranque en frío.** El agente de enriquecimiento se prepara en segundo plano mientras Pando arranca, de modo que el primer prompt no lo espera.

Configurable desde TOML, desde la TUI (Remembrances → Context Enrichment) y desde los ajustes de la WebUI.

## Planificadores

### Planificador Heurístico (Predeterminado)

Analiza el mensaje del usuario usando extracción de palabras clave y coincidencia de patrones para determinar qué fuentes de búsqueda consultar. Rápido y determinista.

### Planificador Basado en LLM

Usa una llamada LLM barata para analizar el mensaje y seleccionar estrategias de búsqueda óptimas. Más preciso pero agrega latencia y costo de tokens.

```toml
ContextEnrichmentUseAgentPlanner = true
```

## Perfil de Contexto

El recortador consciente de contexto clasifica cada mensaje del usuario para optimizar la composición del prompt:

```json
{
  "task_type": "code|debug|refactor|explain|test|search|general",
  "relevant_tool_names": ["tool1", "tool2"],
  "skip_sections": ["capabilities/web_search"],
  "confidence": 0.85
}
```

Esto permite a Pando omitir secciones de prompt irrelevantes, ahorrando tokens y mejorando la calidad de respuesta.

{{< callout >}}
El enriquecimiento de contexto funciona silenciosamente en segundo plano. Habilítalo con `ContextEnrichmentEnabled = true` y configura los conteos de resultados según el tamaño de tu proyecto.
{{< /callout >}}
