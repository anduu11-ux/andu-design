---
version: alpha
name: andu design — Contour
description: Dark, calm, proof-first studio site. Glowing topographic contour lines (violet to cyan) behind the hero, then faint aurora light; the client's real work leads; white type does the hierarchy; one steel-blue accent. Source of truth is v2 (/v2.html, src/v2/index.css).
colors:
  primary: "#F4F7FC"
  on-primary: "#080B12"
  primary-hover: "#D9E2F0"
  secondary: "#94B4E6"
  tertiary: "#7C3AED"
  tertiary-cyan: "#22D3EE"
  neutral: "#080B12"
  on-surface: "#B2B5BA"
  on-surface-muted: "#8A8D93"
  on-surface-dim: "#666970"
  outline: "#1B1E25"
  outline-strong: "#24272E"
  placeholder: "#FACC15"
typography:
  headline-display:
    fontFamily: Geist
    fontSize: 58px
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: -0.035em
  headline-display-sm:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: -0.035em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: -0.03em
  headline-lg-sm:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.03em
  headline-md-sm:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.03em
  headline-sm:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.02em
  quote:
    fontFamily: Geist
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.01em
  title-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
  label-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.2
  caption:
    fontFamily: Geist
    fontSize: 12.5px
    fontWeight: 400
    lineHeight: 1.4
  brand:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.02em
rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 10px
  lg: 12px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 56px
  xxl: 96px
  section: 176px
  gutter: 40px
  nav-height: 64px
  container: 1120px
  prose: 520px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 12px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 8px 14px
  text-link:
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.label-md}"
  text-link-hover:
    textColor: "{colors.primary}"
  domain-link:
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 6px 12px 6px 14px
  nav-bar:
    backgroundColor: "rgba(8, 11, 18, 0.8)"
    textColor: "{colors.on-surface-muted}"
    height: 64px
  screenshot-frame:
    rounded: "{rounded.md}"
  feature-icon:
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 7px
  client-quote:
    textColor: "{colors.primary}"
    typography: "{typography.quote}"
  email-copy:
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: 4px 4px 4px 16px
  placeholder-mark:
    backgroundColor: "rgba(250, 204, 21, 0.22)"
    textColor: "{colors.primary}"
    rounded: "{rounded.xs}"
  footer:
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.caption}"
    padding: 24px 40px
---

# andu design — Contour

## Overview

andu design designs and builds websites for real small businesses. Its clients so far are MC Fiduciaire, a Belgian accounting firm with 500+ clients, and EGMA Construction, a renovation contractor in Booischot. The people deciding are business owners, not developers, so the site should feel **calm, warm and trustworthy**. It leads with the client's real work. Effects never lead.

The look is **near-black with a faint navy cast and white type, lit rather than boxed**. Behind the hero, glowing **topographic contour lines** run from violet (#7C3AED) through cyan (#22D3EE), kept deliberately dim. As you scroll, they hand over to a faint **aurora**: two soft pools of the same violet and cyan light over fine film grain. The energy comes from the work. The background only sets the mood.

Tone of copy: short, concrete, first person plural, no jargon. A visitor who has never built a website should understand every line. Headlines are **two-tone**: the half that carries the point is bright, and the rest is quieter and starts its own line ("Websites that / **grow your business**", "**Proof,** / not promises.").

## Colors

Hierarchy comes from **white at different strengths**, not from hue. There is exactly one UI accent.

- **Primary, Paper White (#F4F7FC):** headlines, the brand name, the promise half of the hero headline, and the fill of the one primary button per view. On hover the button warms to #D9E2F0.
- **On-primary, Ink (#080B12):** text on white buttons. It is the page background colour.
- **Neutral, Night (#080B12):** the page background everywhere. There are no card or panel backgrounds.
- **On-surface (#B2B5BA, 9.6:1):** body text; white at 72% over Night.
- **On-surface-muted (#8A8D93, 5.9:1):** descriptions, nav links, captions, footer; white at 55%.
- **On-surface-dim (#666970, 3.6:1):** only the quieter half of two-tone headlines, 30px and up. Never for small text.
- **Secondary, Steel Blue (#94B4E6):** the single accent. Used for focus rings and text selection.
- **Tertiary, Violet (#7C3AED) and Tertiary-cyan (#22D3EE):** never flat UI colour. They appear only as light: the dimmed contour lines and the aurora (roughly 16% and 10% strength over Night).
- **Outline (#1B1E25) / Outline-strong (#24272E):** 1px hairlines.
- **Placeholder (#FACC15):** development only. It highlights facts the studio still has to supply, such as the client quote. It must never ship.

## Typography

One family, **Geist** (variable, self-hosted as "Geist Variable"), at weight 500 for headings and 400 for text. Only the brand name is 600, and it is always lowercase: "andu design".

- **Scale, desktop / phone:** display 58/36, section titles 48/30, project name 36/24, body 16. Every step is clearly distinct, and the page H1 is always the largest.
- **Headlines** are tight (line-height 1.04–1.1), tracked in (-0.03 to -0.035em) and balanced. The hero's copy column is sized so "grow your business" always fits on one line in the two-column layout.
- **Body** is 16px/1.65 in On-surface-muted, at 44–60 characters per line. Legal pages use a 520px column, about 55–66 characters per line.
- **Feature text** is 15px, titles 16px/500, labels and buttons 14px, and the footer 12.5px.
- **The client quote** is 21px in Paper White with a 1px hairline on its left.

## Layout

- The content column is **1120px max** with a fluid **24–40px** gutter, shared by the nav, hero, sections and footer, so everything aligns on one left edge. Legal pages use a **520px prose column**.
- **The hero is two columns** (1.15fr / 1fr): headline, lead and buttons on the left; a framed screenshot of the MC Fiduciaire homepage on the right. Under 900px it stacks, with the screenshot below the copy.
- **Each project** reads as: name with its live domain link, summary, client quote, then a feature grid. The grid has two text features side by side, one wide 2:1 screenshot, then two screenshots side by side. It collapses to one column under 700px. The next project starts after section-sized space (112–176px), with no divider.
- **The closing section** is centred: the headline, one line on what to send, then "Email us" beside the visible, copyable address. Phone and WhatsApp links sit on a row below.
- The nav is fixed and 64px tall, Night at 80% with a 24px blur. The brand never wraps, and "Projects" hides under 420px, where the hero's "See our work" covers it.

## Elevation & Depth

This design is **flat, and lit rather than stacked**.

- **No boxed sections and no card containers.** Content sits directly on the page.
- **Glass frame (screenshots only):** a 1px hairline, an 8px soft ring (white at 3.5%), a 9px hairline ring (white at 9%) and a deep offset shadow (0 40px 80px -32px, black at 80%).
- **Translucent chrome:** only the nav uses a backdrop blur, for legibility over content.

## Shapes

- **4px** for placeholder marks
- **8px** for buttons and icon squares
- **10px** for screenshots
- **12px** for the email block, so its 8px button sits concentrically inside it
- **round** for the domain link

Borders are always 1px hairlines. Icons are Lucide at a 2px stroke, 14–20px.

## Components

- **Primary button:** a white fill with Ink text, 14px/500, 12×20px, 8px radius. Hover warms it to #D9E2F0; press scales it to 0.98. **One per view:** "See our work" in the hero, "Email us" at the close.
- **Outline button:** the nav's Contact. Transparent, with a 1px white ring at 28%, Paper White text and an arrow.
- **Text link:** muted, 14px, with a chevron that nudges 2px on hover.
- **Domain link:** a round hairline link to the live site, with an up-right arrow and "(opens in a new tab)" for screen readers.
- **Feature item:** a framed screenshot where there is one, then an icon in a hairline square, a 16px title and 15px muted text. There is no card behind it.
- **Languages list:** the seven language names as plain text separated by middots, each marked with its `lang`. They aren't buttons, so they don't look like them.
- **Email block:** the address as a link, plus a Copy button. If clipboard access is blocked, the button selects the address and says "Press Ctrl+C", and both states are announced to screen readers.
- **Phone and WhatsApp:** two text links on a row under the email block. Each has a leading icon (Phone, MessageCircle) and shows the full number. They're 44px tall so they're easy to tap. WhatsApp opens in a new tab, with a first line already typed.
- **Footer:** a hairline top border, 12.5px muted text, and Privacy / Cookies links.
- **Favicon:** the andu mark on a Night tile with rounded corners, in `public/v2-favicon.svg`. The mark is the A drawn as a summit ringed by contour lines: one white peak line with two violet-to-cyan lines nested inside it. Every logo (lockups, marks, icon) is in `brand/logo/`, and the print PDFs are in `brand/print/`; `node brand/build.mjs` rebuilds both.

## Motion

For coding agents; Stitch mocks are static.

- **One authored moment:** on arrival, the headline, lead, client screenshot and buttons come in as one short stagger, 90ms apart. Each rises 16px as it fades in over 700ms with `cubic-bezier(0.22, 1, 0.36, 1)`. There is no intro screen and nothing to wait for.
- **Scroll:** the contour canvas fades out and the aurora fades in between 30svh and 90svh of scrolling. Nothing else animates on scroll: no pinned sections, no per-section reveals.
- **Ambient:** the aurora drifts very slowly (60s and 76s loops). The canvas stops drawing once it's faded out or the tab is hidden.
- **Reduced motion:** the contour lines keep morphing, at half speed, because the owner wants them alive for everyone. Everything else rests: no aurora drift, and fades replace every movement.
- Hover transitions take 180–350ms.

## Screens

1. **Home.** A fixed nav, then the two-column hero:
   - **Left:** the two-tone H1 "Websites that / grow your business", the lead, "See our work" (primary) and "Contact us" (text link).
   - **Right:** the MC Fiduciaire homepage in a glass frame, captioned "A site we built for MC Fiduciaire, an accounting firm with 500+ clients."

   Below the hero, **Projects** opens with "Proof, / not promises.", then each project in turn (MC Fiduciaire, then EGMA Construction): name, domain link, summary, client quote and feature grid. The centred **closing section** follows, then the footer.
2. **Privacy Policy** and **Cookie Policy.** The same nav and footer, the aurora always on, and a 520px prose column: the H1, a muted lead, the "Last updated" date, numbered H2 sections, disc lists and underlined links.

## Do's and Don'ts

- Do lead with proof: real screenshots and a real client quote. The background only sets the mood.
- Do keep one left edge, and exactly one white button per view.
- Do use two-tone headlines where the bright half carries the point.
- Do write for a business owner, not a developer.
- Don't add intro screens, loaders or anything that makes the visitor wait or watch before reading.
- Don't use violet or cyan as flat fills, buttons or text. They are light, and they stay dim.
- Don't put a label or eyebrow above a heading, a pill above the H1, or monospace "tech" costume anywhere.
- Don't put sections or projects inside boxed cards; it makes them read as pop-ups.
- Don't use On-surface-dim under 30px; it fails contrast there.
- Don't ship a yellow placeholder: every one marks a fact the studio still has to supply.
