"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Container } from "@/components/layout/container";
import {
  autoSequence,
  createScene,
  showcaseSkills,
  showcaseStages,
  type SceneId,
  type ShowcaseId,
  type StageId,
} from "@/data/skills";
import { SceneView } from "./scenes";
import { StaticOverview } from "./static-overview";

/**
 * The opening creative skill showcase.
 *
 * One visual stage, one set of scene drawings, three ways to move through it:
 *  - Automatically, every few seconds, until the visitor does anything at all.
 *  - By hand: the skill index (a real tablist), or swiping on phones.
 *  - By scrolling: on tablets and desktops the stage pins for a short stretch (about two screens)
 *    and scroll position steps through Build → Grow → Automate → Create → Research, then releases
 *    straight into My Work. Nothing intercepts the wheel; this is native sticky positioning.
 *
 * Reduced motion shows a single static composition instead (CSS hides the live parts and this
 * component starts no timers).
 */

const AUTO_MS = 3000;
const BUILD_MS = 1500;
const SETTLE_MS = 1500;
const STAGE_COUNT = showcaseStages.length;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const pad = (value: number) => String(value).padStart(2, "0");
const easeOut = (t: number) => 1 - (1 - t) ** 3;

function stageOf(id: SceneId): StageId {
  if (id === "create") return "create";
  return showcaseSkills.find((skill) => skill.id === id)?.stage ?? "build";
}

function copyFor(id: SceneId) {
  if (id === "create") {
    return { name: createScene.name, description: createScene.description, skills: createScene.skills as readonly string[] };
  }
  const skill = showcaseSkills.find((candidate) => candidate.id === id) ?? showcaseSkills[0]!;
  return { name: skill.name, description: skill.description, skills: skill.skills };
}

/** Distance between two neighbouring slides (slide width plus gap). */
function slideStride(row: HTMLElement) {
  const [first, second] = [row.children[0], row.children[1]] as (HTMLElement | undefined)[];
  return first && second ? second.offsetLeft - first.offsetLeft : (first?.offsetWidth ?? 1);
}

function tweenBuild(element: HTMLElement | null, from: number, to: number, ms: number, token: { current: number }) {
  if (!element) return;
  cancelAnimationFrame(token.current);
  const start = performance.now();
  const step = (now: number) => {
    const t = clamp((now - start) / ms);
    element.style.setProperty("--build", String(from + (to - from) * easeOut(t)));
    if (t < 1) token.current = requestAnimationFrame(step);
  };
  token.current = requestAnimationFrame(step);
}

export function CreativeShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tween = useRef(0);
  const cancelTween = useCallback(() => cancelAnimationFrame(tween.current), []);

  const [active, setActive] = useState<SceneId>("web");
  const [leaving, setLeaving] = useState<SceneId | null>(null);
  const [mode, setMode] = useState<"auto" | "user">("auto");
  const [intro, setIntro] = useState(true);

  const activeRef = useRef<SceneId>("web");
  const modeRef = useRef<"auto" | "user">("auto");
  const visibleRef = useRef(false);
  const reducedRef = useRef(false);
  const scrollDriven = useRef(false);
  const override = useRef(false);
  /* Stage 0 (Build) is the scene the page opens on, so reaching the pin never overrides a scene the visitor picked. */
  const lastStage = useRef(0);
  const leaveTimer = useRef(0);

  // Phones: which slide is current, and which are drawn (only neighbours, to keep the DOM small).
  const mobileTrack = useRef<HTMLUListElement>(null);
  const mobileWorlds = useRef<(HTMLDivElement | null)[]>([]);
  const [slide, setSlide] = useState(0);
  const slideRef = useRef(0);

  const show = useCallback((id: SceneId) => {
    if (activeRef.current === id) return;
    const previous = activeRef.current;
    activeRef.current = id;
    setIntro(false);
    setLeaving(previous);
    setActive(id);
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setLeaving(null), 420);
  }, []);

  const takeover = useCallback(() => {
    if (modeRef.current === "user") return;
    modeRef.current = "user";
    setMode("user");
  }, []);

  /* A new scene builds itself in, unless scroll is drawing it. */
  const firstScene = useRef(true);
  useEffect(() => {
    if (firstScene.current) {
      firstScene.current = false;
      return;
    }
    const layer = layerRef.current;
    if (!layer) return;
    if (scrollDriven.current) return;
    if (reducedRef.current) {
      layer.style.setProperty("--build", "1");
      return;
    }
    tweenBuild(layer, 0, 1, BUILD_MS, tween);
  }, [active]);

  /* The very first scene draws itself with CSS (see .sc-layer[data-intro]); hand over when done. */
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const done = () => setIntro(false);
    layer.addEventListener("animationend", done, { once: true });
    return () => layer.removeEventListener("animationend", done);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = motion.matches;
    // Reduced motion: no timers, no auto cycle. (takeover() is a no-op if already in user mode.)
    if (motion.matches) modeRef.current = "user";
    const onMotion = () => {
      reducedRef.current = motion.matches;
      if (motion.matches) takeover();
    };
    motion.addEventListener("change", onMotion);

    const stage = root.querySelector<HTMLElement>(".sc-stage");
    const track = root.querySelector<HTMLElement>(".sc-track");
    const phones = root.querySelector<HTMLElement>(".sc-mobile");

    /* Only run while a live part is on screen. */
    const seen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target);
          else seen.delete(entry.target);
        }
        visibleRef.current = seen.size > 0;
      },
      { threshold: 0.3 },
    );
    if (stage) observer.observe(stage);
    if (phones) observer.observe(phones);

    /* Automatic cycle. It starts once the page has finished loading and settled, so the first swap never
       competes with the first paint or with hydration. */
    const tick = () => {
      if (modeRef.current !== "auto" || !visibleRef.current || document.hidden || reducedRef.current) return;
      if (phones && getComputedStyle(phones).display !== "none") {
        const row = mobileTrack.current;
        if (!row) return;
        const next = (slideRef.current + 1) % showcaseSkills.length;
        row.scrollTo({ left: next * slideStride(row), behavior: "smooth" });
        return;
      }
      const index = autoSequence.indexOf(activeRef.current as ShowcaseId);
      const next = autoSequence[(index + 1) % autoSequence.length];
      if (next) show(next);
    };
    let timer = 0;
    let settle = 0;
    const begin = () => {
      settle = window.setTimeout(() => {
        timer = window.setInterval(tick, AUTO_MS);
      }, SETTLE_MS);
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    /* Scroll: the first real scroll hands control to the visitor; while the stage is pinned,
       scroll position steps through the five stages. */
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.scrollY > 24) takeover();
      if (!stage || !track || getComputedStyle(stage).position !== "sticky") {
        scrollDriven.current = false;
        return;
      }
      const top = parseFloat(getComputedStyle(stage).top) || 0;
      const travel = track.offsetHeight - stage.offsetHeight;
      const progress = travel > 0 ? clamp((top - track.getBoundingClientRect().top) / travel) : 0;
      root.style.setProperty("--p", progress.toFixed(4));

      if (progress <= 0.003) {
        if (scrollDriven.current) {
          scrollDriven.current = false;
          layerRef.current?.style.setProperty("--build", "1");
        }
        return;
      }

      takeover();
      scrollDriven.current = true;
      const index = Math.min(STAGE_COUNT - 1, Math.floor(progress * STAGE_COUNT));
      const local = progress * STAGE_COUNT - index;
      if (index !== lastStage.current) {
        lastStage.current = index;
        override.current = false;
        const scene = showcaseStages[index]?.scene;
        if (scene) show(scene);
      }
      if (!override.current) {
        layerRef.current?.style.setProperty("--build", String(index === 0 ? 1 : clamp(local / 0.6)));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      motion.removeEventListener("change", onMotion);
      window.clearInterval(timer);
      window.clearTimeout(settle);
      window.removeEventListener("load", begin);
      window.clearTimeout(leaveTimer.current);
      cancelAnimationFrame(frame);
      cancelTween();
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [show, takeover, cancelTween]);

  /* Phones: follow the swipe, and play the slide's drawing when it arrives. */
  useEffect(() => {
    const track = mobileTrack.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const index = clamp(Math.round(track.scrollLeft / slideStride(track)), 0, showcaseSkills.length - 1);
        if (index !== slideRef.current) {
          slideRef.current = index;
          setSlide(index);
        }
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const mobileSettled = useRef(false);
  useEffect(() => {
    const world = mobileWorlds.current[slide];
    if (!world || reducedRef.current) return;
    /* The first slide is already in its final composition: drawing it on load would only compete with the first paint. */
    if (!mobileSettled.current) {
      mobileSettled.current = true;
      return;
    }
    const own = { current: 0 };
    tweenBuild(world, 0, 1, BUILD_MS, own);
    return () => {
      cancelAnimationFrame(own.current);
      world.style.setProperty("--build", "1");
    };
  }, [slide]);

  const select = useCallback(
    (id: SceneId) => {
      takeover();
      override.current = scrollDriven.current;
      show(id);
    },
    [show, takeover],
  );

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + showcaseSkills.length) % showcaseSkills.length;
    const skill = showcaseSkills[next];
    if (!skill) return;
    select(skill.id);
    tabRefs.current[next]?.focus();
  };

  const copy = copyFor(active);
  const stage = stageOf(active);
  const activeSkillIndex = showcaseSkills.findIndex((skill) => skill.id === active);
  const tabIndex = activeSkillIndex >= 0 ? activeSkillIndex : showcaseSkills.findIndex((skill) => skill.stage === "create");
  const count = active === "create" ? "Create" : pad(activeSkillIndex + 1);

  return (
    <section
      ref={rootRef}
      id="showcase"
      aria-labelledby="showcase-title"
      data-stage={stage}
      data-mode={mode}
      data-tone={stage}
      onPointerDown={takeover}
      onKeyDown={takeover}
      onFocusCapture={takeover}
      className="sc"
    >
      <h2 id="showcase-title" className="sr-only">
        What I do: a creative skill showcase
      </h2>
      <Container>
        {/* Tablets and desktops: one stage, pinned briefly while the visitor scrolls. */}
        <div className="sc-desktop">
          <div className="sc-track">
            <div className="sc-stage">
              <div className="sc-rail" aria-hidden>
                <span className="sc-rail-title type-eyebrow">What I do</span>
                <ol className="sc-rail-steps">
                  {showcaseStages.map((item) => (
                    <li key={item.id} data-on={item.id === stage ? "" : undefined} data-tone={item.id}>
                      {item.label}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="sc-grid">
                <div
                  id="sc-panel"
                  role="tabpanel"
                  aria-labelledby={`sc-tab-${showcaseSkills[tabIndex]?.id ?? "web"}`}
                  className="sc-copy"
                  data-tone={stage}
                >
                  <p className="type-micro text-subtle">
                    {count}
                    {active === "create" ? "" : ` / ${pad(showcaseSkills.length)}`}
                  </p>
                  <div key={copy.name} className="sc-name type-statement text-(--tone-ink)">
                    {copy.name}
                  </div>
                  <p className="sc-desc type-body-lg text-foreground">{copy.description}</p>
                  <ul aria-label="Related skills" className="type-small dot-list flex flex-wrap gap-x-2 gap-y-1 text-muted [--dot-color:var(--subtle)]">
                    {copy.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>

                  <div role="tablist" aria-label="Skills" className="sc-index">
                    {showcaseSkills.map((skill, index) => {
                      const selected = index === tabIndex;
                      return (
                        <button
                          key={skill.id}
                          ref={(element) => {
                            tabRefs.current[index] = element;
                          }}
                          id={`sc-tab-${skill.id}`}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          aria-controls="sc-panel"
                          tabIndex={selected ? 0 : -1}
                          data-tone={skill.stage}
                          onClick={() => select(skill.id)}
                          onKeyDown={(event) => onTabKey(event, index)}
                          className="sc-tab"
                        >
                          <span className="sc-tab-n">{pad(index + 1)}</span>
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="sc-visual" data-tone={stage}>
                  <div className="sc-cwrap">
                    <div className="sc-world" aria-hidden>
                      {leaving && (
                        <div key={`out-${leaving}`} className="sc-layer" data-state="out" style={{ "--build": 1 } as CSSProperties}>
                          <SceneView id={leaving} />
                        </div>
                      )}
                      <div
                        key={active}
                        ref={layerRef}
                        className="sc-layer"
                        data-state="in"
                        data-intro={intro ? "" : undefined}
                      >
                        <SceneView id={active} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sc-spacer" aria-hidden />
          </div>
        </div>

        {/* Phones: a horizontal, swipeable row of the skills. Each swipe shows its drawing. */}
        <div className="sc-mobile" aria-roledescription="carousel" aria-label="Skills">
          <div className="sc-m-head">
            <p className="type-eyebrow sc-m-title">What I do</p>
            <p className="sc-m-hint" aria-hidden>
              <span className="type-micro">Swipe to explore</span>
              <span className="sc-m-arrow">→</span>
            </p>
          </div>
          <ul ref={mobileTrack} className="sc-m-track">
            {showcaseSkills.map((skill, index) => (
              <li
                key={skill.id}
                data-tone={skill.stage}
                data-current={index === slide ? "" : undefined}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${showcaseSkills.length}: ${skill.name}`}
                className="sc-m-slide"
              >
                <div className="sc-cwrap">
                  <div
                    className="sc-world"
                    aria-hidden
                    ref={(element) => {
                      mobileWorlds.current[index] = element;
                    }}
                  >
                    {Math.abs(index - slide) <= 1 && <SceneView id={skill.id} />}
                  </div>
                </div>
                <p className="type-micro text-subtle">
                  {pad(index + 1)} / {pad(showcaseSkills.length)}
                </p>
                <h3 className="type-statement-sm text-(--tone-ink)">{skill.name}</h3>
                <p className="type-small text-muted">{skill.description}</p>
              </li>
            ))}
          </ul>
          <span className="sc-m-dots" aria-hidden>
            {showcaseSkills.map((skill, index) => (
              <i key={skill.id} data-on={index === slide ? "" : undefined} />
            ))}
          </span>
        </div>

        {/* Reduced motion: everything at once, nothing moving. */}
        <div className="sc-static">
          <StaticOverview />
        </div>
      </Container>
    </section>
  );
}
