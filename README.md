# Omar Farque | Portfolio, CV & Master's Application Profile

A one-page portfolio for Omar Farque, built with HTML, CSS, JavaScript,
Three.js, GSAP, and Lucide icons. The site serves two audiences at once:

- **Employers** — production experience, five live project links, a downloadable
  CV, and clearly stated target roles.
- **Admissions committees** — academic record, a Graduate Study Profile with
  research interests and target programmes, and a live status board for the
  application dossier.

A switch in the hero lets a visitor pick which framing they see; the choice is
remembered in `localStorage`, and `#graduate` in the URL opens the academic view
directly.

## Folder structure

```text
portfolio/
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── README.md
├── tools/
│   └── build_cv.py
└── assets/
    ├── Omar.png
    ├── omar-logo.svg
    ├── cv.pdf              (designed CV - send to a human)
    ├── cv-ats.pdf          (plain 1-page resume - upload to job portals)
    ├── cv-full.pdf         (full profile CV - single column, all sections)
    ├── academic-cv.pdf     (academic CV - admissions)
    ├── pic1.jpeg .. pic4.jpeg
    ├── preview-tripfly.png
    ├── preview-midtown.png
    ├── preview-rover.png
    ├── preview-attendance.png
    └── preview-fmz.png
```

## How to run

No build step is required. For the best result, serve the folder locally:

```bash
cd portfolio
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

The page loads Three.js, GSAP, Google Fonts, and Lucide from CDNs, so an internet
connection is useful for the full animated experience.

## Page sections

| # | Section | Anchor |
|---|---------|--------|
| 01 | Professional Profile — target roles, languages | `#profile` |
| 02 | Experience — Trip Fly BD, independent web development | `#experience` |
| 03 | Live Work — five deployed projects | `#projects` |
| 04 | Professional Skills | `#stack` |
| 05 | Education & Academic Record — timeline, achievements, certificates | `#proof` |
| 06 | Graduate Study Profile — Master's application | `#graduate` |
| 07 | Interests & Creative Life | `#interests` |
| 08 | Contact | `#contact` |

## Highlights

- Hero audience switch: recruiter view and admissions view, each with its own
  intro copy, call-to-action buttons, and metric tiles
- Premium 3D hero with Omar.png blended into the visual system
- Custom OF monogram logo used in favicon, loader, and navbar
- Short welcome/avatar intro after page load
- Dynamic rotating role text
- Dark and light mode toggle with saved preference
- Five live project cards with real screenshots and `Live` status badges
- Graduate Study Profile: why a Master's, target programmes, research interests,
  preferred destinations, and a colour-coded application dossier status list
- Logo-based engineering stack with programming and web technology marks
- Certificate gallery with modal preview
- Contact form routed to Google Sheets, split into hiring and academic enquiry
  types
- `Person` + `ProfilePage` JSON-LD structured data, `robots.txt`, and
  `sitemap.xml` for recruiter and search visibility
- Print stylesheet: `Ctrl/Cmd + P` produces a clean document with both audience
  views expanded and link URLs written out
- Responsive layout for desktop, tablet, and mobile
- Reduced-motion support and a `<noscript>` fallback so content is never blank

## Live projects

| # | Project | Live link |
|---|---------|-----------|
| 1 | Trip Fly BD Website | https://www.tripflybd.com/ |
| 2 | Midtown Aabashon Ltd | https://midtownaabashonltd.com/ |
| 3 | Smart Attendance System | https://omaar-x.github.io/Tripfly-Smart-Attendance-System/ |
| 4 | Rover Consultancy | https://www.roverconsultancy.com/ |
| 5 | FMZ Trading Website | https://omaar-x.github.io/FMZ-Trading-Website-Main/index.html |

## Rebuilding the CV

Three PDFs, all generated - never hand-edited.

`tools/build_cv.py` produces two designed, two-column CVs in one run:
`assets/cv.pdf` (employers) and `assets/academic-cv.pdf` (admissions). They
share all content except the Graduate Study Objective section and the closing
line of the summary, which appear only in the academic build.

`tools/build_full_cv.py` produces `assets/cv-full.pdf`: single column, every
section including Publications, two pages. Follows the section order Omar
chose. Use it when someone wants the complete record in one readable document.

`tools/build_ats_cv.py` produces `assets/cv-ats.pdf`: one page, single column,
no photo, standard headings, base-14 fonts. Use it for online applications -
Workday, Greenhouse, Taleo, LinkedIn - where a parser reads the file before any
person does and a sidebar layout gets scrambled. Send `cv.pdf` when a human
receives it directly. It imports its content from `build_cv.py`, so run
`build_cv.py` first after a content change.

Content lives in the CONTENT
section of `tools/build_cv.py`, so the CV and the site stay in sync.

```bash
pip install reportlab
python tools/build_cv.py
```

The CV is laid out to fit **two pages**. The layout engine has a spare third
page slot so new content spills over instead of being silently dropped — if the
build reports 3 pages, trim content until it reports 2 again. A
`! column overflow` warning means content was dropped entirely and must be fixed.

## Keeping content honest

Current status, as stated across the site and CV:

- **B.Sc. CSE completed July 2026** (BUBT, CGPA 3.24 / 4.00).
- **Trip Fly BD is a current role**, started **1 March 2026** and still running,
  so bullets are in present tense and the period reads `March 2026 – Present`.
  If the role ends, close the range and switch the bullets to past tense.
- **IELTS is scheduled, not sat.** Once the result is in, flip the dossier item
  in `#graduate` to `data-status="ready"`, swap `data-lucide="loader"` for
  `check-circle-2`, and put the band score in the `<span>`.

Still to confirm before sharing widely:

- **Preferred destinations**, **programmes of interest**, and the **2027 intake**
  are stated targets, not commitments — edit them in `#graduate` as plans firm up.
- There is **no LinkedIn link**. Add it to the contact block and to `sameAs` in
  the `Person` JSON-LD when the profile is ready.

## Page strategy

This portfolio is intentionally kept as a single-page resume experience for
international applications, because recruiters can scan profile, work, projects,
proof, and contact in one flow. If detailed case studies are added later, good
separate pages would be `projects.html` for deep project breakdowns and
`certificates.html` for full proof/certificate documentation.

## Contact details

The contact section includes a Google Sheets lead form. The Apps Script handler
is in:

```text
google-apps-script/Code.gs
```

To connect it:

1. Open your Apps Script project:
   `https://script.google.com/u/0/home/projects/1XyKzg-c6mATBQGugkDJLkSePi31pm2CS2duPrihrkjLwITjxPsBl3_d_/edit`
2. Paste `google-apps-script/Code.gs` into `Code.gs`.
3. Run `setupLeadSheet()` once to create the colorful `Portfolio Leads` sheet.
4. Deploy as Web app.
5. Copy the `/exec` Web App URL.
6. Paste it into `CONTACT_WEB_APP_URL` in `script.js`.

Apps Script project ID:

```text
1XyKzg-c6mATBQGugkDJLkSePi31pm2CS2duPrihrkjLwITjxPsBl3_d_
```

Connected Google Sheet:

```text
https://docs.google.com/spreadsheets/d/1FspAHsS-AdI3dyK-qUe_5PVyXqVGC7QxH-Pw3bRKgzg/edit
```

Deployed Web App URL:

```text
https://script.google.com/macros/s/AKfycbzh7SrCudXmd7qiZwqpAn-Ftfk-NPAXzYpr3Vzy0wrxYQ7VZBXX0mYpdOVlCaIAEdQ0JA/exec
```

The visible contact area uses confirmed details:

- Phone / WhatsApp: `+880 1705-182933`
- Email: `umor2026@gmail.com`
- Resume download (employers): `assets/cv.pdf`
- ATS resume for job portals: `assets/cv-ats.pdf`
- Full profile CV: `assets/cv-full.pdf`
- Academic CV download (admissions): `assets/academic-cv.pdf`
- GitHub: `https://github.com/omaar-x`
- Trip Fly BD: `https://www.tripflybd.com/`

A LinkedIn or Facebook link can be added to the same contact block in
`index.html` when the profile URL is ready.
