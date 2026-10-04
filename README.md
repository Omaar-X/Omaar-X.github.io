# Omar Faruk — Portfolio

Personal portfolio of Omar Faruk — web developer, digital marketer and AI / computer-vision researcher.

- **Live (production URL):** https://omaar-x.github.io/
- **Design:** *Lavender Editorial Luxury* — a Foraji-inspired editorial layout (large serif statements, generous whitespace, thin dividers, image-led project features) in Omar's own palette: light lavender, white, deep charcoal, muted purple and deep plum.
- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS 4 · GSAP + ScrollTrigger (lazy, Work only) · Lucide · `next/font` · `next/image`
- **Hosting:** a static export (`out/`) deployed to GitHub Pages by a GitHub Actions workflow.

## Run, build, export

Requires Node 20.9+ (CI uses Node 22).

```bash
npm install
npm run dev            # http://localhost:3000
npm run typecheck      # route typegen + tsc --noEmit
npm run lint           # ESLint (flat config)
npm run build          # production build (server output)
npm run start          # serve that build
npm run export         # static export into out/  (cross-platform STATIC_EXPORT=true build)
npm run serve:export   # serve out/ at http://localhost:3200, like GitHub Pages does
npm run images         # regenerate optimised WebP images from assets/source/
```

`npm run export` is the same as `STATIC_EXPORT=true npm run build`; it switches `next.config.ts` to
`output: "export"` and writes plain HTML/CSS/JS to `out/`. Every route uses a trailing slash
(`trailingSlash: true`), images are served as shipped (`images.unoptimized` in export mode), and no
`basePath` is set because `Omaar-X.github.io` is a user site served from the domain root.

`npm run serve:export` ([`tools/serve-export.mjs`](tools/serve-export.mjs)) is a zero-dependency server that
mimics GitHub Pages: directory redirects to a trailing slash, `404.html` with a real 404 status, gzip for text
assets and MIME types by extension. Use it (not `npm run start`) to check what will actually be deployed.

## Site structure

One home page, one case study, and generated metadata routes.

| Route | What it is |
|---|---|
| `/` | The portfolio — all sections below |
| `/work/trm-holidays/` | TRM Holidays case study (the only published case study) |
| `/sitemap.xml`, `/robots.txt` | Generated from `data/`; indexable routes only |
| `/opengraph-image.png` | Social card (static file in `public/`) |
| `/cv/*.pdf` | CV downloads |

### Home page sections

The page opens on a **creativity-first** sequence: the visitor sees who Omar is and, on the same first screen, a live
picture of what he can do. Order: Hero → Creative Skill Showcase → Selected Work → More Work → Experience → Research →
About → Contact.

| # | Section | Anchor | Notes |
|---|---|---|---|
| — | **Hero + navigation** | `#hero` | Fixed header (links from 56rem, full-screen menu below), name, *Web Developer / Digital Marketer / Creative Technologist* in large serif, circular portrait, one line of positioning (development · digital growth · automation · creative production · AI research), CV download. No skill chips and no paragraph. |
| — | **Creative Skill Showcase** | `#showcase` | Ten skills, each with its own drawing; sits directly under the hero (see below) |
| 01 | **Selected Work** | `#work` | "Ideas turned into digital products." **SADIRA**, Midtown Aabashon Ltd., TRM Holidays and Trip Fly BD as a sticky, layered stack with large project visuals (SADIRA also shows two close-ups of the live store) |
| 02 | **More Work** | `#work` | Quiet editorial rows: FMZ Trading, Smart Attendance System, Rover Consultancy |
| 03 | **Experience** | `#experience` | Midtown Aabashon Ltd. (current), Trip Fly BD (March 2026 — August 2026) |
| 04 | **Research** | `#research` | TumorMultiNet thesis with its four-step model pipeline, the accepted paper and *Smart First Aid Box* (submitted to ICCIT) |
| 05 | **About** | `#about` | Personal statement, short biography, current focus, education and credentials, and a compact **Tools & technologies** index |
| 06 | **Contact + Footer** | `#contact` | Deep plum. Email, phone, WhatsApp, GitHub and CV. There is **no contact form** |

There is deliberately **no second, large "Capabilities" section** lower down: the range is shown once, at the top, and the
tools index in About is a small static list.

**Creative Skill Showcase** (`data/skills.ts`, `components/sections/showcase`, `styles/showcase.css`)

Ten skills, each a real-text name plus a drawing: Web Development, Digital Marketing, Meta / Facebook Ads (audience →
campaign → creative → landing page), Google Ads (search query → ad → landing page), AI Automation (input → AI → workflow →
output), Video Editing (a timeline), Photography (a focus frame on the rule of thirds), Visual Design / Canva (a layered
composition), Business Automation (manual task → Apps Script / Sheets → automated system) and AI / Computer Vision Research
(data → model → prediction → explainability). No fake analytics numbers are drawn.

- **One stage, many scenes.** `creative-showcase.tsx` is the only client component. Scenes are percent-coordinate worlds
  (`scenes.tsx`, `drawings.tsx`, `scene-kit.tsx`); nodes, planes and lines read one `--build` (0 → 1) CSS variable, so a
  scene "draws itself" and every swap, scroll step or swipe replays it. No WebGL and no Three.js (crisp real text,
  accessibility and Lighthouse cost).
- **Auto swap.** After the page has loaded and settled, the stage cycles about every 3 s through Web → Marketing → AI
  Automation → Video → Photography → Research, updating the typography and the drawing together. It stops for good on any
  interaction or scroll start, and while the section is off screen, the tab is hidden, or reduced motion is on.
- **Desktop pin (≥ 64rem, window ≥ 45rem tall).** Native `position: sticky`, about **1.9 viewport heights** in total: stages
  **Build → Grow → Automate → Create → Research**. *Create* puts video, photography and design on one canvas with Word,
  Excel and Google Workspace as a supporting strip. The panel is pinned vertically centred, then releases straight into
  Selected Work. The page is never intercepted: no wheel hooks, no fake smooth scrolling, no snapping.
- **Tablet (48–64rem).** Drawing on top, copy below, pinned about 1.7 viewport heights when the window is tall enough for the
  whole stack (≥ 58rem); otherwise it flows unpinned.
- **Phones (< 48rem).** No pin. A native scroll-snap carousel of all ten skills with a visible "Swipe to explore" hint and
  progress dots; every swipe shows its drawing, and only the scenes next to the current slide are rendered.
- **Skill index.** A real `tablist` of the ten skills (arrow keys, roving tabindex) that doubles as the visitor's control.
- **Reduced motion or no JavaScript.** The live stage and carousel are hidden and a static composition shows all five groups
  and every discipline name in its finished state. Skills are always real text in the DOM; drawings are `aria-hidden`.

### Case studies

Case studies are data-driven. A project in `data/projects.ts` with `caseStudy.status === "published"` gets a
page at `/work/[slug]/`, a sitemap entry and a "View case study" link. `dynamicParams = false`, so unpublished
slugs (Trip Fly BD and Midtown Aabashon are *in preparation*) return 404 and nothing can link to them.

URL policy: every route except `/` ends with a trailing slash. `lib/routes.ts` builds case-study paths so
canonical, Open Graph, sitemap, structured data and internal links always agree.

## CVs

Three PDF variants live in [`public/cv/`](public/cv/) and are described in `profile.cv` ([`data/profile.ts`](data/profile.ts)):

| Key | File | Audience |
|---|---|---|
| `cv.general` | `Omar-Faruk-General-CV.pdf` | **Default.** Used by the hero, header, About, Contact and footer |
| `cv.webDigital` | `Omar-Faruk-Web-Digital-CV.pdf` | Web development, digital marketing and business-systems roles |
| `cv.research` | `Omar-Faruk-Research-CV.pdf` | Research, academic and Master's applications |

Only the General CV is linked from the UI; the other two are available in `profile.cv`. The PDFs are generated:

```bash
python tools/cv/build_cvs.py        # build the three CVs into public/cv/ (needs reportlab)
python tools/cv/verify_cvs.py       # inspect the generated PDFs (needs PyMuPDF)
python tools/cv/verify_sources.py   # cross-check CV content against data/*.ts
```

CV copy lives in `tools/cv/content.py`. Earlier CV PDFs are kept in `legacy/cv-archive/`.

## Images

The static export has no image optimiser, so images are optimised **before** they are committed.

- `assets/source/images/**` — original screenshots and portrait (master files, never imported by the site)
- `assets/images/**` — generated WebP files the site imports (sharp, quality 82; the portrait is capped at 800 px)

Add or replace a master, run `npm run images`, then import the WebP from `assets/images/`. Static imports
give `next/image` the intrinsic size and a blur placeholder. The hero portrait is eager with
`fetchPriority="high"`; everything else is lazy.

The social card is `public/opengraph-image.png` and is referenced explicitly in the metadata (`ogImage` in
`lib/site.ts`), so it has a plain `.png` URL on GitHub Pages and appears on every page.

## Structure

```text
app/                  routes: home, work/[slug], plus robots, sitemap, icon
components/
  brand/              BrandMark (OF monogram), BrandWordmark, BrandLockup
  navigation/         SiteHeader (server) → SiteNavigation + MobileMenu (client, mounted only when open)
  sections/           hero · showcase (scenes, drawings, controller, tools index) · work · experience · research · about · contact
  case-study/         CaseStudyLayout, CaseStudySection, CaseStudyScreens
  layout/             Container, Grid, PageShell, Backdrop, StickyStack, SiteFooter
  ui/                 Button, TextLink, SmartLink, StatusBadge, Eyebrow, SectionIntro,
                      BrowserFrame, NoiseOverlay, SkipLink
  seo/                JsonLd
data/                 single source of truth for all content (profile, projects, experience, research,
                      skills, education, credentials, contact, socials, navigation)
hooks/                useActiveSection
lib/                  site config, routes, metadata helpers, structured data, fonts, gsap, cn
styles/               tokens, Tailwind theme mapping, base, typography, layout, effects, motion, work, showcase
assets/               source/ masters and generated images/
public/               cv/ PDFs, opengraph-image.png, .nojekyll
tools/                cv/ (CV generator + verifiers), images/ (WebP build), build-export.mjs, serve-export.mjs
google-apps-script/   legacy lead-capture handler (unused by the new site)
legacy/               previous static site — archive only, no longer deployed
```

## Design system

All colour, type, spacing and layout values are semantic CSS variables in [`styles/tokens.css`](styles/tokens.css),
mapped to Tailwind utilities in [`styles/theme.css`](styles/theme.css). Components never use raw colours.

- **Palette** — `--background #F7F4FC`, `--background-secondary #F0EAF8`, `--surface #FFFFFF`, `--foreground #19171D`,
  `--muted #6F6878`, `--accent #78609A`, `--accent-strong #56406F`, `--lavender #D9CDEA`, deep plum panel `#3B2B4D`.
  Panels choose a surface with `data-surface="white|mauve|plum"`. There is no dark mode and no green.
- **Type** — Instrument Sans (display) and Geist (body, UI); Instrument Serif only for large statements, titles,
  hero roles and showcase skill names (`type-statement`, `type-title`, `type-roles`, `type-mega`).
- **Layout** — `Container`, a 4/8/12-column editorial grid, fluid section rhythm, safe-area aware.
  `SectionIntro` gives every section the same editorial opener.
- **Motion** — CSS-first and gated by `prefers-reduced-motion` and `@supports (animation-timeline: view())`:
  hero entrance and a 5px pointer depth on the portrait, heading rise, hairline draw, screenshot reveal, hero
  parallax. JavaScript motion: the Work stack's ScrollTrigger recede (lazily imported when Work approaches the
  viewport, never under reduced motion) and the showcase controller above. Scrolling is always native.
- **Below-the-fold rendering** — `.defer-render` (`content-visibility: auto` with an `auto` intrinsic size) on
  More Work, Experience, Research, About, Contact and the footer. Fragment loads (`:target`) and
  same-page link clicks (`data-render-all`) render everything first, so anchors always land correctly.

## Deployment

Production is a static export on GitHub Pages, built by
[`.github/workflows/static.yml`](.github/workflows/static.yml) on every push to `main` (or by hand from the
Actions tab):

1. checkout → Node 22 → `npm ci`
2. `npm run typecheck` and `npm run lint`
3. `npm run build` with `STATIC_EXPORT=true`
4. upload **`out/`** (never the repository root, never `legacy/`) → deploy to GitHub Pages

One-time setup: *Settings → Pages → Build and deployment → Source: GitHub Actions*.
`NEXT_PUBLIC_SITE_URL` is set in the workflow; elsewhere it falls back to Vercel's production URL and then
`https://omaar-x.github.io`. See [`.env.example`](.env.example).

Before pushing, verify the export locally: `npm run export && npm run serve:export`.

## Maintenance notes

- **Content** lives in `data/`. Statuses are shown exactly as recorded: *submitted* is never shown as *accepted*,
  and anything unconfirmed stays empty rather than guessed.
- **New case study:** add `caseStudy: { status: "published", … }` to the project; the route, sitemap entry and links follow.
- **New skill:** edit `data/skills.ts`, then run `python tools/cv/verify_sources.py`.
- **Updating the social card:** replace `public/opengraph-image.png` (1200 × 630).
- **`legacy/`** is the previous static site, kept as an archive. Do not deploy it.
- `npm audit` reports no production vulnerabilities. A dev-only advisory in `braces` (via `eslint-config-next`)
  is open; its fix is a breaking downgrade, so it is intentionally not applied.
