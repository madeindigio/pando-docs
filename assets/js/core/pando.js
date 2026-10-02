// Pando docs: small shared behaviours.
document.addEventListener("DOMContentLoaded", function () {
  // Copy buttons: <button data-copy="text to copy">
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(button.dataset.copy).then(() => {
        button.dataset.copied = "true";
        setTimeout(() => delete button.dataset.copied, 1600);
      });
    });
  });
});

// Tabs: <div data-tabs> with [role=tab] buttons controlling [role=tabpanel]s.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = Array.from(root.querySelectorAll("[role=tab]"));

    function select(tab, focus) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }

    // Download tabs: open on the visitor's platform.
    if (root.hasAttribute("data-tabs-platform")) {
      const ua = navigator.userAgent;
      const platform = /Windows/i.test(ua) ? "windows" : /Mac/i.test(ua) ? "macos" : /Linux|X11/i.test(ua) ? "linux" : "";
      const match = tabs.find((t) => t.dataset.platform === platform);
      if (match) select(match, false);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab, false));
      tab.addEventListener("keydown", (e) => {
        const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        select(tabs[(i + step + tabs.length) % tabs.length], true);
      });
    });
  });
});

// Guides index: filter groups by track.
document.addEventListener("DOMContentLoaded", function () {
  const filter = document.querySelector("[data-track-filter]");
  if (!filter) return;
  const tabs = filter.querySelectorAll("[data-track]");
  const groups = document.querySelectorAll("[data-track-group]");

  filter.dataset.ready = "true";
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const track = tab.dataset.track;
      tabs.forEach((t) => t.setAttribute("aria-pressed", t === tab ? "true" : "false"));
      groups.forEach((g) => (g.hidden = track !== "all" && g.dataset.trackGroup !== track));
    });
  });
});

// Single guide: click-to-load video (no third-party request before the
// visitor asks for it), chapter seeking and the "helpful" acknowledgement.
document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector("[data-video-id]");

  function seconds(t) {
    return String(t || "0")
      .split(":")
      .reduce((total, part) => total * 60 + Number(part), 0);
  }

  function load(start) {
    const stage = video.querySelector(".gvideo__stage");
    const frame = document.createElement("iframe");
    frame.src =
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(video.dataset.videoId) +
      "?autoplay=1&rel=0&start=" + start +
      "&hl=" + document.documentElement.lang +
      "&cc_lang_pref=" + document.documentElement.lang;
    frame.title = document.title;
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    stage.querySelector("iframe")?.remove();
    stage.appendChild(frame);
    video.dataset.loaded = "true";
  }

  if (video) {
    video.querySelector(".gvideo__play").addEventListener("click", () => load(0));
    video.querySelectorAll(".gvideo__chapter").forEach((chapter) => {
      chapter.addEventListener("click", () => {
        // Once the player is open a chapter seeks the video; the link still
        // scrolls to the matching written step.
        if (video.dataset.loaded) load(seconds(chapter.dataset.t));
      });
    });
  }

  const yes = document.querySelector("[data-helpful-yes]");
  if (yes) {
    yes.addEventListener("click", () => {
      yes.textContent = yes.dataset.thanks;
      yes.disabled = true;
    });
  }
});
