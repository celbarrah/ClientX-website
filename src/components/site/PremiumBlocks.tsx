import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { TRIAL_URL, DEMO_URL } from "../../lib/site";

/**
 * Blocs communs aux pages beauté. Charte ClientX respectée :
 * blanc, noir, vert de marque #32DC32 ; titres en Geist (--font-display) ;
 * Instrument Serif italique uniquement pour le mot d'accent.
 */
export const HAIR = "rgba(10,30,15,0.14)";
export const HAIR_DARK = "rgba(255,255,255,0.14)";
export const DARK = "#07100a";
export const NEON = "#32dc32";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Libellé éditorial : « (01) ——— TITRE », comme la FAQ du site. */
export function SectionLabel({
  index,
  children,
  dark = false,
}: {
  index: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span style={{ color: dark ? NEON : "var(--green-text)" }}>({index})</span>
      <span className="h-px w-10" style={{ background: dark ? HAIR_DARK : "var(--line-strong)" }} />
      <span style={{ color: dark ? "rgba(255,255,255,0.62)" : "var(--muted)" }}>{children}</span>
    </div>
  );
}

export function SectionTitle({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`text-balance font-medium ${className}`}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2.2rem,4.6vw,4rem)",
        letterSpacing: "-0.045em",
        lineHeight: 1,
        color: dark ? "#fff" : "var(--ink)",
      }}
    >
      {children}
    </motion.h2>
  );
}

/** Mot d'accent : Instrument Serif italique, comme .accent-serif sur le reste du site. */
export function Accent({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-serif)",
        fontStyle: "italic",
        fontWeight: 400,
        letterSpacing: "-0.02em",
        color: dark ? NEON : "var(--green-text)",
        fontSize: "1.06em",
      }}
    >
      {children}
    </span>
  );
}

/** Bande noire pleine largeur avec halo vert de marque (comme la page Clients). */
export function DarkBand({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[36px] ${className}`}
      style={{ background: DARK, color: "#fff", ...style }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 340px at 88% -10%, rgba(50,220,50,0.2), transparent 62%), radial-gradient(500px 300px at 0% 110%, rgba(50,220,50,0.1), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export interface ClientLogo {
  name: string;
  /** Chemin du fichier logo sous /public. Sans logo : le nom s'affiche en texte (provisoire). */
  src?: string;
}

/** Bandeau défilant de logos clients. */
export function LogoMarquee({ logos, label }: { logos: ClientLogo[]; label?: string }) {
  // Répété pour que le défilement soit continu même avec peu de logos.
  const row = [...logos, ...logos, ...logos];
  return (
    <div className="border-y py-7" style={{ borderColor: HAIR }}>
      {label && (
        <p
          className="container-x mb-5 text-center text-[11px] uppercase tracking-[0.16em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
        >
          {label}
        </p>
      )}
      <div className="overflow-hidden" aria-hidden>
        <div className="luxe-marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {row.map((l, i) => (
                <span key={`${k}-${i}`} className="flex items-center px-10 md:px-14">
                  {l.src ? (
                    <img
                      src={l.src}
                      alt={l.name}
                      loading="lazy"
                      className="h-9 w-auto max-w-[170px] object-contain md:h-11"
                      style={{ filter: "grayscale(1)", opacity: 0.8 }}
                    />
                  ) : (
                    <span
                      className="text-[26px] font-semibold md:text-[32px]"
                      style={{
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.045em",
                        color: "var(--ink)",
                        opacity: 0.8,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {l.name}
                    </span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Conclusion des pages beauté (vert de marque, boutons de la charte). */
export function LuxeClosing() {
  return (
    <section className="container-x py-16 md:py-24">
      <DarkBand className="px-6 py-20 text-center md:px-16 md:py-28">
        <p
          className="text-[11px] uppercase tracking-[0.16em]"
          style={{ fontFamily: "var(--font-mono)", color: NEON }}
        >
          Essai gratuit · 14 jours
        </p>
        <h2
          className="mx-auto mt-7 max-w-4xl text-balance font-medium"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem,7vw,6.4rem)",
            letterSpacing: "-0.055em",
            lineHeight: 0.95,
          }}
        >
          Plus de clientes. <Accent dark>Moins de messages à traiter.</Accent>
        </h2>
        <p
          className="mx-auto mt-7 max-w-xl text-[16.5px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.66)" }}
        >
          Testez ClientX pendant 14 jours dans votre établissement, ou demandez une démonstration en
          direct.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={TRIAL_URL}
            className="btn-glow inline-flex h-14 items-center rounded-full px-9 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98]"
          >
            Essai gratuit 14 jours
          </a>
          <a
            href={DEMO_URL}
            className="inline-flex h-14 items-center rounded-full px-9 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
            style={{ border: `1px solid ${HAIR_DARK}` }}
          >
            Voir une démo
          </a>
        </div>
        <p
          className="mt-12 text-[11px] uppercase tracking-[0.14em]"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.5)" }}
        >
          Certifié ISO 9001 · Zéro commission
        </p>
      </DarkBand>
    </section>
  );
}
