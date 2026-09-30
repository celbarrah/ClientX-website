import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "@phosphor-icons/react";
import { Eyebrow } from "./primitives";
import { VIDEO_SRC } from "../../lib/site";

const MODULE_NAMES = [
  "Sites & Tunnels de Vente",
  "CRM Systémique & Ventes",
  "Emailing & SMS Marketing",
  "Automatisations & Workflows",
  "Calendriers & Rendez-vous IA",
];

export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="container-x py-6 md:py-8" style={{ backgroundColor: "transparent" }}>
      <div
        className="mesh-panel relative overflow-hidden px-4 py-14 md:px-10 md:py-20"
        style={{ color: "var(--ink)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[38%] h-[520px] w-[80%] -translate-x-1/2 blur-[120px]"
          style={{
            background: "radial-gradient(ellipse, rgba(50,220,50,0.22) 0%, transparent 70%)",
          }}
        />
        <div aria-hidden className="mesh-grid pointer-events-none absolute inset-0" />
        <div className="relative">
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Découvrez la plateforme en direct</Eyebrow>
            <h2
              className="text-balance mt-5 font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem,3.6vw,3.2rem)",
                letterSpacing: "-0.03em",
              }}
            >
              <span className="grad-ink">La puissance de ClientX AI</span>{" "}
              <span className="accent-serif" style={{ fontSize: "1.08em" }}>
                en vidéo
              </span>
            </h2>
            <p
              className="text-pretty mt-5 max-w-[44rem] text-[17px] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Voyez comment centraliser l'intégralité de vos tunnels, CRM, emails, automatisations
              et calendriers en une interface fluide et ultra-rapide.
            </p>
          </div>

          <div className="relative mx-auto mt-10 max-w-[1040px]">
            <div
              className="relative overflow-hidden rounded-[22px] border p-1.5"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                boxShadow: "0 40px 120px -30px rgba(50,220,50,0.35)",
              }}
            >
              <video
                src={`${VIDEO_SRC}#t=0.5`}
                preload="metadata"
                controls={playing}
                playsInline
                className="aspect-video w-full rounded-[16px]"
                style={{ background: "#0a0d0b" }}
              />
              {!playing && (
                <button
                  onClick={() => setPlaying(true)}
                  aria-label="Lire la vidéo"
                  className="group absolute inset-0 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(180deg, rgba(10,13,11,0.2), rgba(10,13,11,0.6))",
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="grid h-[72px] w-[72px] place-items-center rounded-full bg-white"
                    style={{ boxShadow: "0 20px 50px -10px rgba(0,0,0,0.5)" }}
                  >
                    <Play className="h-7 w-7 text-black" weight="fill" />
                  </motion.span>
                </button>
              )}
            </div>
          </div>

          <p
            className="mt-8 text-center text-[14px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {MODULE_NAMES.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
