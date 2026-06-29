---
title: Inter-Process Communication (IPC)
weight: 21
---

Pando's IPC system enables multiple instances to communicate, share state, and coordinate work across a single machine. Built on ZeroMQ, it provides pub/sub event broadcasting and JSON-RPC 2.0 request/response messaging.

## Architecture

- **Primary instance**: Creates the IPC bus with PUB (events) and ROUTER (RPC) sockets
- **Secondary instances**: Connect via SUB (events) and DEALER (RPC)
- **Instance registry**: File-based tracking at `/tmp/pando-instances/`

## Features

### Session Synchronization

Secondary instances receive real-time session updates from the primary:

- Session creation, activation, deletion
- Message append events
- LLM streaming tokens (start, token, end)
- Tool execution events (start, end)

### Primary/Secondary Failover

A watcher monitors primary liveness via heartbeats. When the primary dies:

1. A secondary detects the missing heartbeat
2. Acquires an exclusive file lock
3. Promotes itself to primary
4. Publishes `instance.promoted` so other secondaries reconnect

### Write Coordination

Only the primary instance performs database writes. Secondaries route write requests (like `db.compact`) to the primary over IPC.

### Hot-Peer Delegation

Instances can delegate tasks to external peer instances:

```toml
[Mesnada.Delegation]
AllowExternalWarmTargets = true   # caller-side opt-in
AcceptDelegations = true           # target-side opt-in
```

## RPC Methods

| Method | Description |
|--------|-------------|
| `state.sync` | Full state snapshot |
| `session.list` | List sessions |
| `session.activate` | Activate a session |
| `message.send` | Send a message |
| `session.interrupt` | Cancel running LLM call |
| `instance.ping` | Liveness and capability check |
| `delegation.run` | Run a delegated task |
| `delegation.cancel` | Cancel a delegated task |
| `delegation.status` | Check delegation status |
| `db.compact` | Database VACUUM (routed to primary) |

## Configuration

IPC is configured automatically when multiple instances are running. Failover settings:

```toml
# Automatic configuration via internal defaults:
# HeartbeatInterval: 5s
# HeartbeatTimeout: 15s
# ProbeInterval: 60s
# Enabled: true
```

{{< callout >}}
IPC enables Pando to run as a multi-process system: a primary instance handles database writes while secondaries handle specific projects or tasks, all coordinated automatically.
{{< /callout >}}
