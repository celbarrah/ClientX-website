import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, CaretRight } from "@phosphor-icons/react";
import { SpotlightPanel } from "./primitives";
import {
  PLANS,
  INCLUDED_GROUPS,
  AI_AGENTS,
  type Region,
  type Plan,
  type PlanRegion,
} from "../../lib/site";
import { Link } from "@tanstack/react-router";
import { detectCountry } from "../../hooks/useGeoCalendar";

export type { Region };

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Region helpers ---------- */
/** First guess before the IP lookup returns: Moroccan time zone → MAD, else €. */
export function defaultRegion(): Region {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Casablanca")) return "ma";
  } catch {
    /* ignore */
  }
  return "fr";
}

/* Location-based pricing: visitors in Morocco (IP) see MAD, everyone else sees €. */
export function useGeoRegion(setRegion: (r: Region) => void) {
  useEffect(() => {
    try {
      localStorage.removeItem("clientx-region"); // clear any old manual choice
    } catch {
      /* ignore */
    }
    let alive = true;
    detectCountry().then((c) => {
      if (alive && c) setRegion(c === "MA" ? "ma" : "fr");
    });
    return () => {
      alive = false;
    };
  }, [setRegion]);
}

/* ---------- Light region switch (segmented pill) ---------- */
export function RegionSwitch({
  region,
  setRegion,
}: {
  region: Region;
  setRegion: (r: Region) => void;
}) {
  const opts: { id: Region; label: string }[] = [
    { id: "fr", label: "France (€)" },
    { id: "ma", label: "Maroc (MAD)" },
  ];
  return (
    <div
      className="inline-flex rounded-full border p-1"
      style={{
        borderColor: "var(--line-strong)",
        background: "var(--surface)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {opts.map((o) => {
        const isActive = region === o.id;
        return (
          <button
            key={o.id}
            onClick={() => {
              setRegion(o.id);
              try {
                localStorage.setItem("clientx-region", o.id);
              } catch {
                /* ignore */
              }
            }}
            className="relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors"
            style={{ color: isActive ? "var(--ink)" : "var(--muted)" }}
          >
            {isActive && (
              <motion.span
                layoutId="region-pill-light"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "var(--surface)",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--line-strong)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative whitespace-nowrap">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- French number formatting ---------- */
function fmtPrice(n: number, currency: "€" | "MAD") {
  return (
    new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) +
    (currency === "€" ? " €" : " MAD")
  );
}
/** Annual price → "per day" price, rounded up to a whole unit (990 € / an → 3 € / jour). */
export function dailyPrice(annual: number) {
  return Math.ceil(annual / 365);
}

/* ---------- Animated price counter (ink) ---------- */
function PriceCounter({ value, currency }: { value: number; currency: "€" | "MAD" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(value);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setDisplay(value);
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, done]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}>
      {fmtPrice(display, currency)}
    </span>
  );
}

/* ---------- Single pricing card — featured plan is the dark "hero" card ---------- */
function PricingCard({ plan, region, ctaTo }: { plan: Plan; region: Region; ctaTo: string }) {
  const r: PlanRegion = plan.regions[region];
  const featured = !!plan.featured;
  const fg = "var(--ink)";
  const sub = featured ? "#2f5a3a" : "var(--muted)";
  const line = featured ? "rgba(22,120,40,0.18)" : "var(--line)";
  const dailyStr = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(
    dailyPrice(r.price),
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`relative flex h-full flex-col overflow-hidden !rounded-[28px] p-7 text-left md:p-9 ${
        featured ? "glow-card lg:-my-4 lg:py-12" : "glass-card glass-card-hover"
      }`}
      style={{ color: fg }}
    >
      {/* Header: Name + Badge */}
      <div className="relative flex items-center justify-between gap-3">
        <h3 className="text-[18px] font-semibold tracking-tight" style={{ color: fg }}>
          {plan.name}
        </h3>
        {plan.badge && (
          <span
            className="shrink-0 rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em]"
            style={{
              background: "var(--green)",
              color: "#000000",
              fontFamily: "var(--font-mono)",
            }}
          >
            {plan.badge}
          </span>
        )}
      </div>

      {/* Description */}
      <p
        className="text-pretty relative mt-3 min-h-[48px] text-[14px] leading-relaxed"
        style={{ color: sub }}
      >
        {plan.desc}
      </p>

      {/* Price — "À partir de X / jour" (derived from the annual price) */}
      <div className="relative mt-7">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ fontFamily: "var(--font-mono)", color: featured ? "#2f5a3a" : "var(--faint)" }}
        >
          À partir de
        </span>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span
            className="whitespace-nowrap font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem,4vw,3.4rem)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: fg,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {dailyStr}
            <span style={{ fontSize: "0.55em", letterSpacing: "-0.02em", marginLeft: "0.2em" }}>
              {r.currency === "€" ? "€" : "MAD"}
            </span>
          </span>
          <span className="whitespace-nowrap text-[15px] font-medium" style={{ color: sub }}>
            / jour
          </span>
        </div>
      </div>

      <div className="relative my-7 h-px w-full" style={{ background: line }} />

      {/* Users / Contacts */}
      <div className="relative space-y-3 text-[14px]">
        <div className="flex items-center justify-between">
          <span style={{ color: sub }}>Utilisateurs</span>
          <span className="font-semibold" style={{ color: fg }}>
            {plan.users}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ color: sub }}>Contacts CRM</span>
          <span className="font-semibold" style={{ color: fg }}>
            {plan.contacts}
          </span>
        </div>
      </div>

      {/* Check list */}
      <div className="relative mt-7 space-y-3 text-[14px]">
        {[
          "Sites & Funnels illimités",
          "CRM & Pipelines de vente",
          "Automatisations & Workflows",
        ].map((t) => (
          <div key={t} className="flex items-center gap-2.5">
            <span
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
              style={{ background: featured ? "var(--green)" : "var(--green-soft)" }}
            >
              <Check
                weight="bold"
                className="h-3 w-3"
                style={{ color: featured ? "#031003" : "var(--green-text)" }}
              />
            </span>
            <span style={{ color: "var(--text)" }}>{t}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="relative mt-auto pt-9">
        <a
          href={ctaTo}
          className={`group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] ${featured ? "btn-glow" : ""}`}
          style={
            featured
              ? {
                  background: "var(--green)",
                  color: "#000000",
                  boxShadow: "var(--shadow-green-glow)",
                }
              : { background: "#000000", color: "#ffffff", boxShadow: "var(--shadow-sm)" }
          }
        >
          Réserver une Démo
          <CaretRight
            weight="bold"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[14px]">
      <span style={{ color: "var(--muted)" }}>{label}</span>
      <span className="font-semibold" style={{ color: "var(--ink)" }}>
        {value}
      </span>
    </div>
  );
}

/* ---------- Pricing cards grid (shared) ---------- */
export function PricingCards({ region, ctaTo = "/contact" }: { region: Region; ctaTo?: string }) {
  return (
    <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-6">
      {PLANS.map((p) => (
        <div key={p.name} className="relative">
          <PricingCard plan={p} region={region} ctaTo={ctaTo} />
        </div>
      ))}
    </div>
  );
}

/* ---------- Home pricing section (light, on canvas) ---------- */
export function PricingSection() {
  // Prices are shown in euros for every visitor (France, Maroc and elsewhere).
  const region: Region = "fr";
  return (
    <section
      id="tarifs"
      className="relative overflow-hidden py-12 md:py-16"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        aria-hidden
        className="orb left-1/2 top-[45%] h-[520px] w-[760px] -translate-x-1/2 opacity-50"
      />
      <div className="container-x relative">
        <div className="flex flex-col items-center text-center">
          <span className="label">Tarifs · Paiement annuel</span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-balance mt-4 font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--ink)",
            }}
          >
            <span className="grad-ink">Choisissez le plan adapté à votre</span>{" "}
            <span className="accent-serif" style={{ fontSize: "1.08em" }}>
              ambition.
            </span>
          </motion.h2>
          <p
            className="text-pretty mt-4 text-[17px] leading-relaxed"
            style={{ color: "var(--muted)", maxWidth: "44rem" }}
          >
            Un seul CRM IA pour vos sites, vos contacts, vos emails, vos rendez-vous et vos
            automatisations.
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={region}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-12"
          >
            <PricingCards region={region} ctaTo="/contact" />
          </motion.div>
        </AnimatePresence>
        <p className="mt-10 text-center text-[15px]" style={{ color: "var(--muted)" }}>
          Toutes les fonctionnalités cœur incluses dans les trois formules.{" "}
          <Link
            to="/tarifs"
            className="font-semibold underline-grow"
            style={{ color: "var(--green-text)" }}
          >
            Voir le détail des tarifs →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ---------- Included in all plans (3 columns) — dark tiles ---------- */
/* ---------- Included in all plans (3 columns) — White theme ---------- */
export function IncludedGroupsSection() {
  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: "transparent" }}>
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <h2
            className="text-balance font-semibold text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", color: "#000000" }}
          >
            Inclus dans les <span style={{ color: "var(--green-text)" }}>trois formules</span>
          </h2>
          <p
            className="text-pretty mt-4 text-[17px] leading-relaxed"
            style={{ color: "var(--muted)", maxWidth: "44rem" }}
          >
            Toutes les fonctionnalités cœur, interconnectées nativement.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {INCLUDED_GROUPS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
              className="rounded-[24px] border p-7 shadow-xs"
              style={{ background: "#ffffff", borderColor: "var(--line-strong)" }}
            >
              <h3
                className="mb-5 text-[17px] font-bold tracking-tight"
                style={{ color: "#000000" }}
              >
                {g.title}
              </h3>
              <ul className="space-y-3.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px]"
                    style={{ color: "#1a1a1a" }}
                  >
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      style={{ background: "var(--green-soft)" }}
                    >
                      <Check
                        className="h-3 w-3"
                        weight="bold"
                        style={{ color: "var(--green-text)" }}
                      />
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-[13px]" style={{ color: "var(--muted)" }}>
          * Volumes indicatifs.
        </p>
      </div>
    </section>
  );
}

/* ---------- AI agents consumption — White theme ---------- */
export function AIAgentsSection() {
  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: "transparent" }}>
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <h2
            className="text-balance font-semibold text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", color: "#000000" }}
          >
            Consommation des <span style={{ color: "var(--green-text)" }}>agents IA</span>
          </h2>
          <p
            className="text-pretty mt-4 text-[17px] leading-relaxed"
            style={{ color: "var(--muted)", maxWidth: "44rem" }}
          >
            Facturée en supplément de l'abonnement, débitée au fil de l'usage sur un solde prépayé.
            Tarifs en euros, identiques en France et au Maroc.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {AI_AGENTS.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.05 }}
                className="rounded-[24px] border p-7 shadow-xs"
                style={{ background: "#ffffff", borderColor: "var(--line-strong)" }}
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
                >
                  <Icon className="h-6 w-6" weight="regular" />
                </span>
                <h3 className="mt-4 text-[17px] font-bold" style={{ color: "#000000" }}>
                  {agent.name}
                </h3>
                <div className="mt-4 space-y-2.5">
                  {agent.rates.map((rate, j) => (
                    <div key={j} className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px]" style={{ color: "var(--muted)" }}>
                        {rate.unit}
                      </span>
                      <span
                        className="shrink-0 text-[18px] font-bold"
                        style={{ color: "#000000", fontVariantNumeric: "tabular-nums" }}
                      >
                        {rate.price}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div
            className="rounded-[24px] border p-7 shadow-xs"
            style={{ background: "#ffffff", borderColor: "var(--line-strong)" }}
          >
            <h3 className="mb-2 text-[16px] font-bold" style={{ color: "#000000" }}>
              Solde prépayé
            </h3>
            <p className="text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
              La consommation est débitée du solde du compte, rechargeable par carte bancaire.
            </p>
          </div>
          <div
            className="rounded-[24px] border p-7 shadow-xs"
            style={{ background: "#ffffff", borderColor: "var(--line-strong)" }}
          >
            <h3 className="mb-2 text-[16px] font-bold" style={{ color: "#000000" }}>
              Tarifs en euros
            </h3>
            <p className="text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
              Les tarifs de consommation sont exprimés en euros, pour la France comme pour le Maroc.
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-[13px]" style={{ color: "var(--muted)" }}>
          Les tarifs de consommation peuvent évoluer selon les conditions appliquées par les
          fournisseurs. ClientX Ltd · WBX SARL
        </p>
      </div>
    </section>
  );
}

/* ---------- Dark section header (for use inside spotlight panels) ---------- */
function DarkSectionHeader({ title, paragraph }: { title: React.ReactNode; paragraph?: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-balance font-semibold"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "var(--on-dark)",
        }}
      >
        {title}
      </motion.h2>
      {paragraph && (
        <p
          className="text-pretty mt-5 text-[17px] leading-relaxed"
          style={{ color: "var(--on-dark-muted)", maxWidth: "44rem" }}
        >
          {paragraph}
        </p>
      )}
    </div>
  );
}
