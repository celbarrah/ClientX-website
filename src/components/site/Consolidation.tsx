import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CLIENTX_LOGO } from "../../lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const INNER = ["CRM", "Emailing", "Tunnel", "Calendrier", "Automatisation", "Paiement"];
const OUTER = [
  "SMS",
  "Formation",
  "Social",
  "Devis",
  "Signature",
  "Inbox",
  "Quiz",
  "Communauté",
  "Dashboard",
  "API",
];

export function ConsolidationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const count = useCountdown(20, 1, inView);

  return (
    <section
      className="relative overflow-hidden py-10 md:py-14"
      style={{ backgroundColor: "transparent" }}
    >
      {/* open-canvas glow: no box, the section breathes on the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[900px] w-[900px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(50,220,50,0.18) 0%, rgba(50,220,50,0.06) 35%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="dot-bg pointer-events-none absolute inset-0 opacity-60"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 50% 60% at 72% 50%, black, transparent 75%)",
          maskImage: "radial-gradient(ellipse 50% 60% at 72% 50%, black, transparent 75%)",
        }}
      />
      <div className="container-x relative">
        <div
          ref={ref}
          className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4"
        >
          {/* Left: copy + counter */}
          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-balance font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 4.6vw, 4.2rem)",
                letterSpacing: "-0.045em",
                lineHeight: 1,
              }}
            >
              <span className="grad-ink">+20 outils. Réunis en</span>{" "}
              <span className="accent-serif" style={{ fontSize: "1.08em" }}>
                1 plateforme.
              </span>
            </motion.h2>
            <p
              className="text-pretty mt-6 max-w-[34rem] text-[16.5px] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              ClientX remplace votre outil de tunnel, votre CRM, votre système d'emailing, votre
              planificateur de rendez-vous, vos outils d'automatisation, vos hébergements de
              formation et votre planificateur social, vous faisant économiser plus de 15 000€ par
              an.
            </p>

            {/* Counter pill: 20 -> 1 */}
            <div
              className="mt-9 inline-flex items-center gap-5 rounded-[22px] py-4 pl-6 pr-7"
              style={{
                background: "linear-gradient(180deg,#ffffff,#f3fbf4)",
                boxShadow:
                  "0 0 0 1px rgba(50,220,50,0.25), 0 1px 0 #fff inset, 0 16px 36px -18px rgba(22,120,40,0.45)",
              }}
            >
              <span
                className="font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 5vw, 4rem)",
                  letterSpacing: "-0.06em",
                  lineHeight: 1,
                  color: "var(--ink)",
                  fontVariantNumeric: "tabular-nums",
                  minWidth: "2ch",
                }}
              >
                {count}
              </span>
              <span className="h-10 w-px" style={{ background: "rgba(10,30,15,0.1)" }} />
              <span className="text-[15px] font-medium" style={{ color: "var(--muted)" }}>
                {count > 1 ? "outils" : "outil"}
              </span>
            </div>
          </div>

          {/* Right: orbit */}
          <Orbit active={inView} />
        </div>
      </div>

      <style>{`
        @keyframes cx-orbit { to { transform: rotate(360deg); } }
        @keyframes cx-orbit-rev { to { transform: rotate(-360deg); } }
        @keyframes cx-pulse { 0%,100% { transform: scale(1); opacity: .55 } 50% { transform: scale(1.12); opacity: .2 } }
        @media (prefers-reduced-motion: reduce) {
          .cx-spin, .cx-spin-rev, .cx-chip-up, .cx-chip-up-rev { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

/* 20 -> 1 once, when in view (time-based, not scroll-bound) */
function useCountdown(from: number, to: number, start: boolean) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from + (to - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const delay = setTimeout(() => (raf = requestAnimationFrame(tick)), 400);
    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [start, from, to]);
  return v;
}

function Ring({
  items,
  radius,
  duration,
  reverse,
  active,
  delay,
}: {
  items: string[];
  radius: number; // % of container
  duration: number;
  reverse?: boolean;
  active: boolean;
  delay: number;
}) {
  return (
    <div
      className={reverse ? "cx-spin-rev" : "cx-spin"}
      style={{
        position: "absolute",
        inset: 0,
        animation: `${reverse ? "cx-orbit-rev" : "cx-orbit"} ${duration}s linear infinite`,
      }}
    >
      {items.map((t, i) => {
        const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + radius * Math.cos(a);
        const y = 50 + radius * Math.sin(a);
        return (
          <div
            key={t}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* counter-rotate so labels stay upright */}
            <div
              className={reverse ? "cx-chip-up-rev" : "cx-chip-up"}
              style={{
                animation: `${reverse ? "cx-orbit" : "cx-orbit-rev"} ${duration}s linear infinite`,
              }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={active ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: delay + i * 0.05 }}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1 text-[10.5px] font-medium sm:px-3 sm:py-1.5 sm:text-[12px]"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  color: "var(--text)",
                  boxShadow:
                    "0 0 0 1px rgba(10,30,15,0.08), 0 1px 0 #fff inset, 0 8px 18px -10px rgba(16,60,28,0.35)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--green)" }} />
                {t}
              </motion.span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Orbit({ active }: { active: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-[84%] max-w-[640px] sm:w-full">
      {/* rings */}
      {[
        { s: "92%", o: 0.1 },
        { s: "60%", o: 0.14 },
        { s: "30%", o: 0.2 },
      ].map((r, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: r.s,
            height: r.s,
            border: `1px dashed rgba(22,120,40,${r.o + 0.08})`,
            background:
              i === 2
                ? "radial-gradient(circle, rgba(50,220,50,0.14), transparent 70%)"
                : "transparent",
          }}
        />
      ))}

      <Ring items={OUTER} radius={46} duration={90} active={active} delay={0.35} />
      <Ring items={INNER} radius={30} duration={70} reverse active={active} delay={0.15} />

      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden
          className="absolute inset-0 rounded-[28px]"
          style={{
            background: "var(--green)",
            filter: "blur(22px)",
            animation: "cx-pulse 3.2s ease-in-out infinite",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative flex flex-col items-center gap-1.5 rounded-[20px] px-3.5 py-3 sm:gap-2.5 sm:rounded-[26px] sm:px-6 sm:py-5"
          style={{
            background: "linear-gradient(180deg,#ffffff,#f1fcf2)",
            boxShadow:
              "0 0 0 1px rgba(50,220,50,0.45), 0 1px 0 #fff inset, 0 24px 50px -16px rgba(50,220,50,0.6)",
          }}
        >
          <img
            src={CLIENTX_LOGO}
            alt="ClientX AI"
            className="h-4 w-auto object-contain sm:h-6"
            style={{ filter: "brightness(0)" }}
          />
          <span
            className="whitespace-nowrap text-[10.5px] font-semibold sm:text-[12.5px]"
            style={{ color: "var(--ink)" }}
          >
            Un seul CRM IA.
          </span>
        </motion.div>
      </div>
    </div>
  );
}
