---
title: Mejoras de la TUI
weight: 26
---

La interfaz de terminal no es una pantalla negra pelada. Con el tiempo ha ido reuniendo las comodidades que esperas de una app de escritorio: pestañas, temas, un panel lateral, un árbol de ficheros, una terminal integrada. Esta página es el recorrido por esas comodidades, como cuando te enseñan los detalles buenos de un piso.

## Qué hace por ti

- **Tres disposiciones, una tecla cada una.** Solo chat, solo editor o los dos lado a lado, para que la pantalla se ajuste a lo que haces.
- **Una ficha junto al chat.** Título de la sesión, el plan que sigue Pando con el estado de cada paso, los ficheros que ha cambiado y dónde vive el proyecto. Aparece sola cuando la terminal es lo bastante ancha.
- **Temas.** Once temas de color (pando, light, dracula, gruvbox, opencode, onedark, tron, flexoki, tokyonight, catppuccin, monokai), cada uno también con fondo transparente.
- **Menciona un fichero escribiendo `@`.** Un buscador lo encuentra mientras tecleas.
- **Conoce el modelo antes de elegirlo.** La lista de modelos muestra cuánto puede leer cada uno de una vez, cuánto cuesta, si razona o ve imágenes y hasta cuándo llega su conocimiento.
- **Un indicador de combustible.** La barra de estado muestra cuánto se ha llenado la memoria de la conversación mientras Pando trabaja, y avisa al pasar del 80 %.
- **Una terminal de verdad dentro.** Abre un panel de shell, con pestañas, sin salir de Pando.

## Cómo se vive

Empiezas en el chat. Hay que mirar un fichero, así que pasas a la vista partida: código a un lado, conversación al otro. La barra de abajo te mantiene orientado: qué proyecto, qué modelo, cuánta memoria va usada, cuántos errores ha encontrado el comprobador de código, qué ficheros tocaste por última vez. Todo en ella admite clic.

El árbol de ficheros marca los nuevos, los cambiados y los borrados, carga las carpetas solo cuando las abres y filtra mientras escribes. La flecha arriba recupera los mensajes que enviaste antes, como en cualquier shell.

Hay también un interruptor que deja a Pando usar sus herramientas sin preguntar cada vez. Una etiqueta en la barra de estado te lo recuerda mientras está activo.

## Cuándo usarlo

Siempre, si la terminal es tu casa: no son modos que se activan, es la forma de ser de la interfaz de terminal. Prueba los temas y el interruptor de iconos el primer día, y las disposiciones cuando empieces a revisar código.

## Conviene saber

- Los iconos necesitan una fuente que los incluya (una «Nerd Font»). Si ves cuadraditos, desactiva los iconos y Pando dibuja caracteres sencillos.
- Los ficheros ocultos (los que empiezan por punto) no se ven hasta que los pides.
- Dejar que las herramientas actúen sin preguntar es cómodo y arriesgado a partes iguales. El [sandbox de comandos]({{< relref "/docs/features/sandbox" >}}) es la forma más segura de tener menos preguntas.
- `/` está reservada a los [comandos slash]({{< relref "/docs/features/slash-commands" >}}); los ficheros se mencionan con `@`.

## Siguientes pasos

- Guía: [Elige tu superficie]({{< relref "/guides/choose-your-surface" >}}).
- Referencia: [todos los atajos y todas las opciones de `[TUI]`]({{< relref "/docs/configuration/webui" >}}).
- Relacionado: [Interfaz de terminal]({{< relref "/docs/features/terminal-interface" >}}).
