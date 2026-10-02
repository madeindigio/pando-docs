---
title: Habilidad Ponytail (Modo YAGNI)
weight: 16
---

Ponytail es la voz del desarrollador veterano que pregunta «¿de verdad necesitamos esto?». Empuja a Pando a escribir menos código, a usar lo que el lenguaje ya trae antes de añadir nada y a poner en duda la complejidad. Entre programadores la idea tiene nombre, YAGNI: «no lo vas a necesitar».

## Qué hace por ti

- **Cambios más pequeños.** La edición mínima que resuelve el problema.
- **Menos piezas móviles.** Se usa lo que ya existe antes de añadir una biblioteca nueva.
- **Explicaciones más cortas.** Solo lo que necesitas saber.
- **Un «¿por qué?» saludable.** En su nivel más fuerte cuestiona la propia petición.

## Cómo se nota en el día a día

Sin Ponytail, ante la petición de una pequeña utilidad, Pando podría construir una función nueva con sus tests, su documentación y un par de capas «por si acaso». Con Ponytail en nivel full, primero mira si el lenguaje ya lo resuelve, usa la versión más simple, se salta las capas que nadie pidió y escribe los tests mínimos.

Hay tres niveles:

| Nivel | Comportamiento |
|------|----------|
| **Lite** | Construye lo que pides y menciona la alternativa más perezosa |
| **Full** | Sigue «la escalera»: primero lo que el lenguaje ya trae, luego el cambio más pequeño, luego la explicación más corta |
| **Ultra** | Quita antes de añadir, y pone en duda que la cosa haga falta |

## Cuándo usarlo

Brilla en sesiones de limpieza y en proyectos que se han complicado más de la cuenta. Déjalo apagado cuando de verdad estás construyendo algo nuevo y amplio.

## Conviene saber

- En las sesiones nuevas está apagado salvo que fijes un nivel por defecto.
- Cambia cómo se escribe el código, no cuánto habla Pando. Para respuestas más cortas usa [Caveman]({{< relref "/docs/features/caveman-mode" >}}).
- Está inspirado en la skill ponytail de Dietrich Gebert (licencia MIT).

## Siguientes pasos

- Guía: [Cambia cómo piensa y cómo habla Pando]({{< relref "/guides/working-modes" >}}).
- Referencia: [Modos de trabajo]({{< relref "/docs/configuration/modes" >}}).
