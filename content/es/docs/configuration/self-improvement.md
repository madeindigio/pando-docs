---
title: Configuración de la automejora
weight: 36
---

Claves del bloque `[evaluator]` y los comandos que lo rodean. Para la idea, lee [Sistema de automejora]({{< relref "/docs/features/self-improvement" >}}); para el paso a paso, la guía [Ayuda a Pando a aprender de tus sesiones]({{< relref "/guides/self-improvement" >}}).

Web UI: **Configuración > Self-Improvement**. También está en los ajustes de la TUI.

{{< shot src="images/webui/pando-webui-settings-self-improvement.jpg" alt="Ajustes de Self-Improvement" >}}

## Claves principales

```toml
[evaluator]
enabled = true
model = 'anthropic.claude-haiku-4'   # the judge; a cheap model is enough
provider = ''
async = true                 # evaluate in the background
idleTimeout = '30m'          # score a session after this long without activity
backfillLimit = 50           # old unscored sessions evaluated at startup; negative disables
backfillJudge = false        # also run the judge on those
includeSubagents = false     # also score delegated (child) sessions
explorationC = 1.41
minSessionsForUCB = 5
maxTokensBaseline = 50
maxSkills = 100
judgePromptTemplate = ''     # path to a custom .md or .txt Go template
correctionsPatterns = []     # regex list; empty = built-in patterns

[evaluator.judge]
highReward = 0.8             # the judge runs at or above this reward…
lowReward = 0.3              # …or at or below this one
minTurns = 4                 # minimum user turns
maxTranscriptTokens = 6000   # head and tail of the transcript kept
dailyCalls  = 20             # judge calls per local day; 0 = no limit
dailyTokens = 200000         # judge tokens per local day; 0 = no limit

[evaluator.templates]
enabled = true               # prompt variant selection; inert until variant files exist
```

| Clave | Por defecto | Etiqueta en la Web UI |
|---|---|---|
| `enabled` | `false` | Enabled |
| `model` | ninguno | Judge model |
| `async` | `true` | Async evaluation |
| `idleTimeout` | `30m` | Idle timeout |
| `backfillLimit` | `50` | Backfill limit |
| `backfillJudge` | `false` | Judge during backfill |
| `includeSubagents` | `false` | Include subagent sessions |
| `explorationC` | `1.41` | UCB exploration factor |
| `judgePromptTemplate` | la integrada | Judge prompt template |
| `correctionsPatterns` | los integrados | Correction patterns |
| `judge.highReward` | `0.8` | High reward band (judge at or above) |
| `judge.lowReward` | `0.3` | Low reward band (judge at or below) |
| `judge.minTurns` | `4` | Minimum user turns |
| `judge.maxTranscriptTokens` | `6000` | Transcript cap (tokens) |
| `judge.dailyCalls` | `20` | Daily judge calls |
| `judge.dailyTokens` | `200000` | Daily judge tokens |
| `templates.enabled` | `true` | Prompt variant selection |
| `minSessionsForUCB` | `5` | |
| `maxTokensBaseline` | `50` | |
| `maxSkills` | `100` | |

{{< shot src="images/webui/pando-webui-settings-self-improvement-evaluation.jpg" alt="Cuándo se evalúan las sesiones" >}}

{{< shot src="images/webui/pando-webui-settings-self-improvement-judge-limits.jpg" alt="Límites del juez y variantes de prompt" >}}

## Pesos de la puntuación

La nota es la media ponderada de las señales medidas en cada sesión. Los pesos son relativos. Deslizadores de la Web UI y valores de partida: **Success (corrections)** 0.80, **Token efficiency** 0.20, **Tool errors** 0.10, **Cancelled runs** 0.05, **Repeated tool calls** 0.05, **Turns to completion** 0.05, **Ended right after an error** 0.10. En el fichero de configuración van en `[evaluator.weights]`; las claves antiguas `alphaWeight` (éxito, 0.8) y `betaWeight` (eficiencia de tokens, 0.2) se siguen leyendo cuando no hay pesos definidos.

Un `/feedback` explícito sustituye el total: `bad` por debajo de 0.3, `good` por encima de 0.8.

## Cuándo se puntúa una sesión

- Al cambiar a otra sesión.
- Tras `idleTimeout` sin mensajes nuevos.
- Al cerrar Pando.
- En el repaso de arranque (solo la instancia primaria), hasta `backfillLimit` sesiones.

Puntuar no llama a ningún modelo. El modelo juez solo se llama para sesiones dentro de las bandas de nota, con al menos `minTurns` turnos de usuario y dentro del presupuesto diario.

## Reglas aprendidas

Las propuestas del juez son ficheros en `.pando/skills/learned/<id>.md` con estado pendiente. Solo las reglas aprobadas se inyectan en los prompts, y una aprobación llega a la siguiente sesión nueva, nunca a una en curso. Las rechazadas no se inyectan ni se vuelven a proponer.

```bash
pando skills list --status pending
pando skills approve verify-the-build-before-reporting-done
pando skills reject some-skill-id
```

## Variantes de prompt

Pon una redacción alternativa de una sección del prompt en `.pando/prompts/variants/<section>/<name>.md.tpl`. Pando usa una variante por sesión, sigue las notas y poco a poco prefiere la que funciona mejor. Requiere `enabled = true`; `templates.enabled` es el interruptor de corte.

## Recortador de contexto

Experimental y desactivado por defecto: una llamada extra a un modelo en cada sesión nueva que filtra las herramientas que se enseñan al modelo. Web UI: **Context trimmer** y **Trimmer minimum confidence** (0.70). Bloque de configuración: `[evaluator.contextTrimmer]`.

## Patrones de corrección

{{< shot src="images/webui/pando-webui-settings-self-improvement-correction-patterns.jpg" alt="Patrones de corrección" >}}

Expresiones regulares que marcan un mensaje del usuario como corrección. Usa barras invertidas sencillas, por ejemplo `(?i)\bwrong\b`. Una barra doble busca una barra literal y nunca salta; `pando evaluator doctor` las señala.

## Comandos

| Comando | Qué hace |
|---|---|
| `/feedback good` · `/feedback bad` | Sustituye la nota de la sesión actual |
| `/evaluate [session-id]` | Puntúa una sesión desde el chat (por defecto, la actual) |
| `pando evaluator doctor` | Dice si el bucle está funcionando y, si no, por qué |
| `pando evaluate <session-id>` | Puntúa una sesión |
| `pando evaluate --all --limit 20` | Puntúa las sesiones que aún no tienen nota. Añade `--judge` para ejecutar también el juez |
| `pando skills list\|approve\|reject` | Revisa las reglas aprendidas |
