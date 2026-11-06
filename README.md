# Social Matters — website

Marketing site for Social Matters, built with React 19, Vite, GSAP (ScrollTrigger), Lenis and React Router.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # serve the build on :4173
npm run lint      # oxlint
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero (split headline, mission window expands to full screen), About statement (hover words pop image stacks), Zeus interactive comic (8 missions), Services horizontal scroll, Works (sticky "WORKS" + rising grid), Why Social Matters |
| `/services` | Sticky index and a chapter for each service (`/services#branding`, `#web` and so on) |
| `/work`, `/work/:slug` | Filterable portfolio and case pages |
| `/process` | Eight missions as a hover list; Zeus appears on each row |
| `/about` | Story, numbers, mission-log timeline, leadership, offices |
| `/contact` | Project brief form |
| `*` | 404 |

## Where things live

```
src/
  data/          all copy and facts (site.js, services.js, work.js, process.js, milestones.js)
  lib/           gsap.js (plugin registration, media queries), SmoothScroll.jsx + lenis.js, hooks.js
  layouts/       SiteLayout: header, footer, route scroll reset and hash scrolling
  components/    Header, Footer, Button, PageHero, Hotspot
    motion/      SVG motion kit: Spark, Constellation, OrbitGraphic, SectionConnector
    portfolio/   ProjectShowcase (row layout + route), ProjectTile, layout.js
  sections/home/ homepage sections; comic/ holds the Zeus comic
  pages/         one file per route
  styles/        tokens.css (design tokens), base.css
  assets/        brand/, zeus/ (transparent poses), work/, space/
```

Edit content in `src/data/*`. Components only render it.

## Animation notes

- **Lenis** is created once in `SmoothScroll.jsx` and driven by GSAP's ticker, so ScrollTrigger and Lenis share a frame. It is not created when the visitor prefers reduced motion.
- Every animation lives inside `useGSAP` + `gsap.matchMedia()`, so it is reverted on unmount and skipped when motion is reduced.
- **Zeus comic** (`sections/home/comic/`):
  - `choreography.js` holds each mission's timeline: the shared beats (pose A → bubble → props → pose B → checklist → hotspots), plus a prop animation and an entrance specific to each mission.
  - Desktop (≥1024 × 640, motion allowed) uses one pinned stage with a scrubbed master timeline. The mission nav jumps to timeline positions.
  - Smaller screens and reduced motion stack the frames vertically. Each frame plays once when it scrolls into view, and the nav becomes sticky.
- **SVG motion language**: thin routes, sparse points, one yellow accent per moment.
  - `Constellation`: points appear, lines draw, and each end point brightens once.
  - `OrbitGraphic`: a marker closes an orbit, then a focal star lands (footer CTA).
  - `SectionConnector`: a short route scrubbed between chapters.
  - Everything plays once (or scrubs) and is skipped on phones and with reduced motion (`MQ.deco`). The default state is the finished drawing.
  - Zeus-linked traces live in `comic/Scene.jsx` (`ZeusTrace`, `art-links`) and are timed in `choreography.js`.
- **Drawing lines**: use GSAP's `DrawSVGPlugin` (`{ drawSVG: '0%' } → { drawSVG: '100%' }`), not `pathLength="1"` + dash offsets. With `vector-effect: non-scaling-stroke` on a stretched SVG, normalised dashes cover only part of the line. The one CSS-only exception is the portfolio hover frame, which is drawn in pixel units (no viewBox).
- **Portfolio layout**: `format` in `data/work.js` (`landscape`, `square`, `identity`, `panorama`) decides the composition (feature, offset pair, editorial split or cinematic strip). The same rules handle any filtered list on `/work`.
- **Route changes**: `ScrollReset` (in `SiteLayout`) resets the scroll before the new page creates its ScrollTriggers. Keep it as the sibling before `<Outlet />`.
- Don't put CSS `translate`/`rotate`/`scale` properties on elements that GSAP animates. GSAP folds them into its own transform using the pixel values at that moment. Centre with margins, or use `transform` instead.

## Contact form

Set `VITE_CONTACT_ENDPOINT` (Formspree, Basin, or your own API that accepts a JSON POST) in `.env` to send submissions directly:

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Without it, the form validates and then opens the visitor's email app with a pre-filled message to hello@socialmatters.agency.

## Deploying

This is a single-page app, so the host must serve `index.html` for unknown paths. The repo includes:

- `public/.htaccess` for Apache/cPanel
- `public/_redirects` for Netlify
- `vercel.json` for Vercel

## Assets

- `assets/brand/logo.png` is the supplied logo, unchanged. `logo-mark.png` and `public/favicon.png` are crops of it.
- `assets/zeus/zeus-hero.webp` is the supplied Zeus render (already transparent).
- The other `assets/zeus/*.webp` files were cut from the supplied expression sheet with `scripts/extract-zeus-poses.mjs`, using flood-fill background removal and a 2× upscale. They are about 300–400 px tall, so keep them at or below roughly that display size. For larger use, ask for higher-resolution renders of the poses.
- `assets/work/*` come from the agency's project folders. `assets/space/*` come from the `sm/` folder.

## Before launch

- **Portfolio (`src/data/work.js`):** confirm each client is happy to be shown, and check the scope tags. Summaries describe only what the artwork shows. No results are claimed.
- **Facts** (250+ clients, 170 franchise openings, the milestone dates, Google Partner, the Business Mint award) come from socialmatters.agency. Update them as they change.
- No testimonials are included, because none were supplied. Add real ones only.
