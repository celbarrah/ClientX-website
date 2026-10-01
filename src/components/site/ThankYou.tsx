import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, EnvelopeSimple, Phone, Rocket } from "@phosphor-icons/react";
import { PrimaryButton, SecondaryButton } from "./Buttons";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    icon: EnvelopeSimple,
    title: "Confirmation envoyée",
    text: "Vous recevez la confirmation de votre rendez-vous par email et SMS.",
  },
  {
    icon: Phone,
    title: "Un expert vous contacte",
    text: "Un eXpert ClientX AI analyse votre profil et vous contacte sous 24h.",
  },
  {
    icon: Rocket,
    title: "Votre démo personnalisée",
    text: "On passe en revue votre activité et votre futur CRM IA, en direct.",
  },
];

/** Shared thank-you page. `market` only changes the tracking event (MA vs other countries). */
export function ThankYouPage({ market }: { market: "ma" | "gb" }) {
  // Conversion event for GTM / Meta / Google Ads (one per market)
  useEffect(() => {
    const w = window as unknown as {
      dataLayer?: Record<string, unknown>[];
      __cxThankYouTracked?: boolean;
    };
    if (w.__cxThankYouTracked) return; // never count the same visit twice
    w.__cxThankYouTracked = true;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: `thank_you_${market}`, market });
  }, [market]);

  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        aria-hidden
        className="orb left-1/2 top-24 h-[380px] w-[620px] -translate-x-1/2 opacity-50"
      />

      <section className="container-x relative flex min-h-[78vh] flex-col items-center justify-center pb-16 pt-32 text-center md:pt-40">
        {/* check badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative mb-8"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--green)", filter: "blur(24px)", opacity: 0.45 }}
          />
          <span
            className="relative grid h-20 w-20 place-items-center rounded-full"
            style={{
              background: "linear-gradient(180deg, #62f262 0%, #32dc32 55%, #25c425 100%)",
              boxShadow:
                "0 0 0 6px rgba(255,255,255,0.8), 0 0 0 7px rgba(50,220,50,0.3), 0 20px 40px -12px rgba(50,220,50,0.7)",
            }}
          >
            <CheckCircle className="h-10 w-10" weight="fill" style={{ color: "#031003" }} />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 5.4vw, 4.4rem)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          <span className="grad-ink">Merci pour votre</span>{" "}
          <span className="accent-serif" style={{ fontSize: "1.08em" }}>
            confiance !
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="text-pretty mx-auto mt-6 max-w-[40rem] text-[17px] leading-relaxed md:text-[18px]"
          style={{ color: "var(--muted)" }}
        >
          Votre demande a été bien reçue. Un eXpert{" "}
          <span className="font-semibold" style={{ color: "var(--green-text)" }}>
            ClientX AI
          </span>{" "}
          analyse actuellement votre profil et vous contactera sous 24h pour valider votre
          diagnostic.
        </motion.p>

        {/* next steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-12 grid w-full max-w-[60rem] grid-cols-1 gap-3 text-left md:grid-cols-3"
        >
          {STEPS.map((s, i) => (
            <div key={s.title} className="glass-card !rounded-[22px] p-5">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{
                    background: i === 0 ? "var(--green)" : "#ffffff",
                    color: i === 0 ? "#031003" : "var(--green-text)",
                    boxShadow:
                      i === 0
                        ? "0 8px 18px -6px rgba(50,220,50,0.7)"
                        : "0 0 0 1px rgba(10,30,15,0.08)",
                  }}
                >
                  <s.icon className="h-5 w-5" weight="bold" />
                </span>
                <span
                  className="text-[11px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--faint)" }}
                >
                  Étape {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 text-[16px] font-semibold" style={{ color: "var(--ink)" }}>
                {s.title}
              </div>
              <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {s.text}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <PrimaryButton to="/">Retour à l'accueil</PrimaryButton>
          <SecondaryButton to="/agents-ia">Découvrir nos Agents</SecondaryButton>
        </motion.div>
      </section>
    </main>
  );
}
