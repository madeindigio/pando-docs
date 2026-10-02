---
title: "Goal Mode: tareas largas sin supervisión"
shortTitle: "Goal Mode"
description: "Dale a Pando una meta y deja que siga, paso a paso, hasta llegar."
summary: "Define el objetivo y deja trabajar a la arboleda."
track: roots
level: intermediate
weight: 13
---

Normalmente Pando hace una cosa y te espera. En Goal Mode le dices dónde está la meta y sigue caminando: trabaja, mira lo que ha conseguido, decide el paso siguiente y continúa. Esta guía enseña a lanzar un objetivo, seguirlo, pararlo y llevarlo con correa.

Necesitas una sesión que funcione. Los pasos son para la Web UI; la app de escritorio es idéntica.

## Escribe un objetivo con una meta clara

Un objetivo funciona cuando Pando puede saber por sí mismo que ha terminado. Compara:

- Vago: «Mejora los tests».
- Claro: «Haz que pasen todos los tests de `./internal/auth`. Para cuando `go test ./internal/auth` salga en verde».

Di a dónde hay que llegar y cómo comprobarlo. El «cómo» déjaselo a Pando.

## Lanza el objetivo

En la caja del chat escribe `/`. Se abre una lista de comandos; los primeros son los de objetivos.

{{< shot src="images/webui/pando-webui-chat-slash-commands.jpg" alt="Lista de comandos en la caja del chat, que empieza por /goal" >}}

Escribe el comando seguido de tu objetivo y pulsa Intro:

```
/goal Haz que pasen todos los tests de ./internal/auth. Para cuando go test ./internal/auth salga en verde.
```

`/autopilot` hace exactamente lo mismo.

## Sigue el progreso

En el chat aparece una tarjeta de objetivo. Muestra:

- una etiqueta de estado: **En curso** mientras trabaja;
- tu objetivo, tal como lo escribiste;
- **Iteración 3/20**: en qué vuelta va y cuántas puede dar;
- el tiempo desde que empezó;
- **Progreso**: lo que ha conseguido hasta ahora;
- **Siguiente paso**: lo que va a intentar.

Puedes irte de la ventana. El objetivo sigue en marcha. Para preguntar cómo va en cualquier momento, escribe `/goal-status`.

## Páralo si hace falta

Pulsa **Cancelar** en la tarjeta del objetivo o escribe `/goal-cancel`. Pando termina lo que tiene entre manos y se detiene. Nada de lo que ya hizo se deshace.

## Lee cómo terminó

| La tarjeta dice | Qué significa |
|---|---|
| **Completado** | Llegó a la meta |
| **Bloqueado** | Necesita algo que solo tú puedes darle: una contraseña, una decisión, un fichero que falta |
| **Cancelado** | Lo paraste tú |
| `failed` | Concluyó que el objetivo no se puede alcanzar |
| `timeout` | Agotó sus vueltas o su tiempo |
| `stalled` | Varias vueltas seguidas sin acercarse |

Cuando termina bloqueado o atascado, lee **Progreso** y los últimos mensajes, dale lo que le falta y lanza un objetivo nuevo desde ahí.

## Ponle correa

Goal Mode todavía no tiene página de ajustes; sus límites están en el fichero de configuración (`.pando.toml` en tu proyecto o `~/.pando.toml`):

```toml
[Goal]
MaxIterations = 20       # laps before it gives up
MaxDuration = '1h'       # time before it gives up
StallIterations = 3      # laps without progress before it stops
AutoApprove = true       # do not ask permission for each tool
DangerousPatterns = []   # commands it must never run, as patterns
```

Con `AutoApprove = true` Pando no se para a preguntar antes de cada acción, que es justo la gracia de caminar solo. Si eso te inquieta, deja activado el [sandbox de comandos]({{< relref "/docs/features/sandbox" >}}) y añade a `DangerousPatterns` lo que nunca debe ocurrir.

## Comprueba que funciona

Prueba con un objetivo pequeño y sin riesgo:

```
/goal Crea un fichero llamado HELLO.md con una línea de texto. Para cuando el fichero exista.
```

La tarjeta debería pasar de **En curso** a **Completado** en una o dos vueltas, y el fichero debería estar ahí.

{{< under-surface >}}
Después de cada vuelta Pando leyó su propia respuesta buscando señales de meta, de muro o de estar dando vueltas en círculo, y apuntó el progreso. Esa autoevaluación es lo que le permite parar solo.
{{< /under-surface >}}

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Se para en `stalled` muy pronto | El objetivo es demasiado vago. Añade cómo comprobar que está hecho |
| Termina en `timeout` | Sube `MaxIterations` o `MaxDuration`, o parte el objetivo en dos |
| No deja de pedir permiso | Pon `AutoApprove = true` |
| Hizo algo que no querías | Páralo y luego [revisa y deshaz]({{< relref "/guides/review-and-undo" >}}) |

## ¿Prefieres la terminal?

En la interfaz de terminal funcionan los mismos comandos, y **Ctrl+C** cancela el objetivo en lugar de cerrar Pando. Para lanzar un objetivo sin ninguna ventana, pensado para scripts o trabajos nocturnos:

```bash
pando --goal "Fix the failing Go tests and stop when they pass"
pando --goal "Refactor auth module" --model copilot.gpt-5.4
```

Al terminar imprime un informe breve. Los detalles están en la [referencia de Goal Mode]({{< relref "/docs/configuration/goal" >}}), y la idea se explica en [Modo Objetivo]({{< relref "/docs/features/goal-mode" >}}).
