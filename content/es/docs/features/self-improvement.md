---
title: Sistema de Auto-Mejora
weight: 25
---

Pando puede aprender de cómo van tus sesiones. Puntúa cada sesión terminada, detecta qué funcionó y propone reglas cortas para la próxima vez. Tú revisas esas reglas y solo se usan las que apruebas.

Viene **desactivado por defecto**.

## Cómo funciona

1. **Cada sesión recibe una puntuación.** Cuando una sesión termina o queda inactiva, Pando la puntúa sin llamar a ningún modelo. Mira si tuviste que corregir al agente, cuántos errores de herramientas y cancelaciones hubo, y cuántos tokens costó.
2. **Puedes decirlo tú.** `/feedback good` o `/feedback bad` en el chat sustituye la puntuación automática.
3. **Un juez mira los casos claros.** En las sesiones que fueron claramente bien o claramente mal, un modelo lee la conversación y puede proponer una regla, como «comprueba la compilación antes de dar la tarea por terminada». El juez tiene un presupuesto diario, así que no dispara tu factura.
4. **Tú revisas las propuestas.** Cada regla propuesta es un fichero que puedes leer y editar. Nada llega a tus prompts hasta que lo apruebas.
5. **Las reglas aprobadas se usan en las sesiones nuevas.** Las que no ayudan se retiran solas.

## Activarlo

{{< shot src="images/webui/pando-webui-settings-self-improvement.jpg" alt="Ajustes de Self-Improvement" >}}

En **Ajustes > Self-Improvement** (Web UI y TUI), o en el fichero de configuración:

```toml
[evaluator]
enabled = true
model = 'anthropic.claude-haiku-4'   # el juez; basta un modelo barato
```

## Revisar las reglas aprendidas

En la Web UI, la vista Self-Improvement lista las propuestas pendientes con botones **Aprobar** y **Rechazar**. Desde el terminal:

```bash
pando skills list --status pending
pando skills approve verify-the-build-before-reporting-done
pando skills reject some-skill-id
```

Las propuestas son ficheros en `.pando/skills/learned/`. Edítalos antes de aprobar si quieres cambiar la redacción. Una aprobación se aplica a las sesiones que empieces después.

## ¿Está funcionando?

```bash
pando evaluator doctor
```

El doctor dice con palabras claras si el ciclo está en marcha y, si no, por qué: desactivado, sin modelo para el juez, ninguna sesión puntuada todavía, presupuesto agotado. La Web UI muestra el mismo informe en un aviso en la parte superior de la vista Self-Improvement.

La vista muestra también las puntuaciones de tus sesiones recientes, por qué recibió cada una la suya y cómo ha evolucionado la media en los últimos 14 días.

Para puntuar sesiones a mano:

```bash
pando evaluate --all --limit 20
```

## Probar distintas redacciones de prompt

Si quieres comparar dos formas de dar instrucciones al agente, pon una versión alternativa de una sección del prompt en `.pando/prompts/variants/<sección>/<nombre>.md.tpl`. Pando usa una variante por sesión, sigue las puntuaciones y poco a poco prefiere la que funciona mejor.

## Ajustes que te pueden interesar

{{< shot src="images/webui/pando-webui-settings-self-improvement-evaluation.jpg" alt="Cuándo se evalúan las sesiones" >}}

{{< shot src="images/webui/pando-webui-settings-self-improvement-judge-limits.jpg" alt="Límites del juez y variantes de prompt" >}}

{{< shot src="images/webui/pando-webui-settings-self-improvement-correction-patterns.jpg" alt="Patrones de corrección" >}}

```toml
[evaluator]
idleTimeout = '30m'        # puntúa una sesión tras este tiempo sin actividad

[evaluator.judge]
dailyCalls  = 20           # llamadas al juez por día; 0 = sin límite
dailyTokens = 200000       # tokens del juez por día; 0 = sin límite
```

{{< callout >}}
Pando nunca reescribe sus propios prompts a tus espaldas. Las variantes de prompt son ficheros que escribes tú, y las reglas aprendidas son ficheros que apruebas tú.
{{< /callout >}}
