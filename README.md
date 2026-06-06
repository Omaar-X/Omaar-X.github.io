# Omar Farque | Premium 3D Engineer Portfolio

A premium one-page portfolio for Omar Farque, built with HTML, CSS, JavaScript,
Three.js, GSAP, Lucide icons, and visual technology logos. The site is tuned for
abroad offer-letter applications and stronger resume presentation: production
experience, live project snapshots, dynamic role text, certificate proof,
international application signals, video editing, and a polished engineer-style
visual system.

## Folder structure

```text
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── Omar.png
    ├── omar-logo.svg
    ├── cv.pdf
    ├── pic1.jpeg
    ├── pic2.jpeg
    ├── pic3.jpeg
    ├── pic4.jpeg
    ├── preview-tripfly.png
    ├── preview-midtown.png
    └── preview-attendance.png
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

## Highlights

- Premium 3D hero with Omar.png blended into the visual system
- Custom OF monogram logo used in favicon, loader, and navbar
- Short welcome/avatar intro after page load
- Dynamic rotating role text
- Dark and light mode toggle with saved preference
- Real screenshots for live project outlook cards
- Logo-based engineering stack with programming and web technology marks
- Video editing and creative production positioning
- Resume-focused profile, experience, education, skills, and achievements
- International application proof points for employer screening
- Footer GitHub icon link
- Certificate gallery with modal preview
- Responsive layout for desktop, tablet, and mobile
- Reduced-motion support

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

The visible contact area also uses confirmed links:

- Resume download: `assets/cv.pdf`
- GitHub: `https://github.com/omaar-x`
- Trip Fly BD: `https://www.tripflybd.com/`

Add personal email, phone, WhatsApp, LinkedIn, or Facebook links in the contact
section of `index.html` when the final details are ready.
