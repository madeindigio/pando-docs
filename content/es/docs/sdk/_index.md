---
title: SDKs
weight: 6
---

Pando proporciona SDKs oficiales listos para producción que permiten integrar de forma programática las funciones de IA locales (enfocadas en desarrollo) en tus propias herramientas, scripts, editores o flujos de trabajo automatizados en segundo plano.

Cada SDK es compatible con los tres modos principales de interacción con Pando:
1. **Subproceso (One-Shot)**: Ejecuta `pando` como un proceso secundario independiente para obtener respuestas rápidas y de un solo turno.
2. **Sesión ACP (Stdio)**: Se conecta a un servidor JSON-RPC 2.0 persistente de `pando acp` a través de stdio para mantener conversaciones continuas y flujos de datos en tiempo real.
3. **Cliente HTTP REST**: Se conecta a una instancia activa de `pando serve` o `pando app` mediante la red local.

## Lenguajes Soportados

Selecciona tu lenguaje de programación preferido para explorar las guías de instalación, ejemplos de código y referencias de API:

{{< cards >}}
  {{< card link="typescript" title="TypeScript y Node.js" icon="code" subtitle="SDK oficial para los ecosistemas de Node.js 18+ y TypeScript" >}}
  {{< card link="python" title="Python" icon="terminal" subtitle="SDK oficial para pipelines de datos, scripts y aplicaciones con Python 3.10+" >}}
  {{< card link="java" title="Java" icon="chip" subtitle="SDK oficial para Java 17+ y entornos de la Máquina Virtual de Java (JVM)" >}}
  {{< card link="dotnet" title=".NET / C#" icon="globe" subtitle="SDK oficial para .NET 8 o superior y proyectos empresariales en C#" >}}
{{< /cards >}}
