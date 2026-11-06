# Dubai maintenance and finishing — review media

16 original visual concepts with 16 mobile variants: 26 WebP files and 6 SVG files, plus manifest.json.
Repository: bietalreef/bietalreef-platform-cloudflare. Review branch: `assets/dubai-maintenance-visuals-20261107`. Destination: `public/images/uae-2026/sectors/dubai/general-maintenance/`.
Media-only delivery. No published page, production branch, deployment configuration, taxonomy, service ID, company record or earlier visual collection is changed.

## Contents

- `public/`: web-ready files and bilingual manifest only.
- `source/originals/`: 14 high-quality generated PNG masters: 13 scenes plus a separately composed portrait hero.
- `source/editable/`: six editable SVG masters, with their original Python builder.
- `source/prompts.json`, `catalog.json`, `legends.json`, `service-coverage.json`: provenance and bilingual editorial mapping.
- `source/references/`: supplied full guide, production brief and taxonomy draft.
- `review/index.html`: offline bilingual review with native responsive pictures and adjacent HTML legends.
- `review/contact-sheet.webp`: overview of all 16 concepts.
- `docs/visual-assets/dubai-general-maintenance-2026/`: placement map, coverage, quality, validation and upload reports.

## Integration after approval

Keep one H1, H2 for major sections and H3 for details. The page is not edited in this delivery. Set explicit image dimensions. Use the portrait hero on narrow screens and a high fetch priority for the initial hero; lazy-load other images. Use 600×450 variants for non-hero photos and the separate mobile SVG layouts.
The existing DirectoryResponsiveImage component uses a different width convention; integration must deliberately adapt its srcset behavior or use a compatible picture element. Do not assume the present filenames automatically match that component.
Use the same art for Arabic and English and never mirror these diagrams for RTL. Put image titles, explanatory legends, real quotation tables and calls to action in HTML. Diagram symbols alone do not replace the accessible text.
Display the supplied illustrative caption. Synthetic people and buildings must never be credited to real registered companies or used as project proof. The ten specialties/105 entries are draft editorial context, not evidence of registration eligibility.
Planned bietalreef.ae links are intentionally not verified as live assets because this collection is not deployed. The actual GitHub and raw links are verified in the upload report.
The prepared HTML is an offline review file, not a new application, route or website. No performance improvement or search ranking is guaranteed.

## Reproduction

Run `python source/build_catalog.py`, then `python source/editable/build_diagrams.py`. With the preserved PNGs in place, run `source/assemble_delivery.py` with Python/Pillow, ImageMagick and Inkscape available. Run `source/validate_assets.py` for package checks. Keep source PNGs and raw working files outside public.
No deployment command is part of this workflow.
