import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { List, X, CaretUp, CaretDown, ArrowRight } from "@phosphor-icons/react";
import { CLIENTX_LOGO, TRIAL_URL, DEMO_URL } from "../../lib/site";
import { ACTIVITES_MENU } from "../../lib/activites-data";
import { FONCTIONNALITES } from "../../lib/features-data";
import { PrimaryButton } from "./Buttons";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Menu : Activités (menu déroulant) · Fonctionnalités (menu déroulant) · Tarifs · Clients */
const NAV = [
  { label: "Tarifs", to: "/tarifs", match: "/tarifs" },
  { label: "Clients", to: "/cas-clients", match: "/cas-clients" },
];

function NavDropdown({ kind, active }: { kind: "activites" | "fonctionnalites"; active: boolean }) {
  const label = kind === "activites" ? "Activités" : "Fonctionnalités";
  const items =
    kind === "activites"
      ? ACTIVITES_MENU.map((a) => ({ slug: a.slug, label: a.label }))
      : FONCTIONNALITES.map((x) => ({ slug: x.slug, label: x.name }));
  const triggerClass =
    "flex items-center gap-1 rounded-full px-4 py-2 text-[14px] font-medium transition-colors hover:bg-black/[0.04]";
  const triggerStyle = {
    color: active ? "var(--ink)" : "var(--muted)",
    background: active ? "rgba(0,0,0,0.05)" : undefined,
  };
  const itemClass =
    "block rounded-2xl px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-black/[0.04]";
  const caret = (
    <CaretDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" weight="bold" />
  );
  return (
    <div className="group relative">
      {kind === "fonctionnalites" ? (
        <Link to="/fonctionnalites" className={triggerClass} style={triggerStyle}>
          {label}
          {caret}
        </Link>
      ) : (
        <button type="button" aria-haspopup="true" className={triggerClass} style={triggerStyle}>
          {label}
          {caret}
        </button>
      )}
      <div className="invisible absolute left-0 top-full z-10 pt-3 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul
          className="w-64 rounded-3xl bg-white p-2"
          style={{ boxShadow: "0 0 0 1px rgba(10,30,15,0.08), 0 24px 48px -16px rgba(16,60,28,0.28)" }}
        >
          {items.map((it) => (
            <li key={it.slug}>
              {kind === "activites" ? (
                <Link
                  to="/activites/$slug"
                  params={{ slug: it.slug }}
                  className={itemClass}
                  style={{ color: "var(--ink)" }}
                >
                  {it.label}
                </Link>
              ) : (
                <Link
                  to="/fonctionnalites/$slug"
                  params={{ slug: it.slug }}
                  className={itemClass}
                  style={{ color: "var(--ink)" }}
                >
                  {it.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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
          <NavDropdown kind="activites" active={pathname.startsWith("/activites")} />
          <NavDropdown kind="fonctionnalites" active={pathname.startsWith("/fonctionnalites")} />
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
          <div className="hidden items-center gap-1 md:flex">
            <a
              href={DEMO_URL}
              className="rounded-full px-4 py-2 text-[14px] font-medium transition-colors hover:bg-black/[0.04]"
              style={{ color: "var(--muted)" }}
            >
              Voir une démo
            </a>
            <PrimaryButton to={TRIAL_URL} className="!h-11 !px-5 !text-[14px]">
              Essai gratuit 14 jours
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
            <div className="mt-12 flex flex-col gap-5">
              <div>
                <p className="label mb-3" style={{ color: "var(--faint)", letterSpacing: "0.14em" }}>
                  Activités
                </p>
                <div className="flex flex-wrap gap-2">
                  {ACTIVITES_MENU.map((a) => (
                    <Link
                      key={a.slug}
                      to="/activites/$slug"
                      params={{ slug: a.slug }}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-full border px-4 py-2 text-[15px] font-medium"
                      style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}
                    >
                      {a.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="label mb-3" style={{ color: "var(--faint)", letterSpacing: "0.14em" }}>
                  Fonctionnalités
                </p>
                <div className="flex flex-wrap gap-2">
                  {FONCTIONNALITES.map((x) => (
                    <Link
                      key={x.slug}
                      to="/fonctionnalites/$slug"
                      params={{ slug: x.slug }}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-full border px-4 py-2 text-[15px] font-medium"
                      style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}
                    >
                      {x.name}
                    </Link>
                  ))}
                </div>
              </div>
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
              <PrimaryButton to={TRIAL_URL} className="w-full">
                Essai gratuit 14 jours
              </PrimaryButton>
              <a
                href={DEMO_URL}
                className="mt-4 block text-center text-[15px] font-medium"
                style={{ color: "var(--muted)" }}
              >
                Voir une démo
              </a>
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
              Une assistante IA qui répond à vos clientes sur Instagram, Facebook et WhatsApp,
              relance celles qui ne reviennent plus et collecte vos avis Google. Pour les métiers de
              la beauté, du bien-être et du fitness. Zéro commission.
            </p>
            <p className="label mt-6" style={{ color: "var(--faint)", letterSpacing: "0.14em" }}>
              Certifié ISO 9001 · MENA &amp; Europe
            </p>

            <div className="mt-12">
              <h4 className="label" style={{ color: "var(--faint)", letterSpacing: "0.14em" }}>
                Essai gratuit
              </h4>
              <p
                className="mt-4 max-w-[20rem] text-[14.5px] leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                Testez ClientX pendant 14 jours dans votre établissement, ou demandez une
                démonstration en direct.
              </p>
              <a
                href={TRIAL_URL}
                className="btn-glow group mt-6 inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-1.5 text-[14.5px] font-semibold"
              >
                Essai gratuit 14 jours
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" weight="bold" style={{ color: "#0b0f0c" }} />
                </span>
              </a>
            </div>
          </div>

          {/* Plateforme */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="label" style={{ color: "var(--faint)", letterSpacing: "0.14em" }}>
              Activités
            </h4>
            <ul className="mt-5 space-y-3.5 text-[14.5px]">
              {ACTIVITES_MENU.map((a) => (
                <li key={a.slug}>
                  <Link
                    to="/activites/$slug"
                    params={{ slug: a.slug }}
                    className="footer-link"
                    style={{ color: "var(--ink)" }}
                  >
                    {a.label}
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
                  ["/cas-clients", "Clients"],
                  ["/fonctionnalites", "Fonctionnalités"],
                  ["/tarifs", "Tarifs"],
                  [TRIAL_URL, "Essai gratuit 14 jours"],
                  [DEMO_URL, "Voir une démo"],
                  ["/contact", "Mise en place & support"],
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
          <p>© 2013–2026 ClientX AI by Webeuz. Tous droits réservés.</p>
          <p className="hidden lg:block" style={{ color: "var(--faint)" }}>
            Conçu pour les métiers de la beauté, du bien-être et du fitness
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
