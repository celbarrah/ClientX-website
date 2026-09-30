import { createFileRoute } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "@phosphor-icons/react";
import { PageMain } from "../components/site/primitives";
import { PrimaryButton } from "../components/site/Buttons";
import { Placeholder } from "../components/site/Hero";
import { MODULES } from "../lib/modules-data";

export const Route = createFileRoute("/fonctionnalites")({
  head: () => ({
    ...pageSeo({
      title: "Plateforme All-in-One ClientX AI — Fonctionnalités",
      description:
        "Découvrez toutes les fonctionnalités unifiées de ClientX : Tunnels, CRM, Email, WhatsApp, Calendriers, Formations et Automatisations.",
      path: "/fonctionnalites",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Fonctionnalités", path: "/fonctionnalites" }]))],
  }),
  component: FonctionnalitesPage,
});

const EASE = [0.16, 1, 0.3, 1] as const;
type Mod = (typeof MODULES)[number];

function FonctionnalitesPage() {
  const [activeId, setActiveId] = useState(MODULES[0]!.id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset["moduleId"];
            if (id) setActiveId(id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToModule = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 170;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <PageMain>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pb-10 pt-28 md:pb-14 md:pt-36">
        <div aria-hidden className="aurora pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div className="max-w-[40rem]">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
              style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--green)" }} />
              Tout votre business au même endroit
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-6 font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem,5.8vw,5.2rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.98,
              }}
            >
              <span className="grad-ink">Une Plateforme</span>
              <br />
              <span className="accent-serif" style={{ fontSize: "1.08em" }}>
                Sans Limite
              </span>
            </motion.h1>
            <p
              className="text-pretty mt-7 max-w-[34rem] text-[17px] leading-relaxed md:text-[18px]"
              style={{ color: "var(--muted)" }}
            >
              Remplacez plus de 20 abonnements isolés par un seul système unifié où chaque outil
              enrichit le suivant.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PrimaryButton to="/contact">Réserver une Démo</PrimaryButton>
            </div>
          </div>

          {/* Product bento (no clipping, natural heights) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="mesh-panel relative overflow-hidden p-3 md:p-4"
          >
            <div aria-hidden className="mesh-grid pointer-events-none absolute inset-0" />
            <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <MockTile label="Funnel Builder" />
                <MockTile label="Calendrier" />
              </div>
              <div className="flex flex-col gap-3">
                <MockTile label="Pipeline Ventes" />
                <MockTile label="Inbox Unifiée" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Sticky module nav (glass pill) ---------- */}
      <div className="sticky top-[84px] z-40 md:top-[92px]">
        <div className="container-x flex justify-center">
          <div className="glass-pill no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
            {MODULES.map((m) => {
              const isActive = activeId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => scrollToModule(m.id)}
                  className="relative shrink-0 rounded-full px-3 py-2 text-[12.5px] font-semibold transition-colors"
                  style={{ color: isActive ? "#031003" : "var(--muted)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mod-nav"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(180deg, #62f262 0%, #32dc32 55%, #25c425 100%)",
                        boxShadow:
                          "0 0 0 1px rgba(22,150,30,0.4), 0 8px 20px -8px rgba(50,220,50,0.65)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative whitespace-nowrap">{m.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Modules ---------- */}
      <div className="container-x py-10 md:py-14">
        <div className="space-y-5 md:space-y-6">
          {MODULES.map((m, i) => (
            <section
              key={m.id}
              data-module-id={m.id}
              ref={(el) => {
                sectionRefs.current[m.id] = el;
              }}
            >
              <ModuleRow m={m} i={i} featured={i === MODULES.length - 1} />
            </section>
          ))}
        </div>
      </div>

      {/* ---------- Final CTA ---------- */}
      <div className="container-x pb-14">
        <div
          className="relative overflow-hidden rounded-[32px] px-6 py-14 text-center md:py-20"
          style={{
            background:
              "radial-gradient(55% 80% at 50% 0%, rgba(50,220,50,0.22), transparent 65%), linear-gradient(180deg, #f3f5ef 0%, #eef2ea 100%)",
            boxShadow:
              "0 0 0 1px rgba(10,30,15,0.07), 0 1px 0 #fff inset, 0 40px 90px -40px rgba(16,60,28,0.35)",
          }}
        >
          <div aria-hidden className="mesh-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-[44rem]">
            <h2
              className="font-medium"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem,5vw,4rem)",
                letterSpacing: "-0.055em",
                lineHeight: 1,
                color: "#0b0f0c",
              }}
            >
              Prêt à unifier{" "}
              <span className="accent-serif" style={{ fontSize: "1.08em" }}>
                votre business ?
              </span>
            </h2>
            <p
              className="text-pretty mx-auto mt-5 max-w-xl text-[16px] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Passez à la simplicité ClientX AI et bénéficiez d'un onboarding technique 1:1 offert.
            </p>
            <div className="mt-8 flex justify-center">
              <PrimaryButton to="/contact">Réserver une Démo</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </PageMain>
  );
}

/* Small glass tile holding a product mock at its natural height */
function MockTile({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`glass-card !rounded-[20px] p-3 md:p-4 ${className}`}>
      <Placeholder label={label} />
    </div>
  );
}

/* One module = one premium card: copy on one side, product mock on the other */
function ModuleRow({ m, i, featured }: { m: Mod; i: number; featured: boolean }) {
  const Icon = m.icon;
  const flip = i % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`grid items-center gap-8 overflow-hidden p-6 md:p-10 lg:grid-cols-2 lg:gap-14 ${
        featured ? "glow-card !rounded-[32px]" : "surface-premium !rounded-[32px]"
      }`}
    >
      <div className={flip ? "lg:order-2" : ""}>
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 place-items-center rounded-xl"
            style={{
              background: featured ? "var(--green)" : "#ffffff",
              color: featured ? "#031003" : "var(--green-text)",
              boxShadow: featured
                ? "0 8px 20px -6px rgba(50,220,50,0.7)"
                : "0 0 0 1px rgba(10,30,15,0.08), 0 4px 10px -6px rgba(16,60,28,0.25)",
            }}
          >
            <Icon className="h-5 w-5" weight="regular" />
          </span>
          <span
            className="text-[11px] uppercase tracking-[0.14em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--faint)" }}
          >
            {String(i + 1).padStart(2, "0")} / {String(MODULES.length).padStart(2, "0")}
          </span>
        </div>
        <h2
          className="grad-ink mt-6 font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.9rem,3.2vw,2.8rem)",
            letterSpacing: "-0.045em",
            lineHeight: 1.05,
          }}
        >
          {m.title}
        </h2>
        <p
          className="text-pretty mt-4 max-w-[34rem] text-[16px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {m.desc}
        </p>
        <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {m.points.map((p) => (
            <div
              key={p}
              className="flex items-center gap-2.5 rounded-xl bg-white/70 px-3 py-2.5 text-[13.5px]"
              style={{
                color: "var(--text)",
                boxShadow: "0 0 0 1px rgba(10,30,15,0.06)",
              }}
            >
              <span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
                style={{ background: featured ? "var(--green)" : "var(--green-soft)" }}
              >
                <Check
                  className="h-3 w-3"
                  weight="bold"
                  style={{ color: featured ? "#031003" : "var(--green-text)" }}
                />
              </span>
              <span>{p}</span>
            </div>
          ))}
        </div>
        <a
          href="/contact"
          className="group mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold"
          style={{ color: "var(--green-text)" }}
        >
          Réserver une Démo
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            weight="bold"
          />
        </a>
      </div>

      <div className={flip ? "lg:order-1" : ""}>
        <div className="mesh-panel relative overflow-hidden !rounded-[24px] p-4 md:p-7">
          <div aria-hidden className="mesh-grid pointer-events-none absolute inset-0" />
          <div className="relative">
            <Placeholder label={m.screenshot} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
