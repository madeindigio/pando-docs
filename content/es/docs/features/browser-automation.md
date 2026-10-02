---
title: Automatización de Navegador
weight: 24
---

Pando puede usar un navegador web igual que tú: abrir una página, hacer clic, rellenar un formulario, desplazarse y mirar lo que vuelve. Es la diferencia entre leer la carta de un restaurante en un folleto y entrar a pedir.

## Qué hace por ti

- **Lee páginas que necesitan un navegador de verdad.** Muchas webs no muestran nada hasta que se ejecutan sus scripts. Pando espera y lee la página terminada.
- **Hace los clics por ti.** Navegar, pulsar botones, rellenar campos, desplazarse.
- **Enseña lo que ha hecho.** Puede sacar una captura de una página o de un elemento, o guardar la página en PDF.
- **Te ayuda a depurar tu propia web.** Lee los mensajes de consola de la página y las peticiones que hizo, que es donde suelen esconderse los fallos.

## Cómo se nota en el día a día

Dices: «abre nuestra web de pruebas, entra con el usuario de test y dime si carga el panel». Si dejaste la ventana visible, ves cómo se abre el navegador y se mueve solo. Después Pando te cuenta lo que ha visto, con una captura si la pediste.

Cuando solo le das un enlace para leer, prueba primero el camino rápido y recurre al navegador solo si la página lo necesita.

## Cuándo usarlo

- Para probar una aplicación web que estás haciendo.
- Para sacar información de una web que no ofrece otra forma más sencilla.
- Para capturar cómo se ve una página.

Para artículos y documentación sin más, basta la herramienta fetch, más ligera, y Pando la elige solo.

## Conviene saber

- Funciona con los navegadores que seguramente ya tienes: Chrome, Edge, Chromium, Opera.
- También admite dos navegadores muy ligeros y sin ventana, Lightpanda y [Obscura](https://github.com/h4ckf0r0day/obscura). Arrancan rápido y gastan poca memoria, lo que va bien en servidores y comprobaciones automáticas, donde instalar Chrome pesa.
- Tú eliges si la ventana se ve. Visible da confianza; oculta va bien en servidores.
- Si tu navegador de siempre está abierto, Pando usa un perfil temporal y no se pelea por el tuyo.
- Solo mantiene abiertas unas pocas ventanas de navegador a la vez, para no comerse tu memoria.

## Siguientes pasos

- Guía: [Dale ojos y manos a Pando]({{< relref "/guides/web-browser-desktop-tools" >}}) lo enciende y elige un navegador.
- Referencia: [opciones del navegador y lista de herramientas]({{< relref "/docs/configuration/tools" >}}).
- Relacionado: [Controlador de Escritorio]({{< relref "/docs/features/desktop-controller" >}}), para aplicaciones que no son páginas web.
