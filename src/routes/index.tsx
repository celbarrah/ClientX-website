import { createFileRoute } from "@tanstack/react-router";
import { pageSeo, jsonLd, SOFTWARE_LD, FAQ_LD } from "../lib/seo";
import { Homepage } from "../components/Homepage";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageSeo({
      title: "ClientX AI — L'assistante IA des métiers de la beauté et du bien-être",
      description:
        "Une assistante IA qui répond à vos clientes sur Instagram, Facebook et WhatsApp, relance les inactives et collecte les avis Google. Zéro commission. Essai gratuit 14 jours.",
      path: "/",
    }),
    scripts: [jsonLd(SOFTWARE_LD), jsonLd(FAQ_LD)],
  }),
  component: IndexPage,
});

function IndexPage() {
  return <Homepage />;
}
