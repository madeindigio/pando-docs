---
title: Diagnóstico remoto
weight: 41
---

Cuando algo va mal, lo difícil es describirlo. El diagnóstico remoto deja que Pando entregue su propio cuaderno de bitácora a los mantenedores, para que vean lo que pasó sin que tú copies ni pegues nada.

Viene **desactivado por defecto**. No se envía nada si no lo activas tú.

## Qué hace por ti

- **Se acabó pegar registros** en los informes de error.
- **Un número de ticket en vez de tu nombre.** Pando te da un **ID de depuración** aleatorio de 16 cifras, como `1234-5678-9012-3456`. Lo citas en tu informe y los mantenedores encuentran tus registros con él.
- **Tú mandas.** Lo enciendes para el problema y lo apagas después.

## Cómo se nota en el día a día

Enciendes un interruptor, repites lo que falló y pegas el ID de depuración en tu informe de error. Ese es todo el ritual.

{{< shot src="images/webui/pando-webui-settings-general-diagnostics.jpg" alt="Sección de diagnóstico en los ajustes generales" >}}

El ID se conserva al apagar el diagnóstico, así que el mismo sirve durante toda una conversación de soporte. Puedes cambiarlo por uno nuevo cuando quieras.

## Qué se envía

Las líneas del cuaderno de bitácora de Pando: la hora, la gravedad de la entrada, el mensaje, tu ID de depuración, la versión de Pando y el sistema operativo, y un resumen corto de las herramientas que se ejecutaron.

## Qué no se envía nunca

- Tu código ni el contenido de tus ficheros
- Tus conversaciones con el modelo
- Claves, tokens y contraseñas: todo lo que parece un secreto se sustituye por `[REDACTED]`
- La ruta de tu carpeta personal, que se reescribe como `~`

El ID de depuración es aleatorio. No se fabrica a partir de tu nombre de usuario, tu máquina ni nada que te identifique.

## Cuándo usarlo

Cuando informas de un problema y quieres que se entienda rápido. Dejarlo encendido el resto del tiempo no aporta nada.

## Conviene saber

El diagnóstico remoto existe en las descargas oficiales. Si compilaste Pando tú mismo, el interruptor no está disponible. Es lo esperado.

## Siguientes pasos

- Actívalo e informa de un problema: [Actualizar y diagnosticar]({{< relref "/guides/update-and-diagnostics" >}})
- Comandos y contenido exacto: [referencia de diagnóstico y mantenimiento]({{< relref "/docs/configuration/diagnostics" >}})
