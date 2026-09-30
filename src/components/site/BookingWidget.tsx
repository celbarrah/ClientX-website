import { useEffect, useRef, useState } from "react";
import { BOOKING_IFRAME_SRC, BOOKING_SCRIPT_SRC } from "../../lib/site";

export function BookingWidget({ minHeight = 760 }: { minHeight?: number }) {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const scriptId = "clientx-form-embed-script";
    let s = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!s) {
      s = document.createElement("script");
      s.id = scriptId;
      s.src = BOOKING_SCRIPT_SRC;
      s.type = "text/javascript";
      s.async = true;
      document.body.appendChild(s);
    }
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight, background: "#ffffff" }}>
      {!loaded && (
        <div
          className="absolute inset-0 z-0 flex flex-col items-center justify-center p-8 text-center"
          style={{ background: "#ffffff" }}
        >
          <div
            className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
            style={{ borderColor: "var(--green)", borderTopColor: "transparent" }}
          />
          <p
            className="mt-4 text-xs tracking-wider text-[var(--muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Chargement du calendrier officiel ClientX…
          </p>
        </div>
      )}
      <iframe
        ref={frameRef}
        id="51RZQPaa7WdsUiefZ3FL_1790598509806"
        src={BOOKING_IFRAME_SRC}
        allow="payment"
        title="Calendrier officiel de réservation ClientX AI"
        scrolling="no"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          minHeight,
          border: "none",
          overflow: "hidden",
          display: "block",
          position: "relative",
          zIndex: 1,
          opacity: loaded ? 1 : 0.01,
          transition: "opacity 0.4s ease",
          background: "#ffffff",
        }}
      />
    </div>
  );
}
