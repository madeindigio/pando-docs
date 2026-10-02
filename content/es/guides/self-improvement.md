---
title: "Ayuda a Pando a aprender de tus sesiones"
shortTitle: "Automejora"
description: "Activa el entrenador que puntúa cada sesión, propone reglas para la próxima vez y espera tu aprobación."
summary: "Un entrenador que repasa cada sesión y sugiere reglas."
track: roots
level: advanced
weight: 17
---

Después de un partido, un buen entrenador ve la repetición y apunta una o dos cosas que hacer mejor la próxima vez. Pando puede hacer eso con tus sesiones. En esta guía activas al entrenador, le das tu opinión, revisas lo que propone y compruebas que de verdad está trabajando. Está apagado hasta que lo enciendes.

Las pantallas son de la Web UI; la app de escritorio es igual.

## Activa al entrenador

Abre **Configuración > Self-Improvement**.

{{< shot src="images/webui/pando-webui-settings-self-improvement.jpg" alt="Ajustes de Self-Improvement: activación, modelo juez y pesos de la puntuación" >}}

1. Activa **Enabled**.
2. En **Judge model** elige quién ve la repetición. Basta un modelo barato y rápido.
3. Pulsa **Guardar**.

A partir de ahora cada sesión terminada recibe una nota entre 0 y 1. La nota se calcula sin llamar a ningún modelo: mira si tuviste que corregir a Pando, cuántas acciones fallaron, cuántas veces cancelaste y cuántos tokens hizo falta.

## Dile lo que opinas

Tu opinión pesa más que la nota automática. En cualquier momento de un chat, escribe:

```
/feedback good
/feedback bad
```

Un «bad» deja la nota por debajo de 0,3 y un «good» la sube por encima de 0,8.

## Decide qué cuenta

Los deslizadores de **Reward weights** dicen cuánto importa cada señal: **Success (corrections)**, **Token efficiency**, **Tool errors**, **Cancelled runs**, **Repeated tool calls**, **Turns to completion** y **Ended right after an error**. Son relativos entre sí, como los ingredientes de una receta. Los valores de partida son una buena receta; cámbialos solo si las notas no coinciden con tu propia impresión.

## Elige cuándo se repasan las sesiones

{{< shot src="images/webui/pando-webui-settings-self-improvement-evaluation.jpg" alt="Cuándo se evalúan las sesiones: tiempo de inactividad, sesiones antiguas y sesiones de subagentes" >}}

- **Idle timeout**: una sesión que nadie toca durante este tiempo recibe su nota. También se puntúan al cambiar a otra sesión y al cerrar Pando.
- **Backfill limit**: cuántas sesiones antiguas sin nota se repasan al arrancar Pando.
- **Judge during backfill**: enviar también esas sesiones antiguas al juez. Cuesta llamadas, por eso viene apagado.
- **Include subagent sessions**: puntuar también las sesiones de los ayudantes.
- **Async evaluation**, un poco más arriba, deja todo esto en segundo plano para que nunca te frene.

## Ponle presupuesto al juez

El modelo juez solo lee las sesiones que fueron claramente bien o claramente mal. Son las que traen una lección.

{{< shot src="images/webui/pando-webui-settings-self-improvement-judge-limits.jpg" alt="Límites del juez: bandas de nota, turnos mínimos, tope de transcripción y presupuesto diario" >}}

- **High reward band** y **Low reward band** marcan qué significa «claramente».
- **Minimum user turns** deja fuera las sesiones muy cortas.
- **Transcript cap (tokens)** limita cuánta conversación lee el juez.
- **Daily judge calls** y **Daily judge tokens** son la paga diaria. `0` significa sin límite.

## Enséñale cómo te quejas

¿Cómo sabe Pando que le has corregido? Busca frases como «that's wrong» o «eso no era». La lista está al final, en **Correction patterns**, y puedes añadir las tuyas.

{{< shot src="images/webui/pando-webui-settings-self-improvement-correction-patterns.jpg" alt="Lista de patrones de corrección" >}}

Los patrones son expresiones regulares. Usa barras invertidas sencillas, como en `(?i)\bwrong\b`.

## Revisa lo que propone

Abre **Self-Improvement** en el menú lateral.

{{< shot src="images/webui/pando-webui-self-improvement.jpg" alt="Vista Self-Improvement: contadores, evaluaciones por día y reglas aprendidas" >}}

- Los cuatro recuadros de arriba cuentan las sesiones puntuadas, las variantes de instrucciones, la nota media y cuánto se ha usado el juez en los últimos 14 días.
- La gráfica muestra las evaluaciones por día. Pasa el ratón por una barra para ver la media de ese día.
- La pestaña **Sessions** lista las sesiones recientes con su nota y el porqué.
- **Learned Skills** guarda las reglas que propone el juez, en tres montones: **pending**, **approved** y **rejected**.

Abre **pending**, lee cada regla y pulsa **Approve** o **Reject**. Una regla es una frase corta como «comprueba la compilación antes de dar el trabajo por terminado». Nada llega a las instrucciones de Pando hasta que lo apruebas, y una aprobación vale para las sesiones que empieces después.

Cada propuesta es además un fichero en `.pando/skills/learned/`. Ábrelo y cámbiale la redacción antes de aprobar si quieres.

## Comprueba que funciona

Un aviso en la parte superior de la vista Self-Improvement dice con palabras claras si el entrenador está trabajando y, si no, por qué. El mismo informe desde una terminal:

```bash
pando evaluator doctor
```

{{< under-surface >}}
Pando nunca reescribe sus propias instrucciones a tus espaldas. Las reglas son ficheros que tú apruebas, y las que resultan no ayudar se retiran solas.
{{< /under-surface >}}

## Si algo falla

| Qué dice el doctor | Qué hacer |
|---|---|
| Desactivado | Activa **Enabled** y guarda |
| Sin modelo juez | Elige uno en **Judge model** |
| Todavía no hay sesiones puntuadas | Usa Pando un rato, o baja **Idle timeout** |
| Presupuesto agotado | Espera a mañana o sube **Daily judge calls** |
| No hay propuestas | Normal al principio: el juez solo opina de sesiones que fueron claramente bien o mal, con el mínimo de turnos |

## ¿Prefieres la terminal?

```bash
pando skills list --status pending
pando skills approve verify-the-build-before-reporting-done
pando skills reject some-skill-id
pando evaluate --all --limit 20     # score sessions by hand
```

Para comparar dos formas de redactar una instrucción, mira **Prompt variant selection** en la [referencia de automejora]({{< relref "/docs/configuration/self-improvement" >}}), que además lista todos los ajustes. La idea se explica en [Sistema de automejora]({{< relref "/docs/features/self-improvement" >}}).
