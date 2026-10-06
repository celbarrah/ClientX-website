import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { detectCountry } from "../../hooks/useGeoCalendar";

/* LeadConnector chat bubble, chosen by visitor location (same IP logic as the calendar). */
const WIDGET_GLOBAL = "697b1dc1a2eb7381fdcdc0dd";
const WIDGET_MA = "697c7f6aa2eb736c3a1640f8";
const LOADER = "https://widgets.leadconnectorhq.com/loader.js";
const RESOURCES = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
const SCRIPT_ID = "cx-global-chat-widget";

/* The /agents-ia page runs its own inline chat demos, which replace any chat widget
   on the page — so the global bubble is not loaded there. */
const EXCLUDED = ["/agents-ia"];

function removeGlobalWidget() {
  document.getElementById(SCRIPT_ID)?.remove();
  document
    .querySelectorAll("chat-widget, hl-chat")
    .forEach((el) => !el.closest(".cx-widget-container") && el.remove());
}

export function GlobalChatWidget() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const excluded = EXCLUDED.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (excluded) {
      removeGlobalWidget();
      return;
    }
    let alive = true;
    detectCountry().then((country) => {
      if (!alive) return;
      const widgetId = country === "MA" ? WIDGET_MA : WIDGET_GLOBAL;
      const existing = document.getElementById(SCRIPT_ID);
      if (existing?.getAttribute("data-widget-id") === widgetId) return;
      removeGlobalWidget();
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = LOADER;
      s.async = true;
      s.setAttribute("data-resources-url", RESOURCES);
      s.setAttribute("data-widget-id", widgetId);
      document.body.appendChild(s);
    });
    return () => {
      alive = false;
    };
  }, [excluded]);

  return null;
}
