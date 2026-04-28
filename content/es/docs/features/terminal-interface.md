---
title: Terminal UI
weight: 1
---

Pando dispone por defecto de una interfaz Terminal UI o TUI. Esta interfaz proporciona un completo sistema de agente AI interactivo a través de una terminal, compatible con SSH, terminales en Android, y cualquier sistema operativo que soporte terminales. La TUI de Pando es una experiencia de usuario fluida e interactiva, diseñada para ser utilizada en entornos sin acceso a interfaces gráficas, manteniendo toda la potencia de Pando accesible desde cualquier terminal.

La interfaz TUI de Pando incluye las siguientes características:

- **Interfaz chat y soporte de carga de sesiones anteriores**: Puedes cargar cualquier sesión anterior a través de Ctrl+s, o iniciar una nueva sesión con Ctrl+n. 
- **Panel de configuración interactivo**: Pulsa Ctrl+g para acceder al panel de configuración, donde puedes añadir proveedores de IA, configurar herramientas, y personalizar otras opciones de Pando.
- **Acceso a opciones y comandos**: Pulsa Ctrl+p para acceder a un menú de comandos y opciones, incluyendo la posibilidad de ejecutar abrir terminales interactivos, abrir paneles de logs, subagentes, etc..
- **Cambio de modelo y proveedor en caliente**: Puedes cambiar el modelo o proveedor de IA que estás utilizando en cualquier momento durante la sesión, sin necesidad de reiniciar.
- **Navegación de ficheros**: Puedes abrir el panel de ficheros con Ctrl+r, puedes abrir cualquier fichero de texto con resaltado de sintaxis de código, y también editarlos dentro de Pando en la interfaz TUI, sin necesidad de abrir un editor externo.
- **Soporte de múltiples ficheros abiertos en pestañas**: Puedes abrir múltiples ficheros a la vez y navegar entre ellos en pestañas dentro de la TUI.
- **Visualización de imágenes y gráficos**: La TUI de Pando soporta la visualización de imágenes y gráficos generados por los agentes, directamente en la terminal.
- **Visualización de ficheros modificados en repositorios GIT**: Si estás trabajando en un proyecto con un repositorio GIT, puedes visualizar los ficheros modificados y sus cambios directamente en la TUI, lo que facilita la revisión de cambios y la gestión de versiones.


{{< callout >}}
  Usa Ctrl+h en cada vista para ver los atajos de teclado disponibles en cada panel. La TUI de Pando está diseñada para ser completamente operable a través de atajos de teclado, lo que permite una experiencia rápida y eficiente sin necesidad de usar el ratón pero también tiene soporte de ratón para moverte por las opciones en la pantalla.
{{< /callout >}}

{{< asciinema file="https://asciinema.org/a/QvjIvPKDk2PEnHXD.cast" >}}