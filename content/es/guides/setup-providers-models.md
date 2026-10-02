---
title: "Conecta tus cuentas de IA y elige tus modelos"
shortTitle: "Cuentas y modelos"
description: "Pando conectado a un proveedor de IA, con el modelo adecuado para cada tarea."
summary: "De vacío a listo: cuentas, inicio de sesión y modelos."
track: surface
level: beginner
weight: 3
---

Pando es el taller; los modelos de IA son los motores que alquilas para moverlo. Esta guía enchufa un motor y decide cuál hace cada trabajo. Necesitas una cuenta con al menos un proveedor de IA (GitHub Copilot, Anthropic, OpenAI, Gemini, OpenRouter, Groq, xAI…) u [Ollama](https://ollama.com) funcionando en tu máquina. La app de escritorio y la Web UI son la misma interfaz, así que todo vale para las dos.

## Abre el asistente de configuración

La primera vez que abres Pando sin nada configurado, el asistente aparece solo. Si lo cerraste, pulsa **Setup assistant** en la barra amarilla de arriba del chat.

{{< shot src="images/webui/pando-webui-setup-assistant-scope.jpg" dark="images/webui/pando-webui-setup-assistant-scope-dark.jpg" alt="Asistente de configuración: dónde guardar los ajustes" >}}

Primera pregunta: ¿dónde se guarda lo que elijas?

- **Ajustes globales** (recomendado): unos mismos ajustes para todos los proyectos de este ordenador.
- **Solo este directorio**: ajustes que se quedan con este proyecto, útil cuando uno necesita cuentas distintas.

Pulsa **Continuar**.

## Añade un proveedor

Elige el proveedor con el que tienes cuenta. Cada uno te dice qué necesita y enlaza a la página donde se consigue la API key (la contraseña que permite a Pando usar tu cuenta). Pégala y continúa.

{{< shot src="images/webui/pando-webui-setup-assistant-provider.jpg" dark="images/webui/pando-webui-setup-assistant-provider-dark.jpg" alt="Asistente de configuración: cuentas de proveedor" >}}

Si ya hay cuentas, el asistente las muestra: pulsa **Usar estas cuentas** o **Añadir otro proveedor**.

Con **GitHub Copilot** no hay clave que pegar. El asistente enseña un código corto, abres GitHub, lo escribes y el asistente sigue solo cuando GitHub dice que sí. Si tu editor ya tiene sesión en Copilot, este paso se salta.

## Elige dos modelos

{{< shot src="images/webui/pando-webui-setup-assistant-models.jpg" dark="images/webui/pando-webui-setup-assistant-models-dark.jpg" alt="Asistente de configuración: modelo principal y secundario" >}}

- **Modelo principal**: el jefe de cocina. Lee tu código y hace el trabajo de pensar. Elige el más capaz que tengas.
- **Modelo secundario rápido**: el pinche. Pone títulos a las sesiones, resume y hace recados. Elige algo rápido y barato.

Pulsa **Guardar modelos**.

## Decide sobre la memoria

{{< shot src="images/webui/pando-webui-setup-assistant-remembrances.jpg" dark="images/webui/pando-webui-setup-assistant-remembrances-dark.jpg" alt="Asistente de configuración: modelos de memoria" >}}

Este paso es opcional. Remembrances es el cuaderno de Pando: le permite recordar entre sesiones y buscar en tu código por significado. Funciona en tu propia máquina con Ollama.

- Falta Ollama: el asistente enseña cómo instalarlo y, donde puede, se ofrece a hacerlo por ti tras tu confirmación.
- Ollama está parado: pulsa **Arrancar Ollama**.
- Ollama funciona: descarga los dos modelos pequeños con el botón y espera a la barra de progreso.

¿Ahora no? Pulsa **Omitir**. Puedes activarlo después; mira [Enseña tu proyecto a Pando]({{< relref "/guides/remembrances" >}}). La última pantalla es un resumen: pulsa **Terminar**.

## Añade o corrige cuentas más adelante

El asistente es el carril rápido. El garaje completo está en **Configuración > Proveedores**.

{{< shot src="images/webui/pando-webui-settings-providers.jpg" alt="Cuentas de proveedor en Configuración" >}}

- **Add provider** abre un formulario: un **Account ID** corto, un **Display Name**, el **Provider Type**, la **API Key** y, para servicios compatibles, una **Base URL**.
- **Test** comprueba que la cuenta responde.
- **Edit** y **Delete** hacen lo que dicen. En Copilot, **Login with GitHub** repite el inicio de sesión.

{{< shot src="images/webui/pando-webui-settings-providers-add-account.jpg" alt="Formulario para añadir una cuenta de proveedor" >}}

Puedes tener varias cuentas del mismo proveedor, por ejemplo una personal y otra del trabajo.

## Dale a cada ayudante su modelo

Pando no es un único trabajador. Hay pequeños especialistas para las tareas de apoyo: uno pone nombre a las sesiones, otro resume, otro lleva subtareas. En **Configuración > Agentes** eliges el modelo de cada uno. Abre una fila, elige modelo y guarda.

{{< shot src="images/webui/pando-webui-settings-agents.jpg" alt="Modelo de cada agente integrado" >}}

Una buena regla: el **Coder** se lleva tu mejor modelo y el resto, uno rápido.

## Cambia de modelo mientras conversas

Junto al botón de enviar está el nombre del modelo en uso. Haz clic, busca y elige. El cambio vale para la sesión en la que estás; las demás conservan el suyo.

{{< shot src="images/webui/pando-webui-model-selector.jpg" alt="Selector de modelo en el chat" >}}

El modelo de las sesiones nuevas es **Modelo Predeterminado**, en **Configuración > General**.

## Comprueba que funciona

Ve a **Chat** y pregunta algo pequeño, como «¿Qué hay en esta carpeta?». Si llega una respuesta, el motor funciona. En **Configuración > Proveedores**, **Test** debe salir en verde en cada cuenta.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| **Test** falla | Pega la clave otra vez; comprueba que no ha caducado y que tiene saldo |
| La lista de modelos está vacía | La cuenta está desactivada o la clave es incorrecta. Abre **Edit** y revisa **Enabled** |
| Copilot te pide iniciar sesión una y otra vez | Pulsa **Login with GitHub** y termina el paso del código en el navegador |
| El paso de memoria dice que Ollama no funciona | Arranca Ollama y pulsa **Comprobar de nuevo** |
| Elegiste mal dónde guardar | Lanza otra vez el asistente y elige la otra opción |

## ¿Prefieres la terminal?

En la interfaz de terminal, pulsa `Ctrl+G` para abrir los ajustes y añade ahí proveedores y modelos. Para iniciar sesión en Copilot desde una shell:

```bash
pando auth copilot login
```

Las claves también pueden vivir en el fichero de configuración o en variables de entorno: mira [Configuración]({{< relref "/docs/configuration" >}}).
