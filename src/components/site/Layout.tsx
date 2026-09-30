import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { List, X, CaretUp, ArrowRight } from "@phosphor-icons/react";
import { CLIENTX_LOGO } from "../../lib/site";
import { PrimaryButton } from "./Buttons";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { label: "Plateforme & Features", to: "/fonctionnalites", match: "/fonctionnalites" },
  { label: "Agents IA", to: "/agents-ia", match: "/agents-ia" },
  { label: "Cas Clients", to: "/cas-clients", match: "/cas-clients" },
  { label: "Nos Tarifs", to: "/tarifs", match: "/tarifs" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] flex justify-center px-3 pt-3 md:px-5 md:pt-4">
      <div
        className="flex h-[60px] w-full max-w-[1320px] items-center justify-between rounded-full pl-5 pr-2 md:pl-6"
        style={{
          background: scrolled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.6)",
          backdropFilter: "saturate(180%) blur(16px)",
          WebkitBackdropFilter: "saturate(180%) blur(16px)",
          border: "1px solid",
          borderColor: "rgba(255,255,255,0.9)",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(10,30,15,0.07), 0 1px 0 #fff inset, 0 16px 40px -14px rgba(16,60,28,0.25)"
            : "0 0 0 1px rgba(10,30,15,0.05), 0 1px 0 #fff inset",
          transition:
            "background 0.3s var(--ease-expo), border-color 0.3s var(--ease-expo), box-shadow 0.3s var(--ease-expo)",
        }}
      >
        <Link to="/" className="flex items-center" aria-label="ClientX AI accueil">
          <img
            src={CLIENTX_LOGO}
            alt="ClientX AI"
            className="h-6 w-auto md:h-7"
            style={{ filter: "brightness(0)" }}
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = pathname === n.match;
            return (
              <Link
                key={n.to}
                to={n.to}
                className="relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors hover:bg-black/[0.04]"
                style={{
                  color: active ? "var(--ink)" : "var(--muted)",
                  background: active ? "rgba(0,0,0,0.05)" : undefined,
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <PrimaryButton to="/contact" className="!h-11 !px-5 !text-[14px]">
              Réserver une Démo
            </PrimaryButton>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="grid h-11 w-11 place-items-center rounded-full border bg-white md:hidden"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
          >
            <List className="h-5 w-5" weight="regular" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[105] flex flex-col bg-white px-6 pt-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <img
                src={CLIENTX_LOGO}
                alt="ClientX AI"
                className="h-7 w-auto"
                style={{ filter: "brightness(0)" }}
              />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="grid h-11 w-11 place-items-center rounded-full border"
                style={{ borderColor: "var(--line)", color: "var(--ink)" }}
              >
                <X className="h-5 w-5" weight="regular" />
              </button>
            </div>
            <div className="mt-16 flex flex-col gap-5">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[clamp(1.6rem,6vw,2.2rem)] font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.03em",
                      color: "var(--ink)",
                    }}
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pb-10"
            >
              <PrimaryButton to="/contact" className="w-full">
                Réserver une Démo
              </PrimaryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden" style={{ background: "transparent" }}>
      <div
        aria-hidden
        className="orb bottom-[-220px] left-[-120px] h-[380px] w-[520px] opacity-25"
      />
      <div className="container-x relative pb-10 pt-8 md:pb-12 md:pt-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand + contact */}
          <div className="md:col-span-5">
            <img
              src={CLIENTX_LOGO}
              alt="ClientX AI"
              className="h-7 w-auto"
              style={{ filter: "brightness(0)" }}
            />
            <p
              className="mt-6 max-w-[26rem] text-[14.5px] leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              Le CRM IA tout-en-un qui centralise vos sites, vos contacts, vos emails, vos
              calendriers et vos automatisations. Augmentez vos résultats sans multiplier vos
              abonnements.
            </p>
            <p className="label mt-6" style={{ color: "var(--faint)", letterSpacing: "0.14em" }}>
              Certifié ISO 9001 · MENA &amp; Europe
            </p>

            <div className="mt-12">
              <h4 className="label" style={{ color: "var(--faint)", letterSpacing: "0.14em" }}>
                Contact &amp; Démo
              </h4>
              <p
                className="mt-4 max-w-[20rem] text-[14.5px] leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                Planifiez une démonstration en direct pour découvrir la plateforme et auditer vos
                processus.
              </p>
              <Link
                to="/contact"
                className="btn-glow group mt-6 inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-1.5 text-[14.5px] font-semibold"
              >
                Réserver une Démo
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" weight="bold" style={{ color: "#0b0f0c" }} />
                </span>
              </Link>
            </div>
          </div>

          {/* Plateforme */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="label" style={{ color: "var(--faint)", letterSpacing: "0.14em" }}>
              Plateforme All-In-One
            </h4>
            <ul className="mt-5 space-y-3.5 text-[14.5px]">
              {[
                "Sites & Tunnels de Vente",
                "CRM Systémique Unifié",
                "Email, SMS & WhatsApp",
                "Calendriers & Rendez-vous",
                "Formations & E-learning",
                "Automatisations & Workflows",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/fonctionnalites"
                    className="footer-link"
                    style={{ color: "var(--ink)" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="label" style={{ color: "var(--faint)", letterSpacing: "0.14em" }}>
              Ressources
            </h4>
            <ul className="mt-5 space-y-3.5 text-[14.5px]">
              {(
                [
                  ["/cas-clients", "Cas Clients par Secteur"],
                  ["/fonctionnalites", "Fonctionnalités"],
                  ["/tarifs", "Nos Tarifs"],
                  ["/contact", "Réserver une Démo"],
                  ["/contact", "Onboarding & Support"],
                ] as const
              ).map(([to, label]) => (
                <li key={label}>
                  <a href={to} className="footer-link" style={{ color: "var(--ink)" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom legal bar */}
        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-6 text-[12px] md:flex-row"
          style={{ borderColor: "rgba(10,30,15,0.08)", color: "var(--muted)" }}
        >
          <p>© 2013–2026 ClientX AI by Webeuz. Tous droits réservés. · ClientX Ltd · WBX SARL</p>
          <p className="hidden lg:block" style={{ color: "var(--faint)" }}>
            ClientX est propulsé par la puissance systémique All-in-One
          </p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="footer-link">
              Mentions Légales
            </Link>
            <Link to="/confidentialite" className="footer-link">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Retour en haut"
            className="fixed bottom-6 right-6 z-[90] grid h-10 w-10 place-items-center rounded-full border shadow-lg transition-transform hover:scale-110"
            style={{
              borderColor: "var(--line-strong)",
              background: "var(--surface)",
              color: "var(--ink)",
            }}
          >
            <CaretUp className="h-5 w-5" weight="bold" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
