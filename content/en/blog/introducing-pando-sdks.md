---
title: "Announcing Official Pando SDKs: .NET, Java, Python, and TypeScript"
date: 2026-05-20
tags: ["SDKs", "Integration", "Developer Experience"]
---

We are excited to announce the release of our official native SDKs for **Pando**! Starting today, you can integrate Pando's developer-focused AI features directly into your own tools, scripts, pipelines, and applications using your preferred programming language.

We are launching with full support for four major ecosystems:
* [**TypeScript & Node.js**](https://github.com/madeindigio/pando-typescript-sdk) (`@pando-ai/sdk`)
* [**Python 3.10+**](https://github.com/madeindigio/pando-python-sdk) (`pando-sdk`)
* [**Java 17+**](https://github.com/madeindigio/pando-java-sdk) (`io.pando:pando-sdk`)
* [**.NET 8+ / C#**](https://github.com/madeindigio/pando-cshardotnet-sdk) (`Pando.Sdk`)

---

## Three Integration Modes to Fit Any Use Case

Every SDK is built from the ground up to support the three core ways Pando communicates:

### 1. Subprocess Mode (One-Shot Automation)
Ideal for CI/CD pipelines, pre-commit hooks, or single-turn terminal scripts. The SDK spawns the local `pando` executable as a child process under the hood, passes the prompt, and retrieves a consolidated response.

```typescript
// Example: TypeScript
import { PandoClient } from '@pando-ai/sdk';
const client = new PandoClient({ cwd: '/path/to/project' });
const result = await client.run('Fix all lint warnings in src/');
console.log(result.response);
```

### 2. ACP Session Mode (Stateful Agents)
For interactive applications or long-running workflows, the SDKs communicate over the standardized **Agent Client Protocol (ACP)** via a persistent JSON-RPC 2.0 stdio channel. This allows for rich event-driven architectures, real-time streaming, and granular tool approval controls.

```python
# Example: Python Async Streaming
async with PandoAgent(cwd="/my-project") as agent:
    session = await agent.create_session("Code Audit")
    async for event in session.send("Audit dependency files"):
        if event.type == "content_delta":
            print(event.delta, end="")
```

### 3. HTTP REST Client (Centralized AI Gateway)
When running Pando as a localized service daemon via `pando serve` or `pando app`, the SDKs provide high-level HTTP client libraries to manage remote sessions, stream Server-Sent Events (SSE), dynamically switch models, and toggle active developer personas.

---

## Premium Integrations for Each Ecosystem

We didn't just wrap command-line calls — each SDK is tailored to feel native to its language:
* **TypeScript** includes first-class support for TC39 Explicit Resource Management (`await using`) to cleanly close subprocesses.
* **Python** provides both robust `asyncio` streaming and matching synchronous wrappers (`send_sync`) for classic scripting.
* **Java** features reactive streams using Java's native `Flow.Subscriber` specification and standard `CompletableFuture` async utilities.
* **.NET** exposes dedicated Dependency Injection extensions (`AddPando`) for flawless integration into ASP.NET Core or Hosted Services.

## Start Building Today

All four SDKs are open source, licensed under MIT, and fully documented in our new documentation section!

* Explore the guides: [Pando SDK Documentation](/docs/sdk/)
* Download from NuGet, PyPI, npm, or Maven Central today and elevate your software engineering automation!
