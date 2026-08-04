---
title: "Pando Julio 2026: Inteligencia de Tokens, Nuevos Modos y MCP Empresarial"
date: 2026-07-31
tags: ["Release", "Features", "Roundup", "Token Optimization", "lean-ctx", "RTK"]
---

Julio 2026 fue el mes más grande de Pando para la optimización de tokens y la inteligencia de flujos de trabajo. La integración de lean-ctx completó todas las fases, llegaron nuevos modos de sesión, y la autenticación MCP alcanzó madurez empresarial.

## Optimización de Tokens (Integración lean-ctx)

La característica principal: un **sistema completo de Optimización de Tokens** que reduce 50-90% los tokens en lecturas de archivos y salida de shell, con cada optimización siendo aditiva y a prueba de fallos.

### Modos de Lectura Inteligentes

La herramienta `view` ahora soporta cuatro modos de lectura:

| Modo | Qué muestra | Ahorro de tokens |
|------|-------------|------------------|
| **Completo** (por defecto) | Contenido raw del archivo, idéntico a antes | Ninguno — comportamiento estándar |
| **Auto** | Elige automáticamente el mejor modo según tamaño/tipo | 50-90% en archivos grandes |
| **Firmas** | Solo nombres de funciones/clases y sus firmas | ~75-90% en archivos fuente grandes |
| **Mapa** | Imports y declaraciones de nivel superior | ~60-80% para vista estructural |

Cada modo preserva números de línea para saltar al contenido completo con `offset`/`limit`.

### Deduplicación por Hash de Contenido

Releer una sección de archivo sin cambios ahora colapsa a una referencia de ~15 tokens en lugar de reenviar el contenido completo. Activado por defecto — sin configuración necesaria.

### Rastreador de Rebotes

En modo Auto, Pando observa "rebotes" — casos donde una lectura comprimida no dio suficiente detalle a la IA y releyó inmediatamente en completo. Archivos y extensiones que rebotan frecuentemente se escalan automáticamente a lecturas más completas.

### Grafo de Propiedades del Código

El índice de símbolos ahora rastrea relaciones entre archivos — imports, llamadas a funciones y referencias. Dos nuevas herramientas potencian esto:

- **`code_impact_analysis`**: "¿Qué se rompe si cambio este símbolo?"
- **`code_related_files`**: "¿Qué archivos se relacionan con este?"

Actualmente soporta extracción de aristas para Go, TypeScript y JavaScript.

### Registro de Ahorros

Cada evento de reducción de tokens se rastrea en un ledger JSONL. Consulta tus ahorros con:

```bash
pando gain                    # resumen acumulado
pando gain --days 30          # últimos 30 días
pando gain --price 3          # ahorro estimado en USD
pando gain --json             # para scripts
```

La herramienta MCP `pando_stats` da acceso a datos de ahorro a los agentes durante conversaciones.

### Ajustes de Optimización de Tokens

Todos los ajustes están unificados en **Ajustes > Optimización de Tokens** (WebUI/TUI) o `[TokenOptimization]` en TOML:

```toml
[TokenOptimization]
ReadModeDefault = "full"       # "full", "auto", "signatures", "map"
ReadDedupDisabled = false       # dedup por hash (por defecto: activo)
ReadModeLearning = false        # aprendizaje estadístico de rebotes
BuildCodeGraph = true           # grafo de relaciones
RelatedFilesHint = false        # archivos relacionados en resultados
SavingsLedgerDisabled = false   # seguimiento de ahorros
```

## Modo Caveman (Brevidad de Salida)

Un nuevo **modo de ahorro de tokens** que corta relleno, repeticiones y prosa innecesaria mientras preserva código, comandos, errores y resultados de verificación.

```bash
/caveman lite     # quitar relleno, mantener oraciones normales
/caveman full     # fragmentos y viñetas, una idea por línea
/caveman ultra    # máxima compresión
/caveman off      # desactivar
```

Configura un valor por defecto:

```toml
[Caveman]
DefaultMode = "lite"
```

Caveman se compone con otros modos — puedes usarlo junto con superpowers o learning mode.

## Modo Superpowers (Desarrollo con Specs)

Una **disciplina de flujo de trabajo** opt-in que enforce desarrollo estructurado:

```bash
/superpowers                    # activar
/superpowers Fix login bug      # activar con objetivo
/superpowers-finish             # verificar y cerrar
```

Cuando está activo, cada turno sigue: entender → diseño + aprobación → plan escrito → implementación test-first → verificación → auto-revisión.

Garantías de seguridad: nunca hace commit, merge, push, o toca la config de git.

## Modo Learning (Aprendizaje)

Una **política de captura de conocimiento** opt-in que asegura continuidad entre sesiones:

```bash
/learning auth system changes   # activar con enfoque
/learning-finish                # consolidar y cerrar
```

Cuando está activo, Pando:
1. Busca en el KB por contexto previo antes de trabajar
2. Pregunta al usuario por decisiones genuinas en lugar de adivinar
3. Documenta descubrimientos en la base de conocimiento
4. Marca docs obsoletos como outdated

## Auto-Servicio del Agente (`pando_setup`)

Una nueva herramienta interna que da a los agentes **su propio panel de control**:

- `config` — leer configuración (solo lectura, secretos enmascarados)
- `providers` — listar cuentas de proveedores configuradas
- `models` — navegar modelos disponibles con precios de models.dev
- `session` — verificar uso de tokens y coste
- `commands` — listar y activar slash commands

La herramienta siempre está disponible y cuesta tokens mínimos — descubre detalle bajo demanda a través de `help`.

## Autenticación de Servidores MCP

Soporte completo de **OAuth 2.1 + mTLS** para autenticar con servidores MCP:

### Tipos de Auth
- **Bearer token** — API keys estáticas
- **Basic auth** — usuario + contraseña
- **OAuth 2.1** — login basado en navegador
- **Client credentials** — servidor a servidor, sin interacción de usuario

### mTLS Empresarial

```toml
[McpServers.Auth]
Type = "oauth_client_credentials"
ClientCert = "/ruta/a/client.crt"
ClientKey = "/ruta/a/client.key"
CACert = "/ruta/a/ca-interno.crt"
TLSServerName = "mcp-interno.corp.com"
MinTLSVersion = "1.2"
```

Soporta claves PKCS#8 cifradas, confianza CA personalizada, fijación de hostname y restricciones de versión TLS.

### Gestión CLI

```bash
pando mcp list              # estados de servidores
pando mcp login mi-servidor # login OAuth (abre navegador)
pando mcp status mi-servidor # verificar estado de auth
pando mcp logout mi-servidor # limpiar tokens
```

## Auto-Activación LSP

Pando ahora **detecta automáticamente el lenguaje de los archivos** y arranca el servidor LSP correspondiente:

- 22 presets de lenguajes integrados (Go, TypeScript, Python, Rust, C/C++, Java, etc.)
- Activación bajo demanda al abrir un archivo
- Opción de autostart para lenguajes frecuentes
- Observador de archivos del workspace para inicio automático

```toml
LSPAutoActivate = true

[LSP.gopls]
Autostart = false  # iniciar solo al abrir archivos .go

[LSP.pyright]
Autostart = true   # arrancar al inicio
```

## Descubrimiento de Configuración

Pando ahora **busca hacia arriba** `.pando.toml` — coloca tu config en la raíz de un repo y todos los subdirectorios la heredan automáticamente.

## Mejoras en WebUI

- **Terminal real** con xterm.js — interacción completa de shell con zsh, colores ANSI, historial
- **Barra lateral de info del chat** — detalles de sesión, archivos modificados, info del repo (como el TUI)
- **Autenticación básica** — protege tu instancia al vincular a IPs externas

## Integración con models.dev

El diálogo de selección de modelos ahora muestra metadatos enriquecidos de [models.dev](https://models.dev):

- Tamaño de ventana de contexto
- Precios por millón de tokens
- Capacidades (razonamiento, soporte de imágenes)
- Fecha de corte de conocimiento

## Infraestructura

- **Wiki Links del KB** — documentos pueden enlazarse entre sí con `[[wiki-links]]`, formando un grafo navegable
- **mTLS MCP para empresas** — certificados de cliente, claves cifradas, confianca CA personalizada
- **Modo Vulnerability Hunter** — comandos de auditoría de seguridad basados en VulnHunter de Capital One
- **OAuth MCP personalizado** — lógica OAuth configurable con TOML y funciones Lua
- **Protocolo UI-AI** — comunicación estructurada entre UI y agente
- **Hermes Kanban** — coordinación de subagentes con patrones de tablero y enjambre

## Qué Viene

Agosto trae la fase final de lean-ctx (compactación de transcripción y briefs de sesión), más soporte de lenguajes para el grafo de código, y mejoras continuas en el ecosistema MCP.

---

*Pando es open source y está en desarrollo activo. Pruébalo en [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
