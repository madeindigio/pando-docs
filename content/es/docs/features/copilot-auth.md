---
title: Autenticación con GitHub Copilot
weight: 34
---

Pando se integra con GitHub Copilot, permitiéndote usar modelos de Copilot a través del LLM Proxy y el sistema de agentes.

## Iniciar Sesión

```bash
# Login con device flow (abre navegador)
pando auth copilot login

# Para GitHub Enterprise
pando auth copilot login --enterprise-url https://github.mycompany.com

# Imprimir URL/código sin abrir navegador
pando auth copilot login --no-browser
```

## Estado

```bash
pando auth copilot status
```

## Cerrar Sesión

```bash
pando auth copilot logout
```

## Usar Modelos de Copilot

Una vez autenticado, los modelos de Copilot están disponibles como:

```bash
# En modo agente
pando --model copilot.gpt-4.1 -p "Explica este código"

# En LLM Proxy
pando llm-proxy
# Conecta herramientas a http://localhost:8765/v1
```

## Disponibilidad de Modelos

Los modelos de Copilot dependen de tu nivel de suscripción:

| Nivel | Modelos Disponibles |
|-------|---------------------|
| Gratis | Modelos limitados |
| Pro | GPT-4, GPT-4o |
| Pro+ | Acceso extendido a modelos |
| Business/Enterprise | Modelos de organización, incluidos los modelos BYOK |

## Modelos BYOK de organización (Business/Enterprise)

Si tu organización ha añadido sus propios modelos a Copilot mediante BYOK («bring your own key») —OpenRouter, Gemini u otros proveedores enrutados a través de GitHub—, esos modelos aparecen ahora en el selector de modelos de Pando exactamente igual que en VS Code, junto a los alojados por Copilot.

No hay nada que configurar: inicia sesión normalmente y aparecen. En un asiento Business esto suele añadir veinte o más modelos a la lista.

Se usan como cualquier otro modelo de Copilot:

```bash
pando --model 'copilot.miorg/OpenRouter/algun-modelo' -p "Explica este código"
```

Si los modelos de tu organización no aparecen:

```bash
pando auth copilot status     # confirma que se detectan el asiento y la organización
pando auth copilot logout && pando auth copilot login
```

## Configuración

La autenticación de Copilot se almacena en tu perfil de Pando. No se necesita configuración adicional después del login.

{{< callout >}}
El flujo OAuth de Copilot usa el device flow de GitHub. Tus credenciales de Copilot nunca salen de tu máquina—se usan localmente para obtener tokens.
{{< /callout >}}
