import type { CSSProperties, ReactNode } from "react";
import { thesis } from "@/data/research";
import type { StageId } from "@/data/skills";

/*
 * One small animated illustration per skill stage, drawn with HTML and CSS only (styles/skills.css),
 * on a light lavender panel in the theme's pastels.
 * They are decorative (aria-hidden): every skill is also listed as real text on its card. No numbers
 * are drawn, so nothing here can be read as a result or a metric.
 */

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div aria-hidden className="viz relative isolate aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-[radial-gradient(120%_90%_at_85%_0%,#ffffff,#f3edfa_55%,#ebe2f6)] shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_18px_40px_-28px_rgb(60_40_90/0.35)] sm:aspect-[16/11] lg:aspect-[16/9.5]">
      <span className="viz-label type-micro absolute top-3 right-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-mauve-ink shadow-[0_1px_2px_rgb(60_40_90/0.08)]">
        {label}
      </span>
      {children}
    </div>
  );
}

function Node({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span
      className={`viz-node absolute flex -translate-1/2 items-center gap-1.5 rounded-lg border border-[#e2d8ef] bg-white px-2 py-1.5 text-[0.625rem] font-medium sm:px-2.5 sm:text-[0.6875rem] whitespace-nowrap text-foreground shadow-[0_8px_20px_-12px_rgb(60_40_90/0.45)] ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}

/* Build: code on the left turns into the page on the right. */
function BuildVisual() {
  const code = [
    ["w-[38%]", "bg-[#a993d6]"],
    ["w-[62%] ml-3", "bg-[#d6cbe6]"],
    ["w-[48%] ml-3", "bg-[#e3a6ca]"],
    ["w-[70%] ml-6", "bg-[#e4dcef]"],
    ["w-[34%] ml-6", "bg-[#9fb0ea]"],
    ["w-[56%] ml-3", "bg-[#d6cbe6]"],
    ["w-[28%]", "bg-[#a993d6]"],
  ];
  return (
    <Frame label="Code → Live site">
      <div className="absolute inset-x-4 top-10 bottom-4 flex flex-col overflow-hidden rounded-lg border border-[#e2d8ef] bg-white">
        <div className="flex h-6 shrink-0 items-center gap-1 border-b border-[#eee7f6] px-2.5">
          <i className="size-1.5 rounded-full bg-[#f0bfdc]" />
          <i className="size-1.5 rounded-full bg-[#c9b8ec]" />
          <i className="size-1.5 rounded-full bg-[#b9c6f5]" />
          <span className="mx-auto h-2.5 w-1/3 rounded-full bg-[#f1ebf8]" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-2 border-r border-[#eee7f6] p-3">
            {code.map(([width, color], index) => (
              <span key={index} className={`viz-type h-1.5 rounded-full ${width} ${color}`} style={delay(index * 0.35)} />
            ))}
            <span className="viz-caret h-2.5 w-0.5 bg-accent" />
          </div>
          <div className="flex flex-col gap-2 p-3">
            <span className="viz-build h-[34%] rounded-md bg-[linear-gradient(135deg,#7e64a8,#c9b8ec)]" style={delay(0.6)} />
            <span className="viz-build h-1.5 w-2/3 rounded-full bg-[#cfc2e3]" style={delay(1.1)} />
            <span className="viz-build h-1.5 w-1/2 rounded-full bg-[#e4dcef]" style={delay(1.4)} />
            <div className="mt-auto grid grid-cols-3 gap-1.5">
              {[1.8, 2.1, 2.4].map((d) => (
                <span key={d} className="viz-build aspect-square rounded-md bg-[#efe8f8]" style={delay(d)} />
              ))}
            </div>
            <span className="viz-build h-3 w-1/3 rounded-full bg-accent" style={delay(2.8)} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* Grow: search, social and ads all flow into one landing page, then a customer. */
function GrowVisual() {
  const sources = [
    { label: "Google search", y: 22 },
    { label: "Meta ads", y: 50 },
    { label: "Social & SEO", y: 78 },
  ];
  return (
    <Frame label="Audience → Customer">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {sources.map((source, index) => (
          <path
            key={source.label}
            d={`M31 ${source.y} C 44 ${source.y}, 46 50, 52 50`}
            className="viz-flow"
            style={delay(index * 0.4)}
          />
        ))}
        <path d="M68 50 L 80 50" className="viz-flow" style={delay(1.4)} />
        <path d="M6 94 C 30 92, 46 80, 62 66 S 88 40, 96 30" className="viz-curve" />
      </svg>
      {sources.map((source, index) => (
        <Node key={source.label} style={{ left: "19%", top: `${source.y}%`, ...delay(index * 0.4) }} className="viz-pop">
          <i className="size-1.5 rounded-full bg-[#d77fb3]" />
          {source.label}
        </Node>
      ))}
      <Node style={{ left: "60%", top: "50%", ...delay(1.2) }} className="viz-pop flex-col !gap-1 !px-3 !py-2.5">
        <span className="h-5 w-12 rounded-sm bg-[linear-gradient(135deg,#7e64a8,#c9b8ec)]" />
        <span className="h-1 w-10 rounded-full bg-[#d6cbe6]" />
        Landing page
      </Node>
      <span
        className="viz-pop absolute top-1/2 left-[86%] grid size-10 -translate-1/2 place-items-center rounded-full bg-accent text-[0.625rem] font-semibold text-white shadow-[0_0_0_6px_rgb(120_96_154/0.15)]"
        style={delay(1.8)}
      >
        ✓
      </span>
      <span className="type-micro absolute top-[63%] left-[86%] -translate-x-1/2 text-mauve-ink">Customer</span>
    </Frame>
  );
}

/* Automate: a trigger runs through Apps Script into a sheet and sends a notification. */
function AutomateVisual() {
  const steps = [
    { label: "Form / QR scan", icon: "◎" },
    { label: "Apps Script", icon: "{ }" },
    { label: "Google Sheet", icon: "▦" },
    { label: "Notify team", icon: "✉" },
  ];
  return (
    <Frame label="Manual → Automated">
      <div className="absolute inset-x-[13%] top-[46%] h-px bg-[#d6cbe6]">
        <span className="viz-runner absolute top-1/2 size-2.5 -translate-1/2 rounded-full bg-[#d77fb3] shadow-[0_0_14px_4px_rgb(215_127_179/0.45)]" />
      </div>
      {steps.map((step, index) => (
        <div
          key={step.label}
          className="absolute top-[46%] flex -translate-1/2 flex-col items-center gap-2"
          style={{ left: `${13 + index * (74 / 3)}%` }}
        >
          <span
            className="viz-step grid size-11 place-items-center rounded-xl border border-[#e2d8ef] bg-white font-mono text-sm text-accent-strong shadow-[0_8px_20px_-12px_rgb(60_40_90/0.45)]"
            style={delay(index * 1)}
          >
            {step.icon}
          </span>
          <span className="text-[0.625rem] font-medium whitespace-nowrap text-muted">{step.label}</span>
        </div>
      ))}
      <div className="absolute inset-x-[8%] bottom-[12%] flex items-center justify-between gap-3 text-[0.6875rem]">
        <span className="rounded-full bg-white/80 px-3 py-1.5 text-subtle line-through decoration-[#d77fb3]">Paper register</span>
        <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgb(120_96_154/0.35),transparent)]" />
        <span className="rounded-full bg-accent px-3 py-1.5 text-white">Runs by itself</span>
      </div>
    </Frame>
  );
}

/* Create: a photo framed on the rule of thirds, layered design, and an edit timeline. */
function CreateVisual() {
  const tracks = [
    [["4%", "30%", "bg-[#a993d6]"], ["38%", "24%", "bg-[#a993d6]"], ["66%", "28%", "bg-[#a993d6]"]],
    [["10%", "40%", "bg-[#e3a6ca]"], ["56%", "34%", "bg-[#e3a6ca]"]],
    [["4%", "88%", "bg-[#9fb0ea]/80"]],
  ];
  return (
    <Frame label="Video · Photo · Design">
      <div className="absolute inset-x-4 top-10 grid h-[50%] grid-cols-[1.3fr_1fr] gap-3">
        <div className="relative overflow-hidden rounded-lg bg-[radial-gradient(circle_at_66%_40%,#fde4f1,#cdb9ec_45%,#9b82c8)]">
          <span className="absolute inset-y-0 left-1/3 w-px bg-white/25" />
          <span className="absolute inset-y-0 left-2/3 w-px bg-white/25" />
          <span className="absolute inset-x-0 top-1/3 h-px bg-white/25" />
          <span className="absolute inset-x-0 top-2/3 h-px bg-white/25" />
          <span className="viz-focus absolute top-1/3 left-2/3 size-7 -translate-1/2 border-2 border-white/90" />
        </div>
        <div className="relative">
          <span className="viz-layer absolute inset-[14%_6%_6%_14%] rounded-md bg-[#b9c6f5]/40" style={delay(0)} />
          <span className="viz-layer absolute inset-[8%_10%_12%_8%] rounded-md bg-[#f0bfdc]/60" style={delay(0.3)} />
          <span className="viz-layer absolute inset-[2%_14%_18%_2%] flex flex-col gap-1 rounded-md bg-[#efe8f8] p-2" style={delay(0.6)}>
            <span className="h-1.5 w-2/3 rounded-full bg-[#56406f]" />
            <span className="h-1 w-1/2 rounded-full bg-[#56406f]/40" />
            <span className="mt-auto h-3 w-1/2 rounded-full bg-[#78609a]" />
          </span>
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex h-[30%] flex-col justify-center gap-1.5 rounded-lg border border-[#e2d8ef] bg-white px-2">
        {tracks.map((track, row) => (
          <div key={row} className="relative h-2.5">
            {track.map(([left, width, color]) => (
              <span key={left} className={`absolute inset-y-0 rounded-sm ${color}`} style={{ left, width }} />
            ))}
          </div>
        ))}
        <span className="viz-playhead absolute inset-y-1.5 w-0.5 rounded-full bg-accent-strong shadow-[0_0_8px_1px_rgb(86_64_111/0.35)]" />
      </div>
    </Frame>
  );
}

/* Research: an MRI slice through the models to a class, a tumour mask and a Grad-CAM map. */
function ResearchVisual() {
  const classes = thesis.dataset?.classes ?? [];
  const models = thesis.stages?.find((stage) => stage.stage === "classification")?.models ?? [];
  return (
    <Frame label="MRI → Explainable AI">
      <div className="absolute inset-x-4 top-9 bottom-14 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="relative mx-auto aspect-square w-[82%]">
          <span className="absolute inset-0 rounded-[46%_54%_50%_50%] bg-[radial-gradient(circle_at_50%_45%,#f1ecf6,#bdb2cd_50%,#8a7e9d_74%)]" />
          <span className="absolute inset-[18%] rounded-[50%] border border-white/60" />
          <span className="viz-scan absolute inset-x-0 h-[2px] bg-accent shadow-[0_0_10px_2px_rgb(120_96_154/0.45)]" />
          <span className="type-micro absolute -bottom-5 left-1/2 -translate-x-1/2 text-mauve-ink">Input</span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          {models.map((model, index) => (
            <span
              key={model}
              className="viz-pop rounded-md border border-[#e2d8ef] bg-white px-2 py-1 text-[0.625rem] font-medium whitespace-nowrap text-foreground shadow-[0_6px_16px_-10px_rgb(60_40_90/0.45)]"
              style={delay(0.5 + index * 0.3)}
            >
              {model}
            </span>
          ))}
          <span className="text-accent-soft">→</span>
        </div>

        <div className="relative mx-auto aspect-square w-[82%]">
          <span className="absolute inset-0 rounded-[46%_54%_50%_50%] bg-[radial-gradient(circle_at_50%_45%,#f1ecf6,#bdb2cd_50%,#8a7e9d_74%)]" />
          <span className="viz-heat absolute inset-[8%] rounded-[50%] bg-[radial-gradient(circle_at_62%_38%,rgb(255_200_120/0.95),rgb(240_120_160/0.7)_22%,rgb(120_96_154/0.35)_42%,transparent_62%)] opacity-90" />
          <span className="viz-mask absolute top-[28%] left-[52%] size-[22%] rounded-[45%_55%_60%_40%] border-2 border-white bg-white/30" />
          <span className="type-micro absolute -bottom-5 left-1/2 -translate-x-1/2 text-mauve-ink">Grad-CAM</span>
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-3 flex flex-wrap justify-center gap-1">
        {classes.map((name, index) => (
          <span
            key={name}
            className={
              index === 0
                ? "viz-pick rounded-full bg-accent px-2 py-0.5 text-[0.5625rem] font-semibold text-white"
                : "rounded-full bg-white/85 px-2 py-0.5 text-[0.5625rem] text-muted"
            }
          >
            {name}
          </span>
        ))}
      </div>
    </Frame>
  );
}

const visuals: Record<StageId, () => ReactNode> = {
  build: BuildVisual,
  grow: GrowVisual,
  automate: AutomateVisual,
  create: CreateVisual,
  research: ResearchVisual,
};

export function SkillVisual({ stage }: { stage: StageId }) {
  const Visual = visuals[stage];
  return <Visual />;
}
