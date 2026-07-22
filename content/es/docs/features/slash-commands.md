---
title: Comandos Slash
weight: 18
---

Los comandos slash proporcionan acceso rápido a las funcionalidades de Pando sin salir de la interfaz de chat. Escribe `/` al inicio de un input vacío para ver los comandos disponibles.

## Cómo Usar los Comandos Slash

### TUI (Interfaz de Usuario en Terminal)

Escribe `/` en el input del chat. Aparece un diálogo con búsqueda fuzzy que muestra todos los comandos disponibles organizados por categoría. Usa las flechas o escribe para filtrar, luego presiona Enter para seleccionar.

### Web UI

Escribe `/` en el input del chat. Los comandos aparecen en un dropdown de autocompletado que se filtra mientras escribes.

### ACP (Integración con Editor)

Escribe `/` en el panel de chat del editor. Los comandos están disponibles en VS Code, Zed y JetBrains a través del Agent Client Protocol.

### CLI (No Interactivo)

Usa flags en lugar de comandos slash:

```bash
pando --goal "Corregir tests"           # equivalente a /goal
pando --goal "Refactorizar auth" --model copilot.gpt-5.4
```

---

## Comandos del Modo Objetivo

| Comando | Descripción |
|---------|-------------|
| `/goal <objetivo>` | Iniciar modo objetivo autónomo con un objetivo persistente |
| `/autopilot <objetivo>` | Alias para `/goal` |
| `/goal-status` | Mostrar el estado del objetivo actual (progreso, iteraciones, tiempo transcurrido) |
| `/goal-cancel` | Cancelar el objetivo en ejecución |

El modo objetivo permite que Pando trabaje de forma autónoma a través de múltiples turnos sin requerir input del usuario después de cada paso. Ver [Modo Objetivo](/docs/features/goal-mode) para detalles completos.

---

## Comandos de Gestión de Sesiones

| Comando | Descripción |
|---------|-------------|
| `/compact` | Crear un resumen compacto manual para la sesión actual (libera tokens) |
| `/summarize` | Alias para `/compact` |
| `/db-compact` | Compactar la base de datos (SQLite VACUUM) para recuperar espacio libre |

**`/compact`** resume el historial de la conversación para liberar tokens del contexto. Usa esto cuando la sesión sea larga y quieras continuar sin crear una nueva sesión.

**`/db-compact`** ejecuta SQLite VACUUM en la base de datos de Pando para recuperar espacio en disco de registros eliminados. Es útil después de un uso prolongado o después de limpiar sesiones antiguas.

---

## Comandos de Calidad de Código

### Modo Ponytail

Ponytail es un modo de "desarrollador senior perezoso" que aplica principios YAGNI (You Aren't Gonna Need It) a las sugerencias de código.

| Comando | Descripción |
|---------|-------------|
| `/ponytail lite` | Habilitar modo YAGNI lite - sugiere alternativas más simples |
| `/ponytail full` | Habilitar modo YAGNI full - más agresivo con la simplicidad |
| `/ponytail ultra` | Habilitar modo YAGNI ultra - máxima aplicación de simplicidad |
| `/ponytail off` | Desactivar modo ponytail |

### Modo Caveman

Caveman reduce la verbosidad de la salida para ahorrar tokens de salida manteniendo código, comandos y errores exactos.

| Comando | Descripción |
|---------|-------------|
| `/caveman lite` | Eliminar relleno y repeticiones. Oraciones normales, menos de ellas |
| `/caveman full` | Breve por defecto. Conclusiones y fragmentos, sin explicación no solicitada |
| `/caveman ultra` | Máxima brevedad. Solo la respuesta, nada más |
| `/caveman-finish` | Desactivar caveman y volver a la salida normal |

{{< callout type="info" >}}
Caveman solo restringe la expresión. Nunca reduce los requisitos de razonamiento, uso de herramientas, pruebas o verificación. Pide detalles en cualquier momento y los obtendrás completos.
{{< /callout >}}

---

## Comandos de Flujo de Trabajo

### Modo Superpowers

Superpowers enforce un flujo de trabajo de desarrollo disciplinado: planificar primero, verificar siempre.

| Comando | Descripción |
|---------|-------------|
| `/superpowers [objetivo]` | Habilitar el flujo de trabajo de desarrollo disciplinado |
| `/superpowers-finish` | Verificar, reportar y volver al modo normal |

Cuando está activo, el trabajo sigue este ciclo:
1. Entender antes de diseñar
2. Diseñar, luego obtener aprobación
3. Planificar trabajo largo explícitamente
4. Implementar con tests primero, en incrementos pequeños
5. Verificar con evidencia, no con afirmaciones
6. Revisar antes de declarar listo

### Modo Learning

El modo Learning hace que Pando trabaje como un aprendiz y documentador deliberado.

| Comando | Descripción |
|---------|-------------|
| `/learning [enfoque]` | Habilitar modo aprendiz: leer más la KB, documentar descubrimientos, hacer preguntas |
| `/learning-finish` | Consolidar aprendizajes en KB/memoria y volver al modo normal |

Cuando está activo, Pando:
- Busca en la base de conocimientos antes de actuar
- Pregunta al usuario en lugar de adivinar
- Captura descubrimientos no triviales como documentación
- Mantiene la documentación existente honesta (actualiza obsoletos, marca superados)

---

## Comandos de Gestión de Proyectos

| Comando | Descripción |
|---------|-------------|
| `/improve-agents-md [orientación]` | Crear o reforzar AGENTS.md con reglas obligatorias de operación para agentes IA |

---

## Comandos de Seguridad

### Vulnerability Hunter

Flujo de auditoría de seguridad adversarial portado desde [VulnHunter de Capital One](https://github.com/capitalone/VulnHunter). Estos comandos ejecutan flujos de seguridad autocontenidos como turnos normales del agente — se transmiten, orientan y persisten como cualquier otro mensaje.

| Comando | Descripción |
|---------|-------------|
| `/vulnhunt [alcance]` | Rastrear input de atacante hasta sinks y reportar vulnerabilidades explotables |
| `/vulnhunter-fix [hallazgo]` | Remediación basada en tests: exploit → test fallido → fix → verificación |
| `/vulnhunt-fix-verify [hallazgos]` | Verificación independiente de solo lectura de fixes de seguridad reclamados |

**`/vulnhunt`** ejecuta una auditoría de seguridad completa: recon → caza paralela por clase → verificación de explotabilidad → refutación adversarial → reporte filtrado por capacidades. Los hallazgos se persisten en la base de conocimientos. Pasa un alcance opcional (subdirectorio, paquete o énfasis) para limitar la auditoría.

**`/vulnhunter-fix`** realiza remediación basada en tests de vulnerabilidades confirmadas: crea una prueba de exploit, escribe un test de seguridad fallido (RED), implementa la fix (GREEN) y verifica que el exploit esté bloqueado sin regresiones.

**`/vulnhunt-fix-verify`** es una verificación de solo lectura que comprueba los fixes reclamados contra el código real, emitiendo un veredicto por hallazgo: FIXED, PARTIAL, NOT_FIXED o INCONCLUSIVE.

{{< callout type="info" >}}
Los comandos de seguridad no son modos persistentes — cada ejecución es un flujo de trabajo autocontenido. Los hallazgos se almacenan en la base de conocimientos y pueden ser referenciados por ejecuciones posteriores de fix o verify.
{{< /callout >}}

---

## Comandos Personalizados

Pando soporta comandos slash personalizados mediante archivos markdown. Coloca archivos `.md` en:

- **Comandos del proyecto**: `<data-dir>/commands/` (se muestran como `project:nombre-comando`)
- **Comandos de usuario**: `~/.config/pando/commands/` o `~/.pando/commands/` (se muestran como `user:nombre-comando`)

Los comandos personalizados aparecen en la paleta de comandos junto con los incorporados.

---

## Categorías de Comandos

Los comandos se organizan en categorías en la paleta de comandos:

- **General**: Goal, compact, db-compact
- **Calidad de Código**: Modos Ponytail y Caveman
- **Flujo de Trabajo**: Modos Superpowers y Learning
- **Proyecto**: Gestión de AGENTS.md
- **Seguridad**: Vulnerability Hunter (vulnhunt, vulnhunter-fix, vulnhunt-fix-verify)

{{< callout >}}
Los comandos slash funcionan en todas las interfaces de Pando (TUI, Web UI, ACP). La paleta de comandos proporciona búsqueda fuzzy para encontrar rápidamente el comando que necesitas.
{{< /callout >}}
