---
title: "Pando Junio 2026: Delegación, Memoria y Revolución TUI"
date: 2026-06-28
tags: ["Lanzamiento", "Funcionalidades", "Resumen", "Delegación", "Memoria"]
---

Junio de 2026 trajo mejoras masivas al sistema de delegación, memoria persistente y Terminal UI de Pando. Aquí está todo lo que se implementó este mes.

## Delegación Multi-Proyecto

La funcionalidad principal: Pando ahora puede **delegar tareas a otras instancias en ejecución en diferentes proyectos**. La herramienta `mesnada_spawn_agent` incluye un parámetro `project` que enruta el trabajo a la instancia activa del proyecto correcto:

```json
{
  "prompt": "Analizar el módulo API",
  "project": "mi-proyecto-api",
  "background": true
}
```

Esto habilita flujos de trabajo entre proyectos donde un único orquestador despacha trabajo por todo tu ecosistema de desarrollo.

## Supervisor de Delegación

Los sub-agentes ahora pueden **enviar automáticamente eventos de finalización** al agente padre en tiempo real:

- **Inyectar en bucle activo**: Resultados inyectados mientras el padre está ejecutándose
- **Resucitar bucle inactivo**: El padre se despierta cuando las tareas se completan
- **Resurrección consciente de await**: El padre se reanuda solo cuando se cumplen las condiciones de join

¡No más polling!—el agente padre se notifica automáticamente.

## Sistema de Memoria Persistente

Un **sistema completo de memoria persistente** construido sobre el backend de la Base de Conocimiento:

- Herramienta **`remember`**: Almacena hechos con clave, scope, importancia, TTL
- Herramienta **`recall`**: Busca memorias por lenguaje natural
- Herramienta **`forget`**: Elimina memorias por clave
- **Inyección automática**: Las memorias relevantes se inyectan en el contexto
- **Expiración TTL**: Las memorias expiran después de un período configurable
- **Conteo de hits**: Las memorias frecuentemente recuperadas se mantienen vivas más tiempo

```toml
[Remembrances]
MemoryEnabled = true
MemoryContextMaxItems = 3
```

## Descubrimiento de Herramientas

Inspirado en VS Code Copilot, Pando ahora **administra grandes conjuntos de herramientas dinámicamente**:

- Herramientas core siempre visibles
- Herramientas MCP y Lua diferidas hasta ser necesarias
- Herramienta `tool_search` para descubrimiento bajo demanda
- Las herramientas descubiertas permanecen visibles para la sesión

```toml
[ToolDiscovery]
Enabled = true
Mode = 'auto'
MaxDirectTools = 64
```

## Agent-VCS

Reemplazó la funcionalidad de snapshot con un **sistema ligero de control de versiones** para cambios del agente:

```bash
pando agent-vcs sessions          # Listar sesiones
pando agent-vcs log <session>     # Mostrar log de commits
pando agent-vcs show <commit>     # Mostrar diff
pando agent-vcs revert <commit>   # Revertir a commit
pando agent-vcs compact --keep 20 # Mantener sesiones recientes
```

Commits inmutables, changelogs por sesión, diffs a nivel de archivo y capacidad de revertir.

## Ponytail (Modo YAGNI)

Un conjunto de instrucciones de **"desarrollador senior perezoso"** que aplica principios YAGNI:

```
/ponytail full     # Aplica stdlib primero, diff más corto
/ponytail ultra    # Extremista YAGNI: eliminación antes de adición
```

Hace que el agente escriba código más conciso, prefiera soluciones de la biblioteca estándar y cuestione la complejidad innecesaria.

## Integración MarkItDown

Convierte documentos ricos a Markdown para RAG:

- **PDF**, **DOCX**, **XLSX**, **PPTX**, **EPUB**, **CSV**, **HTML**
- Conversión automática durante sincronía de KB
- CLI: `pando convert documento.pdf`

Coloca documentos en un directorio monitoreado por KB y se indexan automáticamente.

## Preguntas Interactivas al Usuario

La herramienta `ask_user_question` permite a los agentes **hacer preguntas estructuradas y seleccionables** a mitad de una tarea:

- 1-4 preguntas por llamada
- Soporte de multi-selección
- Opción de texto libre "Otro"
- Diálogos interactivos TUI/Web UI
- Modo de texto formateado ACP

## Retroalimentación Rápida (Steering)

**Correcciones en tiempo real** mientras el agente se ejecuta:

- TUI: Escribe mensaje + Ctrl+S
- Web UI: Envía durante ejecución activa
- API: `POST /api/v1/sessions/:id/steer`

Los mensajes se inyectan en el siguiente límite seguro sin cancelar el progreso.

## Revolución TUI

Grandes mejoras en la Terminal UI:

### Pestañas de Espacio de Trabajo
Cambia entre Chat, Editor y Editor+Chat con **Alt+1/2/3**.

### Barra Lateral de Info del Chat
Panel derecho mostrando info de sesión, plan, archivos modificados y config LSP. Alterna con **Ctrl+Shift+B**.

### Temas
10+ temas incorporados con cambio instantáneo (**Ctrl+T**): dracula, gruvbox, tokyonight, catppuccin, monokai y más.

### Alternar Auto-Aprobar
**Shift+Tab** alterna el modo auto-aprobar para todos los permisos de herramientas.

### Selector de Archivos
El carácter **@** abre diálogo de completado de archivo (reemplaza el antiguo `/`).

### Estimación de Tokens en Tiempo Real
La barra de estado muestra el uso de contexto en vivo con advertencias al 80%+.

### Barra de Estado Mejorada
Ayuda clicable, breadcrumbs, insignia de proyecto, diagnósticos, nombre del modelo.

### Soporte de Ratón
Soporte completo de ratón en todos los componentes.

### Mejoras en Árbol de Archivos
Indicadores de estado Git, creación de nuevos archivos, carga lazy, búsqueda fuzzy.

### Terminal Integrada
**Ctrl+U** alternar, **Ctrl+Y** nueva pestaña, **Ctrl+Shift+Y** cambiar pestañas.

## Plantillas de Motores Personalizados

Define motores de agente personalizados con **plantillas YAML**:

```toml
[Mesnada.Orchestrator]
EnginesDir = ''   # por defecto directorio engines
```

Coloca archivos `*.template.yaml` para registrar motores personalizados dinámicamente.

## Instaladores Multi-Plataforma

Nuevos scripts de instalación para todas las plataformas:

```bash
# Linux
bash <(curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-linux.sh)

# Windows
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)

# macOS
# Descarga .app o .pkg desde GitHub Releases
```

Auto-detecta arquitectura, instala dependencias, configura PATH.

## Infraestructura

- Comando **DB Compact** para SQLite VACUUM con soporte IPC
- **Herramientas de memoria como servidor MCP** para acceso de agentes externos
- **Metadatos front-matter en KB** con tags y orden cronológico
- **Búsqueda fuzzy por tags** en Base de Conocimiento
- **Notarización de Apple** para firmado de app macOS
- **Botón de prueba de conexión Ollama** en herramientas de remembrances
- **Activación automática de LSP** según el idioma del archivo editado
- **Formato de salida preferido** (TOON > TOML > JSON)

## Qué Viene

Julio trae más mejoras en delegación, funcionalidades avanzadas de memoria e integraciones mejoradas con editores. La base establecida en mayo y junio habilita flujos de trabajo autónomos cada vez más poderosos.

---

*Pando es open source y está en desarrollo activo. Pruébalo en [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
