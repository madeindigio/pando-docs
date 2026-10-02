---
title: Interfaz de Línea de Comandos (CLI)
weight: 1
---

La línea de comandos es Pando sin muebles: escribes una petición, Pando hace el trabajo y te devuelve la respuesta en la misma terminal. Piensa en un buzón. Dejas una nota y recoges la contestación, sin entrar en la casa.

```bash
pando -p "Write a python script that prints 'Hello World' and run it"
```

## Qué hace por ti

- **Una pregunta, una respuesta.** Sin ventana y sin sesión que gestionar.
- **Encaja en scripts.** Otros programas pueden llamar a Pando y leer lo que dice, así que puede ocupar su turno en tus automatizaciones: una revisión nocturna, un paso de una compilación, un lote de ficheros que ordenar.
- **Funciona donde no hay pantalla.** Un servidor, un contenedor, una máquina a la que llegas por SSH.
- **Con toda su fuerza.** El Pando de una línea lee ficheros, ejecuta comandos, navega por la web y escribe código igual que el de ventana.
- **Un ayudante de bolsillo para la shell.** ¿No recuerdas cómo se hace algo en la terminal? `pando cli-assist` convierte tus palabras en el comando.

## Cómo se vive

Escribes la petición y pulsas Intro. Pando trabaja en silencio e imprime el resultado. Si pediste una salida que puedan leer las máquinas, la recibes en JSON, lista para el siguiente programa de la cadena.

El asistente de comandos es todavía más pequeño. Preguntas «¿cómo listo los ficheros de esta carpeta?» y te propone el comando; tú decides si lo ejecutas.

{{< asciinema file="https://asciinema.org/a/62CCiqfws8mDbL5U.cast" >}}

## Cuándo usarlo

- Una pregunta rápida para la que no quieres abrir una ventana.
- Una tarea que repites y te gustaría automatizar.
- Una máquina sin escritorio.

Para una conversación de verdad, con idas y vueltas, ficheros y terminal a la vista, son más cómodas la [app de escritorio]({{< relref "/docs/features/desktop-app" >}}) o la [Web UI]({{< relref "/docs/features/web-ui" >}}).

## Conviene saber

- En modo de una línea no hay nadie para responder a las preguntas de permiso, así que en ejecuciones desatendidas puedes decirle a Pando de antemano que use sus herramientas libremente. Hazlo solo donde un error no pueda hacer daño.
- La petición puede venir del propio comando, de la salida de otro programa o de una variable, así que es fácil encadenarlo.
- Los trabajos largos y autónomos van mejor como objetivo: mira [Goal Mode]({{< relref "/docs/features/goal-mode" >}}).

## Siguientes pasos

- Guía: [Elige tu superficie]({{< relref "/guides/choose-your-surface" >}}), con los comandos para probar.
- Referencia: [todas las opciones y comandos de arranque]({{< relref "/docs/configuration/webui" >}}).
- Relacionado: [Interfaz de terminal]({{< relref "/docs/features/terminal-interface" >}}), [Comandos slash]({{< relref "/docs/features/slash-commands" >}}).
