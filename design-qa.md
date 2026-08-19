# Arabian Accelerator design QA

## Evidence

- Source: `C:\Users\macsh\Downloads\8b667bac-69de-490f-9fa0-287ec6ad4d85.pdf`
- Source render: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\reference-1440.png`
- Implementation render: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\implementation-1440.png`
- Combined comparisons:
  - `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\comparison-hero.png`
  - `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\comparison-mid.png`
  - `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\comparison-benefits.png`
  - `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\comparison-closing.png`
- Reference viewport: 1440 × 8244 CSS pixels, normalized from the 1080 × 6182.88 point PDF page at 96 DPI.
- Implementation viewport: 1440 CSS pixels wide at 1× density; the browser content box is 1425 pixels after its scrollbar. The implementation screenshot was padded to 1440 for the paired comparison.
- State: initial public landing page, menu closed, no hover state.

## Full-view comparison

The 1440px implementation follows the PDF's full section sequence, visual hierarchy, navy-to-blue page field, gold accents, Fraunces/Inter/JetBrains Mono type system, card silhouettes, extracted illustrations, and closing composition. The final reserved document height is 8244px and the measured desktop section anchors align to the PDF within 0–3px.

## Focused comparison findings

| Area | Result | Notes |
| --- | --- | --- |
| Header and hero | Pass | Header height, gutters, hero baseline, summary card, buttons, and metrics align with the source. |
| Origin and snapshot | Pass | Extracted source artwork, split layout, list rhythm, Saudi map card, and typography match. |
| Journey | Pass | Five-card desktop sequence, line, and active gold marker match; mobile becomes a vertical timeline. |
| Benefits | Pass | Four alternating cards retain the source proportions, image treatments, copy, and spacing. |
| Cohort, partners, CTA, footer | Pass | Source-derived logo strips and partner artwork match; footer copy was corrected to the PDF's About/Journey/Founders/Cohort/Apply set. |

## Findings and fixes

- P1 — At 375px the desktop header CTA was winning the cascade and colliding with the brand. Fixed with an explicit mobile-hidden selector; the menu remains available and the CTA is present inside it.
- P1 — Lighthouse found invalid description-list nesting in the program summary. Replaced it with a semantic list while preserving the exact grid styling.
- P1 — Brand links used an accessible name that did not include all visible text. Removed the overriding label so the visible brand copy is the accessible name.
- P2 — Footer navigation reused the header's KSA Ecosystem label. Added footer-specific data so it matches the PDF's Cohort label.
- P2 — Off-screen rendering initially changed the reserved page length. Added section-specific mobile and desktop intrinsic-size tokens, restoring the exact 8244px desktop and 11494px mobile document geometry while retaining the performance gain.

## Responsive and interaction QA

- 375px: one `h1`, no horizontal overflow (`scrollWidth === clientWidth`), no clipped or overlapping content.
- Mobile menu: opens without JavaScript, exposes all five actions, closes when a section link is chosen, and lands `#about` beneath the header.
- Primary CTA: verified from the landing hero to the preserved `/apply` application flow.
- Desktop navigation and footer links: verified as real anchors/routes.
- Focus: all interactive elements use the shared visible `:focus-visible` ring.
- Reduced motion: transitions are reduced under `prefers-reduced-motion`.
- Browser console: no warnings or errors after the final interaction run.

## Automated checks

- `npm exec tsc -- --noEmit`: pass.
- `npm run build`: pass; `/` and `/apply` prerender statically and both webhook APIs remain dynamic.
- Lighthouse desktop production run: Performance 97, Accessibility 100; FCP 0.7s, LCP 1.0s, TBT 90ms, CLS 0. The JSON report is preserved at `output/design-qa/lighthouse-final.json`; Lighthouse completed the report before its Windows temp-folder cleanup warning.

## Final verdict

Passed. No unresolved P0, P1, or P2 visual issues remain.
