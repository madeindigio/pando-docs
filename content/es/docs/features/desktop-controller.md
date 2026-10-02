---
title: Controlador de Escritorio
weight: 35
---

El Controlador de Escritorio deja que Pando use las aplicaciones de tu pantalla: ver cuáles hay abiertas, leer lo que dice una ventana, pulsar botones, rellenar campos, pulsar teclas y sacar capturas. Funciona en Windows, macOS y Linux.

**Desactivado por defecto.** Da a Pando la capacidad de actuar en tu escritorio como si fueras tú, así que lee las notas de seguridad de abajo antes de encenderlo.

## Por qué es distinto del «computer use»

La mayoría de asistentes que controlan un ordenador sacan una foto de la pantalla, la miran con los ojos entornados y hacen clic donde creen que está el botón. Pando lee la descripción que la propia ventana da de sí misma, la misma que usan los lectores de pantalla para personas ciegas. Es la diferencia entre encontrar una tienda por una foto borrosa y por su dirección.

- **Mucho más barato.** La lista de botones de una ventana son unas líneas de texto. Una captura cuesta lo que varias páginas.
- **Mucho más fiable.** Un clic no falla porque una ventana se haya movido o un diálogo aún se esté desplegando.
- **Las fotos, solo como último recurso**, para pantallas que no describen nada de sí mismas (juegos, lienzos de dibujo, escritorios remotos). Cuando Pando actúa a ojo, lo dice.

## Qué hace por ti

- Trabaja con programas que no tienen otra puerta de entrada: una ventana de ajustes, una herramienta de escritorio antigua, un diálogo «Guardar como» del sistema.
- Lleva una tarea por varias aplicaciones: copiar de una, pegar en otra.
- Mirar es gratis; tocar pregunta antes. Pando lista aplicaciones, lee ventanas y busca elementos por su cuenta. Antes de hacer clic, escribir, pulsar una tecla, desplazar o sacar una captura te pregunta, con el mismo aviso de permiso que para editar un fichero.

## Cuándo usarlo

Úsalo cuando lo que quieres automatizar vive en una ventana de escritorio y no en un fichero, un comando o una página web.

Para páginas web sin más, encajan mejor las [herramientas de navegador]({{< relref "/docs/features/browser-automation" >}}): úsalas cuando conoces la dirección o quieres detalles de consola y de red. Usa las de escritorio cuando el navegador es una parada dentro de un viaje más largo que también pasa por ventanas del sistema, o cuando solo conoces un elemento por lo que pone en pantalla. Si ya hay una sesión de navegador abierta, las herramientas de escritorio la ven como una aplicación más; nunca abren un navegador por su cuenta.

## Conviene saber

**Lo maduro que está**, con franqueza:

- Control de navegadores: verificado del todo.
- Linux: verificado en un escritorio real.
- Windows y macOS: hecho y publicado, pero quienes mantienen Pando aún no lo han validado en un escritorio real. Tómalo como soporte temprano y cuéntanos lo que encuentres.

**Lo que puede pedirte el sistema.** macOS quiere que des a Pando el permiso de Accesibilidad, y el de Grabación de pantalla para las capturas. Linux con Wayland muestra un diálogo de consentimiento la primera vez. Windows no necesita nada. Si falta un permiso, Pando te dice cuál; nunca finge.

**Seguridad.**

- Cada acción que cambia algo, y cada captura, pasa por un aviso de permiso.
- Una captura enseña toda tu pantalla, con lo demás que tengas abierto. Por eso pregunta aunque no cambie nada.
- Un clic «a ojo» se describe así en el aviso, para que siempre sepas cuándo Pando no está del todo seguro.
- Puedes ponerle una valla: la lista de las únicas aplicaciones que puede tocar, y la de las que no debe tocar nunca (tu gestor de contraseñas, el correo). La lista de «nunca» siempre gana.
- Puedes prohibir del todo el ratón y el teclado reales.

{{< callout type="warning" >}}
No enciendas el Controlador de Escritorio en una instalación donde no mira nadie o donde las acciones se aprueban solas, salvo que le hayas puesto la valla de una lista de aplicaciones permitidas. Un aviso de permiso solo te protege mientras hay una persona leyéndolo.
{{< /callout >}}

## Siguientes pasos

- Guía: [Dale ojos y manos a Pando]({{< relref "/guides/web-browser-desktop-tools" >}}) lo enciende y pone las vallas.
- Referencia: [todas las opciones, qué pide permiso y qué necesita cada plataforma]({{< relref "/docs/configuration/tools" >}}).
