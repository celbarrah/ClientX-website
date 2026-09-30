import { createFileRoute } from "@tanstack/react-router";
import { pageSeo, jsonLd, SOFTWARE_LD, FAQ_LD } from "../lib/seo";
import { Homepage } from "../components/Homepage";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageSeo({
      title: "ClientX AI — CRM IA Business All-in-One",
      description:
        "Centralisez vos sites, tunnels, CRM, emails, calendriers et automatisations dans un CRM IA tout-en-un unifié. Économisez plus de 15 000€ par an.",
      path: "/",
    }),
    scripts: [jsonLd(SOFTWARE_LD), jsonLd(FAQ_LD)],
  }),
  component: IndexPage,
});

function IndexPage() {
  return <Homepage />;
}
