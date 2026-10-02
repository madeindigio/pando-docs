---
title: Sandbox de comandos
weight: 38
---

Pando ejecuta directamente en tu máquina los comandos de shell que escribe el agente. El sandbox de comandos confina esos comandos con las protecciones del propio sistema operativo: un comando no puede escribir fuera de tu proyecto, no puede cambiar la configuración de Pando ni tus hooks de git, y no ve tus claves de API.

No hay contenedores ni nada que instalar. En **Linux y macOS el sandbox viene activado por defecto**.

## Qué protege

Mientras un comando se ejecuta dentro del sandbox:

- **Solo puede escribir en tu proyecto**, en las carpetas temporales y en las cachés habituales de dependencias (Go, npm, pnpm, yarn, bun, pip, cargo, gradle, maven).
- **La configuración de Pando es de solo lectura**: `.pando.toml`, la carpeta `.pando/` y tu configuración global. El agente no puede desactivar el sandbox editando un fichero.
- **Los hooks y la configuración de git son de solo lectura**: `.git/hooks` y `.git/config`. Un comando no puede dejar un hook que se ejecute después fuera del sandbox.
- **Tus credenciales se eliminan del entorno**: las variables que parecen claves, tokens o contraseñas no llegan al shell del agente.
- **Los puertos del propio Pando están bloqueados**, así que un comando no puede hablar con la API de Pando para cambiar ajustes.

Solo se confinan los comandos que escribe el agente. Los terminales que abres tú en la TUI o en la Web UI no se confinan nunca: ejecutan lo que tú escribes.

## Menos preguntas de permiso

Como un comando confinado puede hacer poco daño, Pando **aprueba automáticamente los comandos de shell** mientras el sandbox ofrece su protección completa. Los comandos peligrosos, como `sudo` o borrar una ruta del sistema, te siguen preguntando antes.

Si prefieres seguir aprobando cada comando, pon `AutoAllowBashDisabled = true`.

## Modos

| Modo | Puede escribir en | Red | Para qué |
|---|---|---|---|
| `workspace-write` (por defecto) | Proyecto, carpetas temporales, cachés de dependencias | Permitida | Desarrollo normal |
| `read-only` | Solo carpetas temporales | Bloqueada | Explorar o revisar código que el agente no debe cambiar |
| `strict` | Proyecto y carpetas temporales | Bloqueada | Repositorios en los que no confías: el agente no puede leer tu carpeta personal |
| `off` | Todo | Permitida | Desactivar el sandbox |

## Cuando se bloquea un comando

El agente recibe una nota que explica que el sandbox bloqueó el comando y por qué. Casi siempre lo reintenta dentro del proyecto.

Cuando un comando necesita de verdad salir del sandbox, el agente puede pedir ejecutarlo una vez sin confinamiento. Esa petición **siempre necesita tu aprobación explícita**, en la TUI, en la Web UI y en los editores. La aprobación automática y los modos desatendidos nunca la conceden.

## Cambiar el modo o desactivarlo

{{< shot src="images/webui/pando-webui-settings-sandbox.jpg" alt="Ajustes del sandbox de comandos" >}}

Cualquiera de estas opciones se aplica al siguiente comando, sin reiniciar:

- **TUI**: Ajustes > Sandbox. El pie muestra una etiqueta con el estado actual.
- **Web UI y escritorio**: Ajustes > Sandbox. La misma etiqueta aparece en el panel de información del chat.
- **Fichero de configuración** (`~/.pando.toml`):

  ```toml
  [Sandbox]
  Mode = "read-only"     # workspace-write | read-only | strict | off
  ```

- **Solo para una ejecución**:

  ```bash
  PANDO_SANDBOX=off pando
  PANDO_SANDBOX=strict pando
  ```

{{< callout >}}
Un proyecto no puede relajar tu sandbox. El `.pando.toml` de un repositorio solo puede hacerlo más estricto, así que clonar un repositorio nunca desactiva tu protección.
{{< /callout >}}

## Ajustes habituales

```toml
[Sandbox]
Mode = "workspace-write"
Network = "allowed"                 # o "restricted" para bloquear la red
WritableRoots = ["~/work/shared"]   # carpetas extra donde el agente puede escribir
DenyPaths = ["~/.ssh", "~/.aws", "*.pem"]   # ni se leen ni se escriben
AutoAllowBashDisabled = false       # true mantiene la pregunta en cada comando

[Sandbox.Env]
Keep = ["NPM_TOKEN"]                # deja pasar esta variable
```

## Comprobar qué está activo

```bash
pando sandbox status                      # backend, modo y qué está protegido
pando sandbox exec -- touch ~/.probe      # ejecuta un comando confinado; debe dar "Permission denied"
```

## Soporte por plataforma

| Plataforma | Protección |
|---|---|
| Linux, kernel 6.7 o posterior, con bubblewrap instalado | Completa |
| Linux, kernel anterior o sin bubblewrap | Parcial. Pando indica qué falta y sigue preguntando antes de cada comando |
| macOS | Completa |
| WSL 2 | Igual que Linux |
| Windows | Sin confinamiento. Pando sigue preguntando antes de cada comando |

En Linux, instala bubblewrap para tener la protección completa: `sudo apt install bubblewrap` (o `dnf`, `pacman`, `zypper`).

## Conviene saber

- Si ejecutas los comandos dentro de Docker o Podman, el aislamiento es el contenedor y el sandbox del host no se aplica.
- Cuando Pando trabaja dentro de un editor (Zed, VS Code, JetBrains) y el editor ejecuta el comando en su propio terminal, manda el editor y el comando no se confina.
- Los servidores MCP y las CLI de agentes delegados no se confinan por defecto, porque suelen necesitar ficheros propios fuera del proyecto. Actívalo con `ExtendTo = ["mcp", "subagents"]`.
- Las carpetas temporales siempre son escribibles, incluso en modo `read-only`.
