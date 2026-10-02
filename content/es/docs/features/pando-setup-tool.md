---
title: Autoservicio del agente (pando_setup)
weight: 31
---

El agente de Pando tiene su propio panel de control. Como un empleado nuevo con acceso al manual de la empresa, puede consultar cómo está configurado Pando, qué modelos hay disponibles y cuánto ha costado la sesión, sin pararse a preguntarte. El panel es una herramienta integrada llamada `pando_setup`.

Tú nunca la llamas. El agente la usa cuando la necesita.

## Qué hace por ti

- **Respuestas sobre tu propia instalación.** Pregunta «¿qué modelos puedo usar?» o «¿cuánto ha costado esta sesión?» y Pando lo comprueba en lugar de suponerlo.
- **Mejores elecciones.** Antes de proponer un modelo, el agente puede ver su precio, cuánto le cabe en la cabeza y qué sabe hacer.
- **Modos a petición.** Di «sé más breve» y el agente puede activar [Caveman]({{< relref "/docs/features/caveman-mode" >}}) en la sesión por sí mismo.
- **Nada que configurar.** Siempre está ahí.

## Cómo se nota en el día a día

En mitad de una conversación preguntas «¿tengo bien puesta la cuenta de Copilot?». El agente mira la lista de cuentas y responde. Le pides que compare dos modelos; lee sus detalles de la lista en vivo, que se completa con el catálogo público [models.dev](https://models.dev). Tú no ves ninguna pantalla de ajustes.

Lo que el agente puede consultar: los ajustes activos, tus cuentas de proveedor, los modelos disponibles, el uso y el coste de la sesión y la lista de comandos. También puede activar los modos de trabajo (Caveman, Ponytail, Superpowers, Learning) y ejecutar tus comandos personalizados.

## Cuándo usarlo

No hay nada que activar. Solo recuerda que puedes preguntarle a Pando por sí mismo con palabras normales.

## Conviene saber

- **Mirar sí, tocar no.** El agente puede leer los ajustes pero no cambiarlos. No tiene forma de escribir en tu configuración con esta herramienta.
- **Los secretos siguen siendo secretos.** Las claves y contraseñas van enmascaradas; el agente solo ve que existe una y sus cuatro últimos caracteres.
- **Hay comandos que no son para el agente.** Lanzar o cancelar un objetivo, compactar la sesión y cerrar un modo te necesitan a ti a los mandos.
- Está pensada para gastar muy pocos tokens: lleva una descripción mínima y solo pide los detalles cuando hacen falta.

## Siguientes pasos

- Referencia: la lista completa de lo que puede hacer la herramienta está en [Configuración de delegación y Mesnada]({{< relref "/docs/configuration/delegation" >}}#autoservicio-del-agente-pando_setup).
- Guía: [Cambia cómo piensa y cómo habla Pando]({{< relref "/guides/working-modes" >}}) para los modos que puede activar.
- Relacionado: [Comandos slash]({{< relref "/docs/features/slash-commands" >}}).
