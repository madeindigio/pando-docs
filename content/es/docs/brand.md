---
title: Marca e identidad
weight: 6
---

La identidad visual v1 de Pando: el símbolo, la paleta, la tipografía y dónde aparece cada uno en la aplicación. Esta página es para quien escriba documentación, prepare una captura de pantalla, contribuya con un cambio de interfaz, o empaquete Pando para una nueva plataforma y necesite el recurso correcto.

## El símbolo — 木

La marca es 木, el carácter chino/japonés para "árbol": dos trazos curvos sobre un tronco, más tres pequeños nodos de circuito entrelazados en las ramas. La idea detrás — **una raíz, muchos agentes** — es literal: una sola instancia de Pando, muchos subagentes ramificándose desde ella.

Los trazos son monolínea (grosor constante, extremos y uniones redondeados) para que la marca se mantenga legible desde un favicon de 16px hasta un lockup de logotipo completo.

## Paleta

| Muestra | Nombre | Hex | Uso |
|---|---|---|---|
| <span style="display:inline-block;width:1.1em;height:1.1em;border-radius:4px;background:#0F2A20;vertical-align:middle;border:1px solid rgba(128,128,128,.35)"></span> | Bosque | `#0F2A20` | Fondo de marca / tinta — el verde oscuro sobre el que se apoya cada marca, y el color del trazo sobre fondos claros |
| <span style="display:inline-block;width:1.1em;height:1.1em;border-radius:4px;background:#F4F1E8;vertical-align:middle;border:1px solid rgba(128,128,128,.35)"></span> | Marfil | `#F4F1E8` | El color del trazo sobre fondos oscuros — blanco cálido, nunca blanco puro |
| <span style="display:inline-block;width:1.1em;height:1.1em;border-radius:4px;background:#E9B949;vertical-align:middle;border:1px solid rgba(128,128,128,.35)"></span> | Álamo | `#E9B949` | Acento — los nodos de circuito y resaltados **solo sobre fondos oscuros** |
| <span style="display:inline-block;width:1.1em;height:1.1em;border-radius:4px;background:#C68A17;vertical-align:middle;border:1px solid rgba(128,128,128,.35)"></span> | Álamo oscuro | `#C68A17` | Acento — nodos y marcas pequeñas **solo sobre fondos claros** |

{{< callout type="warning" >}}
**Álamo oscuro es para marcas, no para texto.** `#C68A17` sobre Marfil o blanco da un contraste de ~2,6:1 — no pasa WCAG AA para cuerpo de texto, etiquetas o botones. Úsalo solo para los puntos de los nodos de circuito y pequeños acentos de marca. Cuando el WebUI necesita un color de acento accesible para texto y controles en modo claro, calcula en su lugar un `#8f6310` más oscuro — ver [Dónde aparece la marca en Pando](#dónde-aparece-la-marca-en-pando) más abajo.
{{< /callout >}}

## Tipografía

- **Space Grotesk**, pesos 500–600, para el logotipo y los titulares. En los ficheros del logo el logotipo ya está convertido a trazados, así que se renderiza correctamente incluso donde la fuente no está instalada.
- **JetBrains Mono** para la TUI, ejemplos de código y cualquier etiqueta monoespaciada.

## La familia de símbolos

La marca de Pando es la raíz de una pequeña familia. Cada sección mantiene el mismo sistema — trazos monolínea en Marfil o Bosque, nodos de circuito con el color de acento — con su propio carácter representando lo que hace esa sección:

| Sección | Carácter | Idea | Marca (fondo claro / fondo oscuro) |
|---|---|---|---|
| **Pando** | 木 — árbol | Una raíz, muchos troncos | <img src="/images/brand/pando-mark-dark.svg" alt="Marca Pando" class="brand-logo-light-only" width="28" height="30" /><img src="/images/brand/pando-mark-light.svg" alt="Marca Pando" class="brand-logo-dark-only" width="28" height="30" /> |
| **Remembrances** | 本 — raíz / libro | El trazo dorado en la raíz es la memoria guardada | <img src="/images/brand/remembrances-mark-dark.svg" alt="Marca Remembrances" class="brand-logo-light-only" width="28" height="28" /><img src="/images/brand/remembrances-mark-light.svg" alt="Marca Remembrances" class="brand-logo-dark-only" width="28" height="28" /> |
| **Mesnada** | 众 — multitud / séquito | El señor como nodo macizo, su mesnada como el anillo a su alrededor | <img src="/images/brand/mesnada-mark-dark.svg" alt="Marca Mesnada" class="brand-logo-light-only" width="28" height="28" /><img src="/images/brand/mesnada-mark-light.svg" alt="Marca Mesnada" class="brand-logo-dark-only" width="28" height="28" /> |

<div class="brand-family">
  <figure><img src="/images/brand/pando-icon.svg" alt="Icono Pando" width="56" height="56" /><figcaption>Pando 木</figcaption></figure>
  <figure><img src="/images/brand/remembrances-icon.svg" alt="Icono Remembrances" width="56" height="56" /><figcaption>Remembrances 本</figcaption></figure>
  <figure><img src="/images/brand/mesnada-icon.svg" alt="Icono Mesnada" width="56" height="56" /><figcaption>Mesnada 众</figcaption></figure>
</div>

## Logotipos

El logotipo completo combina la marca con el logotipo en Space Grotesk. Hay dos variantes de color — elige la que corresponda al color del **fondo**, no de la marca en sí:

<p>
<img src="/images/brand/pando-logo-dark.svg" alt="Logo Pando, tinta oscura" class="brand-logo-light-only" width="220" height="58" />
<img src="/images/brand/pando-logo-light.svg" alt="Logo Pando, tinta clara" class="brand-logo-dark-only" width="220" height="58" />
</p>

- `pando-logo-dark.svg` — trazos color Bosque, para **fondos claros**.
- `pando-logo-light.svg` — trazos color Marfil, para **fondos oscuros**.

Sí, el nombre es contraintuitivo a primera vista: el sufijo nombra el color de la *tinta*, no del fondo. `-dark` es tinta oscura (se usa sobre fondos claros), `-light` es tinta clara (se usa sobre fondos oscuros).

## Recursos

Todos los ficheros fuente viven en `assets/pando-brand-v1/` dentro del repositorio principal de [pando](https://github.com/digiogithub/pando) — esa carpeta es la fuente de verdad única. Los ficheros más habituales también están publicados aquí para descarga directa:

| Fichero | Uso |
|---|---|
| [pando-logo-dark.svg](/images/brand/pando-logo-dark.svg) | Logotipo completo (marca + wordmark), tinta oscura, para fondos claros |
| [pando-logo-light.svg](/images/brand/pando-logo-light.svg) | Logotipo completo, tinta clara, para fondos oscuros |
| [pando-mark-dark.svg](/images/brand/pando-mark-dark.svg) | Solo el símbolo, tinta oscura, para fondos claros |
| [pando-mark-light.svg](/images/brand/pando-mark-light.svg) | Solo el símbolo, tinta clara, para fondos oscuros |
| [pando-icon.svg](/images/brand/pando-icon.svg) | Icono de app — marca sobre una tesela Bosque, autocontenido (funciona sobre cualquier fondo) |
| [pando-icon-256.png](/images/brand/pando-icon-256.png) | Icono de app, ráster 256×256 |
| [remembrances-mark-dark.svg](/images/brand/remembrances-mark-dark.svg) / [-light.svg](/images/brand/remembrances-mark-light.svg) | Símbolo Remembrances 本, tinta oscura / clara |
| [remembrances-icon.svg](/images/brand/remembrances-icon.svg) | Icono de app/sección de Remembrances |
| [mesnada-mark-dark.svg](/images/brand/mesnada-mark-dark.svg) / [-light.svg](/images/brand/mesnada-mark-light.svg) | Símbolo Mesnada 众, tinta oscura / clara |
| [mesnada-icon.svg](/images/brand/mesnada-icon.svg) | Icono de app/sección de Mesnada |

Formatos adicionales (`.ico` de Windows, `.icns` de macOS, variantes monocromas, y la escalera completa de PNG de 16px a 1024px) viven junto a los SVG en el repositorio fuente.

## Dónde aparece la marca en Pando

- **WebUI** — la marca 木 aparece en la barra de título junto a "Pando" (pulsa mientras un agente trabaja) y en la pantalla de bienvenida. La familia de tema `pando` en Ajustes → Apariencia se deriva directamente de esta paleta: el modo oscuro usa fondos Bosque, texto Marfil y Álamo como acento; el modo claro usa un fondo con tinte Marfil y el acento oscurecido `#8f6310` para cumplir el contraste AA. Es una de cuatro familias (`pando`, `paper`, `slate`, `forest`), cada una disponible en claro/oscuro con un color de acento a elegir.
- **Aplicación de escritorio** — el icono de la app (`.icns` en macOS, `.ico` en Windows) se genera a partir de `pando-icon.svg`, y el fondo de la ventana coincide con Bosque.
- **TUI** — el tema `pando` aplica la misma paleta Bosque/Marfil/Álamo a la interfaz de terminal. Las secciones de Remembrances y Mesnada en los ajustes y en la cabecera del orquestador usan los glifos 本 y 众 en el color de acento, y la animación de arranque/ocupado recorre 枝葉林森 (rama, hoja, bosque, arboleda — caracteres todos relacionados con árboles).
- **Mesnada UI** (la interfaz independiente del orquestador) — usa la marca de Mesnada como favicon.

## Contribuir

Si añades una nueva superficie de interfaz o empaquetas Pando en un sitio nuevo, reutiliza los SVG de `assets/pando-brand-v1/` en lugar de redibujar la marca — el grosor de los trazos y la posición de los nodos están ajustados para seguir siendo legibles a tamaños pequeños, y redibujar tiende a desviarse del original. Si necesitas un tamaño, formato o variante de color que no existe todavía, abre un issue o una PR en el repositorio de [pando](https://github.com/digiogithub/pando).
