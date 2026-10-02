---
title: Espacios de trabajo de proyecto
weight: 4
---

Los espacios de trabajo de proyecto permiten que la vista **Projects** abra una WebUI completa de Pando para cualquier proyecto registrado dentro de la misma aplicación padre. En lugar de cambiar de pestaña del navegador o crear otra ventana de escritorio, Pando inicia o reutiliza un `pando serve` local del proyecto en segundo plano y lo monta como una pestaña inferior dentro del shell unificado.

## Abrir una pestaña de proyecto

{{< shot src="images/webui/pando-webui-projects.jpg" alt="Lista de proyectos en la Web UI" >}}

{{< shot src="images/webui/pando-webui-project-workspace-tab.jpg" alt="Un proyecto abierto en su propia pestaña" >}}

1. Abre **Projects**.
2. Haz clic en la fila del proyecto, o usa **Open tab** en la columna de acciones.
3. Pando inicia el espacio de trabajo si hace falta y te lleva a `/projects/:id/workspace`.

Cada pestaña mantiene vivo el WebUI hijo, así que puedes moverte entre la app principal y los espacios de trabajo de proyecto sin perder el estado del terminal, la navegación ni el contexto de la sesión abierta.

## Barra de pestañas y atajos

La barra inferior siempre incluye la app principal y una pestaña por cada espacio de trabajo de proyecto en ejecución.

- **Ctrl+Alt+1..9** enfoca la pestaña principal o una de las primeras pestañas de proyecto.
- **Ctrl+Alt+Left / Ctrl+Alt+Right** recorre las pestañas.
- **Ctrl+Alt+W** cierra la pestaña de proyecto activa.

Al cerrar una pestaña tienes dos opciones:

- **Close** elimina la pestaña del shell padre pero deja el espacio de trabajo en segundo plano, así que reabrir el mismo proyecto es inmediato.
- **Close and stop workspace** también apaga el servidor hijo local del proyecto y limpia su runtime de la lista de proyectos.

## Reutilización para delegación

Los espacios de trabajo de proyecto y la delegación de Mesnada comparten el mismo runtime de proyecto. Si un espacio de trabajo ya está en ejecución, la delegación reutiliza esa instancia viva por IPC en lugar de crear un `pando acp` separado para el mismo proyecto. Así se conservan terminales, sesiones y estado local mientras se evitan procesos duplicados.

## Comportamiento en la app de escritorio

En la aplicación de escritorio, los espacios de trabajo de proyecto permanecen dentro de la ventana principal y de la barra de pestañas de Pando. El título de la ventana y la bandeja siguen perteneciendo a la aplicación padre, así que abrir una pestaña de proyecto no crea nuevas entradas en la bandeja ni ventanas separadas salvo que uses explícitamente **Open desktop**.

## Configuración

{{< shot src="images/webui/pando-webui-settings-general-tool-discovery-workspaces.jpg" alt="Ajustes de descubrimiento de herramientas y workspaces de proyecto" >}}

Añade estas claves bajo `[Projects]` en `.pando.toml`:

```toml
[Projects]
MaxWebInstances = 6
WebStartupTimeout = "20s"
```

| Clave | Valor por defecto | Significado |
|---|---|---|
| `MaxWebInstances` | `6` | Número máximo de espacios de trabajo de proyecto en segundo plano que Pando puede ejecutar al mismo tiempo. `0` significa sin límite. |
| `WebStartupTimeout` | `"20s"` | Cuánto tiempo espera el padre a que un nuevo espacio de trabajo supere las comprobaciones de salud e identidad antes de dar el arranque por fallido. |

Estos ajustes también aparecen en la WebUI dentro de los controles generales de espacios de trabajo de proyecto.

## Modelo de seguridad en lenguaje claro

Los espacios de trabajo de proyecto están diseñados para que el navegador nunca hable directamente con un hijo no confiable:

- Cada WebUI hija escucha **solo en loopback** (`127.0.0.1`), no en tu red local.
- El padre se conecta al hijo con **TLS fijado/pinneado**, así que solo confía en el par de certificado/clave que generó para los hijos de proyecto.
- El token API del hijo lo genera el servidor padre y **nunca llega al JavaScript del navegador**.
- Un espacio de trabajo de proyecto se detiene cuando termina su instancia padre; se vuelve a arrancar la próxima vez que abras la pestaña.
- Las previsualizaciones de diseño no están disponibles dentro de una pestaña de proyecto: abre el proyecto en su propia ventana para usarlas.
- Las peticiones del navegador usan una **cookie HttpOnly con alcance limitado** al path del espacio de trabajo de ese proyecto.
- `MaxWebInstances` te da un límite duro de hijos concurrentes y `WebStartupTimeout` acota los arranques fallidos.

En la práctica, la WebUI padre es la única superficie pública, mientras que cada hijo de proyecto queda como un servicio privado de loopback detrás del proxy inverso.
