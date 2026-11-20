import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ChatCircleDots,
  ArrowsClockwise,
  Star,
  HandCoins,
  ArrowUpRight,
  ShieldCheck,
} from "@phosphor-icons/react";
import { Eyebrow } from "./primitives";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import {
  SectionLabel,
  SectionTitle,
  Accent,
  DarkBand,
  LuxeMarquee,
  HAIR,
  HAIR_DARK,
  NEON,
} from "./PremiumBlocks";
import { TRIAL_URL, DEMO_URL } from "../../lib/site";
import { ACTIVITES } from "../../lib/activites-data";

const EASE = [0.16, 1, 0.3, 1] as const;
const ARCH = "999px 999px 32px 32px";

/* ---------- Hero ---------- */
export function BeautyHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>Beauté, bien-être et fitness</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="text-balance mt-6 font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem,5.8vw,5.2rem)",
              letterSpacing: "-0.045em",
              lineHeight: 1,
              color: "var(--ink)",
            }}
          >
            Votre planning est plein, <Accent>même quand vous êtes en cabine.</Accent>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="text-pretty mt-7 max-w-xl text-[17px] leading-[1.7] md:text-[18px]"
            style={{ color: "var(--muted)" }}
          >
            ClientX répond à vos clientes sur Instagram, Facebook et WhatsApp, relance celles qui ne
            reviennent plus et vous apporte des avis Google. Sans commission sur vos soins.
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
          <p className="mt-6 flex items-center gap-2 text-[13px]" style={{ color: "var(--muted)" }}>
            <ShieldCheck className="h-4 w-4" weight="fill" style={{ color: NEON }} />
            Zéro commission · Mise en place accompagnée · Certifié ISO 9001
          </p>
        </div>

        {/* Photo en arche, cadre vert décalé */}
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
              src="/images/activites/institut.jpg"
              alt="Soin du visage dans un institut de beauté"
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(7,16,10,0) 55%, rgba(7,16,10,0.5) 100%)",
              }}
            />
          </div>

          {/* Exemple de conversation (illustration) */}
          <div
            className="absolute -bottom-7 -left-3 right-6 rounded-3xl p-4 md:-left-10 md:right-auto md:w-[20rem]"
            aria-label="Exemple de conversation"
            style={{
              background: "rgba(7,16,10,0.9)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${HAIR_DARK}`,
              boxShadow: "0 30px 60px -24px rgba(7,16,10,0.6)",
            }}
          >
            <p
              className="text-[10.5px] uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: NEON }}
            >
              Exemple · Instagram
            </p>
            <div className="mt-3 space-y-2 text-[13.5px] leading-snug">
              <p
                className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md px-3.5 py-2.5"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
              >
                Vous avez de la place samedi pour un soin du visage ?
              </p>
              <p
                className="w-fit max-w-[92%] rounded-2xl rounded-bl-md px-3.5 py-2.5"
                style={{ background: "rgba(50,220,50,0.18)", color: "#eaffea" }}
              >
                Oui ! Samedi à 10h30 ou 14h. Lequel vous convient ?
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function BeautyMarquee() {
  return (
    <LuxeMarquee
      items={[
        "Instagram",
        "Facebook",
        "WhatsApp",
        "Avis Google",
        "Zéro commission",
        "Clientes fidèles",
        "Planning plein",
      ]}
    />
  );
}

/* ---------- Ce que les logiciels de réservation ne font pas ---------- */
const DIFFS = [
  {
    icon: ChatCircleDots,
    title: "Une assistante qui répond pour vous",
    text: "Sur Instagram, Facebook et WhatsApp, elle répond aux questions et propose un créneau libre, même pendant un soin.",
  },
  {
    icon: ArrowsClockwise,
    title: "Les clientes inactives reviennent",
    text: "Un message personnalisé part aux clientes que vous n'avez pas vues depuis un moment.",
  },
  {
    icon: Star,
    title: "Plus d'avis Google",
    text: "Après chaque passage, une demande d'avis est envoyée. Vous gagnez en visibilité près de chez vous.",
  },
  {
    icon: HandCoins,
    title: "Zéro commission",
    text: "Un abonnement fixe. Vos clientes restent les vôtres, et rien n'est prélevé sur vos soins.",
  },
];

export function BeautyDifferences() {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <SectionLabel index="01">Ce que votre logiciel de réservation ne fait pas</SectionLabel>
          <SectionTitle className="mt-6">
            Il prend les rendez-vous. <Accent>ClientX s'occupe du reste.</Accent>
          </SectionTitle>
        </div>
        <p
          className="max-w-sm text-[16px] leading-relaxed lg:justify-self-end"
          style={{ color: "var(--muted)" }}
        >
          Vous gardez votre façon de travailler. ClientX ajoute ce qui vous fait gagner des
          clientes.
        </p>
      </div>

      <div
        className="mt-14 grid border-t sm:grid-cols-2 lg:grid-cols-4 lg:divide-x"
        style={{ borderColor: HAIR }}
      >
        {DIFFS.map((d, i) => {
          const Icon = d.icon;
          return (
            <div
              key={d.title}
              className="border-b py-9 sm:px-7 lg:border-b-0 lg:first:pl-0 lg:last:pr-0"
              style={{ borderColor: HAIR }}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-7 w-7" weight="light" style={{ color: "var(--green-text)" }} />
                <span
                  className="text-[11px] tracking-[0.16em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--faint)" }}
                >
                  0{i + 1}
                </span>
              </div>
              <h3
                className="mt-8 text-[21px] font-medium"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                  lineHeight: 1.15,
                }}
              >
                {d.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {d.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Activités : arches photo, décalées ---------- */
export function BeautyActivities() {
  return (
    <section className="container-x py-10 md:py-16">
      <SectionLabel index="02">Activités</SectionLabel>
      <SectionTitle className="mt-6 max-w-3xl">
        Un outil pensé pour <Accent>votre métier.</Accent>
      </SectionTitle>

      <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIVITES.map((a, i) => (
          <motion.div
            key={a.slug}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.1 }}
            className={i % 2 === 1 ? "lg:mt-12" : ""}
          >
            <Link to="/activites/$slug" params={{ slug: a.slug }} className="group block">
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ borderRadius: ARCH, boxShadow: "0 40px 70px -40px rgba(7,16,10,0.5)" }}
              >
                <img
                  src={a.image}
                  alt={a.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-[1.05]"
                  style={{ objectPosition: a.imagePosition ?? "50% 50%" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(7,16,10,0) 55%, rgba(7,16,10,0.7) 100%)",
                  }}
                />
                <span
                  className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-black"
                  style={{ border: "1px solid rgba(255,255,255,0.55)", color: "#fff" }}
                >
                  <ArrowUpRight className="h-5 w-5" weight="bold" />
                </span>
              </div>
              <div className="mt-6">
                <p
                  className="text-[11px] uppercase tracking-[0.16em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--green-text)" }}
                >
                  Pour {a.audience}
                </p>
                <h3
                  className="mt-2 text-[26px] font-medium"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.045em",
                    lineHeight: 1,
                    color: "var(--ink)",
                  }}
                >
                  {a.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Comment ça se passe ---------- */
const STEPS = [
  {
    title: "On configure avec vous",
    text: "Vos soins, vos tarifs, vos horaires et votre façon de parler : la mise en place est accompagnée.",
  },
  {
    title: "L'assistante répond et relance",
    text: "Elle répond à vos clientes, propose des créneaux et relance celles qui ne reviennent plus.",
  },
  {
    title: "Vous suivez vos résultats",
    text: "Vous voyez qui a réservé, qui est revenue et quels avis Google sont arrivés.",
  },
];

export function BeautySteps() {
  return (
    <section className="container-x py-16 md:py-24">
      <SectionLabel index="03">Comment ça se passe</SectionLabel>
      <SectionTitle className="mt-6 max-w-3xl">
        Prêt en quelques jours, <Accent>sans compétence technique.</Accent>
      </SectionTitle>
      <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
        {STEPS.map((s, i) => (
          <li key={s.title} className="border-t pt-7" style={{ borderColor: HAIR }}>
            <span
              className="font-medium"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "5rem",
                lineHeight: 0.85,
                letterSpacing: "-0.06em",
                color: "var(--green-text)",
              }}
            >
              0{i + 1}
            </span>
            <h3
              className="mt-7 text-[24px] font-medium"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                color: "var(--ink)",
              }}
            >
              {s.title}
            </h3>
            <p
              className="mt-3 max-w-sm text-[15.5px] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {s.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Preuve : chiffres réels Epiltech ---------- */
export function BeautyProof() {
  const proof = ACTIVITES.find((a) => a.proof)?.proof;
  if (!proof) return null;
  return (
    <section className="container-x py-6 md:py-10">
      <DarkBand className="px-6 py-14 md:px-14 md:py-20">
        <SectionLabel index="04" dark>
          Un réseau de centres qui l'utilise
        </SectionLabel>
        <SectionTitle dark className="mt-6 max-w-3xl">
          {proof.client}, <Accent dark>11 centres</Accent> de beauté.
        </SectionTitle>
        <p
          className="mt-5 max-w-2xl text-[16.5px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.66)" }}
        >
          {proof.intro}
        </p>
        <dl
          className="mt-14 grid grid-cols-2 border-t lg:grid-cols-4 lg:divide-x"
          style={{ borderColor: HAIR_DARK }}
        >
          {proof.stats.map((s) => (
            <div
              key={s.label}
              className="border-b py-8 pr-4 lg:border-b-0 lg:px-8 lg:first:pl-0"
              style={{ borderColor: HAIR_DARK }}
            >
              <dd
                className="font-medium"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem,4.4vw,4rem)",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.value}
              </dd>
              <dt className="mt-4 text-[14px]" style={{ color: "rgba(255,255,255,0.72)" }}>
                {s.label}
              </dt>
              {s.note && (
                <p className="mt-1.5 text-[12.5px]" style={{ color: NEON }}>
                  {s.note}
                </p>
              )}
            </div>
          ))}
        </dl>
      </DarkBand>
    </section>
  );
}
