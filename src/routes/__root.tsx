import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportVibeError } from "../lib/vibe-error-reporting";
import { FAVICON_URL, ORGANIZATION_LD, WEBSITE_LD, jsonLd } from "../lib/seo";
import { SiteHeader, SiteFooter } from "../components/site/Layout";
import { SmoothScroll } from "../components/site/SmoothScroll";
import { ThemeProvider } from "../components/site/Theme";
import { GlobalChatWidget } from "../components/site/GlobalChatWidget";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold" style={{ color: "var(--foreground)" }}>
          Page introuvable
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-black"
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportVibeError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          Un problème est survenu
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Veuillez rafraîchir la page ou revenir à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-black"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border bg-background px-4 py-2 text-sm font-medium"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            Retourner à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#32dc32" },
      { name: "author", content: "ClientX AI" },
      { name: "application-name", content: "ClientX AI" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: "ClientX AI" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:locale:alternate", content: "fr_MA" },
    ],
    scripts: [jsonLd(ORGANIZATION_LD), jsonLd(WEBSITE_LD)],
    links: [
      { rel: "icon", type: "image/png", sizes: "32x32", href: FAVICON_URL },
      { rel: "shortcut icon", href: FAVICON_URL },
      { rel: "apple-touch-icon", href: FAVICON_URL },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        <ThemeProvider>
          <SmoothScroll>
            <ScrollHashHandler />
            <SiteHeader />
            <div className="min-h-screen">{children}</div>
            <SiteFooter />
            <GlobalChatWidget />
            <Scripts />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

/** Listens for `clientx-scroll` custom events (from buttons linking to #anchors) and smooth-scrolls. */
function ScrollHashHandler() {
  useEffect(() => {
    const handler = (e: Event) => {
      const target = (e as CustomEvent).detail as string;
      if (!target || !target.startsWith("#")) return;
      if (window.location.pathname !== "/") {
        window.location.href = `/${target}`;
        return;
      }
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };
    window.addEventListener("clientx-scroll", handler);
    return () => window.removeEventListener("clientx-scroll", handler);
  }, []);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
