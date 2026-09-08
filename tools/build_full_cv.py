"""Build assets/cv-full.pdf - the full profile CV.

Follows the section order of the reference layout Omar supplied:

    Name / headline / contact / profiles
    Summary
    Education
    Experience
    Publications
    Projects
    Skills
    Certifications & Achievements
    Languages
    Extra-curricular
    References

Single column throughout, so unlike the designed two-column CV this one also
survives an ATS parse. Longer than cv-ats.pdf on purpose: this is the version
that carries the full record, including publications.

    python tools/build_full_cv.py
"""

import os

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    CondPageBreak,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
)

import build_cv as cv
import pdf_common

OUT = os.path.join(cv.ROOT, "assets", "cv-full.pdf")

REG, BOLD, ITAL = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"

INK = HexColor("#111827")
ACCENT = HexColor("#0d7a70")
MUTED = HexColor("#4b5563")
RULE = HexColor("#c8d2dc")

PAGE_W, PAGE_H = A4
MARGIN = 14 * mm


def _s(name, size, leading, font=REG, color=INK, **kw):
    return ParagraphStyle(name, fontName=font, fontSize=size, leading=leading,
                          textColor=color, **kw)


GUTTER = pdf_common.photo_gutter()

S_NAME = _s("name", 21, 24, BOLD, spaceAfter=1, rightIndent=GUTTER)
S_HEADLINE = _s("headline", 10.4, 13.4, BOLD, ACCENT, spaceAfter=4, rightIndent=GUTTER)
S_CONTACT = _s("contact", 8.9, 12.2, color=MUTED, spaceAfter=1.5, rightIndent=GUTTER)
S_SECTION = _s("section", 10.4, 13, BOLD, INK, spaceBefore=9, spaceAfter=2)
S_BODY = _s("body", 9.0, 12.2, alignment=TA_JUSTIFY)
S_ITEM = _s("item", 9.9, 12.6, BOLD, spaceBefore=4.5)
S_META = _s("meta", 8.7, 11.4, color=MUTED, spaceAfter=1.5)
S_DESC = _s("desc", 8.9, 11.8, spaceAfter=1.5)
S_BULLET = _s("bullet", 8.9, 11.8, leftIndent=10, bulletIndent=1, spaceAfter=1.2)
S_LINE = _s("line", 8.9, 12.0, spaceAfter=1.6)


class Rule(Spacer):
    def __init__(self):
        Spacer.__init__(self, 1, 3.0)

    def draw(self):
        self.canv.setStrokeColor(RULE)
        self.canv.setLineWidth(0.7)
        self.canv.line(0, 1.2, self.width, 1.2)


def heading(title, need=52):
    """Heading plus its rule.

    CondPageBreak asks for `need` points of room first, so a heading is never
    stranded at the foot of a page. Wrapping the heading and its first item in
    a KeepTogether instead was tried and inflated the document from two pages
    to four -- the items are already KeepTogether, and nesting them forced a
    break at every section.
    """
    return [CondPageBreak(need), Paragraph(title, S_SECTION), Rule()]


def bullet(text):
    return Paragraph(text, S_BULLET, bulletText="•")


def item(title, meta=None, desc=None):
    """One record: bold title, muted meta line, optional description."""
    block = [Paragraph(title, S_ITEM)]
    if meta:
        block.append(Paragraph(meta, S_META))
    if desc:
        block.append(Paragraph(desc, S_DESC))
    return KeepTogether(block)


# --- content -----------------------------------------------------------------

SUMMARY = (
    "Computer Science &amp; Engineering graduate (B.Sc., July 2026, BUBT) who works where software meets real "
    "business operations. <b>Five paid client websites and web apps</b> built, deployed and maintained for real "
    "businesses, each with a public URL and public source. Worked in travel operations at Trip Fly BD from March "
    "to August 2026, booking air tickets on <b>Sabre GDS</b> and handling reservation support in Bangla "
    "and English. Research "
    "work in applied deep learning, with <b>one IEEE paper accepted</b> on brain tumour MRI classification and "
    "segmentation with explainable AI. Accurate under deadline, clear with customers, and quick on new systems."
)

EDUCATION = [
    ("Bangladesh University of Business and Technology (BUBT)",
     "B.Sc. in Computer Science &amp; Engineering &nbsp;|&nbsp; CGPA 3.24 / 4.00 &nbsp;|&nbsp; Completed July 2026",
     "Core coursework: data structures &amp; algorithms, object-oriented programming, database systems, software "
     "engineering, computer networks, web technologies. English medium of instruction; transcripts on request."),
    ("Kharrah Adarsha Degree Honours College",
     "Higher Secondary Certificate (Science) &nbsp;|&nbsp; GPA 4.58 / 5.00 &nbsp;|&nbsp; 2021", None),
    ("Churain Tarini Bama High School",
     "Secondary School Certificate (Science) &nbsp;|&nbsp; GPA 4.17 / 5.00 &nbsp;|&nbsp; 2019", None),
]

EXPERIENCE = [
    ("Travel Operations &amp; Ticketing Assistant",
     "Trip Fly BD &mdash; Travel Agency, Dhaka &nbsp;|&nbsp; Mar 2026 &ndash; Aug 2026 &nbsp;|&nbsp; tripflybd.com",
     [
         "Issued and managed domestic and international air tickets end to end on <b>Sabre GDS</b> &mdash; fare "
         "display, reservation creation, reissue and booking updates.",
         "Owned each booking after it was made: itinerary changes, reservation queries and travel documentation, "
         "so no customer had to chase their own status.",
         "Resolved fare and schedule questions by phone, chat and in person in <b>Bangla and English</b>, "
         "converting enquiries into confirmed bookings.",
         "Identified that daily attendance was still tracked on paper and <b>built the Smart Attendance "
         "System</b> unprompted &mdash; a role-based web app now in daily use, replacing the manual register.",
         "Built and maintained the agency's website sections and landing pages in <b>HTML, CSS and "
         "JavaScript</b>, shipping changes without an outside vendor.",
     ]),
    ("Independent Web Developer (Freelance)",
     "Paid client projects &mdash; travel, real estate, consultancy, trading &nbsp;|&nbsp; Project-based, ongoing",
     [
         "Delivered <b>five paid client websites and web apps</b>, every one still live in production with a "
         "public URL and public source.",
         "Took each project from requirements to launch as the <b>sole developer</b>: design, build, "
         "deployment, client handover and ongoing fixes.",
         "Built mobile-first, responsive, accessible layouts that stay usable on low-end Android devices.",
         "Structured pages for <b>SEO</b> &mdash; semantic markup, metadata, structured data, sitemaps.",
         "Replaced paid form services with a <b>Google Apps Script and Google Sheets</b> lead-capture backend, "
         "giving clients reliable enquiry handling at zero running cost.",
     ]),
]

# Venue names and years are not filled in until they are confirmed -- an
# unverifiable citation is the fastest way to lose a reviewer's trust.
PUBLICATIONS = [
    ("TumorMultiNet: A Statistically Validated Hybrid Deep Learning Framework for Brain Tumor MRI "
     "Classification and Segmentation on BRISC2025 with Explainable AI",
     "IEEE &nbsp;|&nbsp; <b>Accepted</b>",
     "Hybrid deep learning framework for brain tumour MRI classification and segmentation, statistically "
     "validated on the BRISC2025 dataset, with explainable-AI interpretation of model decisions."),
    ("Smart IoT First Aid Box",
     "<b>In preparation</b>",
     "IoT-based first aid system for automated supply monitoring and emergency response support."),
]

PROJECTS = [
    ("Trip Fly BD &mdash; Travel Agency Website", "tripflybd.com &nbsp;|&nbsp; HTML, CSS, JavaScript, SEO",
     "Customer-facing travel agency site: service positioning, consultation CTAs, trust-focused brand design."),
    ("Midtown Aabashon Ltd &mdash; Real Estate",
     "midtownaabashonltd.com &nbsp;|&nbsp; Responsive UI, performance",
     "Corporate property site with project discovery, responsive layout and high-intent contact paths."),
    ("Smart Attendance System &mdash; Trip Fly BD",
     "omaar-x.github.io/Tripfly-Smart-Attendance-System &nbsp;|&nbsp; JavaScript, GitHub Pages",
     "Internal web app for daily attendance operations: role-based sign-in and a fast, practical workflow."),
    ("Rover Consultancy", "roverconsultancy.com &nbsp;|&nbsp; Business site, responsive UI",
     "Consultancy site with focused service presentation and clean routes for client enquiries."),
    ("FMZ Trading Website", "omaar-x.github.io/FMZ-Trading-Website-Main &nbsp;|&nbsp; HTML, CSS, GitHub Pages",
     "Trading-focused site with a sharp visual system, responsive sections and a live deployment."),
]

SKILLS = [
    ("Travel Systems &amp; Ticketing",
     "Sabre GDS air ticket booking, fare display, reservation creation and updates, itinerary support, "
     "travel documentation, customer service in Bangla and English."),
    ("Web Development",
     "HTML5, CSS3, JavaScript, responsive and mobile-first UI, accessible layouts, semantic markup, "
     "structured data, SEO, performance."),
    ("Programming",
     "JavaScript and Python in production work; C, C++ and Java from university coursework and contests."),
    ("Machine Learning &amp; Research",
     "Deep learning for medical imaging, classification and segmentation, explainable AI, statistical "
     "validation, academic writing."),
    ("Tools &amp; Platforms",
     "Git, GitHub, GitHub Pages, Google Apps Script, Google Sheets, Microsoft Word, Microsoft Excel."),
    ("Creative",
     "Video editing, Canva design, photography, presentation and marketing assets."),
]

ACHIEVEMENTS = [
    "<b>BUBT ICPC 2025</b> and <b>BIUPC Programming Contest</b> &mdash; competitive programming participant.",
    "<b>BUBT Innovtex Hackathon</b> &mdash; event volunteer.",
    "<b>Five production deployments</b> &mdash; public URLs, verifiable at any time.",
    "<b>Certificate gallery</b> &mdash; scanned certificates viewable at omaar-x.github.io.",
]

LANGUAGES = [
    ("Bangla", "Native"),
    ("English", "Professional working proficiency"),
]


def story():
    s = []

    s.append(Paragraph("Omar Farque", S_NAME))
    s.append(Paragraph(
        "Web Developer &nbsp;|&nbsp; Sabre GDS Air Ticketing &nbsp;|&nbsp; Graphic Designer &nbsp;|&nbsp; "
        "Video Editor &nbsp;|&nbsp; Digital Marketer<br/>"
        "B.Sc. Computer Science &amp; Engineering", S_HEADLINE))
    s.append(Paragraph(
        f"Dhaka, Bangladesh &nbsp;|&nbsp; {cv.PHONE} &nbsp;|&nbsp; {cv.EMAIL}", S_CONTACT))
    s.append(Paragraph(
        "Portfolio: omaar-x.github.io &nbsp;|&nbsp; GitHub: github.com/omaar-x", S_CONTACT))

    s += heading("Summary")
    s.append(Paragraph(SUMMARY, S_BODY))

    s += heading("Education")
    s += [item(*row) for row in EDUCATION]

    s += heading("Experience")
    for title, meta, bullets in EXPERIENCE:
        s.append(KeepTogether(
            [Paragraph(title, S_ITEM), Paragraph(meta, S_META)] + [bullet(b) for b in bullets[:2]]
        ))
        for b in bullets[2:]:
            s.append(bullet(b))

    s += heading("Publications")
    s += [item(*row) for row in PUBLICATIONS]

    s += heading("Projects")
    s += [item(*row) for row in PROJECTS]

    s += heading("Skills")
    for name, detail in SKILLS:
        s.append(Paragraph(f"<b>{name}:</b> {detail}", S_LINE))

    s += heading("Achievements &amp; Activities")
    for line in ACHIEVEMENTS:
        s.append(bullet(line))

    s += heading("Languages")
    s.append(Paragraph(
        " &nbsp;|&nbsp; ".join(f"<b>{n}:</b> {lvl}" for n, lvl in LANGUAGES), S_LINE))

    s += heading("References")
    s.append(Paragraph(
        "<b>Dr. Md. Rajibul Islam</b><br/>"
        "Chairman, Department of Data Science &amp; Engineering<br/>"
        "Bangladesh University of Business and Technology (BUBT)<br/>"
        "Contact details on request.", S_LINE))
    s.append(Spacer(1, 3.0))
    s.append(Paragraph(
        "Full transcripts and scanned certificates provided on request.", S_LINE))

    return s


def build():
    doc = BaseDocTemplate(
        OUT, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN, topMargin=MARGIN, bottomMargin=MARGIN,
        title="Omar Farque - Curriculum Vitae", author="Omar Farque",
        subject="Web Developer | Sabre GDS Air Ticketing | B.Sc. Computer Science & Engineering",
        keywords=("Omar Farque, web developer, front-end developer, JavaScript, Python, HTML, CSS, "
                  "Sabre GDS, air ticketing, travel operations, customer support, SEO, Git, GitHub, "
                  "deep learning, explainable AI, IEEE, Dhaka, Bangladesh, computer science graduate"),
    )
    frame = Frame(MARGIN, MARGIN, PAGE_W - 2 * MARGIN, PAGE_H - 2 * MARGIN,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    on_page = pdf_common.header_photo(PAGE_W, PAGE_H, MARGIN)
    doc.addPageTemplates([PageTemplate(id="plain", frames=[frame], onPage=on_page)])
    pdf_common.NumberedCanvas.footer_label = "Omar Farque  -  Curriculum Vitae"
    doc.build(story(), canvasmaker=pdf_common.NumberedCanvas)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
