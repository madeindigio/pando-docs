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
