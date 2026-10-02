---
title: Auto-Actualización
weight: 19
---

Pando se cambia su propia bombilla. Un comando trae la última versión y la coloca; no descargas instaladores ni buscas el fichero correcto.

```bash
pando update
```

## Qué hace por ti

- **Siempre el fichero correcto.** Pando elige la versión que corresponde a tu sistema operativo y tu procesador.
- **Sin actualizaciones a medias.** El cambio se hace en un solo paso: o la versión nueva queda puesta del todo o se queda la antigua.
- **Camino de vuelta.** Dile una versión anterior y Pando vuelve a ella, muy útil cuando una actualización no te convence.
- **Te avisa cuando hay algo nuevo**, uses Pando donde lo uses.

## Cómo se nota en el día a día

Cuando existe una versión más nueva, la ves sin buscarla:

- En la **Web UI y la app de escritorio**, el panel de información del chat y **Configuración > General > Diagnóstico** muestran tu versión y la nueva.
- En la **terminal**, Pando imprime un aviso corto al arrancar.

{{< shot src="images/webui/pando-webui-chat-light.jpg" dark="images/webui/pando-webui-chat-dark.jpg" alt="Vista de chat con la versión instalada y el aviso de actualización" >}}

Ejecutas el comando y Pando dice lo que va a hacer: `Installing`, `Downgrading` o `Reinstalling`. Puedes hacerlo con Pando abierto; la versión nueva se usa la próxima vez que lo arranques.

## Cuándo usarlo

Siempre que aparezca el aviso. Indica una versión concreta para volver atrás tras una actualización que da problemas, o para reinstalar la que tienes.

## Conviene saber

- Necesitas permiso de escritura en la carpeta donde vive el programa `pando`.
- En macOS, si instalaste con el `.pkg`, actualiza `Pando.app` con un `.pkg` nuevo.
- Pando solo comprueba y avisa. Nunca se actualiza por su cuenta.

## Siguientes pasos

- Paso a paso, incluido volver a una versión anterior: [Actualizar y diagnosticar]({{< relref "/guides/update-and-diagnostics" >}})
- Todos los comandos: [referencia de diagnóstico y mantenimiento]({{< relref "/docs/configuration/diagnostics" >}})
- Primera instalación: [Instaladores multiplataforma]({{< relref "/docs/features/installers" >}})
