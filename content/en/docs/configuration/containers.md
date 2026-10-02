---
title: Container Runtime
weight: 41
---

Reference for running the agent's commands in Docker or Podman. Step by step: [Dev containers]({{< relref "/guides/dev-containers" >}}).

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

| Runtime | Meaning |
|---|---|
| `host` | Commands run on your machine (default), protected by the [sandbox]({{< relref "/docs/configuration/sandbox" >}}) |
| `docker` / `podman` | Commands run in a container. The host sandbox does not apply |
| `embedded` | Built-in runtime, nothing to install, no access to the project files |
| `auto` | Rootless Podman, then Docker, then host |

The Web UI page **Settings > Container Runtime** shows the detected runtimes, the active sessions and recent container events.
