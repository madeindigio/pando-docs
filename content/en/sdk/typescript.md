---
title: TypeScript SDK
weight: 1
---

The official **Pando TypeScript SDK** provides fully typed bindings for Node.js 18+ and modern JavaScript/TypeScript development environments.

GitHub Repository: [madeindigio/pando-typescript-sdk](https://github.com/madeindigio/pando-typescript-sdk)

## Prerequisites

- **Node.js 18** or newer.
- The `pando` CLI installed and available on your system `PATH` (or specified via environment variable `PANDO_PATH` or client parameters).

## Installation

```bash
npm install @pando-ai/sdk
```

---

## 1. Subprocess Mode (`PandoClient`)

`PandoClient` is suited for short-lived task scripts where you want to execute a single prompt asynchronously and capture the text output.

```typescript
import { PandoClient } from '@pando-ai/sdk';

const client = new PandoClient({
  cwd: '/path/to/project',
  model: 'claude-sonnet-4-6',
  timeout: 300000, // 5 minutes in milliseconds
});

// Run and get the full consolidated response
const result = await client.run('Fix all TypeScript warnings in the project', { allowAllTools: true });
console.log(result.response);
console.log(result.sessionId);

// Or stream text chunks directly to standard out
for await (const chunk of client.stream('Explain code in src/index.ts')) {
  process.stdout.write(chunk);
}
```

---

## 2. ACP Session Mode (`PandoAgent` & `PandoSession`)

Best for complex interactive UI dashboards or stateful workflows, `PandoAgent` opens a long-lived process connection to `pando acp` communicating over stdin/stdout.

```typescript
import { PandoAgent } from '@pando-ai/sdk';

const agent = new PandoAgent({
  cwd: '/path/to/project',
  model: 'claude-sonnet-4-6',
  persona: 'software-engineer',
  onToolPermission: async (req) => {
    console.log(`Pando requested approval for: ${req.toolName} (${req.description})`);
    return true; // Programmatically approve all requested operations
  },
});

await agent.connect();

const session = await agent.createSession('Refactoring core modules');

for await (const event of session.send('Refactor the database repository layer')) {
  switch (event.type) {
    case 'content_delta':
      process.stdout.write(event.delta);
      break;
    case 'tool_call':
      console.log(`\n[Tool Executing] ${event.toolCall.name}`);
      break;
    case 'tool_result':
      console.log(`[Tool Result] ${event.toolResult.content.slice(0, 100)}...`);
      break;
    case 'response':
      console.log('\n[Finished generation]');
      break;
    case 'error':
      throw new Error(event.error);
  }
}

await session.close();
await agent.disconnect();
```

### Auto-Cleanup with `await using` (Symbol.asyncDispose)
In environments supporting TC39 explicit resource management (Node 18.18+ / TS 5.2+), you can use `await using` to automatically disconnect the agent on scope exit:

```typescript
await using agent = new PandoAgent({ cwd: '/project' });
await agent.connect();

const session = await agent.createSession('audit');
const response = await session.ask('Audit lockfiles for critical CVEs');
console.log(response);
// agent.disconnect() is called automatically here!
```

---

## 3. HTTP REST Client (`PandoHttpClient`)

Connects over HTTP to a daemon process running `pando serve` or `pando app` (by default on port `8765`):

```typescript
import { PandoHttpClient } from '@pando-ai/sdk';

const client = new PandoHttpClient({
  baseUrl: 'http://localhost:8765',
  rejectUnauthorized: false, // Set false to accept self-signed certificates in dev
  timeout: 60000,
});

// Create and interact with sessions via SSE (Server-Sent Events)
const session = await client.sessions.create('REST API integration');

for await (const chunk of client.sessions.sendMessage(session.id, 'Optimise endpoints')) {
  if (chunk.event === 'content_delta') {
    process.stdout.write(chunk.delta ?? '');
  }
  if (chunk.event === 'done') break;
}

// Select active model globally
await client.models.setActive('claude-sonnet-4-6');
```

---

## 4. AG-UI Mode (`@pando-ai/sdk/agui`)

[AG-UI](https://docs.ag-ui.com) is the protocol CopilotKit and other Generative-UI frontends use to communicate with agent backends. Pando serves AG-UI via `pando agui-serve` — it's **off by default** and requires a bearer token and an origin allow-list, because it exposes a code-executing agent to a browser.

This is a **separate subpath export**: importing the main entry point pulls in none of it, and `@ag-ui/client` / `@copilotkit/runtime` are optional peers of this subpath only.

### Direct Client (`PandoAguiClient`)

A dependency-free client for Pando's AG-UI endpoint. Works in Node.js, edge functions, or browsers — no CopilotKit required.

```typescript
import { PandoAguiClient } from '@pando-ai/sdk/agui';

const client = new PandoAguiClient({
  baseUrl: 'http://localhost:8090',
  token: process.env.PANDO_TOKEN,
  agent: 'coder',
});

// Discover which agents exist and their capabilities
const info = await client.info();
console.log(info.agents);        // [{ name: 'coder', url: '...', description: '...' }]
console.log(info.capabilities);  // { frontendTools, humanInTheLoop, sharedState, interrupts }

// Run the agent and stream events
for await (const event of client.run({ prompt: 'Summarise the repo' })) {
  switch (event.type) {
    case 'TEXT_MESSAGE_CONTENT':
      process.stdout.write(event.delta);
      break;
    case 'STATE_SNAPSHOT':
      console.log(event.snapshot.todos, event.snapshot.subAgents);
      break;
    case 'RUN_FINISHED':
      if (event.outcome === 'interrupt') {
        // The agent called one of your frontend tools — run it, then call
        // `run` again on the same thread with a `tool` message carrying the result.
      }
      break;
  }
}

// Convenience: get just the text response
const text = await client.runText('Explain the project structure');
```

### CopilotKit Integration (`registerPandoCopilotKit`)

The SDK provides a one-liner to mount a CopilotKit runtime endpoint in Next.js that talks AG-UI to Pando:

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

`registerPandoCopilotKit` reads `/info` at startup and registers every agent Pando advertises — adding an agent to `[AGUI] Agents` in `.pando.toml` is enough, no code change needed.

### Agent Discovery

Build an `HttpAgent` for a single agent or discover all advertised agents:

```typescript
import { createPandoAgent, discoverPandoAgents } from '@pando-ai/sdk/agui';
import { HttpAgent } from '@ag-ui/client';

// Single agent
const agent = await createPandoAgent({
  baseUrl: 'http://localhost:8090',
  token: process.env.PANDO_TOKEN,
  HttpAgent, // pass explicitly under a bundler
});

// All agents (for CopilotRuntime's `agents` option)
const agents = await discoverPandoAgents({
  baseUrl: 'http://localhost:8090',
  token: process.env.PANDO_TOKEN,
  HttpAgent,
});
```

### Shared State Dashboard

Pando publishes a `PandoState` document via AG-UI's `STATE_SNAPSHOT` and `STATE_DELTA` events. Use `useCoAgent` in your React component to consume it:

```tsx
import { CopilotKit, useCoAgent } from '@copilotkit/react-core';
import type { PandoState } from '@pando-ai/sdk/agui';

function Dashboard() {
  const { state } = useCoAgent<PandoState>({ name: 'coder' });

  return (
    <div>
      <h2>Model: {state.model?.name}</h2>
      <p>Tokens: {state.tokenUsage?.promptTokens} / {state.tokenUsage?.contextWindow}</p>

      <h3>Todos</h3>
      <ul>
        {state.todos?.map((todo, i) => (
          <li key={todo.id ?? i}>[{todo.status}] {todo.content}</li>
        ))}
      </ul>

      <h3>Files Touched</h3>
      <ul>
        {state.files?.map((file) => (
          <li key={file.path}>{file.action}: {file.name}</li>
        ))}
      </ul>

      <h3>Sub-Agents</h3>
      {state.subAgents?.map((task) => (
        <div key={task.id}>{task.role} — {task.status}</div>
      ))}
    </div>
  );
}
```

### Frontend Tools

Define tools the agent can call from the browser. The agent calling a frontend tool suspends the run until the handler returns a result:

```tsx
import { useCopilotAction } from '@copilotkit/react-core';

function useFrontendTools() {
  useCopilotAction({
    name: 'highlight_in_page',
    description: 'Scroll the page to a heading and highlight it for the user.',
    parameters: [{ name: 'heading', type: 'string', description: 'Heading text' }],
    handler: ({ heading }) => {
      const target = Array.from(document.querySelectorAll('h2')).find((node) =>
        node.textContent?.toLowerCase().includes(heading.toLowerCase()),
      );
      if (!target) return `No heading matching ${heading}`;
      target.scrollIntoView({ behavior: 'smooth' });
      target.style.outline = '2px solid orange';
      return `Highlighted ${target.textContent}`;
    },
  });
}
```

### Human-in-the-Loop (Permission Prompts)

Pando surfaces permission prompts as synthetic `pando_permission_request` tool calls. Register a handler to show approval dialogs in your UI:

```tsx
import { useCopilotAction } from '@copilotkit/react-core';
import type { PandoPermissionRequest } from '@pando-ai/sdk/agui';

function usePermissionPrompt() {
  useCopilotAction({
    name: 'pando_permission_request',
    description: 'Approve or deny a tool Pando wants to run.',
    available: 'remote',
    renderAndWaitForResponse: ({ args, respond, status }) => {
      const request = args as Partial<PandoPermissionRequest>;
      if (status === 'complete') return <div>Answered.</div>;
      return (
        <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
          <p>
            <strong>{request.toolName}</strong> wants to {request.action}
            {request.path ? ` ${request.path}` : ''}.
          </p>
          {request.description && <pre>{request.description}</pre>}
          <button onClick={() => respond?.({ approved: true })}>Approve</button>
          <button onClick={() => respond?.({ approved: false })}>Deny</button>
        </div>
      );
    },
  });
}
```

### Architecture

```
browser ──HTTP──▶ Next.js route ──AG-UI/SSE──▶ pando agui-serve
        (CopilotKit)   (holds the token)        (runs the agent)
```

The Next.js route exists because CopilotKit's client speaks GraphQL to its own runtime, which then speaks AG-UI to the agent. Pando implements AG-UI — the protocol every other backend implements — and deliberately not CopilotKit's runtime protocol. The route is also where the token lives: moving it to the browser would hand any visitor an agent that can run commands on your machine.

If you don't want CopilotKit, skip both and use `PandoAguiClient` directly (see the Direct Client section above).

### Starting the AG-UI Adapter

The adapter is off by default. Start it as its own process:

```bash
# Standalone
pando agui-serve --port 8090 --allow-origin http://localhost:3000

# Or mount on existing server
pando serve --agui-port 8090
```

Or in `.pando.toml`:

```toml
[AGUI]
Enabled = true
Port = 8090
AllowedOrigins = ["http://localhost:3000"]
Agents = ["coder"]
RequireToken = true
Persona = "perfumer"
```

### Choosing a persona

An AG-UI backend can run with a [persona](../../docs/features/) applied to every run, so your Generative-UI frontend gets a consistently voiced assistant instead of the default coder:

```bash
pando agui-serve --port 8090 --allow-origin http://localhost:3000 --persona perfumer
```

The persona must be one Pando has loaded; an unknown name is rejected at startup rather than silently ignored. Set it in `[AGUI].Persona` to make it permanent, or pass the flag to override per process.

{{< callout type="warning" >}}
The origin allow-list is not optional. An empty list means no browser may connect — this endpoint executes code, so it never sends `Access-Control-Allow-Origin: *`. The token is required unless you pass `--no-token`.
{{< /callout >}}

### AG-UI Exports

| Export | Purpose |
|--------|---------|
| `PandoAguiClient` | Dependency-free run/discovery client (`run`, `runText`, `info`) |
| `createPandoAgent` | One `HttpAgent` for one Pando agent, token attached |
| `discoverPandoAgents` | Every advertised agent, keyed by name, for `CopilotRuntime` |
| `registerPandoCopilotKit` | The whole Next.js route in one call |
| `PandoState` | Type of the shared-state document (`useCoAgent<PandoState>()`) |
| `PandoPermissionRequest` | Type for human-in-the-loop permission prompts |
| `parseSSE` | The event-stream parser, if you issue the request yourself |

A complete example with chat, shared-state dashboard, frontend tools, and in-page approvals is in [`examples/copilotkit/`](https://github.com/digiogithub/pando/tree/main/examples/copilotkit).

---

## Error Handling

All SDK exceptions inherit from the standard `PandoError` class:

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
    console.error('Pando executable binary not found on PATH or specified location.');
  } else if (err instanceof PandoConnectionError) {
    console.error(`Subprocess communication failed. Exit code: ${err.exitCode}`);
  } else if (err instanceof PandoRPCError) {
    console.error(`ACP JSON-RPC returned an error (${err.code}): ${err.message}`);
  } else if (err instanceof PandoError) {
    console.error('Pando SDK encountered an error:', err.message);
  }
}
```
