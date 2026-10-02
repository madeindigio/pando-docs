---
title: "Tu primera sesión con Pando"
shortTitle: "Tu primera sesión"
description: "Instala Pando, ábrelo en un proyecto y sigue una petición desde la superficie hasta las raíces."
summary: "Una petición, seguida de la superficie a las raíces."
track: surface
level: beginner
weight: 2
featured: true
home: true
video:
  provider: youtube
  id: ""
  subtitles: [es, en]
chapters:
  - { t: "00:00", title: "Instalación" }
  - { t: "00:00", title: "Abre un proyecto" }
  - { t: "00:00", title: "Primera petición" }
  - { t: "00:00", title: "Lo que pasó debajo" }
  - { t: "00:00", title: "Cambia de superficie" }
---

## Instalación

Pando es un único binario. Descárgalo para macOS, Linux o Windows desde la [última versión en GitHub](https://github.com/digiogithub/pando/releases/latest), o en Linux y macOS ejecuta el script de instalación:

```sh
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

## Abre un proyecto

Ejecuta Pando desde la raíz de tu repositorio. Esa carpeta será el suelo donde crece la arboleda.

```sh
cd mi-proyecto
pando
```

## Tu primera petición

Pide algo real: explicar un módulo, arreglar un test que falla. Observa el panel de actividad mientras trabaja.

{{< shot alt="Primera petición en Pando Desktop" >}}

## Lo que pasó debajo

Escribiste un solo mensaje. Por debajo, varias partes del organismo se movieron a la vez.

{{< under-surface >}}
Remembrances indexó tu código con tree‑sitter y recuperó el contexto relacionado. Cuando la tarea creció, Mesnada la repartió entre subagentes. Nada de eso necesitó una orden tuya.
{{< /under-surface >}}

## Cambia de superficie

Tu sesión te espera en Desktop, Web y la TUI. Para ayuda rápida en la shell sin abrir una sesión, usa el asistente CLI.

```sh
pando cli-assist
```
