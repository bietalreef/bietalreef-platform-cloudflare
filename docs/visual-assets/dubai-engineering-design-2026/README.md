# Dubai engineering and design — review assets

14 original visual concepts, each with a mobile version. 24 WebP files and 4 production SVG files, plus manifest.json.
Asset destination: `public/images/uae-2026/sectors/dubai/interior-design/`. Review branch: `assets/dubai-engineering-visuals-20261107`.
This is a media-only delivery. No route, page, taxonomy, company profile, general-contracting asset, production branch or deployment configuration is changed.

## Delivery archive

- `public/`: only web-ready assets and manifest.
- `source/originals/`: 12 high-quality PNG masters (11 distinct scenes plus the separate portrait hero).
- `source/editable/`: 6 original SVG masters for visuals 10–12 and their mobile layouts; reproducible diagram builder.
- `source/catalog.json` and `source/prompts.json`: bilingual editorial mapping and generation prompts.
- `source/references/`: supplied guide and taxonomy reference, preserved as source documents.
- `review/index.html`: offline bilingual visual review, with mobile image selection and external HTML legends.
- `docs/visual-assets/dubai-engineering-design-2026/`: mapping, quality report and verification evidence.

## Integration after approval

Use one H1 for the page, H2 for major sections and H3 for subtopics. The attached reference is not a page patch. Preserve existing category IDs and routes.
Choose the portrait hero at narrow widths and its 1920×1080 version on desktop, with explicit dimensions for both sources; load the hero eagerly with high fetch priority. Use 600×450 mobile sources for the other photographic scenes, and the rearranged mobile diagrams. Lazy-load below-fold assets.
The original SVG diagrams contain only neutral numbers and 2D/3D/BIM labels; the bilingual legends in the manifest must be rendered as ordinary HTML beside them. Do not mirror the diagrams for RTL.
The expected bietalreef.ae URLs are planned destinations, not live-link claims. GitHub raw links are the upload verification targets.
All imagery is illustrative. Display the supplied generation caption; do not attribute a synthetic person, hypothetical project or studio to a real registered business.

## Reproduction

Run `python source/editable/build_diagrams.py`, then run `source/assemble_delivery.py` with Python 3 and Pillow, ImageMagick and Inkscape available. Raster masters remain unchanged; export performs resizing/compression only.
Do not run deployment commands or change production files as part of this media review.
