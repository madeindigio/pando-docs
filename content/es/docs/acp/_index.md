---
title: Protocolo ACP
weight: 4
---

Pando soporta el [Agent Client Protocol (ACP)](https://agentclientprotocol.com), lo que permite usarlo directamente en editores compatibles como asistente de codificación IA.

## Inicio rápido

Inicia Pando como servidor ACP (modo stdio, para editores):

```bash
pando acp
```

## Configuración en editores

### VS Code

Añade a tu `settings.json`:

```json
{
  "agent_servers": {
    "Pando": {
      "command": "pando",
      "args": ["acp"]
    }
  }
}
```

### Zed

Añade a `~/.config/zed/settings.json`:

```json
{
  "agent_servers": {
    "Pando": {
      "command": "pando",
      "args": ["acp"]
    }
  }
}
```

### JetBrains IDEs

Añade a tu `acp.json`:

```json
{
  "agent_servers": {
    "Pando": {
      "command": "/ruta/a/pando",
      "args": ["acp"]
    }
  }
}
```

## Configuración ACP

Configura el comportamiento ACP en `.pando.toml`:

```toml
[acp]
enabled = true
max_sessions = 10
idle_timeout = "30m"
log_level = "info"
auto_permission = false  # usar true en entornos CI/batch
```

## Comandos de gestión

```bash
# Iniciar servidor ACP (stdio, para editores)
pando acp

# Iniciar con flags explícitos
pando acp start --debug --cwd /ruta/al/proyecto

# Ver estado del servidor (modo HTTP)
pando acp status

# Listar sesiones activas
pando acp sessions

# Ver estadísticas del servidor
pando acp stats

# Detener el servidor
pando acp stop
```

## Transportes

Pando ACP soporta dos transportes:

- **Stdio**: Para uso como subproceso desde editores
- **HTTP + SSE**: Para actualizaciones en tiempo real via Server-Sent Events

```bash
# Deshabilitar stdio
pando mcp-server --no-stdio

# Deshabilitar HTTP
pando mcp-server --no-http
```

## Checklist de Tareas Activas y Planificación

Cuando se integra con tu editor de código preferido a través de ACP, Pando muestra una **Lista de Tareas Activa** directamente dentro de la interfaz del editor. Esto proporciona una total transparencia sobre las acciones que está realizando el agente:
- **Pasos en tiempo real**: Visualiza de antemano qué archivos planea modificar el agente y el estado de cada tarea.
- **Toma de decisiones integrada**: Aprueba o realiza ajustes en el plan de trabajo del agente antes de que comience a ejecutar cambios.
- **Limpieza de sesiones inactivas**: Pando depura de forma inteligente sesiones inactivas de larga duración para optimizar el rendimiento de tu sistema.

## Características de seguridad

- Validación de rutas para evitar acceso fuera del directorio del proyecto
- Sistema de permisos para la ejecución de herramientas
- Modo de auto-aprobación para entornos de confianza
