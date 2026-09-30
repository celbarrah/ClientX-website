import { useEffect, useState } from "react";

/* Same logic as the clientx-ai-2 site:
   Morocco (MA) visitors get the Morocco calendar, everyone else the FR/default one. */
export const FR_CALENDAR_ID = "qx88HgXyGDFEor3k2HQr";
export const MA_CALENDAR_ID = "51RZQPaa7WdsUiefZ3FL";
const calendarUrl = (id: string) => `https://link.clientx.ai/widget/booking/${id}`;

/* One lookup per page load, shared by every component that needs it. */
let countryPromise: Promise<string> | null = null;
export function detectCountry(): Promise<string> {
  if (typeof window === "undefined") return Promise.resolve("");
  if (!countryPromise) {
    countryPromise = (async () => {
      try {
        const cached = sessionStorage.getItem("clientx-country");
        if (cached !== null) return cached;
      } catch {
        /* ignore */
      }
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 3500);
        const res = await fetch("https://api.country.is/", { signal: ctrl.signal });
        clearTimeout(t);
        const data = (await res.json()) as { country?: string };
        const c = (data?.country || "").toUpperCase();
        try {
          sessionStorage.setItem("clientx-country", c);
        } catch {
          /* ignore */
        }
        return c;
      } catch {
        // Network/adblock failure: fall back to the browser time zone
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
          return tz.includes("Casablanca") ? "MA" : "";
        } catch {
          return "";
        }
      }
    })();
  }
  return countryPromise;
}

export function useGeoCalendar() {
  const [state, setState] = useState({
    loading: true,
    country: "",
    calendarId: FR_CALENDAR_ID,
  });

  useEffect(() => {
    let alive = true;
    detectCountry().then((c) => {
      if (!alive) return;
      setState({
        loading: false,
        country: c,
        calendarId: c === "MA" ? MA_CALENDAR_ID : FR_CALENDAR_ID,
      });
    });
    return () => {
      alive = false;
    };
  }, []);

  return {
    ...state,
    isMorocco: state.country === "MA",
    calendarUrl: calendarUrl(state.calendarId),
  };
}
