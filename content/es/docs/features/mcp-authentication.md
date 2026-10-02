---
title: Autenticación de servidores MCP
weight: 18
---

Los servidores MCP son cajas de herramientas extra que enchufas a Pando. Algunos están en tu propia máquina y se abren a cualquiera. Otros viven en internet o dentro de tu empresa y quieren saber quién llama. Esta función es el llavero de Pando: guarda la llave adecuada para cada una de esas puertas y la usa sin molestarte.

## Qué hace por ti

- **Abre todos los tipos de puerta habituales.** Una clave de API, un usuario y contraseña, una clave en una cabecera especial, o un inicio de sesión desde el navegador como el «Iniciar sesión con…» de una web (OAuth).
- **Inicias sesión una vez.** Tras iniciar sesión en el navegador, Pando guarda el pase y lo renueva solo.
- **Funciona en redes de empresa.** Puede presentar un certificado de cliente y aceptar la autoridad de certificación propia de tu empresa, que es lo que exigen muchos servidores internos.
- **Guarda los secretos bajo llave.** Los pases se guardan en tu máquina, solo los puedes leer tú y van cifrados.

## Cómo se nota en el día a día

Casi siempre pegas una clave al añadir el servidor y no vuelves a pensar en ello.

Con el inicio de sesión por navegador, la primera vez que Pando necesita el servidor te avisa en el chat de que el servidor pide autorización. Ejecutas un comando, aceptas en el navegador, y Pando sigue con lo que estaba haciendo sin que tengas que repetir la petición.

{{< shot src="images/webui/pando-webui-settings-mcp-add-server-http-auth.jpg" alt="Tipos de inicio de sesión al añadir un servidor MCP" >}}

## Cuándo usarlo

Siempre que las instrucciones de un servidor hablen de una clave de API, un token, un inicio de sesión o un certificado. Los servidores que son un programa pequeño en tu propia máquina no suelen necesitar nada de esto.

## Conviene saber

- El inicio de sesión se aplica a servidores a los que se llega por la red. Un programa local recibe sus claves por sus propios ajustes.
- Los estándares de conexión antiguos e inseguros (TLS 1.0 y 1.1) no se pueden activar. Es a propósito.
- Si llegas a un servidor de empresa por su dirección IP o por un apodo, hay que decirle a Pando el nombre real del servidor, o la comprobación del certificado falla. La referencia explica la opción.

## Siguientes pasos

- Guía: [Conecta servidores MCP]({{< relref "/guides/mcp-servers" >}}) añade un servidor e inicia sesión, paso a paso.
- Referencia: [todos los tipos de inicio de sesión, opciones de certificado y comandos]({{< relref "/docs/configuration/mcp" >}}).
- Relacionado: [Servidor MCP]({{< relref "/docs/mcp" >}}), para ofrecer las herramientas de Pando a otros programas.
