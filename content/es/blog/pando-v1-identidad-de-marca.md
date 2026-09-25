---
title: "Pando v1: una nueva identidad — una raíz, muchos agentes"
date: 2026-09-25
tags: ["Marca", "Lanzamiento", "WebUI", "Escritorio"]
---

Pando estrena su identidad visual v1: un símbolo nuevo, una paleta de verdad, y un sistema de diseño que ahora funciona de forma consistente en el Web UI, la aplicación de escritorio, la TUI y la interfaz independiente del orquestador Mesnada. La antigua mascota en SVG queda retirada.

## El símbolo — 木

La nueva marca es 木, el carácter para "árbol": dos trazos curvos sobre un tronco, con tres pequeños nodos de circuito entrelazados en las ramas. La idea es literal — **una raíz, muchos agentes**. Una sola instancia de Pando, muchos subagentes ramificándose desde ella.

El mismo sistema monolínea se extiende a dos marcas hermanas para las otras identidades de Pando: **Remembrances** 本 (raíz / libro — el trazo dorado en la raíz representa la memoria guardada) y **Mesnada** 众 (multitud / séquito — un nodo macizo para el señor, nodos en anillo para su mesnada). Los mismos trazos, los mismos nodos, distinto carácter.

La paleta completa, las normas de uso y todos los recursos descargables viven ahora en una página dedicada: [Marca e identidad](/es/docs/brand).

## Un Web UI que ahora es de verdad temático

La identidad llega junto a un **rediseño más amplio del Web UI** que se ha ido desplegando en las últimas versiones. La interfaz funciona ahora sobre un sistema de diseño basado en tokens: superficies neutras, bordes finos, radios suaves y un único color de acento contenido, en lugar de estilos improvisados y dispersos.

El sistema de temas es ahora un modelo real de `familia × modo × acento`:

- **Familia** — `pando` (el nuevo valor por defecto, construido directamente sobre Bosque/Marfil/Álamo), `paper`, `slate` o `forest`.
- **Modo** — claro, oscuro o según el sistema.
- **Acento** — siete valores predefinidos (dorado, terracota, violeta, azul, verde, rosa, grafito) que sustituyen solo el color de acento sobre cualquier familia.

Elige cualquier combinación desde Ajustes → Apariencia. La familia `pando` en modo oscuro usa fondos Bosque con texto Marfil y Álamo como acento; en modo claro usa un fondo con tinte Marfil y un acento oscurecido, porque el dorado Álamo oscuro tal cual no supera el contraste WCAG AA como texto de cuerpo o color de botón — algo a tener en cuenta si construyes tu propia superficie de interfaz sobre estos tokens.

## Dónde lo verás

- **Web UI** — la marca 木 pulsa en la barra de título mientras un agente trabaja, y aparece en la pantalla de bienvenida y en el estado de chat vacío.
- **Aplicación de escritorio** — el icono de la app (macOS, Windows) se genera a partir de la nueva marca, y el fondo de la ventana ahora coincide con Bosque en lugar del valor por defecto anterior.
- **TUI** — el tema `pando` aplica la misma paleta a la terminal, las secciones de Remembrances y Mesnada en los ajustes muestran sus glifos 本 / 众 en el color de acento, y la animación de arranque/ocupado recorre ahora 枝葉林森 en lugar de la secuencia anterior.
- **Mesnada UI** — la interfaz independiente del orquestador adoptó la marca de Mesnada como favicon, en sustitución de un logo provisional.

## Pruébalo

Actualiza a la última versión de Pando y abre Ajustes → Apariencia en el Web UI para cambiar de familia y de acento, o configura `[TUI].theme = "pando"` en tu configuración para la terminal. Todo sobre la identidad — la tabla de paleta, la familia de símbolos y enlaces directos a cada recurso SVG y PNG — está documentado en la página de [Marca e identidad](/es/docs/brand).

---

*Pando es de código abierto y está en desarrollo activo. Pruébalo en [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
