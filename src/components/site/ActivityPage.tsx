import { motion } from "framer-motion";
import { Plus, ShieldCheck } from "@phosphor-icons/react";
import { PageMain, Eyebrow } from "./primitives";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import {
  SectionLabel,
  SectionTitle,
  Accent,
  DarkBand,
  LuxeClosing,
  HAIR,
  HAIR_DARK,
  NEON,
} from "./PremiumBlocks";
import { TRIAL_URL, DEMO_URL } from "../../lib/site";
import type { Activite } from "../../lib/activites-data";

const EASE = [0.16, 1, 0.3, 1] as const;
const ARCH = "999px 999px 32px 32px";

export function ActivityPage({ activite }: { activite: Activite }) {
  return (
    <PageMain>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Pour {activite.audience}</Eyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="text-balance mt-6 font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem,5.2vw,4.8rem)",
                letterSpacing: "-0.045em",
                lineHeight: 1,
                color: "var(--ink)",
              }}
            >
              {activite.heroTitle} <Accent>{activite.heroAccent}</Accent>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="text-pretty mt-7 max-w-xl text-[17px] leading-[1.7]"
              style={{ color: "var(--muted)" }}
            >
              {activite.heroText}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <PrimaryButton to={TRIAL_URL}>Essai gratuit 14 jours</PrimaryButton>
              <SecondaryButton to={DEMO_URL}>Voir une démo</SecondaryButton>
            </motion.div>
            <p
              className="mt-6 flex items-center gap-2 text-[13px]"
              style={{ color: "var(--muted)" }}
            >
              <ShieldCheck className="h-4 w-4" weight="fill" style={{ color: NEON }} />
              Zéro commission · Certifié ISO 9001
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[440px] lg:max-w-none"
          >
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4"
              style={{ border: `1px solid ${NEON}`, borderRadius: ARCH, opacity: 0.8 }}
            />
            <div
              className="relative aspect-[3/4] overflow-hidden"
              style={{ borderRadius: ARCH, boxShadow: "0 50px 90px -40px rgba(7,16,10,0.55)" }}
            >
              <img
                src={activite.image}
                alt={activite.imageAlt}
                className="h-full w-full object-cover"
                style={{ objectPosition: activite.imagePosition ?? "50% 50%" }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,16,10,0) 60%, rgba(7,16,10,0.45) 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* (01) Ce que vous vivez */}
      <section className="container-x py-16 md:py-24">
        <SectionLabel index="01">Ce que vous vivez</SectionLabel>
        <SectionTitle className="mt-6 max-w-3xl">
          Ce qui vous fait <Accent>perdre des clientes.</Accent>
        </SectionTitle>
        <div className="mt-14 border-t" style={{ borderColor: HAIR }}>
          {activite.pains.map((p, i) => (
            <div
              key={i}
              className="grid gap-3 border-b py-9 md:grid-cols-[100px_1fr_1.2fr] md:items-baseline md:gap-10 md:py-11"
              style={{ borderColor: HAIR }}
            >
              <span
                className="font-medium"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.6rem",
                  lineHeight: 0.9,
                  letterSpacing: "-0.06em",
                  color: "var(--green-text)",
                }}
              >
                0{i + 1}
              </span>
              <h3
                className="text-[24px] font-medium md:text-[30px]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  lineHeight: 1.1,
                }}
              >
                {p.title}
              </h3>
              <p className="max-w-xl text-[16px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* (02) Ce que fait ClientX */}
      <section className="container-x py-4 md:py-8">
        <DarkBand className="px-6 py-14 md:px-14 md:py-20">
          <SectionLabel index="02" dark>
            Ce que fait ClientX
          </SectionLabel>
          <SectionTitle dark className="mt-6 max-w-3xl">
            Ce que nous faisons pour <Accent dark>{activite.audience}.</Accent>
          </SectionTitle>
          <div className="mt-14 grid gap-x-14 md:grid-cols-2">
            {activite.solutions.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-[44px_1fr] gap-5 border-t py-8"
                style={{ borderColor: HAIR_DARK }}
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-full text-[12px] font-semibold"
                  style={{
                    border: "1px solid rgba(50,220,50,0.55)",
                    color: NEON,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  0{i + 1}
                </span>
                <div>
                  <h3
                    className="text-[22px] font-medium text-white"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.035em" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2.5 text-[15.5px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.66)" }}
                  >
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DarkBand>
      </section>

      {/* (03) Preuve (chiffres réels uniquement) */}
      {activite.proof && (
        <section className="container-x py-16 md:py-24">
          <SectionLabel index="03">Un centre qui l'utilise</SectionLabel>
          <SectionTitle className="mt-6 max-w-3xl">
            {activite.proof.client} <Accent>en chiffres.</Accent>
          </SectionTitle>
          <p
            className="mt-5 max-w-2xl text-[16.5px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {activite.proof.intro}
          </p>
          <dl
            className="mt-14 grid grid-cols-2 border-t lg:grid-cols-4 lg:divide-x"
            style={{ borderColor: HAIR }}
          >
            {activite.proof.stats.map((s, i) => (
              <div
                key={i}
                className="border-b py-8 pr-4 lg:border-b-0 lg:px-8 lg:first:pl-0"
                style={{ borderColor: HAIR }}
              >
                <dd
                  className="font-medium"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.4rem,4.4vw,4rem)",
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    color: "var(--ink)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.value}
                </dd>
                <dt className="mt-4 text-[14.5px]" style={{ color: "var(--ink)" }}>
                  {s.label}
                </dt>
                {s.note && (
                  <p className="mt-1.5 text-[12.5px]" style={{ color: "var(--green-text)" }}>
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
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionLabel index={activite.proof ? "04" : "03"}>FAQ</SectionLabel>
            <SectionTitle className="mt-6">
              Questions <Accent>fréquentes.</Accent>
            </SectionTitle>
          </div>
          <div className="border-t" style={{ borderColor: HAIR }}>
            {activite.faq.map((f, i) => (
              <details key={i} className="group border-b py-6" style={{ borderColor: HAIR }}>
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-6 text-[19px] font-medium"
                  style={{
                    color: "var(--ink)",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {f.q}
                  <Plus
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45"
                    weight="light"
                    style={{ color: "var(--green-text)" }}
                  />
                </summary>
                <p
                  className="mt-4 max-w-2xl text-[15.5px] leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LuxeClosing />
    </PageMain>
  );
}
