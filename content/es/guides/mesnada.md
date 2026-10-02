---
title: "Delega en subagentes con Mesnada"
shortTitle: "Delega con Mesnada"
description: "Reparte encargos a una cuadrilla de ayudantes, mira cómo trabajan a la vez y recibe sus informes en tu chat."
summary: "Divide el trabajo, ejecútalo en paralelo y reúne los resultados."
track: roots
level: advanced
weight: 12
home: true
kanji: "众"
---

Un agente es un solo par de manos. Mesnada le da a Pando una cuadrilla: ayudantes que cogen un encargo cada uno, trabajan a la vez y vuelven con un informe. En esta guía activas la cuadrilla, repartes un primer encargo, decides cómo vuelven los informes y programas un trabajo que se repite solo.

Necesitas Pando funcionando con al menos un modelo. Todo se hace desde la Web UI; la app de escritorio es igual.

## Activa la cuadrilla

Abre **Configuración** y, en **Servicios**, entra en **Mesnada**. Activa **Enabled**.

{{< shot src="images/webui/pando-webui-settings-mesnada.jpg" alt="Ajustes de Mesnada: activación, servidor y opciones del orquestador" >}}

En **Orchestrator** hay tres ajustes que importan el primer día:

- **Max parallel** es cuántos ayudantes pueden trabajar a la vez. Cinco es un buen comienzo. Más ayudantes es más velocidad, y también más gasto.
- **Default engine** es quiénes son los ayudantes. **pando** usa el propio Pando. También puedes mandar encargos a otros asistentes que tengas instalados, como **claude** o **copilot**.
- **Default model** es el modelo que usan los ayudantes cuando no dices otra cosa.

Pulsa **Guardar**.

## Pídelo en el chat

La forma más sencilla de delegar es decirlo. En una sesión, escribe algo como:

> Revisa los tres servicios de este repositorio. Usa un subagente por servicio y dame un único resumen al final.

Pando reparte el trabajo, manda a los ayudantes y sigue con lo suyo. El panel de información, a la derecha del chat, muestra un apartado **Subagentes** con los que siguen en marcha.

Los buenos encargos para delegar son los que no se pisan entre sí: leer carpetas distintas, escribir tests de módulos distintos, investigar preguntas separadas. Dos ayudantes editando el mismo fichero son dos personas escribiendo en la misma hoja.

## Reparte un encargo a mano

Abre **Orquestador** en el menú lateral. La pestaña **Mesnada Tasks** lista todos los encargos, en marcha o terminados.

{{< shot src="images/webui/pando-webui-orchestrator-tasks.jpg" alt="Orquestador con la pestaña Mesnada Tasks" >}}

Pulsa **Create Task** y rellena:

1. **Task name**: una etiqueta corta que reconozcas en la lista.
2. **Description / prompt**: qué tiene que hacer el ayudante. Escríbelo como para un compañero nuevo que no ha visto tu chat: di dónde mirar y qué esperas de vuelta.
3. **Model**: deja **Default model** o elige uno para este encargo.

{{< shot src="images/webui/pando-webui-orchestrator-create-task.jpg" alt="Diálogo Create Orchestrator Task con nombre, prompt y modelo" >}}

Pulsa **Create Task**. El encargo aparece en la lista y arranca en cuanto hay un ayudante libre.

## Decide cómo vuelven los informes

Por defecto un ayudante termina y su informe espera a que alguien lo lea. Puedes pedir a Pando que traiga el informe a tu conversación por sí mismo. Abre **Configuración > General** y baja hasta **Delegación de subagentes**.

{{< shot src="images/webui/pando-webui-settings-general-subagent-delegation.jpg" alt="Interruptores de delegación de subagentes en los ajustes generales" >}}

- **Delegación activada** es el interruptor principal.
- **Inyectar en bucle activo**: si Pando sigue trabajando cuando un ayudante termina, el informe se le entrega en el acto.
- **Reactivar bucle inactivo**: si Pando ya había parado, se despierta, lee los informes y continúa.
- **Sintetizar alternativa**: si un ayudante se olvida de escribir su conclusión, Pando redacta una breve a partir de lo que hizo.

Los números de debajo son quitamiedos. **Máx. reactivaciones** limita cuántas veces seguidas puede despertarse Pando, **Profundidad máx.** cuántos niveles de ayudantes de ayudantes se permiten y **Máx. concurrentes** cuántos informes espera a la vez.

## Aprovecha los proyectos que ya están abiertos

Si trabajas con varios proyectos, un ayudante enviado a otro proyecto puede usar el Pando que ya está abierto allí en lugar de arrancar uno nuevo cada vez. Como preguntarle a un compañero que ya está sentado en su mesa.

{{< shot src="images/webui/pando-webui-settings-general-delegation-warm-instances.jpg" alt="Ajustes de instancias activas, verificación de conclusiones y cortacircuitos" >}}

- **Reutilizar instancias activas** lo pone en marcha. **Auto-arrancar instancia activa** abre el proyecto por ti si estaba cerrado.
- **Tiempo de inactividad de instancia activa** lo vuelve a cerrar al cabo de un rato sin nada que hacer.
- **Verificación de conclusiones** es un comprobador de datos: cuando un ayudante dice «hecho» y menciona ficheros que no existen, el informe queda marcado como hecho solo en parte.
- **Cortacircuitos** impide relanzar una y otra vez un encargo que no deja de fallar, que no tiene la cuenta iniciada o al que el proveedor le dice que ha llegado al límite.

Más abajo, **Registro de eventos durable** garantiza que un informe no se pierda si Pando se reinicia a medias, y **Tareas en paralelo máximas** es el mismo límite que viste en la página de Mesnada.

{{< shot src="images/webui/pando-webui-settings-general-delegation-event-log.jpg" alt="Registro de eventos durable y límites de reparto" >}}

## Programa un trabajo que se repite

De vuelta en **Orquestador**, abre la pestaña **CronJobs** y pulsa **New CronJob**.

{{< shot src="images/webui/pando-webui-orchestrator-new-cronjob.jpg" alt="Formulario New CronJob: nombre, horario, prompt, motor, modelo y tiempo límite" >}}

1. **Name**: por ejemplo `daily-summary`.
2. **Schedule**: cuándo se ejecuta, en el formato clásico de cinco campos «minuto hora día mes día-de-la-semana». `0 9 * * 1-5` significa a las 9:00 de lunes a viernes.
3. **Prompt**: qué tiene que hacer el ayudante cada vez.
4. **Engine** y **Model**: opcionales, para usar algo distinto de lo habitual.
5. **Timeout**: cuánto puede durar, por ejemplo `5m`.
6. Deja **Enabled** activado y pulsa **Create**.

## Comprueba que funciona

Crea un encargo pequeño: nombre `hello`, prompt «Lista las carpetas de primer nivel de este proyecto y di en una línea para qué sirve cada una». Debería pasar de esperando a en marcha y a terminado en la lista **Mesnada Tasks**, y puedes abrirlo para leer su informe.

{{< under-surface >}}
Cada ayudante trabajó en su propia conversación aparte, con su propia memoria del encargo. Mesnada llevó la cola, fue arrancando ayudantes según quedaban huecos y trajo los informes de vuelta.
{{< /under-surface >}}

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| Un encargo se queda esperando | Todos los ayudantes están ocupados. Sube **Max parallel** o espera a que quede un hueco |
| Un encargo falla nada más empezar | El motor o el modelo no existen en este equipo. Revisa **Default engine** y **Default model** |
| Los informes no llegan al chat | Activa **Delegación activada** y **Reactivar bucle inactivo** |
| Un encargo se niega a relanzarse | El **Cortacircuitos** lo paró tras varios fallos. Arregla la causa y prueba más tarde |
| Los ayudantes deshacen el trabajo de otros | Los encargos se solapan. Dale a cada uno una carpeta o un fichero distinto |

## ¿Prefieres la terminal?

```toml
[Mesnada]
Enabled = true

[Mesnada.Orchestrator]
MaxParallel = 5
DefaultEngine = 'pando'

[Mesnada.Delegation]
Enabled = true
InjectIntoLiveLoop = true
ResurrectIdleLoop = true
```

Todas las opciones, incluidos los motores personalizados, están en la [referencia de delegación]({{< relref "/docs/configuration/delegation" >}}). Para la idea de fondo, lee [Delegación de agentes]({{< relref "/docs/features/agent-delegation" >}}).
