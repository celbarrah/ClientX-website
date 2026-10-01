import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "../lib/seo";
import { ThankYouPage } from "../components/site/ThankYou";

/* Thank-you page — International visitors (booking/form redirect target). */
export const Route = createFileRoute("/thank-you-gb")({
  head: () =>
    pageSeo({
      title: "Merci pour votre confiance — ClientX AI",
      description: "Votre demande a été bien reçue. Un expert ClientX AI vous contactera sous 24h.",
      path: "/thank-you-gb",
      noindex: true,
    }),
  component: () => <ThankYouPage market="gb" />,
});
