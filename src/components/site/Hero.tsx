import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendUp, SealCheck } from "@phosphor-icons/react";
import { Eyebrow } from "./primitives";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { ClientOnly } from "./ClientOnly";
import { ModuleMock } from "./ModuleMock";

/* Stats — final values are server-rendered; count-up plays on view.
   Green glyphs (+, %, €) are the only green accent on the violet panel. */
const STATS = [
  { final: "0 €", label: "De coûts cachés", num: 0, suffix: " €", glyph: "€" },
  {
    final: "+20 outils",
    label: "Réunis en 1 plateforme",
    num: 20,
    prefix: "+",
    suffix: " outils",
    glyph: "+",
  },
  { final: "ISO 9001", label: "Entreprise certifiée", raw: "ISO 9001", glyph: "" },
  { final: "100%", label: "Flux unifiés & sécurisés", num: 100, suffix: "%", glyph: "%" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });
  const dashTilt = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="rails-bg relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      {/* aurora + masked grid + grain */}
      <div aria-hidden className="aurora pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <div aria-hidden className="noise pointer-events-none absolute inset-0" />
      <div aria-hidden className="orb right-[8%] top-[12%] h-[420px] w-[520px] opacity-60" />

      <div className="container-x relative grid items-center gap-12 pt-28 md:pt-36 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        {/* Left */}
        <div>
          <Eyebrow>N°1 Logiciel IA Business All-in-One</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-balance mt-6 font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 5.6vw, 5rem)",
              letterSpacing: "-0.045em",
              lineHeight: 0.98,
              color: "#000000",
            }}
          >
            <span className="grad-ink">Un seul logiciel IA. Tout votre business.</span>{" "}
            <span className="accent-serif" style={{ fontSize: "1.08em" }}>
              Zéro friction.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-pretty mt-7 max-w-[34rem] text-[17px] leading-[1.7] md:text-[18px]"
            style={{ color: "var(--muted)" }}
          >
            ClientX rassemble{" "}
            <span style={{ color: "var(--ink)", fontWeight: 500 }}>
              vos pages web, votre CRM, vos emails, vos rendez-vous, vos paiements et vos formations
            </span>{" "}
            dans une plateforme logicielle IA unifiée, propulsée par un puissant moteur
            d'automatisation natif.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <PrimaryButton to="/contact">Réserver une Démo</PrimaryButton>
            <SecondaryButton to="#plateforme">Découvrir la plateforme</SecondaryButton>
          </motion.div>
        </div>

        {/* Right: product visual — tilt-to-flat on scroll */}
        <HeroVisual tiltProgress={dashTilt} />
      </div>

      {/* Stats strip */}
      <div className="container-x relative mt-14 md:mt-16">
        <StatsStrip />
      </div>
      <div className="h-6 md:h-8" />
    </section>
  );
}

/* ---------- Stats: light mesh panel + glass tiles (adapted from the stats reference) ---------- */
function StatsStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mesh-panel relative overflow-hidden p-3 md:p-4"
    >
      <div aria-hidden className="mesh-grid pointer-events-none absolute inset-0" />
      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard key={i} index={i} {...s} />
        ))}
      </div>
    </motion.div>
  );
}

function StatCard({ num, label, prefix, suffix, raw }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val] = useCount(num || 0, inView);

  return (
    <div
      ref={ref}
      className="glass-card glass-card-hover flex items-center gap-4 !rounded-[22px] px-6 py-6 md:px-7 md:py-8"
    >
      <div
        className="whitespace-nowrap font-medium"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.1rem,3.2vw,3rem)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: "var(--ink)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {raw ? (
          raw
        ) : (
          <>
            {prefix && <span className="grad-green">{prefix}</span>}
            {num === 0 ? "0" : <span>{val}</span>}
            {suffix && suffix !== " outils" && <span className="grad-green">{suffix}</span>}
          </>
        )}
      </div>
      <div className="max-w-[9rem] text-[13px] leading-snug" style={{ color: "var(--muted)" }}>
        {suffix === " outils" && (
          <span className="block font-semibold" style={{ color: "var(--ink)" }}>
            outils
          </span>
        )}
        {label}
      </div>
    </div>
  );
}

/* tiny count-up hook — SSR-safe: server-renders the FINAL value so crawlers and
   the initial paint never show "0". The animation only runs as a progressive
   enhancement after hydration + in-view + motion allowed. */
function useCount(to: number, inView: boolean) {
  const [val, setVal] = useState(to); // final value on server + first paint
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(to);
      started.current = true;
      return;
    }
    started.current = true;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return [val, setVal] as const;
}

/* ---------- Hero product visual ---------- */
function HeroVisual({ tiltProgress }: { tiltProgress: any }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-0 rounded-[40px] blur-[70px]"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, rgba(50,220,50,0.28), transparent 65%)",
        }}
      />
      <ClientOnly fallback={<HeroPlaceholder />}>
        <ProductFrame onMouseParent={wrapRef} tiltProgress={tiltProgress} />
      </ClientOnly>

      {/* Floating chips */}
      <div
        className="absolute -bottom-5 left-2 z-10 flex items-center gap-2 rounded-2xl border bg-white px-3.5 py-2.5 shadow-lg md:-left-5"
        style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-lg)" }}
      >
        <span
          className="grid h-8 w-8 place-items-center rounded-lg"
          style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
        >
          <TrendUp className="h-4 w-4" weight="bold" />
        </span>
        <div>
          <div className="text-[11px]" style={{ color: "var(--muted)" }}>
            Conversion
          </div>
          <div
            className="text-[14px] font-semibold"
            style={{ color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}
          >
            34,2 %
          </div>
        </div>
      </div>

      <div
        className="absolute -right-3 top-6 z-10 flex items-center gap-2 rounded-2xl border bg-white px-3.5 py-2.5 shadow-lg md:-right-5"
        style={{ borderColor: "var(--line)", boxShadow: "var(--shadow-lg)" }}
      >
        <span
          className="grid h-8 w-8 place-items-center rounded-lg"
          style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
        >
          <SealCheck className="h-4 w-4" weight="fill" />
        </span>
        <div>
          <div className="text-[11px]" style={{ color: "var(--muted)" }}>
            Entreprise certifiée
          </div>
          <div className="text-[14px] font-semibold" style={{ color: "var(--ink)" }}>
            ISO 9001
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductFrame({
  onMouseParent,
  tiltProgress,
}: {
  onMouseParent: React.RefObject<HTMLDivElement | null>;
  tiltProgress: any;
}) {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = onMouseParent.current;
    if (!el || (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches))
      return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const my = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `perspective(1600px) rotateY(${8 - mx * 6}deg) rotateX(${4 + my * 4}deg)`;
  };
  const reset = () => {
    if (onMouseParent.current)
      onMouseParent.current.style.transform = "perspective(1600px) rotateY(-8deg) rotateX(4deg)";
  };
  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transform: "perspective(1600px) rotateY(-8deg) rotateX(4deg)",
        transition: "transform 0.4s var(--ease-expo)",
      }}
    >
      <BrowserFrame label="Dashboard" />
    </motion.div>
  );
}

function BrowserFrame({ label }: { label: string }) {
  return (
    <div className="frame">
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[11px]" style={{ color: "var(--muted)" }}>
          {label}
        </span>
      </div>
      <div className="p-5">
        <ModuleMock kind="ClientX Dashboard" />
      </div>
    </div>
  );
}

function HeroPlaceholder() {
  return (
    <div className="frame">
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
      </div>
      <div className="p-5">
        <ModuleMock kind="ClientX Dashboard" />
      </div>
    </div>
  );
}

export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`h-full w-full ${className}`}>
      <ModuleMock kind={label} />
    </div>
  );
}
