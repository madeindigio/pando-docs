---
title: Compactación de Base de Datos
weight: 27
---

Pando guarda tus sesiones, recuerdos e índice de código en un solo fichero de tu disco. Cuando borras cosas, el fichero no encoge solo: es un cuaderno con hojas arrancadas que sigue ocupando lo mismo en la estantería. La compactación vuelve a encuadernar el cuaderno sin los huecos.

```
/db-compact
```

## Qué hace por ti

- **Devuelve espacio en disco** después de borrar sesiones o recuerdos.
- **Te cuenta el resultado**: tamaño antes, tamaño después y cuánto se ha liberado.
- **Abarata las limpiezas futuras.** Tras la primera pasada completa, Pando puede ir devolviendo espacio libre en pasos pequeños y rápidos.

## Cómo se nota en el día a día

Escribe `/db-compact` en cualquier chat, en la Web UI, en la interfaz de terminal o en tu editor. Pando trabaja un momento y te da los números. En tus sesiones no cambia nada; solo desaparece el espacio desperdiciado.

{{< shot src="images/webui/pando-webui-chat-slash-commands.jpg" alt="Lista de comandos slash en el chat, con /db-compact" >}}

## Cuándo usarlo

De vez en cuando, y sobre todo después de una limpieza grande. Hay una variante más ligera que solo devuelve el espacio ya marcado como libre; es más rápida y sirve para el uso rutinario.

## Conviene saber

- Es seguro con varias ventanas de Pando abiertas en el mismo proyecto. La petición se pasa a la que se encarga de escribir, así que nunca se pisan.
- Una base de datos muy grande puede tardar un rato.
- No hay nada que configurar.

## Siguientes pasos

- Mantenimiento paso a paso: [Actualizar y diagnosticar]({{< relref "/guides/update-and-diagnostics" >}})
- Opciones del comando: [referencia de diagnóstico y mantenimiento]({{< relref "/docs/configuration/diagnostics" >}})
- Todos los comandos del chat: [Comandos slash]({{< relref "/docs/features/slash-commands" >}})
