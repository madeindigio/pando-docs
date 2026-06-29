---
title: Preguntas Interactivas al Usuario
weight: 22
---

La herramienta `ask_user_question` permite al agente pausar y hacer preguntas estructuradas y seleccionables al usuario a mitad de una tarea—similar al patrón interactivo de Claude Code.

## Cómo Funciona

1. El agente llama a `ask_user_question` con preguntas estructuradas
2. En TUI/Web UI: aparece un diálogo interactivo
3. En ACP: las preguntas se formatean como texto numerado y el agente pausa
4. El usuario responde seleccionando opciones o escribiendo texto libre
5. El agente recibe las respuestas y continúa

## Características

- **1-4 preguntas** por llamada
- **2-4 opciones** por pregunta
- Soporte de **multi-selección**
- Opción de **texto libre "Otro"** incluida automáticamente
- **Cabeceras cortas** (≤12 chars) mostradas como chips
- **Pantalla de resumen** antes de confirmar
- **Seguro reconexión**: preguntas pendientes sobreviven la reconexión

## Ejemplo

El agente podría preguntar:

```
Pregunta 1/2: Elección de Base de Datos
 ○ PostgreSQL
 ● SQLite
 ○ MySQL
 ○ Otro

Pregunta 2/2: Preferencia de ORM
 ○ GORM
 ○ sqlx
 ○ Otro
```

## Configuración

Desactiva la herramienta completamente:

```toml
[InternalTools]
AskUserQuestionDisabled = true
```

## Comportamiento por Interfaz

| Interfaz | Comportamiento |
|----------|----------------|
| TUI | Diálogo modal con navegación por teclado |
| Web UI | Diálogo overlay con soporte ratón/teclado |
| ACP | Texto formateado, agente pausa hasta respuesta |
| API | Respuesta estructurada vía endpoint API |

{{< callout >}}
El agente usa esta herramienta cuando necesita clarificación en decisiones de implementación, arquitectura o requisitos ambiguos. Es más estructurado que la entrada de texto libre.
{{< /callout >}}
