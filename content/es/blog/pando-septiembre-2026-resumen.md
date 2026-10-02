---
title: "Pando Septiembre 2026: versión 1.0, sandbox por defecto y nueva imagen"
date: 2026-09-30
tags: ["Release", "Features", "Roundup", "Seguridad", "Escritorio", "Web UI", "Modelos"]
---

Septiembre ha sido el mes en que Pando ha llegado a la **versión 1.0**. Alrededor de ese hito han llegado los cambios que notas nada más abrirlo: una interfaz rediseñada, un asistente de configuración para el primer arranque y un sandbox que protege tu máquina sin pedirte que configures nada.

## Pando 1.0

Pando 1.0 se publicó el 25 de septiembre, con una nueva identidad visual en el terminal, la Web UI, la app de escritorio y esta web. La historia de la nueva marca está en [Pando v1: nueva identidad]({{< relref "/blog/pando-v1-identidad-de-marca" >}}).

Las versiones ahora van firmadas. El instalador de macOS está firmado y notarizado, y el binario de Windows lleva una firma de confianza, así que ambos se abren sin avisos de seguridad. Descárgalos desde la [última versión](https://github.com/digiogithub/pando/releases/latest).

## Un sandbox, activado por defecto

Los comandos que el agente ejecuta en tu máquina quedan ahora confinados a tu proyecto en **Linux y macOS**, sin contenedores y sin instalar nada.

- Un comando solo puede escribir en tu proyecto, en las carpetas temporales y en las cachés habituales de dependencias.
- La configuración de Pando y tus hooks de git son de solo lectura para el agente.
- Tus claves de API y tokens se eliminan del entorno que ve el shell del agente.

Hay además una ventaja práctica. Como un comando confinado puede hacer poco daño, Pando deja de pedir permiso para cada comando de shell corriente. Los peligrosos, como `sudo`, siguen preguntando. Cuando un comando necesita de verdad salir del sandbox, el agente pide ejecutarlo una vez fuera, y solo tú puedes aprobarlo.

Desde Ajustes puedes elegir un modo más estricto para los repositorios en los que no confías, o desactivar el sandbox. Un repositorio que clonas puede hacer tu sandbox más estricto, pero nunca más laxo. Los detalles, en [Sandbox de comandos]({{< relref "/docs/features/sandbox" >}}).

## Nueva imagen para la Web UI y la app de escritorio

La Web UI se ha rediseñado desde cero para que se sienta como una aplicación nativa.

- **Temas**: claro, oscuro o según tu sistema, cuatro familias de color y color de acento a elegir.
- **Ventana propia**: la app de escritorio dibuja su propia barra de título, así que el contenido usa toda la ventana. En Linux y Windows hay un icono en la bandeja del sistema.
- **Chat simple en la misma ventana**: la vista simple vive ahora junto a la completa, y Pando recuerda cuál usas.
- **Tu versión, a la vista**: el panel de información del chat y los ajustes muestran qué versión usas y cuándo hay una más nueva.
- **Ajustes que no se pierden**: al salir de una página de ajustes con cambios sin guardar, pregunta antes.
- **Una ventana por proyecto** en la app de escritorio, cada una sobre su carpeta.

En Linux, cuando falta una biblioteca que la ventana necesita, Pando dice ahora cuál es y cómo instalarla. En macOS, al abrir Pando desde el Dock arranca en tu carpeta personal con las mismas herramientas que encuentra tu terminal.

Más en [Web-UI y PWA]({{< relref "/docs/features/web-ui" >}}) y [Aplicación de Escritorio Nativa]({{< relref "/docs/features/desktop-app" >}}).

## Un asistente para el primer arranque

Abre Pando por primera vez en la Web UI o en la app de escritorio y un asistente te lleva por cuatro decisiones: dónde guardar tus ajustes, qué proveedor de IA, qué modelos, y si activar la memoria y la búsqueda en el código.

Con GitHub Copilot no hay nada que pegar: introduces un código en GitHub y el asistente continúa solo. Para la memoria, detecta si Ollama está instalado, te ayuda a instalarlo o arrancarlo, y descarga los modelos con una barra de progreso.

Puedes cancelar en cualquier paso y configurarlo a mano, como hasta ahora. Consulta [Asistente de configuración]({{< relref "/docs/features/setup-assistant" >}}).

## Auto: el modelo adecuado para cada mensaje

Selecciona **Auto** como modelo y Pando elige en cada mensaje. Describes unos pocos tipos de trabajo, como preguntas rápidas, implementación y planificación, y asignas un modelo a cada uno. Un modelo muy pequeño y rápido lee el mensaje y elige la ruta.

Tu modelo más potente hace el trabajo difícil y uno barato o local responde las preguntas rápidas. Pando muestra qué modelo ha elegido cada vez, reintenta con un modelo de respaldo si un proveedor falla, y usa tu modelo habitual cuando ninguna ruta encaja. Un banco de pruebas en los ajustes te deja probar un mensaje contra tus rutas antes de confiar en ellas.

Viene desactivado por defecto. Consulta [Modo automático de modelos]({{< relref "/docs/features/model-auto-mode" >}}).

## Volver a una versión anterior

`pando update` acepta ahora una versión:

```bash
pando update v1.1.1
```

Instala exactamente esa versión, aunque sea anterior. Si una actualización no te funciona, volver atrás es un solo comando. Consulta [Auto-Actualización]({{< relref "/docs/features/self-update" >}}).

## Auto-mejora que puedes revisar

El sistema de auto-mejora se ha rehecho para que cumpla su función y para que tú mandes sobre él.

Pando puntúa por su cuenta cada sesión terminada, sin coste: si tuviste que corregir al agente, si hubo errores de herramientas, cuántos tokens costó. Puedes valorar una sesión tú con `/feedback good` o `/feedback bad`. En las sesiones que fueron claramente bien o mal, un modelo juez puede proponer una regla corta para el futuro.

Esas reglas son ficheros que lees, editas y apruebas. No se añade nada a tus prompts sin tu aprobación, y las reglas que no ayudan se retiran. `pando evaluator doctor` te dice con palabras claras si el ciclo está en marcha y por qué no. Consulta [Sistema de Auto-Mejora]({{< relref "/docs/features/self-improvement" >}}).

## Memoria que sigue a la pregunta

Pando añade ahora a cada mensaje los recuerdos relacionados con lo que preguntas, en lugar de un conjunto fijo. El resto del prompt se mantiene estable entre mensajes, lo que permite a los proveedores reutilizar su caché: las sesiones largas cuestan menos y responden antes.

## Diagnóstico remoto, cuando tú lo pides

Cuando algo falla, puedes activar el diagnóstico remoto, reproducir el problema y dar a los mantenedores un ID de depuración aleatorio. Con él encuentran tus registros; tú no pegas nada.

Viene desactivado por defecto. Tu código, tus conversaciones y tus claves no se envían nunca. Consulta [Diagnóstico remoto]({{< relref "/docs/features/remote-diagnostics" >}}).

## Pando dentro de tu propia aplicación web

Pando ya hablaba AG-UI, el protocolo que hay detrás de CopilotKit y kits parecidos. En septiembre ha quedado listo para aplicaciones reales:

- **Perfiles de agente**: varios agentes con nombre desde el mismo Pando, cada uno con su modelo, persona y herramientas.
- **Conversaciones que sobreviven** a una recarga de página o a un reinicio.
- **Ejecuciones que siguen adelante** cuando el navegador se desconecta, y se retoman donde estaban.
- **Un solo token que configurar**, que se conserva entre reinicios.

Consulta [AG-UI para aplicaciones web]({{< relref "/docs/features/agui" >}}).

## También en septiembre

- **Navegador Obscura**: un navegador headless pequeño y rápido que puedes elegir para la automatización de navegador, muy adecuado para servidores y CI. Consulta [Automatización de Navegador]({{< relref "/docs/features/browser-automation" >}}).
- **Extensiones para organizaciones**: las extensiones pueden ahora aportar ajustes gestionados y bloquearlos, conectar tu proveedor de identidad y ocultar partes de la interfaz. Consulta [Extensiones]({{< relref "/docs/features/extensions" >}}).
- **Inicio de sesión en proveedores**: Anthropic y Gemini usan una clave de API; GitHub Copilot usa tu sesión de GitHub. El proveedor Antigravity se ha retirado.
- **Xcode 27**: Pando funciona como agente en el nuevo Xcode.
- **Tamaños de contexto correctos** para los modelos servidos por proveedores compatibles con OpenAI, de modo que las conversaciones largas se compactan en el momento adecuado.
- **Design Studio**: una interfaz más clara para crear y previsualizar diseños.
- **Base de conocimiento**: los documentos conservan los campos extra de front matter que añadas, y la base de conocimiento se puede escribir y consultar por la API REST.

### Un cambio que requiere acción

Si usas Pando como **servidor MCP por HTTP**, cada petición necesita ahora un token de acceso, también en tu propia máquina. En `localhost` Pando crea uno por ti y lo muestra al arrancar. Los clientes por `stdio` no se ven afectados. Consulta [MCP]({{< relref "/docs/mcp" >}}).

## Qué viene

Ya están llegando los espacios de trabajo de proyecto como pestañas dentro de una sola ventana, un script de instalación que cubre Linux y macOS, y la selección automática de persona, que comparte el modelo de decisión con el modo Auto.

---

*Pando es código abierto y está en desarrollo activo. Pruébalo en [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
