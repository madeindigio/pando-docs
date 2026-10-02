---
title: Skills, Lua y extensiones
weight: 42
---

Referencia de las formas de enseñarle trucos nuevos a Pando. Explicación: [Extensiones]({{< relref "/docs/features/extensions" >}}). Paso a paso: [Escribe tu primera skill]({{< relref "/guides/first-skill" >}}).

## Skills

```toml
[Skills]
Enabled = true
Paths   = ['./agents/skills']   # carpetas extra donde buscar

[SkillsCatalog]
Enabled      = true
BaseURL      = ''               # vacío = https://skills.sh
AutoUpdate   = false
DefaultScope = 'global'         # global | project
```

Carpetas donde se busca, además de `Paths`: `~/.pando/skills`, `<project>/.pando/skills`, `~/.claude/skills`, `<project>/.claude/skills`. Cada skill es una carpeta con un `SKILL.md`.

Campos de la cabecera de `SKILL.md`:

| Campo | Significado |
|---|---|
| `name` | Por defecto, el nombre de la carpeta |
| `description` | Cuándo usar la skill. Por defecto, el primer párrafo |
| `when-to-use`, `when-not-to-use` | Pistas extra para elegirla |
| `version`, `author`, `license`, `compatibility` | Solo informativos |
| `allowed-tools` | Herramientas que la skill puede usar |
| `user-invocable` | Puedes llamarla por su nombre |
| `disable-model-invocation` | Pando nunca la elige por su cuenta |

Las skills que Pando propone a partir de tus sesiones están en `.pando/skills/learned/`:

```bash
pando skills list --status pending
pando skills approve <id>
pando skills reject <id>
```

## Lua

```toml
[Lua]
Enabled         = false
ScriptPath      = ''      # ruta a tu fichero de hooks
Timeout         = ''      # e.g. "5s"
StrictMode      = false   # trata los errores de script como fatales
HotReload       = false   # recarga cuando cambia el fichero
LogFilteredData = false   # registra lo que los scripts filtraron o bloquearon
```

## Extensiones

Las extensiones van compiladas dentro del programa Pando. La configuración solo elige cuáles de las incluidas se cargan y les pasa sus ajustes.

```toml
[Extensions]
Disabled = ["memory.sink.corp"]     # no cargar nunca estas, diga lo que diga lo demás

[Extensions.Entries."memory.sink.corp"]
Enabled = true

[Extensions.Entries."memory.sink.corp".Config]
Endpoint = "https://remembrances.corp.internal"
```

`Disabled` es el interruptor más fuerte: también apaga extensiones que se cargarían por defecto.

```bash
pando extensions list      # extensiones incluidas y si se han cargado
pando ext                  # ejecuta comandos aportados por extensiones
pando --version            # muestra la variante, p. ej. v0.9.1 (enterprise)
```

### Compilar un binario con extensiones

```bash
make build                          # ./pando
make build-enterprise               # ./pando-enterprise
make release-enterprise             # un paquete distribuible
make xpando                         # la herramienta que compone el binario

./xpando build v0.9.1 \
    --with github.com/yourorg/your-extension/tools \
    --output ./pando-enterprise
```

| Opción | Significado |
|---|---|
| `--with module[/pkg][@version][=/local/path]` | Paquete de extensión que se enlaza. Repetible; `=ruta` compila contra una copia local |
| `--replace module[@version]=replacement` | Sustitución de una dependencia sin importarla. Repetible |
| `--tags`, `--ldflags`, `--output` | Se pasan tal cual a la compilación |
| `--variant name` | Cambia la variante que muestra `--version` |

Se respetan `GOOS`, `GOARCH` y las variables habituales de Go. La Web UI va dentro del núcleo, así que un binario compuesto lleva la interfaz estándar salvo que una de sus extensiones traiga la suya.
