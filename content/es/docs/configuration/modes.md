---
title: Modos de trabajo y mantenimiento de la sesión
weight: 37
---

Comandos, valores por defecto y claves del esfuerzo de razonamiento, Caveman, Ponytail, Superpowers, Learning, la compactación de sesión y los snapshots. Las guías que los enseñan: [Cambia cómo piensa y cómo habla Pando]({{< relref "/guides/working-modes" >}}) y [Revisa y deshaz lo que hizo el agente]({{< relref "/guides/review-and-undo" >}}).

## Esfuerzo de razonamiento y pensamiento

Por agente. Web UI: **Configuración > Agentes**, dentro de cada agente.

{{< shot src="images/webui/pando-webui-settings-agents-coder.jpg" alt="Agente Coder: modelo, esfuerzo de razonamiento, modo de pensamiento y compactación automática" >}}

```toml
[Agents.coder]
Model           = 'anthropic.claude-sonnet-5'
ReasoningEffort = 'high'
ThinkingMode    = ''
```

| Clave | Valores | Notas |
|---|---|---|
| `ReasoningEffort` | `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max` | Cuáles se aplican depende del modelo. Vacío deja que Pando elija el valor por defecto del modelo (`medium` si existe; si no, el más cercano) |
| `ThinkingMode` | `disabled`, `low`, `medium`, `high` | Para modelos con presupuesto de pensamiento: el 20 %, 50 % u 80 % |

Pando solo ofrece los valores que admite el modelo seleccionado y ajusta lo que quede fuera de rango en lugar de fallar. El selector de modelos de la TUI y la Web UI muestra las opciones de esfuerzo del modelo seleccionado; en los editores por ACP (Zed, VS Code, JetBrains) el menú de ajustes de la sesión las lista y se reconstruye al cambiar de modelo. Las capacidades de los modelos se completan con [models.dev](https://models.dev).

## Caveman (brevedad de salida)

| Comando | Efecto |
|---------|--------|
| `/caveman lite` | Frases normales, sin relleno ni preámbulos |
| `/caveman full` | Fragmentos y viñetas, una idea por línea |
| `/caveman ultra` | Compresión máxima |
| `/caveman off` o `/caveman-finish` | Desactivar |

```toml
[Caveman]
# "" (empty) = off, "lite", "full", or "ultra"
DefaultMode = "lite"
```

| Ajuste | Dónde | Valores | Por defecto |
|---------|----------|--------|---------|
| `Caveman.DefaultMode` | `.pando.toml` | `""`, `"lite"`, `"full"`, `"ultra"` | `""` (desactivado) |

Web UI: **Configuración > General > Optimización del feedback > Brevedad de salida (Caveman)**. TUI: Settings > Tools > Caveman. Un comando slash solo cambia la sesión actual; las sesiones nuevas empiezan con el valor por defecto.

Se recorta: saludos, despedidas, narración de lo que va a hacer, repetir la petición, preámbulos, resúmenes repetidos, transiciones genéricas, rodeos, disculpas, elogios, adjetivos de relleno y explicaciones que nadie pidió.

Nunca se comprime: el código y los bloques de código, las líneas de comandos y las rutas de ficheros, el texto de los errores y las trazas, la salida de los tests y los resultados de verificación, las firmas de API y las URL, los avisos de seguridad y cualquier cosa de la que hayas pedido detalle. Una petición directa de detalle («explica», «cuéntamelo paso a paso») anula el modo en esa respuesta.

## Ponytail (YAGNI)

| Comando | Comportamiento |
|------|----------|
| `/ponytail lite` | Construye lo que pides y nombra la alternativa más perezosa |
| `/ponytail full` | Biblioteca estándar primero, el diff más corto, la explicación más corta («La Escalera») |
| `/ponytail ultra` | Borrar antes que añadir; cuestiona el requisito |
| `/ponytail off` o `/ponytail-finish` | Desactivado (por defecto) |

```toml
[Ponytail]
DefaultMode = ''   # 'lite', 'full', 'ultra', or '' (off)
```

```bash
PANDO_PONYTAIL_DEFAULT_MODE=full
```

Inspirado en la skill ponytail de Dietrich Gebert (licencia MIT).

## Superpowers

| Comando | Efecto |
|---|---|
| `/superpowers [objetivo]` | Activar. Surte efecto al momento, sin turno del modelo |
| `/superpowers-finish` | Un turno real que verifica lo hecho, resume los cambios, dice lo que no está hecho y propone los siguientes pasos. El modo solo se desactiva si ese turno sale bien |

Sin clave de configuración: siempre se activa a mano en cada sesión, y no sobrevive a un reinicio.

Ciclo mientras está activo: entender → diseño y aprobación → plan escrito (fases por riesgo y dependencia, con criterio de salida y un comando de verificación por fase) → implementación con tests primero y en pasos pequeños → reproducir antes de arreglar → verificar con salida real → autorrevisión.

Garantías: nunca hace commit, merge ni push; nunca toca ramas ni worktrees; nunca descarta trabajo (`git checkout`, `git reset`); nunca cambia la configuración de git.

Precedencia: las instrucciones directas del usuario y las reglas de AGENTS.md mandan sobre la política; el sistema de permisos sigue aplicándose; las peticiones triviales o de solo lectura se saltan los controles. Inspirado en el flujo de trabajo [superpowers](https://github.com/obra/superpowers).

## Learning

| Comando | Efecto |
|---|---|
| `/learning [foco]` | Activar. Surte efecto al momento, sin turno del modelo |
| `/learning-finish` | Un turno real que consolida lo aprendido en la base de conocimiento y la memoria, y luego desactiva el modo. Sigue activo si ese turno falla o se cancela |

Sin clave de configuración: siempre se activa a mano en cada sesión, y no sobrevive a un reinicio.

Herramientas en las que se apoya:

| Herramienta | Para qué |
|------|---------|
| `kb_search_documents` | Busca por significado en los documentos de la base de conocimiento |
| `kb_add_document` | Guarda documentación nueva o actualizada |
| `kb_mark_outdated` | Marca como obsoletos los documentos sustituidos |
| `remember` | Guarda datos cortos y duraderos |
| `recall` | Recupera los datos guardados |
| `hybrid_search_remembrances` | Busca a la vez en la base de conocimiento, las sesiones y el código |
| `AskUserQuestion` | Te pregunta una decisión que es tuya |

## Compactación de sesión

| Comando | Efecto |
|---|---|
| `/compact` | Sustituye la conversación hasta ese punto por un resumen |
| `/summarize` | Alias de `/compact` |

```toml
AutoCompact = true          # global switch

[Agents.coder]
AutoCompact = false         # per-agent override
AutoCompactThreshold = 0.0  # share of the context window that triggers it; 0.0 = automatic

[Agents.summarizer]
Model = 'ollama.qwopus:latest'
```

| Ajuste | Descripción |
|---------|-------------|
| `AutoCompact` | Interruptor global de la compactación automática |
| `AutoCompactThreshold` | Umbral de uso del contexto que la dispara (0.0 = automático) |
| `[Agents.summarizer].Model` | Modelo que escribe el resumen |

Web UI: **Configuración > Agentes > Coder > Auto-compact** y **Compact threshold**. Los mensajes anteriores al resumen se sustituyen por él; el resumen queda guardado como un límite dentro de la sesión.

## Snapshots y Agent-VCS

Web UI: **Configuración > Snapshots** y la vista **Agent VCS**.

{{< shot src="images/webui/pando-webui-settings-snapshots.jpg" alt="Ajustes de Snapshots" >}}

```toml
[Snapshots]
Enabled = true
MaxSnapshots = 5
MaxFileSize = '10MB'       # KB, MB or GB
ExcludePatterns = ['dist', 'node_modules', '.env', '.pando']
AutoCleanupDays = 5
```

```bash
pando agent-vcs sessions              # list all sessions
pando agent-vcs log <session-id>      # commit log of a session
pando agent-vcs show <commit-id>      # commit details and diff
pando agent-vcs revert <commit-id>    # restore the working directory to that commit
pando agent-vcs compact --keep 20     # keep only recent sessions
pando agent-vcs compact --days 30     # remove sessions older than N days
```

`avcs` es un alias de `agent-vcs`. Antes de cada reversión se crea un commit de seguridad.

`Enabled` es `false` por defecto y es el interruptor de Agent-VCS: sin él no se registra ningún commit y la vista **Agent VCS** se queda vacía. Reinicia Pando después de cambiarlo. Se crea un commit al empezar la sesión (el baseline) y otro después de cada turno del agente. `MaxSnapshots` vale 100 por defecto.

Conceptos: los **commits** son instantáneas inmutables con un id derivado del contenido (SHA-256) que registran altas, cambios y bajas; los **árboles** son listados de ficheros sin duplicar, compartidos por los commits con los mismos ficheros; las **sesiones** son cadenas lineales de commits, una por conversación; los **diffs** son los cambios por fichero entre dos commits cualesquiera. En cada commit solo se guardan los ficheros modificados.
