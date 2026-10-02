---
title: WebUI Access (Basic Auth)
weight: 20
---

WebUI Access is the lock on Pando's front door. As long as Pando only listens to your own computer, the door is closed and no lock is needed. The moment you let other devices in, your phone or a colleague's laptop, Pando asks each visitor for a username and a password.

## What it does for you

- **Keeps strangers out.** Anyone on the same Wi-Fi could otherwise open your Pando, read your code and run commands. With the lock on, they meet a sign-in window.
- **Looks after itself.** The lock only matters when the door is open, and Pando knows which is which. You do not have to remember to switch it on and off.
- **No gap.** Opening Pando to the network and enforcing the password happen in the same instant. There is no moment where it is reachable and unprotected.
- **One key per person.** Give each person a user, and remove one without disturbing the rest.
- **No restart.** A switch in the bottom bar opens and closes the door on the running Pando.

## How it feels in practice

On your own computer nothing changes: Pando opens as always. You add a user, flip **external access** in the bottom bar, and Pando shows the address to use from elsewhere. On your phone you open that address, Pando shows its own sign-in window (not the plain browser pop-up), you type your password and you are looking at your sessions.

In the settings page a note tells you where you stand: **Inactive** while Pando is local only, **Active** once it is reachable from the network. Seeing "Inactive" is not a fault. It means there is nobody outside to ask.

## When to use it

- You want to keep an eye on a long job from the sofa.
- You run Pando on a machine without a screen and use it from your laptop.
- A small team shares one Pando.

If you only ever use Pando on the machine it runs on, you need none of this.

## Good to know

- Once Pando is open to the network, everyone signs in, including the browser on the same computer.
- You cannot switch the lock on without at least one user, and deleting the last user switches it off. You cannot lock yourself out.
- Passwords are stored encrypted in your config file, the same way your API keys are, and travel over an encrypted connection.
- This protects access on your own network. It does not make Pando safe to expose to the open internet.

## Next steps

- Guide: [Use Pando from your phone or another computer]({{< relref "/guides/remote-access" >}}).
- Reference: [server and access options]({{< relref "/docs/configuration/webui" >}}).
- Related: [Auto HTTPS Certificates]({{< relref "/docs/features/https-auto-cert" >}}), [AGE encryption]({{< relref "/docs/configuration/age-encryption" >}}).
