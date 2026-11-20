import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "@phosphor-icons/react";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { PageHero, PageMain } from "../components/site/primitives";
import { PrimaryButton, SecondaryButton } from "../components/site/Buttons";
import { Accent, LuxeClosing, HAIR, SectionLabel } from "../components/site/PremiumBlocks";
import { FONCTIONNALITES } from "../lib/features-data";
import { TRIAL_URL, DEMO_URL } from "../lib/site";

export const Route = createFileRoute("/fonctionnalites/")({
  head: () => ({
    ...pageSeo({
      title: "Fonctionnalités pour la beauté, le bien-être et le fitness — ClientX AI",
      description:
        "Assistante IA sur Instagram, Facebook et WhatsApp, relance des clientes, avis Google, agenda, paiements et fiches clientes. Zéro commission. Essai gratuit 14 jours.",
      path: "/fonctionnalites",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Fonctionnalités", path: "/fonctionnalites" }]))],
  }),
  component: FonctionnalitesPage,
});

function FonctionnalitesPage() {
  return (
    <PageMain>
      <PageHero
        eyebrow={
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
            style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--green)" }} />
            Fonctionnalités
          </span>
        }
        title={
          <>
            Six fonctions pour <Accent>remplir votre planning.</Accent>
          </>
        }
        paragraph="Tout ce qu'il faut pour répondre à vos clientes, les faire revenir et gagner des avis, sans commission sur vos soins."
        buttons={
          <>
            <PrimaryButton to={TRIAL_URL}>Essai gratuit 14 jours</PrimaryButton>
            <SecondaryButton to={DEMO_URL}>Voir une démo</SecondaryButton>
          </>
        }
      />

      <section className="container-x pb-10 pt-4 md:pb-16">
        <SectionLabel index="01">Les six fonctions</SectionLabel>
        <div className="mt-10 border-t" style={{ borderColor: HAIR }}>
          {FONCTIONNALITES.map((f, i) => (
            <Link
              key={f.slug}
              to="/fonctionnalites/$slug"
              params={{ slug: f.slug }}
              className="group grid gap-3 border-b py-9 transition-colors hover:bg-black/[0.02] md:grid-cols-[100px_1fr_1.2fr_40px] md:items-center md:gap-10 md:py-11"
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
                {f.name}
              </h3>
              <p className="max-w-xl text-[16px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {f.short}
              </p>
              <ArrowUpRight
                className="hidden h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:block"
                weight="bold"
                style={{ color: "var(--green-text)" }}
              />
            </Link>
          ))}
        </div>
      </section>

      <LuxeClosing />
    </PageMain>
  );
}
