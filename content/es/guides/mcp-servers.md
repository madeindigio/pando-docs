---
title: "Conecta servidores MCP"
shortTitle: "Conecta servidores MCP"
description: "Enchufa herramientas extra a Pando, inicia sesión en las que lo pidan y míralas trabajar en un chat."
summary: "Enchufa herramientas extra e inicia sesión en ellas."
track: soil
level: intermediate
weight: 20
---

Un servidor MCP es una caja de herramientas extra que ha hecho otra persona: una habla con tu gestor de incidencias, otra con tu base de datos, otra con tus ficheros de diseño. Imagina Pando como un banco de trabajo con una regleta, y cada servidor MCP como un aparato que enchufas en ella. Al terminar esta guía tendrás uno enchufado y funcionando.

Necesitas Pando abierto en la Web UI (la aplicación de escritorio es la misma interfaz) y los datos del servidor que quieres añadir: el comando que lo arranca o su dirección web.

## Abre la pantalla de servidores MCP

Ve a **Configuración > Servidores MCP**. La primera vez la lista está vacía.

{{< shot src="images/webui/pando-webui-settings-mcp-servers.jpg" alt="Pantalla de servidores MCP todavía sin servidores" >}}

Pulsa **Add Server**.

## Añade un servidor que se ejecuta en tu máquina

Muchos servidores son programas pequeños que Pando arranca por ti. Para estos, deja **Type** en **stdio**.

1. **Name**: un nombre corto que reconozcas, como `files`.
2. **Command**: el programa que hay que ejecutar, tal cual lo dicen las instrucciones del servidor. Por ejemplo `npx @modelcontextprotocol/server-filesystem`.
3. **Arguments**: lo que va detrás del comando, escrito como lo harías en una terminal.
4. **Environment variables**: si el servidor necesita una clave o un ajuste, escribe el nombre a la izquierda, el valor a la derecha y pulsa **Add**.
5. Pulsa **Save**.

{{< shot src="images/webui/pando-webui-settings-mcp-add-server-stdio.jpg" alt="Diálogo Add MCP Server para un programa en tu máquina" >}}

## Añade un servidor que vive en internet

Otros servidores ya están funcionando en algún sitio y solo necesitas su dirección. Pon **Type** en **SSE** o en **Streamable HTTP**; las instrucciones del servidor dicen cuál.

1. **Name**: otra vez, algo corto.
2. **URL**: la dirección que te dieron.
3. **Headers**: solo si las instrucciones piden alguna.
4. Deja **Auth Type** en **None** de momento y pulsa **Save**.

{{< shot src="images/webui/pando-webui-settings-mcp-add-server-sse.jpg" alt="Diálogo Add MCP Server para un servidor en la red" >}}

## Inicia sesión, si el servidor lo pide

Un servidor en internet suele querer saber quién eres, igual que en un edificio te piden la acreditación en la puerta. Abre otra vez el servidor y elige el tipo de acreditación en **Auth Type**:

{{< shot src="images/webui/pando-webui-settings-mcp-add-server-http-auth.jpg" alt="Tipos de inicio de sesión de un servidor MCP" >}}

| Elige | Cuándo | Qué rellenas |
|---|---|---|
| **Bearer token** | Te dieron una clave de API. Es lo más habitual | La clave |
| **Basic (username/password)** | Te dieron un usuario y una contraseña | Los dos |
| **Custom header** | La clave tiene que viajar en una cabecera con nombre propio | El nombre de la cabecera y la clave |
| **OAuth 2.1 (authorization code)** | Inicias sesión desde el navegador, como el «Iniciar sesión con…» de una web | Normalmente nada: deja Client ID vacío salvo que te hayan dado uno |

Guarda. Con los tres primeros, ya está.

Con **OAuth** queda un paso más la primera vez: abre una terminal y ejecuta

```bash
pando mcp login my-server
```

Se abre el navegador, das tu permiso y Pando guarda el pase para la próxima vez. Se hace una vez por servidor.

## Usa sus herramientas

Abre **Chat** y pide algo que el servidor nuevo sepa hacer, con tus palabras: «lista las incidencias abiertas que tengo asignadas», «¿qué tablas tiene la base de datos de ventas?». No hace falta nombrar la herramienta. Pando ve lo que hay enchufado y elige.

La primera vez que una herramienta quiere hacer algo, Pando te pide permiso, como con cualquier acción.

{{< under-surface >}}
Pando no le da al modelo todas las herramientas de todos los servidores a la vez; sería como volcar la caja entera sobre la mesa. Tiene una lista corta a mano y busca el resto cuando la conversación lo necesita.
{{< /under-surface >}}

## Ten a mano tus favoritas

Ve a **Configuración > Gateway MCP**. Con **Enable MCP Gateway** activado, Pando se fija en qué herramientas usas de verdad y las deja a mano, igual que tú dejas tu destornillador preferido sobre el banco y no en el cajón.

{{< shot src="images/webui/pando-webui-settings-mcp-gateway.jpg" alt="Ajustes del gateway MCP" >}}

Los valores de fábrica son razonables: una herramienta pasa a favorita tras 3 usos en 7 días, hay 10 favoritas como mucho, y la que lleva 30 días sin tocarse deja de serlo. Cambia los números solo si enchufas muchos servidores.

## Comprueba que funciona

1. En **Configuración > Servidores MCP** el servidor está en la lista.
2. En un chat, pregunta «¿qué herramientas tienes de `my-server`?». Pando las nombra.
3. Pide algo real y mira cómo la herramienta se ejecuta en la conversación.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| El servidor está en la lista pero Pando no lo usa nunca | Comprueba **Command** ejecutándolo tú en una terminal. Si falla ahí, también le falla a Pando |
| «MCP server requires authorization» en el chat | Ejecuta `pando mcp login <nombre>` en una terminal. Pando se da cuenta y lo reintenta solo |
| El inicio de sesión en el navegador no termina nunca | Algo bloquea el puerto local 19876. Prueba `pando mcp login <nombre> --no-browser` y abre tú el enlace |
| Un servidor de empresa rechaza la conexión | Seguramente quiere un certificado. Mira [certificados de empresa]({{< relref "/docs/configuration/mcp" >}}) |
| La clave ha dejado de funcionar | Abre el servidor, pega la clave nueva, **Save** |

## ¿Prefieres la terminal?

Todo lo anterior se puede escribir en `.pando.toml`:

```toml
[MCPServers.files]
Type    = 'stdio'
Command = 'npx'
Args    = ['@modelcontextprotocol/server-filesystem', '.']

[MCPServers.tracker]
Type = 'streamable-http'
URL  = 'https://mcp.example.com/mcp'

[MCPServers.tracker.Auth]
Type  = 'bearer'
Token = 'your-api-key'
```

Y estos comandos te dicen cómo está cada servidor:

```bash
pando mcp list
pando mcp status tracker
pando mcp logout tracker
```

En la interfaz de terminal, la misma pantalla está en la configuración (**Ctrl+G**) **> MCP Servers**.

La lista completa de opciones, con los certificados de empresa, está en la [referencia de MCP]({{< relref "/docs/configuration/mcp" >}}). Para hacerlo al revés y ofrecer las herramientas de Pando a otro programa, mira [Servidor MCP]({{< relref "/docs/mcp" >}}).
