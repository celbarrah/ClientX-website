import { createFileRoute } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { PageHero, PageMain, GlassCard } from "../components/site/primitives";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    ...pageSeo({
      title: "Mentions Légales — ClientX AI",
      description: "Mentions légales et informations éditeur de ClientX AI par Webeuz.",
      path: "/mentions-legales",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Mentions Légales", path: "/mentions-legales" }]))],
  }),
  component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
  return (
    <PageMain>
      <PageHero
        eyebrow={
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
            style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--green)" }} />
            Informations légales
          </span>
        }
        title={
          <>
            Mentions <span style={{ color: "var(--green-text)" }}>Légales</span>
          </>
        }
      />
      <div className="container-x pb-24">
        <GlassCard className="mx-auto max-w-3xl p-8 md:p-12">
          <div className="space-y-6 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            <div>
              <h2 className="mb-2 text-[18px] font-bold" style={{ color: "var(--ink)" }}>
                Éditeur
              </h2>
              <p>
                ClientX AI est édité par Webeuz. Pour toute question relative au contenu ou à
                l'utilisation de la plateforme, vous pouvez nous contacter à support@clientx.ai.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-[18px] font-bold" style={{ color: "var(--ink)" }}>
                Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des éléments constituant la plateforme ClientX AI (textes, visuels,
                logiciels) est la propriété exclusive de Webeuz et est protégé par les lois en
                vigueur.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-[18px] font-bold" style={{ color: "var(--ink)" }}>
                Certification
              </h2>
              <p>
                Webeuz est une entreprise certifiée ISO 9001 pour son système de management de la
                qualité.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageMain>
  );
}
