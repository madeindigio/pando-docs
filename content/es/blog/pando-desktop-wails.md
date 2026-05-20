---
title: "Pando se hace nativo: Lanzamos la nueva aplicación de escritorio"
date: 2026-05-20
tags: ["Escritorio", "Interfaz", "Wails"]
---

¡Nos alegra anunciar el lanzamiento oficial de la **Aplicación de Escritorio Nativa de Pando** para macOS y Windows! Diseñada sobre un motor de alto rendimiento, esta nueva interfaz lleva toda la potencia de las herramientas locales de Inteligencia Artificial de Pando a una ventana premium independiente, pensada para potenciar al máximo tu productividad.

## Un espacio de trabajo integrado en tu escritorio

Aunque nuestra terminal interactiva (TUI) y las interfaces de navegador son excelentes, muchos desarrolladores prefieren disponer de una aplicación dedicada que se integre en la barra de menú o dock de su sistema operativo. La aplicación de escritorio de Pando ofrece exactamente eso, junto con potentes integraciones a nivel de sistema:

1. **Notificaciones nativas del sistema**: Ya no es necesario estar pendiente de la terminal o de una barra de progreso. Cuando delegas una tarea larga de búsqueda o refactorización a un agente en segundo plano, puedes minimizar la aplicación y concentrarte en otras tareas. Pando te enviará una notificación del sistema en el instante en que el agente finalice su labor o requiera tu confirmación.
2. **Gestión de múltiples sesiones simultáneas**: Trabaja en varias tareas a la vez sin interrupciones. Abre pestañas independientes para depurar código, generar pruebas unitarias o redactar documentación, permitiendo que todas operen simultáneamente en segundo plano.
3. **Acceso directo desde la Barra de Menú**: Inicia nuevas conversaciones o comprueba el estado de tus agentes de forma rápida desde la bandeja del sistema con un solo clic.
4. **HTTPS Seguro de fábrica**: La aplicación se ejecuta bajo una conexión local segura HTTPS con certificados SSL autogenerados de manera automática en el arranque, garantizando que todas tus interacciones locales con la IA permanezcan completamente privadas y protegidas en tu máquina.

## Optimizada para tu sistema operativo

- **macOS (Intel y Apple Silicon)**: Totalmente optimizada para el renderizado nativo mediante WebKit de Apple. Esto proporciona un consumo energético ultra bajo y una fluidez excepcional. Además, el instalador está debidamente firmado para garantizar la máxima seguridad.
- **Windows**: Un entorno de ejecución extremadamente ligero y veloz, integrado con el sistema de cifrado local de claves AGE para mantener a salvo toda tu información confidencial.

## Cómo descargarla

Para empezar a utilizarla, visita la sección de lanzamientos en nuestro repositorio de GitHub, descarga el instalador correspondiente a tu plataforma y ejecútalo.

Si prefieres compilarla tú mismo desde el código fuente, utiliza nuestro comando simple:

```bash
make build-desktop
```

Despídete de las pestañas perdidas en el navegador y da la bienvenida a un espacio de desarrollo nativo, premium y seguro, diseñado a medida para desarrolladores. ¡Feliz programación!
