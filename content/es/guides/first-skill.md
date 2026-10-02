---
title: "Escribe tu primera skill"
shortTitle: "Escribe tu primera skill"
description: "Enséñale a Pando un procedimiento una sola vez, en un fichero de texto, y que lo siga cada vez que toque."
summary: "Haz crecer una nueva rama para tu equipo."
track: soil
level: intermediate
weight: 24
---

Una skill es una ficha de receta. Apuntas cómo se hace una tarea en tu equipo («cómo escribimos las notas de versión», «cómo nombramos las migraciones de la base de datos») y Pando saca la ficha cuando llega esa tarea. Sin programar: una skill es una carpeta con un fichero de texto. La app de escritorio es idéntica a la Web UI que se muestra aquí; esta página de ajustes está en inglés también con la interfaz en español.

## Comprueba que las skills están activadas

Ve a **Configuración > Habilidades** y asegúrate de que **Enable skills** está encendido. Debajo, **Installed skills** lista todas las fichas que Pando ya conoce, con una etiqueta que dice si es tuya en todas partes (`global`) o pertenece a este proyecto.

{{< shot src="images/webui/pando-webui-settings-skills.jpg" alt="Skills instaladas en Configuración" >}}

## Crea la skill

Haz una carpeta para la skill dentro de tu proyecto y mete en ella un fichero llamado `SKILL.md`:

```
.pando/skills/release-notes/SKILL.md
```

Puedes crearlo desde la pantalla **Editor de Código**. El nombre de la carpeta es el nombre de la skill.

## Describe cuándo se aplica

Abre `SKILL.md` y escribe dos partes: una cabecera corta que dice para qué sirve la skill y las instrucciones en lenguaje normal.

```markdown
---
name: release-notes
description: Write release notes for this project. Use when the user asks for a changelog, release notes or a summary of what changed between versions.
---

# Release notes

1. Read the commits since the last tag.
2. Group them under "New", "Improved" and "Fixed".
3. Write one line per change, in plain language, no ticket numbers.
4. Put breaking changes first, under "Before you update".
```

La `description` es la etiqueta de la ficha. Al principio Pando solo lee las etiquetas y abre la ficha cuando una petición encaja, así que escríbela como le explicarías a un compañero cuándo usarla.

## Pruébala

De vuelta en **Configuración > Habilidades**, pulsa **Refresh**. Tu skill aparece en la lista. Abre un chat **nuevo** y pide la tarea con tus palabras, por ejemplo «escribe las notas de esta versión».

## Coge skills prestadas del catálogo

Baja en **Configuración > Habilidades**.

{{< shot src="images/webui/pando-webui-settings-skills-catalog.jpg" alt="Ajustes de rutas y catálogo de skills" >}}

Con **Enable catalog** activado, pulsa **Browse Catalog**, escribe lo que buscas e instala una skill que ya escribió otra persona. **Default scope** decide dónde cae una skill instalada y **Auto update** mantiene al día las instaladas. **Uninstall**, en la lista, quita una.

## Compártela con tu equipo

Las skills de `.pando/skills/` dentro del proyecto viajan con el repositorio: haz commit de la carpeta y todo el que abra el proyecto tiene las mismas fichas.

Las skills que quieres en todas partes, en todos tus proyectos, van en `~/.pando/skills/`.

Para guardar skills en otra carpeta, añádela en **Skill paths** y pulsa **Save**.

## Cuando una skill no basta

Una skill cambia lo que Pando sabe hacer. Para otras necesidades hay otras herramientas:

| Quieres… | Usa |
|---|---|
| Darle al modelo una herramienta nueva (una base de datos, un gestor de tickets) | Un servidor MCP. Mira [Conecta servidores MCP]({{< relref "/guides/mcp-servers" >}}) |
| Ejecutar un script pequeño en un momento preciso, por ejemplo para ajustar un prompt | Un script Lua: **Configuración > Motor Lua**, enciende **Enabled** y rellena **Script path** |
| Meter funciones de empresa dentro del propio programa Pando | Una [extensión]({{< relref "/docs/features/extensions" >}}) |

{{< shot src="images/webui/pando-webui-settings-lua-engine.jpg" alt="Ajustes del motor Lua" >}}

## Comprueba que funciona

La skill aparece en **Installed skills** y, en un chat nuevo, Pando sigue tus pasos sin que tengas que pegarlos.

{{< under-surface >}}
Pando solo tiene a la vista las descripciones de una línea de tus skills. La receta entera se lee en el momento en que hace falta, así que veinte skills no cuestan casi nada hasta que se usa una.
{{< /under-surface >}}

## Si algo falla

| Qué ves | Qué hacer |
|---|---|
| La skill no sale en la lista | El fichero debe llamarse `SKILL.md` y estar en su propia carpeta. Pulsa **Refresh** |
| Pando no la usa | Abre un chat nuevo y haz que la `description` diga con claridad cuándo se aplica |
| «No skills installed» | Comprueba **Enable skills** y que la carpeta es `.pando/skills/` en el proyecto o `~/.pando/skills/` |
| El catálogo no encuentra nada | Comprueba **Enable catalog** y tu conexión a internet |

## ¿Prefieres la terminal?

Crea la carpeta y el fichero con cualquier editor. Las skills que Pando propone por su cuenta a partir de tus sesiones se gestionan con `pando skills list`, `approve` y `reject`; mira [Automejora]({{< relref "/docs/features/self-improvement" >}}). Todas las opciones están en la [referencia de skills y extensiones]({{< relref "/docs/configuration/skills-and-extensions" >}}).
