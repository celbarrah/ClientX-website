import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { FeaturePage } from "../components/site/FeaturePage";
import { getFonctionnalite } from "../lib/features-data";

export const Route = createFileRoute("/fonctionnalites/$slug")({
  loader: ({ params }) => {
    const feature = getFonctionnalite(params.slug);
    if (!feature) throw notFound();
    return { feature };
  },
  head: ({ loaderData }) => {
    const f = loaderData?.feature;
    if (!f) return {};
    return {
      ...pageSeo({
        title: f.seoTitle,
        description: f.seoDescription,
        path: `/fonctionnalites/${f.slug}`,
      }),
      scripts: [
        jsonLd(
          breadcrumbLd([
            { name: "Fonctionnalités", path: "/fonctionnalites" },
            { name: f.name, path: `/fonctionnalites/${f.slug}` },
          ]),
        ),
      ],
    };
  },
  component: FonctionnaliteRoute,
});

function FonctionnaliteRoute() {
  const { feature } = Route.useLoaderData();
  return <FeaturePage feature={feature} />;
}
