---
title: Descubrimiento del fichero de configuración
weight: 32
---

No hace falta decirle a Pando dónde están sus ajustes. Lo arranques donde lo arranques, mira en la carpeta actual, luego en la de encima, y sigue subiendo escaleras hasta encontrar un fichero de ajustes. El primero que se cruza es el que usa.

## Qué hace por ti

- **Un fichero para un repositorio grande.** Pon `.pando.toml` arriba del todo y todas las carpetas de debajo siguen los mismos ajustes.
- **Ajustes de equipo compartidos.** Haz commit de ese único fichero y todo el mundo trabaja igual.
- **Carpetas limpias.** Sin copias del fichero de ajustes repartidas entre tu código.
- **Un plan B sensato.** Si no hay fichero de proyecto en todo el camino de subida, Pando usa tus ajustes personales.

## Cómo se nota en el día a día

```
/my-project/
├── .pando.toml          ← Pando finds this
├── src/
│   ├── frontend/        (start Pando here: it climbs two floors and finds it)
│   └── backend/         (same here)
```

Arrancas Pando muy dentro de un proyecto y se comporta como si lo hubieras arrancado arriba. Lo mismo pasa con la carpeta `.pando/` donde Pando guarda las sesiones y cachés del proyecto: si existe más arriba, se reutiliza.

## Cuándo usarlo

Es automático. Aprovéchalo en repositorios con muchos subproyectos, o si te gusta trabajar desde dentro de una subcarpeta.

## Conviene saber

- La subida se detiene en tu carpeta personal. Pando no usa ficheros que encuentre por encima.
- Solo se usan ficheros que puedes leer y modificar.
- Gana el fichero más cercano. Uno en una subcarpeta tapa al de arriba.
- El formato y las opciones del fichero son los mismos viva donde viva.
- La búsqueda se puede desactivar para una ejecución si alguna vez necesitas el comportamiento antiguo.

## Siguientes pasos

- El orden de búsqueda completo y cómo desactivarla: [referencia de diagnóstico y mantenimiento]({{< relref "/docs/configuration/diagnostics" >}})
- Qué va dentro del fichero: [Configuración]({{< relref "/docs/configuration" >}})
- Un paseo por el rincón del mantenimiento: [Actualizar y diagnosticar]({{< relref "/guides/update-and-diagnostics" >}})
