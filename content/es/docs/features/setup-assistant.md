---
title: Asistente de configuración
weight: 40
---

La primera vez que abres Pando en la Web UI o en la app de escritorio, un asistente te guía por lo mínimo que necesitas para empezar a trabajar: dónde guardar tus ajustes, qué proveedor de IA usar, qué modelos, y si quieres memoria y búsqueda en el código.

Se abre solo cuando todavía no hay nada configurado. También puedes abrirlo en cualquier momento desde el aviso de configuración, con **Asistente de configuración**.

## Los pasos

### 1. Dónde guardar tus ajustes

{{< shot src="images/webui/pando-webui-setup-assistant-scope.jpg" dark="images/webui/pando-webui-setup-assistant-scope-dark.jpg" alt="Asistente de configuración: dónde guardar los ajustes" >}}

- **Global** (recomendado): los ajustes valen para todos los proyectos de esta máquina.
- **Solo este directorio**: los ajustes se quedan con este proyecto.

### 2. Proveedor

{{< shot src="images/webui/pando-webui-setup-assistant-provider.jpg" dark="images/webui/pando-webui-setup-assistant-provider-dark.jpg" alt="Asistente de configuración: cuentas de proveedor" >}}

Elige el proveedor de IA que quieres usar: GitHub Copilot, Anthropic, OpenAI, Gemini, OpenRouter, Groq, xAI, Ollama o cualquier servicio compatible con OpenAI. Cada uno indica qué necesita y enlaza a la página donde conseguir una clave de API.

Si ya tienes cuentas configuradas, el asistente te ofrece seguir usándolas.

Con **GitHub Copilot** no hay clave que pegar. El asistente muestra un código, abres GitHub, lo introduces, y el asistente continúa solo cuando termina el inicio de sesión. Si tu editor ya tiene sesión en Copilot, ese paso se omite.

### 3. Modelos

{{< shot src="images/webui/pando-webui-setup-assistant-models.jpg" dark="images/webui/pando-webui-setup-assistant-models-dark.jpg" alt="Asistente de configuración: modelo principal y secundario" >}}

Elige dos modelos:

- el **modelo principal**, que escribe y razona sobre tu código
- un **modelo rápido y barato** para pequeñas tareas de fondo, como poner título a las sesiones o resumir

El asistente sugiere modelos adecuados del proveedor que elegiste.

### 4. Memoria y búsqueda en el código (Remembrances)

{{< shot src="images/webui/pando-webui-setup-assistant-remembrances.jpg" dark="images/webui/pando-webui-setup-assistant-remembrances-dark.jpg" alt="Asistente de configuración: modelos de embeddings de Remembrances" >}}

Este paso es opcional. Remembrances da a Pando memoria a largo plazo y búsqueda semántica sobre tu código y tus documentos, y funciona en local con [Ollama](https://ollama.com).

- Si Ollama no está instalado, el asistente muestra cómo instalarlo en tu sistema. Cuando puede, se ofrece a ejecutar la instalación por ti después de que confirmes.
- Si Ollama está instalado pero parado, hay un botón **Arrancar Ollama**.
- Con Ollama en marcha, descargas los dos modelos que necesita con un botón y una barra de progreso.

Puedes saltarte este paso y activar Remembrances más tarde desde Ajustes.

### 5. Listo

Un resumen de lo configurado. Pulsa **Terminar** y empieza a chatear.

## Cancelar

**Cancelar asistente**, el botón de cerrar o `Esc` cierran el asistente en cualquier paso. No se pierde nada: las pantallas de ajustes habituales siguen ahí y puedes configurarlo todo a mano.

{{< callout >}}
El asistente forma parte de la Web UI y de la app de escritorio. En la interfaz de terminal configuras proveedores y modelos desde la pantalla de ajustes, como hasta ahora.
{{< /callout >}}
