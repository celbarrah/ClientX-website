import { createFileRoute } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { PageMain } from "../components/site/primitives";
import { AgentDemoSection } from "../components/agents/AgentDemoSection";

export const Route = createFileRoute("/agents-ia")({
  head: () => ({
    ...pageSeo({
      title: "Agents IA en Action — ClientX AI",
      description:
        "Découvrez nos quatre agents IA en simulation : Léa (Voice AI), Axel (Chat AI), Jade (Reviews AI) et Max (Workflow AI).",
      path: "/agents-ia",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Agents IA", path: "/agents-ia" }]))],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <PageMain>
      <AgentDemoSection />
    </PageMain>
  );
}
