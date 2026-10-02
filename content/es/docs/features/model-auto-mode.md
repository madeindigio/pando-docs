---
title: Modo automático de modelos
weight: 39
---

El modo automático deja que Pando elija el modelo para cada mensaje. Tú describes unos pocos tipos de trabajo y dices qué modelo se ocupa de cada uno. El trabajo difícil va a tu modelo más potente y las preguntas rápidas a uno barato o local.

Viene **desactivado por defecto**.

## Cómo funciona

1. Seleccionas **Auto** como modelo.
2. Con cada mensaje que envías, un *modelo de decisión* muy pequeño y rápido lo lee y elige la ruta que mejor encaja.
3. Pando ejecuta ese turno con el modelo que asignaste a la ruta y te dice cuál ha elegido.

```
Auto: implementation → anthropic.claude-sonnet-4 (p=0.93, 38 ms via ollama/tev1:0.8b)
```

Si ninguna ruta encaja con claridad, o el modelo de decisión no responde, el turno se ejecuta con tu modelo de programación habitual. El modo automático nunca bloquea un mensaje.

La elección se hace una vez por mensaje. Mientras el agente encadena llamadas a herramientas, el modelo no cambia.

## Configuración

### 1. Elige un modelo de decisión

{{< shot src="images/webui/pando-webui-settings-decision-model.jpg" alt="Ajustes del modelo de decisión" >}}

Abre **Ajustes > Modelo de decisión** y elige el proveedor. La opción más sencilla es local, con [Ollama](https://ollama.com) 0.35 o posterior:

```bash
ollama pull tev1:0.8b
```

Usa **Probar conexión** para confirmar que funciona. Pando no instala Ollama ni descarga modelos por ti.

### 2. Define tus rutas

{{< shot src="images/webui/pando-webui-settings-auto-mode.jpg" alt="Ajustes del modo automático" >}}

{{< shot src="images/webui/pando-webui-settings-auto-mode-routes.jpg" alt="Rutas del modo automático con modelo principal y de respaldo" >}}

Abre **Ajustes > Auto mode**, actívalo y añade rutas. Cada ruta tiene una descripción del trabajo y un modelo. En el fichero de configuración queda así:

```toml
[ModelAutoMode]
Enabled = true

[[ModelAutoMode.Routes]]
ID          = 'quick'
Description = 'Short question or explanation about code, a concept, an error message or a command; no code changes needed.'
Model       = 'ollama.qwen2.5-coder:7b'

[[ModelAutoMode.Routes]]
ID          = 'implementation'
Description = 'Write, modify, refactor or fix code across one or more files, including adding tests.'
Model       = 'anthropic.claude-sonnet-4'
Fallbacks   = ['copilot.gpt-5.4']

[[ModelAutoMode.Routes]]
ID          = 'planning'
Description = 'Design, architecture, trade-off analysis or planning a feature before implementing it.'
Model       = 'anthropic.claude-opus-4'
```

### 3. Pruébalo antes de confiar en él

{{< shot src="images/webui/pando-webui-settings-auto-mode-playground-result.jpg" alt="Banco de pruebas del modo automático con la ruta ganadora" >}}

La página de ajustes tiene un **banco de pruebas**: escribe un mensaje de ejemplo y verás qué ruta gana y por qué, sin enviar nada a ningún modelo.

## Usar Auto

- **Web UI y escritorio**: Auto es la primera entrada del selector de modelos. Mientras se ejecuta un turno, el selector muestra `Auto · <modelo elegido>`.
- **TUI**: Auto es la primera entrada del diálogo de modelos.
- **Editores (Zed, Xcode y otros por ACP)**: Auto aparece como primer modelo de la lista.

Al elegir un modelo concreto, Auto se desactiva en esa sesión hasta que lo vuelvas a seleccionar.

## Modelos de respaldo

{{< shot src="images/webui/pando-webui-settings-auto-mode-routes-fallbacks.jpg" alt="Modelos de respaldo de una ruta" >}}

Cada ruta admite hasta dos modelos de respaldo. Si el primero falla por un límite de uso, un error del servidor o un problema de red, Pando reintenta el mismo turno con el siguiente y te avisa.

## Cómo escribir buenas rutas

- Usa pocas rutas, entre tres y cinco. Cada ruta de más hace la decisión menos clara.
- Una frase por ruta que describa la *tarea*, con verbos concretos.
- Haz que las rutas se distingan bien. Si las descripciones se solapan no hay un ganador claro y el turno va al modelo de programación.
- Las respuestas cortas como «vale, sigue» no encajan en ninguna ruta y se quedan en el modelo de programación. Suele ser lo que quieres.

## Conviene saber

- Los subagentes delegados conservan su propio modelo configurado.
- Cambiar de modelo entre mensajes reduce el aprovechamiento de la caché de prompts del proveedor en esa conversación. Pocas rutas con modelos estables mantienen el coste bajo.
- `pando doctor` comprueba que el modelo de decisión responde y que cada ruta apunta a un modelo que existe.

## Si algo no va bien

| Qué ves | Qué hacer |
|---|---|
| Todo se ejecuta con el modelo de programación | Abre el banco de pruebas. Si la mejor ruta puntúa bajo, afina las descripciones o baja `Threshold` |
| «Upgrade Ollama to >= 0.35» | Actualiza Ollama |
| La lista de modelos de decisión está vacía | Ejecuta `ollama pull tev1:0.8b` |
| El primer mensaje va lento | El modelo de decisión se está cargando. Los siguientes van rápido |
| «route has no usable model» | Los modelos de esa ruta son desconocidos, están desactivados o se quedan pequeños para la conversación |
