---
title: Agent-VCS (Control de Versiones para Agentes)
weight: 15
---

Agent-VCS es el diario que lleva Pando de lo que cambia en tus ficheros. Piensa en los puntos de guardado de un videojuego: antes de empezar, Pando guarda la partida; después de cada turno de trabajo, vuelve a guardar. Puedes abrir cualquier punto de guardado para ver qué cambió, y cargarlo para recuperar tus ficheros tal como estaban.

Es un diario propio de Pando. No toca tu historial de git.

Viene **desactivado**. Lo enciendes una vez, en la configuración, y desde entonces cada conversación tiene su diario.

## Qué hace por ti

- **Recuperas tu código.** Cada conversación guarda su propia cadena de puntos de guardado, que empieza con tus ficheros tal como estaban antes de que Pando tocara nada. Con un clic vuelves a cualquiera.
- **Ves exactamente qué cambió.** En cada punto de guardado: qué ficheros se añadieron, cambiaron o borraron, y cada cambio línea a línea, lo antiguo a la izquierda y lo nuevo a la derecha.
- **Un deshacer de cualquier tamaño.** Recupera un fichero, unos cuantos o todo.
- **Deshacer también es seguro.** Antes de volver atrás, Pando guarda el presente, por si cambias de opinión.

## Cómo se nota en el día a día

{{< shot src="images/webui/pando-webui-agent-vcs-commit.jpg" alt="Agent VCS: una sesión, sus dos puntos de guardado y los ficheros que cambiaron en el último" >}}

Abres la vista **Agent VCS** y eliges una conversación. Sus puntos de guardado aparecen del más nuevo al más antiguo; el más antiguo lleva la marca **BASELINE** y es tu proyecto antes de que empezara la conversación. Pulsas en un punto de guardado, ves la lista de ficheros que cambió y pulsas en un fichero para leer el cambio.

Mientras chateas no hace falta abrir nada: junto a la conversación hay una lista de los ficheros que Pando ha tocado, con las líneas añadidas y quitadas.

## Cuándo usarlo

- Después de una ejecución autónoma larga, para repasar lo que hizo Pando antes de llevarlo a git.
- Cuando una conversación salió mal y quieres tus ficheros como estaban al empezarla.
- Cuando te gusta casi todo el trabajo y quieres tirar solo los cambios de un fichero.
- Cuando te preguntas «¿qué cambió el martes pasado?» y quieres leer las páginas de ese día.

## Conviene saber

- Pando guarda una vez al empezar la conversación y otra después de cada turno de trabajo, no después de cada edición.
- Los puntos de guardado no se pueden editar. Lo escrito, escrito está, y eso es lo que hace fiable el diario.
- Cada punto de guardado solo almacena los ficheros que cambiaron, así que el diario ocupa poco incluso en un proyecto grande.
- Tú decides cuántos puntos de guardado se conservan, cuánto pueden envejecer y qué carpetas no entran nunca (las pesadas o las privadas).
- Es una red de seguridad, no un sustituto de git: el diario vive en tu máquina y se va recortando con el tiempo.
- El diseño está inspirado en el sistema de control de versiones jj (Jujutsu).

## Siguientes pasos

- Guía: [Revisa y deshaz lo que hizo el agente]({{< relref "/guides/review-and-undo" >}}).
- Referencia: [Snapshots y Agent-VCS]({{< relref "/docs/configuration/modes" >}}).
