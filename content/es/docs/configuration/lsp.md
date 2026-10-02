---
title: Referencia de servidores de lenguaje
weight: 41
---

Todas las opciones de los servidores de lenguaje (LSP). La explicación está en [Autoactivación de LSP]({{< relref "/docs/features/lsp-auto-activation" >}}) y el paso a paso en la guía [Que Pando vea los fallos mientras escribe]({{< relref "/guides/language-servers" >}}).

## Interruptores generales

Claves de primer nivel en `.pando.toml`.

| Clave | Por defecto | Qué hace |
|---|---|---|
| `LSPAutoActivate` | `true` | Arranca un servidor de lenguaje cuando hace falta. `false` lo desactiva del todo |
| `LSPActivateOn` | `"edits"` | Qué puede despertar a un servidor: `"edits"` (ficheros que Pando edita, o cuando pide los problemas), `"reads"` (también ficheros leídos o abiertos en el visor y el árbol de ficheros), `"workspace"` (también ficheros cambiados fuera de Pando; vigila todo el proyecto), `"off"` |
| `LSPAutoInstall` | `true` | Instala en `~/.config/pando/lsp` los servidores que faltan y se distribuyen como paquetes npm |
| `LSPRunner` | `"auto"` | Quién los instala: `"auto"` (bun si está, npm si no), `"bun"`, `"npm"`, `"off"` (no instala nunca; usa solo lo que ya esté en tu `PATH`) |
| `LSPStartupTimeout` | `"20s"` | Cuánto se espera a que un servidor esté listo |
| `LSPInstallTimeout` | `"120s"` | Espera más larga mientras se instala un servidor |

Los servidores que vienen con las herramientas del propio lenguaje (gopls, rust-analyzer, clangd…) no se instalan nunca por ti: Pando te dice el comando que tienes que ejecutar.

Con `"workspace"`, Pando se salta las carpetas habituales sin código fuente: `.git`, `node_modules`, `vendor`, `dist`, `build`, `target`, `out`.

## Una sección por servidor

```toml
[LSP]

# Change a built-in server
[LSP.gopls]
Disabled  = false
Autostart = true          # start when Pando starts, not on the first file
Command   = 'gopls'
Args      = ['-remote=auto']
Languages = ['.go']
Filenames = []

# Add your own
[LSP.my-custom-lsp]
Command   = 'my-lsp'
Args      = ['--stdio']
Languages = ['.mylang']
```

| Clave | Qué hace |
|---|---|
| `Command`, `Args` | El programa y sus argumentos |
| `Languages` | Extensiones de fichero de las que se ocupa este servidor |
| `Filenames` | Nombres de fichero exactos, para ficheros cuya extensión no dice nada (`Dockerfile`, `CMakeLists.txt`, `Gemfile`) |
| `Autostart` | `false` (por defecto): arranca con el primer fichero que le toca. `true`: arranca con Pando |
| `Disabled` | `true`: no arranca nunca, aunque esté instalado |

Los campos que dejas vacíos se toman del servidor integrado con el mismo nombre. Lo que tú escribes siempre gana.

Algunos servidores integrados están apagados hasta que los nombras, porque necesitan configuración del proyecto o compiten con uno general: `eslint-language-server`, `biome`, `sql-language-server` y `deno`. Basta una sección vacía: `[LSP.biome]`.

## Servidores integrados

El catálogo cubre más de cuarenta lenguajes. Los más habituales:

| Lenguaje | Servidor | Programa |
|---|---|---|
| Go | gopls | `gopls` |
| TypeScript / JavaScript | typescript-language-server | `typescript-language-server` |
| Python | pyright | `pyright` |
| Rust | rust-analyzer | `rust-analyzer` |
| C / C++ | clangd | `clangd` |
| Java | jdtls | `jdtls` |
| Ruby | solargraph | `solargraph` |
| PHP | phpactor | `phpactor` |
| Swift | sourcekit-lsp | `sourcekit-lsp` |
| Kotlin | kotlin-language-server | `kotlin-language-server` |

La lista completa, con lo que hay instalado en tu máquina, está en **Configuración > LSP > Built-in catalogue**.

## Dónde aparecen los problemas

- En la barra de estado de la TUI: número de errores y avisos.
- En el editor: junto a la línea, mientras recorres un fichero.
- Para el agente: la herramienta `diagnostics` devuelve los problemas de cualquier fichero.
