import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { ActivityPage } from "../components/site/ActivityPage";
import { getActivite } from "../lib/activites-data";

export const Route = createFileRoute("/activites/$slug")({
  loader: ({ params }) => {
    const activite = getActivite(params.slug);
    if (!activite) throw notFound();
    return { activite };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.activite;
    if (!a) return {};
    return {
      ...pageSeo({
        title: a.seoTitle,
        description: a.seoDescription,
        path: `/activites/${a.slug}`,
      }),
      scripts: [
        jsonLd(
          breadcrumbLd([
            { name: "Activités", path: "/activites/institut" },
            { name: a.name, path: `/activites/${a.slug}` },
          ]),
        ),
      ],
    };
  },
  component: ActiviteRoute,
});

function ActiviteRoute() {
  const { activite } = Route.useLoaderData();
  return <ActivityPage activite={activite} />;
}
