---
title: Servidor MCP
weight: 5
---

Pando incluye un servidor **Model Context Protocol (MCP)** integrado que permite a herramientas externas, agentes e IDEs conectarse a Pando como proveedor de contexto y herramientas de IA.

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
- Leer y modificar archivos
- Buscar en el codebase
- Interactuar con el historial de sesiones

## Configuración de servidores MCP externos

Pando también puede **consumir** servidores MCP externos como fuente de herramientas adicionales para la IA. Configúralos en `.pando.toml`:

```toml
[mcpServers.mi-servidor]
command = "mi-mcp-server"
args = ["--flag"]
env = { MI_VAR = "valor" }
```

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
