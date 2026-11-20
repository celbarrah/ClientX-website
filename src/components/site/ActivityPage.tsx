import { motion } from "framer-motion";
import { CheckCircle, ChatCircleDots, ShieldCheck } from "@phosphor-icons/react";
import { PageMain, FooterCTA, Eyebrow } from "./primitives";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { TRIAL_URL, DEMO_URL } from "../../lib/site";
import type { Activite } from "../../lib/activites-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ActivityPage({ activite }: { activite: Activite }) {
  return (
    <PageMain>
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Eyebrow>Pour {activite.audience}</Eyebrow>
            <h1
              className="text-balance mt-6 font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem,4.8vw,4.2rem)",
                letterSpacing: "-0.035em",
                lineHeight: 1.04,
                color: "var(--ink)",
              }}
            >
              {activite.heroTitle}{" "}
              <span className="accent-serif" style={{ fontSize: "1.06em" }}>
                {activite.heroAccent}
              </span>
            </h1>
            <p
              className="text-pretty mt-6 max-w-xl text-[17px] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {activite.heroText}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PrimaryButton to={TRIAL_URL}>Essai gratuit 14 jours</PrimaryButton>
              <SecondaryButton to={DEMO_URL}>Voir une démo</SecondaryButton>
            </div>
            <p
              className="mt-5 flex items-center gap-2 text-[13px]"
              style={{ color: "var(--muted)" }}
            >
              <ShieldCheck className="h-4 w-4" weight="fill" style={{ color: "var(--green)" }} />
              Zéro commission · Certifié ISO 9001
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="relative aspect-[4/3] overflow-hidden rounded-[32px]"
            style={{ boxShadow: "0 40px 80px -36px rgba(16,60,28,0.45)" }}
          >
            <img
              src={activite.image}
              alt={activite.imageAlt}
              className="h-full w-full object-cover"
              style={{ objectPosition: activite.imagePosition ?? "50% 50%" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Pains */}
      <section className="container-x py-14 md:py-20">
        <div className="max-w-2xl">
          <Eyebrow>Ce que vous vivez</Eyebrow>
          <h2
            className="text-balance mt-5 font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem,3.4vw,2.8rem)",
              letterSpacing: "-0.03em",
              color: "var(--ink)",
            }}
          >
            Ce qui vous fait perdre des clientes
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {activite.pains.map((p, i) => (
            <div key={i} className="glass-card !rounded-3xl p-7">
              <span
                className="text-[12px] font-semibold"
                style={{ color: "var(--green-text)", fontVariantNumeric: "tabular-nums" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="mt-3 text-[19px] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                }}
              >
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="container-x py-6 md:py-10">
        <div
          className="rounded-[36px] px-6 py-12 md:px-12 md:py-16"
          style={{
            background:
              "radial-gradient(60% 80% at 0% 0%, rgba(50,220,50,0.14), transparent 70%), linear-gradient(180deg,#f3f7f1,#eaf1e7)",
            boxShadow: "0 0 0 1px rgba(10,30,15,0.06)",
          }}
        >
          <div className="max-w-2xl">
            <Eyebrow>Ce que fait ClientX</Eyebrow>
            <h2
              className="text-balance mt-5 font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem,3.4vw,2.8rem)",
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              Ce que nous faisons pour {activite.audience}
            </h2>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {activite.solutions.map((s, i) => (
              <div key={i} className="flex gap-4">
                <span
                  className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full"
                  style={{ background: "#fff", boxShadow: "0 0 0 1px rgba(10,30,15,0.08)" }}
                >
                  <CheckCircle
                    className="h-5 w-5"
                    weight="fill"
                    style={{ color: "var(--green)" }}
                  />
                </span>
                <div>
                  <h3
                    className="text-[18px] font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-1.5 text-[15px] leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof (chiffres réels uniquement) */}
      {activite.proof && (
        <section className="container-x py-14 md:py-20">
          <div className="max-w-2xl">
            <Eyebrow>Un centre qui l'utilise</Eyebrow>
            <h2
              className="text-balance mt-5 font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem,3.4vw,2.8rem)",
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              {activite.proof.client} en chiffres
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "var(--muted)" }}>
              {activite.proof.intro}
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {activite.proof.stats.map((s, i) => (
              <div key={i} className="glass-card !rounded-3xl p-6">
                <dd
                  className="font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem,3.4vw,3rem)",
                    letterSpacing: "-0.04em",
                    color: "var(--ink)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.value}
                </dd>
                <dt className="mt-2 text-[14px]" style={{ color: "var(--ink)" }}>
                  {s.label}
                </dt>
                {s.note && (
                  <p className="mt-1 text-[12.5px]" style={{ color: "var(--muted)" }}>
                    {s.note}
                  </p>
                )}
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* FAQ */}
      <section className="container-x py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2
            className="font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.7rem,3vw,2.4rem)",
              letterSpacing: "-0.03em",
              color: "var(--ink)",
            }}
          >
            Questions fréquentes
          </h2>
          <div className="mt-6 divide-y border-y" style={{ borderColor: "var(--line-strong)" }}>
            {activite.faq.map((f, i) => (
              <details key={i} className="group py-5">
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium"
                  style={{ color: "var(--ink)" }}
                >
                  {f.q}
                  <ChatCircleDots
                    className="h-5 w-5 shrink-0 transition-transform group-open:rotate-12"
                    style={{ color: "var(--green-text)" }}
                  />
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </PageMain>
  );
}
