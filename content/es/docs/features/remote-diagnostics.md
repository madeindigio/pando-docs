---
title: Diagnóstico remoto
weight: 41
---

Cuando algo va mal, puedes dejar que Pando envíe sus registros a los mantenedores para que vean qué ha pasado sin que tengas que copiar y pegar nada.

Viene **desactivado por defecto**. No se envía nada si no lo activas.

## Activarlo

{{< shot src="images/webui/pando-webui-settings-general-diagnostics.jpg" alt="Sección de diagnóstico en los ajustes generales" >}}

- **Web UI y escritorio**: Ajustes > General > Diagnóstico
- **TUI**: Ajustes > General > Remote Telemetry
- **Terminal**: `pando telemetry enable`

La primera vez, Pando crea un **ID de depuración** aleatorio de 16 dígitos, como `1234-5678-9012-3456`, y lo muestra junto al interruptor.

## Informar de un problema

1. Activa el diagnóstico remoto.
2. Reproduce el problema.
3. Pega tu ID de depuración en el informe del error.

Un mantenedor encuentra tus registros con ese ID. Después puedes volver a desactivarlo; el ID se conserva, así que el mismo vale para toda una conversación de soporte. **Regenerar** lo sustituye por uno nuevo cuando quieras.

El ID es aleatorio. No se deriva de tu nombre de usuario, de tu máquina ni de nada que te identifique.

## Qué se envía

Líneas de registro: hora, nivel, mensaje, tu ID de depuración, la versión de Pando y el sistema operativo, y un resumen breve de la actividad de las herramientas.

## Qué no se envía nunca

- Tu código ni el contenido de tus ficheros
- Tus conversaciones con el modelo
- Claves, tokens y contraseñas: todo lo que parece un secreto se sustituye por `[REDACTED]`
- La ruta de tu carpeta personal, que se reescribe como `~`

## Comandos

```bash
pando telemetry status       # si está disponible y activado, y con qué ID
pando telemetry enable       # lo activa y muestra el ID de depuración
pando telemetry disable      # lo desactiva y conserva el ID
pando telemetry id           # muestra solo el ID de depuración
pando telemetry regenerate   # sustituye el ID por uno nuevo
pando telemetry level warn   # envía solo avisos y errores
```

{{< callout >}}
El diagnóstico remoto está disponible en los binarios oficiales de cada versión. Si compilaste Pando por tu cuenta, `pando telemetry status` indica que no está disponible. Es lo esperado.
{{< /callout >}}
