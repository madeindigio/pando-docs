---
title: Auto HTTPS Certificates
weight: 28
---

When you open Pando in a browser, the conversation between the two travels in a sealed envelope (HTTPS), even though both ends are on your own machine or your own network. Pando makes the seal by itself the first time it starts. You do not buy, request or configure anything.

## What it does for you

- **Private from the first second.** Everything between the browser and Pando is encrypted, including your prompts and your keys.
- **Nothing to set up.** Pando creates the certificate on your machine and renews it by itself.
- **One seal for every project.** It lives in your Pando profile, so all your projects share it.
- **Works from other devices.** It covers `localhost` and your computer's local addresses, so you can open Pando from your phone on the same network and install it as an app there.

## How it feels in practice

Start the Web UI and the address begins with `https://`. Because the seal is home-made and not issued by a public authority, a browser that sees it for the first time shows a warning, the way a doorman asks who you are the first time you visit. Tell that device once to trust Pando's certificate and the warning does not come back.

## When to use it

Always; it is automatic. Bring your own certificate only if your organisation issues them or you publish Pando on a public address.

## Good to know

- The certificate is made on your computer and never leaves it.
- It is home-made ("self-signed"). For anything exposed to the internet, use a certificate from a recognised authority.
- Public internet addresses are outside what the home-made certificate covers.

## Next steps

- Open Pando from another device: [Remote access]({{< relref "/guides/remote-access" >}})
- Commands, file locations and using your own certificate: [Diagnostics and maintenance reference]({{< relref "/docs/configuration/diagnostics" >}})
- Who is allowed in: [WebUI Access]({{< relref "/docs/features/webui-access" >}})
