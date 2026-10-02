---
title: Web-UI y PWA
weight: 3
---

La Web UI es Pando en una pestaña del navegador. Todo lo que Pando sabe hacer está ahí, con botones en lugar de comandos, en cualquier dispositivo con navegador: el ordenador de sobremesa, un portátil, una tableta, el móvil. Si Pando fuera un coche, esto sería el salpicadero: el motor es el mismo, pero ahora ves los relojes.

{{< shot src="images/webui/pando-webui-chat-light.jpg" dark="images/webui/pando-webui-chat-dark.jpg" alt="Vista de chat de Pando en la Web UI" >}}

## Qué hace por ti

- **Una conversación con contexto.** El chat va en el centro; tus sesiones anteriores esperan a la izquierda; una ficha a la derecha te dice en qué carpeta trabaja Pando, qué ficheros ha cambiado y qué versión usas.
- **Tu proyecto a mano.** Abre ficheros con colores para el código en varias pestañas, edítalos y usa una terminal de verdad, todo en la misma ventana.
- **Ajustes que se ven.** Proveedores, modelos, herramientas, memoria y seguridad son formularios con interruptores, no un fichero de texto.
- **Habitaciones para las funciones grandes.** Proyectos, el orquestador de agentes ayudantes, la página de Diseño, el historial de cambios, los registros, las instancias en marcha.
- **Tu idioma y tus colores.** Siete idiomas de interfaz; modo claro, oscuro o automático; cuatro temas de color; tamaño de letra ajustable.
- **Dos niveles de detalle.** Una vista completa con todos los paneles y un chat simple con solo la conversación.
- **Se instala como una app.** Tu navegador puede añadirla a la pantalla de inicio o a la lista de aplicaciones con su propio icono. Eso es lo que significa PWA.

## Cómo se vive

Abres la dirección, eliges una sesión o empiezas una, y escribes. Mientras Pando trabaja ves lo que hace, paso a paso. Si necesita una decisión, enseña una tarjeta con opciones. Si quieres otro modelo para esta conversación, lo cambias junto al botón de enviar y sigues, sin recargar.

Si te quedas sin red un momento, en el tren por ejemplo, la página reconecta sola y deja tu chat como estaba. Si sales de una página de ajustes con cambios sin guardar, Pando pregunta antes de descartarlos.

Las mismas pantallas funcionan en el móvil: las columnas se pliegan en menús y el chat ocupa todo el ancho.

## Cuándo usarla

- Te gusta ver y hacer clic.
- Quieres llegar a Pando desde otro dispositivo.
- Vas a enseñar Pando a alguien que no usa la terminal.

La [app de escritorio]({{< relref "/docs/features/desktop-app" >}}) es esta misma interfaz en su propia ventana y con avisos del sistema. La [interfaz de terminal]({{< relref "/docs/features/terminal-interface" >}}) es la hermana que solo usa teclado.

## Conviene saber

- De fábrica, la Web UI solo responde al ordenador en el que funciona. Abrirla a tu red es un paso deliberado, protegido con usuario y contraseña: mira [Acceso a la WebUI]({{< relref "/docs/features/webui-access" >}}).
- La conexión va cifrada con un certificado que fabrica el propio Pando, así que la primera visita muestra un aviso del navegador. Lo explica [Certificados HTTPS automáticos]({{< relref "/docs/features/https-auto-cert" >}}).
- Sin nada configurado, lo primero que ves es el [asistente de configuración]({{< relref "/docs/features/setup-assistant" >}}).
- Cada proyecto puede abrirse como una pestaña en la parte inferior: [Espacios de proyecto]({{< relref "/docs/features/project-workspaces" >}}).

{{< youtube 6ETefyLsaOM >}}

## Siguientes pasos

- Guías: [Oriéntate en la Web UI]({{< relref "/guides/webui-tour" >}}), [Conecta tus cuentas de IA]({{< relref "/guides/setup-providers-models" >}}), [Acceso remoto]({{< relref "/guides/remote-access" >}}).
- Referencia: [comandos de arranque, opciones del servidor y API]({{< relref "/docs/configuration/webui" >}}).
- Relacionado: [Design Studio]({{< relref "/docs/features/design-studio" >}}), [Modo automático de modelos]({{< relref "/docs/features/model-auto-mode" >}}), [Autoactualización]({{< relref "/docs/features/self-update" >}}).
