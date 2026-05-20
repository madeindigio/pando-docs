---
title: "Lanzamiento oficial de los SDKs de Pando: .NET, Java, Python y TypeScript"
date: 2026-05-20
tags: ["SDKs", "Integración", "Experiencia de Desarrollo"]
---

¡Nos complace anunciar el lanzamiento oficial de los SDKs nativos de **Pando**! A partir de hoy, puedes integrar de forma programática todas las funciones de IA locales (enfocadas en el flujo de desarrollo) directamente en tus propias herramientas, pipelines de CI/CD, scripts de automatización y aplicaciones utilizando tu lenguaje de programación favorito.

Iniciamos con soporte de primer nivel para cuatro de los ecosistemas más importantes de la industria:
* [**TypeScript y Node.js**](https://github.com/madeindigio/pando-typescript-sdk) (`@pando-ai/sdk`)
* [**Python 3.10+**](https://github.com/madeindigio/pando-python-sdk) (`pando-sdk`)
* [**Java 17+**](https://github.com/madeindigio/pando-java-sdk) (`io.pando:pando-sdk`)
* [**.NET 8+ / C#**](https://github.com/madeindigio/pando-cshardotnet-sdk) (`Pando.Sdk`)

---

## Tres modos de integración para cualquier caso de uso

Cada SDK ha sido diseñado desde cero para soportar las tres formas principales de comunicación de Pando:

### 1. Modo Subproceso (Automatización de ejecución única)
Ideal para flujos de CI/CD, hooks de pre-commit de git o scripts de terminal simples. El SDK inicia el binario local `pando` como un proceso hijo en segundo plano, envía tu solicitud de IA y captura el resultado final de forma síncrona o asíncrona.

```typescript
// Ejemplo: TypeScript
import { PandoClient } from '@pando-ai/sdk';
const client = new PandoClient({ cwd: '/ruta/a/mi/proyecto' });
const result = await client.run('Fix all lint warnings in src/');
console.log(result.response);
```

### 2. Modo Sesión ACP (Agentes con Estado)
Para aplicaciones interactivas complejas, asistentes de chat o flujos de trabajo de larga duración. Los SDKs se comunican mediante el estándar **Agent Client Protocol (ACP)** sobre un canal persistente de stdio (JSON-RPC 2.0). Esto permite flujos de eventos dinámicos en tiempo real y la interceptación o aprobación programática de llamadas a herramientas.

```python
# Ejemplo: Python Async Streaming
async with PandoAgent(cwd="/mi-proyecto") as agent:
    session = await agent.create_session("Code Audit")
    async for event in session.send("Audit dependency files"):
        if event.type == "content_delta":
            print(event.delta, end="")
```

### 3. Cliente HTTP REST (Pasarela de IA Local)
Al iniciar Pando como un daemon de red local mediante `pando serve` o `pando app`, los SDKs ofrecen librerías cliente HTTP de alto nivel para gestionar de forma remota tus sesiones activas, recibir respuestas progresivas por Server-Sent Events (SSE), alternar dinámicamente modelos de IA y definir personas.

---

## Diseñados para sentirse nativos en cada ecosistema

En lugar de limitarnos a envolver llamadas de consola estándar, adaptamos cada SDK para que se adapte perfectamente a las mejores prácticas de su ecosistema:
* **TypeScript** implementa soporte nativo para la liberación explícita de recursos de TC39 (`await using`) para garantizar el cierre seguro de subprocesos.
* **Python** incluye tanto llamadas asíncronas optimizadas con `asyncio` como envoltorios síncronos clásicos (`send_sync`) para scripts convencionales.
* **Java** aprovecha la especificación reactiva nativa de `Flow.Subscriber` y flujos de trabajo asíncronos mediante `CompletableFuture`.
* **.NET** proporciona extensiones para el motor de Inyección de Dependencias oficial de Microsoft (`AddPando`), perfecto para integrarse en servicios alojados en segundo plano (Hosted Services) y controladores ASP.NET Core.

## Empieza a construir hoy

Los cuatro SDKs son de código abierto con licencia MIT y están completamente documentados en nuestro nuevo portal de documentación.

* Explora las guías en español: [Documentación de los SDKs de Pando](/es/docs/sdk/)
* Descarga los paquetes desde NuGet, PyPI, npm o Maven Central y lleva la automatización de tus desarrollos al siguiente nivel.
