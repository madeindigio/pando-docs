---
title: Asistente de configuración
weight: 40
---

El asistente de configuración es el anfitrión que te recibe en la puerta la primera vez que abres Pando. En lugar de dejarte delante de un muro de ajustes, te hace unas pocas preguntas en orden y te deja trabajando en un par de minutos.

{{< shot src="images/webui/pando-webui-setup-assistant-scope.jpg" dark="images/webui/pando-webui-setup-assistant-scope-dark.jpg" alt="Asistente de configuración: dónde guardar los ajustes" >}}

## Qué hace por ti

Cubre lo mínimo que necesitas, y nada más:

1. **Dónde viven tus ajustes**: para todos los proyectos de este ordenador o solo para este.
2. **Qué proveedor de IA usas**: GitHub Copilot, Anthropic, OpenAI, Gemini, OpenRouter, Groq, xAI, Ollama o cualquier servicio compatible. Cada uno dice qué necesita y dónde conseguirlo.
3. **Qué modelos hacen el trabajo**: uno capaz para pensar de verdad y otro rápido y barato para recados como poner nombre a tus sesiones.
4. **Si quieres memoria**: Remembrances, el cuaderno a largo plazo de Pando y su buscador de código, que funciona en tu propia máquina.
5. **Un resumen** de lo que ha quedado configurado.

## Cómo se vive

Se abre solo cuando no hay nada configurado. Cinco pantallas cortas, una barra de progreso arriba, y **Atrás** y **Omitir** en todas. Si ya existen cuentas, se ofrece a seguir usándolas en lugar de hacerte escribir otra vez.

Iniciar sesión en GitHub Copilot no necesita clave: recibes un código corto, lo confirmas en GitHub y el asistente sigue solo. Para la memoria, comprueba si Ollama está instalado y en marcha, se ofrece a arrancarlo y descarga lo que falte con una barra de progreso.

Puedes salir en cualquier momento con **Cancelar asistente**, el botón de cerrar o `Esc`. No se pierde nada, y las pantallas de ajustes de siempre siguen ahí.

## Cuándo usarlo

- La primera vez que abres Pando.
- Cuando empiezas un proyecto que necesita cuentas o modelos propios.
- Siempre que quieras rehacer lo básico sin rebuscar en los ajustes: la barra amarilla de arriba del chat tiene un botón **Setup assistant**.

## Conviene saber

- El asistente forma parte de la Web UI y de la app de escritorio. En la interfaz de terminal, proveedores y modelos se configuran desde la pantalla de ajustes.
- El paso de la memoria es opcional y puede hacerse más tarde.
- Pando nunca instala nada en tu máquina sin preguntar antes.

## Siguientes pasos

- Guía: [Conecta tus cuentas de IA y elige tus modelos]({{< relref "/guides/setup-providers-models" >}}), con capturas de cada paso.
- Referencia: [Configuración]({{< relref "/docs/configuration" >}}).
- Relacionado: [Memoria persistente]({{< relref "/docs/features/persistent-memory" >}}), [GitHub Copilot Auth]({{< relref "/docs/features/copilot-auth" >}}).
