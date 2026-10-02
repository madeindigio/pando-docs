---
title: Modo Objetivo (Autopiloto)
weight: 10
---

Normalmente Pando hace una cosa y luego te espera, como un taxi que se para en cada esquina a preguntar «¿y ahora por dónde?». El Modo Objetivo (Goal Mode) es darle al conductor la dirección final. Describes dónde quieres acabar y Pando sigue, paso a paso, hasta que llega, se queda atascado o lo paras tú.

## Qué hace por ti

- **Tareas largas sin que estés mirando.** Arreglar un montón de tests que fallan, una refactorización en muchos pasos pequeños, una migración.
- **Comprueba su propio avance.** Después de cada paso Pando mira lo que ha conseguido y decide el siguiente.
- **Sabe cuándo parar.** Para cuando alcanza el objetivo, cuando topa con un muro que no puede saltar solo o cuando nota que está dando vueltas en círculo.

## Cómo se nota en el día a día

Escribes el objetivo en el chat. Aparece una tarjeta que muestra que el objetivo está en marcha, en qué vuelta va, cuánto lleva trabajando, qué ha hecho hasta ahora y qué va a intentar a continuación. Puedes irte a por un café o ponerte con otra cosa: el objetivo sigue. Al volver, la tarjeta te dice cómo terminó.

Un objetivo puede acabar de varias maneras: completado, bloqueado a la espera de algo que solo tú puedes dar, cancelado por ti, sin tiempo, o atascado tras varias vueltas sin avanzar.

Funciona en todas las interfaces, y también puede ejecutarse sin ninguna ventana, lo que viene bien para trabajos que dejas por la noche.

## Cuándo usarlo

Úsalo cuando la meta es clara y se puede comprobar: «pasan todos los tests», «la compilación sale en verde», «todos los ficheros de esta carpeta están convertidos». No lo uses para preguntas abiertas ni para trabajos en los que quieres decidir en cada paso.

## Conviene saber

- Mientras un objetivo está en marcha, Pando normalmente no se para a pedir permiso en cada acción. Deja activado el [sandbox de comandos]({{< relref "/docs/features/sandbox" >}}) para que trabaje dentro de un corralito.
- Hay límites de vueltas y de tiempo, así que un objetivo no puede correr para siempre. Puedes cambiarlos.
- Puedes listar comandos que nunca deben ejecutarse durante un objetivo.
- Empieza con objetivos pequeños y hazlos más grandes según ganes confianza.

## Siguientes pasos

- Guía: [Goal Mode: tareas largas sin supervisión]({{< relref "/guides/goal-mode" >}}).
- Referencia: [Configuración del Modo Objetivo]({{< relref "/docs/configuration/goal" >}}).
- Relacionado: [Delegación de agentes]({{< relref "/docs/features/agent-delegation" >}}) para repartir un objetivo grande entre ayudantes.
