---
title: Servidor MCP
weight: 5
---

MCP es un enchufe común con el que los programas de IA comparten herramientas. Pando puede estar a los dos lados. Esta página trata de uno: **ofrecer las herramientas de Pando a otros programas** (otro asistente, un editor), para que usen su búsqueda web, su navegador, su memoria y sus herramientas de ficheros. Es material de referencia: comandos y ajustes.

¿Buscas el otro lado, enchufar herramientas extra *a* Pando? Sigue la guía [Conecta servidores MCP]({{< relref "/guides/mcp-servers" >}}) y consulta la [referencia de MCP]({{< relref "/docs/configuration/mcp" >}}).

## Iniciar el servidor MCP

```bash
# Iniciar como servidor MCP (stdio + HTTP /mcp)
pando mcp-server

# Solo stdio
pando mcp-server --no-http

# Solo HTTP
pando mcp-server --no-stdio
```

## Configuración en clientes MCP

Añade Pando como servidor MCP en tu cliente compatible (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "pando": {
      "command": "pando",
      "args": ["mcp-server", "--no-http"]
    }
  }
}
```

## Herramientas disponibles

El servidor MCP de Pando expone herramientas que permiten a los clientes:

- Ejecutar comandos en el contexto del proyecto
- Leer, modificar y buscar archivos (con visualización optimizada y paginación)
- Navegar por internet con las herramientas de navegador integradas, incluido el navegador ligero **Lightpanda**
- Interactuar con el historial de sesiones y recordar datos contextuales de interés

## Configuración de servidores MCP externos

Pando también puede **usar** servidores MCP hechos por otros como herramientas extra. Lo más cómodo es la Web UI, como enseña la guía [Conecta servidores MCP]({{< relref "/guides/mcp-servers" >}}). En `.pando.toml` queda así (todas las claves están en la [referencia de MCP]({{< relref "/docs/configuration/mcp" >}})):

```toml
[mcpServers.mi-servidor]
command = "mi-mcp-server"
args = ["--flag"]
env = { MI_VAR = "valor" }
```

### Cifrado de Parámetros MCP Sensibles

Si tu servidor MCP requiere claves de API o contraseñas, puedes encriptarlas mediante AGE para evitar guardarlas en texto plano:

```toml
[mcpServers.mi-servidor-seguro]
command = "conector-privado"
env = { CLAVE_SECRETA = "age1y7g9w...cadena-cifrada..." }
```
Pando descifrará estos valores automáticamente en memoria al iniciar, manteniendo a salvo tus credenciales privadas.

O en JSON:

```json
{
  "mcpServers": {
    "mi-servidor": {
      "command": "mi-mcp-server",
      "args": ["--flag"],
      "env": {
        "MI_VAR": "valor"
      }
    }
  }
}
```

## Token de acceso por HTTP

Cuando Pando funciona como servidor MCP por HTTP, cada petición necesita un token de acceso: `Authorization: Bearer <token>`. También en tu propia máquina.

- En `localhost`, Pando crea un token la primera vez, lo muestra una vez en el terminal y lo reutiliza en los siguientes arranques.
- Para elegir tú el token, define `MCPServer.HttpToken`.
- En cualquier otra dirección, Pando no arranca sin token.
- Los navegadores solo pueden conectar desde los orígenes indicados en `MCPServer.HttpAllowedOrigins`.

Los clientes que conectan por `stdio` no se ven afectados.

{{< callout type="warning" >}}
Si usabas el transporte HTTP antes de septiembre de 2026 sin token, tu cliente recibe ahora `401`. Añade la cabecera `Authorization` a su configuración.
{{< /callout >}}
