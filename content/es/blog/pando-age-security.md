---
title: Protege las claves API de tus proyectos con cifrado AGE nativo
date: 2026-05-20
tags: ["Seguridad", "Cifrado", "Privacidad"]
---

La seguridad es un pilar fundamental en el desarrollo de software profesional. Nos complace anunciar que Pando incorpora ahora **Cifrado AGE Nativo**, una solución de seguridad diseñada para proteger tus archivos de configuración local y las credenciales de tus herramientas externas contra cualquier filtración accidental.

## El Riesgo: Credenciales en texto plano en Git

En los proyectos modernos, los desarrolladores suelen almacenar la configuración en un archivo dentro de su propio repositorio (como `.pando.toml`). Este archivo a menudo contiene información confidencial, como claves de API de servicios en la nube o contraseñas de bases de datos.

Si subes accidentalmente este archivo a un repositorio público en GitHub, tus credenciales podrían quedar expuestas al instante, poniendo en riesgo tu infraestructura y exponiéndote a cargos inesperados de facturación.

## El Escudo: Seguridad simple desencriptada en memoria

Gracias a la integración del **Cifrado AGE** en Pando, proteger tus datos confidenciales dentro de tus archivos de configuración es ahora sumamente sencillo:

- **Configuración segura para Git**: Pega valores encriptados seguros directamente en tu archivo `.pando.toml`. Puedes subir y compartir tu archivo de configuración con tu equipo o subirlo a repositorios públicos sin riesgos.
- **Claves ligadas a tu perfil local**: Los valores confidenciales se cifran utilizando tu clave privada de desarrollo local. Solo tu máquina autorizada puede interpretar el valor original.
- **Seguridad en memoria**: Cuando inicias Pando, el sistema descifra automáticamente estos valores en memoria. Las claves legibles nunca se guardan en el disco duro en formato de texto plano, protegiéndolas de accesos no autorizados.

## Cómo proteger tus claves API en dos pasos

### 1. Cifra tu Credencial

Utiliza la herramienta sencilla de terminal de Pando para cifrar tu secreto:

```bash
pando encrypt --val "mi-super-clave-api-secreta"
```

El sistema te devolverá una cadena de texto cifrada muy segura que empieza por `age1...`.

### 2. Actualiza tu Archivo de Configuración

Copia esa cadena cifrada y pégala en tu archivo `.pando.toml`:

```toml
[providers.openai]
apiKey = "age1y7g9w...cadena-cifrada-aqui..."
```

Pando reconocerá de forma automática el formato encriptado y descifrará tu clave en memoria únicamente cuando sea necesario conectar con OpenAI. ¡Tus credenciales están ahora plenamente protegidas para que puedas programar con absoluta tranquilidad!
