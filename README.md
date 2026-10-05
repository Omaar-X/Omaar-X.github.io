# Omar Faruk — Portfolio

Personal portfolio of Omar Faruk — web developer, digital marketer and AI / computer-vision researcher.

- **Live (production URL):** https://omaar-x.github.io/
- **Design:** a layout modelled on [sforaji.com](https://www.sforaji.com) — huge expanded-sans name split around a tilted device, a floating pill navigation, hand-written kickers over bold headings with one accent word, rounded image cards, stacking process cards, a fact marquee and an outlined-name footer — in Omar's own palette: light lavender, white, deep charcoal, muted purple and deep plum.
- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Lucide · `next/font` · `next/image`
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

Order: Hero → Selected Work → How I work (skills) → About → Highlights marquee → Career → Research → Contact → Footer.
Selected Work comes straight after the hero (as on the reference site's phone layout), so projects are one scroll away.

| Section | Anchor | Notes |
|---|---|---|
| **Intro loader** | — | On every full page load: the OF monogram draws itself, the name rises, a counter and bar run to 100, then the lavender panel wipes up (about 2.2s, CSS only — `components/layout/intro-loader.tsx`, `styles/intro.css`). The hero's entrance waits for it via `--intro-offset`. Client-side navigation does not replay it; reduced motion never shows it. |
| **Hero** | `#hero` | Drifting aurora glow over a dot grid. `OMAR FARUK` together on one line in expanded uppercase (`type-display`, sized to the width), letters rising one by one; above it the avatar ring, tagline and Dhaka time; below it the role, a tilted tablet and *View work* / *Download CV* that cross-fades five real project screens (CSS only), tilts toward the pointer and carries two floating glass stat chips; a "Scroll to explore" cue. Avatar with a live dot and "Open to conversations" written on a slow orbit; `profile.heroTagline`, current role @ company, Dhaka with live local time. Phones stack it all and add *View work* / *Download CV*. |
| **Navigation** | — | Desktop: logo + *Resume* top bar, and a dark floating pill at the bottom of the window (home, Work, Skills, About, Career, Research, *Contact me*). Phones: top bar + full-screen menu. |
| **Selected Work** | `#work` | "Selected **Work**" behaves like How I work: the heading (`.work-head`) stays pinned under the header at every size, and all seven projects stack beneath it — each card pins just below the heading while the next slides up over it, slightly lower each time (`.work-stack-item`). Card height follows the window height (`--work-card-h` on `.work-stack`) so a stuck card always fits; short windows (under 46rem tall) use tighter steps and a compact heading so cards stay generous, and the screenshot is sized from the card height; text is "safe"-centred and the CTA always visible. Cards alternate light lavender (dark text) and plum (light text), live screen on the right (below on phones), cursor spotlight, one stretched link (case study, else live site). A dashed "More on GitHub" link follows. |
| **How I work** | `#skills` | Light lavender panel. "How I build **products**": five stage cards (Build, Grow, Automate, Create, Research — `skillGroups` in `data/skills.ts`) beneath a heading that stays pinned under the header at every size (`.skills-head`; one line on phones), and the cards stack just below it at every size too (`.skills-stack-item`). Below desktop the cards take a window-fitted height (`--skill-card-h`), a 3-line description and a single fading row of tags. Each white card has its skills as text plus an animated illustration on a small dark screen (`skill-visuals.tsx`, `styles/skills.css`): code becoming a page; search, Meta and social flowing into a landing page and a customer; a trigger running through Apps Script into a sheet; a rule-of-thirds photo, design layers and an edit timeline; an MRI slice through the thesis models to a Grad-CAM map. No numbers are drawn. |
| **About** | `#about` | Promise heading (`profile.heroStatement`), short bio, *Let's talk* / *View resume*, contact icon buttons, portrait in a tilted frame; then Education, Credentials and the Tools index. |
| **Highlights** | — | Two crossed, counter-scrolling strips: the disciplines in giant filled/outlined type, and the facts from `data/proof.ts`. |
| **Career** | `#experience` | "My **impact** over the years": numbered rows (role, company, period) that open to show the summary and contributions. |
| **Research** | `#research` | TumorMultiNet thesis with its pipeline, the accepted paper and *Smart First Aid Box* (submitted to ICCIT). |
| **Contact** | `#contact` | "Let's build something **remarkable.**" — email as the main action plus phone, WhatsApp, GitHub and CV. There is **no contact form** and **no testimonials** (none are on record, so none are shown). |
| **Footer** | — | Plum: outlined giant name, "Have an idea? ✳ Let’s make it real ✳ Say hello" marquee, email, phone, icon links, back to top. |

`data/proof.ts` values are derived from the other records, never typed in. Availability stays as
"Open to conversations" — `profile.availability` is `null`, so no hiring status is claimed.

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
  sections/           hero · work · skills · about (+ tools index) · highlights · experience · research · contact
  case-study/         CaseStudyLayout, CaseStudySection, CaseStudyScreens
  layout/             Container, Grid, PageShell, Backdrop, SiteFooter
  ui/                 Button, TextLink, SmartLink, StatusBadge, Eyebrow, SectionIntro, Accent, Marquee,
                      SocialLinks, BrowserFrame, NoiseOverlay, SkipLink
  seo/                JsonLd
data/                 single source of truth for all content (profile, projects, experience, research,
                      skills, education, credentials, contact, socials, navigation)
hooks/                useActiveSection
lib/                  site config, routes, metadata helpers, structured data, fonts, cn
styles/               tokens, Tailwind theme mapping, base, typography, layout, effects, motion
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
  Panels choose a surface with `data-surface="white|mauve|plum"`. There is no dark mode; the only green is the small "live" status dot (`#3FB97C`).
- **Chrome** — `--ink #241B30` for the floating nav, device bezels and card fades; `--radius-card` for every card;
  `shadow-card` and `shadow-float`. Buttons are pills.
- **Type** — Archivo (display, variable width: headings at 112%, the hero name and footer at 125%), Geist (body, UI)
  and Caveat for the hand-written kicker above each heading (`type-kicker`). Wrap one word per heading in `<Accent>`.
- **Layout** — `Container`, a 4/8/12-column grid, fluid section rhythm, safe-area aware. `SectionIntro` gives every
  section the same opener: "/ kicker", heading, optional lead and a right-aligned action.
- **Motion** — CSS first, every piece gated by `prefers-reduced-motion`: hero aurora, letter rise, device float and
  screen cross-fade, the availability orbit, skill visuals, marquees (paused on hover), `.reveal` / heading rise on
  scroll where `animation-timeline: view()` is supported, a reading-progress bar, button shine, and native sticky for
  the stacking skill cards. One small client component, `PointerEffects`, writes CSS variables for `data-spotlight`,
  `data-tilt` and `data-magnetic` (fine pointers only). No animation library and no scroll hijacking.
- **Below-the-fold rendering** — `.defer-render` (`content-visibility: auto`) on About, Career, Research, Contact and
  the footer. Fragment loads (`:target`) and same-page link clicks (`data-render-all`) render everything first, so
  anchors always land correctly.

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
