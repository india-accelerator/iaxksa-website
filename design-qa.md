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

## Counter animation QA — 2026-08-20

- Source visual truth: `C:\Users\macsh\AppData\Local\Temp\codex-clipboard-7e62e115-6125-41fe-afa7-ccd8db08b791.png`
- Browser-rendered implementation: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\implementation-hero.png`
- Requested viewport: 1823 × 825 CSS px at 1× density.
- Source pixels: 1823 × 825. Implementation pixels: 1808 × 818 because the browser capture excludes its scrollbar area.
- State: desktop hero after all four number counters settled.
- Full-view evidence: the reference omits the header while the browser capture includes it; the underlying hero composition, typography, colors, summary card, CTAs, and metrics row remain unchanged.
- Focused-region evidence: the metrics finish at `$15M`, `10`, `6 mo`, and `150+`. Each value retains the existing display font, 42px rendered height, gold token, label copy, and column alignment. Frames were observed at zero, intermediate values, and the final values.
- Fonts and typography: unchanged; the counter inherits the metric styles and uses tabular numerals.
- Spacing and layout rhythm: unchanged; prefixes and suffixes remain inline and the four columns retain equal 135.5px widths.
- Colors and visual tokens: unchanged; values inherit `--aa-gold-soft`.
- Image quality and asset fidelity: no visual assets were changed.
- Copy and content: all four values and labels match the source exactly after settling.
- Interaction checks: each counter counts upward once on entry; `$`, `M`, ` mo`, and `+` formatting is preserved; reduced-motion users receive the final value without spring animation.
- Console errors: none.
- Production build: passed.
- Comparison history: the initial focused comparison passed; no P0, P1, or P2 fixes were required.
- Follow-up polish: none required for this change.

final result: passed

## Hero section-boundary QA — 2026-08-20

- Source visual truth: `C:\Users\macsh\AppData\Local\Temp\codex-clipboard-025e4454-8b08-41ef-b87e-3d1d4b43f072.png`
- Browser-rendered implementation: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\hero-boundary-final.png`
- Source crop: 1293 × 278 pixels at 1×. Browser verification viewport: 1280 × 720 CSS px at 1×, captured as 1265 × 712 pixels after scrollbar exclusion.
- State: desktop page at scroll position zero, with counters settled on `$15M`, `10`, `6 mo`, and `150+`.
- Full-view evidence: the hero begins below the 78.8px header and ends at 720.8px; the next section begins at the same 720.8px boundary, outside the 720px viewport.
- Focused-region evidence: the `Start of the journey` pill is no longer visible in the initial viewport. The complete metric row and Program Summary card remain visible without scrolling.
- Fonts, typography, colors, assets, and copy: unchanged.
- Spacing and layout rhythm: the desktop hero now has a viewport-derived minimum height. Mobile behavior is unchanged because the rule is scoped to the existing desktop media query.
- Console errors: none.
- Production build: passed.
- Comparison history: the prior compact layout allowed the next-section pill to peek above the fold; the final pass aligns the section boundary with the viewport bottom.
- Findings: no remaining P0, P1, or P2 issues in the requested hero-boundary scope.

final result: passed

## Hero viewport-fit QA — 2026-08-20

- Source visual truth: `C:\Users\macsh\AppData\Local\Temp\codex-clipboard-aea45833-3f34-4785-8947-b1b551823119.png`
- Browser-rendered implementation: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\hero-fit-final.png`
- Source viewport: 1844 × 916 pixels at 1×. Browser verification viewport: 1280 × 720 CSS px at 1×, captured as 1265 × 712 pixels after scrollbar exclusion.
- State: desktop page at scroll position zero, counters settled on `$15M`, `10`, `6 mo`, and `150+`.
- Full-view evidence: the complete hero now ends at 700.2px in a 720px viewport. The header, kicker, full headline, description, CTAs, metric values and labels, complete summary grid, Apply Now button, and Know More button are simultaneously visible without scrolling.
- Focused-region evidence: the left content column ends at 668.2px and the summary card ends at 668.2px, preserving their shared baseline. The summary card retains its 474px width and all row content remains unwrapped beyond the intended lines.
- Fonts and typography: all font families, weights, sizes, line heights, and headline wrapping are unchanged.
- Spacing and layout rhythm: desktop-only hero top/bottom padding, headline margins, copy-to-CTA gap, metrics offset, and summary-card offsets were reduced. Mobile spacing remains unchanged.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: no image assets were changed.
- Copy and content: unchanged; all labels and actions remain visible.
- Primary interaction checks: counter animation settles correctly; all hero and summary CTAs remain enabled links.
- Console errors: none.
- Production build: passed.
- Comparison history: the supplied state clipped metric labels and the Know More control; the compact pass brought both columns inside the viewport with 19.8px of remaining vertical clearance at 720px.
- Findings: no remaining P0, P1, or P2 issues in the requested desktop hero scope.

final result: passed

## Program Snapshot viewport-fit QA — 2026-08-20

- Source visual truth: `C:\Users\macsh\AppData\Local\Temp\codex-clipboard-38510ad6-5471-4f13-8296-997806062beb.png`
- Map-size refinement source: `C:\Users\macsh\AppData\Local\Temp\codex-clipboard-d943f01d-a756-4b61-91ea-1fb534eacd9b.png`
- Browser-rendered implementation: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\snapshot-viewport-final.png`
- Source viewport: 1815 × 902 pixels at 1×. Browser verification viewport: 1280 × 720 CSS px at 1×, captured as 1265 × 712 pixels after scrollbar exclusion.
- State: desktop Program Snapshot content aligned near the viewport top, matching the supplied source state.
- Full-view evidence: all seven roadmap rows and the complete market card—including Vision 2030 copy and every sector chip—fit together within the captured viewport. The grid occupies 593.6px vertically and ends at 670.4px in a 720px viewport.
- Focused-region evidence: the Saudi map was increased from 288 × 244px to 336 × 285px while the surrounding card spacing was reduced slightly. The larger map remains centered, sharp, and fully contained.
- Fonts and typography: families, weights, hierarchy, wrapping, and letter spacing remain unchanged; only the desktop Vision 2030 maximum size was tightened to support the compact layout.
- Spacing and layout rhythm: desktop-only row padding, grid gap, card padding, and section bottom spacing were reduced proportionally. Mobile rules remain unchanged.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: the original Saudi map asset remains in use with its aspect ratio preserved.
- Copy and content: all seven roadmap items, market title, Vision 2030 description, and sector labels remain unchanged.
- Console errors: none.
- Production build: passed.
- Comparison history: the first compact pass fit the screen but left the map undersized; the follow-up increased the map to 21rem and reduced its vertical margin, with post-fix browser evidence captured above.
- Findings: no remaining P0, P1, or P2 issues in the requested desktop section scope.

final result: passed

## Section scroll-snap QA — 2026-08-20

- Source visual truth: `C:\Users\macsh\AppData\Local\Temp\codex-clipboard-aea45833-3f34-4785-8947-b1b551823119.png`
- Browser-rendered implementation: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\section-scroll-snap-final.png`
- Snapped next-section evidence: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\section-scroll-snap-about.png`
- Source pixels: 1844 × 916 at 1×. Implementation viewport: 1280 × 720 CSS px at 1×, captured as 1265 × 712 pixels after scrollbar exclusion.
- State: desktop landing page at scroll position zero, followed by a downward scroll request from 0px toward 420px.
- Full-view comparison evidence: the initial hero remains visually unchanged and fully visible; no spacing, typography, color, image, or copy drift was introduced.
- Focused interaction evidence: the browser reports `scroll-snap-type: y mandatory`; a partial downward scroll settles at 720.8px with the `#about` section exactly at viewport top, and the following partial scroll settles at 1535.2px with `#ecosystem` at viewport top.
- Fonts and typography: unchanged.
- Spacing and layout rhythm: unchanged; snapping alters only scroll resting positions.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: unchanged; all existing source assets remain intact.
- Copy and content: unchanged.
- Accessibility and responsiveness: snapping is limited to desktop viewports and disabled when reduced motion is requested. Smaller screens keep native scrolling for long-form readability.
- Production build: passed.
- Comparison history: the first implementation pass produced correct section boundaries with no P0, P1, or P2 visual or interaction issues, so no corrective iteration was required.
- Findings: no remaining P0, P1, or P2 issues in the requested section-navigation scope.

final result: passed

## Snapshot image-containment QA — 2026-08-20

- Source visual truth: `C:\Users\macsh\AppData\Local\Temp\codex-clipboard-d3a3e67e-3592-4e91-9a7c-bc6e7563a60d.png`
- Browser-rendered implementation: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\snapshot-image-containment-final.png`
- Source pixels: 1192 × 868 at 1×. Implementation viewport: 1192 × 868 CSS px at 1×, captured as 1177 × 857 pixels after scrollbar exclusion.
- State: desktop Program Snapshot section snapped to the viewport start.
- Full-view comparison evidence: the complete roadmap list and market card remain aligned in the intended two-column composition; the market card ends inside the section with no horizontal page overflow.
- Focused-region evidence: the market card spans x=633.8–1117.2px and the map spans x=707.5–1043.5px, keeping the image fully inside the card. At the tight 1024px desktop breakpoint the map remains contained inside the 411.5px card, and document `scrollWidth` equals `clientWidth`.
- Fonts and typography: unchanged.
- Spacing and layout rhythm: unchanged; only defensive minimum-width, maximum-width, and clipping constraints were added.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: the original Saudi map asset remains in use at its intended aspect ratio with `object-fit: contain`.
- Copy and content: unchanged.
- Production build: passed.
- Comparison history: the supplied state showed the media escaping its intended section boundary. The fix constrains the grid children, card, picture, and image to the available track width; post-fix measurements confirm containment at both 1192px and 1024px.
- Findings: no remaining P0, P1, or P2 issues in the requested image-containment scope.

final result: passed

## Snapshot single-panel QA — 2026-08-20

- Source visual truth: `C:\Users\macsh\AppData\Local\Temp\codex-clipboard-5b8d9107-9cf9-46c8-8bf2-dba84c140b59.png`
- Wide browser implementation: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\snapshot-single-panel-wide-final.png`
- Short-desktop implementation: `C:\Users\macsh\Downloads\iaxksa-website-main\repo\output\design-qa\snapshot-single-panel-final.png`
- Source pixels: 1767 × 905 at 1×. Wide verification viewport: 1767 × 906 CSS px at 1×, captured as 1752 × 897 pixels after scrollbar exclusion. Short verification viewport: 1280 × 720 CSS px at 1×, captured as 1265 × 712 pixels.
- State: Program Snapshot section snapped to the viewport start.
- Full-view comparison evidence: the heading, seven roadmap rows, target-market card, Saudi map, Vision 2030 copy, and sector chips appear together inside one section at both tested desktop heights.
- Focused interaction evidence: at 1280 × 720, `#ecosystem` measures exactly 720px high, begins at the viewport top, and `#journey` begins at 719.9px. A native downward scroll settles on this single section boundary.
- Fonts and typography: unchanged.
- Spacing and layout rhythm: short-desktop card padding and internal vertical gaps were tightened; the desktop section now occupies one viewport. Taller desktop screens restore the roomier card spacing.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: the original map remains sharp and contained; it scales from 336px wide on short desktops to 420px wide when vertical space allows.
- Copy and content: unchanged.
- Production build: passed.
- Comparison history: before the fix, the Snapshot section measured 817.1px in a 720px viewport and required an extra partial scroll. The final section measures 720px at that viewport and 905.6px at the supplied wide state, so the whole composition is one snap panel.
- Findings: no remaining P0, P1, or P2 issues in the requested single-section scope.

final result: passed
