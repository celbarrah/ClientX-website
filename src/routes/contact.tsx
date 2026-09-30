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
  head: () => ({
    ...pageSeo({
      title: "Réserver une Démo — ClientX AI",
      description:
        "Prenez rendez-vous pour une démonstration en direct avec un eXpert ClientX AI et configurez votre plateforme tout-en-un.",
      path: "/contact",
    }),
    scripts: [jsonLd(breadcrumbLd([{ name: "Réserver une Démo", path: "/contact" }]))],
  }),
  component: ContactPage,
});

const WHY_POINTS = [
  {
    icon: MagnifyingGlass,
    title: "Audit offert",
    text: "Audit offert de vos outils actuels et opportunités d'économies immédiates.",
  },
  {
    icon: MonitorPlay,
    title: "Démo en direct",
    text: "Démonstration en direct de la plateforme logicielle ClientX AI.",
  },
  {
    icon: Wrench,
    title: "Installation 1:1",
    text: "Accompagnement 1:1 pour l'installation technique de votre compte.",
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

const TRUST_PILLS = [
  "Confirmation instantanée par email & SMS",
  "Sans engagement de durée",
  "Entreprise certifiée ISO 9001",
];

function ContactPage() {
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
            Réservez votre Démo <span style={{ color: "var(--green-text)" }}>Personnalisée</span>
          </h1>
          <p
            className="text-pretty mt-5 max-w-[34rem] text-[16px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Sélectionnez la date et l'horaire de votre choix pour échanger sur vos processus et
            configurer votre plateforme unifiée.
          </p>

          {/* Why points */}
          <div className="card mt-8 p-6">
            <h2 className="mb-4 text-[15px] font-semibold" style={{ color: "var(--ink)" }}>
              Pourquoi réserver votre Démo ?
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
