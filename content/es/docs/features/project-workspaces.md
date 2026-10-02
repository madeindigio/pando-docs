---
title: Espacios de trabajo de proyecto
weight: 4
---

Los espacios de proyecto te permiten tener varios proyectos abiertos dentro de un mismo Pando, cada uno en su pestaña al pie de la ventana. Piensa en las pestañas del navegador, solo que cada una contiene un Pando entero apuntando a una carpeta distinta: su chat, sus sesiones, sus ficheros y su terminal.

{{< shot src="images/webui/pando-webui-project-workspace-tab.jpg" alt="Un proyecto abierto en su propia pestaña" >}}

## Qué hace por ti

- **Se acabó el baile de ventanas.** La web, la API y la app móvil en las que trabajas conviven como pestañas.
- **No se pierde nada al cambiar.** Una pestaña sigue funcionando mientras estás en otra: la terminal se queda a medio comando y la conversación donde estaba.
- **Vuelta instantánea.** Al cerrar una pestaña puedes dejar su espacio de trabajo en marcha, y reabrirla es inmediato. O apagarlo del todo cuando termines.
- **Pestañas que sobreviven a una recarga.** Recarga la página y vuelven.
- **Compartidas con tus ayudantes.** Cuando Pando encarga trabajo de un proyecto a agentes ayudantes y ese proyecto ya tiene un espacio en marcha, los ayudantes lo usan en lugar de arrancar una segunda copia.

## Cómo se vive

Abres **Proyectos**, haces clic en una fila y aparece abajo una pestaña nueva, con un punto verde cuando está lista. A partir de ahí pasas de la pestaña principal a las de proyecto con un clic o un atajo de teclado. La lista de proyectos enseña de un vistazo qué espacios están en marcha y cuáles detenidos.

En la app de escritorio las pestañas se quedan dentro de la ventana principal: una ventana, un icono de bandeja. Si prefieres un proyecto en una ventana aparte, también hay una acción para eso.

## Cuándo usarlo

- Trabajas en dos o más proyectos relacionados el mismo día.
- Quieres un trabajo largo en un proyecto mientras conversas en otro.
- Delegas trabajo entre proyectos.

Con un único proyecto no necesitas pestañas: abre Pando en esa carpeta y ya está.

## Conviene saber

Cada pestaña es una habitación privada en la que solo entra el Pando principal:

- Una pestaña de proyecto solo responde a tu propia máquina, nunca directamente a la red. El Pando principal es la única puerta de entrada, con su cerradura de siempre.
- El pase con el que el Pando principal habla con una pestaña nunca llega a tu navegador.
- Una pestaña se detiene cuando se cierra el Pando principal y arranca de nuevo la próxima vez que la abres.
- Hay un límite de espacios en marcha a la vez (seis por defecto), para que un montón de pestañas olvidadas no se coma tu memoria.
- Las vistas previas de diseño no se ven dentro de una pestaña de proyecto. Para eso, abre el proyecto en su propia ventana.

## Siguientes pasos

- Guía: [Trabaja en varios proyectos con pestañas de trabajo]({{< relref "/guides/projects-workspaces" >}}).
- Referencia: [opciones de `[Projects]`, atajos y API]({{< relref "/docs/configuration/webui" >}}).
- Relacionado: [Delegación de agentes]({{< relref "/docs/features/agent-delegation" >}}), [App de escritorio]({{< relref "/docs/features/desktop-app" >}}).
