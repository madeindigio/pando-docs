---
title: Descubrimiento de Herramientas
weight: 14
---

Cuando Pando acumula muchas herramientas (de servidores MCP, hooks Lua y herramientas incorporadas), el sistema de Descubrimiento de Herramientas maneja la complejidad mostrando solo un subconjunto visible y proporcionando búsqueda bajo demanda para el resto.

## Cómo Funciona

Inspirado en el enfoque de VS Code Copilot:

1. **Herramientas core** (bash, edit, view, glob, grep, write) siempre visibles
2. **Herramientas MCP y Lua** se diferencian por defecto
3. Cuando el conteo total de herramientas excede `MaxDirectTools`, la herramienta `tool_search` se activa
4. El LLM busca en el registro completo por lenguaje natural
5. Las herramientas descubiertas permanecen visibles para el resto de la sesión

## Configuración

```toml
[ToolDiscovery]
Enabled = true
Mode = 'auto'            # 'auto', 'always', o 'off'
MaxDirectTools = 64       # Umbral para modo auto
SearchLimit = 8           # Resultados predeterminados de tool_search
NonDeferredTools = []     # Herramientas siempre visibles
DeferredSources = []      # Fuentes a diferir (ej. "mcp", "lua")
```

## Modos

| Modo | Comportamiento |
|------|----------------|
| `auto` | Se activa cuando las herramientas exceden `MaxDirectTools` |
| `always` | Siempre difiere las herramientas no-core |
| `off` | Todas las herramientas visibles (predeterminado para configuraciones pequeñas) |

## Búsqueda de Herramientas

El LLM llama a `tool_search` con una consulta en lenguaje natural:

```json
{
  "query": "buscar código en el repositorio"
}
```

Y con un nombre de herramienta la **ejecuta**, tanto si es interna de Pando como si vive en un servidor MCP:

```json
{
  "tool_name": "github_create_issue",
  "parameters": { "title": "Arreglar la redirección de login" }
}
```

Los resultados se clasifican usando puntuación de frecuencia de términos sobre nombre, alias, nombre del servidor, descripción y nombres de parámetros.

## Un único interruptor, también para MCP

Tool Discovery y la pasarela MCP eran antes dos mecanismos paralelos, con sus propias herramientas y sus propios interruptores. Ahora son uno solo: basta con `ToolDiscovery.Enabled`.

Con él activo y servidores MCP configurados:

- tus **herramientas MCP favoritas siguen visibles directamente**, igual que antes;
- el resto del catálogo —tengas los servidores que tengas conectados— se queda fuera de la ventana de contexto y se alcanza vía `tool_search`;
- una vez que el modelo ha descubierto una herramienta, permanece visible el resto de la sesión.

El efecto práctico: puedes conectar una docena de servidores MCP sin pagar su catálogo completo en cada mensaje.

## Filtrado por Fuente

Las herramientas se categorizan por fuente:

- `core` - Herramientas incorporadas (siempre visibles)
- `internal` - Herramientas internas de Pando
- `mcp` - Herramientas de servidores MCP externos
- `lua` - Herramientas de hooks Lua
- `mesnada` - Herramientas de orquestación
- `rag` - Herramientas de base de conocimiento e índice de código
- `gateway` - Re-exportaciones del gateway MCP

{{< callout >}}
Para la mayoría de usuarios con menos de 64 herramientas, el Descubrimiento de Herramientas permanece inactivo. Solo se activa cuando el conteo de herramientas crece lo suficiente para impactar el uso del contexto.
{{< /callout >}}
