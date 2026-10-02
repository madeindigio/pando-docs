---
title: "Usa Pando desde tu editor y otras aplicaciones"
shortTitle: "Editores y otras aplicaciones"
description: "Inicia sesión con GitHub Copilot, mete a Pando en tu editor de código, presta tus modelos a otras herramientas y pon un agente de Pando detrás de tu propia página web."
summary: "Pando dentro de tu editor, de tus herramientas y de tu propia web."
track: soil
level: advanced
weight: 23
---

Pando no tiene por qué vivir en su propia ventana. Puede estar dentro del editor que ya usas, prestar sus modelos a otras herramientas y trabajar detrás de un chat en una página hecha por ti. Cada paso de abajo es independiente: haz solo los que necesites.

Necesitas Pando instalado y al menos una cuenta de modelos configurada (mira [Conecta tus cuentas de IA]({{< relref "/guides/setup-providers-models" >}})). Casi toda esta guía ocurre en una terminal y en los ajustes del otro programa, porque es ahí donde están esas puertas.

## Inicia sesión con GitHub Copilot

Si pagas GitHub Copilot, sus modelos pueden ser los modelos de Pando. Sin copiar ninguna clave.

1. En la Web UI ve a **Configuración > Proveedores**.
2. Si aún no hay una fila **copilot**, pulsa **Add provider**, elige GitHub Copilot en **Provider Type** y pulsa **Save**.
3. En la fila **copilot** pulsa **Login with GitHub**.
4. Se abre una página de GitHub y Pando te muestra un código corto. Escribe el código en esa página y acepta.

{{< shot src="images/webui/pando-webui-settings-providers.jpg" alt="Cuentas de proveedor con el botón Login with GitHub" >}}

Pulsa **Test** en la fila para confirmarlo. Los modelos de Copilot aparecen ya en el selector de modelos del chat, con nombres que empiezan por `copilot.`

Si tu empresa ha añadido modelos propios a Copilot, también aparecen, igual que en VS Code. No hay que hacer nada más.

## Mete a Pando en tu editor de código

Editores como Zed, VS Code, la familia JetBrains y Xcode pueden alojar un asistente externo en su propio panel de chat. Hablan con él en un idioma común llamado ACP. Lo que te toca a ti es decirle al editor cómo arrancar Pando.

En Zed, abre `~/.config/zed/settings.json` y añade:

```json
{
  "agent_servers": {
    "Pando": {
      "command": "pando",
      "args": ["acp"]
    }
  }
}
```

VS Code admite el mismo bloque en su `settings.json`, y los editores de JetBrains en su `acp.json` (ahí pon la ruta completa de `pando`). Los fragmentos exactos están en [Protocolo ACP]({{< relref "/docs/acp" >}}).

Reinicia el editor, abre su panel de asistente y elige **Pando**. Tienes el mismo Pando, con tus modelos, tu memoria y tus herramientas, y con una lista en vivo de lo que piensa hacer dentro del editor. Los comandos como `/goal` y `/compact` también funcionan ahí.

## Presta tus modelos a otras herramientas

Configuraste tus claves una vez en Pando. Otras herramientas que esperan «una dirección tipo OpenAI» pueden tomarlas prestadas a través de Pando, como compartir en casa una sola suscripción de streaming sin pagar una por habitación.

Arranca el proxy en una terminal y déjalo abierto:

```bash
pando llm-proxy
```

Después, en los ajustes de la otra herramienta:

| Te pide | Escribes |
|---|---|
| URL base de la API | `http://localhost:11434/v1` |
| Clave de API | Cualquier cosa. Pando usa las claves reales que ya tiene |
| Modelo | Un nombre de la lista de Pando, como `copilot.gpt-4.1` |

Si ese puerto está ocupado en tu máquina (Ollama usa el mismo), elige otro: `pando llm-proxy --port 8080`.

## Pon un agente de Pando detrás de tu propia página web

Si haces aplicaciones web, el chat de tu producto puede contestarlo un agente de Pando. Aquí el idioma común se llama AG-UI, y es el que hablan herramientas como CopilotKit.

Viene **apagado**, porque deja al alcance de un navegador un agente que puede ejecutar código. Arráncalo a propósito y di qué dirección web puede conectarse:

```bash
pando agui-serve --port 8090 --allow-origin http://localhost:3000
```

Pando muestra un token de acceso la primera vez. En tu página, apunta el cliente a `http://localhost:8090/api/v1/agui/coder` y envía el token como `Authorization: Bearer <token>`. El token no cambia entre reinicios; `pando agui-serve --print-token` te lo vuelve a enseñar.

Tienes un ejemplo completo del que copiar en el repositorio de Pando, en [`examples/copilotkit`](https://github.com/digiogithub/pando/tree/main/examples/copilotkit).

## Ofrece las herramientas de Pando a otro asistente

Lo contrario de enchufar herramientas a Pando: otro asistente (Claude Desktop, Cursor…) se enchufa a Pando y usa su búsqueda web, su navegador, su memoria y sus herramientas de ficheros. Añade esto a los ajustes MCP de ese programa:

```json
{
  "mcpServers": {
    "pando": {
      "command": "pando",
      "args": ["mcp-server", "--no-http"]
    }
  }
}
```

Los detalles y las opciones están en [Servidor MCP]({{< relref "/docs/mcp" >}}).

## Comprueba que funciona

- **Copilot**: en el selector de modelos del chat salen modelos `copilot.`.
- **Editor**: Pando contesta en el panel de asistente del editor y puede leer el proyecto abierto.
- **Proxy**: la otra herramienta lista los modelos de Pando, o contesta a una pregunta de prueba.
- **AG-UI**: el chat de tu página recibe respuesta, y se ve la actividad del agente mientras trabaja.

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Faltan los modelos de Copilot de tu empresa | Ejecuta `pando auth copilot status` para ver si detecta tu licencia y tu organización; después cierra sesión y vuelve a iniciarla |
| El editor no lista Pando | No encuentra el programa. Escribe la ruta completa de `pando` en `command` y reinicia el editor |
| La otra herramienta dice «connection refused» | El proxy no está en marcha, o está en otro puerto. Mira la dirección que mostró al arrancar |
| El proxy no arranca | El puerto está ocupado. Añade `--port` con uno libre |
| Tu página recibe `401` | Falta el token o está mal. Léelo otra vez con `pando agui-serve --print-token` |
| A tu página la rechazan antes de enviar nada | Su dirección no está en `--allow-origin` |

## ¿Prefieres la terminal?

Inicio de sesión de Copilot sin la Web UI:

```bash
pando auth copilot login
pando auth copilot login --enterprise-url https://github.mycompany.com   # GitHub Enterprise
pando auth copilot login --no-browser
pando auth copilot status
pando auth copilot logout
```

Todas las opciones y claves de configuración de Copilot, el proxy y AG-UI están en la [referencia de proveedores]({{< relref "/docs/configuration/providers" >}}); las opciones de los editores, en [Configuración ACP avanzada]({{< relref "/docs/configuration/acp-advanced" >}}).
