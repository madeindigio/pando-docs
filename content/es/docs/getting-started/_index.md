---
title: Primeros pasos
weight: 1
---

Te damos la bienvenida. Pando es un asistente de IA para quien construye software: lee tu proyecto, responde preguntas sobre él, escribe y cambia código, ejecuta comandos y recuerda lo que decidiste la semana pasada. Esta página es el inicio del sendero. Elige un camino y sigue las señales.

## El camino corto: tres guías

Hazlas en orden y estarás trabajando con Pando en unos quince minutos.

{{< cards >}}
  {{< card link="../../guides/install" title="1. Instala Pando" icon="download" subtitle="Una descarga o una línea en la terminal" >}}
  {{< card link="../../guides/setup-providers-models" title="2. Conecta una cuenta de IA" icon="key" subtitle="El asistente de configuración, cuentas y modelos" >}}
  {{< card link="../../guides/first-session" title="3. Tu primera sesión" icon="chat" subtitle="Una petición real, de principio a fin" >}}
{{< /cards >}}

## ¿Con prisa?

En Linux o macOS, pega esto en una terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install.sh | bash
```

En Windows, en PowerShell:

```powershell
iex (irm https://raw.githubusercontent.com/digiogithub/pando/main/scripts/install-windows.ps1)
```

Después entra en tu proyecto y abre Pando:

```bash
cd mi-proyecto
pando app        # the Web UI, in your browser
```

`pando desktop` abre la misma interfaz en su propia ventana, y `pando` a secas abre la interfaz de terminal. La primera vez, un asistente de configuración te pide tu cuenta de IA.

## Cómo está organizado este sitio

Tres tipos de páginas para tres tipos de preguntas:

| Sección | Responde a | Empieza por |
|---|---|---|
| [Guías]({{< relref "/guides" >}}) | «¿Cómo lo configuro y lo uso?» Paso a paso, con capturas | [Oriéntate en la Web UI]({{< relref "/guides/webui-tour" >}}) |
| [Funcionalidades]({{< relref "/docs/features" >}}) | «¿Qué es esto y me interesa?» Explicaciones llanas | [Web UI]({{< relref "/docs/features/web-ui" >}}) |
| [Configuración]({{< relref "/docs/configuration" >}}) | «¿Cómo se llama esa opción?» Listas de ajustes y comandos | [Configuración]({{< relref "/docs/configuration" >}}) |

## Qué probar después de tu primera sesión

- [Elige tu superficie]({{< relref "/guides/choose-your-surface" >}}): escritorio, navegador, terminal o una sola línea.
- [Enseña tu proyecto a Pando]({{< relref "/guides/remembrances" >}}): dale memoria.
- [Trabaja en varios proyectos]({{< relref "/guides/projects-workspaces" >}}): una pestaña para cada uno.
- [Usa Pando desde el móvil]({{< relref "/guides/remote-access" >}}).

## Para quien prefiere la terminal

```bash
pando -c /path/to/project                       # start in a specific folder
pando -p "Explain the use of context in Go"     # one question, one answer
pando -p "Explain the use of context in Go" -f json
pando -d                                        # with debug messages
```

Todas las opciones de arranque están en la [referencia]({{< relref "/docs/configuration/webui" >}}); compilar desde el código se explica al final de la [guía de instalación]({{< relref "/guides/install" >}}).
