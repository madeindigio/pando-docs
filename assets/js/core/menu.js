// Overrides hextra's js/core/menu.js: mobile drawer and language dropdown
// of the Pando header (layouts/_partials/header.html).
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".pd-menu");
  const drawer = document.getElementById("pd-drawer");

  function setDrawer(open) {
    if (!menu || !drawer) return;
    drawer.toggleAttribute("data-open", open);
    menu.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("pd-drawer-open", open);
  }

  if (menu && drawer) {
    menu.addEventListener("click", () => setDrawer(!drawer.hasAttribute("data-open")));
    drawer.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setDrawer(false)));
    window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
      if (e.matches) setDrawer(false);
    });
  }

  const langButton = document.querySelector(".pd-lang__btn");
  const langMenu = document.querySelector(".pd-lang__menu");

  function setLang(open) {
    if (!langButton || !langMenu) return;
    langMenu.hidden = !open;
    langButton.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (langButton && langMenu) {
    langButton.addEventListener("click", (e) => {
      e.stopPropagation();
      setLang(langMenu.hidden);
    });
    document.addEventListener("click", (e) => {
      if (!langMenu.contains(e.target)) setLang(false);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (langMenu && !langMenu.hidden) {
      setLang(false);
      langButton.focus();
    } else if (drawer && drawer.hasAttribute("data-open")) {
      setDrawer(false);
      menu.focus();
    }
  });
});
