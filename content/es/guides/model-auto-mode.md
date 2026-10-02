---
title: "Deja que Pando elija el modelo adecuado para cada mensaje"
shortTitle: "Modo automático"
description: "Monta un pequeño recepcionista que manda el trabajo difícil a tu mejor modelo y las preguntas rápidas a uno barato."
summary: "El trabajo difícil al modelo potente, las preguntas rápidas al barato."
track: roots
level: intermediate
weight: 15
---

Al terminar esta guía tendrás **Auto** en la lista de modelos. Cuando lo elijas, Pando leerá cada mensaje y lo mandará al modelo que hayas decidido para ese tipo de trabajo. Necesitas al menos dos modelos configurados (mira [Conecta tus cuentas de IA]({{< relref "/guides/setup-providers-models" >}})) y [Ollama](https://ollama.com) 0.35 o posterior.

## Contrata al recepcionista

Quien lee cada mensaje y decide es un modelo muy pequeño y muy rápido llamado *modelo de decisión*. Funciona en tu equipo y tiene [su propia guía]({{< relref "/guides/decision-model" >}}), con sus otros usos. Descárgalo una vez desde una terminal:

```bash
ollama pull tev1:0.8b
```

Pando no instala Ollama por ti. El modelo también se puede descargar desde la página de ajustes del paso siguiente, con el botón **Descargar**.

## Dile a Pando dónde se sienta el recepcionista

Abre **Configuración > Modelo de decisión**.

{{< shot src="images/webui/pando-webui-settings-decision-model.jpg" alt="Ajustes del modelo de decisión: proveedor, modelo y prueba de conexión" >}}

1. En **Proveedor** elige **Ollama (local)**.
2. Deja **URL base** vacía salvo que tu Ollama viva en un sitio poco habitual.
3. En **Modelo de decisión**, pulsa **Cargar modelos** y elige **tev1:0.8b**.
4. Pulsa **Probar conexión**. Todas las líneas del informe deberían salir en verde.

**Mantener cargado** es cuánto tiempo se queda el recepcionista en el mostrador entre mensaje y mensaje (30 minutos está bien). **Tiempo de espera (ms)** es cuánto espera Pando una decisión antes de rendirse; `0` usa un valor razonable. Guarda.

## Activa el modo automático

Abre **Configuración > Auto mode**.

{{< shot src="images/webui/pando-webui-settings-auto-mode.jpg" alt="Ajustes de Auto mode con los dos interruptores principales y el estado del modelo de decisión" >}}

- **Enable Auto mode** añade **Auto** como primera entrada de todas las listas de modelos.
- **Use Auto by default** hace que las sesiones nuevas empiecen con Auto ya elegido.

El recuadro **Modelo de decisión** debería decir **Operativo**. Si no, **Configurar** te lleva de vuelta al paso anterior.

## Describe tus tipos de trabajo

Baja hasta **Routes**. Una ruta es una regla: «este tipo de mensaje va a este modelo». Pulsa **Add route**, o **Add starter routes** para partir de un juego ya preparado.

{{< shot src="images/webui/pando-webui-settings-auto-mode-routes.jpg" alt="Dos rutas, cada una con nombre, descripción, modelo principal y modelo de respaldo" >}}

En cada ruta:

1. Ponle un nombre corto: `quick`, `implementation`, `planning`.
2. Describe el trabajo en una frase, con verbos: «Escribir, modificar o arreglar código en uno o varios ficheros, incluidos los tests».
3. Elige el **Primary model**.

Con tres a cinco rutas hay de sobra. El recepcionista decide mejor entre pocas puertas bien distintas que entre veinte parecidas. Las flechas cambian el orden, que solo importa en caso de empate, y el interruptor junto al nombre aparca una ruta sin borrarla.

## Añade un plan B

Debajo de cada ruta, **Add fallback** te deja nombrar hasta dos modelos de repuesto. Si el primero está ocupado, caído o ha llegado a su límite, Pando reintenta el mismo mensaje con el siguiente y te avisa.

{{< shot src="images/webui/pando-webui-settings-auto-mode-routes-fallbacks.jpg" alt="Una ruta con un modelo de respaldo" >}}

## Ensaya antes de la función

Al final está el **Playground**. Escribe un mensaje como lo harías en el chat y pulsa **Route**. No se envía nada a ningún modelo de chat, así que no cuesta nada.

{{< shot src="images/webui/pando-webui-settings-auto-mode-playground-result.jpg" alt="Resultado del Playground: la ruta ganadora y la puntuación de cada una" >}}

Las barras muestran lo seguro que está el recepcionista de cada ruta. Si gana la que esperabas, bien. Si dos rutas puntúan parecido, sus descripciones se solapan: reescríbelas para que se distingan con claridad.

Pulsa **Guardar**.

## Usa Auto en el chat

Abre la lista de modelos de la caja del chat y elige **Auto**. Envía un mensaje. Mientras Pando trabaja, la lista muestra `Auto · <modelo elegido>` y una línea en el chat te dice la elección:

```
Auto: implementation → anthropic.claude-sonnet-4 (p=0.93, 38 ms via ollama/tev1:0.8b)
```

Al elegir un modelo concreto, Auto se desactiva en esa sesión hasta que lo vuelvas a seleccionar.

## Comprueba que funciona

En una sesión con Auto, envía dos mensajes muy distintos: una pregunta rápida («¿qué significa este error?») y un trabajo de verdad («añade tests a esta función»). La línea del chat debería nombrar una ruta diferente para cada uno.

{{< under-surface >}}
La elección se hace una vez por mensaje. Mientras Pando da sus pasos para ese mensaje, el modelo no cambia. Si ninguna ruta encaja con claridad, el mensaje va a tu modelo de programación habitual.
{{< /under-surface >}}

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Todo va a tu modelo habitual | Abre el Playground. Si la mejor ruta puntúa bajo, afina las descripciones o baja **Threshold** en **Routing tuning** |
| «Upgrade Ollama to >= 0.35» | Actualiza Ollama |
| La lista de modelos de decisión está vacía | Ejecuta `ollama pull tev1:0.8b` y pulsa **Cargar modelos** |
| El primer mensaje va lento | El recepcionista se está despertando. Los siguientes van rápido |
| «route has no usable model» | Los modelos de esa ruta son desconocidos, están desactivados o se quedan pequeños para la conversación |
| Respuestas cortas como «vale, sigue» no encajan en ninguna ruta | Es lo esperado; se quedan en tu modelo habitual |

## ¿Prefieres la terminal?

En la interfaz de terminal, **Auto** es la primera entrada del diálogo de modelos. En los editores conectados por ACP es el primer modelo de la lista. `pando doctor` comprueba que el modelo de decisión responde y que cada ruta apunta a un modelo que existe.

Las rutas también se pueden escribir a mano en el fichero de configuración. Mira la [referencia del modo automático]({{< relref "/docs/configuration/auto-mode" >}}), y [Modo automático de modelos]({{< relref "/docs/features/model-auto-mode" >}}) para la idea de fondo.
