import { createFileRoute } from "@tanstack/react-router";
import { pageSeo, jsonLd, breadcrumbLd } from "../lib/seo";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  Copy,
  Check,
  MagnifyingGlass,
  MonitorPlay,
  Wrench,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { PageMain } from "../components/site/primitives";
import { BookingWidget } from "../components/site/BookingWidget";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { offre?: string } =>
    typeof search["offre"] === "string" ? { offre: search["offre"] } : {},
  head: () => ({
    ...pageSeo({
      title: "Essai gratuit 14 jours ou démo — ClientX AI",
      description:
        "Démarrez votre essai gratuit de 14 jours, ou réservez une démonstration en direct avec l'équipe ClientX AI. Zéro commission.",
      path: "/contact",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Contact", path: "/contact" }]))],
  }),
  component: ContactPage,
});

const WHY_POINTS = [
  {
    icon: MagnifyingGlass,
    title: "Votre activité, pas une démo générique",
    text: "Nous partons de votre métier : soins, tarifs, horaires et clientes.",
  },
  {
    icon: MonitorPlay,
    title: "Voir l'assistante en action",
    text: "Nous montrons comment elle répond sur Instagram, Facebook et WhatsApp.",
  },
  {
    icon: Wrench,
    title: "Mise en place accompagnée",
    text: "Nous configurons votre assistante avec vous (490 € HT, une seule fois).",
  },
];

const CONTACT_INFO = [
  {
    icon: EnvelopeSimple,
    label: "Email",
    value: "support@clientx.ai",
    href: "mailto:support@clientx.ai",
    copy: "support@clientx.ai",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 (0)7 83 65 33 84",
    href: "tel:+33783653384",
    copy: "+33783653384",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Paris & International",
    href: undefined,
    copy: undefined,
  },
];

const TRUST_PILLS = ["Essai gratuit 14 jours", "Zéro commission", "Certifié ISO 9001"];

function ContactPage() {
  const { offre } = Route.useSearch();
  const isTrial = offre === "essai-gratuit-14-jours";
  return (
    <PageMain>
      <div className="container-x grid gap-8 pt-32 md:pt-36 lg:grid-cols-[380px_1fr] lg:items-start">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-28"
        >
          <h1
            className="text-balance font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem,4.6vw,3.6rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              color: "var(--ink)",
            }}
          >
            {isTrial ? (
              <>
                Démarrez votre <span style={{ color: "var(--green-text)" }}>essai gratuit</span> de
                14 jours
              </>
            ) : (
              <>
                Réservez votre <span style={{ color: "var(--green-text)" }}>démo en direct</span>
              </>
            )}
          </h1>
          <p
            className="text-pretty mt-5 max-w-[34rem] text-[16px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {isTrial
              ? "Choisissez un créneau : l'équipe ClientX lance votre essai et configure votre assistante avec vous."
              : "Choisissez un créneau pour voir ClientX fonctionner sur votre propre activité."}
          </p>

          {/* Why points */}
          <div className="card mt-8 p-6">
            <h2 className="mb-4 text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
              Ce qui se passe pendant l'échange
            </h2>
            <div className="space-y-4">
              {WHY_POINTS.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                    style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
                  >
                    <p.icon className="h-5 w-5" weight="regular" />
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--ink)" }}>
                      {p.title}
                    </p>
                    <p className="text-[13px]" style={{ color: "var(--muted)" }}>
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="card mt-5 p-6">
            <h2 className="mb-4 text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
              Centre d'Assistance ClientX AI
            </h2>
            <div className="space-y-3">
              {CONTACT_INFO.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                    style={{ background: "var(--bg-soft)", color: "var(--muted)" }}
                  >
                    <c.icon className="h-5 w-5" weight="regular" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px]" style={{ color: "var(--faint)" }}>
                      {c.label}
                    </p>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-[14px] font-medium underline-grow"
                        style={{ color: "var(--ink)" }}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-[14px] font-medium" style={{ color: "var(--ink)" }}>
                        {c.value}
                      </p>
                    )}
                  </div>
                  {c.copy && <CopyButton value={c.copy} />}
                </div>
              ))}
            </div>
          </div>

          {/* Trust pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {TRUST_PILLS.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px]"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--line)",
                  color: "var(--muted)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--green)" }} />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right column: calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card p-3"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <div className="overflow-hidden rounded-[16px]" style={{ background: "#ffffff" }}>
            <BookingWidget minHeight={780} />
          </div>
        </motion.div>
      </div>
      <div className="h-20" />
    </PageMain>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard
          .writeText(value)
          .then(() => {
            setCopied(true);
            toast.success("Copié");
            setTimeout(() => setCopied(false), 1500);
          })
          .catch(() => toast.error("Copie impossible"));
      }}
      aria-label="Copier"
      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors"
      style={{
        background: "var(--bg-soft)",
        border: "1px solid var(--line)",
        color: "var(--muted)",
      }}
    >
      {copied ? (
        <Check className="h-4 w-4" weight="bold" style={{ color: "var(--green)" }} />
      ) : (
        <Copy className="h-4 w-4" weight="regular" />
      )}
    </button>
  );
}
