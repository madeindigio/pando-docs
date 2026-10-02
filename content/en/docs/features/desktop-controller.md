---
title: Desktop Controller
weight: 35
---

The Desktop Controller lets Pando use the apps on your screen: see which ones are open, read what a window says, press buttons, fill fields, press keys and take screenshots. It works on Windows, macOS and Linux.

**Off by default.** It gives Pando the ability to act on your desktop as if it were you, so read the safety notes below before turning it on.

## Why it is different from "computer use"

Most assistants that control a computer take a picture of the screen, squint at it and click where they guess the button is. Pando reads the window's own description of itself instead, the same one screen readers use for blind people. It is the difference between finding a shop by a blurry photo and by its street address.

- **Much cheaper.** A list of the buttons in a window is a few lines of text. A screenshot costs as much as pages of it.
- **Much more reliable.** A click does not miss because a window moved or a dialog was still sliding in.
- **Pictures only as a last resort**, for screens that describe nothing about themselves (games, drawing canvases, remote desktops). When Pando acts by sight, it says so.

## What it does for you

- Works with programs that have no other way in: a settings window, an old desktop tool, a native "Save as" dialog.
- Carries a task across several apps: copy from one, paste into another.
- Looking is free; touching asks first. Pando lists apps, reads windows and finds elements on its own. Before it clicks, types, presses a key, scrolls or takes a screenshot, it asks you, with the same permission prompt as for editing a file.

## When to use it

Use it when the thing you want automated lives in a desktop window and not in a file, a command or a web page.

For web pages on their own, the [browser tools]({{< relref "/docs/features/browser-automation" >}}) are the better fit: use them when you know the address or want console and network details. Use the desktop tools when the browser is one stop in a wider trip that also crosses native windows, or when you only know an element by what it says on screen. If a browser session is already open, the desktop tools see it as one more app; they never open a browser by themselves.

## Good to know

**How ready it is**, honestly:

- Controlling browsers: fully verified.
- Linux: verified on a real desktop.
- Windows and macOS: built and shipped, but not yet validated by the maintainers on a real desktop. Treat them as early support and tell us what you find.

**What your system may ask.** macOS wants you to grant Pando Accessibility permission, plus Screen Recording for screenshots. Linux with Wayland shows a consent dialog the first time. Windows needs nothing. If a permission is missing, Pando tells you which one; it never pretends.

**Safety.**

- Every action that changes something, and every screenshot, goes through a permission prompt.
- A screenshot shows your whole screen, including whatever else is open. That is why it asks even though it changes nothing.
- A click "by sight" is worded as such in the prompt, so you always know when Pando is less than sure.
- You can fence it in: list the only apps it may touch, and the ones it must never touch (your password manager, your mail). The "never" list always wins.
- You can forbid real mouse and keyboard input altogether.

{{< callout type="warning" >}}
Do not turn the Desktop Controller on in a setup where nobody is watching or where actions are approved automatically, unless you have fenced it in with a list of allowed apps. A permission prompt only protects you while a person is reading it.
{{< /callout >}}

## Next steps

- Guide: [Give Pando eyes and hands]({{< relref "/guides/web-browser-desktop-tools" >}}) turns it on and sets the fences.
- Reference: [every option, what asks for permission and platform needs]({{< relref "/docs/configuration/tools" >}}).
