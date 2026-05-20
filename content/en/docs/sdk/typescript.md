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
