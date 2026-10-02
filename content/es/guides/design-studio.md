---
title: "Diseña páginas y presentaciones con Design Studio"
shortTitle: "Design Studio"
description: "Una landing page o una presentación diseñada por Pando, con vista previa en vivo y exportada."
summary: "Descríbelo, mira cómo se dibuja, pide cambios."
track: surface
level: intermediate
weight: 8
---

Design Studio convierte a Pando en un diseñador sentado a tu lado: tú describes lo que quieres, él dibuja, mira su propio dibujo con ojo crítico y lo rehace hasta que queda bien. Esta guía hace una página de principio a fin. Necesitas Pando abierto en la Web UI o en la app de escritorio (la misma interfaz) y una carpeta de proyecto. No hay nada que activar.

## Abre la página de Diseño

Haz clic en **Diseño** en el menú de la izquierda. Tres botones arriba a la derecha cambian la vista:

- **Lienzo**: el diseño en el que trabajas, dibujado en vivo.
- **Artefactos**: todos los diseños de este proyecto. A un diseño se le llama *artefacto*: una carpeta pequeña con una página web dentro.
- **Plantillas**: puntos de partida.

{{< shot src="images/webui/pando-webui-design-artifacts.jpg" alt="Página de Diseño todavía sin artefactos" >}}

## Empieza con una plantilla

Abre **Plantillas**. Cada tarjeta es una receta: qué construir, en qué orden y qué evitar. Hay recetas para una landing page, un panel de datos, un informe, un correo, una presentación y más.

{{< shot src="images/webui/pando-webui-design-templates.jpg" alt="Plantillas de diseño" >}}

Pulsa **Probar** en una tarjeta. Pando abre un chat con una petición de ejemplo ya escrita; cámbiala para decir lo que quieres *tú* y envíala. La plantilla es solo la mitad: la otra mitad es tu descripción.

**Instalar** copia la plantilla en la carpeta de skills de tu proyecto, para tenerla siempre a mano y poder editar la propia receta.

## O simplemente pídelo

Las plantillas son opcionales. En cualquier chat, describe el diseño:

```
Diseña una landing page para mi herramienta de línea de comandos: oscura, pensada
para desarrolladores, con un titular, tres tarjetas de características y una tabla de precios.
```

## Mira cómo se construye

La vista previa se abre sola y se refresca cada vez que Pando cambia algo. Entre bastidores, Pando además le hace una foto al resultado y le pone nota: ¿se lee bien el texto?, ¿los espacios son regulares?, ¿parece genérico? Si la nota es baja, lo intenta de nuevo antes de enseñártelo.

## Pide cambios

Sigue hablando, como harías con un diseñador:

```
Deja la zona del titular menos recargada y dales más contraste a los botones.
```

Cada ronda aceptada se guarda como versión, así que siempre puedes volver a una anterior.

## Dales a todos tus diseños el mismo aspecto

Un sistema de diseño es el armario de la marca: los colores, las tipografías y los espacios que todo diseño debe vestir. Abre **Configuración > Sistema de diseño**.

{{< shot src="images/webui/pando-webui-settings-design-system.jpg" alt="Ajustes del sistema de diseño" >}}

Puedes escribir los valores a mano o dejar que Pando copie un aspecto que ya existe. En **Extract from**, elige:

- **Code**: los estilos de tu propio proyecto.
- **URL**: una página web publicada.
- **Image**: una captura o un logotipo (solo colores).
- **Style guide**: una guía de marca escrita.

Pulsa **Preview** para ver qué cogería y **Extract** para aplicarlo. Algunas plantillas dicen *Necesita un sistema de diseño confirmado*: con esas, haz antes este paso.

## Llévatelo

Los diseños son ficheros normales dentro de tu proyecto, en la carpeta `designer/`, así que puedes subirlos al repositorio y abrirlos con cualquier herramienta. Para exportar uno como un único fichero, usa la terminal:

```bash
pando design export landing --format html --out /tmp/landing.html
pando design export deck --format pdf --landscape
pando design export landing --format png --full-page
```

## Enséñaselo a alguien

La vista previa la sirve el propio Pando. Activa el **acceso externo** en la barra inferior y la dirección de la vista previa funciona desde un móvil o el ordenador de un compañero en tu red, detrás de tu usuario y contraseña. Mira [Acceso remoto]({{< relref "/guides/remote-access" >}}).

## Comprueba que funciona

- **Artefactos** lista tu diseño.
- El **Lienzo** lo muestra y se actualiza cuando pides un cambio.
- Tu proyecto tiene una carpeta nueva `designer/<nombre>/` con un `index.html` dentro.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| «Aún no hay artefactos de diseño» | Todavía no se ha diseñado nada en este proyecto. Pide uno o usa **Probar** en una plantilla |
| Una plantilla dice que necesita un sistema de diseño | Abre **Configuración > Sistema de diseño**, define o extrae uno y guarda |
| La vista previa sale vacía dentro de una pestaña de proyecto | Las vistas previas no funcionan en pestañas de trabajo. Abre el proyecto en su propia ventana |
| Cada diseño tiene un aspecto distinto | No comparten el sistema de diseño. Ejecuta `pando design system apply <nombre>` |

## ¿Prefieres la terminal?

```bash
pando design create "Landing page"     # make the folder first, so you can commit it
pando design list                      # every design in the project
pando design open                      # preview the most recent one
pando design versions landing          # history of a design
pando design critique landing          # run the quality check yourself
pando design skills                    # list templates
```

Todos los comandos, los ajustes de la comprobación de calidad y los nombres de carpeta están en la [referencia]({{< relref "/docs/configuration/webui" >}}). Qué es Design Studio y cuándo usarlo: [Design Studio]({{< relref "/docs/features/design-studio" >}}).
