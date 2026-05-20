---
title: SDKs
weight: 6
---

Pando provides official, production-ready SDKs to integrate local developer-focused AI features programmatically into your own tools, scripts, editors, or background workers.

Each SDK supports all three primary modes of interacting with Pando:
1. **Subprocess (One-Shot)**: Spawns `pando` as a child process for fast, single-turn prompts.
2. **ACP Session (Stdio)**: Connects to a long-lived `pando acp` JSON-RPC 2.0 server over stdio for multi-turn conversations and real-time streaming.
3. **HTTP REST Client**: Connects to a running `pando serve` or `pando app` server over local networks.

## Supported Languages

Select your programming language to explore the installation instructions, code snippets, and reference guides:

{{< cards >}}
  {{< card link="typescript" title="TypeScript & Node.js" icon="code" subtitle="Official SDK for Node.js 18+ and TypeScript ecosystems" >}}
  {{< card link="python" title="Python" icon="terminal" subtitle="Official SDK for Python 3.10+ pipelines, scripts, and applications" >}}
  {{< card link="java" title="Java" icon="chip" subtitle="Official SDK for Java 17+ and JVM environments" >}}
  {{< card link="dotnet" title=".NET / C#" icon="globe" subtitle="Official SDK for .NET 8 or later and enterprise C# projects" >}}
{{< /cards >}}
