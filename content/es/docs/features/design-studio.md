---
title: Design Studio
weight: 6
---

Pando Designer convierte al agente en diseñador. Describes lo que quieres —una landing, un panel de control, una presentación— y Pando construye un artefacto HTML/CSS real, lo renderiza, lo captura, critica su propio trabajo e itera hasta alcanzar el nivel de calidad exigido.

El Design Studio está **siempre activo**. No hay ninguna opción que activar.

## Qué obtienes

- **Archivos reales, en tu repositorio.** Un artefacto es un directorio de tu árbol de trabajo (`designer/<slug>/` por defecto) con `index.html`, sus recursos y un pequeño manifiesto. Es commiteable, editable con cualquier herramienta y revisable en un pull request.
- **Vista previa en todas partes.** La previsualización se abre sola cuando el agente crea un artefacto: una pestaña del navegador desde la TUI, la página Design en la WebUI, una ventana nativa en la aplicación de escritorio y un enlace pulsable dentro de Zed/VS Code vía ACP.
- **Recarga en vivo.** Cada vez que el agente modifica el diseño, la vista previa abierta se refresca sola. Ves cómo se construye el diseño.
- **Versiones a las que volver.** Cada iteración aceptada es una versión: puedes listar el histórico, comparar y recuperar una anterior.
- **Un sistema de diseño compartido.** Colores, tipografía, espaciados y radios viven en un único sitio y todos los artefactos enlazan con él, así que todos tus diseños parecen el mismo producto.
- **Exportación.** HTML (autocontenido), PNG y PDF.

## Empezar

Basta con pedirlo, desde cualquier interfaz (TUI, WebUI, escritorio, Zed):

```
Diseña una landing para mi herramienta CLI, en oscuro, orientada a
desarrolladores, con hero, tres tarjetas de características y tabla de precios.
```

Pando crea el artefacto, abre la vista previa y empieza a iterar. Sigue hablándole:

```
El hero está demasiado cargado; simplifícalo y sube el contraste de los botones.
```

Para que el directorio exista antes de empezar (y poder commitearlo primero):

```bash
pando design create "Landing page"
pando design create "Revisión Q3" --skill deck-basic
```

## Tipos de artefacto

| Tipo | Para |
|------|------|
| `web` | Páginas web y prototipos: landings, paneles, sitios de marketing |
| `deck` | Presentaciones, con estilos de impresión para que el PDF pagine correctamente |

## Plantillas y referencias de oficio

Pando incluye plantillas de diseño desde las que partir y referencias de oficio que el agente lee mientras diseña (tipografía, color, layout y una guía «anti-AI-slop» que evita que el resultado parezca genérico).

```bash
pando design skills              # lista plantillas y referencias
pando design skills show deck-basic
```

Plantillas incluidas: `landing-page`, `web-prototype`, `dashboard-page`, `deck-basic`, `magazine-deck` y `design-system-extract` (un flujo de trabajo, no un andamiaje).

En la WebUI, la página Design tiene una galería con un botón **Try it** y un prompt inicial por plantilla.

## El sistema de diseño

Un único conjunto de tokens para todo el proyecto, en `designer/_system/`: `tokens.json` (la fuente de verdad), `system.css` (generado) y `DESIGN.md`, el contrato escrito que el agente debe respetar.

```bash
pando design system init        # escribe el sistema por defecto si no existe
pando design system show        # imprime los tokens actuales
pando design system examples    # lista las guías de estilo incluidas
```

### Extraer un sistema de algo que ya se ve bien

En lugar de inventarse una estética, apunta a una que ya exista:

```bash
# De las hojas de estilo y componentes de tu propio código
pando design system extract --from code

# De una página en vivo
pando design system extract https://example.com --from url

# De una captura o un logo (solo colores)
pando design system extract ./marca.png --from image

# De una guía de estilo escrita, o de un ejemplo incluido
pando design system extract ./guia-marca.md --from text
```

Añade `--dry-run` para ver qué se extraería sin escribir nada. La prosa que hayas escrito en `DESIGN.md` siempre se conserva.

### Aplicarlo a un artefacto existente

```bash
pando design system apply landing
```

Enlaza el sistema en el artefacto e informa de cada color o tamaño hardcodeado que debería haber sido un token.

## Puerta de calidad (bucle crítico)

Tras cada iteración, una pasada crítica puntúa el artefacto contra reglas automáticas: contraste y accesibilidad, consistencia de espaciados, escala tipográfica, uso de tokens y patrones genéricos «de IA». Si la nota está por debajo del umbral, el diseñador vuelve a iterar.

```bash
pando design critique landing
```

Configura los límites:

```toml
[Design.Critique]
Enabled   = true
MaxRounds = 3        # iteraciones diseñador/crítico por encargo
Threshold = 8.0      # nota a superar, sobre 10
Policy    = 'standard'
```

Ambos roles usan el modelo que tengas seleccionado como coder: el crítico se diferencia por el prompt, no por el modelo, así que no hay un segundo proveedor que configurar.

## Desde la terminal

```bash
pando design list                              # todos los artefactos del proyecto
pando design open                              # abre el más reciente
pando design open revision-trimestral --slide 3
pando design versions landing                  # histórico de versiones
pando design versions landing --json           # para scripting

pando design export landing --format html --out /tmp/landing.html
pando design export deck --format pdf --landscape
pando design export landing --format png --full-page
```

`pando design open` levanta un servidor de vista previa local y lo mantiene vivo hasta que pulsas Ctrl+C. Usa `--no-wait` para abrir el archivo directamente y volver de inmediato (en ese modo no hay recursos relativos ni selección de elementos).

## Configuración

```toml
[Design]
OutputDir   = 'designer'   # directorio del proyecto con los artefactos
SystemDir   = '_system'    # subdirectorio con el sistema de diseño
DefaultKind = 'web'        # 'web' o 'deck'

[Design.Critique]
Enabled   = true
MaxRounds = 3
Threshold = 8.0
Policy    = 'standard'
```

## Compartir una vista previa

Las vistas previas las sirve el mismo servidor que la WebUI, así que se aplica el [acceso externo](../webui-access): actívalo en el pie de la WebUI y la URL de la vista previa será accesible desde tu móvil u otra máquina de la red. La autenticación básica se aplica automáticamente en ese momento.

## Exponer las herramientas de diseño a otros agentes

Las herramientas `design_*` se pueden publicar por el servidor MCP de Pando, para que otro agente cree e itere diseños a través de Pando:

```toml
[MCPServer.Design]
Enabled = true
```

Desactivado por defecto. El Design Studio funciona igualmente: esta opción solo controla la exposición por MCP.

{{< callout >}}
Los artefactos viven en tu árbol de trabajo, así que quedan versionados dos veces: por el histórico propio de Pando y por tu flujo de git habitual. No se esconde nada dentro de `.pando/`.
{{< /callout >}}
