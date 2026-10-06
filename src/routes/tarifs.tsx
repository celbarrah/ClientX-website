import { createFileRoute } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd, SOFTWARE_LD } from "../lib/seo";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageHero, PageMain, FooterCTA, SpotlightPanel } from "../components/site/primitives";
import {
  PricingCards,
  IncludedGroupsSection,
  AIAgentsSection,
  RegionSwitch,
  type Region,
} from "../components/site/Pricing";
import { FaqSection } from "../components/site/Faq";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    ...pageSeo({
      title: "Nos Tarifs & Abonnements — ClientX AI",
      description:
        "Découvrez les tarifs transparents de ClientX AI. Forfaits tout-inclus sans engagement avec accompagnement 1:1 et certification ISO 9001.",
      path: "/tarifs",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Tarifs", path: "/tarifs" }])), jsonLd(SOFTWARE_LD)],
  }),
  component: TarifsPage,
});

function TarifsPage() {
  // Euros by default; visitors can switch to Moroccan dirham prices.
  const [region, setRegion] = useState<Region>("fr");

  return (
    <PageMain>
      <PageHero
        align="center"
        eyebrow={
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
            style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--green)" }} />
            Tarifs · Paiement annuel
          </span>
        }
        title={
          <>
            Choisissez le plan adapté à votre{" "}
            <span style={{ color: "var(--green-text)" }}>ambition.</span>
          </>
        }
        paragraph="Un seul CRM IA pour vos sites, vos contacts, vos emails, vos rendez-vous et vos automatisations."
      />

      {/* Pricing — White Section */}
      <section className="py-8 md:py-12">
        <div className="container-x">
          <div className="flex flex-col items-center text-center">
            <RegionSwitch region={region} setRegion={setRegion} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              key={region}
              className="mt-12 w-full"
            >
              <PricingCards region={region} ctaTo="/contact" />
            </motion.div>
            <p className="mt-8 text-[13px]" style={{ color: "var(--muted)" }}>
              Prix par an, paiement annuel uniquement. « 2 × » indique le paiement échelonné en deux
              fois.
            </p>
          </div>
        </div>
      </section>

      <IncludedGroupsSection />
      <AIAgentsSection region={region} />
      <FaqSection align="left" />
      <FooterCTA />
    </PageMain>
  );
}
