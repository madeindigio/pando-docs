# Pando Docs 1.x — «Bajo la superficie» · Brief de implementación

Brief para Claude Code. Explica cómo pasar el diseño de `design/` a la template Hugo de `pando-docs`.

## Qué contiene `design/`

Son archivos `.dc.html` exportados de un lienzo de diseño. Cada uno es una página: HTML con estilos inline, plantillas `{{hole}}`, bucles `<sc-for>` y condiciones `<sc-if>`. La lógica está en el `<script type="text/x-dc">` final.

**No son páginas que se puedan servir tal cual.** Úsalos como especificación exacta de marcado, estilos, textos y comportamiento, y reescríbelos como layouts y partials de Hugo.

| Archivo | Qué es |
|---|---|
| `Main.dc.html` | Portada (light por defecto; prop `theme` = `dark`) |
| `Guides.dc.html` | Índice de guías: filtro por recorrido y textos EN/ES |
| `Guide.dc.html` | Página de una guía con vídeo, capítulos, pasos escritos, sidebar y TOC (EN/ES) |
| `Moodboard.dc.html` | Dirección visual: paleta, tipografía y principios |
| `MainDark` / `GuideDark` | Envoltorios que importan la página con `theme="dark"`; son solo referencia visual |

## Concepto

La web es un corte transversal del bosque Pando: arriba está lo que ves y abajo lo que trabaja. Al hacer scroll se baja por las raíces, y cuanto más abajo, más oscuro.

- **Estratos:**
  - 表 I Superficie (0 m)
  - 根 II Raíces (−1 m), con los pilares 木 Pando, 本 Remembrances y 众 Mesnada
  - 土 III Suelo (−3 m)
- **Filosofía oriental:** 万物流転 («todo fluye») en vertical. Líneas doradas que fluyen por las raíces con un `stroke-dashoffset` animado y lento.

## Tokens (CSS custom properties)

```css
:root, [data-theme="light"] {
  --bg:#F4F1E8; --bg2:#FBF9F3; --soil:#E9E2D0; --ink:#0F2A20; --ink2:#41554A;
  --line:rgba(15,42,32,.14); --acc:#8F6310; /* texto oro AA */ --node:#C68A17; /* solo marcas */
  --deep:#0F2A20; --deepInk:#F4F1E8; --deepInk2:#B7C3BA; --deepLine:rgba(244,241,232,.16);
  --gold:#E9B949; --card:#FFFDF7;
}
[data-theme="dark"] {
  --bg:#0B1F17; --bg2:#0F261C; --soil:#07140E; --ink:#F4F1E8; --ink2:#AFBCB3;
  --line:rgba(244,241,232,.13); --acc:#E9B949; --node:#E9B949; --deep:#050F0A;
  --deepLine:rgba(244,241,232,.12); --card:#122C21;
}
```

- **Tipografía:**
  - Space Grotesk (400–700) para titulares y cuerpo.
  - JetBrains Mono (400/500) para código, etiquetas y profundidades.
  - Shippori Mincho (500/700) para los kanji, con Noto Serif SC de respaldo para 众.
  - Mejor autoalojadas que servidas desde Google Fonts.
- **Radios:** 12 (botones), 14–16 (código), 22–24 (tarjetas), 28–32 (bloques destacados), 999 (chips).
- **Contenedor:** `max-width:1280px; padding-inline:40px` (16px en móvil). El breakpoint móvil está en 900px.

## Arquitectura Hugo propuesta

```
layouts/
  index.html                 ← portada (Main.dc.html)
  _default/baseof.html       ← <html data-theme>, fuentes, script anti-flash del tema
  partials/
    header.html              ← logo 木 + nav + búsqueda ⌘K + selector idioma + toggle tema + GitHub
    footer.html
    svg/mark-pando.html | mark-remembrances.html | mark-mesnada.html
    svg/grove.html           ← arboleda + red de raíces del hero
    home/hero.html | depth-index.html | surface.html | roots.html | soil.html | guides-teaser.html | install.html
  guides/list.html           ← Guides.dc.html
  guides/single.html         ← Guide.dc.html
  docs/single.html           ← mismo layout de 3 columnas que la guía, sin bloque de vídeo
data/features.yaml           ← las 38 funcionalidades con su estrato y grupo
i18n/en.yaml, i18n/es.yaml   ← cadenas de interfaz
assets/css/pando.css         ← tokens + componentes (.chip, .ibtn, .flow, .kanji, .mono…)
```

### Idiomas

Usa el multilingüe nativo de Hugo (`languages.en`, `languages.es`, con `contentDir` por idioma o sufijos `.es.md`). El selector de idioma enlaza a `.Translations`, la versión de la misma página en el otro idioma.

### Front matter de una guía

```yaml
title: "Your first session with Pando"
track: surface        # surface | roots | soil  → kanji 表 / 根 / 土 y color de miniatura
level: beginner       # beginner | intermediate | advanced
weight: 2
video: { provider: youtube, id: "XXXX", subtitles: [en, es] }
chapters: [ {t: "00:00", title: "Install"}, ... ]
```

- Los pasos escritos son el cuerpo Markdown (cada `##` es un paso).
- El callout «Under the surface / Bajo la superficie» va como shortcode: `{{</* under-surface */>}}…{{</* /under-surface */>}}`.
- Las capturas usan otro shortcode: `{{</* shot src="…" alt="…" */>}}`.
- El índice de guías agrupa por `track`. El filtro por recorrido se hace con JS mínimo (atributos `data-track` y `aria-pressed`).

### Funcionalidades (`data/features.yaml`)

- **Superficie (12):** CLI, Terminal UI, TUI Enhancements, Web‑UI & PWA, WebUI Access, Native Desktop App, Design Studio, Slash Commands, Interactive User Questions, Fast User Feedback, Learning Mode, Caveman Mode.
- **Raíces (11):**
  - Pando: Goal Mode, Tool Discovery, Thinking & Reasoning Effort, Superpowers Mode.
  - Remembrances: Persistent Memory System, Context Enrichment, Session Compaction, Agent‑VCS.
  - Mesnada: Agent Delegation & Orchestration, Agent Self‑Service, Self‑Improvement System.
- **Suelo (15):**
  - Modelos: Local LLM Proxy, GitHub Copilot Auth.
  - Protocolos: MCP Server Authentication, LSP Auto‑Activation, Inter‑Process Communication.
  - Manos: Browser Automation, Desktop Controller, Document Conversion.
  - Extender: Extensions, Ponytail Skill.
  - Confianza: Auto HTTPS Certificates.
  - Operación: Self‑Update, Cross‑Platform Installers, Database Compact, Configuration File Discovery.

Cada entrada lleva su `slug` hacia la página de `docs/features/`. Los chips de la portada se generan desde este archivo.

### Tema

- Light es el modo por defecto. Si no hay preferencia guardada, se respeta `prefers-color-scheme`.
- La preferencia se guarda en `localStorage`, siempre dentro de `try/catch`.
- Para evitar el destello de tema incorrecto, pon un script inline en `<head>` que fije `data-theme` antes del primer pintado.
- El botón del tema lleva `aria-label`.

### Animación y accesibilidad

- `.flow { stroke-dasharray:3 15; animation:flow 3.6s linear infinite }` y `.breathe` (opacidad, 4.5 s).
- Ambas se desactivan con `prefers-reduced-motion`.
- Los SVG decorativos llevan `aria-hidden`. El SVG del hero lleva `role="img"` y `aria-label`.
- Usa `<button>` y `<a>` reales, con objetivos táctiles de al menos 44px.
- Contraste: en light, el oro como texto siempre es `#8F6310`; `#C68A17` es solo para nodos.

## Pendiente antes de producción

1. Sustituir las marcas 木 本 众 dibujadas a mano por los SVG oficiales de `assets/pando-brand-v1` (repo `digiogithub/pando`).
2. Sustituir los huecos `[ SCREENSHOT · … ]` por capturas reales de Pando Desktop/Web 1.x.
3. Revisar los títulos de las guías propuestas y el texto de los pasos 3–5 de la guía de ejemplo.
4. Pestañas Go / Binaries / From source del bloque de instalación: definir el contenido de cada una.
5. Búsqueda ⌘K: elegir motor (Pagefind encaja bien con Hugo).
