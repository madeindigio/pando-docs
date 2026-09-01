---
title: Extensiones
weight: 36
---

Pando tiene ya un sistema formal de extensiones: módulos opcionales compilados dentro del binario que pueden añadir herramientas, rutas HTTP, paneles de interfaz y comportamiento de memoria. Es la vía por la que llegan capacidades privadas y empresariales sin bifurcar Pando.

## ¿Qué mecanismo necesito?

Las extensiones son una de las cinco formas de añadir comportamiento a Pando, y normalmente no es la que quieres. Elige la más barata que resuelva el problema:

| Quieres… | Usa |
|---|---|
| Añadir una herramienta invocable por el modelo, en cualquier lenguaje, fuera del proceso | **Servidor MCP** |
| Cambiar cómo se comporta Pando en un momento concreto, con un script pequeño | **Hook Lua** |
| Añadir un prompt, un flujo de trabajo o un procedimiento repetible | **Skill o comando slash** |
| Describir un proveedor/modelo nuevo | **Plantilla de motor personalizado** |
| Llegar al núcleo de Pando, o viajar dentro del binario | **Extensión** |

Un servidor MCP es un proceso que puedes reiniciar y configurar por proyecto. Una extensión es una decisión de compilación cocida en un binario que alguien tiene que producir. Prefiere la parte alta de la tabla.

El código de terceros o no confiable pertenece a un servidor MCP: es un proceso separado que habla un protocolo estrecho. Una extensión se ejecuta dentro del proceso, con acceso total y sin sandbox.

## Elige una extensión solo si

1. **Necesita llegar al núcleo**: filtrar el conjunto de herramientas, envolver la búsqueda en la base de conocimiento, montar una ruta HTTP autenticada, suscribirse a eventos internos. Ningún otro mecanismo ve eso.
2. **Debe viajar en el binario**: un solo ejecutable que desplegar, nada más que instalar.
3. **Es de primera parte y privilegiada**: si no fusionarías ese código en Pando, ejecútalo como servidor MCP.

## Ver qué tiene tu binario

```bash
pando extensions list      # extensiones compiladas y si han cargado
pando ext                  # comandos aportados por extensiones
pando --version            # muestra la variante, p. ej. v0.9.1 (enterprise)
```

Un binario que no se compiló con una extensión no puede activarla. Es deliberado: es lo que convierte la frontera en algo real y no en un simple flag.

## Activar y configurar

La configuración bajo `[Extensions]` solo elige cuáles de las extensiones *ya compiladas* se cargan, y les pasa sus ajustes:

```toml
[Extensions]
Disabled = ["memory.sink.corp"]     # no cargar nunca, diga lo que diga el resto

[Extensions.Entries."memory.sink.corp"]
Enabled = true

[Extensions.Entries."memory.sink.corp".Config]
Endpoint = "https://remembrances.corp.internal"
```

`Disabled` es el interruptor fuerte: también apaga extensiones que cargarían por defecto.

## Qué puede aportar una extensión

- **Herramientas**, y middleware que envuelve o filtra todo el conjunto.
- **Comandos slash**, expuestos como cualquier comando integrado.
- **Rutas HTTP** en el servidor de Pando, tras su autenticación.
- **Paneles y páginas** en la WebUI, incluido reemplazar el frontend entero.
- **Comportamiento de memoria**: observar qué se recuerda y enriquecer lo que devuelve una búsqueda.
- **Ganchos de licenciamiento**, para módulos comerciales.

## Compilaciones empresariales

Las compilaciones estándar no cambian e imprimen exactamente lo de siempre. Hay dos vías adicionales para binarios compuestos:

```bash
make build                          # ./pando
make build-enterprise               # ./pando-enterprise
make release-enterprise             # un archivo distribuible
```

Para un binario que enlaza módulos privados, Pando incluye `xpando`, una pequeña herramienta que genera un módulo que importa Pando más las extensiones que indiques, y lo compila con el toolchain normal de Go:

```bash
make xpando

./xpando build v0.9.1 \
    --with github.com/tuorg/tu-extension/tools \
    --output ./pando-enterprise
```

| Opción | Significado |
|---|---|
| `--with módulo[/pkg][@versión][=/ruta/local]` | Paquete de extensión a enlazar. Repetible; `=ruta` compila contra un checkout local. |
| `--replace módulo[@versión]=reemplazo` | Sustitución de dependencia sin importar nada. Repetible. |
| `--tags`, `--ldflags`, `--output` | Se pasan a la compilación. |
| `--variant nombre` | Sobrescribe la variante que muestra `--version`. |

`GOOS`, `GOARCH` y las variables habituales del toolchain se respetan, así que la compilación cruzada funciona igual que con `go build`.

{{< callout >}}
La WebUI va empotrada en el núcleo, así que un binario compuesto lleva la interfaz estándar salvo que una de sus extensiones aporte sus propios recursos. Las extensiones pueden añadir paneles y páginas, o sustituir el frontend por completo.
{{< /callout >}}
