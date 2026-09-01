---
title: Razonamiento y esfuerzo de pensamiento
weight: 37
---

Los modelos modernos exponen un dial de «cuánto debo pensar»: pensamiento extendido en Claude, esfuerzo de razonamiento en modelos GPT y Copilot. Pando resuelve ahora ese dial **por modelo**, así que nunca envías un valor que el modelo rechace.

## Por qué importa

Los valores no son los mismos en todas partes. Algunos modelos solo aceptan `high`. Otros solo `low` y `high`. Otros no aceptan nada. Enviar el valor equivocado provocaba antes un error del proveedor en mitad de tu trabajo.

Ahora Pando conoce los valores aceptados por el modelo seleccionado y:

- te ofrece solo los valores que ese modelo soporta de verdad,
- ajusta al rango válido en lugar de fallar,
- elige un valor por defecto sensato (`medium` si está disponible; si no, lo más parecido).

El rango completo entre proveedores es `none`, `minimal`, `low`, `medium`, `high`, `xhigh` y `max`, pero lo que ves depende del modelo.

## Cómo cambiarlo

- **TUI y WebUI**: el selector de modelo muestra las opciones de esfuerzo disponibles para el modelo elegido.
- **Zed / VS Code / JetBrains (ACP)**: el menú de ajustes de sesión lista las mismas opciones, reconstruidas cada vez que cambias de modelo.
- **Configuración**, por agente:

```toml
[Agents.coder]
Model           = 'anthropic.claude-sonnet-5'
ReasoningEffort = 'high'
ThinkingMode    = ''
```

Deja `ReasoningEffort` vacío para que Pando elija el valor por defecto del modelo.

## Guía práctica

| Esfuerzo | Bueno para |
|----------|------------|
| `none` / `minimal` | Ediciones mecánicas, formateo, traducciones, trabajo en volumen donde importan velocidad y coste |
| `low` | Programación diaria en una base de código bien conocida |
| `medium` | El valor por defecto. La mayoría de tareas. |
| `high` / `xhigh` / `max` | Decisiones de arquitectura, depurar algo que no entiendes, planificar un cambio de varios pasos |

Más esfuerzo cuesta más tokens y tarda más. Como Pando permite cambiar de modelo y de esfuerzo a mitad de sesión, un patrón habitual es planificar con esfuerzo alto y bajar a bajo para la parte mecánica.

{{< callout >}}
Las capacidades de los modelos también se enriquecen desde [models.dev](https://models.dev), así que el precio, la ventana de contexto y el soporte de razonamiento aparecen en el selector sin configurar nada.
{{< /callout >}}
