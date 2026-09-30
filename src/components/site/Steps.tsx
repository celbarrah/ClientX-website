import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STEPS } from "../../lib/site";
import { Eyebrow } from "./primitives";
import { ModuleMock } from "./ModuleMock";

gsap.registerPlugin(ScrollTrigger);

export function StepsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.matchMedia("(max-width: 1023px)").matches) return;

    const cards = containerRef.current?.querySelectorAll<HTMLElement>("[data-step-card]");
    if (!cards || !containerRef.current) return;

    const triggers: ScrollTrigger[] = [];
    cards.forEach((card, i) => {
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top 20%",
        end: "bottom 20%",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
      triggers.push(st);

      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => {
        if (containerRef.current?.contains(t.trigger as Node)) t.kill();
      });
    };
  }, []);

  return (
    <section className="rails-bg py-12 md:py-16" style={{ backgroundColor: "transparent" }}>
      <div className="container-x">
        <Eyebrow>Développez votre business sans limite</Eyebrow>
        <h2
          className="text-balance mt-5 max-w-[40rem] font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem,3.6vw,3.2rem)",
            letterSpacing: "-0.03em",
            color: "#000000",
          }}
        >
          <span className="grad-ink">4 Étapes Unifiées dans</span>{" "}
          <span className="accent-serif" style={{ fontSize: "1.06em" }}>
            1 Seule Plateforme
          </span>
        </h2>
      </div>

      <div
        ref={containerRef}
        className="container-x mt-10 grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-8"
      >
        {/* Sticky step list — glass rail */}
        <div className="hidden lg:block">
          <div className="glass-card sticky top-28 space-y-1.5 p-2.5">
            {STEPS.map((s, i) => {
              const on = active === i;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-[16px] px-3 py-3 transition-all duration-300"
                  style={{
                    background: on ? "linear-gradient(180deg, #ffffff, #effcf0)" : "transparent",
                    boxShadow: on
                      ? "0 0 0 1px rgba(50,220,50,0.4), 0 10px 24px -10px rgba(50,220,50,0.55)"
                      : "none",
                  }}
                >
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-semibold transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: on ? "var(--green)" : "rgba(10,30,15,0.05)",
                      color: on ? "#031003" : "var(--muted)",
                      boxShadow: on ? "0 6px 16px -4px rgba(50,220,50,0.7)" : "none",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[16px] font-medium transition-colors duration-300"
                    style={{ color: on ? "var(--ink)" : "var(--muted)" }}
                  >
                    {s.label.replace(/^0\d\s/, "")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stacked cards — text left, product mock right */}
        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <div
              key={i}
              data-step-card
              className="surface-premium grid items-center gap-8 overflow-hidden p-6 md:p-8 xl:grid-cols-[1fr_1.05fr]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="grad-green font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.4rem,4vw,3.2rem)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.05em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[11.5px] font-medium"
                    style={{
                      background: "var(--green-soft)",
                      color: "var(--green-text)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.02em",
                      boxShadow: "0 0 0 1px rgba(50,220,50,0.2)",
                    }}
                  >
                    {s.subtitle}
                  </span>
                </div>
                <h3
                  className="grad-ink mt-6 text-balance text-[clamp(1.5rem,2.3vw,2rem)] font-semibold"
                  style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-pretty mt-3 max-w-[34rem] text-[15.5px] leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {s.desc}
                </p>
              </div>
              <div className="mesh-panel relative overflow-hidden !rounded-[22px] p-4 md:p-6">
                <div aria-hidden className="mesh-grid pointer-events-none absolute inset-0" />
                <div className="relative">
                  <ModuleMock kind={s.subtitle} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
