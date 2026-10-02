---
title: Runtime de contenedores
weight: 41
---

Referencia para ejecutar los comandos del agente en Docker o Podman. Paso a paso: [Dev containers]({{< relref "/guides/dev-containers" >}}).

```toml
[Container]
Runtime         = 'host'            # host | docker | podman | embedded | auto
Image           = ''
PullPolicy      = 'if-not-present'  # always | never | if-not-present
Socket          = ''                # override the docker/podman socket path
WorkDir         = ''                # working directory inside the container
Network         = 'none'
ReadOnly        = true              # read-only root filesystem
User            = ''                # non-root user inside the container
CPULimit        = ''
MemLimit        = ''
PidsLimit       = 512
NoNewPrivileges = true
AllowEnv        = []                # variables a session may pass in
AllowMounts     = []                # folders a session may mount
ExtraEnv        = []                # variables always added
ExtraMounts     = []                # folders always mounted
EmbeddedCacheDir = ''
EmbeddedGCKeepN  = 5
```

| Runtime | Significado |
|---|---|
| `host` | Los comandos se ejecutan en tu máquina (por defecto), protegidos por el [sandbox]({{< relref "/docs/configuration/sandbox" >}}) |
| `docker` / `podman` | Los comandos se ejecutan en un contenedor. El sandbox del host no se aplica |
| `embedded` | Runtime integrado, sin instalar nada, sin acceso a los ficheros del proyecto |
| `auto` | Podman sin root, luego Docker, luego host |

La página **Configuración > Entorno de contenedores** de la Web UI muestra los runtimes detectados, las sesiones activas y los eventos recientes.
