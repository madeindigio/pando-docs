---
title: "Pando Mayo 2026: Resumen de Funcionalidades Principales"
date: 2026-05-31
tags: ["Lanzamiento", "Funcionalidades", "Resumen"]
---

Mayo de 2026 fue un mes transformador para Pando, con más de 40 nuevas funcionalidades y mejoras implementadas. Aquí tienes una mirada completa a todo lo que se lanzó.

## Modo Objetivo (Autopiloto)

La funcionalidad más solicitada—**Modo Objetivo**—ya está disponible. Deja que Pando persiga un objetivo persistente de forma autónoma a través de múltiples turnos del agente:

```
/goal "Corregir todos los tests fallidos en el proyecto"
```

El agente itera, evalúa el progreso y continúa hasta que el objetivo se logre, se bloquee o se cancele. Incluye evaluación heurística, detección de estancamiento y límites configurables.

## Comunicación Inter-Proceso (IPC)

Un **sistema completo de IPC basado en ZeroMQ** permite que múltiples instancias de Pando se comuniquen:

- **Failover primario/secundario** con promoción automática
- **Sincronización de sesiones** entre instancias
- **Delegación hot-peer** para enrutamiento de tareas entre proyectos
- **Coordinación de escritura** asegurando consistencia de base de datos

Construido en 8 fases de implementación, esta fundación permite a Pando escalar como un sistema multi-proceso.

## Enriquecimiento de Contexto

El **enriquecimiento automático de pre-prompt** busca en tu Base de Conocimiento, índice de código y eventos pasados en paralelo:

- **Planificador heurístico** (predeterminado) para enriquecimiento rápido y determinista
- **Planificador basado en LLM** para selección de contexto más precisa
- **Filtrado por puntuación** para asegurar relevancia
- **Presupuestos configurables** por fuente de búsqueda

## Auto-Actualización

Pando ahora puede **actualizarse a sí mismo**:

```bash
pando update
```

Descarga la última release desde GitHub, verifica tu arquitectura y reemplaza atómicamente el binario. Las verificaciones de actualización en segundo plano te notifican de nuevas versiones al iniciar.

## Recortador Consciente de Contexto

Un **LLM barato** analiza tu primer mensaje para producir un perfil de contexto, clasificando el tipo de tarea y determinando qué secciones de prompt omitir. Esto ahorra tokens y mejora la calidad de respuesta.

## Mejoras en el Protocolo Agent-Client (ACP)

Grandes mejoras en ACP para integración con editores:

- **Visualización del plan** mostrando progreso de tareas en VS Code/Zed
- **Streaming de thinking** para transparencia de modelos de razonamiento
- **Modo persona limpia** para editores que gestionan sus propios prompts
- **Sobreescripciones por sesión** para modelo, persona y permisos
- **Mensajes ACP** como el proxy ACP de Claude

## API Unificada del LLM Proxy

El LLM Proxy ahora sirve **todos los proveedores a través de un único endpoint compatible con OpenAPI**, incluyendo modelos de GitHub Copilot:

```bash
pando llm-proxy
# Todos los proveedores en http://localhost:8765/v1
```

## Mejoras en Automatización de Navegador

- Soporte de **navegador Lightpanda** para automatización headless ligera
- **Correcciones en herramientas de navegador** y mejor gestión de sesiones
- **Mejoras en búsqueda híbrida** para mejor comprensión de código

## Protocolo IPC (8 Fases)

El nuevo protocolo de comunicación de instancias se construyó en 8 fases:

1. **Fase 1-2**: Configuración básica del bus y framework RPC
2. **Fase 3-4**: Sincronización de sesiones y mensajes
3. **Fase 5-6**: Ejecución de herramientas y eventos de streaming LLM
4. **Fase 7-8**: Delegación y soporte de failover

## Mejoras de Infraestructura

- **Certificados HTTPS automáticos** para `pando serve` y `pando app`
- **Cifrado AGE** para todos los parámetros de servidores MCP
- **Múltiples sesiones en segundo plano** en Web UI y Desktop
- **Mejoras en Web UI móvil** con reconexión offline
- **Mejoras en versión Windows** y soporte de claves AGE alternativas
- **Mejoras en modo no interactivo** para CI/CD

## Herramientas de Código

- **Índice de código incremental** al iniciar con watcher de archivos
- **Búsqueda por patrones** con fallback a grep
- **Auto-reparación JSON** en llamadas a herramientas
- **Mejoras en max tokens** en agentes y bucle de resumen
- **Números de línea y paginación** en herramientas grep y read

## Experiencia de Desarrollador

- **Mejoras en selector de modelo** en configuración TUI
- **Toggle de configuración de snapshot**
- **Actualización del command launcher** en Web UI
- **Escritor DB único** con múltiples instancias por proyecto
- **Sub-agentes Mesnada** con capacidad de relanzamiento

## Qué Viene

¡Junio trae aún más funcionalidades: soporte multi-proyecto para delegación, modo Ponytail YAGNI, conversión MarkItDown y mejoras mayores en la TUI!

---

*Pando es open source y está en desarrollo activo. Pruébalo en [github.com/digiogithub/pando](https://github.com/digiogithub/pando).*
