---
title: "Tu primera sesión con Pando"
shortTitle: "Tu primera sesión"
description: "Abre Pando en un proyecto, pide algo de verdad y mira qué se movió bajo tierra."
summary: "Una petición, seguida desde la superficie hasta las raíces."
track: surface
level: beginner
weight: 2
featured: true
home: true
video:
  provider: youtube
  id: ""
  subtitles: [en, es]
chapters:
  - { t: "00:00", title: "Abre Pando en un proyecto" }
  - { t: "00:00", title: "Conoce la pantalla" }
  - { t: "00:00", title: "Pide algo de verdad" }
  - { t: "00:00", title: "Di sí o no" }
  - { t: "00:00", title: "Qué pasó por debajo" }
  - { t: "00:00", title: "Vuelve más tarde" }
  - { t: "00:00", title: "Comprueba que funciona" }
  - { t: "00:00", title: "Si algo falla" }
---

Diez minutos, una petición real. Necesitas Pando [instalado]({{< relref "/guides/install" >}}) y al menos una cuenta de IA conectada; si te recibe el asistente de configuración, [esta guía]({{< relref "/guides/setup-providers-models" >}}) te acompaña.

## Abre Pando en un proyecto

Pando trabaja sobre una carpeta, igual que un jardinero trabaja una parcela. Elige la carpeta de tu proyecto:

- **App de escritorio**: abre Pando, ve a **Proyectos**, pulsa **Añadir proyecto**, elige la carpeta y haz clic en el proyecto de la lista. Se abre en su propia pestaña, abajo.
- **Desde una terminal**: entra en la carpeta y arranca la Web UI.

```sh
cd mi-proyecto
pando app
```

La terminal muestra una dirección. Ábrela en el navegador.

## Conoce la pantalla

{{< shot src="images/webui/pando-webui-chat-light.jpg" dark="images/webui/pando-webui-chat-dark.jpg" alt="La pantalla de chat de Pando" >}}

Tres columnas, como un banco de trabajo:

- **Izquierda**: tus sesiones (conversaciones anteriores) y el menú hacia el resto de pantallas.
- **Centro**: la conversación. En el cuadro de abajo escribes tú.
- **Derecha**: la ficha de la sesión: en qué carpeta trabaja Pando, si el sandbox está activo y qué ficheros ha cambiado.

## Pide algo de verdad

Sáltate el «hola». Pide algo que necesites, o pulsa uno de los botones de arranque bajo el cuadro: **Explica este código**, **Encuentra y corrige un bug**, **Escribe tests**, **Revisa mis cambios**.

```
Explícame cómo funciona el inicio de sesión en este proyecto y dime qué ficheros intervienen.
```

Pulsa **Intro**. Pando empieza a leer ficheros y te va contando lo que hace.

## Di sí o no

Cuando Pando quiere hacer algo que cambia tu proyecto, como editar un fichero o ejecutar un comando, pregunta antes. Lee la petición y permítela o deniégala. Las llaves las tienes tú.

Si va en mala dirección no hace falta pararlo: escribe otro mensaje mientras trabaja («solo la parte del login, por favor») y corrige el rumbo en el siguiente momento seguro. Eso se llama [dar indicaciones sobre la marcha]({{< relref "/docs/features/steering" >}}).

## Qué pasó por debajo

Tú escribiste un mensaje. Bajo tierra se movieron varias piezas a la vez.

{{< under-surface >}}
Pando buscó en tu código las partes relacionadas con tu pregunta, recordó lo que había apuntado antes sobre este proyecto y eligió las herramientas que necesitaba. Si el trabajo hubiera sido mayor, lo habría repartido entre ayudantes. Nada de eso necesitó una orden tuya.
{{< /under-surface >}}

## Vuelve más tarde

Cierra la ventana. Tu conversación se queda en la lista de la izquierda, con un título que le ha puesto Pando. Haz clic mañana y sigue donde lo dejaste, desde la app de escritorio, el navegador o la terminal: es la misma sesión en todas partes.

## Comprueba que funciona

- La respuesta menciona ficheros reales de tu proyecto.
- La sesión aparece en la columna izquierda con un título.
- Si Pando editó algo, el fichero aparece en **Archivos modificados**, a la derecha.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Un asistente de configuración en lugar del chat | Aún no hay cuenta de IA. Sigue [Conecta tus cuentas de IA]({{< relref "/guides/setup-providers-models" >}}) |
| Una barra amarilla que dice que el proyecto no tiene fichero de configuración local | No pasa nada. Pulsa **Dismiss**, o **Setup assistant** si quieres ajustes solo para este proyecto |
| La respuesta no arranca | Mira el nombre del modelo junto al botón de enviar y prueba con otro |
| Pando habla de otra carpeta | Mira **Directorio de trabajo** a la derecha. Abre el proyecto correcto desde **Proyectos** |

Siguiente paso: [date una vuelta por la Web UI]({{< relref "/guides/webui-tour" >}}).
