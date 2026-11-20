import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ChatCircleDots,
  ArrowsClockwise,
  Star,
  HandCoins,
  ArrowRight,
  ShieldCheck,
} from "@phosphor-icons/react";
import { Eyebrow } from "./primitives";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { TRIAL_URL, DEMO_URL } from "../../lib/site";
import { ACTIVITES, ACTIVITES_MENU } from "../../lib/activites-data";

const EASE = [0.16, 1, 0.3, 1] as const;

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-balance mt-5 font-semibold"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.9rem,3.6vw,3rem)",
        letterSpacing: "-0.03em",
        lineHeight: 1.08,
        color: "var(--ink)",
      }}
    >
      {children}
    </h2>
  );
}

/* ---------- Hero ---------- */
export function BeautyHero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Eyebrow>Beauté, bien-être et fitness</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="text-balance mt-6 font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem,5.2vw,4.6rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              color: "var(--ink)",
            }}
          >
            Votre planning est plein,{" "}
            <span className="accent-serif" style={{ fontSize: "1.06em" }}>
              même quand vous êtes en cabine.
            </span>
          </motion.h1>
          <p
            className="text-pretty mt-6 max-w-xl text-[17px] leading-relaxed md:text-[18px]"
            style={{ color: "var(--muted)" }}
          >
            ClientX répond à vos clientes sur Instagram, Facebook et WhatsApp, relance celles qui ne
            reviennent plus et vous apporte des avis Google. Sans commission sur vos soins.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PrimaryButton to={TRIAL_URL}>Essai gratuit 14 jours</PrimaryButton>
            <SecondaryButton to={DEMO_URL}>Voir une démo</SecondaryButton>
          </div>
          <p className="mt-5 flex items-center gap-2 text-[13px]" style={{ color: "var(--muted)" }}>
            <ShieldCheck className="h-4 w-4" weight="fill" style={{ color: "var(--green)" }} />
            Zéro commission · Mise en place accompagnée · Certifié ISO 9001
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="relative"
        >
          <div
            className="aspect-[4/3] overflow-hidden rounded-[32px]"
            style={{ boxShadow: "0 40px 80px -36px rgba(16,60,28,0.45)" }}
          >
            <img
              src="/images/activites/institut.jpg"
              alt="Soin du visage dans un institut de beauté"
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 35%" }}
            />
          </div>
          {/* Exemple de conversation (illustration) */}
          <div
            className="glass-card absolute -bottom-6 left-4 right-4 !rounded-3xl p-4 md:left-auto md:right-[-1.5rem] md:w-[19rem]"
            aria-label="Exemple de conversation"
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--green-text)" }}
            >
              Exemple · Instagram
            </p>
            <div className="mt-2 space-y-2 text-[13.5px]">
              <p
                className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-black/5 px-3 py-2"
                style={{ color: "var(--ink)" }}
              >
                Vous avez de la place samedi pour un soin du visage ?
              </p>
              <p
                className="w-fit max-w-[90%] rounded-2xl rounded-bl-md px-3 py-2"
                style={{ background: "var(--green-soft)", color: "var(--ink)" }}
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
    <section className="container-x py-14 md:py-20">
      <div className="max-w-2xl">
        <Eyebrow>Ce que votre logiciel de réservation ne fait pas</Eyebrow>
        <H2>Il prend les rendez-vous. ClientX s'occupe du reste.</H2>
        <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "var(--muted)" }}>
          Vous gardez votre façon de travailler. ClientX ajoute ce qui vous fait gagner des
          clientes.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DIFFS.map((d) => {
          const Icon = d.icon;
          return (
            <div key={d.title} className="glass-card !rounded-3xl p-7">
              <span
                className="grid h-11 w-11 place-items-center rounded-2xl"
                style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
              >
                <Icon className="h-5 w-5" weight="bold" />
              </span>
              <h3
                className="mt-5 text-[18px] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                }}
              >
                {d.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {d.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Activités ---------- */
export function BeautyActivities() {
  return (
    <section className="container-x py-10 md:py-16">
      <div className="max-w-2xl">
        <Eyebrow>Activités</Eyebrow>
        <H2>Un outil pensé pour votre métier</H2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {ACTIVITES.map((a) => (
          <Link
            key={a.slug}
            to="/activites/$slug"
            params={{ slug: a.slug }}
            className="group overflow-hidden rounded-[28px] bg-white transition-transform duration-300 hover:-translate-y-1"
            style={{
              boxShadow: "0 0 0 1px rgba(10,30,15,0.07), 0 24px 48px -28px rgba(16,60,28,0.3)",
            }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={a.image}
                alt={a.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ objectPosition: a.imagePosition ?? "50% 50%" }}
              />
            </div>
            <div className="flex items-center justify-between gap-3 p-5">
              <div>
                <h3
                  className="text-[18px] font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                  }}
                >
                  {a.name}
                </h3>
                <p className="mt-0.5 text-[13.5px]" style={{ color: "var(--muted)" }}>
                  Pour {a.audience}
                </p>
              </div>
              <ArrowRight
                className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
                weight="bold"
                style={{ color: "var(--green-text)" }}
              />
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-[14px]" style={{ color: "var(--muted)" }}>
        Bientôt :{" "}
        {ACTIVITES_MENU.filter((a) => !a.live)
          .map((a) => a.label)
          .join(", ")}
        .
      </p>
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
    <section className="container-x py-14 md:py-20">
      <div className="max-w-2xl">
        <Eyebrow>Comment ça se passe</Eyebrow>
        <H2>Prêt en quelques jours, sans compétence technique</H2>
      </div>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="relative rounded-[28px] p-7"
            style={{
              background: "linear-gradient(180deg,#f3f7f1,#eaf1e7)",
              boxShadow: "0 0 0 1px rgba(10,30,15,0.06)",
            }}
          >
            <span
              className="text-[44px] font-semibold leading-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--green-text)",
                letterSpacing: "-0.04em",
              }}
            >
              {i + 1}
            </span>
            <h3
              className="mt-4 text-[19px] font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              {s.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
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
      <div
        className="rounded-[36px] px-6 py-12 md:px-12 md:py-16"
        style={{
          background:
            "radial-gradient(700px 360px at 85% -10%, rgba(50,220,50,0.16), transparent 60%), #07100a",
          color: "#fff",
        }}
      >
        <p
          className="text-[11px] font-semibold uppercase"
          style={{ letterSpacing: "0.16em", color: "var(--green)" }}
        >
          Un réseau de centres qui l'utilise
        </p>
        <h2
          className="mt-3 max-w-2xl font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.9rem,3.6vw,3rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
          }}
        >
          {proof.client}, 11 centres de beauté
        </h2>
        <p
          className="mt-4 max-w-2xl text-[16px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.68)" }}
        >
          {proof.intro}
        </p>
        <dl
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl lg:grid-cols-4"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          {proof.stats.map((s) => (
            <div key={s.label} className="px-5 py-6 md:px-6" style={{ background: "#0b160e" }}>
              <dd
                className="font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.9rem,3.2vw,2.8rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.value}
              </dd>
              <dt className="mt-3 text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                {s.label}
              </dt>
              {s.note && (
                <p className="mt-1 text-[12px]" style={{ color: "var(--green)" }}>
                  {s.note}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
