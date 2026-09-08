"""
Build assets/cv.pdf - Omar Farque professional CV.

Run:  python tools/build_cv.py
Deps: reportlab

Content lives in the CONTENT section below so the CV can be regenerated
whenever the portfolio is updated.
"""

import html
import os

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.platypus import Paragraph

# ---------------------------------------------------------------- setup ----

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "cv.pdf")               # hiring version
OUT_ACADEMIC = os.path.join(ROOT, "assets", "academic-cv.pdf")  # admissions version

PAGE_W, PAGE_H = A4

INK = HexColor("#101f2e")
NAVY = HexColor("#0d1b28")
TEAL = HexColor("#0d9488")
TEAL_LIGHT = HexColor("#5eead4")
GOLD = HexColor("#b8862b")
BODY = HexColor("#22303f")
MUTED = HexColor("#5f6d7e")
RULE = HexColor("#d8e0e8")
PANEL = HexColor("#f1f5f9")

SIDEBAR_W = 196.0
SIDE_PAD = 20.0
SIDE_X = SIDE_PAD
SIDE_W = SIDEBAR_W - (SIDE_PAD * 2)

MAIN_X = SIDEBAR_W + 26.0
MAIN_W = PAGE_W - MAIN_X - 40.0

HEADER_H_FIRST = 122.0
HEADER_H_REST = 52.0
FOOTER_Y = 42.0

FONTS = r"C:\Windows\Fonts"
_FONT_FILES = [
    ("Sg", "segoeui.ttf"),
    ("Sg-B", "segoeuib.ttf"),
    ("Sg-I", "segoeuii.ttf"),
    ("Sg-L", "segoeuisl.ttf"),
]

REG, BOLD, ITAL, LIGHT = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique", "Helvetica"
if all(os.path.exists(os.path.join(FONTS, f)) for _, f in _FONT_FILES):
    for name, filename in _FONT_FILES:
        pdfmetrics.registerFont(TTFont(name, os.path.join(FONTS, filename)))
    pdfmetrics.registerFontFamily("Sg", normal="Sg", bold="Sg-B", italic="Sg-I")
    REG, BOLD, ITAL, LIGHT = "Sg", "Sg-B", "Sg-I", "Sg-L"


PHOTO_SRC = os.path.join(ROOT, "assets", "Omar.png")
# Head-and-shoulders window inside the square studio portrait (left, top, right, bottom).
PHOTO_CROP = (300, 35, 790, 525)


def headshot():
    """Square head-and-shoulders crop of the portrait, or None if unavailable."""
    if not os.path.exists(PHOTO_SRC):
        return None
    try:
        import io

        from PIL import Image
    except ImportError:
        return ImageReader(PHOTO_SRC)

    with Image.open(PHOTO_SRC) as im:
        crop = im.convert("RGB").crop(PHOTO_CROP)
    buffer = io.BytesIO()
    crop.save(buffer, format="PNG")
    buffer.seek(0)
    return ImageReader(buffer)


def draw_photo(c, cx, cy, r, image):
    """Portrait clipped to a circle, with a soft ring around it."""
    if image is None:
        return
    c.saveState()
    path = c.beginPath()
    path.circle(cx, cy, r)
    c.clipPath(path, stroke=0, fill=0)
    c.drawImage(image, cx - r, cy - r, 2 * r, 2 * r, mask=None)
    c.restoreState()

    c.setStrokeColor(TEAL)
    c.setLineWidth(2.0)
    c.circle(cx, cy, r + 1.6, stroke=1, fill=0)
    c.setStrokeColor(HexColor("#20384a"))
    c.setLineWidth(1.0)
    c.circle(cx, cy, r + 6.0, stroke=1, fill=0)


def plain(text):
    """Entity-decode a string bound for canvas.drawString.

    Content is authored in the same mini-HTML that Paragraph() accepts, but the
    canvas draws bytes literally -- so "Mar 2026 &ndash; Present" reached the CV
    with the entity still showing. Anything drawn raw must come through here.
    """
    return html.unescape(text).replace(" ", " ")


def tracked(c, x, y, text, font, size, color, spacing=1.0, align="left"):
    """drawString with letter spacing (canvas.setCharSpace is not in every build)."""
    text = plain(text)
    width = pdfmetrics.stringWidth(text, font, size) + spacing * max(0, len(text) - 1)
    if align == "right":
        x -= width
    elif align == "center":
        x -= width / 2
    t = c.beginText()
    t.setTextOrigin(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(spacing)
    t.textOut(text)
    t.setCharSpace(0)  # Tc persists across text objects, so always reset it
    c.drawText(t)
    return width


def style(size, leading, color=BODY, font=REG, space_after=0, bullet_indent=0):
    return ParagraphStyle(
        f"s{size}{leading}{font}{space_after}{bullet_indent}",
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        spaceAfter=space_after,
        leftIndent=bullet_indent,
        bulletIndent=0,
    )


S_BODY = style(9.1, 13.2)
S_BULLET = style(9.1, 13.0, bullet_indent=11)
S_SIDE = style(8.5, 12.4, color=HexColor("#31404f"))
S_SIDE_BULLET = style(8.5, 12.2, color=HexColor("#31404f"), bullet_indent=9)
S_SIDE_LABEL = style(8.2, 11.4, color=TEAL, font=BOLD)
S_META = style(8.3, 11.6, color=MUTED)
S_ROLE = style(11.4, 14.4, color=INK, font=BOLD)
S_PROJ = style(9.6, 12.6, color=INK, font=BOLD)
S_LINK = style(8.3, 11.2, color=TEAL, font=BOLD)


# -------------------------------------------------------------- blocks ----


class Block:
    """A drawable chunk of CV content that can measure itself before layout."""

    gap_before = 0.0

    def height(self, width):
        raise NotImplementedError

    def draw(self, c, x, top, width):
        raise NotImplementedError


class Spacer(Block):
    def __init__(self, h):
        self.h = h

    def height(self, width):
        return self.h

    def draw(self, c, x, top, width):
        return self.h


class SectionTitle(Block):
    # 13.0 pushed the last section onto a near-empty third page once
    # Publications was added; 10.5 keeps the same visual rhythm in two.
    gap_before = 10.5

    def __init__(self, text, sidebar=False):
        self.text = text.upper()
        self.sidebar = sidebar

    def height(self, width):
        return 20.0 if not self.sidebar else 17.0

    def draw(self, c, x, top, width):
        size = 9.4 if not self.sidebar else 8.4
        tracked(c, x, top - size, self.text, BOLD, size, INK if not self.sidebar else NAVY, 1.1)

        rule_y = top - size - 6.5
        c.setLineWidth(1.9)
        c.setStrokeColor(TEAL)
        c.line(x, rule_y, x + 26, rule_y)
        c.setLineWidth(0.7)
        c.setStrokeColor(RULE)
        c.line(x + 29, rule_y, x + width, rule_y)
        return self.height(width)


class Para(Block):
    def __init__(self, text, s=None, gap_before=0.0):
        self.text = text
        self.s = s or S_BODY
        self.gap_before = gap_before

    def _p(self, width):
        p = Paragraph(self.text, self.s)
        p.wrapOn(None, width, 2000)
        return p

    def height(self, width):
        return self._p(width).height

    def draw(self, c, x, top, width):
        p = self._p(width)
        p.drawOn(c, x, top - p.height)
        return p.height


class Bullets(Block):
    def __init__(self, items, s=None, marker="\u2022", gap=2.8):
        self.items = items
        self.s = s or S_BULLET
        self.marker = marker
        self.gap = gap

    def _paras(self, width):
        return [Paragraph(f'<bullet>{self.marker}</bullet>{t}', self.s) for t in self.items]

    def height(self, width):
        total = 0.0
        for p in self._paras(width):
            p.wrapOn(None, width, 2000)
            total += p.height + self.gap
        return max(0.0, total - self.gap)

    def draw(self, c, x, top, width):
        y = top
        for p in self._paras(width):
            p.wrapOn(None, width, 2000)
            p.drawOn(c, x, y - p.height)
            y -= p.height + self.gap
        return top - y + self.gap


class Group(Block):
    """Keeps several blocks together so they never split across a page."""

    def __init__(self, blocks, gap_before=0.0):
        self.blocks = blocks
        self.gap_before = gap_before

    def height(self, width):
        return sum(b.gap_before + b.height(width) for b in self.blocks)

    def draw(self, c, x, top, width):
        y = top
        for b in self.blocks:
            y -= b.gap_before
            y -= b.draw(c, x, y, width)
        return top - y


class Entry(Block):
    """Job / education entry: title, org line, right-aligned meta, bullets."""

    gap_before = 9.0

    def __init__(self, title, org, meta, bullets=(), note=None):
        self.title = title
        self.org = org
        self.meta = meta
        self.bullets = list(bullets)
        self.note = note

    def _parts(self, width):
        title = Paragraph(self.title, S_ROLE)
        title.wrapOn(None, width, 2000)
        org = Paragraph(self.org, style(9.3, 12.6, color=TEAL, font=BOLD))
        org.wrapOn(None, width, 2000)
        note = None
        if self.note:
            note = Paragraph(self.note, style(9.0, 12.6, color=BODY, font=ITAL))
            note.wrapOn(None, width, 2000)
        bullets = Bullets(self.bullets) if self.bullets else None
        return title, org, note, bullets

    def height(self, width):
        title, org, note, bullets = self._parts(width)
        h = title.height + 2.0 + org.height
        if note:
            h += 4.0 + note.height
        if bullets:
            h += 6.0 + bullets.height(width)
        return h

    def draw(self, c, x, top, width):
        title, org, note, bullets = self._parts(width)
        y = top

        c.setFont(REG, 8.2)
        c.setFillColor(MUTED)
        c.drawRightString(x + width, y - 9.6, plain(self.meta))

        meta_w = c.stringWidth(self.meta, REG, 8.2) + 10
        title.wrapOn(None, width - meta_w, 2000)
        title.drawOn(c, x, y - title.height)
        y -= title.height + 2.0

        org.drawOn(c, x, y - org.height)
        y -= org.height

        if note:
            y -= 4.0
            note.drawOn(c, x, y - note.height)
            y -= note.height
        if bullets:
            y -= 6.0
            y -= bullets.draw(c, x, y, width)
        return top - y


class Project(Block):
    gap_before = 8.0

    def __init__(self, name, url, desc):
        self.name = name
        self.url = url
        self.desc = desc

    def _parts(self, width):
        head = Paragraph(f"{self.name}", S_PROJ)
        head.wrapOn(None, width - 16, 2000)
        desc = Paragraph(self.desc, style(8.8, 12.0, color=BODY))
        desc.wrapOn(None, width - 16, 2000)
        link = Paragraph(self.url, S_LINK)
        link.wrapOn(None, width - 16, 2000)
        return head, desc, link

    def height(self, width):
        head, desc, link = self._parts(width)
        return head.height + 3.0 + desc.height + 2.5 + link.height

    def draw(self, c, x, top, width):
        head, desc, link = self._parts(width)
        total = self.height(width)

        c.setFillColor(TEAL)
        c.setStrokeColor(TEAL)
        c.setLineWidth(1.6)
        c.line(x + 1, top - 1.5, x + 1, top - total + 1)

        y = top
        head.drawOn(c, x + 10, y - head.height)
        y -= head.height + 3.0
        desc.drawOn(c, x + 10, y - desc.height)
        y -= desc.height + 2.5
        link.drawOn(c, x + 10, y - link.height)

        c.linkURL(
            "https://" + self.url.replace("https://", "").replace("http://", ""),
            (x + 10, y - link.height, x + 10 + width - 16, y),
            relative=0,
            thickness=0,
        )
        return total


class SideList(Block):
    """Label + value pairs used in the sidebar."""

    gap_before = 8.0

    def __init__(self, rows):
        self.rows = rows

    def _parts(self, width):
        out = []
        for label, value in self.rows:
            lp = Paragraph(label.upper(), S_SIDE_LABEL) if label else None
            if lp:
                lp.wrapOn(None, width, 2000)
            vp = Paragraph(value, S_SIDE)
            vp.wrapOn(None, width, 2000)
            out.append((lp, vp))
        return out

    def height(self, width):
        total = 0.0
        for lp, vp in self._parts(width):
            if lp:
                total += lp.height + 1.6
            total += vp.height + 7.0
        return max(0.0, total - 7.0)

    def draw(self, c, x, top, width):
        y = top
        for lp, vp in self._parts(width):
            if lp:
                lp.drawOn(c, x, y - lp.height)
                y -= lp.height + 1.6
            vp.drawOn(c, x, y - vp.height)
            y -= vp.height + 7.0
        return top - y + 7.0


class Facts(Block):
    """Highlight row of key numbers."""

    gap_before = 10.0

    def __init__(self, items):
        self.items = items

    def height(self, width):
        return 48.0

    def draw(self, c, x, top, width):
        h = 48.0
        c.setFillColor(HexColor("#f4f8fa"))
        c.setStrokeColor(RULE)
        c.setLineWidth(0.7)
        c.roundRect(x, top - h, width, h, 5, stroke=1, fill=1)

        cell = width / len(self.items)
        for i, (value, label) in enumerate(self.items):
            cx = x + cell * i + cell / 2
            if i:
                c.setStrokeColor(RULE)
                c.line(x + cell * i, top - h + 9, x + cell * i, top - 9)
            c.setFont(BOLD, 14.5)
            c.setFillColor(INK)
            c.drawCentredString(cx, top - 22, plain(value))
            tracked(c, cx, top - 34, label.upper(), REG, 7.3, MUTED, 0.5, align="center")
        return h


# ------------------------------------------------------------- content ----

NAME = "OMAR FARQUE"
TITLE = ("B.Sc. Computer Science &amp; Engineering  |  Web Developer  |  Sabre GDS Air Ticketing  |  "
         "Graphic Designer  |  Video Editor  |  Digital Marketer")
PHONE = "+880 1705-182933"
EMAIL = "umor2026@gmail.com"

CONTACT_BAR = [
    ("map-pin", "Dhaka, Bangladesh"),
    ("phone", PHONE),
    ("mail", EMAIL),
    ("globe", "omaar-x.github.io"),
]

_SUMMARY_CORE = (
    "<b>Computer Science &amp; Engineering</b> graduate (B.Sc. completed July 2026, CGPA 3.24 / 4.00) who already "
    "ships to production: <b>five paid client websites and web apps</b> built, deployed, and maintained for real "
    "businesses, each with a public URL and public source. Worked in travel operations at a Dhaka agency from March "
    "to August 2026, booking air tickets on <b>Sabre GDS</b> and handling reservation support and customer "
    "communication in Bangla and English. "
)

SUMMARY = _SUMMARY_CORE + (
    "Seeking a role where accuracy, clear communication, and practical engineering skill all matter."
)

SUMMARY_ACADEMIC = _SUMMARY_CORE + (
    "Seeking a role where accuracy, clear communication, and practical engineering skill all matter, "
    "while preparing to apply for M.Sc. study abroad."
)

EXPERIENCE = Entry(
    "Travel Operations &amp; Ticketing Assistant",
    "Trip Fly BD &mdash; Travel Agency, Dhaka",
    "Mar 2026 &ndash; Aug 2026",
    bullets=[
        "Issued and managed domestic and international air tickets end to end on <b>Sabre GDS</b> &mdash; fare "
        "display, reservation creation, reissue, and booking updates &mdash; with fare accuracy treated as "
        "non-negotiable.",
        "Owned each booking after it was made: itinerary changes, reservation queries, and travel documentation, "
        "so no customer had to chase their own status.",
        "Resolved fare, schedule, and travel-condition questions by phone, chat, and in person in <b>Bangla and "
        "English</b>, converting enquiries into confirmed bookings.",
        "Coordinated between customers and the internal team so confirmations, changes, and refunds closed inside "
        "the same working day.",
        "Identified that daily attendance was still tracked on paper and <b>built the Smart Attendance System</b> "
        "unprompted &mdash; a role-based web app now in daily use, replacing the manual register.",
        "Built and maintained the agency's <b>website sections and landing pages</b> (HTML, CSS, JavaScript), "
        "shipping changes without waiting on an outside vendor.",
    ],
)

EXPERIENCE_2 = Entry(
    "Independent Web Developer (Freelance)",
    "Paid client projects &mdash; travel, real estate, consultancy, trading",
    "Project-based, ongoing",
    bullets=[
        "Delivered <b>five paid client websites and web apps</b> across travel, real estate, consultancy, and "
        "trading &mdash; every one still live in production, with a public URL and public source.",
        "Took each project from requirements to launch as the <b>sole developer</b>: design, build, content "
        "structure, deployment, client handover, and ongoing fixes.",
        "Built mobile-first, responsive layouts with accessible navigation, so the sites stay usable on the "
        "low-end Android devices most customers browse from.",
        "Structured pages for <b>SEO</b> &mdash; semantic markup, metadata, structured data, sitemaps &mdash; so "
        "clients reach customers through organic search rather than paid ads alone.",
        "Replaced paid form services with a <b>Google Apps Script + Sheets</b> lead-capture backend, giving "
        "clients reliable enquiry handling at zero running cost.",
    ],
)

PROJECTS = [
    Project(
        "Trip Fly BD &mdash; Travel Agency Website",
        "www.tripflybd.com",
        "Customer-facing travel site: service positioning, consultation CTAs, trust-focused design.",
    ),
    Project(
        "Midtown Aabashon Ltd",
        "midtownaabashonltd.com",
        "Real-estate corporate site: project discovery and high-intent contact paths.",
    ),
    Project(
        "Rover Consultancy",
        "www.roverconsultancy.com",
        "Consultancy site with focused service presentation and clean enquiry routes.",
    ),
    Project(
        "Smart Attendance System &mdash; Trip Fly BD",
        "omaar-x.github.io/Tripfly-Smart-Attendance-System",
        "Internal web app for daily attendance: role-based sign-in, fast practical workflow.",
    ),
    Project(
        "FMZ Trading Website",
        "omaar-x.github.io/FMZ-Trading-Website-Main",
        "Trading site with a responsive visual system, deployed on GitHub Pages.",
    ),
]

EDUCATION = [
    Entry(
        "B.Sc. in Computer Science &amp; Engineering",
        "Bangladesh University of Business and Technology (BUBT)",
        "Completed July 2026",
        note="CGPA 3.24 / 4.00 &mdash; programming, web systems, and applied computing. English medium of "
        "instruction; transcripts on request.",
    ),
    Entry(
        "Higher Secondary Certificate (Science)",
        "Kharrah Adarsha Degree Honours College",
        "2021",
        note="GPA 4.58 / 5.00 &mdash; analytical preparation before university-level technical study.",
    ),
    Entry(
        "Secondary School Certificate (Science)",
        "Churain Tarini Bama High School",
        "2019",
        note="GPA 4.17 / 5.00 &mdash; foundation in science, mathematics, and disciplined study habits.",
    ),
]

PUBLICATIONS = [
    (
        "TumorMultiNet: A Statistically Validated Hybrid Deep Learning Framework for Brain Tumor "
        "MRI Classification and Segmentation on BRISC2025 with Explainable AI",
        "IEEE &mdash; accepted",
        "Hybrid deep learning framework for brain tumour MRI classification and segmentation, "
        "statistically validated on the BRISC2025 dataset, with explainable-AI interpretation of "
        "model decisions.",
    ),
    (
        "Smart IoT First Aid Box",
        "In preparation",
        "IoT-based first aid system for automated supply monitoring and emergency response support.",
    ),
]

PROOF = [
    "<b>BUBT ICPC 2025</b> and <b>BIUPC Programming Contest</b> &mdash; contest participant; "
    "<b>BUBT Innovtex Hackathon</b> &mdash; event volunteer.",
    "<b>Verifiable proof</b> &mdash; five production deployments with public URLs and public source; "
    "certificates viewable at omaar-x.github.io.",
]

PROOF_HIRING = [
    "<b>BUBT ICPC 2025</b>, <b>BIUPC Programming Contest</b> &mdash; participant; <b>BUBT Innovtex "
    "Hackathon</b> &mdash; volunteer. Five production deployments with public URLs and source; "
    "certificates at omaar-x.github.io.",
]

RESEARCH_LINE = (
    "<b>Research:</b> one IEEE paper accepted (brain tumour MRI classification and segmentation with "
    "explainable AI); a second in preparation."
)

TARGETS = [
    "Junior web / front-end developer",
    "IT support &amp; web operations",
    "Travel-tech &amp; airline ticketing",
    "Customer support &amp; service desk",
    "Digital marketing &amp; SEO",
    "Graduate trainee / internship",
]

GRAD_OBJECTIVE = (
    "Applying for <b>M.Sc. / M.Eng. study abroad, 2027 intake</b> in computer science, software engineering, "
    "information systems, or data science. <b>IELTS scheduled shortly.</b> Research interests: applied machine "
    "learning for service automation, web-system performance and accessibility, and workflow automation for "
    "small businesses. Seeking scholarship- or assistantship-funded places."
)

STRENGTHS = [
    "Sabre GDS air ticketing",
    "Reservation &amp; itinerary support",
    "Customer communication",
    "Responsive web development",
    "SEO &amp; digital growth",
    "Video editing &amp; Canva design",
    "MS Word &amp; MS Excel",
    "Calm, accurate, detail-first work",
]

SKILLS = [
    ("Travel systems", "Sabre GDS, air ticket booking, reservation handling, itinerary support"),
    ("Programming", "C, C++, Java, Python, JavaScript"),
    ("Web", "HTML5, CSS3, responsive and mobile-first UI, accessible layouts"),
    ("Tools", "Git &amp; GitHub, GitHub Pages, Google Apps Script, Google Sheets"),
    ("Office", "Microsoft Word, Microsoft Excel, Google Docs"),
    ("Creative", "Video editing, Canva design, photography, presentation assets"),
]

SOFT_SKILLS = [
    "Customer-first service attitude",
    "Clear written &amp; verbal communication",
    "Accuracy under booking deadlines",
    "Team coordination &amp; follow-up",
    "Fast to learn new systems",
]

LANGUAGES = [
    ("", "<b>Bangla</b> &mdash; Native"),
    ("", "<b>English</b> &mdash; Professional working proficiency"),
]

INTERESTS = "Cooking &nbsp;·&nbsp; Cricket &nbsp;·&nbsp; Football &nbsp;·&nbsp; Video editing &nbsp;·&nbsp; Photography"

FOOTER_NOTE = "Omar Farque  ·  Resume  ·  Updated September 2026  ·  omaar-x.github.io"
FOOTER_NOTE_ACADEMIC = "Omar Farque  ·  Academic CV  ·  Updated September 2026  ·  omaar-x.github.io"

PHOTO = None  # loaded in build()
TOTAL_PAGES = 2  # set in build() once the layout is known
ACADEMIC = False  # set in build(); switches the two audience-specific sections


def main_blocks():
    blocks = [
        SectionTitle("Professional Summary"),
        Para(SUMMARY_ACADEMIC if ACADEMIC else SUMMARY, gap_before=2.0),
    ]
    # An admissions reader wants the study objective up front, next to the
    # summary -- not stranded on a near-empty final page.
    if ACADEMIC:
        blocks += [
            SectionTitle("Graduate Study Objective"),
            Para(GRAD_OBJECTIVE, gap_before=2.0),
        ]
    blocks += [
        SectionTitle("Professional Experience"),
        EXPERIENCE,
        EXPERIENCE_2,
        SectionTitle("Publications"),
        *[
            Entry(title, venue, "", note=desc)
            for title, venue, desc in PUBLICATIONS
        ],
        SectionTitle("Selected Live Projects"),
        *PROJECTS,
        SectionTitle("Education"),
        *(EDUCATION if ACADEMIC else EDUCATION[:-1]),
        SectionTitle("Contests, Certificates & Proof"),
        Bullets(PROOF if ACADEMIC else PROOF_HIRING),
    ]
    return blocks


def side_blocks():
    return [
        SectionTitle("Contact", sidebar=True),
        SideList(
            [
                ("Phone / WhatsApp", PHONE),
                ("Email", EMAIL),
                ("Location", "Dhaka, Bangladesh"),
                ("Portfolio", "omaar-x.github.io"),
                ("GitHub", "github.com/omaar-x"),
            ]
        ),
        SectionTitle("Target Roles", sidebar=True),
        Bullets(TARGETS, s=S_SIDE_BULLET, marker="\u2013", gap=2.6),
        SectionTitle("Core Strengths", sidebar=True),
        Bullets(STRENGTHS, s=S_SIDE_BULLET, marker="\u2013", gap=2.6),
        SectionTitle("Technical Skills", sidebar=True),
        SideList(SKILLS),
        SectionTitle("Working Style", sidebar=True),
        Bullets(SOFT_SKILLS, s=S_SIDE_BULLET, marker="–", gap=2.6),
        SectionTitle("Languages", sidebar=True),
        SideList(LANGUAGES),
        SectionTitle("Availability", sidebar=True),
        Para(
            "Available immediately; open to full-time and remote opportunities in Bangladesh and abroad. "
            "Willing to relocate internationally.",
            S_SIDE,
            gap_before=2.0,
        ),
        SectionTitle("Interests", sidebar=True),
        Para(INTERESTS, S_SIDE, gap_before=2.0),
        SectionTitle("References", sidebar=True),
        Para(
            "<b>Dr. Md. Rajibul Islam</b><br/>Chairman, Department of Data Science &amp; "
            "Engineering<br/>Bangladesh University of Business and Technology (BUBT)<br/>"
            "Contact details on request.",
            S_SIDE,
            gap_before=2.0,
        ),
    ]


# -------------------------------------------------------------- chrome ----


def draw_header(c, page):
    if page == 1:
        h = HEADER_H_FIRST
        c.setFillColor(NAVY)
        c.rect(0, PAGE_H - h, PAGE_W, h, stroke=0, fill=1)
        c.setFillColor(TEAL)
        c.rect(0, PAGE_H - h, PAGE_W, 3.5, stroke=0, fill=1)

        draw_photo(c, PAGE_W - 80, PAGE_H - 61, 44, PHOTO)

        tracked(c, SIDE_PAD + 20, PAGE_H - 52, NAME, BOLD, 27, white, 1.6)

        p = Paragraph(TITLE, style(9.8, 13.2, color=TEAL_LIGHT, font=REG))
        p.wrapOn(None, PAGE_W - 200, 60)
        p.drawOn(c, SIDE_PAD + 20, PAGE_H - 56 - p.height - 4)

        y = PAGE_H - h + 22
        x = SIDE_PAD + 20
        c.setFont(REG, 8.6)
        for i, (_, text) in enumerate(CONTACT_BAR):
            if i:
                c.setFillColor(HexColor("#3d5566"))
                c.drawString(x, y, "|")
                x += c.stringWidth("|", REG, 8.6) + 9
            c.setFillColor(HexColor("#cfe0e6"))
            text = plain(text)
            c.drawString(x, y, text)
            x += c.stringWidth(text, REG, 8.6) + 9
        return PAGE_H - h

    h = HEADER_H_REST
    c.setFillColor(NAVY)
    c.rect(0, PAGE_H - h, PAGE_W, h, stroke=0, fill=1)
    c.setFillColor(TEAL)
    c.rect(0, PAGE_H - h, PAGE_W, 2.5, stroke=0, fill=1)
    tracked(c, SIDE_PAD + 20, PAGE_H - 32, NAME, BOLD, 13.5, white, 1.2)
    c.setFont(REG, 8.6)
    c.setFillColor(HexColor("#9fc4c9"))
    c.drawRightString(PAGE_W - 40, PAGE_H - 31, "Education, skills and proof  ·  omaar-x.github.io")
    return PAGE_H - h


def draw_chrome(c, page, top):
    c.setFillColor(PANEL)
    c.rect(0, FOOTER_Y - 8, SIDEBAR_W, top - FOOTER_Y + 8, stroke=0, fill=1)
    c.setStrokeColor(HexColor("#dbe4ec"))
    c.setLineWidth(0.8)
    c.line(SIDEBAR_W, FOOTER_Y - 8, SIDEBAR_W, top)

    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.line(SIDE_PAD, FOOTER_Y, PAGE_W - 40, FOOTER_Y)
    c.setFont(REG, 7.6)
    c.setFillColor(MUTED)
    c.drawString(SIDE_PAD, FOOTER_Y - 12, FOOTER_NOTE_ACADEMIC if ACADEMIC else FOOTER_NOTE)
    c.drawRightString(PAGE_W - 40, FOOTER_Y - 12, f"Page {page} of {TOTAL_PAGES}")


def flow(blocks, x, width, tops, bottom):
    """Lay blocks down a column, spilling onto later pages when needed."""
    page = 0
    y = tops[0]
    first_on_page = True

    for i, block in enumerate(blocks):
        gap = 0.0 if first_on_page else block.gap_before
        h = block.height(width)
        needed = gap + h

        # A section title must never be the last thing on a page.
        if isinstance(block, SectionTitle) and i + 1 < len(blocks):
            nxt = blocks[i + 1]
            needed += nxt.gap_before + nxt.height(width)

        if y - needed < bottom and page + 1 < len(tops):
            page += 1
            y = tops[page]
            gap = 0.0
            first_on_page = True

        y -= gap
        _draw_on(page, block, x, y, width)
        y -= h
        first_on_page = False

        if y < bottom - 1:
            print(f"  ! column overflow on page {page + 1} at block {type(block).__name__}")
    return page


_PAGE_BUFFERS = {}


def _draw_on(page, block, x, y, width):
    _PAGE_BUFFERS.setdefault(page, []).append((block, x, y, width))


def build(academic=False):
    global PHOTO, ACADEMIC
    ACADEMIC = academic
    PHOTO = headshot()

    out = OUT_ACADEMIC if academic else OUT
    c = pdfcanvas.Canvas(out, pagesize=A4)
    c.setTitle("Omar Farque - Academic CV" if academic else "Omar Farque - Resume")
    c.setAuthor("Omar Farque")
    c.setSubject("B.Sc. Computer Science & Engineering | Web Developer | Sabre GDS Air Ticketing")
    c.setKeywords(
        "Omar Farque, computer science, software engineering, web developer, Sabre GDS, air ticketing, "
        "SEO, Bangladesh" + (", masters applicant, MSc, graduate admission" if academic else "")
    )

    # Page slots. Keep a spare so new content spills onto a page instead of
    # being silently dropped; unused slots never get drawn.
    MAX_PAGES = 3
    first_top = PAGE_H - HEADER_H_FIRST - 16
    rest_top = PAGE_H - HEADER_H_REST - 22
    tops_main = [first_top] + [rest_top] * (MAX_PAGES - 1)
    tops_side = [first_top] + [rest_top] * (MAX_PAGES - 1)
    bottom = FOOTER_Y + 16

    _PAGE_BUFFERS.clear()
    flow(main_blocks(), MAIN_X, MAIN_W, tops_main, bottom)
    flow(side_blocks(), SIDE_X, SIDE_W, tops_side, bottom)

    pages = max(_PAGE_BUFFERS) + 1 if _PAGE_BUFFERS else 1

    global TOTAL_PAGES
    TOTAL_PAGES = pages
    for page in range(pages):
        top = draw_header(c, page + 1)
        draw_chrome(c, page + 1, top)
        for block, x, y, width in _PAGE_BUFFERS.get(page, []):
            block.draw(c, x, y, width)
        c.showPage()

    c.save()
    print(f"Wrote {out} ({pages} pages)")


if __name__ == "__main__":
    build(academic=False)   # assets/cv.pdf          -> employers
    build(academic=True)    # assets/academic-cv.pdf -> admissions offices
