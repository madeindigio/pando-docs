---
title: Python SDK
weight: 2
---

The official **Pando Python SDK** enables programmatic integration in modern Python (3.10+) pipelines, scripts, backend applications, and CLI utilities.

GitHub Repository: [madeindigio/pando-python-sdk](https://github.com/madeindigio/pando-python-sdk)

## Prerequisites

- **Python 3.10** or newer.
- The `pando` CLI installed and available on your system `PATH` (or specified via environment variable `PANDO_PATH` or client parameters).

## Installation

```bash
pip install pando-sdk
```

For HTTP REST support (optional client dependency):

```bash
pip install pando-sdk[http]
```

---

## 1. Subprocess Mode (`PandoClient`)

`PandoClient` is ideal for one-shot scripting where you spawn a `pando` command process and capture the execution output.

```python
from pando import PandoClient

client = PandoClient(
    cwd="/path/to/project",   # Project working directory
    model="claude-sonnet-4-6", # Model override
    timeout=300,              # Timeout in seconds
)

# Run synchronously
result = client.run("Run project tests and report failing suites", allow_all_tools=True)
print(result.response)
print(result.session_id)
```

---

## 2. ACP Session Mode (`PandoAgent` & `PandoSession`)

The standard way to build interactive bots or back-and-forth multi-turn interactions. `PandoAgent` communicates over stdin/stdout using the JSON-RPC ACP protocol.

### Async Streaming (Recommended)
```python
import asyncio
from pando import PandoAgent

async def main():
    async with PandoAgent(
        cwd="/path/to/project",
        model="claude-sonnet-4-6",
        persona="software-engineer",
    ) as agent:
        session = await agent.create_session("Code Refactoring")

        async for event in session.send("Analyze and refactor authentication logic"):
            match event.type:
                case "content_delta":
                    print(event.delta, end="", flush=True)
                case "tool_call":
                    print(f"\n[Tool Invocated] {event.tool_call['name']}")
                case "tool_result":
                    print(f"[Tool Result] {event.tool_result['content'][:80]}...")
                case "response":
                    print("\n[Done]")
                case "error":
                    raise RuntimeError(event.error)

asyncio.run(main())
```

### Sync Streaming Context Manager
If your codebase is synchronous, use the matching synchronous bindings:

```python
from pando import PandoAgent

with PandoAgent(cwd="/path/to/project") as agent:
    session = agent.create_session_sync("My Sync Task")
    for event in session.send_sync("Review config.py file"):
        if event.type == "content_delta":
            print(event.delta, end="", flush=True)
    print()
```

### Asking Without Streaming
For a consolidated text-only response:

```python
async with PandoAgent(cwd="/path/to/project") as agent:
    session = await agent.create_session()
    response = await session.ask("Explain the system database migrations")
    print(response)
```

---

## 3. HTTP REST Client (`PandoHttpClient`)

Use `PandoHttpClient` to connect to a daemon server instance running `pando serve` or `pando app`:

```python
import asyncio
from pando import PandoHttpClient

async def main():
    async with PandoHttpClient(
        base_url="http://localhost:8765",
        verify_ssl=False,  # Set false to bypass self-signed certificates in dev
    ) as client:
        # Create a remote session
        session = await client.sessions.create("My REST Task")

        # Stream SSE message chunks
        async for chunk in client.sessions.send_message(session.session_id, "Analyze metrics"):
            if chunk.delta:
                print(chunk.delta, end="", flush=True)

        # Update active model globally
        await client.models.set_active("claude-sonnet-4-6")

asyncio.run(main())
```

---

## Exception Handling

All custom exceptions derive from the base `PandoError` exception:

```
PandoError
├── PandoBinaryNotFoundError   # Binary is missing from path
├── PandoConnectionError       # Communication or launch failure
├── PandoSessionError          # Incorrect states or invalid actions
├── PandoTimeoutError          # Limits exceeded
└── PandoRPCError(code, msg)   # JSON-RPC protocol error code and message
```

```python
from pando import PandoError, PandoBinaryNotFoundError

try:
    result = client.run("Hello")
except PandoBinaryNotFoundError as e:
    print(f"Pando CLI not found. Please install the CLI. Detailed error: {e}")
except PandoError as e:
    print(f"Pando SDK encountered an error: {e}")
```
