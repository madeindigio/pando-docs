---
title: AG-UI for Web Apps
weight: 42
---

Pando can be the agent behind your own web application. It speaks [AG-UI](https://docs.ag-ui.com), the protocol used by [CopilotKit](https://www.copilotkit.ai) and similar React toolkits, so a chat panel inside your product can talk to a Pando agent that reads files, runs tools and delegates work.

It is **off by default**, because it puts an agent that can run code within reach of a browser.

## Start it

```bash
# Only AG-UI, on its own port (recommended)
pando agui-serve --port 8090 --allow-origin http://localhost:3000

# Or next to the Web UI
pando serve --agui-port 8090
```

Pando prints an access token on startup. Point your frontend at `http://localhost:8090/api/v1/agui/coder` and send the token as `Authorization: Bearer <token>`. The token is kept between restarts, so you configure it once.

## What your page gets

- **Streaming chat** with the agent, including its tool activity.
- **Approvals and questions in the page**: when the agent needs permission or asks something, your interface shows it.
- **Your own frontend tools**: actions you define in the page can be called by the agent.
- **Live state**: the model in use, the token budget, the to-do list, the files touched and the sub-agents at work, ready to render as cards instead of parsing chat text.
- **Conversations that survive**: reload the page, or restart Pando, and the same thread continues.
- **Runs that keep going**: if the browser disconnects, the run waits for two minutes. Reconnect and you get what you missed, then the live stream.

## Agent profiles

A profile is a named agent with its own model, persona and set of tools. Use profiles to offer, for example, a read-only "reviewer" and a full "coder" from the same Pando, each on its own address.

```toml
[AGUI.Profiles.reviewer]
Base    = 'coder'
Model   = 'anthropic.claude-sonnet-4'
Persona = 'code-reviewer'
```

## Configuration

```toml
[AGUI]
Enabled        = true
Port           = 8090
Host           = 'localhost'
Agents         = ['coder']
AllowedOrigins = ['http://localhost:3000']   # empty means no browser may connect
RequireToken   = true
FrontendTools  = true
HumanInTheLoop = true
```

{{< callout type="warning" >}}
Only the origins you list can connect from a browser, and every request needs the token. Keep `Host` on `localhost` unless you put Pando behind your own reverse proxy.
{{< /callout >}}

## Client libraries

The TypeScript SDK includes a client and a CopilotKit helper:

```typescript
import { PandoAguiClient } from '@pando-ai/sdk/agui';

const client = new PandoAguiClient({ baseUrl: 'http://localhost:8090', token });
for await (const event of client.run({ prompt: 'Summarise the repo' })) {
  if (event.type === 'TEXT_MESSAGE_CONTENT') process.stdout.write(event.delta);
}
```

A complete Next.js example with chat, a state dashboard, a frontend tool and in-page approvals is in the Pando repository under [`examples/copilotkit`](https://github.com/digiogithub/pando/tree/main/examples/copilotkit).
