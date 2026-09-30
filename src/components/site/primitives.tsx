import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CaretRight, ArrowRight } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Eyebrow chip (green dot + label) ---------- */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
      style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: "var(--green)" }}
        />
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--green)" }}
        />
      </span>
      {children}
    </span>
  );
}

/* ---------- Section title (H2) ---------- */
export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
      className={`text-balance font-semibold ${className}`}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
        letterSpacing: "-0.03em",
        lineHeight: 1.05,
        color: "var(--ink)",
      }}
    >
      {children}
    </motion.h2>
  );
}

/* ---------- Section header: left-aligned default ---------- */
export function SectionHeader({
  eyebrow,
  title,
  paragraph,
  align = "left",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  paragraph?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "flex flex-col items-center text-center" : ""} ${className}`}>
      {eyebrow}
      <SectionTitle className="mt-5">{title}</SectionTitle>
      {paragraph && (
        <p
          className="text-pretty mt-5 text-[17px] leading-relaxed"
          style={{ color: "var(--muted)", maxWidth: isCenter ? "44rem" : "62ch" }}
        >
          {paragraph}
        </p>
      )}
    </div>
  );
}

/* ---------- Stagger container ---------- */
const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
export function StaggerGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.div
      ref={ref}
      variants={staggerParent}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Page hero (top block of every inner page) ---------- */
export function PageHero({
  eyebrow,
  title,
  paragraph,
  buttons,
  align = "left",
  compact = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  paragraph?: string;
  buttons?: ReactNode;
  align?: "left" | "center";
  compact?: boolean;
}) {
  const isCenter = align === "center";
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: compact ? "8rem" : "9rem",
        paddingBottom: compact ? "2.5rem" : "3.5rem",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[640px] -translate-x-1/2 blur-[120px]"
        style={{
          background: "radial-gradient(ellipse at center, var(--green) 0%, transparent 70%)",
          opacity: 0.1,
        }}
      />
      <div className="container-x relative">
        <div className={`${isCenter ? "flex flex-col items-center text-center" : "max-w-[46rem]"}`}>
          {eyebrow}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
            className="text-balance mt-6 font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 5.2vw, 4.6rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              color: "var(--ink)",
            }}
          >
            {title}
          </motion.h1>
          {paragraph && (
            <p
              className="text-pretty mt-6 text-[17px] leading-relaxed"
              style={{ color: "var(--muted)", maxWidth: isCenter ? "44rem" : "62ch" }}
            >
              {paragraph}
            </p>
          )}
          {buttons && <div className="mt-9 flex flex-wrap items-center gap-3">{buttons}</div>}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer CTA: large editorial card (Contact & Démo) ---------- */
export function FooterCTA() {
  const TRUST = ["Certifié ISO 9001", "MENA & Europe", "Disponibilité 99.9% et support dédié"];
  return (
    <section className="container-x py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden rounded-[32px] px-6 pb-8 pt-10 md:rounded-[40px] md:px-12 md:pb-10 md:pt-14"
        style={{
          background:
            "radial-gradient(55% 70% at 35% 55%, rgba(50,220,50,0.16), transparent 70%), radial-gradient(40% 50% at 100% 0%, rgba(50,220,50,0.1), transparent 70%), linear-gradient(180deg, #f3f5ef 0%, #eef2ea 100%)",
          boxShadow:
            "0 0 0 1px rgba(10,30,15,0.07), 0 1px 0 #fff inset, 0 40px 90px -40px rgba(16,60,28,0.35)",
        }}
      >
        <div aria-hidden className="mesh-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
          <span
            className="text-[11px] uppercase tracking-[0.16em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
          >
            (08) Réserver une Démo
          </span>

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <h2
              className="font-medium"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 8.5vw, 8rem)",
                letterSpacing: "-0.065em",
                lineHeight: 0.9,
                color: "#0b0f0c",
              }}
            >
              Un seul
              <br />
              CRM IA.
              <br />
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: "-0.035em",
                  color: "#138a3a",
                  fontSize: "1.05em",
                }}
              >
                Tout votre
                <br />
                business.
              </span>
            </h2>

            <div className="flex flex-col items-start gap-8 lg:items-end lg:text-right">
              <p
                className="max-w-[24rem] text-[15.5px] leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                Planifiez une démonstration en direct pour découvrir la plateforme et auditer vos
                processus.
              </p>
              <Magnetic strength={10} className="inline-block">
                <a
                  href="/contact"
                  className="group grid h-36 w-36 place-items-center rounded-full text-center transition-transform duration-300 hover:scale-[1.04] md:h-40 md:w-40"
                  style={{
                    background: "#0b0f0c",
                    color: "#ffffff",
                    boxShadow: "0 24px 50px -18px rgba(0,0,0,0.55)",
                  }}
                >
                  <span className="flex flex-col items-center gap-1.5 text-[14px] font-semibold">
                    Réserver une Démo
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: "var(--green)" }}
                    />
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>

          <div
            className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t pt-6 text-[11px] uppercase tracking-[0.14em]"
            style={{
              borderColor: "rgba(10,30,15,0.1)",
              fontFamily: "var(--font-mono)",
              color: "var(--muted)",
            }}
          >
            {TRUST.map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span style={{ color: "#138a3a" }}>✦</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Page content transition wrapper ---------- */
export function PageMain({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="overflow-x-clip"
    >
      {children}
    </motion.main>
  );
}

/* ---------- SpotlightPanel (centered, rounded DARK panel framed by white page) ---------- */
export function SpotlightPanel({
  children,
  className = "",
  glow = "top-left",
  style,
}: {
  children: ReactNode;
  className?: string;
  glow?: "top-left" | "top-right" | "none";
  style?: React.CSSProperties;
}) {
  return (
    <section
      className="rails-bg container-x py-16 md:py-24"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className={`relative overflow-hidden rounded-[32px] border px-6 py-16 md:px-16 md:py-24 ${className}`}
        style={{
          background: "var(--panel)",
          color: "var(--on-dark)",
          borderColor: "rgba(255,255,255,0.06)",
          boxShadow: "0 40px 100px -30px rgba(10,13,11,0.45)",
          ...style,
        }}
      >
        {glow !== "none" && (
          <div
            aria-hidden
            className="pointer-events-none absolute h-[420px] w-[420px] blur-[120px]"
            style={{
              left: glow === "top-left" ? "-8%" : undefined,
              right: glow === "top-right" ? "-8%" : undefined,
              top: "-12%",
              background: "radial-gradient(circle, var(--green) 0%, transparent 70%)",
              opacity: 0.12,
            }}
          />
        )}
        <div className="relative">{children}</div>
      </div>
    </section>
  );
}

/* ---------- Card wrapper ---------- */
export function Card({
  children,
  className = "",
  style,
  as = "div",
  href,
  onClick,
  onMouseMove,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "a";
  href?: string;
  onClick?: () => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const Comp = as === "a" ? "a" : "div";
  return (
    <Comp
      href={href}
      onClick={onClick}
      onMouseMove={onMouseMove as never}
      className={`card ${className}`}
      style={style}
    >
      {children}
    </Comp>
  );
}

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({
  children,
  strength = 8,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform 0.3s var(--ease-expo)" }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;
        const r = el.getBoundingClientRect();
        const mx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const my = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0px,0px)";
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Number count-up ---------- */
export function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  // (kept simple; Pricing component handles its own count-up with Intl formatting)
  useRef<number>(0);
  return { val: inView ? target : 0, setVal };
}

/* ---------- Green CTA button (final CTA + pricing featured) ---------- */
export function GreenButton({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  const isHash = to.startsWith("#");
  return (
    <Magnetic strength={8} className="inline-block">
      <a
        href={to}
        onClick={(e) => {
          if (isHash) {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("clientx-scroll", { detail: to }));
          }
        }}
        className={`group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] ${className}`}
        style={{
          background: "var(--green)",
          color: "var(--ink)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {children}
        <CaretRight
          weight="bold"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        />
      </a>
    </Magnetic>
  );
}

/* ---------- Icon tile (36px rounded square) ---------- */
export function IconTile({
  icon: Icon,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string; weight?: "regular" | "bold" | "fill" }>;
  className?: string;
}) {
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${className}`}
      style={{
        background: "var(--green-soft)",
        color: "var(--green-text)",
        border: "1px solid var(--line)",
      }}
    >
      <Icon className="h-5 w-5" weight="regular" />
    </span>
  );
}

/* ---------- Backward-compat exports for legacy routes ---------- */
export function Badge({ children }: { children: ReactNode }) {
  return <Eyebrow>{children}</Eyebrow>;
}
export function GlassCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Card className={className} style={style}>
      {children}
    </Card>
  );
}
export function TextRoll({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}
