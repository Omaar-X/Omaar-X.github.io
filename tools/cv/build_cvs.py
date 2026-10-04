"""Build the three portfolio CVs into public/cv/.

    python tools/cv/build_cvs.py

Single column, base-14 Helvetica, selectable text, real link annotations, no images or graphics beyond
hairline rules. Requires: reportlab.
"""

import os
import re
import sys
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.platypus import (BaseDocTemplate, Flowable, Frame, KeepTogether, PageTemplate, Paragraph, Spacer,
                                Table, TableStyle)

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import content as c  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT_DIR = os.path.join(ROOT, "public", "cv")

PAPER = HexColor("#FBF9F4")
INK = HexColor("#1B211D")
MUTED = HexColor("#5A605B")
FOREST = HexColor("#284B3A")
CHAMPAGNE = HexColor("#B89B69")
RULE = HexColor("#DDD8CE")
FOREST_HEX = "#284B3A"

REG, BOLD = "Helvetica", "Helvetica-Bold"
PAGE_W, PAGE_H = A4
MARGIN_X = 17 * mm
CONTENT_W = PAGE_W - 2 * MARGIN_X


def style(name, size, leading, font=REG, color=INK, **kw):
    return ParagraphStyle(name, fontName=font, fontSize=size, leading=leading, textColor=color, **kw)


S_NAME = style("name", 24, 27, BOLD, INK)
S_HEAD = style("headline", 10.4, 14, BOLD, FOREST, spaceBefore=2)
S_CONTACT = style("contact", 9.4, 13, REG, MUTED, spaceBefore=4)
S_SECTION = style("section", 9.4, 12, BOLD, FOREST)
S_BODY = style("body", 10, 13.8)
S_ROLE = style("role", 10.4, 13.8, BOLD)
S_ORG = style("org", 9.8, 13, REG, FOREST)
S_META = style("meta", 9.4, 13, REG, MUTED, alignment=TA_RIGHT)
S_BULLET = style("bullet", 9.8, 13.2, REG, INK, leftIndent=11, bulletIndent=1, spaceBefore=1.6)
S_NOTE = style("note", 9.6, 13, REG, MUTED, spaceBefore=1.5)
S_LINE = style("line", 9.8, 13.4, REG, INK, spaceBefore=2.2)


def md(text):
    """Escape, then apply **bold** and [label](url)."""
    out = escape(text)
    out = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", out)
    out = re.sub(r"\[(.+?)\]\((.+?)\)", rf'<a href="\2" color="{FOREST_HEX}">\1</a>', out)
    return out


def link(label, url):
    return f"[{label}]({url})"


class Rule(Flowable):
    def __init__(self, width=CONTENT_W, thickness=0.6, color=RULE, accent=False, space_after=4):
        super().__init__()
        self.width, self.thickness, self.color, self.accent, self.space_after = width, thickness, color, accent, space_after

    def wrap(self, avail_w, avail_h):
        return self.width, self.thickness + self.space_after

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, self.space_after, self.width, self.space_after)
        if self.accent:
            self.canv.setStrokeColor(CHAMPAGNE)
            self.canv.setLineWidth(1.6)
            self.canv.line(0, self.space_after, 26, self.space_after)


def section(title, items):
    """Each item is a flowable or a list of flowables kept together; the heading stays with the first item.

    KeepTogether reports a huge height to force a split, so it must never be nested.
    """
    head = [Spacer(1, 7), Paragraph(title.upper(), S_SECTION), Spacer(1, 2), Rule(accent=True)]
    groups = [i if isinstance(i, list) else [i] for i in items]
    if not groups:
        return head
    return [KeepTogether(head + groups[0]), *[KeepTogether(g) for g in groups[1:]]]


def entry(role, org, dates, place=None, bullets=(), notes=()):
    left = [Paragraph(md(role), S_ROLE), Paragraph(md(org + (f"  ·  {place}" if place else "")), S_ORG)]
    row = Table([[left, Paragraph(md(dates), S_META)]], colWidths=[CONTENT_W * 0.70, CONTENT_W * 0.30])
    row.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                             ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0),
                             ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    parts = [row]
    parts += [Paragraph(md(n), S_NOTE) for n in notes]
    parts += [Paragraph(md(b), S_BULLET, bulletText="•") for b in bullets]
    parts.append(Spacer(1, 5))
    return parts


def project(key, with_tech=True, short=False):
    p = c.PROJECTS[key]
    head = Table(
        [[Paragraph(md(f"**{p['name']}**  ·  {p['tag']}"), S_BODY), Paragraph(md(link(*p["link"])), S_META)]],
        colWidths=[CONTENT_W * 0.70, CONTENT_W * 0.30],
    )
    head.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                              ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0),
                              ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    parts = [head, Paragraph(md(p["text"]), S_NOTE)]
    if with_tech and not short:
        parts.append(Paragraph(md(f"**Tech:** {p['tech']}"), S_NOTE))
    parts.append(Spacer(1, 5))
    return parts


def skill_line(label, items):
    keep = [i.replace(" ", " ") if len(i) <= 28 else i for i in items]
    return Paragraph(md(f"**{label}:** " + "  ·  ".join(keep)), S_LINE)


def skills_block(*pairs):
    """One kept-together group so a skills section never splits across pages."""
    return [[skill_line(label, items) for label, items in pairs]]


def education_items(include_coursework=False):
    items = []
    for e in c.EDUCATION:
        items.append(entry(e["title"], e["org"], e["dates"], notes=e["lines"]))
    if include_coursework:
        items.insert(1, [Paragraph(md(f"**Coursework:** {c.COURSEWORK}"), S_NOTE), Spacer(1, 6)])
    return items


def experience_items(midtown_full=True, trip_full=True):
    m, t = c.MIDTOWN, c.TRIP_FLY
    return [
        entry(m["role"], m["org"], m["dates"], m["place"], m["full" if midtown_full else "short"]),
        entry(t["role"], t["org"], t["dates"], t["place"], t["full" if trip_full else "short"]),
    ]


def publication_items():
    """Both papers form one group so a status never sits apart from its sibling."""
    group = []
    for p in c.PUBLICATIONS:
        group += entry(p["title"], f"**{p['status']}**  ·  {p['venue']}", "")
    return [group]


def thesis_items(detailed):
    t = c.THESIS
    if not detailed:
        return [
            entry(
                "TumorMultiNet: brain MRI classification and segmentation",
                "Group capstone thesis, B.Sc. CSE, BUBT",
                "2026",
                bullets=[t["brief"], "Final models: EfficientNet-B0 + DenseNet121 (classification), SegFormer + DeepLabV3+ "
                         "(segmentation), Grad-CAM (explainability)."],
            )
        ]
    return [
        entry(
            c.THESIS_TITLE,
            t["kind"],
            "2026",
            bullets=[
                f"**Research areas:** {t['areas']}.",
                f"**Final models:** classification {t['models'][0][1]}; segmentation {t['models'][1][1]}; "
                f"explainability {t['models'][2][1]}.",
                f"**Data:** {t['data']}",
                f"**Method:** {t['method']}",
                t["notice"],
            ],
        )
    ]


def activities_items():
    return [[Paragraph(md("  ·  ".join(c.ACTIVITIES)), S_LINE), Paragraph(md(f"**Languages:** {c.LANGUAGES}"), S_LINE)]]


def header_flowables():
    contact = "  |  ".join(
        [
            escape(c.LOCATION),
            f'<a href="mailto:{c.EMAIL}" color="{FOREST_HEX}">{c.EMAIL}</a>',
            f'<a href="tel:{c.PHONE_E164}" color="{FOREST_HEX}">{c.PHONE_DISPLAY}</a>',
            f'<a href="{c.GITHUB_URL}" color="{FOREST_HEX}">github.com/{c.GITHUB_HANDLE}</a>',
            f'<a href="{c.PORTFOLIO_URL}" color="{FOREST_HEX}">{c.PORTFOLIO_HOST}</a>',
        ]
    )
    return [
        Paragraph(c.NAME.upper(), S_NAME),
        Paragraph(escape(c.HEADLINE), S_HEAD),
        Paragraph(contact, S_CONTACT),
        Spacer(1, 6),
        Rule(thickness=0.9, color=CHAMPAGNE, space_after=2),
    ]


def build_story(variant):
    story = header_flowables()
    story += section("Professional summary", [Paragraph(md(c.SUMMARY[variant]), S_BODY)])

    if variant == "general":
        story += section("Experience", experience_items())
        story += section("Selected projects", [project(k, short=True) for k in ("trm", "attendance", "fmz", "rover")])
        story += section("Research & publications", thesis_items(False) + publication_items())
        story += section("Skills", skills_block(
            ("Web development", c.SKILLS["web_short"]),
            ("Digital & business", c.SKILLS["business_short"]),
            ("AI & research", c.SKILLS["research_short"]),
            ("Tools", c.SKILLS["tools_short"]),
        ))
        story += section("Education", education_items())
        story += section("Activities & languages", activities_items())

    elif variant == "web":
        story += section("Experience", experience_items())
        story += section("Selected projects", [project(k) for k in ("trm", "midtown", "attendance", "fmz", "rover")])
        story += section("Skills & tools", skills_block(
            ("Web development", c.SKILLS["web"]),
            ("Digital marketing & business", c.SKILLS["business"]),
            ("AI & research", c.SKILLS["research_short"]),
            ("Tools", c.SKILLS["tools"]),
        ))
        story += section("Education", education_items())
        story += section("Research", thesis_items(False) + publication_items())
        story += section("Activities & languages", activities_items())

    else:
        story += section("Education", education_items(include_coursework=True))
        story += section("Research", thesis_items(True))
        story += section("Publications", publication_items())
        story += section("Research skills", skills_block(
            ("Core", c.SKILLS["research"]),
            ("Libraries & methods", c.SKILLS["research_extra"]),
            ("Environment", c.SKILLS["tools_research"]),
        ))
        story += section("Professional experience", experience_items(midtown_full=False, trip_full=False))
        story += section("Selected projects", [project(k, short=True) for k in ("attendance", "trm")])
        story += section("Skills & tools", skills_block(
            ("Web", c.SKILLS["web_short"]),
            ("Digital & business", c.SKILLS["business_short"]),
        ))
        story += section("Activities & languages", activities_items())
    return story


class NumberedCanvas(pdfcanvas.Canvas):
    label = ""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved = []

    def showPage(self):
        self._saved.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        total = len(self._saved)
        for state in self._saved:
            self.__dict__.update(state)
            self.setStrokeColor(RULE)
            self.setLineWidth(0.5)
            self.line(MARGIN_X, 12.5 * mm, PAGE_W - MARGIN_X, 12.5 * mm)
            self.setFont(REG, 7.8)
            self.setFillColor(MUTED)
            self.drawString(MARGIN_X, 8.6 * mm, f"{c.NAME}  ·  {self.label}  ·  {c.EMAIL}")
            self.drawRightString(PAGE_W - MARGIN_X, 8.6 * mm, f"Page {self._pageNumber} of {total}")
            super().showPage()
        super().save()


def paint_page(canv, doc):
    canv.saveState()
    canv.setFillColor(PAPER)
    canv.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    canv.setFillColor(FOREST)
    canv.rect(0, PAGE_H - 2.2 * mm, PAGE_W, 2.2 * mm, stroke=0, fill=1)
    canv.restoreState()


def build(variant):
    meta = c.VARIANTS[variant]
    path = os.path.join(OUT_DIR, meta["file"])
    os.makedirs(OUT_DIR, exist_ok=True)
    doc = BaseDocTemplate(
        path, pagesize=A4, title=meta["title"], author=c.NAME,
        subject="Web Developer, Digital Marketer, AI / Computer Vision Researcher",
        keywords="Omar Faruk, web developer, digital marketer, computer vision, deep learning, medical imaging",
    )
    frame = Frame(MARGIN_X, 18 * mm, CONTENT_W, PAGE_H - 33 * mm, leftPadding=0, rightPadding=0, topPadding=0,
                  bottomPadding=0, id="body")
    doc.addPageTemplates([PageTemplate(id="cv", frames=[frame], onPage=paint_page)])
    NumberedCanvas.label = meta["label"]
    doc.build(build_story(variant), canvasmaker=NumberedCanvas)
    return path


if __name__ == "__main__":
    for key in c.VARIANTS:
        print("wrote", build(key))
