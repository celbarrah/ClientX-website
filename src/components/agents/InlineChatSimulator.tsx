import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";

/**
 * Inline chat simulator that only loads when scrolled into view or launched by user action.
 */
export function InlineChatSimulator({
  widgetId,
  agentName = "Léa",
}: {
  widgetId: string;
  agentName?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);

  const startTest = () => {
    if (!activeRef.current) {
      activeRef.current = true;
      setActive(true);
    }
  };

  // Inject / cleanup the chat widget based on active state
  useEffect(() => {
    if (!active) return;
    const host = hostRef.current;
    if (!host) return;

    // Remove any existing widgets/scripts before injecting a new one
    document.querySelectorAll("chat-widget, hl-chat").forEach((el) => el.remove());
    document
      .querySelectorAll(
        'script[data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"]',
      )
      .forEach((el) => el.remove());

    const script = document.createElement("script");
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.setAttribute(
      "data-resources-url",
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
    );
    script.setAttribute("data-widget-id", widgetId);
    script.async = true;
    document.body.appendChild(script);

    const interval = setInterval(() => {
      const chatEls = document.querySelectorAll("chat-widget, hl-chat");
      chatEls.forEach((chatEl) => {
        if (!host.isConnected) return;
        // Only adopt widgets that are not already inside our host
        if (!host.contains(chatEl)) {
          host.appendChild(chatEl);
        }

        if (chatEl.shadowRoot) {
          const btn = chatEl.shadowRoot.querySelector(".chat-widget-button") as HTMLElement | null;
          if (btn) btn.click();

          if (!chatEl.shadowRoot.querySelector("#cx-inline-styles")) {
            const style = document.createElement("style");
            style.id = "cx-inline-styles";
            style.innerHTML = `
              .chat-widget-window, .chat-window {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100% !important;
                height: 100% !important;
                max-width: 100% !important;
                max-height: 100% !important;
                border-radius: 16px !important;
                box-shadow: none !important;
                margin: 0 !important;
                transform: none !important;
              }
              iframe {
                width: 100% !important;
                height: 100% !important;
                border-radius: 16px !important;
              }
              .chat-widget-button, .chat-button {
                display: none !important;
              }
            `;
            chatEl.shadowRoot.appendChild(style);
          }
        }
      });
    }, 150);

    return () => {
      clearInterval(interval);
      // Clear only the externally-managed host (no React children there)
      if (host) host.innerHTML = "";
      document.querySelectorAll("chat-widget, hl-chat").forEach((el) => el.remove());
      document
        .querySelectorAll(
          'script[data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"]',
        )
        .forEach((el) => el.remove());
    };
  }, [active, widgetId]);

  return (
    <div
      ref={outerRef}
      className={`cx-widget-container w-full mt-4 mb-6 bg-[#f6f9f7] rounded-2xl overflow-hidden relative border border-[rgba(10,30,15,0.08)] transition-all shadow-[0_1px_0_#fff_inset] ${
        active ? "min-h-[580px]" : ""
      }`}
    >
      {/* Pre-launch Call Card matching user design */}
      {!active && (
        <div className="p-2 md:p-3">
          <button
            type="button"
            onClick={startTest}
            className="btn-glow w-full py-4 px-6 rounded-2xl active:scale-[0.99] font-bold text-base md:text-lg flex items-center justify-center gap-3 transition-all"
          >
            <Phone className="w-5 h-5 fill-black stroke-black" />
            <span>Appeler {agentName} en simulation</span>
          </button>
        </div>
      )}

      {/* Dedicated injection target — React never writes children here */}
      <div ref={hostRef} className={active ? "absolute inset-0" : "hidden"} />

      <style>{`
        chat-widget, hl-chat {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100% !important;
          height: 100% !important;
          transform: none !important;
          z-index: 10 !important;
        }
        iframe#chat-widget-iframe {
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          border-radius: 16px !important;
          box-shadow: 0 20px 40px -20px rgba(16, 60, 28, 0.3) !important;
        }
      `}</style>
    </div>
  );
}
