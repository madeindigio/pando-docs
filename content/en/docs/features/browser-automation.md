---
title: Browser Automation
weight: 24
---

Pando can use a web browser the way you do: open a page, click, fill in a form, scroll, and look at what comes back. It is the difference between reading a restaurant's menu from a leaflet and walking in and ordering.

## What it does for you

- **Reads pages that need a real browser.** Many sites show nothing until their scripts run. Pando waits and reads the finished page.
- **Does the clicking for you.** Navigate, press buttons, fill fields, scroll.
- **Shows its work.** It can take a screenshot of a page or of one element, or save the page as a PDF.
- **Helps you debug your own site.** It reads the page's console messages and the requests it made, which is where web bugs usually hide.

## How it feels in practice

You say: "open our staging site, log in with the test user and tell me if the dashboard loads". If you left the window visible, you watch the browser open and move by itself. Then Pando reports what it saw, with a screenshot if you asked for one.

When you only give Pando a link to read, it tries the quick way first and falls back to a browser only if the page needs one.

## When to use it

- Testing a web app you are building.
- Getting information from a site that has no simpler way in.
- Capturing how a page looks.

For plain articles and documentation, the lighter fetch tool is enough and Pando picks it by itself.

## Good to know

- It works with the browsers you probably have: Chrome, Edge, Chromium, Opera.
- Two very light browsers with no window, Lightpanda and [Obscura](https://github.com/h4ckf0r0day/obscura), are supported too. They start fast and use little memory, which suits servers and automated checks where installing Chrome is heavy.
- You choose whether the window is visible. Visible is good for trust; hidden is good for servers.
- If your everyday browser is open, Pando uses a temporary profile instead of fighting for yours.
- Only a few browser windows are kept open at once, so it does not eat your memory.

## Next steps

- Guide: [Give Pando eyes and hands]({{< relref "/guides/web-browser-desktop-tools" >}}) turns it on and picks a browser.
- Reference: [browser options and the list of browser tools]({{< relref "/docs/configuration/tools" >}}).
- Related: [Desktop Controller]({{< relref "/docs/features/desktop-controller" >}}), for apps that are not web pages.
