import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FEATURES } from "../../lib/site";
import { SectionHeader } from "./primitives";
import { ModuleMock } from "./ModuleMock";

const EASE = [0.16, 1, 0.3, 1] as const;

// Bento layout (desktop, 12-col): [7,5] · [4,4,4] · [5,7] · [6,6]
const BENTO: { span: string; dark?: boolean; tint?: boolean }[] = [
  { span: "lg:col-span-7" },
  { span: "lg:col-span-5" },
  { span: "lg:col-span-4" },
  { span: "lg:col-span-4", dark: true },
  { span: "lg:col-span-4" },
  { span: "lg:col-span-5", tint: true },
  { span: "lg:col-span-7" },
  { span: "lg:col-span-6" },
  { span: "lg:col-span-6", tint: true },
];

export function FeaturesSection() {
  return (
    <section
      id="plateforme"
      className="rails-bg py-12 md:py-16"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="container-x">
        <SectionHeader
          title={
            <>
              <span className="grad-ink">Un écosystème complet.</span>{" "}
              <span className="accent-serif" style={{ fontSize: "1.06em" }}>
                Zéro outil manquant.
              </span>
            </>
          }
          paragraph="Tout ce dont vous avez besoin pour capturer, convertir, délivrer et fidéliser, déjà interconnecté nativement."
        />
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {FEATURES.map((f, i) => (
            <BentoCell key={f.index} feature={f} config={BENTO[i]!} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCell({
  feature,
  config,
  index,
}: {
  feature: (typeof FEATURES)[number];
  config: (typeof BENTO)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const isDark = !!config.dark;
  const tint = !!config.tint;
  const Icon = feature.icon;
  const isLast = index === FEATURES.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.06 }}
      className={`group relative flex min-h-[380px] flex-col overflow-hidden p-7 md:p-8 ${config.span} ${isLast && FEATURES.length % 2 === 1 ? "md:col-span-2" : ""} ${isDark ? "glow-card" : "glass-card glass-card-hover"}`}
      style={{
        background: tint
          ? "radial-gradient(90% 70% at 0% 0%, rgba(50,220,50,0.14), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.78))"
          : undefined,
        color: "var(--ink)",
      }}
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
          style={{
            background: isDark ? "var(--green)" : "#fff",
            color: isDark ? "#031003" : "var(--green-text)",
            border: isDark ? "none" : "1px solid var(--line-strong)",
            boxShadow: isDark
              ? "0 8px 20px -6px rgba(50,220,50,0.7)"
              : "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          <Icon className="h-5 w-5" weight="regular" />
        </span>
        <span
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: isDark ? "var(--green-deep)" : "var(--faint)",
          }}
        >
          {feature.category}
          <span style={{ color: "var(--line-strong)" }}>/</span>
          {feature.index}
        </span>
      </div>

      <div className="relative z-10 mt-6">
        <h3
          className="text-[1.3rem] font-semibold md:text-[1.4rem]"
          style={{ letterSpacing: "-0.025em", lineHeight: 1.15 }}
        >
          {feature.title}
        </h3>
        <p
          className="text-pretty mt-2.5 max-w-[42ch] text-[14.5px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {feature.desc}
        </p>
      </div>

      <div className="mockup-fade relative z-0 -mb-8 mt-auto pt-8 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1.5 md:-mb-9">
        <ModuleMock kind={feature.title} />
      </div>
    </motion.div>
  );
}
