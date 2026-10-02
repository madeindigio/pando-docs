---
title: Configuración del modo automático y del modelo de decisión
weight: 34
---

Claves del modo automático de modelos y del modelo de decisión compartido. Para la idea, lee [Modo automático de modelos]({{< relref "/docs/features/model-auto-mode" >}}); para configurarlo en la Web UI, la guía [Deja que Pando elija el modelo adecuado]({{< relref "/guides/model-auto-mode" >}}).

## Modelo de decisión

Un modelo pequeño responde preguntas rápidas de reparto y de relevancia para el modo automático, la selección automática de persona y el filtro de relevancia del contexto. Web UI: **Configuración > Modelo de decisión**.

{{< shot src="images/webui/pando-webui-settings-decision-model.jpg" alt="Ajustes del modelo de decisión" >}}

```toml
[DecisionModel]
TimeoutMs = 0            # 0 = 1500 ms for Ollama, 3000 ms for remote providers

[DecisionModel.Router]
Provider  = 'ollama'     # 'ollama' (default), 'typesafe' or 'custom'
BaseURL   = ''           # empty = provider default
APIKey    = ''           # stored encrypted; '$ENV_VAR' references are allowed
Model     = 'tev1:0.8b'
KeepAlive = '30m'        # how long Ollama keeps the model loaded
# Headers = { 'X-Team' = 'docs' }   # extra headers for gateways
```

| Clave | Por defecto | Descripción |
|---|---|---|
| `Router.Provider` | `ollama` | `ollama` (local), `typesafe` (TypeSafe Jev) o `custom` (una pasarela compatible con Jev) |
| `Router.BaseURL` | la del proveedor | Raíz de la API. Para TypeSafe, por defecto `https://api.typesafe.ai` |
| `Router.APIKey` | vacía | Con TypeSafe, si está vacía se usa la variable de entorno `TYPESAFE_API_KEY` |
| `Router.Model` | ninguno | Por ejemplo `tev1:0.8b` |
| `Router.KeepAlive` | `30m` | Solo Ollama |
| `Router.Headers` | ninguna | Cabeceras HTTP adicionales |
| `TimeoutMs` | `0` | Tope de una llamada de decisión |

Ollama debe ser 0.35 o posterior; Pando no lo instala. Instala el modelo con `ollama pull tev1:0.8b`, o con el botón **Descargar** que la página de ajustes muestra junto a los modelos sugeridos (`tev1:0.8b`, `tev1`, `nimble`) que aún no están instalados.

**Probar conexión** informa de: Accesible, Autorizado, Versión ≥ 0.35, Modelo presente, Modelo apto para decisiones, Latencia.

Quién usa el modelo de decisión:

| Función | Dónde se activa |
|---|---|
| Enrutado del modo automático | **Configuración > Auto mode** (abajo) |
| Selección automática de persona | **Configuración > Agentes > Persona Selector > Use decision model** (`useDecisionModel` en el agente `persona-selector`). El modelo propio del agente pasa a ser el de reserva |
| Filtro de relevancia del contexto | **Configuración > Remembrances > Filtro de relevancia con el modelo de decisión**; mira la [referencia de Remembrances]({{< relref "/docs/configuration/remembrances" >}}) |

La idea se explica en [Modelo de decisión]({{< relref "/docs/features/decision-model" >}}); la puesta en marcha, en la guía [Dale reflejos rápidos a Pando]({{< relref "/guides/decision-model" >}}).

## Modo automático

Web UI: **Configuración > Auto mode**.

{{< shot src="images/webui/pando-webui-settings-auto-mode-routing-tuning.jpg" alt="Ajuste fino del reparto: umbral, confianza mínima y mensajes de historial" >}}

```toml
[ModelAutoMode]
Enabled        = true
DefaultAuto    = true    # new sessions start with Auto selected
Threshold      = 0.60    # minimum probability of the chosen route (0.05–1)
MinConfidence  = 0       # extra confidence check; 0 disables it
HistoryPrompts = 0       # previous user prompts added as context for the decision

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

| Clave | Por defecto | Etiqueta en la Web UI | Descripción |
|---|---|---|---|
| `Enabled` | `false` | Enable Auto mode | Añade «Auto» como primera entrada de todos los selectores de modelo |
| `DefaultAuto` | `true` | Use Auto by default | Las sesiones nuevas empiezan con Auto seleccionado |
| `Threshold` | `0.60` | Threshold | Por debajo, el turno va al modelo de programación |
| `MinConfidence` | `0` | Minimum confidence | 0 desactiva la comprobación extra |
| `HistoryPrompts` | `0` | History prompts | Hasta 20 |

### Rutas

| Clave | Descripción |
|---|---|
| `ID` | Nombre corto estable. `none` está reservado para «ninguna ruta encaja» |
| `Description` | El tipo de mensaje, en lenguaje natural. Hasta 500 caracteres |
| `Model` | Modelo principal |
| `Fallbacks` | Hasta 2 modelos que se prueban en orden cuando el principal falla por un límite de uso, un error del servidor o un problema de red |
| `Disabled` | `true` saca la ruta de la decisión sin borrarla |

Hasta 25 rutas. El orden solo importa en los empates.

## Comportamiento

- La elección se hace una vez por mensaje; el modelo no cambia mientras el agente encadena llamadas a herramientas.
- Si ninguna ruta llega al umbral, o el modelo de decisión no responde, el turno va al modelo de programación. El modo automático nunca bloquea un mensaje.
- Al elegir un modelo concreto, Auto se desactiva en esa sesión hasta que se vuelva a seleccionar.
- Los subagentes delegados conservan su propio modelo configurado.
- Cambiar de modelo entre mensajes reduce el aprovechamiento de la caché de prompts del proveedor en esa conversación.
- El chat informa de cada elección:

```
Auto: implementation → anthropic.claude-sonnet-4 (p=0.93, 38 ms via ollama/tev1:0.8b)
```

- `pando doctor` comprueba que el modelo de decisión responde y que cada ruta apunta a un modelo que existe.

## Dónde aparece Auto

| Interfaz | Dónde |
|---|---|
| Web UI y escritorio | Primera entrada del selector de modelos; muestra `Auto · <modelo elegido>` durante un turno |
| TUI | Primera entrada del diálogo de modelos |
| Editores por ACP (Zed, Xcode y otros) | Primer modelo de la lista |
