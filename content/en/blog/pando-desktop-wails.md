---
title: "Pando Goes Native: Introducing the Desktop App Multi-Tasking Upgrade"
date: 2026-05-20
tags: ["Desktop", "UI", "Wails"]
---

We are thrilled to announce the official launch of the **Pando Native Desktop Application** for macOS and Windows! Built using a high-performance native desktop framework, the desktop app brings Pando's local AI features directly into a premium window, designed to elevate your developer productivity.

## A Seamless Desktop Workspace

While our interactive terminal (TUI) and web interfaces are great, many developers prefer a dedicated, native application that sits neatly in their operating system's launcher, menu bar, or dock. The Pando Desktop Application offers exactly that, paired with several powerful system-level integrations:

1. **Native Desktop Notifications**: You no longer need to keep your terminal open or stare at a progress bar. When you delegate a time-consuming codebase search or refactoring task to an agent in the background, you can safely minimize Pando and work on other things. Pando will send a native system notification as soon as the agent completes the task or needs your feedback.
2. **Simultaneous Session Management**: Effortlessly handle multiple tasks at once. You can start separate tabs for debugging, writing test suites, or drafting documentation, running all of them simultaneously in the background.
3. **Menu Bar Integration**: Initiate new chat sessions or quickly check on active background agents directly from your system tray or menu bar with a single click.
4. **Secure HTTPS Out of the Box**: The desktop application runs over a secure local HTTPS link using automatically generated local SSL certificates, ensuring that your local AI interactions remain strictly confidential and protected on your machine.

## Tailored for Your Operating System

- **macOS (Intel & Apple Silicon)**: Fully optimized for native rendering using Apple's WebKit. This provides ultra-low battery consumption and buttery-smooth responsiveness. The macOS bundle is fully signed and verified for high security.
- **Windows**: A highly lightweight, high-performance execution runtime that integrates with local AGE encryption keys to keep your secure configuration values locked and protected.

## How to Try It

To get started, head over to our GitHub Releases page, download the installer for your platform, and launch it. 

If you prefer building from source, compile the native bundle using our simple make rule:

```bash
make build-desktop
```

Say goodbye to browser tabs and hello to a seamless, premium, native AI workspace designed specifically for developers. Happy coding!
