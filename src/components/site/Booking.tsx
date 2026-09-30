import { EnvelopeSimple, CalendarX, SealCheck } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Reveal, StaggerGroup, staggerItem } from "./primitives";
import { BookingWidget } from "./BookingWidget";

const TRUST = [
  { icon: EnvelopeSimple, text: "Confirmation instantanée par email & SMS" },
  { icon: CalendarX, text: "Sans engagement de durée" },
  { icon: SealCheck, text: "Entreprise certifiée ISO 9001" },
];

export function BookingSection() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "transparent",
      }}
    >
      {/* Soft green radial wash — adds depth without color noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-6%] h-[460px] w-[460px] blur-[130px]"
        style={{
          background: "radial-gradient(circle, var(--green) 0%, transparent 70%)",
          opacity: 0.07,
        }}
      />
      {/* Faint tonal glow on the left to balance the composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-8%] h-[360px] w-[360px] blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--green-deep) 0%, transparent 70%)",
          opacity: 0.05,
        }}
      />

      <div className="container-x relative py-12 md:py-16">
        <div className="flex flex-row flex-wrap items-start gap-10 lg:gap-14">
          {/* Left Column */}
          <div className="w-full shrink-0 lg:w-[44%]">
            <Reveal>
              {/* Eyebrow pill */}
              <span
                className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em]"
                style={{
                  background: "var(--surface)",
                  color: "var(--muted)",
                  border: "1px solid var(--line-strong)",
                  fontFamily: "var(--font-mono)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span style={{ color: "var(--green)" }}>✦</span>
                Prise de Rendez-vous Directe
              </span>

              {/* Title */}
              <h2
                className="text-balance mt-6 font-semibold leading-[1.04]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.1rem, 3.4vw, 3rem)",
                  letterSpacing: "-0.035em",
                  color: "#000000",
                }}
              >
                <span className="grad-ink">Réservez votre séance avec un</span>{" "}
                <span className="accent-serif" style={{ fontSize: "1.08em" }}>
                  eXpert ClientX AI
                </span>
              </h2>

              {/* Paragraph */}
              <p
                className="text-pretty mt-6 max-w-[34rem] text-[16px] leading-relaxed md:text-[17px]"
                style={{ color: "var(--muted)" }}
              >
                Sélectionnez la date et l'horaire de votre choix pour échanger sur vos processus et
                configurer votre plateforme unifiée.
              </p>

              {/* Trust items as refined premium rows */}
              <StaggerGroup className="mt-10 space-y-3.5">
                {TRUST.map((t) => (
                  <motion.div
                    key={t.text}
                    variants={staggerItem}
                    className="group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.9)",
                      boxShadow:
                        "0 0 0 1px rgba(10,30,15,0.06), 0 10px 24px -14px rgba(16,60,28,0.25)",
                    }}
                    onMouseMove={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow =
                        "0 0 0 1px rgba(50,220,50,0.35), 0 14px 30px -14px rgba(50,220,50,0.45)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow =
                        "0 0 0 1px rgba(10,30,15,0.06), 0 10px 24px -14px rgba(16,60,28,0.25)";
                    }}
                  >
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                      style={{
                        background: "var(--green-soft)",
                        color: "var(--green-text)",
                        border: "1px solid var(--line-strong)",
                      }}
                    >
                      <t.icon className="h-5 w-5" weight="regular" />
                    </span>
                    <span className="text-[15px] font-medium" style={{ color: "var(--text)" }}>
                      {t.text}
                    </span>
                  </motion.div>
                ))}
              </StaggerGroup>
            </Reveal>
          </div>

          {/* Right Column: Calendar Widget framed as a premium product surface */}
          <div className="w-full lg:flex-1">
            <Reveal delay={0.08} y={24}>
              <div className="relative">
                {/* Layered green glow behind the frame for depth */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 25%, var(--green) 0%, transparent 70%)",
                    opacity: 0.08,
                  }}
                />
                {/* Refined white frame */}
                <div className="glass-card !rounded-[28px] p-2.5 md:p-3">
                  {/* Inner subtle top highlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-3 top-3 h-px rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, var(--line-strong), transparent)",
                    }}
                  />
                  <BookingWidget minHeight={780} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
