import { CLIENTX_HERO_LOGO, FAQS, PLANS } from "./site";

/* ---------------- Global SEO config ----------------
   Change SITE_URL to the production domain before going live. */
export const SITE_URL = "https://clientx.uk";
export const SITE_NAME = "ClientX AI";
export const FAVICON_URL =
  "https://clientx.uk/wp-content/uploads/2026/01/cropped-67a59bce69aecb0823186719-32x32.png";
export const OG_IMAGE = CLIENTX_HERO_LOGO;

export const ROUTES_FOR_SITEMAP = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/fonctionnalites", priority: "0.9", changefreq: "monthly" },
  { path: "/agents-ia", priority: "0.9", changefreq: "monthly" },
  { path: "/cas-clients", priority: "0.8", changefreq: "monthly" },
  { path: "/tarifs", priority: "0.9", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "yearly" },
  { path: "/mentions-legales", priority: "0.2", changefreq: "yearly" },
  { path: "/confidentialite", priority: "0.2", changefreq: "yearly" },
];

/** Per-page SEO: title, description, canonical, Open Graph + Twitter. */
export function pageSeo({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "fr", href: url },
    ],
  };
}

/** JSON-LD <script> entry for TanStack `head().scripts`. */
export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ["ClientX", "ClientX by Webeuz"],
  url: SITE_URL,
  logo: FAVICON_URL,
  description:
    "Logiciel IA tout-en-un : sites, tunnels, CRM, emails, SMS, calendriers, formations et automatisations dans une seule plateforme.",
  areaServed: ["FR", "MA", "BE", "CH"],
  hasCredential: "ISO 9001",
};

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "fr-FR",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const SOFTWARE_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  description:
    "Centralisez vos sites, tunnels, CRM, emails, calendriers et automatisations dans un logiciel IA tout-en-un unifié.",
  offers: PLANS.map((p) => ({
    "@type": "Offer",
    name: `ClientX ${p.name}`,
    price: p.regions.fr.price,
    priceCurrency: "EUR",
    description: p.desc,
    url: `${SITE_URL}/tarifs`,
  })),
};

export const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}
