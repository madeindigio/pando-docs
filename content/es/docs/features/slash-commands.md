---
title: Comandos Slash
weight: 18
---

Los comandos slash son los botones del mando a distancia de Pando. En lugar de explicar lo que quieres con una frase larga, escribes `/` y una palabra, y Pando cambia de modo o arranca toda una rutina. Escribe `/` con el cuadro de mensaje vacío para verlos todos.

{{< shot src="images/webui/pando-webui-chat-slash-commands.jpg" alt="Menú de comandos slash en el chat" >}}

## Qué hace por ti

- **Una palabra en lugar de un párrafo.** `/compact` dice «resume esta conversación para que tengamos sitio para seguir».
- **Igual en todas partes.** La Web UI, la app de escritorio, la interfaz de terminal y el panel de asistente de tu editor (Zed, VS Code, JetBrains) los entienden.
- **Fáciles de encontrar.** El menú filtra mientras escribes, así que basta con recordar las primeras letras.
- **Ampliables.** Un fichero de texto en la carpeta adecuada se convierte en un comando nuevo.

## Los comandos, según lo que quieres hacer

### Dejar que Pando trabaje solo

| Comando | Qué ocurre |
|---|---|
| `/goal <objetivo>` | Pando sigue trabajando hacia ese objetivo, turno tras turno, sin esperarte después de cada paso |
| `/autopilot <objetivo>` | Lo mismo que `/goal` |
| `/goal-status` | Muestra cómo va el objetivo: avance, rondas, tiempo empleado |
| `/goal-cancel` | Detiene el objetivo |

Más en [Goal Mode]({{< relref "/docs/features/goal-mode" >}}).

### Mantener ligera una conversación larga

| Comando | Qué ocurre |
|---|---|
| `/compact` | Sustituye la conversación hasta ahora por un resumen y deja sitio para continuar. Úsalo cuando una sesión se alarga y no quieres empezar de cero |
| `/summarize` | Lo mismo que `/compact` |
| `/db-compact` | Ordena el almacén de Pando en disco y recupera el espacio de las sesiones borradas |

Más en [Compactación de sesión]({{< relref "/docs/features/session-compaction" >}}) y [Compactación de la base de datos]({{< relref "/docs/features/db-compact" >}}).

### Cambiar cómo habla Pando

| Comando | Qué ocurre |
|---|---|
| `/caveman lite` | Quita el relleno. Frases normales, pero menos |
| `/caveman full` | Breve por defecto: conclusiones, sin explicaciones que no pediste |
| `/caveman ultra` | La respuesta y nada alrededor |
| `/caveman-finish` | Vuelta a lo normal |

Caveman solo acorta las palabras. Pando piensa, prueba y comprueba exactamente igual que antes, y te da todo el detalle cuando lo pides.

### Cambiar cómo trabaja Pando

| Comando | Qué ocurre |
|---|---|
| `/ponytail lite` · `full` · `ultra` | El «desarrollador sénior perezoso»: Pando prefiere la solución más simple y se resiste a construir lo que no vas a necesitar, con más firmeza en cada nivel |
| `/ponytail off` | Vuelta a lo normal |
| `/superpowers [objetivo]` | Una rutina disciplinada: entender, diseñar y pedir tu aprobación, planificar, construir en pasos pequeños y probados, demostrar que funciona, revisar |
| `/superpowers-finish` | Comprueba, informa y vuelve a lo normal |
| `/learning [enfoque]` | Pando se comporta como un aprendiz cuidadoso: lee primero las notas del proyecto, pregunta en lugar de suponer y apunta lo que descubre |
| `/learning-finish` | Archiva lo aprendido en las notas del proyecto y vuelve a lo normal |

Más en [Ponytail]({{< relref "/docs/features/ponytail" >}}), [Modo Superpowers]({{< relref "/docs/features/superpowers-mode" >}}) y [Modo aprendizaje]({{< relref "/docs/features/learning-mode" >}}).

### Cuidar el proyecto y enseñar a Pando

| Comando | Qué ocurre |
|---|---|
| `/improve-agents-md [indicaciones]` | Crea o refuerza `AGENTS.md`, las normas de la casa que todo agente de IA debe seguir en este proyecto |
| `/evaluate` | Puntúa una sesión con el evaluador de automejora (la actual, salvo que indiques otra) |
| `/feedback good` · `/feedback bad` | Le dice a Pando cómo fue la sesión, por encima de su propia nota |

### Buscar agujeros de seguridad

Una rutina de auditoría de seguridad adaptada de [VulnHunter, de Capital One](https://github.com/capitalone/VulnHunter). Cada ejecución es un trabajo puntual, no un modo que se queda activo, y sus hallazgos se guardan en las notas del proyecto para que el siguiente comando los recoja.

| Comando | Qué ocurre |
|---|---|
| `/vulnhunt [alcance]` | Hace de atacante: sigue los datos no fiables por el código, intenta demostrar que cada debilidad es real, intenta refutarla e informa de lo que sobrevive. Dale una carpeta o un enfoque para acotar la búsqueda |
| `/vulnhunter-fix [hallazgo]` | Corrige una debilidad confirmada por el camino cuidadoso: reproduce el ataque, escribe una prueba que falla, corrige y comprueba que el ataque ya no funciona |
| `/vulnhunt-fix-verify [hallazgos]` | Una segunda opinión que no cambia nada: contrasta las correcciones con el código y da un veredicto a cada una (FIXED, PARTIAL, NOT_FIXED o INCONCLUSIVE) |

## Tus propios comandos

Escribe las instrucciones en un fichero Markdown y déjalo en una carpeta de comandos. Aparece en el menú junto a los integrados, con la etiqueta `project:` si vive con el proyecto o `user:` si vive en tu carpeta personal. Los nombres de las carpetas están en la [referencia]({{< relref "/docs/configuration/webui" >}}).

## Conviene saber

- En la interfaz de terminal el menú es una lista con buscador agrupada por categorías (General, Code Quality, Workflow, Project, Security); en la Web UI es un desplegable sobre el cuadro de mensaje.
- Fuera de un chat, en modo de una línea, las opciones hacen el trabajo: `pando --goal "Fix tests"` equivale a `/goal`.
- `/` solo abre el menú al principio de un mensaje vacío. Para mencionar un fichero, usa `@`.

## Siguientes pasos

- Guías: [Oriéntate en la Web UI]({{< relref "/guides/webui-tour" >}}), [Goal Mode]({{< relref "/guides/goal-mode" >}}), [Cambia cómo piensa y habla Pando]({{< relref "/guides/working-modes" >}}).
- Referencia: [carpetas de comandos propios]({{< relref "/docs/configuration/webui" >}}).
