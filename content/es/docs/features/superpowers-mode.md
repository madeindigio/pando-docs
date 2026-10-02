---
title: Modo Superpowers (desarrollo guiado por especificaciones)
weight: 29
---

El modo Superpowers convierte a Pando en el albañil que no pone un ladrillo sin plano. Primero entender lo que quieres, luego enseñarte un diseño y esperar tu visto bueno, luego escribir el plan, luego construir con tests y luego comprobar que de verdad funciona. Sigue las ideas del flujo de trabajo [superpowers](https://github.com/obra/superpowers), integradas en Pando.

Lo activas para una sesión, cuando el cambio merece ese cuidado.

## Qué hace por ti

- **Sin sorpresas.** Apruebas el diseño antes de que se escriba una línea de código.
- **Un plan escrito** para el trabajo que toca varios ficheros: pasos ordenados por riesgo, con una forma de comprobar cada uno.
- **Los tests primero**, en pasos pequeños.
- **Los fallos se reproducen antes de arreglarse**, y así sabes que el arreglo arregla ese fallo.
- **Comprobado con resultados reales.** Pando ejecuta los tests y enseña la salida; no se limita a decir «esto debería funcionar».
- **Una segunda mirada.** Repasa sus propios cambios antes de enseñártelos.

## Cómo se nota en el día a día

Escribes `/superpowers Fix login bug`. En lugar de lanzarse al código, Pando vuelve con lo que ha entendido y una propuesta, y espera. Cuando das tu conformidad, recorre el plan paso a paso y va enseñando los resultados de los tests. Cuando cierras con `/superpowers-finish`, dedica un turno más a contarte qué se hizo, qué no y qué podría venir después.

## Cuándo usarlo

| Situación | ¿Superpowers? |
|----------|-----------------|
| Un cambio en muchos ficheros | Sí: mantiene el trabajo en orden |
| Una funcionalidad nueva con tests | Sí: los tests van primero |
| Cambios que no pueden romper producción | Sí: más puntos de control |
| Un arreglo rápido | No: demasiada ceremonia |
| Probar ideas | No: demasiado rígido |

Se combina con otros modos: añade `/caveman` y tendrás el mismo proceso cuidadoso con respuestas cortas.

## Conviene saber

- **Nunca toca tu historial de git.** Mientras está activo, Pando no hace commit, merge ni push, no cambia de rama, no descarta trabajo y no modifica tu configuración de git.
- Tus instrucciones directas y las reglas de tu proyecto (AGENTS.md) siempre mandan sobre el modo.
- Las peticiones de permiso funcionan como siempre.
- Las peticiones pequeñas o de solo lectura se saltan la ceremonia.
- Se activa siempre a mano, sesión a sesión, y no sobrevive al cierre de Pando.
- Solo se desactiva cuando el paso de cierre termina bien.

## Siguientes pasos

- Guía: [Cambia cómo piensa y cómo habla Pando]({{< relref "/guides/working-modes" >}}).
- Referencia: [Modos de trabajo]({{< relref "/docs/configuration/modes" >}}).
- Relacionado: [Modo aprendizaje]({{< relref "/docs/features/learning-mode" >}}) para dejar constancia de lo decidido.
