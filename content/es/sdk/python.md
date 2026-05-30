---
title: SDK para Python
weight: 2
---

El **SDK oficial de Pando para Python** permite realizar una integración programática robusta en tus proyectos modernos desarrollados en Python (3.10+), flujos de trabajo automatizados, scripts de sistema, servicios de backend y utilidades CLI.

Repositorio en GitHub: [madeindigio/pando-python-sdk](https://github.com/madeindigio/pando-python-sdk)

## Requisitos Previos

- **Python 3.10** o superior.
- La CLI de `pando` instalada y disponible en el `PATH` de tu sistema (o definida mediante la variable de entorno `PANDO_PATH` o configurada en los parámetros del cliente).

## Instalación

```bash
pip install pando-sdk
```

Para añadir soporte del cliente de red HTTP REST (opcional):

```bash
pip install pando-sdk[http]
```

---

## 1. Modo Subproceso (`PandoClient`)

`PandoClient` es la opción ideal para flujos de automatización de un solo turno donde deseas arrancar un subproceso de `pando` de manera transparente y capturar toda su salida.

```python
from pando import PandoClient

client = PandoClient(
    cwd="/ruta/a/tu/proyecto",   # Directorio de trabajo
    model="claude-sonnet-4-6",   # Modelo de lenguaje
    timeout=300,                 # Tiempo límite en segundos
)

# Ejecución síncrona
result = client.run("Ejecuta los tests del proyecto e informa cuáles fallaron", allow_all_tools=True)
print(result.response)
print(result.session_id)
```

---

## 2. Modo Sesión ACP (`PandoAgent` y `PandoSession`)

Es la manera recomendada para desarrollar flujos de conversación de múltiples turnos y de tipo interactivo (tales como bots o interfaces persistentes). `PandoAgent` se conecta de manera continua sobre stdin/stdout utilizando el protocolo ACP y JSON-RPC.

### Flujo Asíncrono Streaming (Recomendado)
```python
import asyncio
from pando import PandoAgent

async def main():
    async with PandoAgent(
        cwd="/ruta/a/tu/proyecto",
        model="claude-sonnet-4-6",
        persona="software-engineer",
    ) as agent:
        session = await agent.create_session("Refactorización de código")

        async for event in session.send("Analiza y optimiza la lógica de autenticación"):
            match event.type:
                case "content_delta":
                    print(event.delta, end="", flush=True)
                case "tool_call":
                    print(f"\n[Llamada a Herramienta] {event.tool_call['name']}")
                case "tool_result":
                    print(f"[Resultado de Herramienta] {event.tool_result['content'][:80]}...")
                case "response":
                    print("\n[Completado]")
                case "error":
                    raise RuntimeError(event.error)

asyncio.run(main())
```

### Gestor de Contexto Síncrono
Si prefieres un enfoque clásico sin código asíncrono, puedes hacer uso de las siguientes funciones síncronas integradas en el SDK:

```python
from pando import PandoAgent

with PandoAgent(cwd="/ruta/a/tu/proyecto") as agent:
    session = agent.create_session_sync("Mi Tarea Síncrona")
    for event in session.send_sync("Revisa el archivo config.py"):
        if event.type == "content_delta":
            print(event.delta, end="", flush=True)
    print()
```

### Obtener Respuesta Directa Sin Streaming
Si quieres consultar a la IA y obtener la respuesta final consolidada directamente en una variable de texto:

```python
async with PandoAgent(cwd="/ruta/a/tu/proyecto") as agent:
    session = await agent.create_session()
    response = await session.ask("Explica las migraciones de base de datos actuales")
    print(response)
```

---

## 3. Cliente HTTP REST (`PandoHttpClient`)

Si cuentas con un servidor o daemon centralizado ejecutando `pando serve` o `pando app`, puedes conectarte mediante HTTP utilizando la clase `PandoHttpClient`:

```python
import asyncio
from pando import PandoHttpClient

async def main():
    async with PandoHttpClient(
        base_url="http://localhost:8765",
        verify_ssl=False,  # Útil para saltarse la validación de certificados autofirmados en desarrollo
    ) as client:
        # Crear una sesión de trabajo de forma remota
        session = await client.sessions.create("Mi Sesión REST")

        # Escuchar de forma progresiva las respuestas por Server-Sent Events (SSE)
        async for chunk in client.sessions.send_message(session.session_id, "Analizar métricas"):
            if chunk.delta:
                print(chunk.delta, end="", flush=True)

        # Modificar el modelo de lenguaje de forma global en el servidor
        await client.models.set_active("claude-sonnet-4-6")

asyncio.run(main())
```

---

## Manejo de Excepciones

Todas las excepciones del SDK heredan de la clase de excepción base común `PandoError`:

```
PandoError
├── PandoBinaryNotFoundError   # No se encuentra la CLI de Pando en el sistema
├── PandoConnectionError       # Error al levantar el proceso o de comunicación
├── PandoSessionError          # Errores lógicos de estados en la sesión de trabajo
├── PandoTimeoutError          # Se excedió el tiempo límite configurado
└── PandoRPCError(code, msg)   # Código y mensaje de error de protocolo JSON-RPC
```

```python
from pando import PandoError, PandoBinaryNotFoundError

try:
    result = client.run("Hola")
except PandoBinaryNotFoundError as e:
    print(f"La CLI de Pando no está instalada. Detalle: {e}")
except PandoError as e:
    print(f"Ocurrió un error en el SDK de Pando: {e}")
```
