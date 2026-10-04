"""Page furniture shared by the platypus-built CVs (cv-full, cv-ats).

build_cv.py draws its own header, footer and photo directly on the canvas
because it controls every page itself. The platypus builds hand pagination to
reportlab, so they need two things bolted on: a portrait in the header, and a
"Page X of Y" footer that cannot know Y until the whole document has been laid
out. NumberedCanvas solves the second by buffering every page and stamping the
numbers on a second pass, just before saving.
"""

from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas as pdfcanvas

import build_cv as cv

FOOT = HexColor("#6b7280")
FOOT_RULE = HexColor("#d7dee6")

PHOTO_R = 27.0  # radius in points; ~19mm across


class NumberedCanvas(pdfcanvas.Canvas):
    """Canvas that stamps "Page X of Y" once the total is known.

    Pass the footer label via `footer_label` before building, e.g.
    NumberedCanvas.footer_label = "Omar Farque - Resume".
    """

    footer_label = ""
    bottom_y = 20.0

    def __init__(self, *args, **kwargs):
        pdfcanvas.Canvas.__init__(self, *args, **kwargs)
        self._pages = []

    def showPage(self):
        # Buffer the page instead of writing it out, so the second pass can
        # still draw on it.
        self._pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        total = len(self._pages)
        for state in self._pages:
            self.__dict__.update(state)
            self._stamp(total)
            pdfcanvas.Canvas.showPage(self)
        pdfcanvas.Canvas.save(self)

    def _stamp(self, total):
        width, _ = self._pagesize
        y = self.bottom_y

        self.setStrokeColor(FOOT_RULE)
        self.setLineWidth(0.5)
        self.line(36, y + 11, width - 36, y + 11)

        self.setFont("Helvetica", 7.6)
        self.setFillColor(FOOT)
        if self.footer_label:
            self.drawString(36, y, self.footer_label)
        self.drawRightString(width - 36, y, f"Page {self._pageNumber} of {total}")


def header_photo(page_w, page_h, margin, radius=PHOTO_R):
    """onPage callback that puts the portrait in the top-right of page 1."""
    image = cv.headshot()

    def draw(canvas, doc):
        if image is None or doc.page != 1:
            return
        cx = page_w - margin - radius
        cy = page_h - margin - radius
        cv.draw_photo(canvas, cx, cy, radius, image)

    return draw


def photo_gutter(radius=PHOTO_R):
    """Right indent the header text needs so it never runs under the portrait."""
    return 2 * radius + 16
