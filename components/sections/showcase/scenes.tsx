import type { ReactNode } from "react";
import { creativeNotes, type SceneId } from "@/data/skills";
import { Drawing, type DrawingId } from "./drawings";
import { Lines, Node, Plane, Pulse, vars } from "./scene-kit";

/**
 * One scene per skill, all drawn in the same world box (percent coordinates, see scene-kit.tsx).
 * Phones use the `m` coordinates, a portrait arrangement. Everything here is decorative: the stage
 * is aria-hidden and the same names are real text in the showcase's index.
 */

/* ───────────── WEB DEVELOPMENT: a browser frame becomes a deployed product ───────────── */

const buildStages = [
  { x: 12, my: 12, label: "Browser Frame", d: 0.04, draw: "browser", z: 70, r: 16 },
  { x: 31, my: 30, label: "Responsive Interface", d: 0.16, draw: "devices", z: 35, r: 10 },
  { x: 50, my: 48, label: "Frontend", d: 0.28, draw: "code", z: 0, r: 0 },
  { x: 69, my: 66, label: "Data / Systems", d: 0.4, draw: "stack", z: -35, r: -10 },
  { x: 88, my: 84, label: "Deploy", d: 0.52, draw: "deploy", z: -70, r: -16 },
] as const satisfies readonly { x: number; my: number; label: string; d: number; draw: DrawingId; z: number; r: number }[];

const buildTech = ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "Git", "GitHub"] as const;
const buildTechX = [21, 29, 40, 52, 64, 78, 87] as const;

function WebScene() {
  return (
    <>
      <Lines
        paths={[
          { d: "M12 66 L88 66", from: 0.04, speed: 2 },
          { d: "M12 66 L12 54 M31 66 L31 54 M50 66 L50 54 M69 66 L69 54 M88 66 L88 54", from: 0.1, soft: true },
        ]}
        mobile={[{ d: "M33 12 L33 84", from: 0.04, speed: 1.6 }]}
      />
      {buildStages.map((stage) => (
        <Plane key={stage.label} x={stage.x} y={38} w={16} z={stage.z} r={stage.r} d={stage.d} m={{ x: 14, y: stage.my, w: 20 }}>
          <Drawing id={stage.draw} />
        </Plane>
      ))}
      {buildStages.map((stage) => (
        <Node key={stage.label} x={stage.x} y={69} d={stage.d} kind="stage" m={{ x: 54, y: stage.my }}>
          {stage.label}
        </Node>
      ))}
      {buildTech.map((tech, index) => (
        <Node key={tech} x={buildTechX[index] ?? 50} y={90} d={0.5 + index * 0.05} m={{ x: 86, y: 12 + index * 12 }}>
          {tech}
        </Node>
      ))}
    </>
  );
}

/* ───────────── DIGITAL MARKETING: one connected growth network ───────────── */

function MarketingScene() {
  return (
    <>
      <span className="ring m-hide" style={vars({ "--size": 30, "--x": 58, "--y": 50, "--d": 0.1 })} />
      <span className="ring m-hide" style={vars({ "--size": 50, "--x": 58, "--y": 50, "--d": 0.2 })} />
      <Lines
        paths={[
          { d: "M11 22 L33 50", from: 0.05 },
          { d: "M11 78 L33 50", from: 0.1 },
          { d: "M33 50 L58 50", from: 0.22 },
          { d: "M58 8 L58 28 L58 50", from: 0.28 },
          { d: "M58 50 L89 28", from: 0.4 },
          { d: "M58 50 L89 72", from: 0.46 },
          { d: "M58 50 L58 90", from: 0.52 },
        ]}
        mobile={[
          { d: "M24 9 L50 26", from: 0.05 },
          { d: "M76 9 L50 26", from: 0.08 },
          { d: "M50 26 L50 47", from: 0.2 },
          { d: "M50 47 L33 57 L16 70", from: 0.3 },
          { d: "M50 47 L84 70", from: 0.4 },
          { d: "M50 47 L70 90", from: 0.46 },
          { d: "M50 47 L30 90", from: 0.52 },
        ]}
      />
      <Node x={58} y={50} z={50} d={0.12} kind="core" m={{ x: 50, y: 47 }}>
        Digital Growth
      </Node>
      <Node x={11} y={22} z={20} d={0.04} kind="stage" m={{ x: 24, y: 9 }}>
        Meta Ads
      </Node>
      <Node x={11} y={78} z={20} d={0.08} kind="stage" m={{ x: 76, y: 9 }}>
        Google Ads
      </Node>
      <Node x={33} y={50} z={30} d={0.2} kind="stage" sub="setup & management" m={{ x: 50, y: 26 }}>
        Campaigns
      </Node>
      <Node x={58} y={8} z={10} d={0.26} kind="stage" m={{ x: 16, y: 70 }}>
        SEO
      </Node>
      <Node x={58} y={28} z={30} d={0.32} m={{ x: 33, y: 57 }}>
        Search
      </Node>
      <Node x={89} y={28} z={20} d={0.42} kind="stage" m={{ x: 84, y: 70 }}>
        Social Media
      </Node>
      <Node x={89} y={72} z={20} d={0.48} kind="stage" m={{ x: 70, y: 90 }}>
        Content
      </Node>
      <Node x={58} y={90} z={10} d={0.54} kind="stage" sub="digital presence" m={{ x: 30, y: 90 }}>
        Brand
      </Node>
    </>
  );
}

/* ───────────── Flows: Meta Ads, Google Ads, AI automation, business automation ───────────── */

type Step = { label: string; draw: DrawingId };

function FlowScene({ title, steps, tags = [] }: { title: string; steps: readonly Step[]; tags?: readonly string[] }) {
  const count = steps.length;
  const xs = count === 3 ? [20, 50, 80] : [14, 38, 62, 86];
  const width = count === 3 ? 22 : 17;
  const my = count === 3 ? [18, 50, 82] : [14, 38, 62, 86];
  const first = xs[0] ?? 14;
  const last = xs[count - 1] ?? 86;
  const spine = `M46 ${my[0]} L46 ${my[count - 1]}`;

  return (
    <>
      <Lines
        paths={[
          { d: `M${first} 60 L${last} 60`, from: 0.04, speed: 1.6, pulse: true },
          { d: xs.map((x) => `M${x} 60 L${x} 52`).join(" "), from: 0.1, soft: true },
        ]}
        mobile={[{ d: spine, from: 0.04, speed: 1.6, pulse: true }]}
      />
      {steps.map((step, index) => (
        <Plane
          key={step.label}
          x={xs[index] ?? 50}
          y={34}
          w={width}
          z={40 - index * 24}
          r={14 - index * 8}
          d={0.04 + index * 0.16}
          m={{ x: 22, y: my[index] ?? 50, w: 26 }}
        >
          <Drawing id={step.draw} />
        </Plane>
      ))}
      {steps.map((step, index) => (
        <Node
          key={step.label}
          x={xs[index] ?? 50}
          y={64}
          d={0.08 + index * 0.16}
          kind="stage"
          m={{ x: 68, y: my[index] ?? 50 }}
        >
          {step.label}
        </Node>
      ))}
      <Node x={50} y={10} z={40} d={0.6} kind="core" m={false}>
        {title}
      </Node>
      {tags.map((tag, index) => (
        <Node key={tag} x={tags.length === 1 ? 50 : 30 + index * 40} y={88} d={0.7 + index * 0.05} m={false}>
          {tag}
        </Node>
      ))}
      <Pulse />
    </>
  );
}

const metaSteps: readonly Step[] = [
  { label: "Audience", draw: "audience" },
  { label: "Campaign", draw: "target" },
  { label: "Creative", draw: "creative" },
  { label: "Landing", draw: "landing" },
];

const googleSteps: readonly Step[] = [
  { label: "Search Query", draw: "search" },
  { label: "Ad", draw: "ad" },
  { label: "Landing Page", draw: "landing" },
];

const aiSteps: readonly Step[] = [
  { label: "Input", draw: "input" },
  { label: "AI", draw: "ai" },
  { label: "Workflow", draw: "flow" },
  { label: "Output", draw: "result" },
];

const businessSteps: readonly Step[] = [
  { label: "Manual Task", draw: "checklist" },
  { label: "Google Apps Script", draw: "code" },
  { label: "Google Sheets", draw: "sheets" },
  { label: "Automated System", draw: "loop" },
];

/* ───────────── Single-subject scenes: video, photography, design ───────────── */

function FocusScene({ draw, label, tags, wide = false }: { draw: DrawingId; label: string; tags: readonly string[]; wide?: boolean }) {
  return (
    <>
      <Lines
        paths={[
          { d: "M16 38 L30 46", from: 0.5, soft: true },
          { d: "M84 56 L70 50", from: 0.55, soft: true },
        ]}
        mobile={[]}
      />
      <Plane x={50} y={46} w={wide ? 58 : 48} z={50} r={-5} d={0.02} m={{ x: 50, y: 44, w: 86 }} className="pl-hero">
        <Drawing id={draw} />
      </Plane>
      <Node x={50} y={88} d={0.3} kind="stage" m={{ x: 50, y: 90 }}>
        {label}
      </Node>
      {tags.map((tag, index) => (
        <Node key={tag} x={index === 0 ? 13 : 87} y={index === 0 ? 34 : 60} z={20} d={0.5 + index * 0.1} m={false}>
          {tag}
        </Node>
      ))}
    </>
  );
}

/* ───────────── CREATE: video, photography and design on one canvas ───────────── */

const supporting = [
  { id: "word", label: "Microsoft Word", x: 28, draw: "word" },
  { id: "excel", label: "Microsoft Excel", x: 50, draw: "excel" },
  { id: "workspace", label: "Google Workspace", x: 72, draw: "workspace" },
] as const satisfies readonly { id: string; label: string; x: number; draw: DrawingId }[];

function CreateScene() {
  return (
    <>
      <Lines
        paths={[
          { d: "M17 38 L50 30", from: 0.1, soft: true },
          { d: "M83 38 L50 30", from: 0.14, soft: true },
          { d: "M28 78 L50 66 L72 78", from: 0.5, soft: true },
        ]}
        mobile={[]}
      />
      <Plane x={17} y={36} w={24} z={50} r={14} d={0.04} m={{ x: 28, y: 50, w: 42 }} className="pl-tool">
        <Drawing id="photo" />
        <span className="pl-label">Photography</span>
        <span className="pl-note">{creativeNotes.photography}</span>
      </Plane>
      <Plane x={50} y={28} w={32} z={20} r={0} d={0.0} m={{ x: 50, y: 22, w: 66 }} className="pl-tool">
        <Drawing id="video" />
        <span className="pl-label">Video Editing</span>
        <span className="pl-note">{creativeNotes.video}</span>
      </Plane>
      <Plane x={83} y={36} w={24} z={50} r={-14} d={0.1} m={{ x: 72, y: 50, w: 42 }} className="pl-tool">
        <Drawing id="canva" />
        <span className="pl-label">Visual Design / Canva</span>
        <span className="pl-note">{creativeNotes.canva}</span>
      </Plane>
      <Node x={50} y={64} d={0.4} kind="core" m={{ x: 50, y: 72 }}>
        Create
      </Node>
      {supporting.map((tool, index) => (
        <Plane
          key={tool.id}
          x={tool.x}
          y={86}
          w={18}
          z={10}
          r={0}
          d={0.5 + index * 0.1}
          m={{ x: 22 + index * 28, y: 90, w: 24 }}
          className="pl-tool pl-small"
        >
          <Drawing id={tool.draw} />
          <span className="pl-label">{tool.label}</span>
          <span className="pl-note">{creativeNotes[tool.id]}</span>
        </Plane>
      ))}
    </>
  );
}

/* ───────────── RESEARCH: a spatial pipeline of slices ───────────── */

const researchPlanes = [
  { x: 12, my: 12, z: 90, r: -20, label: "Data", d: 0.04, draw: "data" },
  { x: 31, my: 30, z: 45, r: -14, label: "Model", d: 0.16, draw: "model" },
  { x: 50, my: 48, z: 0, r: -8, label: "Prediction", d: 0.28, draw: "classify" },
  { x: 69, my: 66, z: -45, r: -2, label: "Segmentation", d: 0.4, draw: "segment" },
  { x: 88, my: 84, z: -90, r: 4, label: "Explainability", d: 0.52, draw: "explain" },
] as const satisfies readonly { x: number; my: number; z: number; r: number; label: string; d: number; draw: DrawingId }[];

const researchTags = ["Python", "PyTorch", "Computer Vision", "Deep Learning", "Medical Imaging"] as const;
const researchTagX = [12, 26, 42, 60, 77] as const;

function ResearchScene() {
  return (
    <>
      <Lines
        paths={[{ d: "M12 46 L31 46 L50 46 L69 46 L88 46", from: 0.04, speed: 1.6, pulse: true }]}
        mobile={[{ d: "M20 12 L20 84", from: 0.04, speed: 1.6, pulse: true }]}
      />
      {researchPlanes.map((plane) => (
        <Plane key={plane.label} x={plane.x} y={46} w={15} z={plane.z} r={plane.r} d={plane.d} m={{ x: 20, y: plane.my, w: 20 }}>
          <Drawing id={plane.draw} />
        </Plane>
      ))}
      {researchPlanes.map((plane) => (
        <Node key={plane.label} x={plane.x} y={78} z={plane.z} d={plane.d + 0.04} kind="stage" m={{ x: 56, y: plane.my }}>
          {plane.label}
        </Node>
      ))}
      {researchTags.map((tag, index) => (
        <Node key={tag} x={researchTagX[index] ?? 50} y={10} d={0.5 + index * 0.05} m={{ x: 87, y: 14 + index * 14 }}>
          {tag}
        </Node>
      ))}
      <Node x={88} y={22} z={-90} d={0.72} m={{ x: 82, y: 94 }}>
        Grad-CAM
      </Node>
      <Pulse />
    </>
  );
}

/* ───────────── registry ───────────── */

const scenes: Record<SceneId, () => ReactNode> = {
  web: WebScene,
  marketing: MarketingScene,
  meta: () => <FlowScene title="Meta / Facebook Ads" steps={metaSteps} />,
  google: () => <FlowScene title="Google Ads" steps={googleSteps} />,
  "ai-automation": () => <FlowScene title="AI Automation" steps={aiSteps} tags={["Workflow Automation"]} />,
  video: () => <FocusScene draw="video" label="Video Editing" tags={["Short-form", "Promotional"]} wide />,
  photography: () => <FocusScene draw="photo" label="Photography" tags={["Composition", "Focus"]} />,
  design: () => <FocusScene draw="canva" label="Visual Design / Canva" tags={["Content design", "Canva"]} />,
  business: () => (
    <FlowScene title="Business Automation" steps={businessSteps} tags={["Internal Tools", "Workflow Digitization"]} />
  ),
  research: ResearchScene,
  create: CreateScene,
};

export function SceneView({ id }: { id: SceneId }) {
  const Scene = scenes[id];
  return <>{Scene()}</>;
}
