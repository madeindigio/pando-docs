---
title: Retroalimentación Rápida (Steering)
weight: 20
---

La retroalimentación rápida permite proporcionar correcciones en tiempo real mientras el agente está ejecutándose, sin cancelar la operación actual. Los mensajes se inyectan en el siguiente límite seguro.

## Cómo Funciona

1. El agente está procesando una tarea (ejecutando herramientas, generando código, etc.)
2. Escribes un mensaje y lo envías
3. El mensaje se encola como "retroalimentación de steering"
4. En el siguiente límite seguro (después de los resultados de herramientas actuales), la retroalimentación se inyecta
5. El agente la recibe como un nuevo turno de usuario y se ajusta

## Uso por Interfaz

### TUI

Escribe tu mensaje mientras el agente está ejecutándose y presiona **Ctrl+S** para encolarlo. Un indicador de estado muestra el número de mensajes de retroalimentación en cola.

### Web UI

Envía retroalimentación a través de la interfaz de chat durante una ejecución activa. El mensaje se encola automáticamente.

### ACP (Editor)

Envía un prompt a una sesión activa. Se encola como retroalimentación.

### API

```bash
curl -X POST http://localhost:8766/api/v1/sessions/:id/steer \
  -H "Content-Type: text/plain" \
  -d "Enfócate en el módulo de autenticación en su lugar"
```

## Características Clave

- **No destructivo**: La operación actual se completa antes de procesar la retroalimentación
- **Inyección en límite seguro**: La retroalimentación se inyecta después de persistir los resultados de herramientas
- **Continuación del bucle**: Si la retroalimentación llega entre turnos, el agente continúa con la nueva dirección
- **Auto-compactación**: El contexto se compacta automáticamente si el historial excede el presupuesto del proveedor
- **Seguro reconexión**: La retroalimentación pendiente sobrevive la reconexión en Web UI

## Ejemplo de Flujo

1. El agente comienza a refactorizar toda la base de código
2. Te das cuenta de que el alcance es demasiado amplio
3. Escribe: "Enfócate solo en el módulo de auth" + Ctrl+S
4. El agente termina la llamada actual de herramienta, recibe la retroalimentación, reduce el alcance

{{< callout >}}
El steering es más eficiente que cancelar y reiniciar. Úsalo cuando quieras redirigir al agente sin perder progreso en el trabajo completado.
{{< /callout >}}
