---
title: Autenticación con GitHub Copilot
weight: 34
---

Si tienes una suscripción de GitHub Copilot, Pando puede usar sus modelos. Inicias sesión con tu cuenta de GitHub y ahí acaba la configuración: no hay clave que crear, copiar ni renovar. Es como usar tu carné del gimnasio en otro local de la misma cadena.

## Qué hace por ti

- **Sin factura nueva.** Usas lo que tu plan de Copilot ya incluye.
- **Sin claves que cuidar.** Das permiso a Pando una vez, en la propia página de GitHub.
- **También los modelos de tu empresa.** Si tu organización ha añadido modelos propios a Copilot (lo que GitHub llama BYOK, «trae tu propia clave»), aparecen en la lista de modelos de Pando igual que en VS Code. Con una licencia Business suelen ser veinte modelos o más.
- **Se usan en todo Pando.** En el chat, en los subagentes y, a través del [proxy local]({{< relref "/docs/features/llm-proxy" >}}), en tus otras herramientas.

## Cómo se nota en el día a día

Pulsas **Login with GitHub**, GitHub te enseña una página, escribes un código corto y aceptas. De vuelta en Pando, el selector de modelos tiene entradas que empiezan por `copilot.`. Eliges una y trabajas como siempre.

## Cuándo usarlo

Úsalo si tú o tu empresa ya pagáis Copilot. Es la forma más rápida de tener buenos modelos en Pando.

Los modelos que ves dependen de tu plan: el gratuito tiene un conjunto pequeño, Pro y Pro+ tienen más, y las licencias Business o Enterprise añaden los de la organización.

## Conviene saber

- El inicio de sesión usa el flujo estándar de GitHub para dispositivos. Tu contraseña de GitHub no pasa por Pando.
- El pase que devuelve GitHub se guarda en tu máquina, en tu perfil de Pando.
- GitHub Enterprise (la dirección de GitHub propia de tu empresa) está soportado.
- Si no aparecen los modelos de tu organización, cerrar sesión y volver a iniciarla suele arreglarlo.

## Siguientes pasos

- Guía: [Usa Pando desde tu editor y otras aplicaciones]({{< relref "/guides/editors-and-other-apps" >}}) recorre el inicio de sesión.
- Referencia: [comandos de inicio de sesión y planes]({{< relref "/docs/configuration/providers" >}}).
- Relacionado: [Proxy de Modelos Local]({{< relref "/docs/features/llm-proxy" >}}), [Modo automático de modelos]({{< relref "/docs/features/model-auto-mode" >}}).
