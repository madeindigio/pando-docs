---
title: Modo Objetivo (Autopiloto)
weight: 10
---

El modo objetivo permite que Pando persiga un objetivo persistente de forma autónoma a través de múltiples turnos del agente, sin requerir input del usuario después de cada paso. El agente itera, evalúa su propio progreso y continúa hasta que el objetivo se logre, se bloquee o se cancele.

## Iniciar el Modo Objetivo

Usa el comando slash `/goal` en TUI, Web UI o modo ACP:

```
/goal <descripción del objetivo>
```

También puedes usar el alias:

```
/autopilot <descripción del objetivo>
```

## Monitorear el Progreso

Mientras un objetivo está en ejecución, Pando muestra un componente de estado dedicado mostrando:

- **Insignia de estado** con spinner animado (ejecutándose, completado, fallido, bloqueado, timeout, detenido, cancelado)
- **Texto del objetivo**
- **Contador de iteraciones** (ej. "Iteración 3/20")
- **Tiempo transcurrido**
- **Texto de progreso**
- **Descripción del siguiente paso**

Consulta el estado en cualquier momento con:

```
/goal-status
```

## Cancelar un Objetivo

Cancela el objetivo en ejecución con:

```
/goal-cancel
```

O presiona **Ctrl+C** mientras un objetivo está activo (esto cancela el objetivo en lugar de salir de Pando).

## Cómo Funciona

1. El `GoalRunner` crea un registro del objetivo en la base de datos
2. Cada iteración envía el prompt del objetivo al agente
3. Un `HeuristicGoalEvaluator` analiza la respuesta en busca de completado, bloqueo o estancamiento
4. Se registra el progreso y el bucle continúa hasta un estado terminal

Estados terminales: `completado`, `fallido`, `cancelado`, `bloqueado`, `timeout`, `detenido`

## Configuración

```toml
[Goal]
MaxIterations = 20       # Iteraciones máximas (0 = predeterminado 20)
MaxDuration = '1h'       # Cadena de duración Go
StallIterations = 3      # Iteraciones sin progreso antes de detenido
AutoApprove = true       # Auto-aprobar llamadas a herramientas durante modo objetivo
DangerousPatterns = []   # Patrones a bloquear en modo objetivo
```

## Modo Objetivo No Interactivo

Desde la línea de comandos, usa el flag `--goal` para ejecución completamente autónoma:

```bash
pando --goal "Corregir todos los tests fallidos en el proyecto"
pando --goal "Refactorizar el módulo de autenticación" --model copilot.gpt-5.4
```

El CLI devuelve un resultado estructurado con ID de sesión, objetivo, estado, conteo de iteraciones y progreso.

{{< callout >}}
El modo objetivo funciona en TUI, ACP, Web UI y CLI no interactivo. En TUI, el input del chat se desactiva mientras un objetivo está en ejecución para evitar interferencias.
{{< /callout >}}
