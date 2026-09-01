---
title: "Pando Agosto 2026: Design Studio, control del escritorio y extensiones"
date: 2026-08-31
tags: ["Release", "Features", "Roundup", "Design", "Automatización de escritorio", "Extensiones", "Copilot"]
---

Agosto ha ido de darle manos y ojos a Pando. Han aterrizado dos capacidades grandes —un **Design Studio** completo y un **Controlador de Escritorio** que maneja aplicaciones reales en tu pantalla—, además de un sistema de extensiones para distribuir módulos privados y una larga lista de mejoras en la Web UI.

## Pando Designer

Pando ya diseña. Describes una landing, un panel o una presentación, y construye un artefacto HTML/CSS real, lo renderiza en un navegador headless, mira el resultado, critica su propio trabajo e itera.

Lo que importa en el día a día:

- **La vista previa se abre sola.** Pides un diseño y aparece la previsualización: una pestaña del navegador desde la terminal, la página Design en la Web UI, una ventana nativa en la aplicación de escritorio, un enlace pulsable dentro de Zed o VS Code.
- **Se recarga en vivo.** Cada cambio del agente refresca la vista previa abierta. Ves cómo se construye el diseño en lugar de ir pidiendo capturas.
- **Los archivos son tuyos.** Un artefacto es un directorio de tu árbol de trabajo (`designer/<slug>/`), commiteable y editable con cualquier herramienta. No se esconde nada dentro de `.pando/`.
- **Versiones.** Cada iteración aceptada es una versión que puedes listar, comparar y recuperar.
- **Un sistema de diseño compartido.** Colores, tipografía, espaciados y radios en un único sitio, enlazados por todos los artefactos: todo parece el mismo producto.

Y el sistema de diseño tampoco hay que inventárselo. Apunta a algo que ya se vea bien:

```bash
pando design system extract --from code            # tus propias hojas de estilo
pando design system extract https://example.com --from url
pando design system extract ./marca.png --from image
pando design system extract ./guia-marca.md --from text
```

Vienen plantillas de partida (`landing-page`, `dashboard-page`, `web-prototype`, `deck-basic`, `magazine-deck`), referencias de oficio que el agente lee mientras diseña —tipografía, color, layout y una guía «anti-AI-slop» que evita el resultado genérico— y una puerta de calidad que puntúa contraste, espaciados, escala tipográfica y uso de tokens antes de dar el trabajo por bueno.

Desde la terminal:

```bash
pando design list
pando design open revision-trimestral --slide 3
pando design export landing --format pdf
```

El Design Studio está **siempre activo**: no hay nada que habilitar. Todos los detalles en [Design Studio](/es/docs/features/design-studio).

## Controlador de Escritorio

Pando ya puede operar tu escritorio: listar aplicaciones abiertas, leer lo que hay en pantalla, pulsar, escribir, enviar teclas, hacer scroll y capturar — en Windows, macOS y Linux (X11 y Wayland).

Lo interesante es el cómo. La mayoría de agentes que «usan un ordenador» hacen una captura y piden a un modelo de visión que adivine coordenadas. Pando lee el **árbol de accesibilidad**, la misma descripción semántica que usan los lectores de pantalla, así que trabaja con elementos reales («el botón Guardar»), no con píxeles. Eso es drásticamente más barato en tokens y mucho más fiable: las acciones no fallan porque una ventana se haya movido o un diálogo se haya animado. Las capturas quedan como recurso para interfaces sin estructura aprovechable, y todo lo obtenido así viene marcado como tal.

Si hay una sesión de navegador abierta, aparece como una aplicación más, de modo que un flujo puede cruzar libremente entre una página web y un diálogo nativo «Guardar como».

Está **desactivado por defecto**:

```toml
[InternalTools]
DesktopEnabled     = true
DesktopAllowedApps = ["Firefox"]     # acótalo
DesktopDeniedApps  = ["1Password"]   # denegar siempre gana
```

Leer es gratis; todo lo que pulsa, escribe o captura la pantalla te pide permiso antes. Lee la página del [Controlador de Escritorio](/es/docs/features/desktop-controller) —en especial la sección de seguridad— antes de activarlo.

## Extensiones

Pando tiene ya un sistema formal de extensiones: módulos opcionales compilados dentro del binario que pueden añadir herramientas, rutas HTTP, paneles de interfaz y comportamiento de memoria. Es la vía por la que llegan capacidades privadas y empresariales sin bifurcar Pando.

La mayoría no las necesitará —un servidor MCP, un hook Lua o una skill suele ser la respuesta más barata, y hay una [tabla de decisión](/es/docs/features/extensions) que dice cuál—, pero cuando algo tiene que llegar de verdad al núcleo de Pando, o viajar como un único ejecutable, ahora existe un camino soportado.

```bash
pando extensions list      # qué contiene este binario y qué ha cargado
pando --version            # v0.9.1 (enterprise)
```

Las compilaciones estándar no cambian.

## Un único interruptor para las herramientas MCP

Tool Discovery y la pasarela MCP eran dos mecanismos paralelos, con sus propias herramientas y sus propios interruptores. Ahora son uno: `ToolDiscovery.Enabled`.

Con él activo, tus herramientas MCP favoritas siguen visibles directamente y todo lo demás —tengas los servidores que tengas conectados— se queda fuera de la ventana de contexto y se alcanza vía `tool_search`, que ahora además de buscar también *ejecuta*, incluidas las herramientas MCP. Conecta una docena de servidores sin pagar su catálogo completo en cada mensaje.

## Esfuerzo de razonamiento, por modelo

Los modelos no se ponen de acuerdo sobre el dial de «cuánto debo pensar»: unos solo aceptan `high`, otros solo `low` y `high`, otros nada. Pando sabe ahora qué soporta realmente el modelo seleccionado, te ofrece solo esos valores, ajusta lo que quede fuera de rango y elige un valor por defecto sensato en lugar de fallar a mitad de tarea. Los selectores ACP de Zed, VS Code y JetBrains se reconstruyen al cambiar de modelo. Ver [Razonamiento y esfuerzo de pensamiento](/es/docs/features/reasoning-modes).

## GitHub Copilot: modelos BYOK de organización

Si tu organización añadió sus propios modelos a Copilot mediante BYOK —OpenRouter, Gemini u otros enrutados por GitHub—, ahora aparecen en el selector de modelos de Pando igual que en VS Code. En un asiento Business eso suele significar veinte modelos extra o más. No hay nada que configurar: inicia sesión con normalidad.

## Acceso externo sin reiniciar

El pie de la Web UI tiene ahora un interruptor de **acceso externo**. Lo activas y la instancia en marcha pasa a ser accesible desde tu móvil u otra máquina: sin reinicio, sin `--host 0.0.0.0` y con varios clientes a la vez. Funciona en `pando serve`, `pando app` y la aplicación de escritorio. La autenticación básica se aplica en el mismo instante, así que no hay ninguna ventana con la instancia abierta y desprotegida.

## Enriquecimiento de contexto como agente

El enriquecimiento de contexto puede ejecutarse ahora como un pequeño agente dedicado que busca de forma iterativa en la memoria, la base de conocimiento, los eventos pasados y el índice de código hasta tener lo que necesita, en lugar de una única ronda de búsquedas. Usa su propio modelo barato, aparece como sesión hija que puedes abrir e inspeccionar, te cuenta en el chat qué está haciendo y cuánto ha añadido, y cae al enriquecimiento clásico si vuelve vacío.

Por defecto solo se ejecuta en el primer mensaje de la sesión, que es donde aporta valor.

```toml
[Remembrances]
ContextEnrichmentAgentLoopEnabled = true
```

## Web UI

- **Página Design**, con galería de plantillas y vista previa en vivo.
- **Las sesiones se cargan progresivamente** al hacer scroll: un histórico largo ya no ralentiza la apertura.
- **Las sesiones y chats de otras instancias de Pando** en marcha vuelven a listarse.
- **El directorio de trabajo** está siempre visible en el panel de información del chat.
- El panel de **archivos modificados** funciona con todos los proveedores, no solo con los de streaming.
- El **seguimiento de cambios** muestra el diff real de la sesión en lugar de contar todo el repositorio.
- **Explorador de carpetas** para la base de conocimiento y **selector de modelo de embeddings** por proveedor en los ajustes de Remembrances.
- **Las preguntas del agente sobreviven a una reconexión**: recarga la página y la pregunta pendiente sigue ahí.
- Los enlaces externos del chat se abren en una ventana nueva en lugar de reemplazar la aplicación.

## También en agosto

- **Personas en AG-UI**: `pando agui-serve --persona <nombre>` aplica una persona a cada run, para que un frontend de Generative UI tenga un asistente con voz consistente.
- **Las instalaciones nuevas se comportan**: sin proveedores fantasma ni modelos por defecto hardcodeados — se usa el primer proveedor y modelo que configures.
- **Aplicación de escritorio en macOS**: copiar y pegar funcionan desde el menú de la aplicación; corregidos problemas de arranque y refresco.
- **TOON 4.1**: el formato compacto de salida estructurada de Pando se ha puesto al día con la especificación actual, incluidos grupos de campos anidados y tablas con clave — la misma salida compacta, capaz de representar más cosas.
- Endurecimiento de seguridad y dependencias en todo el proyecto, más la ronda habitual de arreglos de CI.

## Qué viene

Más validación en vivo del Controlador de Escritorio en Windows y macOS, más tipos de artefacto de diseño y trabajo continuado sobre la superficie de extensiones.

---

*Pando es código abierto y está en desarrollo activo. Pruébalo en [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
