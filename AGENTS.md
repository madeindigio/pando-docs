The following repo contains the website documentation of Pando: https://github.com/digiogithub/pando

The source code of Pando for references is in: ../pando

This website is built with Hugo and hextra theme. 
The docs for hextra can be found here: https://imfing.github.io/hextra/docs/ and the copy of the theme is in _vendor/github.com/imfing/hextra

The site supports multiple languages. The current languages are english (en) and spanish (es). The default language is english. In case you add a new language, you will need to add the new language to the hugo.toml file and create the new language directory in the content directory.
## Design system ("Beneath the surface", Pando Docs 1.x)

The visual specification lives in `_design/` (`HANDOFF.md` and `design/*.dc.html`). Those files are a spec, never served.

hextra stays as a Hugo module (its shortcodes, render hooks and FlexSearch are used by the content) but **every layout is ours**. Never edit `_vendor/`; override instead:

- `layouts/` — `baseof.html`, `home.html`, `single.html` / `list.html` (docs shell), `docs/`, `guides/`, `blog/`, `term.html`, `taxonomy.html`, `404.html`, `_partials/` (`header`, `footer`, `search`, `docs/*`, `home/*`, `guides/*`, `blog/*`, `svg/*`, `features/*`), `_shortcodes/` (`under-surface`, `shot`, `asset-url`).
- `assets/css/pando/*.css` — tokens and components, concatenated in file-name order into `css/pando.css` by `layouts/_partials/custom/head-end.html`. `assets/css/custom.css` only holds hextra variable overrides.
- `assets/js/head/theme.js`, `assets/js/core/theme.js`, `assets/js/core/menu.js` — replace hextra's files of the same name. `assets/js/core/pando.js` is ours (copy buttons, tabs, guides filter, video).
- `data/features.yaml` — features by stratum (surface / roots / soil). Add an entry whenever a page is added under `docs/features/`; home chips, counts and the sidebar are generated from it.
- `data/tracks.yaml` — guide tracks.
- `i18n/en.yaml`, `i18n/es.yaml` — every UI string. No hardcoded copy in templates.
- `static/fonts/` — self-hosted fonts. Kanji faces are subsets: a new kanji needs a regenerated subset (see the comment in `assets/css/pando/00-tokens.css`).

Rules:

- Brand marks (Pando 木, Remembrances 本, Mesnada 众) are the official ones from `assets/pando-brand-v1/` in the `pando` repo, inlined in `layouts/_partials/svg/mark-*.html`. The marks drawn in the design boards are not official: never copy them.
- Theme: `html.dark` (hextra) and `html[data-theme]` (design) are set together by `assets/js/head/theme.js`.
- Every URL must work under a subpath (`relURL`, `relLangURL`, `.RelPermalink`): GitHub Pages serves the site from `/pando-docs/`.
- Gold as text in light mode is `--acc` (`#8F6310`); `--node` (`#C68A17`) is for marks and flows only.

### Guides

`content/<lang>/guides/<slug>.md`, same slug in every language. Start from `hugo new content guides/<slug>.md` (archetype documents the front matter: `track`, `level`, `weight`, `featured`, `home`, `planned`, `video`, `chapters`). Each `##` is one numbered step. Shortcodes: `under-surface` (callout) and `shot` (screenshot, placeholder when `src` is empty).
