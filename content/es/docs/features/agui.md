---
title: AG-UI para aplicaciones web
weight: 42
---

Pando puede ser el agente que hay detrás de tu propia aplicación web. Habla [AG-UI](https://docs.ag-ui.com), el protocolo que usan [CopilotKit](https://www.copilotkit.ai) y otros kits de React parecidos, así que un panel de chat dentro de tu producto puede hablar con un agente de Pando que lee ficheros, ejecuta herramientas y delega trabajo.

Viene **desactivado por defecto**, porque pone un agente capaz de ejecutar código al alcance de un navegador.

## Arrancarlo

```bash
# Solo AG-UI, en su propio puerto (recomendado)
pando agui-serve --port 8090 --allow-origin http://localhost:3000

# O junto a la Web UI
pando serve --agui-port 8090
```

Pando muestra un token de acceso al arrancar. Apunta tu frontend a `http://localhost:8090/api/v1/agui/coder` y envía el token como `Authorization: Bearer <token>`. El token se conserva entre reinicios, así que lo configuras una sola vez.

## Qué recibe tu página

- **Chat en streaming** con el agente, incluida la actividad de sus herramientas.
- **Aprobaciones y preguntas en la página**: cuando el agente necesita permiso o pregunta algo, lo muestra tu interfaz.
- **Tus propias herramientas de frontend**: el agente puede llamar a las acciones que definas en la página.
- **Estado en vivo**: el modelo en uso, el presupuesto de tokens, la lista de tareas, los ficheros tocados y los subagentes en marcha, listos para pintar como tarjetas en lugar de interpretar el texto del chat.
- **Conversaciones que sobreviven**: recarga la página, o reinicia Pando, y el mismo hilo continúa.
- **Ejecuciones que siguen adelante**: si el navegador se desconecta, la ejecución espera dos minutos. Al reconectar recibes lo que te perdiste y después el streaming en vivo.

## Perfiles de agente

Un perfil es un agente con nombre, con su propio modelo, persona y conjunto de herramientas. Con perfiles puedes ofrecer, por ejemplo, un «revisor» de solo lectura y un «programador» completo desde el mismo Pando, cada uno en su propia dirección.

```toml
[AGUI.Profiles.reviewer]
Base    = 'coder'
Model   = 'anthropic.claude-sonnet-4'
Persona = 'code-reviewer'
```

## Configuración

```toml
[AGUI]
Enabled        = true
Port           = 8090
Host           = 'localhost'
Agents         = ['coder']
AllowedOrigins = ['http://localhost:3000']   # vacío: ningún navegador puede conectar
RequireToken   = true
FrontendTools  = true
HumanInTheLoop = true
```

{{< callout type="warning" >}}
Solo los orígenes que indiques pueden conectar desde un navegador, y cada petición necesita el token. Deja `Host` en `localhost` salvo que pongas Pando detrás de tu propio proxy inverso.
{{< /callout >}}

## Bibliotecas cliente

El SDK de TypeScript incluye un cliente y una ayuda para CopilotKit:

```typescript
import { PandoAguiClient } from '@pando-ai/sdk/agui';

const client = new PandoAguiClient({ baseUrl: 'http://localhost:8090', token });
for await (const event of client.run({ prompt: 'Summarise the repo' })) {
  if (event.type === 'TEXT_MESSAGE_CONTENT') process.stdout.write(event.delta);
}
```

En el repositorio de Pando, en [`examples/copilotkit`](https://github.com/digiogithub/pando/tree/main/examples/copilotkit), hay un ejemplo completo en Next.js con chat, panel de estado, una herramienta de frontend y aprobaciones dentro de la página.
