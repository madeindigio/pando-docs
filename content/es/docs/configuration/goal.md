---
title: Configuración del Modo Objetivo
weight: 31
---

Configura el comportamiento del Modo Objetivo (Autopiloto) en `.pando.toml`.

## Configuración Básica

```toml
[Goal]
# Máximas iteraciones antes de timeout (0 = predeterminado 20)
MaxIterations = 20

# Duración máxima (cadena de duración Go)
MaxDuration = '1h'

# Iteraciones consecutivas sin progreso antes de detenido
StallIterations = 3

# Auto-aprobar todas las llamadas a herramientas durante modo objetivo
AutoApprove = true

# Patrones a bloquear en modo objetivo (regex)
DangerousPatterns = []
```

## Estados del Objetivo

Los objetivos progresan a través de estos estados:

| Estado | Descripción |
|--------|-------------|
| `running` | El objetivo se está persiguiendo activamente |
| `completed` | Objetivo logrado |
| `failed` | El objetivo no se puede lograr |
| `blocked` | El objetivo está bloqueado por factores externos |
| `cancelled` | El usuario canceló el objetivo |
| `timeout` | Iteraciones o duración máxima excedida |
| `stalled` | Sin progreso por N iteraciones |

## Modo Objetivo No Interactivo

Desde la línea de comandos:

```bash
pando --goal "Corregir todos los tests fallidos"
pando --goal "Refactorizar módulo de auth" --model copilot.gpt-5.4
pando --goal "Añadir manejo integral de errores" --quiet
```

El CLI devuelve un resultado estructurado:

```json
{
  "session_id": "...",
  "objective": "Corregir todos los tests fallidos",
  "status": "completed",
  "iteration": 5,
  "response": "Todos los 12 tests ahora pasan",
  "progress": "Corregidos tests de autenticación, base de datos y API",
  "next_step": null,
  "blocked_reason": null
}
```

## Comandos Slash

| Comando | Descripción |
|---------|-------------|
| `/goal <objetivo>` | Iniciar modo objetivo |
| `/autopilot <objetivo>` | Alias para `/goal` |
| `/goal-status` | Mostrar estado del objetivo actual |
| `/goal-cancel` | Cancelar objetivo en ejecución |

## Evaluación

El `HeuristicGoalEvaluator` analiza cada iteración en busca de:

- **Señales de completado**: Tests pasando, build exitoso, declaraciones explícitas de completado
- **Señales de bloqueo**: Mensajes de error, dependencias faltantes, problemas irresolubles
- **Estancamiento**: Sin progreso significativo por N iteraciones consecutivas

## Seguridad

- `AutoApprove = true` omite prompts de permiso durante modo objetivo
- `DangerousPatterns` bloquea comandos que coincidan con patrones regex
- Ctrl+C cancela el objetivo en ejecución (en lugar de salir de Pando)
- Las iteraciones y duración máximas proporcionan límites duros

{{< callout >}}
El modo objetivo es poderoso para tareas autónomas pero debe usarse con precaución. Comienza con objetivos simples y aumenta gradualmente la complejidad a medida que confías en el sistema.
{{< /callout >}}
