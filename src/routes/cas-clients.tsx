import { createFileRoute, useSearch } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Warning, Lightning, TrendUp, ShieldCheck } from "@phosphor-icons/react";
import { PageHero, PageMain, FooterCTA } from "../components/site/primitives";
import { PrimaryButton } from "../components/site/Buttons";
import { SECTORS_DATA, type UseCaseDetail } from "../lib/use-cases-data";

/* Site dédié aux métiers de la beauté, du bien-être et du fitness : seul ce secteur est affiché. */
const SECTORS = SECTORS_DATA.filter((s) => s.id === "fitness");

export const Route = createFileRoute("/cas-clients")({
  validateSearch: (search: Record<string, unknown>) => ({
    secteur: (search.secteur as string) || SECTORS[0].id,
  }),
  head: () => ({
    ...pageSeo({
      title: "Nos clients — beauté, bien-être et fitness — ClientX AI",
      description:
        "Découvrez comment Morfit, Epiltech et UGolf utilisent ClientX : présence aux rendez-vous, forfaits signés, avis Google.",
      path: "/cas-clients",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Cas Clients", path: "/cas-clients" }]))],
  }),
  component: UseCasesPage,
});

const DISPLAY = "var(--font-display)";
const NEON = "#32dc32";
const NEON_SOFT = "rgba(50,220,50,0.14)";
const STAGE = "#050a06";
const TEXT_DIM = "rgba(255,255,255,0.64)";
const HAIR = "rgba(255,255,255,0.1)";

const glass: CSSProperties = {
  background: "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
  border: `1px solid ${HAIR}`,
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
};

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-[11px] font-semibold uppercase"
      style={{ letterSpacing: "0.16em", color: NEON }}
    >
      {children}
    </span>
  );
}

function JourneyNode({
  step,
  title,
  icon,
  offset,
  children,
}: {
  step: string;
  title: string;
  icon: ReactNode;
  offset: number;
  children: ReactNode;
}) {
  return (
    <div
      className="relative lg:[margin-top:var(--off)]"
      style={{ "--off": `${offset}px` } as CSSProperties}
    >
      <div className="rounded-3xl p-6 md:p-7" style={glass}>
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 place-items-center rounded-full"
            style={{
              background: NEON_SOFT,
              color: NEON,
              boxShadow: `0 0 0 1px rgba(50,220,50,0.4), 0 0 24px rgba(50,220,50,0.35)`,
            }}
          >
            {icon}
          </span>
          <div>
            <p
              className="text-[11px] font-semibold uppercase"
              style={{ letterSpacing: "0.16em", color: NEON }}
            >
              {step}
            </p>
            <h4
              className="text-[18px] font-semibold text-white"
              style={{ fontFamily: DISPLAY, letterSpacing: "-0.02em" }}
            >
              {title}
            </h4>
          </div>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function UseCasesPage() {
  const search = useSearch({ from: "/cas-clients" });
  const [selectedSectorId, setSelectedSectorId] = useState(search.secteur || SECTORS[0].id);
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  useEffect(() => {
    const fromUrl = search.secteur;
    if (fromUrl && SECTORS.some((s) => s.id === fromUrl) && fromUrl !== selectedSectorId) {
      setSelectedSectorId(fromUrl);
      setSelectedCaseIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.secteur]);

  const activeSector = SECTORS.find((s) => s.id === selectedSectorId) || SECTORS[0];
  const activeUseCase: UseCaseDetail | undefined =
    activeSector.useCases[selectedCaseIndex] || activeSector.useCases[0];
  const [hero, ...rest] = activeUseCase?.results ?? [];

  return (
    <PageMain>
      <PageHero
        eyebrow={
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
            style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--green)" }} />
            Clients
          </span>
        }
        title={
          <>
            Nos clients, <span style={{ color: "var(--green-text)" }}>leurs résultats</span>
          </>
        }
        paragraph="Instituts, centres d'épilation, salles de sport : découvrez nos clients, leurs défis et ce que ClientX a changé pour eux."
      />

      <div className="container-x pb-24">
        <div
          className="relative overflow-hidden rounded-[36px] px-5 py-10 md:px-12 md:py-14"
          style={{
            background: STAGE,
            boxShadow: "0 40px 80px -40px rgba(5,30,10,0.55)",
          }}
        >
          {/* Ambient decor: glow, grid, neon arcs */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 360px at 50% -8%, rgba(50,220,50,0.22), transparent 65%), radial-gradient(500px 300px at 100% 100%, rgba(50,220,50,0.12), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%)",
            }}
          />
          <svg
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-1/2 hidden w-[140%] -translate-x-1/2 md:block"
            viewBox="0 0 1400 300"
            fill="none"
          >
            <path
              d="M0 300 Q700 -80 1400 300"
              stroke={NEON}
              strokeWidth="2"
              opacity="0.55"
              style={{ filter: "drop-shadow(0 0 10px rgba(50,220,50,0.9))" }}
            />
          </svg>

          <div className="relative">
            {/* Sector chips */}
            <div
              className={`no-scrollbar -mx-1 gap-2.5 overflow-x-auto px-1 py-2 lg:flex-wrap lg:justify-center ${SECTORS.length > 1 ? "flex" : "hidden"}`}
              role="tablist"
              aria-label="Secteurs d'activité"
            >
              {SECTORS.map((sector) => {
                const Icon = sector.icon;
                const on = selectedSectorId === sector.id;
                return (
                  <button
                    key={sector.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setSelectedSectorId(sector.id);
                      setSelectedCaseIndex(0);
                    }}
                    className="flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-[13px] font-semibold transition-all duration-200"
                    style={
                      on
                        ? {
                            background: "linear-gradient(180deg,#8bff5a 0%,#32dc32 100%)",
                            color: "#031003",
                            boxShadow:
                              "0 0 0 1px rgba(160,255,120,0.6), 0 0 28px rgba(50,220,50,0.55)",
                          }
                        : { ...glass, color: TEXT_DIM }
                    }
                  >
                    <Icon className="h-4 w-4" weight={on ? "fill" : "regular"} />
                    <span className="whitespace-nowrap">{sector.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Sector heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mx-auto mt-12 max-w-3xl text-center"
              >
                <Eyebrow>{activeSector.badge}</Eyebrow>
                <h2
                  className="text-balance mt-3 font-semibold text-white"
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: "clamp(2rem,4.4vw,3.4rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.05,
                  }}
                >
                  {activeSector.title}
                </h2>
                <p className="text-pretty mt-3 text-[16px]" style={{ color: TEXT_DIM }}>
                  {activeSector.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Client switcher */}
            <div
              className="no-scrollbar mt-9 flex gap-2 overflow-x-auto py-1 sm:justify-center"
              role="tablist"
              aria-label="Clients du secteur"
            >
              {activeSector.useCases.map((uc, idx) => {
                const on = idx === selectedCaseIndex;
                return (
                  <button
                    key={uc.name}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setSelectedCaseIndex(idx)}
                    className="flex shrink-0 items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-[14px] font-semibold transition-colors"
                    style={
                      on ? { background: "#fff", color: "#04110a" } : { ...glass, color: "#fff" }
                    }
                  >
                    <span
                      className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold"
                      style={{
                        background: on ? "#04110a" : NEON_SOFT,
                        color: NEON,
                      }}
                    >
                      {uc.initials}
                    </span>
                    {uc.name}
                  </button>
                );
              })}
            </div>

            {activeUseCase && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedSectorId}-${selectedCaseIndex}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Folder card */}
                  <div className="relative mx-auto mt-12 max-w-5xl">
                    {/* Folder tab */}
                    <div
                      className="relative z-10 ml-6 inline-flex items-center gap-3 rounded-t-2xl px-5 pb-3 pt-3 md:ml-10"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(50,220,50,0.34), rgba(50,220,50,0.16))",
                        border: "1px solid rgba(50,220,50,0.45)",
                        borderBottom: "none",
                        boxShadow: "0 -8px 30px -8px rgba(50,220,50,0.45)",
                      }}
                    >
                      <span
                        className="grid h-8 w-8 place-items-center rounded-lg text-[12px] font-bold"
                        style={{ background: "#04110a", color: NEON }}
                      >
                        {activeUseCase.initials}
                      </span>
                      <span className="text-[14px] font-semibold text-white">
                        {activeUseCase.name}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-semibold"
                        style={{ background: "rgba(0,0,0,0.35)", color: NEON }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: NEON }} />
                        {activeUseCase.status}
                      </span>
                    </div>

                    <div
                      className="relative -mt-px overflow-hidden rounded-[32px] rounded-tl-none p-6 md:p-10"
                      style={{
                        background:
                          "linear-gradient(155deg, rgba(50,220,50,0.2) 0%, rgba(50,220,50,0.06) 45%, rgba(255,255,255,0.03) 100%)",
                        border: "1px solid rgba(50,220,50,0.4)",
                        boxShadow:
                          "0 0 60px -10px rgba(50,220,50,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                      }}
                    >
                      {(activeUseCase.image ?? activeSector.image) && (
                        <div className="relative -mx-6 -mt-6 mb-2 aspect-4/3 overflow-hidden sm:aspect-video md:-mx-10 md:-mt-10 md:aspect-[2.3/1]">
                          <img
                            key={activeUseCase.image ?? activeSector.image}
                            src={activeUseCase.image ?? activeSector.image}
                            alt={`${activeUseCase.name} — ${activeUseCase.sub}`}
                            className="h-full w-full object-cover"
                            style={{ objectPosition: activeUseCase.imagePosition ?? "50% 50%" }}
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(4,14,7,0) 55%, rgba(4,14,7,0.92) 100%)",
                            }}
                          />
                        </div>
                      )}
                      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                        <div>
                          <Eyebrow>{activeUseCase.sub}</Eyebrow>
                          <h3
                            className="text-balance mt-3 font-semibold text-white"
                            style={{
                              fontFamily: DISPLAY,
                              fontSize: "clamp(2.4rem,5vw,4rem)",
                              letterSpacing: "-0.045em",
                              lineHeight: 1,
                            }}
                          >
                            {activeUseCase.name}
                          </h3>
                          <p
                            className="text-pretty mt-5 max-w-xl text-[16px] leading-[1.7]"
                            style={{ color: TEXT_DIM }}
                          >
                            {activeUseCase.summary}
                          </p>
                        </div>

                        {hero && (
                          <div>
                            <div
                              className="rounded-3xl p-6"
                              style={{
                                background: "rgba(3,10,5,0.55)",
                                border: "1px solid rgba(50,220,50,0.35)",
                                boxShadow: "0 0 40px -12px rgba(50,220,50,0.5)",
                              }}
                            >
                              <p
                                className="font-semibold"
                                style={{
                                  fontFamily: DISPLAY,
                                  fontSize: "clamp(2.8rem,6vw,4.6rem)",
                                  letterSpacing: "-0.05em",
                                  lineHeight: 1,
                                  color: NEON,
                                  textShadow: "0 0 32px rgba(50,220,50,0.45)",
                                  fontVariantNumeric: "tabular-nums",
                                }}
                              >
                                {hero.val}
                              </p>
                              <p className="mt-3 text-[14px] text-white">{hero.label}</p>
                              {hero.pct && (
                                <p
                                  className="mt-1 text-[12.5px] font-semibold"
                                  style={{ color: NEON }}
                                >
                                  {hero.pct}
                                </p>
                              )}
                            </div>
                            {rest.length > 0 && (
                              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                                {rest.map((r, i) => (
                                  <div key={i} className="rounded-2xl p-4" style={glass}>
                                    <p
                                      className="font-semibold text-white"
                                      style={{
                                        fontFamily: DISPLAY,
                                        fontSize: "clamp(1.25rem,2vw,1.6rem)",
                                        letterSpacing: "-0.03em",
                                        fontVariantNumeric: "tabular-nums",
                                      }}
                                    >
                                      {r.val}
                                    </p>
                                    {r.pct && (
                                      <p
                                        className="mt-0.5 text-[11px] font-semibold"
                                        style={{ color: NEON }}
                                      >
                                        {r.pct}
                                      </p>
                                    )}
                                    <p
                                      className="mt-1.5 text-[12px] leading-snug"
                                      style={{ color: TEXT_DIM }}
                                    >
                                      {r.label}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Journey: Défi → Solution → Résultat */}
                  <div className="relative mx-auto mt-16 max-w-6xl">
                    <svg
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 hidden h-full w-full lg:block"
                      viewBox="0 0 1000 400"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="journey" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0" stopColor={NEON} stopOpacity="0.15" />
                          <stop offset="1" stopColor={NEON} stopOpacity="0.9" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 340 C 200 360, 260 230, 500 230 S 800 110, 1000 60"
                        stroke="url(#journey)"
                        strokeWidth="2"
                        strokeDasharray="6 8"
                        vectorEffect="non-scaling-stroke"
                        style={{ filter: "drop-shadow(0 0 8px rgba(50,220,50,0.7))" }}
                      />
                    </svg>

                    <div className="relative grid gap-5 lg:grid-cols-3 lg:gap-7">
                      <JourneyNode
                        step="Étape 01"
                        title="Le défi"
                        icon={<Warning className="h-5 w-5" weight="fill" />}
                        offset={90}
                      >
                        <p className="text-[14.5px] leading-relaxed" style={{ color: TEXT_DIM }}>
                          {activeUseCase.context}
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {activeUseCase.defis.map((d, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-[13.5px] leading-relaxed text-white/85"
                            >
                              <span
                                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{
                                  background: NEON,
                                  boxShadow: "0 0 8px rgba(50,220,50,0.9)",
                                }}
                              />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </JourneyNode>

                      <JourneyNode
                        step="Étape 02"
                        title="La solution ClientX AI"
                        icon={<Lightning className="h-5 w-5" weight="fill" />}
                        offset={45}
                      >
                        <p className="text-[14.5px] leading-[1.7]" style={{ color: TEXT_DIM }}>
                          {activeSector.solution}
                        </p>
                      </JourneyNode>

                      <JourneyNode
                        step="Étape 03"
                        title="Le résultat"
                        icon={<TrendUp className="h-5 w-5" weight="bold" />}
                        offset={0}
                      >
                        <p
                          className="text-pretty text-[19px] font-medium leading-snug text-white"
                          style={{ fontFamily: DISPLAY, letterSpacing: "-0.02em" }}
                        >
                          {activeSector.results}
                        </p>
                      </JourneyNode>
                    </div>
                  </div>

                  {/* Footer bar */}
                  <div
                    className="mx-auto mt-14 flex max-w-5xl flex-col items-start justify-between gap-5 rounded-full px-6 py-4 sm:flex-row sm:items-center"
                    style={{ ...glass, borderColor: "rgba(50,220,50,0.3)" }}
                  >
                    <div
                      className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]"
                      style={{ color: TEXT_DIM }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" weight="fill" style={{ color: NEON }} />
                        Certifié ISO 9001
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" weight="fill" style={{ color: NEON }} />
                        Conforme RGPD
                      </span>
                    </div>
                    <PrimaryButton to="/contact">
                      Réserver une démo
                      <ArrowRight className="ml-1 h-4 w-4" weight="bold" />
                    </PrimaryButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      <FooterCTA />
    </PageMain>
  );
}
