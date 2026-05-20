---
title: Unifica tus herramientas de IA con Pando LLM Proxy
date: 2026-05-20
tags: ["Proxy", "Copilot", "Herramientas IA"]
---

Nos complace presentar **Pando LLM Proxy**, una nueva y revolucionaria característica diseñada para simplificar radicalmente cómo configuras y utilizas tus modelos de Inteligencia Artificial en todo tu entorno de desarrollo.

## El Problema: El dolor de cabeza de configurar cada herramienta

A medida que más herramientas para desarrolladores integran capacidades de IA, nos encontramos con un problema habitual: configurar las API keys y los parámetros en cada una de las aplicaciones de forma individual. Ya sea tu editor principal, una utilidad de línea de comandos o un asistente secundario, configurar múltiples cuentas es tedioso, poco seguro y difícil de administrar.

## La Solución: Una pasarela local de IA

Con **Pando LLM Proxy**, Pando actúa ahora como un puente seguro y local para todas tus necesidades de Inteligencia Artificial. Al iniciar un único servidor proxy local en tu máquina, liberas todo el potencial de tus cuentas configuradas:

1. **Configura una vez, usa en todas partes**: Define tus API keys (para OpenAI, Anthropic, Google Gemini y otros) una sola vez en tu perfil local de Pando. Cualquier otra herramienta externa podrá conectarse a tu proxy local, aprovechando estos proveedores al instante.
2. **GitHub Copilot en cualquier lugar**: Uno de los mayores atractivos de esta función es la posibilidad de exprimir los modelos de tu suscripción de **GitHub Copilot** fuera de tu editor de código tradicional. Ahora puedes usar de forma fluida estos modelos en herramientas de terminal, editores de texto alternativos o asistentes web.
3. **Control centralizado**: Gestiona tu consumo de tokens de forma fácil, cambia de modelo en tiempo real y protege tus API keys privadas, ya que ningún cliente externo tiene acceso a tus credenciales reales.

## Arranca en solo 30 segundos

Para poner en marcha tu pasarela local de IA, ejecuta el siguiente comando en tu terminal:

```bash
pando llm-proxy
```

Pando iniciará un servidor local seguro. A continuación, abre cualquier herramienta de desarrollo de IA externa (como Aider, Cline o Cursor) y configura sus opciones de API para que apunten a:

- **URL de la API**: `http://localhost:8765/v1`
- **Clave API**: Cualquier texto (Pando gestionará la autenticación real de forma segura y local).

¡Disfruta de una experiencia de desarrollo con IA unificada, rápida y segura en todas tus aplicaciones favoritas!
