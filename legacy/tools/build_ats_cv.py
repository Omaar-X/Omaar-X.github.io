"""Build assets/cv-ats.pdf - the plain resume for online applications.

Companion to build_cv.py. That script makes the designed two-column CV a human
reads; this one makes the version a machine reads first.

Applicant tracking systems (Workday, Greenhouse, Taleo, LinkedIn) parse a PDF
top to bottom in a single pass. The designed CV loses to them: a sidebar
interleaves unrelated text, a headshot is dead weight, and letter-spaced
headings can come apart mid-word. So this build deliberately gives up the
design - one column, standard section headings, base-14 Helvetica (no embedded
font to extract), no images, no tables, no text boxes - and keeps only what a
parser can read and a recruiter can skim in six seconds.

Content is imported from build_cv.py so the two never drift apart. Bullets are
trimmed here to hold the resume to one page, which is what a 2026 graduate
should be sending.

    python tools/build_ats_cv.py
"""

import os
import re

from reportlab.lib.colors import HexColor, black
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
)

import build_cv as cv
import pdf_common

OUT = os.path.join(cv.ROOT, "assets", "cv-ats.pdf")

# Base-14 fonts only. An embedded TTF subset can come back from a parser with
# missing or reordered glyphs; Helvetica always extracts cleanly.
REG, BOLD = "Helvetica", "Helvetica-Bold"

INK = HexColor("#111111")
RULE = HexColor("#999999")

PAGE_W, PAGE_H = A4
MARGIN = 12.5 * mm


def _style(name, size, leading, font=REG, color=INK, **kw):
    return ParagraphStyle(name, fontName=font, fontSize=size, leading=leading,
                          textColor=color, **kw)


GUTTER = pdf_common.photo_gutter()

S_NAME = _style("name", 19, 22, BOLD, spaceAfter=2, rightIndent=GUTTER)
S_HEADLINE = _style("headline", 9.8, 13, BOLD, HexColor("#333333"), spaceAfter=3, rightIndent=GUTTER)
S_CONTACT = _style("contact", 9, 12.6, spaceAfter=1, rightIndent=GUTTER)
S_SECTION = _style("section", 9.8, 11.6, BOLD, spaceBefore=5.5, spaceAfter=1.6)
S_BODY = _style("body", 8.8, 11.4, alignment=TA_JUSTIFY)
S_ROLE = _style("role", 9.7, 12, BOLD, spaceBefore=4)
S_ORG = _style("org", 8.8, 11.2, color=HexColor("#333333"), spaceAfter=1.5)
S_BULLET = _style("bullet", 8.8, 11.2, leftIndent=10, bulletIndent=1, spaceAfter=1.0)
S_SKILL = _style("skill", 8.8, 11.4, leftIndent=0, spaceAfter=1.0)
S_EDU = _style("edu", 8.8, 11.4, spaceAfter=1.6)


def txt(s):
    """Content is authored with <b> markup; keep it, drop everything else."""
    return s


def plain(s):
    """Strip markup for fields that must stay a single unbroken keyword line."""
    return re.sub(r"<[^>]+>", "", s)


def section(title):
    """A ruled heading. Parsers key off these exact words, so keep them standard."""
    return Paragraph(
        f'<para spaceb="4">{title.upper()}</para>'
        f'<para><font size="1" color="#ffffff">.</font></para>',
        S_SECTION,
    )


class Rule(Spacer):
    """A hairline under a section heading, drawn without a table."""

    def __init__(self):
        Spacer.__init__(self, 1, 3.2)

    def draw(self):
        self.canv.setStrokeColor(RULE)
        self.canv.setLineWidth(0.6)
        self.canv.line(0, 1.4, self.width, 1.4)


def heading(title):
    return [Paragraph(title.upper(), S_SECTION), Rule()]


def bullet(text):
    return Paragraph(txt(text), S_BULLET, bulletText="•")


def role(title, org, meta, bullets):
    block = [
        Paragraph(f"{plain(title)}", S_ROLE),
        Paragraph(f"{txt(org)}&nbsp;&nbsp;|&nbsp;&nbsp;{plain(meta)}", S_ORG),
    ]
    block += [bullet(b) for b in bullets]
    return KeepTogether(block)


# --- content -----------------------------------------------------------------
# Trimmed against build_cv.py to hold one page. Anything cut here still lives on
# the designed CV and the portfolio, which is where depth belongs.

SUMMARY = (
    "Computer Science &amp; Engineering graduate (B.Sc., July 2026) who already ships to production: "
    "<b>five paid client websites and web apps</b> built, deployed and maintained for real businesses, "
    "each with a public URL and public source. Worked in travel operations at a Dhaka agency from March to "
    "August 2026, booking air tickets on <b>Sabre GDS</b> and handling reservation support in Bangla and "
    "English. "
    "<b>One IEEE paper accepted</b> on deep learning for brain tumour MRI with explainable AI. Seeking a "
    "role where accuracy, clear communication and practical engineering all matter."
)

EXP_1_BULLETS = [
    "Issued and managed domestic and international air tickets end to end on <b>Sabre GDS</b> - fare display, "
    "reservation creation, reissue and booking updates.",
    "Owned each booking after it was made: itinerary changes, reservation queries and travel documentation, so "
    "no customer had to chase their own status.",
    "Resolved fare and schedule questions by phone, chat and in person in <b>Bangla and English</b>, converting "
    "enquiries into confirmed bookings.",
    "Identified that daily attendance was still tracked on paper and <b>built the Smart Attendance System</b> "
    "unprompted - a role-based web app now in daily use, replacing the manual register.",
    "Built and maintained the agency's website sections and landing pages in <b>HTML, CSS and JavaScript</b>, "
    "shipping changes without an outside vendor.",
]

EXP_2_BULLETS = [
    "Delivered <b>five paid client websites and web apps</b> across travel, real estate, consultancy and "
    "trading - every one still live, with a public URL and public source.",
    "Took each project from requirements to launch as the <b>sole developer</b>: design, build, deployment, "
    "client handover and ongoing fixes.",
    "Built mobile-first, responsive, accessible layouts that stay usable on low-end Android devices.",
    "Structured pages for <b>SEO</b> - semantic markup, metadata, structured data, sitemaps - so clients reach "
    "customers through organic search.",
    "Replaced paid form services with a <b>Google Apps Script and Google Sheets</b> lead-capture backend, "
    "giving clients reliable enquiry handling at zero running cost.",
]

# One line each. The experience section already explains what the work involved;
# here a reviewer only needs the name, the stack and a URL they can open.
PROJECTS = [
    ("Trip Fly BD - Travel Agency Website", "www.tripflybd.com", "HTML, CSS, JavaScript, SEO"),
    ("Midtown Aabashon Ltd - Real Estate", "midtownaabashonltd.com", "Responsive UI, performance"),
    ("Smart Attendance System - Trip Fly BD", "omaar-x.github.io/Tripfly-Smart-Attendance-System",
     "JavaScript web app, role-based sign-in"),
    ("Rover Consultancy", "www.roverconsultancy.com", "Business site, responsive UI"),
    ("FMZ Trading Website", "omaar-x.github.io/FMZ-Trading-Website-Main", "HTML, CSS, GitHub Pages"),
]

EDUCATION = [
    ("B.Sc. in Computer Science &amp; Engineering",
     "Bangladesh University of Business and Technology (BUBT), Dhaka - completed July 2026. "
     "CGPA 3.24 / 4.00; English medium of instruction, transcripts on request."),
    ("Higher Secondary Certificate (Science)",
     "Kharrah Adarsha Degree Honours College, 2021 - GPA 4.58 / 5.00."),
]

# Venue and year stay blank until confirmed; only "IEEE" and "accepted" are.
PUBLICATIONS = [
    "<b>TumorMultiNet: A Statistically Validated Hybrid Deep Learning Framework for Brain Tumor MRI "
    "Classification and Segmentation on BRISC2025 with Explainable AI</b> - IEEE, accepted.",
    "<b>Smart IoT First Aid Box</b> - in preparation.",
]

# Written as "Label: keywords" lines - the shape keyword matchers read best.
SKILLS = [
    ("Travel systems", "Sabre GDS, air ticket booking, reservation handling, itinerary support, fare display"),
    ("Web development", "HTML5, CSS3, JavaScript, responsive and mobile-first UI, accessible layouts, SEO"),
    ("Programming", "JavaScript, Python (production); C, C++, Java (university coursework)"),
    ("Tools and platforms", "Git, GitHub, GitHub Pages, Google Apps Script, Google Sheets, Microsoft Word, Microsoft Excel"),
    ("Languages", "Bangla (native), English (professional working proficiency)"),
]

ADDITIONAL = [
    "<b>BUBT ICPC 2025</b> and <b>BIUPC Programming Contest</b> - participant; <b>BUBT Innovtex "
    "Hackathon</b> - volunteer. Available immediately; Dhaka, Bangladesh, willing to relocate. "
    "Reference: <b>Dr. Md. Rajibul Islam</b>, Chairman, Department of Data Science and "
    "Engineering, Bangladesh University of Business and Technology (BUBT); contact details "
    "on request.",
]


def story():
    s = []

    # Header: plain text lines, no table and no photo, so a parser reads the
    # name and contact details as the first thing on the page.
    s.append(Paragraph("Omar Farque", S_NAME))
    s.append(Paragraph(
        "Web Developer&nbsp; |&nbsp; Sabre GDS Air Ticketing&nbsp; |&nbsp; Graphic Designer&nbsp; |&nbsp; "
        "Video Editor&nbsp; |&nbsp; Digital Marketer<br/>B.Sc. Computer Science &amp; Engineering",
        S_HEADLINE))
    s.append(Paragraph(
        f"Dhaka, Bangladesh&nbsp; |&nbsp; {cv.PHONE}&nbsp; |&nbsp; {cv.EMAIL}", S_CONTACT))
    s.append(Paragraph(
        "Portfolio: omaar-x.github.io&nbsp; |&nbsp; GitHub: github.com/omaar-x", S_CONTACT))

    s += heading("Professional Summary")
    s.append(Paragraph(SUMMARY, S_BODY))

    s += heading("Work Experience")
    s.append(role("Travel Operations &amp; Ticketing Assistant",
                  "Trip Fly BD, Dhaka", "Mar 2026 - Aug 2026", EXP_1_BULLETS))
    s.append(role("Independent Web Developer (Freelance)",
                  "Paid client projects", "Project-based, ongoing", EXP_2_BULLETS))

    s += heading("Publications")
    for line in PUBLICATIONS:
        s.append(bullet(line))

    s += heading("Selected Projects")
    for name, url, stack in PROJECTS:
        s.append(bullet(f"<b>{name}</b> - {stack} - {url}"))

    s += heading("Education")
    for degree, detail in EDUCATION:
        s.append(Paragraph(f"<b>{degree}</b> - {detail}", S_EDU))

    s += heading("Skills")
    for label, items in SKILLS:
        s.append(Paragraph(f"<b>{label}:</b> {items}", S_SKILL))

    s += heading("Additional")
    for line in ADDITIONAL:
        s.append(bullet(line))

    return s


def build():
    doc = BaseDocTemplate(
        OUT, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=MARGIN,
        title="Omar Farque - Resume", author="Omar Farque",
        subject="Web Developer | Sabre GDS Air Ticketing | B.Sc. Computer Science & Engineering",
        keywords=("Omar Farque, web developer, front-end developer, JavaScript, HTML, CSS, Python, "
                  "Sabre GDS, air ticketing, travel operations, customer support, SEO, Git, GitHub, "
                  "Dhaka, Bangladesh, computer science graduate"),
    )
    frame = Frame(MARGIN, MARGIN, PAGE_W - 2 * MARGIN, PAGE_H - 2 * MARGIN,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    on_page = pdf_common.header_photo(PAGE_W, PAGE_H, MARGIN)
    doc.addPageTemplates([PageTemplate(id="plain", frames=[frame], onPage=on_page)])
    pdf_common.NumberedCanvas.footer_label = "Omar Farque  -  Resume"
    doc.build(story(), canvasmaker=pdf_common.NumberedCanvas)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
