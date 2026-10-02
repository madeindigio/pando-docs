---
title: "Revisa y deshaz lo que hizo el agente"
shortTitle: "Revisar y deshacer"
description: "Enciende el diario de cambios, lee lo que cada conversación hizo con tus ficheros y recupera tu código cuando el resultado no te convenza."
summary: "Mira qué cambió y recupera tu código."
track: roots
level: intermediate
weight: 18
---

Dejar que un asistente edite tus ficheros es más fácil cuando sabes que hay un botón de deshacer. Pando puede llevar un diario de cada conversación: un punto de guardado antes de empezar y otro después de cada turno de trabajo. En esta guía enciendes el diario, aprendes a leerlo y a viajar a cualquiera de sus páginas.

Las pantallas son de la Web UI; la app de escritorio es igual.

## Enciende el diario

El diario está apagado hasta que lo pides. Abre **Configuración** y, en **Servicios**, elige **Snapshots**.

{{< shot src="images/webui/pando-webui-settings-snapshots.jpg" alt="Ajustes de Snapshots: activación, límites, limpieza automática y patrones excluidos" >}}

1. Activa **Enabled**.
2. **Max snapshots** es cuántos puntos de guardado se conservan; los más antiguos salen primero.
3. **Max file size** deja fuera los ficheros más grandes que este tamaño. Los vídeos y los volcados de base de datos no pintan nada en un diario.
4. **Auto cleanup** borra los puntos de guardado más antiguos que el número de días que pongas.
5. En **Exclude patterns** añade lo que nunca debe guardarse: cosas pesadas o privadas como `node_modules/`, `dist`, `__pycache__` o `.env`. Escribe cada una y pulsa **Add**.
6. Pulsa **Save** y reinicia Pando. El diario empieza con la siguiente conversación.

**Current snapshots**, arriba, te dice cuántos puntos de guardado hay ahora mismo.

## Echa un vistazo a lo que cambió

Mientras chateas, el panel de la derecha tiene un apartado **Archivos modificados**. Lista los ficheros que Pando ha tocado en esta conversación, con las líneas añadidas en verde y las quitadas en rojo.

{{< shot src="images/webui/pando-webui-chat-modified-files.jpg" alt="Chat con la lista de ficheros cambiados bajo la respuesta y el apartado de archivos modificados en el panel derecho" >}}

Si el panel está oculto, ábrelo con el botón de arriba a la derecha del chat. Debajo de cada respuesta, una tira con los ficheros cambiados lista los de ese turno.

## Abre el diario

Abre **Agent VCS** en el menú lateral. Tiene tres columnas.

{{< shot src="images/webui/pando-webui-agent-vcs-commit.jpg" alt="Vista Agent VCS: sesiones, registro de commits y ficheros cambiados en el punto de guardado elegido" >}}

1. **Sessions**: tus conversaciones que tienen diario. Pulsa en una.
2. **Commit Log**: las páginas de esa conversación, de la más nueva a la más antigua. La de abajo lleva la marca **BASELINE**: tus ficheros tal como estaban antes de que Pando tocara nada. La de arriba lleva la marca **HEAD**: cómo están las cosas ahora.
3. **Changed Files**, a la derecha: pulsa en un punto de guardado para ver qué ficheros cambió. Una **A** verde significa añadido; también verás ficheros modificados y borrados.

Este diario es propio de Pando. No toca tu historial de git.

## Lee un cambio línea a línea

Pulsa en el nombre de un fichero en **Changed Files**. Se abre el lector con dos columnas: el fichero de antes a la izquierda y el de después a la derecha. Las líneas quitadas van en rojo y las añadidas en verde.

{{< shot src="images/webui/pando-webui-agent-vcs-diff.jpg" alt="Lector a dos columnas: el fichero antes a la izquierda y después a la derecha, con las líneas nuevas en verde" >}}

Pulsa **Esc** para cerrarlo. Para seguir cómo fue evolucionando un fichero, ábrelo en un punto de guardado tras otro.

## Recupera tu código

Con un punto de guardado seleccionado puedes deshacer en tres tamaños:

- **Un fichero**: pulsa la flecha redonda al final de su fila. Pando recupera solo ese fichero tal como estaba en ese punto.
- **Varios ficheros**: marca sus casillas y pulsa **Revert … selected**.
- **Todo**: pulsa **Revert All**. Todos los ficheros vuelven a como estaban en ese punto.

Pando te pide confirmación. Antes de volver atrás guarda el presente, así que el propio deshacer se puede deshacer: ese punto de seguridad aparece al principio del registro.

Para tirar todo lo que hizo una conversación, selecciona su **BASELINE** y pulsa **Revert All**.

## Comprueba que funciona

Pídele a Pando algo inofensivo: «Crea un fichero NOTES.md con un título». Abre **Agent VCS**, pulsa en la sesión nueva y en su punto de guardado de arriba, y lee el fichero en el lector. Después selecciona **BASELINE** y pulsa **Revert All**. El fichero ha desaparecido y arriba ha aparecido un punto de guardado de seguridad.

{{< under-surface >}}
Pando guardó tu proyecto antes de su primer paso y otra vez al terminar el turno. Cada punto de guardado solo conserva los ficheros que cambiaron, así que el diario ocupa poco incluso en un proyecto grande.
{{< /under-surface >}}

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| **No sessions with commits yet** | El diario está apagado, o no reiniciaste Pando después de encenderlo. Solo se registran las conversaciones empezadas después |
| Una conversación no está en la lista | No cambió ningún fichero, o es anterior a encender el diario |
| La lista se llena de ficheros que no te importan | Añádelos a **Exclude patterns** |
| Falta un fichero en un punto de guardado | No cambió en ese turno. Mira uno anterior o posterior |
| Volviste demasiado atrás | Selecciona el punto de seguridad creado justo antes y pulsa **Revert All** |
| El diario ocupa demasiado | Baja **Max snapshots** o los días de **Auto cleanup**, o recórtalo desde la terminal (abajo) |

## ¿Prefieres la terminal?

```bash
pando agent-vcs sessions              # conversations with a diary
pando agent-vcs log <session-id>      # save points of one conversation
pando agent-vcs show <commit-id>      # what changed in one
pando agent-vcs revert <commit-id>    # go back to it
pando agent-vcs compact --keep 20     # keep only the 20 most recent conversations
pando agent-vcs compact --days 30     # drop conversations older than 30 days
```

`pando avcs` es un nombre más corto para el mismo comando. Las claves de la página de ajustes están en la [referencia de modos de trabajo]({{< relref "/docs/configuration/modes" >}}), y la idea se explica en [Agent-VCS]({{< relref "/docs/features/agent-vcs" >}}).
