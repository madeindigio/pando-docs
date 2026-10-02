---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
shortTitle: ""          # sidebar / pager label
description: ""         # lead under the title, and the card text on the index
track: surface          # surface | roots | soil  (data/tracks.yaml)
level: beginner         # beginner | intermediate | advanced
weight: 10              # order inside the guides section
featured: false         # true on ONE guide: the "Start here" block of the index
home: false             # true to show it in the home page teaser (first 3 by weight)
planned: false          # true while the guide is only an outline
video:
  provider: youtube
  id: ""                # empty: the poster shows "video coming soon"
  subtitles: [en, es]
chapters:               # one per `##` step, in order
  - { t: "00:00", title: "" }
---

## First step

Each `##` heading is one numbered step.

{{</* shot src="" alt="What the capture shows" */>}}

{{</* under-surface */>}}
What Pando did below what the reader saw.
{{</* /under-surface */>}}
