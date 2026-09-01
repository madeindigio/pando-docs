---
title: SDK para TypeScript
weight: 1
---

El **SDK oficial de Pando para TypeScript** proporciona tipos completamente tipados y adaptados para Node.js 18 o superior, así como para entornos de desarrollo en JavaScript moderno y TypeScript.

Repositorio en GitHub: [madeindigio/pando-typescript-sdk](https://github.com/madeindigio/pando-typescript-sdk)

## Requisitos Previos

- **Node.js 18** o superior.
- La CLI de `pando` instalada y disponible en el `PATH` de tu sistema (o definida mediante la variable de entorno `PANDO_PATH` o configurada en los parámetros de inicialización del cliente).

## Instalación

```bash
npm install @pando-ai/sdk
```

---

## 1. Modo Subproceso (`PandoClient`)

`PandoClient` es adecuado para scripts rápidos o flujos automatizados donde deseas lanzar una consulta única, esperar que finalice, y capturar el texto resultante devuelto por la IA.

```typescript
import { PandoClient } from '@pando-ai/sdk';

const client = new PandoClient({
  cwd: '/ruta/a/tu/proyecto',
  model: 'claude-sonnet-4-6',
  timeout: 300000, // 5 minutos expresados en milisegundos
});

// Ejecutar consulta y obtener la respuesta final estructurada
const result = await client.run('Corrige todas las alertas de tipado de TypeScript en el proyecto', { allowAllTools: true });
console.log(result.response);
console.log(result.sessionId);

// O transmitir fragmentos de texto en streaming directamente a la consola
for await (const chunk of client.stream('Explica el código del archivo src/index.ts')) {
  process.stdout.write(chunk);
}
```

---

## 2. Modo Sesión ACP (`PandoAgent` y `PandoSession`)

Ideal para construir interfaces interactivas persistentes, bots conversacionales de varios turnos o flujos con control de estados complejos. `PandoAgent` inicia y mantiene abierto un canal de comunicación por stdio contra la CLI ejecutando `pando acp`.

```typescript
import { PandoAgent } from '@pando-ai/sdk';

const agent = new PandoAgent({
  cwd: '/ruta/a/tu/proyecto',
  model: 'claude-sonnet-4-6',
  persona: 'software-engineer',
  onToolPermission: async (req) => {
    console.log(`Pando solicita permiso para: ${req.toolName} (${req.description})`);
    return true; // Aprueba de manera programática la ejecución de la herramienta
  },
});

await agent.connect();

const session = await agent.createSession('Refactorización de módulos core');

for await (const event of session.send('Refactorizar el módulo de repositorios de base de datos')) {
  switch (event.type) {
    case 'content_delta':
      process.stdout.write(event.delta);
      break;
    case 'tool_call':
      console.log(`\n[Ejecutando Herramienta] ${event.toolCall.name}`);
      break;
    case 'tool_result':
      console.log(`[Resultado] ${event.toolResult.content.slice(0, 100)}...`);
      break;
    case 'response':
      console.log('\n[Generación Finalizada]');
      break;
    case 'error':
      throw new Error(event.error);
  }
}

await session.close();
await agent.disconnect();
```

### Limpieza de Recursos Automática (`await using`)
En entornos modernos compatibles con la especificación TC39 de liberación explícita de recursos (Node 18.18+ / TS 5.2+), puedes utilizar la palabra reservada `await using` para desconectar el agente de forma automática al salir de su bloque o ámbito de ejecución:

```typescript
await using agent = new PandoAgent({ cwd: '/mi-proyecto' });
await agent.connect();

const session = await agent.createSession('auditoria');
const response = await session.ask('Audita los archivos de bloqueo lock en busca de CVEs críticos');
console.log(response);
// ¡La desconexión agent.disconnect() se invoca automáticamente en este punto!
```

---

## 3. Cliente HTTP REST (`PandoHttpClient`)

Se conecta mediante protocolo HTTP a un daemon o proceso local de `pando serve` o `pando app` (puerto predeterminado `8765`):

```typescript
import { PandoHttpClient } from '@pando-ai/sdk';

const client = new PandoHttpClient({
  baseUrl: 'http://localhost:8765',
  rejectUnauthorized: false, // Útil para aceptar certificados locales SSL autofirmados
  timeout: 60000,
});

// Crear una sesión de trabajo y enviar consultas por Server-Sent Events (SSE)
const session = await client.sessions.create('Integración con API REST');

for await (const chunk of client.sessions.sendMessage(session.id, 'Optimizar endpoints')) {
  if (chunk.event === 'content_delta') {
    process.stdout.write(chunk.delta ?? '');
  }
  if (chunk.event === 'done') break;
}

// Establecer el modelo de lenguaje de forma activa y global en el servidor
await client.models.setActive('claude-sonnet-4-6');
```

---

## 4. Modo AG-UI (`@pando-ai/sdk/agui`)

[AG-UI](https://docs.ag-ui.com) es el protocolo que CopilotKit y otros frontends Generative-UI utilizan para comunicarse con agentes backend. Pando sirve AG-UI a través de `pando agui-serve` — está **deshabilitado por defecto** y requiere un token bearer y una lista de orígenes permitidos, ya que expone un agente que ejecuta código al navegador.

Esta es una **exportación por subpath separada**: importar el punto de entrada principal no incluye nada de esto, y `@ag-ui/client` / `@copilotkit/runtime` son peers opcionales solo de este subpath.

### Cliente Directo (`PandoAguiClient`)

Un cliente sin dependencias para el endpoint AG-UI de Pando. Funciona en Node.js, edge functions o navegadores — sin CopilotKit.

```typescript
import { PandoAguiClient } from '@pando-ai/sdk/agui';

const client = new PandoAguiClient({
  baseUrl: 'http://localhost:8090',
  token: process.env.PANDO_TOKEN,
  agent: 'coder',
});

// Descubrir qué agentes existen y sus capacidades
const info = await client.info();
console.log(info.agents);        // [{ name: 'coder', url: '...', description: '...' }]
console.log(info.capabilities);  // { frontendTools, humanInTheLoop, sharedState, interrupts }

// Ejecutar el agente y transmitir eventos
for await (const event of client.run({ prompt: 'Resumen del repositorio' })) {
  switch (event.type) {
    case 'TEXT_MESSAGE_CONTENT':
      process.stdout.write(event.delta);
      break;
    case 'STATE_SNAPSHOT':
      console.log(event.snapshot.todos, event.snapshot.subAgents);
      break;
    case 'RUN_FINISHED':
      if (event.outcome === 'interrupt') {
        // El agente llamó a una de tus herramientas frontend — ejecútala, luego
        // llama a `run` de nuevo en el mismo hilo con un mensaje `tool` con el resultado.
      }
      break;
  }
}

// Conveniencia: obtener solo la respuesta de texto
const text = await client.runText('Explica la estructura del proyecto');
```

### Integración con CopilotKit (`registerPandoCopilotKit`)

El SDK proporciona una línea de código para montar un endpoint de CopilotKit runtime en Next.js que habla AG-UI con Pando:

```typescript
// app/api/copilotkit/route.ts
import { registerPandoCopilotKit } from '@pando-ai/sdk/agui';

const route = await registerPandoCopilotKit({
  baseUrl: process.env.PANDO_URL ?? 'http://localhost:8090',
  token: process.env.PANDO_TOKEN,
  endpoint: '/api/copilotkit',
});

export const { POST, GET, OPTIONS } = route;
```

`registerPandoCopilotKit` lee `/info` al iniciar y registra cada agente que Pando anuncia — agregar un agente a `[AGUI] Agents` en `.pando.toml` es suficiente, sin cambios en el código.

### Descubrimiento de Agentes

Construye un `HttpAgent` para un agente individual o descubre todos los agentes anunciados:

```typescript
import { createPandoAgent, discoverPandoAgents } from '@pando-ai/sdk/agui';
import { HttpAgent } from '@ag-ui/client';

// Agente individual
const agent = await createPandoAgent({
  baseUrl: 'http://localhost:8090',
  token: process.env.PANDO_TOKEN,
  HttpAgent, // pasar explícitamente bajo un bundler
});

// Todos los agentes (para la opción `agents` de CopilotRuntime)
const agents = await discoverPandoAgents({
  baseUrl: 'http://localhost:8090',
  token: process.env.PANDO_TOKEN,
  HttpAgent,
});
```

### Panel de Estado Compartido

Pando publica un documento `PandoState` a través de los eventos `STATE_SNAPSHOT` y `STATE_DELTA` de AG-UI. Usa `useCoAgent` en tu componente React para consumirlo:

```tsx
import { CopilotKit, useCoAgent } from '@copilotkit/react-core';
import type { PandoState } from '@pando-ai/sdk/agui';

function Panel() {
  const { state } = useCoAgent<PandoState>({ name: 'coder' });

  return (
    <div>
      <h2>Modelo: {state.model?.name}</h2>
      <p>Tokens: {state.tokenUsage?.promptTokens} / {state.tokenUsage?.contextWindow}</p>

      <h3>Tareas</h3>
      <ul>
        {state.todos?.map((todo, i) => (
          <li key={todo.id ?? i}>[{todo.status}] {todo.content}</li>
        ))}
      </ul>

      <h3>Archivos Modificados</h3>
      <ul>
        {state.files?.map((file) => (
          <li key={file.path}>{file.action}: {file.name}</li>
        ))}
      </ul>

      <h3>Sub-Agentes</h3>
      {state.subAgents?.map((task) => (
        <div key={task.id}>{task.role} — {task.status}</div>
      ))}
    </div>
  );
}
```

### Herramientas Frontend

Define herramientas que el agente puede llamar desde el navegador. El agente que llama a una herramienta frontend suspende la ejecución hasta que el handler devuelve un resultado:

```tsx
import { useCopilotAction } from '@copilotkit/react-core';

function useFrontendTools() {
  useCopilotAction({
    name: 'highlight_in_page',
    description: 'Desplazar la página a un encabezado y resaltarlo para el usuario.',
    parameters: [{ name: 'heading', type: 'string', description: 'Texto del encabezado' }],
    handler: ({ heading }) => {
      const target = Array.from(document.querySelectorAll('h2')).find((node) =>
        node.textContent?.toLowerCase().includes(heading.toLowerCase()),
      );
      if (!target) return `No se encontró un encabezado con ${heading}`;
      target.scrollIntoView({ behavior: 'smooth' });
      target.style.outline = '2px solid orange';
      return `Resaltado: ${target.textContent}`;
    },
  });
}
```

### Human-in-the-Loop (Aprobación de Permisos)

Pando presenta solicitudes de permiso como llamadas a herramientas sintéticas `pando_permission_request`. Registra un handler para mostrar diálogos de aprobación en tu interfaz:

```tsx
import { useCopilotAction } from '@copilotkit/react-core';
import type { PandoPermissionRequest } from '@pando-ai/sdk/agui';

function usePermissionPrompt() {
  useCopilotAction({
    name: 'pando_permission_request',
    description: 'Aprobar o denegar una herramienta que Pando quiere ejecutar.',
    available: 'remote',
    renderAndWaitForResponse: ({ args, respond, status }) => {
      const request = args as Partial<PandoPermissionRequest>;
      if (status === 'complete') return <div>Respondido.</div>;
      return (
        <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
          <p>
            <strong>{request.toolName}</strong> quiere {request.action}
            {request.path ? ` ${request.path}` : ''}.
          </p>
          {request.description && <pre>{request.description}</pre>}
          <button onClick={() => respond?.({ approved: true })}>Aprobar</button>
          <button onClick={() => respond?.({ approved: false })}>Denegar</button>
        </div>
      );
    },
  });
}
```

### Arquitectura

```
navegador ──HTTP──▶ Ruta Next.js ──AG-UI/SSE──▶ pando agui-serve
          (CopilotKit)   (mantiene el token)     (ejecuta el agente)
```

La ruta Next.js existe porque el cliente de CopilotKit habla GraphQL con su propio runtime, que luego habla AG-UI con el agente. Pando implementa AG-UI — el protocolo que implementa todo otro backend — y deliberadamente no implementa el protocolo runtime de CopilotKit. La ruta también es donde vive el token: moverlo al navegador le daría a cualquier visitante un agente que puede ejecutar comandos en tu máquina.

Si no quieres CopilotKit, omite ambos y usa `PandoAguiClient` directamente (ver la sección de Cliente Directo arriba).

### Iniciar el Adaptador AG-UI

El adaptador está deshabilitado por defecto. Inícialo como su propio proceso:

```bash
# Independiente
pando agui-serve --port 8090 --allow-origin http://localhost:3000

# O montar en un servidor existente
pando serve --agui-port 8090
```

O en `.pando.toml`:

```toml
[AGUI]
Enabled = true
Port = 8090
AllowedOrigins = ["http://localhost:3000"]
Agents = ["coder"]
RequireToken = true
Persona = "perfumer"
```

### Elegir una persona

Un backend AG-UI puede ejecutarse con una persona aplicada a cada run, de modo que tu frontend de Generative UI obtenga un asistente con voz consistente en lugar del coder por defecto:

```bash
pando agui-serve --port 8090 --allow-origin http://localhost:3000 --persona perfumer
```

La persona debe ser una que Pando tenga cargada; un nombre desconocido se rechaza al arrancar en lugar de ignorarse en silencio. Defínela en `[AGUI].Persona` para hacerla permanente, o pasa el flag para sobrescribirla por proceso.

{{< callout type="warning" >}}
La lista de orígenes permitidos no es opcional. Una lista vacía significa que ningún navegador puede conectarse — este endpoint ejecuta código, por lo que nunca envía `Access-Control-Allow-Origin: *`. El token es requerido a menos que pases `--no-token`.
{{< /callout >}}

### Exportaciones AG-UI

| Exportación | Propósito |
|-------------|-----------|
| `PandoAguiClient` | Cliente de descubrimiento/ejecución sin dependencias (`run`, `runText`, `info`) |
| `createPandoAgent` | Un `HttpAgent` para un agente de Pando, con token adjunto |
| `discoverPandoAgents` | Todos los agentes anunciados, por nombre, para `CopilotRuntime` |
| `registerPandoCopilotKit` | La ruta completa de Next.js en una llamada |
| `PandoState` | Tipo del documento de estado compartido (`useCoAgent<PandoState>()`) |
| `PandoPermissionRequest` | Tipo para permisos de human-in-the-loop |
| `parseSSE` | El parser de streams de eventos, si haces la petición directamente |

Un ejemplo completo con chat, panel de estado compartido, herramientas frontend y aprobaciones en página está en [`examples/copilotkit/`](https://github.com/digiogithub/pando/tree/main/examples/copilotkit).

---

## Manejo de Errores

Todas las excepciones del SDK para JavaScript heredan de la clase base común `PandoError`:

```typescript
import {
  PandoError,
  PandoBinaryNotFoundError,
  PandoConnectionError,
  PandoRPCError,
} from '@pando-ai/sdk';

try {
  await agent.connect();
} catch (err) {
  if (err instanceof PandoBinaryNotFoundError) {
    console.error('No se logró encontrar el binario ejecutable de Pando en el sistema.');
  } else if (err instanceof PandoConnectionError) {
    console.error(`La comunicación con el proceso falló. Código de salida: ${err.exitCode}`);
  } else if (err instanceof PandoRPCError) {
    console.error(`El protocolo ACP JSON-RPC devolvió un error (${err.code}): ${err.message}`);
  } else if (err instanceof PandoError) {
    console.error('El SDK de Pando experimentó un error general:', err.message);
  }
}
```
