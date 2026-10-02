---
title: Configuración del Modo Objetivo
weight: 31
---

Límites, estados y comandos de Goal Mode (Autopiloto). Para la idea, lee [Modo Objetivo]({{< relref "/docs/features/goal-mode" >}}); para el paso a paso, la guía [Goal Mode: tareas largas sin supervisión]({{< relref "/guides/goal-mode" >}}).

## Configuración básica

En `.pando.toml`:

```toml
[Goal]
# Maximum iterations before timeout (0 = default 20)
MaxIterations = 20

# Maximum duration (Go duration string)
MaxDuration = '1h'

# Consecutive no-progress iterations before stalled
StallIterations = 3

# Auto-approve all tool calls during goal mode
AutoApprove = true

# Patterns to block in goal mode (regex)
DangerousPatterns = []
```

## Estados de un objetivo

| Estado | Descripción |
|-------|-------------|
| `running` | El objetivo está en marcha |
| `completed` | Objetivo conseguido |
| `failed` | El objetivo no se puede conseguir |
| `blocked` | Bloqueado por algo externo |
| `cancelled` | Cancelado por el usuario |
| `timeout` | Se superó el máximo de iteraciones o de duración |
| `stalled` | Sin progreso durante N iteraciones |

Todos, salvo `running`, son estados finales.

## Comandos

| Comando | Descripción |
|---------|-------------|
| `/goal <objetivo>` | Inicia el modo objetivo |
| `/autopilot <objetivo>` | Alias de `/goal` |
| `/goal-status` | Muestra el estado del objetivo actual |
| `/goal-cancel` | Cancela el objetivo en marcha |

Funcionan en la TUI, en la Web UI y en los editores conectados por ACP. En la TUI la entrada del chat se desactiva mientras hay un objetivo en marcha, y **Ctrl+C** cancela el objetivo en lugar de cerrar Pando.

## Componente de estado

Mientras un objetivo está en marcha, la interfaz muestra una etiqueta de estado (running, completed, failed, blocked, timeout, stalled, cancelled), el texto del objetivo, el contador de iteraciones (por ejemplo «Iteración 3/20»), el tiempo transcurrido, el texto de progreso y el siguiente paso.

## Modo objetivo no interactivo

Desde la línea de comandos:

```bash
pando --goal "Fix all failing tests"
pando --goal "Refactor auth module" --model copilot.gpt-5.4
pando --goal "Add comprehensive error handling" --quiet
```

La CLI devuelve un resultado estructurado:

```json
{
  "session_id": "...",
  "objective": "Fix all failing tests",
  "status": "completed",
  "iteration": 5,
  "response": "All 12 tests now pass",
  "progress": "Fixed authentication, database, and API tests",
  "next_step": null,
  "blocked_reason": null
}
```

## Cómo funciona el bucle

1. El `GoalRunner` crea un registro del objetivo en la base de datos.
2. Cada iteración envía el prompt del objetivo al agente.
3. El `HeuristicGoalEvaluator` analiza la respuesta.
4. Se anota el progreso y el bucle continúa hasta llegar a un estado final.

El evaluador busca:

- **Señales de finalización**: tests que pasan, compilación correcta, declaraciones explícitas de que se ha terminado.
- **Señales de bloqueo**: mensajes de error, dependencias que faltan, problemas sin solución.
- **Atasco**: ningún progreso real durante `StallIterations` iteraciones seguidas.

## Seguridad

- `AutoApprove = true` omite las peticiones de permiso durante el modo objetivo.
- `DangerousPatterns` bloquea los comandos que coinciden con los patrones (regex).
- Ctrl+C cancela el objetivo en marcha (en lugar de cerrar Pando).
- El máximo de iteraciones y de duración son límites firmes.
