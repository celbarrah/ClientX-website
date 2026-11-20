import { createFileRoute, redirect } from "@tanstack/react-router";

/* L'ancienne page « Agents IA » est remplacée par la fonctionnalité « Assistante IA ». */
export const Route = createFileRoute("/agents-ia")({
  beforeLoad: () => {
    throw redirect({ to: "/fonctionnalites/$slug", params: { slug: "assistante-ia" } });
  },
});
