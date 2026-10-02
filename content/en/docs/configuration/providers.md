---
title: Providers, Proxy and AG-UI Reference
weight: 43
---

Options for model accounts, GitHub Copilot sign-in, the local LLM proxy and the AG-UI server. For the explanations see [GitHub Copilot Auth]({{< relref "/docs/features/copilot-auth" >}}), [Local LLM Proxy]({{< relref "/docs/features/llm-proxy" >}}) and [AG-UI for Web Apps]({{< relref "/docs/features/agui" >}}); for the step-by-step see the guide [Use Pando from your editor and other apps]({{< relref "/guides/editors-and-other-apps" >}}).

## Provider accounts

Declare only the providers you use. A section left in place with an empty key makes Pando offer an account that cannot work.

```toml
[Providers.anthropic]
APIKey   = ''
BaseURL  = ''
Disabled = false

[Providers.openai]
APIKey   = ''
Disabled = false

[Providers.copilot]
Disabled = false

[Providers.ollama]
BaseURL  = 'http://localhost:11434'
Disabled = false

[Providers.llama-cpp]
BaseURL  = 'http://localhost:8080'
Disabled = false
```

Models are written `<provider>.<model>`, for example `copilot.gpt-4.1`.

Prices and context sizes that a provider does not report are completed from [models.dev](https://models.dev), downloaded once and kept for 24 hours in `~/.pando_modelsdev.json`. To never contact it:

```toml
[ModelsDev]
Enabled = false
```

## GitHub Copilot

```bash
pando auth copilot login                                   # opens the browser
pando auth copilot login --enterprise-url https://github.mycompany.com
pando auth copilot login --no-browser                      # print the link and code
pando auth copilot status
pando auth copilot logout
```

Nothing else to configure: the sign-in is kept in your Pando profile.

| Copilot plan | Models you get |
|---|---|
| Free | A limited set |
| Pro | GPT-4, GPT-4o |
| Pro+ | A wider set |
| Business / Enterprise | Your organisation's models, including the ones it added with its own keys (BYOK) |

Organisation models are named with the organisation in front:

```bash
pando --model copilot.gpt-4.1 -p "Explain this code"
pando --model 'copilot.myorg/OpenRouter/some-model' -p "Explain this code"
```

## Local LLM proxy

```bash
pando llm-proxy                       # localhost, port 11434
pando llm-proxy --port 8080
pando llm-proxy --host 0.0.0.0
pando llm-proxy --api-key mysecretkey   # ask clients for this key
pando llm-proxy --debug
```

| What the other tool asks for | What to give it |
|---|---|
| API base URL | `http://localhost:11434/v1` (or the address the proxy prints when it starts) |
| API key | Any text, unless you started the proxy with `--api-key` |

The proxy speaks the OpenAI format, and Anthropic's `/v1/messages` too.

## AG-UI server

```bash
pando agui-serve --port 8090 --allow-origin http://localhost:3000   # on its own (recommended)
pando serve --agui-port 8090                                        # next to the Web UI
pando agui-serve --print-token                                      # show the stored token again
```

Address for your page: `http://localhost:8090/api/v1/agui/coder`, with the header `Authorization: Bearer <token>`.

| Flag | What it does |
|---|---|
| `--agent` | Agent to offer (repeat for several) |
| `--allow-origin` | Web address allowed to connect (repeat for several) |
| `--persona` | Persona added to every conversation |
| `--cwd` | Project folder to work in |
| `--host`, `--port` | Where to listen (`localhost`, `8090`) |
| `--token`, `--token-file` | Choose the token yourself. Also read from the `PANDO_AGUI_TOKEN` environment variable |
| `--no-token` | No token at all |
| `--auto-approve` | Approve the agent's actions without asking the page |
| `--no-tls`, `--tls-cert`, `--tls-key` | Plain HTTP, or your own certificate |

When you give no token, Pando creates one, prints it once and stores it in `~/.config/pando/agui-token` for the next starts.

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

[AGUI.Profiles.reviewer]
Base    = 'coder'
Model   = 'anthropic.claude-sonnet-4'
Persona = 'code-reviewer'
```

Client library (TypeScript SDK):

```typescript
import { PandoAguiClient } from '@pando-ai/sdk/agui';

const client = new PandoAguiClient({ baseUrl: 'http://localhost:8090', token });
for await (const event of client.run({ prompt: 'Summarise the repo' })) {
  if (event.type === 'TEXT_MESSAGE_CONTENT') process.stdout.write(event.delta);
}
```

A complete Next.js example with chat, a status board, a page tool and in-page approvals is in the Pando repository under [`examples/copilotkit`](https://github.com/digiogithub/pando/tree/main/examples/copilotkit).

## Several Pando windows at once (IPC)

Nothing to configure: it sets itself up when more than one Pando is running. Internal defaults: heartbeat every 5 s, a window is considered gone after 15 s, a deeper check every 60 s. The list of running windows is kept in `/tmp/pando-instances/`.

To let windows hand work to each other:

```toml
[Mesnada.Delegation]
AllowExternalWarmTargets = true   # the one that asks
AcceptDelegations        = true   # the one that accepts
```

| Message between windows | What it does |
|---|---|
| `state.sync` | Full copy of the current state |
| `session.list` | List sessions |
| `session.activate` | Open a session |
| `message.send` | Send a message |
| `session.interrupt` | Stop the model's answer in progress |
| `instance.ping` | Check a window is alive and what it can do |
| `delegation.run` | Run a handed-over task |
| `delegation.cancel` | Cancel it |
| `delegation.status` | Ask how it is going |
| `db.compact` | Tidy the database (always done by the main window) |

What the other windows hear live: sessions created, opened and deleted, new messages, the model's answer as it is written, and tools starting and finishing.
