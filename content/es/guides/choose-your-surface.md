---
title: "Escritorio, web, terminal o una línea: elige tu superficie"
shortTitle: "Elige tu superficie"
description: "Saber qué puerta de entrada a Pando encaja en cada momento y cómo abrirla."
summary: "Las mismas sesiones, cuatro formas de entrar."
track: surface
level: beginner
weight: 4
---

Pando es una casa con cuatro puertas. Entres por la que entres, encuentras las mismas habitaciones: tus sesiones, tu memoria, tus ajustes. Esta guía abre cada puerta una vez para que decidas cuál te gusta para qué.

## La app de escritorio: la puerta principal

Lo mejor para jornadas largas. Abre **Pando** desde el menú de aplicaciones, el Dock o el menú Inicio, o escribe:

```bash
pando desktop
```

Tienes una ventana propia, avisos cuando un trabajo largo termina o te necesita y, en Linux y Windows, un icono en la bandeja del sistema para recuperar la ventana.

{{< shot src="images/webui/pando-webui-chat-light.jpg" dark="images/webui/pando-webui-chat-dark.jpg" alt="Pando en su ventana de escritorio" >}}

Abierto desde el icono, Pando arranca en tu carpeta personal. Ve a **Proyectos** para abrir el proyecto que quieras.

## La Web UI: la puerta que se abre desde cualquier sitio

Es exactamente la misma interfaz, dentro de un navegador. Arráncala desde la carpeta del proyecto:

```bash
cd mi-proyecto
pando app
```

Abre la dirección que muestra la terminal (por defecto `https://localhost:8765`). Tu navegador también puede instalarla como aplicación, con su propio icono: busca **Instalar** en la barra de direcciones o en el menú del navegador. Para usarla desde el móvil u otro ordenador, mira [Acceso remoto]({{< relref "/guides/remote-access" >}}).

¿Quieres menos botones? Elige **Chat Simple** en el menú de la izquierda: solo la conversación y tus sesiones.

{{< shot src="images/webui/pando-webui-simple-chat.jpg" alt="Vista de chat simple" >}}

## La interfaz de terminal: la puerta del taller

Para quien vive en la terminal o trabaja en un servidor por SSH. Escribe:

```bash
pando
```

Todo se maneja con el teclado. Con cuatro atajos llegas lejos: `Ctrl+N` sesión nueva, `Ctrl+S` sesiones anteriores, `Ctrl+G` ajustes, `Ctrl+P` todos los comandos. `Ctrl+H` muestra los atajos de lo que tengas en pantalla.

## Una línea: el buzón

A veces no quieres entrar, solo dejar una nota. Pregunta una cosa y recibe la respuesta en la misma terminal:

```bash
pando -p "Explain the use of context in Go"
```

También sirve dentro de scripts: añade `-f json` para una respuesta que otros programas puedan leer, y `--yolo` para que Pando use sus herramientas sin preguntar (solo donde sea seguro).

Y cuando no recuerdes un comando, pídelo con tus palabras:

```bash
pando cli-assist "How can I list files in the current directory?"
```

## Dentro de tu editor: la puerta lateral

Si trabajas en Zed, VS Code, JetBrains o Xcode, Pando puede vivir en el panel de asistente del propio editor. Esa puerta tiene su guía: [Editores y otras aplicaciones]({{< relref "/guides/editors-and-other-apps" >}}).

## Cuál y cuándo

| Quieres… | Usa |
|---|---|
| Trabajar horas con ficheros, terminal y chat a la vez | App de escritorio |
| Llegar a Pando desde una tableta, un móvil u otro ordenador | Web UI |
| Quedarte en la terminal o trabajar por SSH | Interfaz de terminal |
| Preguntar algo rápido o automatizar una tarea | Una línea (`pando -p`) |
| Recuperar un comando que olvidaste | `pando cli-assist` |

## Comprueba que funciona

Empieza una conversación en una superficie, ciérrala y abre otra en la misma carpeta. La sesión está en la lista, lista para continuar.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| El navegador avisa del certificado | Pando crea su propio certificado para la conexión segura. Mira [Certificados HTTPS automáticos]({{< relref "/docs/features/https-auto-cert" >}}) para confiar en él una vez |
| `pando desktop` dice que no hay pantalla | Estás en una máquina sin pantalla. Usa `pando app` y un navegador |
| La lista de sesiones está vacía en otra superficie | Arrancaste Pando en otra carpeta. Las sesiones pertenecen a la carpeta del proyecto |
| En la terminal los iconos salen como cuadrados | La fuente de tu terminal no tiene iconos. Arranca con `PANDO_NERD_FONTS=0 pando` |

Todas las opciones de arranque están en la [referencia]({{< relref "/docs/configuration/webui" >}}).
