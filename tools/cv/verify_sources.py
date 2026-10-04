"""Cross-check CV content against the website's centralized data (data/*.ts).

    python tools/cv/verify_sources.py
"""

import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import content as c  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
read = lambda name: open(os.path.join(ROOT, "data", name), encoding="utf-8").read()

profile, experience, education = read("profile.ts"), read("experience.ts"), read("education.ts")
research, projects, skills, socials = read("research.ts"), read("projects.ts"), read("skills.ts"), read("socials.ts")
site = open(os.path.join(ROOT, "lib", "site.ts"), encoding="utf-8").read()

results = []


def check(name, ok, detail=""):
    results.append((ok, name, detail))


def has(source, value):
    return value in source


check("name", has(profile, f'name: "{c.NAME}"'))
check("email", has(profile, f'email: "{c.EMAIL}"'))
check("phone display + e164", has(profile, f'display: "{c.PHONE_DISPLAY}"') and has(profile, f'e164: "{c.PHONE_E164}"'))
city, country = c.LOCATION.split(", ")
check("location", has(profile, f'city: "{city}"') and has(profile, f'country: "{country}"'))
check("github url", has(socials, c.GITHUB_URL) and has(socials, f'handle: "{c.GITHUB_HANDLE}"'))
check("portfolio url configured", has(site, c.PORTFOLIO_URL))
check("professional titles", all(t in profile for t in ["Web Developer", "Digital Marketer", "AI / Computer Vision Researcher"]))

check("Midtown role/org, current, no start date",
      has(experience, f'role: "{c.MIDTOWN["role"]}"') and has(experience, f'name: "{c.MIDTOWN["org"]}"')
      and re.search(r'midtownAabashon = \{[\s\S]*?period: \{ end: "present" \}', experience) is not None)
check("Trip Fly role + Mar–Aug 2026",
      has(experience, f'role: "{c.TRIP_FLY["role"]}"') and has(experience, 'period: { start: "2026-03", end: "2026-08" }'))
check("Independent entry is unlisted (not a CV role)", re.search(r'id: "independent"[\s\S]*?listed: false', experience) is not None)

check("degree + institution + CGPA + completed 2026",
      has(education, 'qualification: "B.Sc. in Computer Science & Engineering"')
      and has(education, "Bangladesh University of Business and Technology (BUBT)")
      and has(education, "CGPA 3.24 / 4.00") and has(education, 'completed: "2026-07"'))
check("HSC data", has(education, "Kharrah Adarsha Degree Honours College") and has(education, "GPA 4.58 / 5.00") and has(education, 'completed: "2021"'))
check("SSC data", has(education, "Churain Tarini Bama High School") and has(education, "GPA 4.17 / 5.00") and has(education, 'completed: "2019"'))
check("activities", all(has(education, t) for t in ["BUBT ICPC 2025", "BIUPC Programming Contest", "BUBT Innovtex Hackathon", "Contest participant", "Event volunteer"]))

check("thesis title (exact)", has(research, c.THESIS_TITLE.split(":")[0]) and has(research, "Statistically Validated Hybrid Deep Learning Framework for Brain Tumor MRI Classification and Segmentation on BRISC2025 with Explainable AI"))
check("accepted paper: IEEE", re.search(r'status: "accepted",\s*publisher: "IEEE"', research) is not None)
check("Smart First Aid Box: submitted, ICCIT", re.search(r'title: "Smart First Aid Box"[\s\S]*?status: "submitted",\s*venue: "ICCIT"', research) is not None)
check("model pairs + Grad-CAM", all(has(research, m) for m in ["EfficientNet-B0", "DenseNet121", "SegFormer", "DeepLabV3+", "Grad-CAM"]))
check("dataset numbers", has(research, "slices: 6000") and has(research, "pixelMasks: 4793") and has(research, "slices: 3064") and has(research, "patients: 233"))

check("TRM url + live", has(projects, c.PROJECTS["trm"]["link"][1]) and re.search(r'slug: "trm-holidays"[\s\S]*?status: "live"', projects) is not None)
check("FMZ is launching-soon (not live)", re.search(r'slug: "fmz-trading"[\s\S]*?status: "launching-soon"', projects) is not None)
check("project urls", all(has(projects, c.PROJECTS[k]["link"][1]) for k in ("midtown", "attendance", "fmz", "rover")))

web_skills = ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "Responsive web development"]
check("skills present in data/skills.ts", all(has(skills, s) for s in web_skills + ["Google Apps Script", "Digital Marketing", "SEO", "Digital Presence", "Business Automation", "Workflow Automation", "Python", "PyTorch", "OpenCV", "scikit-learn", "Deep Learning", "Computer Vision", "Medical Imaging", "Classification", "Segmentation", "Explainable AI"]))
check("tools present in data/skills.ts", all(has(skills, t) for t in ["Git", "GitHub", "GitHub Pages", "VS Code", "Google Workspace", "Canva", "Microsoft Word", "Microsoft Excel", "Sabre GDS", "Kaggle", "Overleaf"]))

failed = [r for r in results if not r[0]]
for ok, name, detail in results:
    print(("PASS" if ok else "FAIL"), " ", name, detail)
print(f"\n{len(results) - len(failed)}/{len(results)} source checks pass")
sys.exit(1 if failed else 0)
