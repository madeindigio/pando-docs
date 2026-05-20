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
- Leer, modificar y buscar archivos (con visualización optimizada y paginación)
- Navegar por internet mediante el navegador de alta velocidad integrado, incluyendo compatibilidad con el navegador ligero **Lightpanda**
- Interactuar con el historial de sesiones y recordar datos contextuales de interés

## Configuración de servidores MCP externos

Pando también puede **consumir** servidores MCP externos como fuente de herramientas adicionales para la IA. Configúralos en `.pando.toml`:

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
