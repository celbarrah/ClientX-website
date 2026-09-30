import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";
import { SECTORS_DATA } from "../../lib/use-cases-data";
import { Eyebrow } from "./primitives";

export function SectorsSection() {
  const [active, setActive] = useState(0);
  const sector = SECTORS_DATA[active];
  const featuredCase = sector.useCases[0];

  return (
    <section
      id="cas-clients"
      className="rails-bg py-12 md:py-16"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Par secteur d'activité</Eyebrow>
          <h2
            className="text-balance mt-5 font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,3.6vw,3.2rem)",
              letterSpacing: "-0.03em",
              color: "#000000",
            }}
          >
            <span className="grad-ink">Nos Cas Clients par</span>{" "}
            <span className="accent-serif" style={{ fontSize: "1.08em" }}>
              Secteur
            </span>
          </h2>
          <p
            className="text-pretty mt-5 max-w-[44rem] text-[17px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Sélectionnez un secteur pour découvrir nos clients, leurs défis et les solutions IA que
            nous avons déployées.
          </p>
        </div>

        {/* Segmented control */}
        <div className="mt-10 flex justify-center">
          <div className="glass-pill no-scrollbar flex max-w-full gap-1.5 overflow-x-auto rounded-full p-1.5">
            {SECTORS_DATA.map((s, i) => {
              const Icon = s.icon;
              const isActive = active === i;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className="flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-200"
                  style={{
                    background: isActive
                      ? "linear-gradient(180deg, #62f262 0%, #32dc32 55%, #25c425 100%)"
                      : "transparent",
                    color: isActive ? "#031003" : "var(--muted)",
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(22,150,30,0.4), 0 8px 20px -6px rgba(50,220,50,0.6)"
                      : "none",
                  }}
                >
                  <Icon className="h-4 w-4" weight="bold" style={{ color: "currentColor" }} />
                  <span className="whitespace-nowrap">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured case */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-card mt-8 grid gap-6 !rounded-[28px] p-6 md:grid-cols-2 md:p-8"
          >
            {/* Left */}
            <div>
              <span
                className="text-[12px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--green-text)" }}
              >
                {sector.badge}
              </span>
              <h3
                className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold"
                style={{ letterSpacing: "-0.02em", color: "var(--ink)" }}
              >
                {featuredCase.name}
              </h3>
              <p className="text-[14px]" style={{ color: "var(--muted)" }}>
                {featuredCase.sub}
              </p>
              <p
                className="text-pretty mt-4 text-[15px] leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                {featuredCase.summary}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {featuredCase.results.slice(0, 4).map((r, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4"
                    style={{
                      background: "linear-gradient(180deg,#ffffff,#f4fbf5)",
                      boxShadow:
                        "0 0 0 1px rgba(10,30,15,0.06), 0 8px 20px -12px rgba(16,60,28,0.2)",
                    }}
                  >
                    <div
                      className="font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.4rem,2vw,1.8rem)",
                        color: "var(--ink)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {r.val}
                    </div>
                    <div className="mt-1 text-[12px]" style={{ color: "var(--muted)" }}>
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="mesh-panel !rounded-[20px] p-6">
                <span
                  className="text-[12px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--green-text)" }}
                >
                  Résultat direct
                </span>
                <p
                  className="text-pretty mt-2 text-[15px] leading-relaxed"
                  style={{ color: "#000000" }}
                >
                  {sector.results}
                </p>
              </div>
              <a
                href={`/cas-clients?secteur=${sector.id}`}
                className="group mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold underline-grow"
                style={{ color: "var(--green-text)" }}
              >
                Voir le détail complet
                <CaretRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  weight="bold"
                />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
