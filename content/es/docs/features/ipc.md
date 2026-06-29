---
title: Comunicación Inter-Proceso (IPC)
weight: 21
---

El sistema IPC de Pando permite que múltiples instancias se comuniquen, compartan estado y coordinen trabajo en una sola máquina. Construido sobre ZeroMQ, proporciona broadcasting de eventos pub/sub y mensajería de solicitud/response JSON-RPC 2.0.

## Arquitectura

- **Instancia primaria**: Crea el bus IPC con sockets PUB (eventos) y ROUTER (RPC)
- **Instancias secundarias**: Conectan via SUB (eventos) y DEALER (RPC)
- **Registro de instancias**: Rastreo basado en archivos en `/tmp/pando-instances/`

## Características

### Sincronización de Sesiones

Las instancias secundarias reciben actualizaciones de sesión en tiempo real de la primaria:

- Creación, activación, eliminación de sesiones
- Eventos de append de mensajes
- Tokens de streaming LLM (inicio, token, fin)
- Eventos de ejecución de herramientas (inicio, fin)

### Failover Primario/Secundario

Un watcher monitorea la vitalidad de la primaria via heartbeats. Cuando la primaria muere:

1. Una secundaria detecta el heartbeat faltante
2. Adquiere un lock exclusivo de archivo
3. Se promueve a primaria
4. Publica `instance.promoted` para que otras secundarias se reconecten

### Coordinación de Escritura

Solo la instancia primaria realiza escrituras a la base de datos. Las secundarias enrutan solicitudes de escritura (como `db.compact`) a la primaria a través de IPC.

### Delegación Hot-Peer

Las instancias pueden delegar tareas a instancias pares externas:

```toml
[Mesnada.Delegation]
AllowExternalWarmTargets = true   # opt-in del llamador
AcceptDelegations = true           # opt-in del objetivo
```

## Métodos RPC

| Método | Descripción |
|--------|-------------|
| `state.sync` | Snapshot de estado completo |
| `session.list` | Listar sesiones |
| `session.activate` | Activar una sesión |
| `message.send` | Enviar un mensaje |
| `session.interrupt` | Cancelar LLM en ejecución |
| `instance.ping` | Verificación de vitalidad y capacidades |
| `delegation.run` | Ejecutar tarea delegada |
| `delegation.cancel` | Cancelar tarea delegada |
| `delegation.status` | Verificar estado de delegación |
| `db.compact` | VACUUM de base de datos (enrutado a primaria) |

## Configuración

IPC se configura automáticamente cuando múltiples instancias están en ejecución. Configuración de failover:

```toml
# Configuración automática via defaults internos:
# HeartbeatInterval: 5s
# HeartbeatTimeout: 15s
# ProbeInterval: 60s
# Enabled: true
```

{{< callout >}}
IPC permite que Pando funcione como un sistema multi-proceso: una instancia primaria maneja escrituras a la base de datos mientras las secundarias manejan proyectos o tareas específicas, todo coordinado automáticamente.
{{< /callout >}}
