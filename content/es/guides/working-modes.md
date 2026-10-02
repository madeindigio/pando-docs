---
title: "Cambia cómo piensa y cómo habla Pando"
shortTitle: "Modos de trabajo"
description: "Seis mandos: cuánto piensa, cuánto habla, con cuánto cuidado planifica, cuánto apunta, lo simple que deja el código y cómo ordena un chat largo."
summary: "Piensa más, habla menos, planifica antes, toma notas."
track: roots
level: beginner
weight: 16
---

Pando es un solo asistente con varios estados de ánimo. Esta guía es un paseo por los mandos que se los cambian: aprenderás dónde está cada uno y cuándo girarlo. Necesitas una sesión que funcione. Las pantallas son de la Web UI; la app de escritorio es igual.

Casi todos los mandos son comandos que escribes en la caja del chat. Escribe `/` para verlos todos.

{{< shot src="images/webui/pando-webui-chat-slash-commands.jpg" alt="Lista de comandos que se abre al escribir una barra en la caja del chat" >}}

## Decide cuánto piensa

Hay preguntas que merecen pensarse despacio y otras que solo hay que hacer. Abre **Configuración > Agentes** y pulsa en **Coder**, el agente que hace el trabajo principal.

{{< shot src="images/webui/pando-webui-settings-agents-coder.jpg" alt="Agente Coder: modelo, esfuerzo de razonamiento, modo de pensamiento y compactación automática" >}}

- **Reasoning effort** va de **None** a **High**. **Default** deja que Pando elija lo que le va al modelo.
- **Thinking mode** es la misma idea para los modelos que reservan parte de su respuesta para pensar: **Low**, **Medium** o **High** del presupuesto.

No todos los modelos tienen los mismos escalones en el mando. Pando solo ofrece los que tu modelo acepta y ajusta con discreción un valor que el modelo rechazaría. También puedes cambiar el esfuerzo desde la lista de modelos del chat cuando el modelo lo permite.

| Esfuerzo | Va bien para |
|---|---|
| Ninguno, mínimo | Formatear, traducir, ediciones repetitivas |
| Bajo | El día a día en un código que conoces bien |
| Medio | Casi todo |
| Alto y superiores | Decisiones de diseño, un fallo que no entiendes, planificar un cambio grande |

Pensar más cuesta más y tarda más. Un truco habitual: planifica con esfuerzo alto y baja a bajo para la parte mecánica.

## Haz que hable menos

El modo Caveman recorta la charla: sin saludos, sin repetirte la pregunta, sin «ahora voy a...». El código, los comandos, los errores y los resultados de los tests no se recortan nunca, y Pando piensa exactamente igual.

En el chat:

```
/caveman lite     # normal sentences, filler removed
/caveman full     # short lines and bullets
/caveman ultra    # only the bare facts
/caveman off      # back to normal (also /caveman-finish)
```

Eso cambia la sesión actual. Para elegir el nivel con el que empiezan las sesiones nuevas, abre **Configuración > General**, baja hasta **Optimización del feedback** y ajusta **Brevedad de salida (Caveman)**.

{{< shot src="images/webui/pando-webui-settings-general-caveman-brevity.jpg" alt="Selector de brevedad Caveman en los ajustes generales" >}}

Si pides una explicación («explícamelo paso a paso»), recibes la explicación completa en esa respuesta.

## Haz que planifique antes de construir

El modo Superpowers convierte a Pando en el compañero que se niega a empezar sin un plan: primero entender, luego proponer un diseño y esperar tu visto bueno, luego escribir el plan, luego construir con tests y luego comprobar el resultado de verdad.

```
/superpowers                   # switch it on
/superpowers Fix login bug     # switch it on with an aim
/superpowers-finish            # wrap up: what was done, what was not, what comes next
```

Úsalo en cambios que tocan muchos ficheros o que no pueden romper nada. Sáltatelo en un arreglo rápido. Mientras está activo, Pando nunca hace commit, push ni cambia de rama por su cuenta.

## Haz que tome notas

El modo Learning convierte a Pando en alguien que apunta con cuidado. Antes de continuar un trabajo anterior consulta lo que ya sabe, te pregunta las decisiones que son tuyas y deja escrito lo que descubre para que la próxima sesión empiece con ventaja.

```
/learning                        # switch it on
/learning auth system changes    # switch it on, focused on a topic
/learning-finish                 # tidy the notes and switch it off
```

Necesita [Remembrances]({{< relref "/guides/remembrances" >}}) para tener dónde escribir. Úsalo cuando empieces en una zona nueva o en un proyecto que va a durar.

## Mantén el código sencillo

Ponytail es la voz del veterano que pregunta «¿de verdad necesitamos esto?». Empuja a Pando hacia el cambio más pequeño que resuelve el problema.

```
/ponytail lite     # builds what you ask, and mentions the lazier option
/ponytail full     # built-in tools first, smallest change, shortest explanation
/ponytail ultra    # removes before adding, and questions the request itself
/ponytail off      # back to normal
```

Va bien en sesiones de limpieza y en proyectos que se han complicado más de la cuenta.

## Ordena una conversación larga

Un modelo solo puede tener en la cabeza cierta cantidad de conversación. Cuando un chat se alarga, compactar sustituye la parte antigua por un resumen, como convertir veinte páginas de notas de reunión en una página de conclusiones.

```
/compact
```

`/summarize` hace lo mismo. Para que Pando lo haga solo cuando la conversación está casi llena, vuelve a **Configuración > Agentes > Coder** y activa **Auto-compact**. **Compact threshold** dice cuánto es «casi llena»; `0` deja que Pando decida. El agente **Summarizer** de esa misma página es quien escribe el resumen, y le basta un modelo barato.

Compacta al terminar una tarea y antes de empezar otra.

## Mézclalos

Los mandos son independientes. `/superpowers` con `/caveman lite` da un proceso cuidadoso con respuestas cortas. `/learning` con `/ponytail full` da código sencillo y buenas notas.

Caveman y Ponytail pueden tener un valor por defecto para las sesiones nuevas. Superpowers y Learning se activan siempre a mano, sesión a sesión, y no sobreviven al cierre de Pando.

## Comprueba que funciona

Escribe `/caveman ultra` y pregunta «¿qué hace este proyecto?». La respuesta debería ser un puñado de líneas escuetas. Escribe `/caveman off` y pregunta otra vez: vuelven las frases completas.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| El esfuerzo que quieres no está en la lista | Ese modelo no lo acepta. Elige otro modelo o el valor más cercano |
| Las respuestas de Caveman son demasiado secas | Baja un nivel, o pide «explícamelo» en una respuesta |
| `/learning-finish` no lo desactivó | El paso de cierre se interrumpió. Ejecútalo otra vez |
| Pando olvidó algo tras `/compact` | Los resúmenes guardan decisiones, no cada detalle. Pega el detalle otra vez o guárdalo en la [memoria]({{< relref "/guides/remembrances" >}}) |

## ¿Prefieres la terminal?

Todos los comandos funcionan igual en la interfaz de terminal. Los valores por defecto se pueden fijar en el fichero de configuración; las claves están en la [referencia de modos de trabajo]({{< relref "/docs/configuration/modes" >}}).

Para leer más sobre cada mando: [Razonamiento y esfuerzo]({{< relref "/docs/features/reasoning-modes" >}}), [Caveman]({{< relref "/docs/features/caveman-mode" >}}), [Superpowers]({{< relref "/docs/features/superpowers-mode" >}}), [Learning]({{< relref "/docs/features/learning-mode" >}}), [Ponytail]({{< relref "/docs/features/ponytail" >}}) y [Compactación de sesión]({{< relref "/docs/features/session-compaction" >}}).
