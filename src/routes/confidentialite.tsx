import { createFileRoute } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { PageHero, PageMain, GlassCard } from "../components/site/primitives";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    ...pageSeo({
      title: "Politique de Confidentialité — ClientX AI",
      description: "Politique de confidentialité et de protection des données RGPD de ClientX AI.",
      path: "/confidentialite",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Confidentialité", path: "/confidentialite" }]))],
  }),
  component: ConfidentialitePage,
});

function ConfidentialitePage() {
  return (
    <PageMain>
      <PageHero
        eyebrow={
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
            style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--green)" }} />
            RGPD &amp; Données
          </span>
        }
        title={
          <>
            Politique de <span style={{ color: "var(--green-text)" }}>Confidentialité</span>
          </>
        }
      />
      <div className="container-x pb-24">
        <GlassCard className="mx-auto max-w-3xl p-8 md:p-12">
          <div className="space-y-6 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            <div>
              <h2 className="mb-2 text-[18px] font-bold" style={{ color: "var(--ink)" }}>
                Protection des données
              </h2>
              <p>
                Vos données sont chiffrées selon les protocoles les plus stricts. Notre système de
                management est certifié ISO 9001 et vos données restent votre propriété exclusive.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-[18px] font-bold" style={{ color: "var(--ink)" }}>
                Conformité RGPD
              </h2>
              <p>
                Nous appliquons le Règlement Général sur la Protection des Données (RGPD). Nous ne
                commercialisons ni ne transférons vos données à des tiers à des fins publicitaires.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-[18px] font-bold" style={{ color: "var(--ink)" }}>
                Vos droits
              </h2>
              <p>
                Vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité
                de vos données. Pour exercer ces droits, contactez-nous à support@clientx.ai.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-[18px] font-bold" style={{ color: "var(--ink)" }}>
                Hébergement des données
              </h2>
              <p>
                Les données sont hébergées sur des serveurs sécurisés situés en Europe, avec une
                politique de sauvegarde garantissant leur intégrité et leur disponibilité.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageMain>
  );
}
