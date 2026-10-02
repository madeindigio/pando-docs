---
title: Aplicación de escritorio nativa
weight: 5
---

La app de escritorio es Pando con ventana propia, en macOS, Windows y Linux. La misma interfaz que la Web UI, pero vive entre tus otras aplicaciones y no entre las pestañas del navegador: es como tener un escritorio para ti en lugar de un rincón prestado de la mesa de la cocina.

## Qué hace por ti

- **Un toque en el hombro.** Encárgale a Pando un trabajo largo, minimiza la ventana y haz otra cosa. Un aviso del sistema te dice cuándo ha terminado o cuándo Pando necesita una respuesta.
- **Muchas cosas a la vez.** Varias sesiones y varios proyectos siguen trabajando en segundo plano sin estorbarse.
- **Siempre a mano.** Ábrela desde el Dock, el menú Inicio o el lanzador de aplicaciones. En Linux y Windows, un icono en la bandeja del sistema recupera la ventana o cierra la app.
- **Todo el sitio para tu trabajo.** La ventana no tiene barra de título aparte: los botones de minimizar, maximizar y cerrar comparten una sola barra con el título de la sesión, así que el contenido aprovecha toda la altura. Arrastra esa barra para mover la ventana.
- **Privada por defecto.** Conversaciones, ajustes e historial se quedan en tu máquina, y la app habla con su propio motor por una conexión local cifrada.
- **Instaladores de confianza.** El instalador de macOS y el programa de Windows están firmados, así que el sistema los abre sin avisos de seguridad.

## Cómo se vive

Haces clic en el icono de Pando. La app se abre en tu carpeta personal como espacio general; desde **Proyectos** abres el proyecto que quieras, como pestaña en la misma ventana o en una ventana propia. Cada ventana tiene su carpeta, sus sesiones y sus terminales.

En un Mac además aprende las mismas rutas que usa tu terminal, así que las herramientas que instalaste con Homebrew o con un gestor de versiones se encuentran sin pasos extra.

La primera vez, sin nada configurado, te recibe el [asistente de configuración]({{< relref "/docs/features/setup-assistant" >}}).

## Cuándo usarla

- Pando forma parte de tu jornada y merece su sitio.
- Lanzas trabajos largos y quieres que te avisen al terminar.
- Llevas varios proyectos a la vez.

En una máquina sin pantalla, o desde otro dispositivo, usa la [Web UI]({{< relref "/docs/features/web-ui" >}}).

## Conviene saber

- En Linux la ventana necesita dos librerías habituales del sistema (GTK 3 y WebKitGTK). Si falta una, Pando la nombra y muestra el comando para instalarla en tu distribución. El script de instalación se ocupa de ello.
- Si no hay sesión gráfica, por ejemplo por SSH, Pando explica que no hay pantalla en la que abrir una ventana.
- Abrir un proyecto como pestaña lo mantiene todo en una ventana y un icono de bandeja; una ventana aparte es algo que pides expresamente.

## Siguientes pasos

- Guías: [Instala Pando]({{< relref "/guides/install" >}}), [Elige tu superficie]({{< relref "/guides/choose-your-surface" >}}), [Proyectos y pestañas]({{< relref "/guides/projects-workspaces" >}}).
- Referencia: [comandos de arranque y compilación desde el código]({{< relref "/docs/configuration/webui" >}}).
- Relacionado: [Instaladores multiplataforma]({{< relref "/docs/features/installers" >}}), [Espacios de proyecto]({{< relref "/docs/features/project-workspaces" >}}).
