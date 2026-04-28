# assets/

Source / unprocessed design files. **Nothing in this folder is served by the
live site** — these are the originals. The website serves files from
`website/public/` instead.

```
assets/
├── images/    ← raw photos and supplier logos (originals)
└── logos/     ← original master SVGs from the designer
```

## Workflow

1. Designer drops a new file in here (e.g. `assets/images/new-photo.png`).
2. Optimise / rename it for the web.
3. Copy the optimised version into `website/public/images/` with a
   web-friendly name like `industry-foo.png` or `founder-name.jpg`.
4. Reference it in code as `/images/...` (paths in `website/public/` map
   directly to the URL root).

For logos specifically, the deployed variants live in
`website/public/logos/` and are exposed for download at `/logos` on the live
site.
