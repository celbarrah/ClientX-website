import { createFileRoute, useSearch } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Warning, CheckCircle } from "@phosphor-icons/react";
import { PageHero, PageMain, FooterCTA } from "../components/site/primitives";
import { PrimaryButton } from "../components/site/Buttons";
import { SECTORS_DATA, type UseCaseDetail } from "../lib/use-cases-data";

export const Route = createFileRoute("/cas-clients")({
  validateSearch: (search: Record<string, unknown>) => ({
    secteur: (search.secteur as string) || SECTORS_DATA[0].id,
  }),
  head: () => ({
    ...pageSeo({
      title: "Cas d'Usage & Cas Clients par Secteur — ClientX AI",
      description:
        "Découvrez nos cas clients réels par secteur : Automobile (Ford, Opel), Fitness (Morfit, Epiltech, UGolf), Immobilier, et plus.",
      path: "/cas-clients",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Cas Clients", path: "/cas-clients" }]))],
  }),
  component: UseCasesPage,
});

function UseCasesPage() {
  const search = useSearch({ from: "/cas-clients" });
  const [selectedSectorId, setSelectedSectorId] = useState(search.secteur || SECTORS_DATA[0].id);
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  useEffect(() => {
    const fromUrl = search.secteur;
    if (fromUrl && SECTORS_DATA.some((s) => s.id === fromUrl) && fromUrl !== selectedSectorId) {
      setSelectedSectorId(fromUrl);
      setSelectedCaseIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.secteur]);

  const activeSector = SECTORS_DATA.find((s) => s.id === selectedSectorId) || SECTORS_DATA[0];
  const activeUseCase: UseCaseDetail | undefined =
    activeSector.useCases[selectedCaseIndex] || activeSector.useCases[0];
  const SectorIcon = activeSector.icon;

  return (
    <PageMain>
      <PageHero
        eyebrow={
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
            style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--green)" }} />
            Par secteur d'activité
          </span>
        }
        title={
          <>
            Nos Cas Clients <span style={{ color: "var(--green-text)" }}>par Secteur</span>
          </>
        }
        paragraph="Sélectionnez un secteur pour découvrir nos clients concrets, leurs défis et les solutions logicielles IA que nous avons déployées."
      />

      <div className="container-x pb-20">
        {/* Sector selector */}
        <div className="mx-auto max-w-4xl">
          <div
            className="no-scrollbar mask-fade-x flex gap-1.5 overflow-x-auto rounded-full border p-1.5"
            style={{ borderColor: "var(--line)", background: "var(--surface)" }}
          >
            {SECTORS_DATA.map((sector) => {
              const Icon = sector.icon;
              const isSelected = selectedSectorId === sector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => {
                    setSelectedSectorId(sector.id);
                    setSelectedCaseIndex(0);
                  }}
                  className="relative flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2.5 text-[12px] font-medium transition-colors"
                  style={{ color: isSelected ? "#fff" : "var(--muted)" }}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="sector-tab"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--ink)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    className="relative h-4 w-4 shrink-0"
                    weight={isSelected ? "fill" : "regular"}
                  />
                  <span className="relative whitespace-nowrap">{sector.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sector header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"
          >
            <h2
              className="text-balance font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem,2.5vw,2rem)",
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              Clients &amp; Cas Déployés :{" "}
              <span style={{ color: "var(--green-text)" }}>{activeSector.title}</span>
            </h2>
            <span
              className="shrink-0 rounded-full px-4 py-1.5 text-[12px] font-semibold"
              style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
            >
              {activeSector.useCases.length} cas concrets disponibles
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Case selector grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {activeSector.useCases.map((uc, idx) => {
            const isCaseSelected = idx === selectedCaseIndex;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCaseIndex(idx)}
                className="card flex h-full flex-col justify-between p-6 text-left"
                style={{
                  borderColor: isCaseSelected ? "var(--ink)" : "var(--line)",
                  borderWidth: isCaseSelected ? 1.5 : 1,
                }}
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[15px] font-bold"
                        style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
                      >
                        {uc.initials}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[16px] font-bold" style={{ color: "var(--ink)" }}>
                          {uc.name}
                        </h3>
                        <p className="text-[12px]" style={{ color: "var(--muted)" }}>
                          {uc.sub}
                        </p>
                      </div>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold"
                      style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
                    >
                      {uc.status}
                    </span>
                  </div>
                  <p
                    className="text-pretty text-[13px] leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {uc.summary}
                  </p>
                </div>
                <div
                  className="mt-5 flex items-center justify-between border-t pt-4 text-[12px] font-semibold"
                  style={{ borderColor: "var(--line)", color: "var(--green-text)" }}
                >
                  <span>{isCaseSelected ? "Cas sélectionné ✓" : "Voir le détail complet"}</span>
                  <ArrowRight className="h-4 w-4" weight="bold" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Case detail panel */}
        {activeUseCase && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedSectorId}-${selectedCaseIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="card mt-10 p-8 md:p-10"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <span
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-2xl font-bold"
                  style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
                >
                  {activeUseCase.initials}
                </span>
                <div>
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
                  >
                    <SectorIcon className="h-3.5 w-3.5" weight="fill" />
                    {activeSector.title} • {activeUseCase.sub}
                  </span>
                  <h2
                    className="text-balance mt-2 font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.6rem,3vw,2.2rem)",
                      letterSpacing: "-0.03em",
                      color: "var(--ink)",
                    }}
                  >
                    {activeUseCase.name}
                  </h2>
                  <p
                    className="text-pretty mt-2 max-w-2xl text-[14px] leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {activeUseCase.summary}
                  </p>
                </div>
              </div>

              {/* KPI row */}
              <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {activeUseCase.results.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-4"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <div
                      className="whitespace-nowrap font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.4rem,2.2vw,1.9rem)",
                        letterSpacing: "-0.03em",
                        color: "var(--ink)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {r.val}
                    </div>
                    {r.pct && (
                      <span
                        className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
                      >
                        {r.pct}
                      </span>
                    )}
                    <div
                      className="mt-2 text-[11px] leading-tight"
                      style={{ color: "var(--muted)" }}
                    >
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Défis & Solution */}
              <div
                className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:divide-x"
                style={{ borderColor: "var(--line)" }}
              >
                <div>
                  <h3
                    className="mb-3 flex items-center gap-2 text-[16px] font-bold"
                    style={{ color: "var(--ink)" }}
                  >
                    <Warning className="h-5 w-5" weight="fill" style={{ color: "#d97706" }} />
                    Défis &amp; Goulots d'étranglement
                  </h3>
                  <p className="mb-4 text-[13px]" style={{ color: "var(--muted)" }}>
                    {activeUseCase.context}
                  </p>
                  <ul className="space-y-2.5 text-[13px]" style={{ color: "var(--muted)" }}>
                    {activeUseCase.defis.map((defi, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: "#d97706" }}
                        />
                        <span>{defi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:pl-8">
                  <h3
                    className="mb-3 flex items-center gap-2 text-[16px] font-bold"
                    style={{ color: "var(--ink)" }}
                  >
                    <CheckCircle
                      className="h-5 w-5"
                      weight="fill"
                      style={{ color: "var(--green)" }}
                    />
                    Solution &amp; Architecture ClientX AI
                  </h3>
                  <p className="mb-4 text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {activeSector.solution}
                  </p>
                  <div
                    className="rounded-xl px-4 py-3.5 text-[13px] font-semibold"
                    style={{ background: "var(--bg-tint)", color: "var(--green-text)" }}
                  >
                    Résultat direct : {activeSector.results}
                  </div>
                </div>
              </div>

              {/* Footer row */}
              <div
                className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row"
                style={{ borderColor: "var(--line)" }}
              >
                <div
                  className="flex items-center gap-2 text-[12px]"
                  style={{ color: "var(--muted)" }}
                >
                  <ShieldCheck
                    className="h-4 w-4"
                    weight="fill"
                    style={{ color: "var(--green)" }}
                  />
                  <span>Certification ISO 9001 • Conforme RGPD</span>
                </div>
                <PrimaryButton to="/contact">Réserver une Démo</PrimaryButton>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <FooterCTA />
    </PageMain>
  );
}
