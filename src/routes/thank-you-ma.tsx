import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "../lib/seo";
import { ThankYouPage } from "../components/site/ThankYou";

/* Thank-you page — Maroc visitors (booking/form redirect target). */
export const Route = createFileRoute("/thank-you-ma")({
  head: () =>
    pageSeo({
      title: "Merci pour votre confiance — ClientX AI",
      description: "Votre demande a été bien reçue. Un expert ClientX AI vous contactera sous 24h.",
      path: "/thank-you-ma",
      noindex: true,
    }),
  component: () => <ThankYouPage market="ma" />,
});
