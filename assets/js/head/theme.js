// Overrides hextra's js/head/theme.js. Runs inline-early in <head> so the
// right theme is set before first paint (no flash).
//
// Light is the default; with no stored preference the OS setting wins.
// hextra styles key off `html.dark`, the Pando design off `[data-theme]`:
// set both. localStorage may be unavailable (private mode, blocked
// storage), hence the try/catch.

function getStoredTheme() {
  try {
    return localStorage.getItem("color-theme");
  } catch (e) {
    return null;
  }
}

function setTheme(theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");

  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  root.classList.add(theme);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

setTheme(getStoredTheme());
