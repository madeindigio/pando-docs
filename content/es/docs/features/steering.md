---
title: Retroalimentación Rápida (Steering)
weight: 20
---

Dar indicaciones sobre la marcha es hablar con el conductor sin parar el coche. Mientras Pando está en mitad de un trabajo puedes enviarle un mensaje nuevo, «solo la parte del login, por favor», y corrige el rumbo en el siguiente momento seguro, sin obligarte a cancelar y empezar otra vez.

## Qué hace por ti

- **No se pierde trabajo.** Lo que Pando ya ha terminado se queda terminado. Tu mensaje cambia lo que viene después.
- **No hay que esperar.** No tienes que quedarte mirando hasta que acabe para decir «así no».
- **Más barato que empezar de cero.** Cancelar tira el avance y lo que costó llegar hasta ahí; dar indicaciones conserva las dos cosas.
- **En el momento seguro.** Pando no suelta lo que tiene entre manos. Termina el paso en curso y entonces lee tu mensaje.
- **Paciente.** Si recargas la página, el mensaje que dejaste en cola se entrega igualmente.

## Cómo se vive

1. Pando empieza a ordenar el proyecto entero.
2. Te das cuenta de que es demasiado.
3. Escribes «Céntrate solo en el módulo de login» y lo envías.
4. Pando termina el fichero en el que estaba, lee tu mensaje y acota.

En la Web UI y la app de escritorio basta con escribir en el chat mientras Pando trabaja; el mensaje se pone en cola solo. En la interfaz de terminal lo escribes y pulsas `Ctrl+S`, y un contador muestra cuántos mensajes esperan. En el panel de asistente de un editor, enviar un mensaje a una sesión ocupada hace lo mismo.

## Cuándo usarlo

- Pando ha entendido mal y va en mala dirección.
- Te has acordado de un detalle que importa.
- El trabajo está saliendo más grande de lo que querías.

Si lo que hace es dañino o está claramente mal, páralo. Dar indicaciones es un toque al volante; el botón de parar es el freno.

## Conviene saber

- Tu mensaje se entrega entre pasos, nunca en mitad de uno, así que puede haber una pequeña espera si el paso en curso es lento.
- Si la conversación ha crecido demasiado, Pando resume la parte antigua por su cuenta para hacer sitio.
- Otros programas también pueden dar indicaciones a una sesión, a través de la API.

## Siguientes pasos

- Guía: [Tu primera sesión]({{< relref "/guides/first-session" >}}) lo muestra en contexto.
- Referencia: [la llamada de la API]({{< relref "/docs/configuration/webui" >}}).
- Relacionado: [Preguntas interactivas]({{< relref "/docs/features/ask-user-question" >}}), [Compactación de sesión]({{< relref "/docs/features/session-compaction" >}}).
