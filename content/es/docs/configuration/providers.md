---
title: Referencia de proveedores, proxy y AG-UI
weight: 43
---

Opciones de las cuentas de modelos, el inicio de sesión con GitHub Copilot, el proxy LLM local y el servidor AG-UI. Las explicaciones están en [GitHub Copilot Auth]({{< relref "/docs/features/copilot-auth" >}}), [Proxy LLM local]({{< relref "/docs/features/llm-proxy" >}}) y [AG-UI para aplicaciones web]({{< relref "/docs/features/agui" >}}); el paso a paso, en la guía [Usa Pando desde tu editor y otras aplicaciones]({{< relref "/guides/editors-and-other-apps" >}}).

## Cuentas de proveedor

Declara solo los proveedores que usas. Una sección que se queda con la clave vacía hace que Pando ofrezca una cuenta que no puede funcionar.

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

Los modelos se escriben `<proveedor>.<modelo>`, por ejemplo `copilot.gpt-4.1`.

Los precios y tamaños de contexto que un proveedor no informa se completan desde [models.dev](https://models.dev), que se descarga una vez y se guarda 24 horas en `~/.pando_modelsdev.json`. Para no contactar nunca con él:

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

No hay nada más que configurar: el inicio de sesión se guarda en tu perfil de Pando.

| Plan de Copilot | Modelos que tienes |
|---|---|
| Free | Un conjunto limitado |
| Pro | GPT-4, GPT-4o |
| Pro+ | Un conjunto más amplio |
| Business / Enterprise | Los modelos de tu organización, incluidos los que añadió con sus propias claves (BYOK) |

Los modelos de la organización llevan su nombre delante:

```bash
pando --model copilot.gpt-4.1 -p "Explain this code"
pando --model 'copilot.myorg/OpenRouter/some-model' -p "Explain this code"
```

## Proxy LLM local

```bash
pando llm-proxy                       # localhost, port 11434
pando llm-proxy --port 8080
pando llm-proxy --host 0.0.0.0
pando llm-proxy --api-key mysecretkey   # ask clients for this key
pando llm-proxy --debug
```

| Lo que pide la otra herramienta | Qué le das |
|---|---|
| URL base de la API | `http://localhost:11434/v1` (o la dirección que muestra el proxy al arrancar) |
| Clave de API | Cualquier texto, salvo que hayas arrancado el proxy con `--api-key` |

El proxy habla el formato de OpenAI, y también el `/v1/messages` de Anthropic.

## Servidor AG-UI

```bash
pando agui-serve --port 8090 --allow-origin http://localhost:3000   # on its own (recommended)
pando serve --agui-port 8090                                        # next to the Web UI
pando agui-serve --print-token                                      # show the stored token again
```

Dirección para tu página: `http://localhost:8090/api/v1/agui/coder`, con la cabecera `Authorization: Bearer <token>`.

| Opción | Qué hace |
|---|---|
| `--agent` | Agente que se ofrece (repítela para varios) |
| `--allow-origin` | Dirección web que puede conectarse (repítela para varias) |
| `--persona` | Persona que se añade a todas las conversaciones |
| `--cwd` | Carpeta del proyecto en la que trabajar |
| `--host`, `--port` | Dónde escuchar (`localhost`, `8090`) |
| `--token`, `--token-file` | Eliges tú el token. También se lee de la variable de entorno `PANDO_AGUI_TOKEN` |
| `--no-token` | Sin token |
| `--auto-approve` | Aprueba las acciones del agente sin preguntar a la página |
| `--no-tls`, `--tls-cert`, `--tls-key` | HTTP sin cifrar, o tu propio certificado |

Si no das un token, Pando crea uno, lo muestra una vez y lo guarda en `~/.config/pando/agui-token` para los siguientes arranques.

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

Biblioteca cliente (SDK de TypeScript):

```typescript
import { PandoAguiClient } from '@pando-ai/sdk/agui';

const client = new PandoAguiClient({ baseUrl: 'http://localhost:8090', token });
for await (const event of client.run({ prompt: 'Summarise the repo' })) {
  if (event.type === 'TEXT_MESSAGE_CONTENT') process.stdout.write(event.delta);
}
```

En el repositorio de Pando, en [`examples/copilotkit`](https://github.com/digiogithub/pando/tree/main/examples/copilotkit), hay un ejemplo completo en Next.js con chat, un panel de estado, una herramienta de la página y aprobaciones dentro de la página.

## Varias ventanas de Pando a la vez (IPC)

No hay nada que configurar: se monta solo cuando hay más de un Pando en marcha. Valores internos: un latido cada 5 s, una ventana se da por desaparecida a los 15 s, una comprobación más a fondo cada 60 s. La lista de ventanas en marcha se guarda en `/tmp/pando-instances/`.

Para que las ventanas se pasen trabajo entre sí:

```toml
[Mesnada.Delegation]
AllowExternalWarmTargets = true   # the one that asks
AcceptDelegations        = true   # the one that accepts
```

| Mensaje entre ventanas | Qué hace |
|---|---|
| `state.sync` | Copia completa del estado actual |
| `session.list` | Lista las sesiones |
| `session.activate` | Abre una sesión |
| `message.send` | Envía un mensaje |
| `session.interrupt` | Detiene la respuesta del modelo en curso |
| `instance.ping` | Comprueba que una ventana sigue viva y qué sabe hacer |
| `delegation.run` | Ejecuta una tarea cedida |
| `delegation.cancel` | La cancela |
| `delegation.status` | Pregunta cómo va |
| `db.compact` | Ordena la base de datos (lo hace siempre la ventana principal) |

Lo que las demás ventanas oyen en directo: sesiones creadas, abiertas y borradas, mensajes nuevos, la respuesta del modelo mientras se escribe, y herramientas que empiezan y terminan.
