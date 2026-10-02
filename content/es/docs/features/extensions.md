---
title: Extensiones
weight: 36
---

Una extensión es un órgano extra injertado en el propio Pando: un módulo que va compilado dentro del programa y puede añadir herramientas, pantallas y comportamiento desde dentro. Es la forma en que las empresas distribuyen funciones privadas sin mantener su propia copia de Pando.

Para la mayoría es también lo último a lo que recurrir. Pando tiene maneras más ligeras de aprender trucos nuevos, y casi siempre son las adecuadas.

## ¿Qué forma de ampliar necesito?

Quédate con la primera fila que resuelva tu caso:

| Quieres… | Usa | Piénsalo como |
|---|---|---|
| Darle al modelo una herramienta nueva, escrita en cualquier lenguaje | **Servidor MCP** | Enchufar un aparato a una regleta |
| Enseñar un procedimiento o una manera repetible de trabajar | **Skill o comando slash** | Una ficha de receta |
| Darle un toque a Pando en un momento preciso con un script pequeño | **Hook de Lua** | Una nota en la nevera |
| Describir un tipo nuevo de proveedor o modelo de IA | **Plantilla de motor personalizada** | Un adaptador de enchufe |
| Llegar a las tripas de Pando, o viajar dentro del programa | **Extensión** | Cirugía |

Un servidor MCP es un programa aparte que puedes reiniciar y configurar por proyecto. Una extensión se decide cuando se compila el programa, y alguien tiene que compilarlo. El código del que no te fías del todo va en un servidor MCP, que corre aparte; una extensión corre dentro de Pando con acceso total.

## Cuándo una extensión es la opción correcta

1. **Necesita llegar al núcleo**: decidir qué herramientas existen, cambiar lo que devuelve una búsqueda en la memoria, añadir una dirección web protegida al servidor del propio Pando, reaccionar a eventos internos. Nada más puede ver eso.
2. **Tiene que viajar en el programa**: un solo fichero que desplegar, nada extra que instalar.
3. **Es tuya y de confianza**: si no fusionarías ese código en el propio Pando, ejecútalo como servidor MCP.

## Qué puede añadir una extensión

- **Herramientas**, y reglas que envuelven o filtran todas las demás.
- **Comandos slash**, que aparecen como los de serie.
- **Direcciones web** en el servidor del propio Pando, detrás de su inicio de sesión.
- **Paneles y páginas** en la Web UI, o una interfaz entera de sustitución.
- **Comportamiento de memoria**: observar lo que se recuerda y enriquecer lo que devuelve una búsqueda.
- **Comprobaciones de licencia**, para módulos comerciales.
- **Ajustes gestionados**: valores que llegan de un sitio central, con los que no debes tocar bloqueados. Los ajustes bloqueados aparecen en gris en las pantallas de configuración.
- **Inicio de sesión**: el de tu organización, con las credenciales adecuadas en las peticiones a los proveedores de IA.
- **Política de interfaz**: ocultar o desactivar partes de la interfaz que no aplican en tu organización.
- **Eventos y prompts**: reaccionar a lo que pasa, como que se elija un modelo o termine una sesión, y lanzar prompts propios.

## Cómo se nota en el día a día

Si usas una descarga normal de Pando, no cambia nada: no lleva extensiones y se comporta como siempre. Si tu empresa te da su propia versión, ves sus extras como partes corrientes de la app, y `pando --version` muestra el nombre de la variante, por ejemplo `v0.9.1 (enterprise)`.

Un programa que no se compiló con una extensión no puede encenderla después. Es a propósito: hace que la frontera sea una pared de verdad y no un ajuste que cualquiera puede cambiar.

## Conviene saber

- Los ajustes solo pueden elegir cuáles de las extensiones incluidas se cargan, y pasarles sus opciones.
- Una extensión no tiene sandbox propio. Trátala como cualquier código que pasa a formar parte del programa.
- Una versión de empresa muestra la Web UI normal salvo que alguna de sus extensiones traiga la suya.

## Siguientes pasos

- Empieza por las opciones ligeras: [Escribe tu primera skill]({{< relref "/guides/first-skill" >}}) y [Conecta servidores MCP]({{< relref "/guides/mcp-servers" >}})
- Ajustes, comandos y cómo compilar un programa con extensiones: [referencia de skills, Lua y extensiones]({{< relref "/docs/configuration/skills-and-extensions" >}})
