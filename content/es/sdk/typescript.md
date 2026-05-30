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
