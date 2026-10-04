"""Single source of CV content. Every value mirrors the portfolio's verified data
(data/profile.ts, experience.ts, projects.ts, research.ts, education.ts, skills.ts).
`python tools/cv/verify_sources.py` cross-checks the key values against those files.
"""

NAME = "Omar Faruk"
HEADLINE = "Web Developer · Digital Marketer · AI / Computer Vision Researcher"

EMAIL = "umor2026@gmail.com"
PHONE_DISPLAY = "+880 1705-182933"
PHONE_E164 = "+8801705182933"
LOCATION = "Dhaka, Bangladesh"
GITHUB_HANDLE = "Omaar-X"
GITHUB_URL = "https://github.com/Omaar-X"
PORTFOLIO_HOST = "omaar-x.github.io"
PORTFOLIO_URL = "https://omaar-x.github.io"

THESIS_TITLE = (
    "TumorMultiNet: A Statistically Validated Hybrid Deep Learning Framework for Brain Tumor MRI "
    "Classification and Segmentation on BRISC2025 with Explainable AI"
)

SUMMARY = {
    "general": (
        "Computer Science & Engineering graduate working across web development, digital marketing, business "
        "systems and applied AI research. Experience includes commercial websites, travel operations, internal "
        "workflow tools and computer-vision research in brain MRI classification and segmentation. Currently "
        "Web Developer & Digital Marketer at Midtown Aabashon Ltd."
    ),
    "web": (
        "Web developer and digital marketer, currently at Midtown Aabashon Ltd., building responsive business "
        "websites and the digital presence around them. Background includes travel operations on Sabre GDS, an "
        "internal attendance system built for Trip Fly BD, and websites across travel, real estate, consultancy "
        "and trading. Computer Science & Engineering graduate with applied AI research as a supporting strength."
    ),
    "research": (
        "Computer Science & Engineering graduate (BUBT, 2026) with applied research in deep learning for medical "
        "imaging. Capstone thesis TumorMultiNet: a hybrid brain MRI classification and segmentation framework with "
        "Grad-CAM explainability, with a related paper accepted (IEEE) and a second paper submitted (ICCIT). "
        "Professional experience in web development, digital marketing and travel operations."
    ),
}

MIDTOWN = {
    "org": "Midtown Aabashon Ltd.",
    "role": "Web Developer & Digital Marketer",
    "dates": "Current",
    "place": "midtownaabashonltd.com",
    "full": [
        "Website development and digital presence for the company.",
        "Digital marketing and brand-focused online execution.",
        "Content and online communication support.",
    ],
    "short": ["Website development, digital marketing and brand-focused online execution."],
}

TRIP_FLY = {
    "org": "Trip Fly BD",
    "role": "Travel Operations & Ticketing Assistant",
    "dates": "March 2026 – August 2026",
    "place": "Dhaka, Bangladesh",
    "full": [
        "Issued and managed domestic and international air tickets using Sabre GDS.",
        "Managed booking changes, reservation queries and travel documentation.",
        "Built and maintained website sections and landing pages (HTML, CSS, JavaScript).",
        "Developed the Smart Attendance System for the team's internal attendance workflow, replacing a paper register.",
    ],
    "short": [
        "Air ticketing and reservation support on Sabre GDS; built website sections and the Smart Attendance System."
    ],
}

PROJECTS = {
    "trm": {
        "name": "TRM Holidays",
        "tag": "Live · Travel technology / business website",
        "link": ("trmholidays.com", "https://trmholidays.com/"),
        "text": "Travel agency website with tabbed flight, hotel and tour-package search, a domestic and international "
        "tour catalogue, a responsive layout and SEO foundations.",
        "tech": "HTML, CSS, JavaScript",
    },
    "midtown": {
        "name": "Midtown Aabashon Ltd.",
        "tag": "Live · Real-estate corporate website",
        "link": ("midtownaabashonltd.com", "https://midtownaabashonltd.com/"),
        "text": "Corporate website with clear property positioning, project discovery, a responsive layout and "
        "high-intent contact paths.",
        "tech": "HTML, CSS, JavaScript",
    },
    "attendance": {
        "name": "Smart Attendance System",
        "tag": "Live · Internal tool for Trip Fly BD",
        "link": ("Live app", "https://omaar-x.github.io/Tripfly-Smart-Attendance-System/"),
        "text": "Browser-based attendance system: rotating QR check-in, GPS verification, admin and employee panels, "
        "and a Google Sheets back end through Google Apps Script.",
        "tech": "HTML, CSS, JavaScript, Google Apps Script, Google Sheets",
    },
    "fmz": {
        "name": "FMZ Trading",
        "tag": "Launching soon · Corporate / business website (staging build)",
        "link": ("Staging build", "https://omaar-x.github.io/FMZ-Trading-Website-Main/"),
        "text": "Website for FM Trading F.Z.E, an interior solutions business in Ajman, UAE, with service pages, a "
        "project gallery and downloadable product catalogues.",
        "tech": "HTML, CSS, JavaScript, GitHub Pages",
    },
    "rover": {
        "name": "Rover Consultancy",
        "tag": "Live · Travel & visa services website",
        "link": ("roverconsultancy.com", "https://www.roverconsultancy.com/"),
        "text": "Website for a Dhaka travel consultancy covering visa services by destination, air tickets, hotel "
        "booking and tour packages, with schema.org structured data.",
        "tech": "HTML, CSS, JavaScript, JSON-LD",
    },
}

EDUCATION = [
    {
        "title": "B.Sc. in Computer Science & Engineering",
        "org": "Bangladesh University of Business and Technology (BUBT), Dhaka",
        "dates": "Completed 2026",
        "lines": ["CGPA 3.24 / 4.00", "Capstone thesis: TumorMultiNet (group project)"],
    },
    {
        "title": "Higher Secondary Certificate (Science)",
        "org": "Kharrah Adarsha Degree Honours College",
        "dates": "2021",
        "lines": ["GPA 4.58 / 5.00"],
    },
    {
        "title": "Secondary School Certificate (Science)",
        "org": "Churain Tarini Bama High School",
        "dates": "2019",
        "lines": ["GPA 4.17 / 5.00"],
    },
]

COURSEWORK = (
    "Data structures and algorithms, object-oriented programming, database systems, software engineering, "
    "computer networks, web technologies."
)

ACTIVITIES = [
    "BUBT ICPC 2025 (contest participant)",
    "BIUPC Programming Contest (contest participant)",
    "BUBT Innovtex Hackathon (event volunteer)",
]

LANGUAGES = "Bangla (native) · English (professional working proficiency)"

THESIS = {
    "kind": "Group capstone thesis · B.Sc. in Computer Science & Engineering · BUBT · 2026",
    "areas": "Deep learning · Computer vision · Medical imaging · Brain MRI classification · Tumor segmentation · "
    "Explainable AI",
    "models": [
        ("Classification", "EfficientNet-B0 + DenseNet121"),
        ("Segmentation", "SegFormer + DeepLabV3+"),
        ("Explainability", "Grad-CAM"),
    ],
    "data": (
        "BRISC2025: 6,000 T1-weighted slices, 4 classes (glioma, meningioma, pituitary, no tumor), 4,793 "
        "pixel-level masks. External evaluation on the Cheng cohort: 3,064 slices from 233 patients."
    ),
    "method": (
        "Seven classification backbones and six segmentation architectures compared; the best two models of each "
        "branch combined into hybrids. Results checked with McNemar's exact test, the Wilcoxon signed-rank test "
        "and 95% confidence intervals."
    ),
    "notice": "Delivered as a research prototype, not a clinical tool.",
    "brief": "Hybrid brain MRI classification and segmentation framework with Grad-CAM explainability.",
}

PUBLICATIONS = [
    {"status": "Accepted", "title": THESIS_TITLE, "venue": "IEEE"},
    {"status": "Submitted", "title": "Smart First Aid Box", "venue": "ICCIT"},
]

SKILLS = {
    "web": [
        "HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "Responsive web development",
        "Git", "GitHub", "GitHub Pages", "Google Apps Script",
    ],
    "web_short": ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "Responsive web development", "Git & GitHub"],
    "business": [
        "Digital marketing", "SEO foundations", "Digital presence", "Social content", "Business automation",
        "Workflow digitization", "Sabre GDS",
    ],
    "business_short": ["Digital marketing", "SEO foundations", "Business automation", "Workflow digitization", "Sabre GDS"],
    "research": [
        "Python", "PyTorch", "OpenCV", "scikit-learn", "Deep learning", "Computer vision", "Medical image analysis",
        "Image classification", "Segmentation", "Explainable AI", "Research writing",
    ],
    "research_short": ["Python", "PyTorch", "OpenCV", "Deep learning", "Computer vision", "Explainable AI"],
    "research_extra": [
        "timm", "torchvision", "NumPy", "Matplotlib",
        "Statistical validation (McNemar, Wilcoxon, confidence intervals)",
    ],
    "tools": [
        "VS Code", "GitHub", "Google Workspace", "Google Sheets", "Canva", "Microsoft Word", "Microsoft Excel",
        "Kaggle", "Overleaf", "Sabre GDS",
    ],
    "tools_short": ["GitHub", "Google Workspace", "Canva", "Microsoft Word & Excel"],
    "tools_research": ["Kaggle (Tesla T4 GPU)", "Overleaf", "GitHub", "VS Code", "Microsoft Word & Excel"],
}

VARIANTS = {
    "general": {"file": "Omar-Faruk-General-CV.pdf", "title": "Omar Faruk — General CV", "label": "General CV"},
    "web": {"file": "Omar-Faruk-Web-Digital-CV.pdf", "title": "Omar Faruk — Web & Digital CV", "label": "Web & Digital CV"},
    "research": {"file": "Omar-Faruk-Research-CV.pdf", "title": "Omar Faruk — Research CV", "label": "Research CV"},
}
