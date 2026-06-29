---
title: Sistema de Auto-Mejora
weight: 25
---

Pando incluye un bucle de evaluación usando LLM-as-Judge para evaluar la calidad de la sesión, con selección de habilidades basada en UCB1 y optimización de recompensas.

## Cómo Funciona

1. **Evaluación de Sesión**: Después de cada sesión, un juez LLM evalúa la calidad
2. **Selección de Habilidades**: El algoritmo UCB1 balancea exploración vs. explotación
3. **Optimización de Recompensas**: Rastrea éxito de tarea y eficiencia de tokens
4. **Mejora Continua**: Las habilidades con mayor recompensa se usan con más frecuencia

## Configuración

```toml
[evaluator]
enabled = true
model = 'ollama.qwopus:latest'
provider = 'ollama'
alphaWeight = 0.8          # Importancia del éxito de tarea
betaWeight = 0.2           # Importancia de la eficiencia de tokens
explorationC = 1.41        # Factor de exploración UCB1
minSessionsForUCB = 5
maxTokensBaseline = 50
maxSkills = 100
judgePromptTemplate = ''
async = true

[[evaluator.taskPatterns]]
pattern = 'fix|bug|error|crash'
taskType = 'debug'
```

## Exposición MCP

Al ejecutar como servidor MCP, las herramientas del evaluador se exponen:

```toml
[MCPServer.SelfImprovement]
Enabled = true
```

Esto expone estadísticas del evaluador, habilidades y triggers de evaluación como herramientas MCP.

## Métricas

El sistema rastrea:

- **Tasa de éxito de tarea** por habilidad
- **Eficiencia de tokens** por habilidad
- **Puntuaciones UCB1** para balance exploración/explotación
- **Calidad de sesión** calificaciones

{{< callout >}}
El sistema de auto-mejora es opt-in y se ejecuta asíncronamente. Ayuda a Pando a aprender qué enfoques funcionan mejor para diferentes tipos de tareas con el tiempo.
{{< /callout >}}
