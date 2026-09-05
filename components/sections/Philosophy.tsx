"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { philosophyStatements } from "./philosophyContent";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const closingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemRefs.current.filter(Boolean);
    const closing = closingRef.current;

    if (!section || items.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      items.forEach((item) => item.style.setProperty("--fill", "1"));
      closing?.style.setProperty("--closing-progress", "1");
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp01(-rect.top / travel);
      const activeIndex = Math.min(
        items.length - 1,
        Math.floor(progress * items.length),
      );

      items.forEach((item, index) => {
        const fill = clamp01(progress * items.length - index);
        const distance = Math.abs(index - activeIndex);

        item.style.setProperty("--fill", fill.toFixed(4));
        item.style.setProperty(
          "--focus",
          (1 - Math.min(distance, 1) * 0.34).toFixed(4),
        );
      });

      closing?.style.setProperty(
        "--closing-progress",
        clamp01((progress - 0.9) / 0.1).toFixed(4),
      );
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[250vh] w-full overflow-clip bg-background text-foreground motion-reduce:h-auto"
      aria-labelledby="philosophy-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" />
      <div className="sticky top-0 flex min-h-screen items-center py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid w-[90%] max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <header className="flex flex-col justify-between gap-8 lg:min-h-[72vh]">
            <div>
              <p className="mb-7 text-xs font-medium uppercase tracking-[0.32em] text-primary">
                AO / HOW WE THINK
              </p>
              <h2
                id="philosophy-title"
                className="max-w-[9ch] text-5xl font-medium leading-[0.94] tracking-[-0.06em] text-balance sm:text-6xl md:text-7xl lg:text-8xl"
              >
                We build for what&apos;s next.
              </h2>
            </div>

            <div className="hidden max-w-sm border-l border-border pl-5 text-sm leading-6 text-foreground-disabled lg:block">
              <p>
                A product does not become valuable at launch. It becomes
                valuable when the system, team, and roadmap can keep moving.
              </p>
            </div>
          </header>

          <div className="flex flex-col justify-center gap-6 sm:gap-7 lg:min-h-[72vh] lg:gap-8">
            {philosophyStatements.map((statement, index) => {
              const line = `${statement.number} — ${statement.title}`;

              return (
                <div
                  key={statement.number}
                  ref={(node) => {
                    if (node) itemRefs.current[index] = node;
                  }}
                  className="group relative border-l border-border pl-4 opacity-[var(--focus,1)] transition-opacity duration-200 sm:pl-5"
                  style={
                    {
                      "--fill": 0,
                      "--focus": 1,
                    } as CSSProperties
                  }
                >
                  <p className="relative mb-2 text-[clamp(1.25rem,4.8vw,4.7rem)] font-medium uppercase leading-[0.96] tracking-[-0.055em] text-foreground-disabled sm:mb-3">
                    <span>{line}</span>
                    <span
                      className="absolute inset-0 overflow-hidden text-foreground will-change-[clip-path]"
                      style={{
                        clipPath:
                          "inset(0 calc((1 - var(--fill)) * 100%) 0 0)",
                      }}
                      aria-hidden="true"
                    >
                      {line}
                    </span>
                  </p>

                  <p className="relative max-w-3xl text-sm leading-6 text-foreground-disabled sm:text-base sm:leading-7 lg:text-lg">
                    <span>{statement.body}</span>
                    <span
                      className="absolute inset-0 overflow-hidden text-foreground-secondary will-change-[clip-path]"
                      style={{
                        clipPath:
                          "inset(0 calc((1 - var(--fill)) * 100%) 0 0)",
                      }}
                      aria-hidden="true"
                    >
                      {statement.body}
                    </span>
                  </p>
                </div>
              );
            })}

            <p
              ref={closingRef}
              className="mt-2 max-w-2xl translate-y-[calc((1-var(--closing-progress,0))*14px)] border-t border-primary/30 pt-5 text-base font-medium text-primary opacity-[var(--closing-progress,0)] will-change-[opacity,transform] sm:text-lg"
              style={{ "--closing-progress": 0 } as CSSProperties}
            >
              From idea to production — and everything that comes after.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Philosophy;
