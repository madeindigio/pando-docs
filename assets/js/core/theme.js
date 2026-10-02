// Overrides hextra's js/core/theme.js: single light/dark toggle button
// instead of hextra's light/dark/system menu.
(function () {
  const buttons = document.querySelectorAll("[data-pd-theme-toggle]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(next);
      try {
        localStorage.setItem("color-theme", next);
      } catch (e) {
        // Storage unavailable: the choice lasts for this page only.
      }
    });
  });

  // Follow the OS while the visitor has not chosen a theme.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getStoredTheme() === null) setTheme(null);
  });
})();
