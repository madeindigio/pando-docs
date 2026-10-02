---
title: "Dale ojos y manos a Pando: búsqueda web, navegador y escritorio"
shortTitle: "Web, navegador y escritorio"
description: "Deja que Pando busque en la web, abra páginas en un navegador de verdad, trabaje con las aplicaciones de tu pantalla y lea tus PDF y ficheros de Office."
summary: "Buscar en la web, manejar un navegador, usar tus aplicaciones."
track: soil
level: intermediate
weight: 21
---

Recién instalado, Pando lee y escribe ficheros y ejecuta comandos. Esta guía le enciende el resto de los sentidos: buscar cosas en la web, abrir páginas en un navegador como harías tú y pulsar botones en las aplicaciones de tu pantalla. Todo está en una sola pantalla.

Necesitas Pando abierto en la Web UI (la aplicación de escritorio es la misma interfaz). Para la búsqueda web necesitas además una clave de al menos un servicio de búsqueda.

## Abre la pantalla de herramientas

Ve a **Configuración > Herramientas**. La página es una lista de tarjetas, una por herramienta. Cada tarjeta tiene un interruptor: una herramienta apagada sencillamente no existe para Pando.

{{< shot src="images/webui/pando-webui-settings-tools-search.jpg" alt="Pantalla de Herramientas con fetch y la búsqueda web" >}}

**Fetch** es la primera tarjeta y viene encendida. Es como Pando lee una página web cuando le das un enlace. **Max response size (MB)** es la página más grande que se traga.

## Enciende la búsqueda web

Leer una página que tú le señalas es una cosa; encontrar la página es otra. Para eso Pando necesita un servicio de búsqueda, y esos funcionan con una clave, como el carné de una biblioteca.

1. Elige un servicio: **Google Search**, **Brave Search**, **Perplexity** o **Exa AI Search**. Con uno basta.
2. Consigue una clave en la web de ese servicio.
3. Enciende la tarjeta y pega la clave en **API KEY**. Google pide además un **Custom search engine ID (CX)**.
4. Baja hasta el final y pulsa **Save**.

Hay dos tarjetas más que no necesitan clave: **Sourcegraph Code Search** busca en código público, y **Context7 (Library Docs)** trae la documentación actual de una librería, para que Pando no conteste de memoria sobre una versión de hace dos años.

## Deja que Pando use un navegador

Algunas páginas solo tienen sentido en un navegador de verdad: hay que hacer clic, iniciar sesión, esperar a que carguen cosas. Enciende **Browser (Chrome DevTools)** y Pando podrá hacerlo.

{{< shot src="images/webui/pando-webui-settings-tools-browser.jpg" alt="Ajustes de la herramienta de navegador" >}}

1. **Browser**: elige uno que tengas instalado. Pando muestra justo debajo lo que ha detectado.
2. **Browser executable** y **User data directory** se rellenan solos. Déjalos, salvo que tengas una instalación poco habitual.
3. **Headless mode**: apagado, ves la ventana y puedes mirar cómo trabaja Pando, que tranquiliza los primeros días. Encendido, trabaja sin que se vea, que es lo que quieres en un servidor.
4. **Timeout (seconds)** y **Max sessions**: cuánto espera Pando a una página y cuántas ventanas de navegador puede tener a la vez. Los valores de fábrica van bien.
5. **Save**.

## Deja que Pando trabaje con tus aplicaciones de escritorio

Esta viene **apagada**, y con razón: permite a Pando actuar en tu pantalla como si fueras tú. Enciende **Desktop Controller (Accessibility Automation)** solo cuando te haga falta.

{{< shot src="images/webui/pando-webui-settings-tools-desktop-controller.jpg" alt="Ajustes del controlador de escritorio" >}}

Antes de guardar, ponle una valla:

1. **Allowed apps**: escribe la aplicación con la que estás trabajando, por ejemplo `Firefox`. Con esto relleno, Pando no puede tocar nada más.
2. **Denied apps**: escribe las que no debe tocar nunca, como tu gestor de contraseñas o el correo. Esta lista siempre gana.
3. Deja **Backend** en **Auto** y los números como están.
4. **Allow physical input fallback**: encendido, Pando puede hacer un clic o una pulsación reales cuando una aplicación no ofrece nada mejor. Apágalo si no quieres eso nunca.
5. **Save**.

En macOS, el sistema te pide que des a Pando el permiso de **Accesibilidad** (y el de **Grabación de pantalla** para las capturas). En Linux con Wayland, un diálogo del sistema te pide el consentimiento la primera vez.

## Pásale tus PDF y ficheros de Office

Para esto no hay interruptor. Pando lee PDF, Word, Excel, PowerPoint y más, convirtiéndolos antes a texto plano. Hay dos formas de usarlo:

- Deja los documentos en la carpeta que Pando vigila para su base de conocimiento (mira [Enseña tu proyecto a Pando]({{< relref "/guides/remembrances" >}})) y se podrán buscar.
- Convierte un fichero a mano, en una terminal: `pando convert report.pdf`.

## Comprueba que funciona

Abre **Chat** y prueba una petición por herramienta:

1. «Busca en la web la última versión de Hugo y dime qué ha cambiado.» Se ejecuta una herramienta de búsqueda.
2. «Abre example.com en el navegador y dime el título de la página.» Si el modo headless está apagado, se abre una ventana del navegador.
3. «¿Qué aplicaciones tengo abiertas?» Pando las lista sin preguntar. Todo lo que sea hacer clic, escribir o sacar una captura te lo pregunta antes.

{{< under-surface >}}
En el escritorio, Pando no mira una foto de tu pantalla para adivinar dónde está el botón. Lee la misma descripción de la ventana que usan los lectores de pantalla, así que sabe que hay un botón llamado «Guardar» y pulsa ese.
{{< /under-surface >}}

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Pando dice que no puede buscar en la web | No hay ninguna tarjeta de búsqueda encendida, o falta la clave. Revisa la tarjeta y pulsa **Save** |
| El navegador no se abre | Elige otro en **Browser**, o escribe la ruta completa en **Browser executable** |
| Mensajes del tipo «perfil en uso» | Tu navegador habitual está abierto con ese perfil. Pando recurre a uno temporal; no hay que hacer nada |
| Pando dice que falta un permiso de escritorio | Te dice cuál. Dáselo en los ajustes del sistema y vuelve a probar |
| Las herramientas de escritorio no ven una aplicación | Comprueba que no está en **Denied apps**, y que **Allowed apps** está vacío o la incluye |
| Un PDF sale vacío | Seguramente es un escaneado sin texto dentro |

## ¿Prefieres la terminal?

Los mismos interruptores en `.pando.toml`:

```toml
[InternalTools]
BraveSearchEnabled = true
BraveAPIKey        = 'your-key'
BrowserEnabled     = true
BrowserType        = 'chrome'
BrowserHeadless    = false
DesktopEnabled     = true
DesktopAllowedApps = ['Firefox']
DesktopDeniedApps  = ['1Password']
```

En la interfaz de terminal, las mismas tarjetas están en la configuración, **> Tools**. Todas las opciones, la lista de navegadores y lo que necesita cada plataforma están en la [referencia de herramientas integradas]({{< relref "/docs/configuration/tools" >}}).
