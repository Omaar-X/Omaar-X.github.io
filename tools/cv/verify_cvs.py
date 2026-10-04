"""Inspect the generated CV PDFs.

    python tools/cv/verify_cvs.py
"""

import os
import re
import sys

import fitz

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import content as c  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CV_DIR = os.path.join(ROOT, "public", "cv")
MARGIN = 17 * 72 / 25.4
HEADINGS = ["PROFESSIONAL SUMMARY", "EXPERIENCE", "SELECTED PROJECTS", "RESEARCH & PUBLICATIONS", "SKILLS", "EDUCATION",
            "ACTIVITIES & LANGUAGES", "SKILLS & TOOLS", "RESEARCH", "PUBLICATIONS", "RESEARCH SKILLS", "PROFESSIONAL EXPERIENCE"]
BANNED = ["Farque", "FARQUE", "Expected", "IELTS", "LinkedIn", "linkedin", "TensorFlow", "React", "Node.js", "Figma", "Adobe",
          "Google Ads", "Meta Ads", "hatbot", "Independent Web Developer", "Smart IoT", "passionate", "visionary", "guru",
          "rockstar", "expert", "Dean", "Civil Aviation", "scholarship", "99.", "accuracy"]
ALLOWED_LINK_PREFIXES = ["mailto:" + c.EMAIL, "tel:" + c.PHONE_E164, c.GITHUB_URL, c.PORTFOLIO_URL] + [p["link"][1] for p in c.PROJECTS.values()]

EXPECT = {
    "general": {"pages": 2, "links": ["trm", "attendance", "fmz", "rover"]},
    "web": {"pages": 2, "links": ["trm", "midtown", "attendance", "fmz", "rover"]},
    "research": {"pages": 2, "links": ["attendance", "trm"]},
}

results = []


def check(name, ok, detail=""):
    results.append((ok, name, detail))


def flat(text):
    return re.sub(r"\s+", " ", text.replace(" ", " "))


for key, meta in c.VARIANTS.items():
    path = os.path.join(CV_DIR, meta["file"])
    tag = f"[{key}]"
    if not os.path.exists(path):
        check(f"{tag} file exists", False, path)
        continue
    doc = fitz.open(path)
    pages = [flat(p.get_text()) for p in doc]
    text = " ".join(pages)

    check(f"{tag} page count 1–2", 1 <= doc.page_count <= EXPECT[key]["pages"], f"{doc.page_count} pages")
    check(f"{tag} text is selectable ({len(text)} chars), no images, fonts embedded/base-14",
          len(text) > 2500 and all(not p.get_images() for p in doc),
          ", ".join(sorted({f[3] for p in doc for f in p.get_fonts()})))
    check(f"{tag} spelling: OMAR FARUK, no Farque", "OMAR FARUK" in text and "Farque" not in text and "FARQUE" not in text)
    check(f"{tag} metadata title/author", doc.metadata["author"] == c.NAME and "Omar Faruk" in doc.metadata["title"], doc.metadata["title"])
    check(f"{tag} contact details", all(x in text for x in [c.EMAIL, c.PHONE_DISPLAY, c.LOCATION, f"github.com/{c.GITHUB_HANDLE}", c.PORTFOLIO_HOST]))
    bad = [b for b in BANNED if b in text]
    check(f"{tag} no banned/unverified content", not bad, ", ".join(bad) or "none")

    check(f"{tag} degree completed 2026, CGPA, HSC, SSC",
          "Completed 2026" in text and "CGPA 3.24 / 4.00" in text and "GPA 4.58 / 5.00" in text and "GPA 4.17 / 5.00" in text
          and "Bangladesh University of Business and Technology (BUBT)" in text)

    exp_text = text[text.find("Web Developer & Digital Marketer", text.find("EXPERIENCE")):]
    check(f"{tag} Midtown first (Current, no start date), then Trip Fly March 2026 – August 2026",
          text.find("Midtown Aabashon Ltd.", text.find("EXPERIENCE")) < text.find("Trip Fly BD", text.find("EXPERIENCE"))
          and re.search(r"Web Developer & Digital Marketer\s+Midtown Aabashon Ltd\.[^|]*?Current", text) is not None
          and "March 2026 – August 2026" in text
          and re.search(r"(January|February|March|April|May|June|July|August|September|October|November|December) 2026\s+Midtown", text) is None)

    check(f"{tag} paper statuses exact",
          re.search(r"Accepted\s+·\s+IEEE", text) is not None and re.search(r"Submitted\s+·\s+ICCIT", text) is not None
          and "Smart First Aid Box" in text and c.THESIS_TITLE in text.replace("  ", " "))
    fmz_ok = "FMZ Trading" not in text or re.search(r"FMZ Trading\s+·\s+Launching soon", text) is not None
    trm_ok = "TRM Holidays" not in text or re.search(r"TRM Holidays\s+·\s+Live", text) is not None
    check(f"{tag} project statuses (FMZ never Live; TRM Live)", fmz_ok and trm_ok and "FMZ Trading  ·  Live" not in text)

    counts = {h: len(re.findall(rf"(?<![A-Z&] ){re.escape(h)}(?! [A-Z&])", text)) for h in HEADINGS}
    dup = [h for h, n in counts.items() if n > 1 and h in ("PROFESSIONAL SUMMARY", "EXPERIENCE", "EDUCATION", "PUBLICATIONS", "SELECTED PROJECTS")]
    check(f"{tag} no duplicated sections", not dup, ", ".join(dup) or "ok")

    orphan, clipped = [], []
    for i, page in enumerate(doc):
        blocks = [b for b in page.get_text("blocks") if b[6] == 0 and "Page " not in b[4] and "umor2026@gmail.com  ·" not in b[4]]
        body = [b for b in blocks if b[3] < page.rect.height - 14 * 72 / 25.4]
        if body:
            last = flat(max(body, key=lambda b: b[3])[4]).strip()
            if last.upper() in HEADINGS:
                orphan.append(f"p{i+1}: {last}")
        for b in page.get_text("blocks"):
            if b[0] < MARGIN - 1.5 or b[2] > page.rect.width - MARGIN + 1.5 or b[1] < 0 or b[3] > page.rect.height:
                clipped.append(f"p{i+1}: {flat(b[4])[:30]}")
    check(f"{tag} no orphan headings", not orphan, ", ".join(orphan) or "ok")
    check(f"{tag} no clipped/overflowing text", not clipped, ", ".join(clipped) or "ok")

    uris = [l.get("uri", "") for p in doc for l in p.get_links() if l.get("uri")]
    expected = ["mailto:" + c.EMAIL, "tel:" + c.PHONE_E164, c.GITHUB_URL, c.PORTFOLIO_URL] + [c.PROJECTS[k]["link"][1] for k in EXPECT[key]["links"]]
    missing = [u for u in expected if not any(x.rstrip("/") == u.rstrip("/") for x in uris)]
    unknown = [u for u in uris if not any(u.rstrip("/") == a.rstrip("/") for a in ALLOWED_LINK_PREFIXES)]
    check(f"{tag} clickable links present ({len(uris)}) and all known", not missing and not unknown, f"missing {missing} unknown {unknown}")

    sizes = []
    for p in doc:
        for b in p.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                for s in l["spans"]:
                    if s["text"].strip() and "Page " not in s["text"] and "  ·  umor" not in s["text"]:
                        sizes.append(round(s["size"], 1))
    body_sizes = [s for s in sizes if s >= 9]
    check(f"{tag} readable type: smallest non-footer {min(sizes)}pt (>= 9.4)", min(sizes) >= 9.4, f"sizes {sorted(set(sizes))}")

    if key == "research":
        check(f"{tag} research metadata: dataset, models, external cohort, Grad-CAM",
              all(x in text for x in ["6,000 T1-weighted slices", "4,793", "3,064 slices from 233 patients", "EfficientNet-B0 + DenseNet121", "SegFormer + DeepLabV3+", "Grad-CAM", "timm", "torchvision", "NumPy", "Matplotlib"]))
    if key == "general":
        check(f"{tag} research kept supporting (no dataset block)", "6,000 T1-weighted slices" not in text)

failed = [r for r in results if not r[0]]
for ok, name, detail in results:
    print(("PASS" if ok else "FAIL"), " ", name, ("  — " + detail) if detail and not ok else "")
print(f"\n{len(results) - len(failed)}/{len(results)} PDF checks pass")
sys.exit(1 if failed else 0)
