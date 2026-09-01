---
title: Web-UI y PWA
weight: 3
---

Todas las funcionalidades de Pando están disponibles a través de una interfaz web accesible desde cualquier navegador moderno. La Web-UI de Pando proporciona una experiencia de usuario fluida e interactiva, diseñada para ser utilizada en cualquier dispositivo con acceso a un navegador, incluyendo ordenadores de escritorio, portátiles, tabletas y smartphones.

La interfaz web de Pando incluye las siguientes características:

- **Soporte multi-idioma**: La Web-UI de Pando está disponible en varios idiomas, incluyendo inglés, español, francés, alemán, portugués, chino y japonés, con la posibilidad de añadir más idiomas en el futuro.
- **Interfaz chat y soporte de carga de sesiones anteriores**: Puedes cargar cualquier sesión anterior a través del menú de sesiones, o iniciar una nueva sesión desde la pantalla principal.
- **Panel de configuración interactivo**: Accede al panel de configuración desde el menú principal, donde puedes añadir proveedores de IA, configurar herramientas, y personalizar otras opciones de Pando.
- **Acceso a opciones y comandos**: Accede a un menú de comandos y opciones desde la barra lateral, incluyendo la posibilidad de abrir terminales interactivos, ver paneles de logs, subagentes, etc.
- **Lanzador de Comandos Actualizado**: Ejecuta cualquier comando del sistema local de forma rápida y segura desde tu navegador utilizando la nueva barra de acciones intuitiva.
- **Cambio de modelo y proveedor en caliente**: Puedes cambiar el modelo o proveedor de IA que estás utilizando en cualquier momento durante la sesión, sin necesidad de reiniciar.
- **Navegación de ficheros**: Puedes abrir el panel de ficheros desde la barra lateral, puedes abrir cualquier fichero de texto con resaltado de sintaxis de código, y también editarlos dentro de Pando en la interfaz web, sin necesidad de abrir un editor externo.
- **Soporte de múltiples ficheros abiertos en pestañas**: Puedes abrir múltiples ficheros a la vez y navegar entre ellos en pestañas dentro de la Web-UI.
- **Visualización de imágenes y gráficos**: La Web-UI de Pando soporta la visualización de imágenes y gráficos generados por los agentes, directamente en la interfaz.
- **Terminal integrado**: La Web-UI de Pando incluye un terminal real potenciado por xterm.js, con soporte completo de interacción de shell incluyendo zsh, historial de comandos y colores ANSI.
- **Barra lateral de info del chat**: Un panel de información en el lado derecho mostrando detalles de sesión, archivos modificados e info del repositorio — similar a la barra lateral de la TUI.
- **Autenticación básica**: Al vincular a una IP externa, habilita aut básica para asegurar tu instancia de Pando con usuario y contraseña.
- **Página Design**: crea, previsualiza e itera artefactos de diseño sin salir del navegador, con recarga en vivo y galería de plantillas. Ver [Design Studio](../design-studio).
- **Interruptor de acceso externo en el pie**: haz accesible la instancia en marcha desde tu móvil u otra máquina sin reiniciar. Ver [WebUI Access](../webui-access).
- **Lista de sesiones rápida**: las sesiones se cargan progresivamente al hacer scroll, así que un histórico largo ya no ralentiza la apertura.
- **Directorio de trabajo siempre visible**: el panel de información del chat muestra sobre qué directorio opera la sesión.
- **Navegador de carpetas para la base de conocimiento**: elige la ruta indexada desde un explorador en los ajustes de Remembrances en vez de escribirla.
- **Selector de modelo de embeddings**: elige el modelo de embeddings por proveedor directamente en los ajustes de Remembrances.
- **Vista simple y vista avanzada**: Puedes cambiar entre una vista simple, con solo el chat y las herramientas básicas, y una vista avanzada que muestra todas las opciones, paneles y funcionalidades de Pando, para adaptarse a diferentes niveles de experiencia y necesidades de los usuarios.

{{< callout >}}
  La Web-UI de Pando es completamente responsiva, lo que significa que se adapta automáticamente al tamaño de la pantalla del dispositivo que estés utilizando, proporcionando una experiencia óptima tanto en ordenadores de escritorio como en dispositivos móviles. Además, cuenta con un **sistema de reconexión resiliente**, que reintenta y restablece tu sesión de chat de forma automática si experimentas cortes temporales en tu conexión de red.
{{< /callout >}}

{{< youtube 6ETefyLsaOM >}}