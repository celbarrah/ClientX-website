import { useState } from "react";
import { Phone, ChatCircleDots, Star, FlowArrow } from "@phosphor-icons/react";
import { MaxWorkflowDemo } from "./MaxWorkflowDemo";
import { JadeReviewsDemo } from "./JadeReviewsDemo";
import { InlineChatSimulator } from "./InlineChatSimulator";

const CLIENTX_LOGO =
  "https://res.cloudinary.com/dofyrwzop/image/upload/v1784891688/t%C3%A9l%C3%A9chargement_mmeb9f.jpg";

type UseCase = {
  label: string;
  initials: string;
  name: string;
  sector: string;
  goal: string;
  widgetId: string;
  summary: { label: string; value: string }[];
};

const LEA_USE_CASES: Record<string, UseCase> = {
  spa: {
    label: "Spa & Bien-être",
    initials: "OS",
    name: "Oasis Spa",
    sector: "Spa et massage · Nice, France",
    goal: "Réservation de soin",
    widgetId: "6a687053f2ad83082156e320",
    summary: [
      { label: "Prestation", value: "Massage relaxant" },
      { label: "Durée", value: "60 min" },
      { label: "Date", value: "Samedi 14h" },
    ],
  },
  restaurant: {
    label: "Restaurant",
    initials: "LB",
    name: "Le Bistrot Parisien",
    sector: "Brasserie française · Paris, France",
    goal: "Réservation de table",
    widgetId: "6a687124f2ad830821570c7a",
    summary: [
      { label: "Couverts", value: "4 personnes" },
      { label: "Date", value: "Vendredi 20h" },
      { label: "Demande", value: "Table en terrasse" },
    ],
  },
  dentiste: {
    label: "Dentiste",
    initials: "CD",
    name: "Cabinet Dentaire Sourire",
    sector: "Chirurgie dentaire · Lille, France",
    goal: "Prise de rendez-vous médical",
    widgetId: "6a68719fb0ee6ed3ac570f4a",
    summary: [
      { label: "Motif", value: "Détartrage" },
      { label: "Patient", value: "Nouveau patient" },
      { label: "Disponibilité", value: "Matin" },
    ],
  },
};

const AXEL_USE_CASES: Record<string, UseCase> = {
  assurance: {
    label: "Assurance",
    initials: "AM",
    name: "Atlas Montana",
    sector: "Courtier en assurance · Lyon, France",
    goal: "Questions/réponses + devis",
    widgetId: "69eb517852e61553e0314670",
    summary: [
      { label: "Type d'assurance", value: "Auto" },
      { label: "Profil", value: "Conducteur" },
      { label: "Question type", value: "Devis" },
    ],
  },
  complements: {
    label: "Compléments alimentaires",
    initials: "VP",
    name: "VitaPure Labs",
    sector: "Compléments alimentaires · Bordeaux, France",
    goal: "Conseil + vente en ligne",
    widgetId: "69eb5099bd8fe85dc6496e6a",
    summary: [
      { label: "Besoin", value: "Énergie" },
      { label: "Produit", value: "Ginseng" },
      { label: "Quantité", value: "1 boîte" },
    ],
  },
  dentiste: {
    label: "Dentiste",
    initials: "CD",
    name: "Cabinet Dentaire Sourire",
    sector: "Chirurgie dentaire · Lille, France",
    goal: "Questions/réponses + devis",
    widgetId: "6a68cbdc883a38e90ef1a3d2",
    summary: [
      { label: "Motif", value: "Détartrage" },
      { label: "Patient", value: "Nouveau patient" },
      { label: "Question type", value: "Devis" },
    ],
  },
};

const MONO = { fontFamily: "var(--font-mono)" } as const;

function AgentImageCard({
  badge,
  imageSrc,
  imageAlt,
  name,
  role,
}: {
  badge: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  role: string;
}) {
  return (
    <div className="flex flex-col md:sticky md:top-44 md:self-start">
      <div
        className="group relative mb-5 aspect-[4/3] overflow-hidden rounded-[22px] md:aspect-[3/4]"
        style={{
          background: "linear-gradient(160deg,#e9f8ec 0%,#d7efdc 100%)",
          boxShadow: "0 0 0 1px rgba(10,30,15,0.07), 0 24px 50px -24px rgba(16,60,28,0.35)",
        }}
      >
        <div
          className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.14em]"
          style={{
            ...MONO,
            background: "rgba(255,255,255,0.85)",
            color: "var(--green-text)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 0 1px rgba(50,220,50,0.25)",
          }}
        >
          {badge}
        </div>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <img src={CLIENTX_LOGO} alt="ClientX" className="h-6 object-contain" />
        </div>
      </div>
      <h2
        className="text-[1.6rem] font-semibold"
        style={{ letterSpacing: "-0.035em", color: "var(--ink)" }}
      >
        {name}
      </h2>
      <p className="text-[14px]" style={{ color: "var(--muted)" }}>
        {role}
      </p>
    </div>
  );
}

function SectorTabs({
  keys,
  labels,
  active,
  onChange,
}: {
  keys: string[];
  labels: Record<string, string>;
  active: string;
  onChange: (k: string) => void;
}) {
  return (
    <div className="glass-pill mb-6 inline-flex max-w-full flex-wrap gap-1.5 rounded-full p-1.5">
      {keys.map((key) => {
        const on = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all duration-200"
            style={{
              background: on
                ? "linear-gradient(180deg, #62f262 0%, #32dc32 55%, #25c425 100%)"
                : "transparent",
              color: on ? "#031003" : "var(--muted)",
              boxShadow: on
                ? "0 0 0 1px rgba(22,150,30,0.4), 0 8px 20px -8px rgba(50,220,50,0.65)"
                : "none",
            }}
          >
            {labels[key]}
          </button>
        );
      })}
    </div>
  );
}

function AgentSimulation({
  badge,
  imageSrc,
  imageAlt,
  name,
  role,
  simulationLabel,
  summaryLabel,
  useCases,
  defaultKey,
}: {
  badge: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  role: string;
  simulationLabel: string;
  summaryLabel: string;
  useCases: Record<string, UseCase>;
  defaultKey: string;
}) {
  const [activeKey, setActiveKey] = useState(defaultKey);
  const activeCase = useCases[activeKey]!;
  const labels = Object.fromEntries(Object.entries(useCases).map(([k, v]) => [k, v.label]));

  return (
    <AgentShell>
      <AgentImageCard
        badge={badge}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        name={name}
        role={role}
      />

      <div className="min-w-0">
        <SectorTabs
          keys={Object.keys(useCases)}
          labels={labels}
          active={activeKey}
          onChange={setActiveKey}
        />

        <div
          className="rounded-[22px] p-5 md:p-7"
          style={{
            background: "linear-gradient(180deg,#f8fbf9 0%,#f2f7f3 100%)",
            boxShadow: "0 0 0 1px rgba(10,30,15,0.07), 0 1px 0 #fff inset",
          }}
        >
          <p
            className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.16em]"
            style={{ ...MONO, color: "var(--faint)" }}
          >
            {simulationLabel}
          </p>

          {/* Company banner */}
          <div
            className="mb-5 flex items-center justify-between rounded-2xl bg-white p-4"
            style={{
              boxShadow: "0 0 0 1px rgba(10,30,15,0.07), 0 8px 20px -14px rgba(16,60,28,0.3)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-[13px] font-bold"
                style={{ background: "var(--green-soft)", color: "var(--green-text)" }}
              >
                {activeCase.initials}
              </div>
              <div>
                <div className="text-[14px] font-semibold" style={{ color: "var(--ink)" }}>
                  {activeCase.name}
                </div>
                <div className="text-[12px]" style={{ color: "var(--muted)" }}>
                  {activeCase.sector}
                </div>
              </div>
            </div>
            <div
              className="hidden rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.12em] sm:block"
              style={{
                ...MONO,
                background: "var(--green-soft)",
                color: "var(--green-text)",
                boxShadow: "0 0 0 1px rgba(50,220,50,0.25)",
              }}
            >
              CAS D'USAGE
            </div>
          </div>

          {/* Goal */}
          <div className="mb-2 text-[13px]">
            <span style={{ color: "var(--muted)" }}>Objectif de l'agent : </span>
            <span className="font-semibold" style={{ color: "var(--ink)" }}>
              {activeCase.goal}
            </span>
          </div>

          <InlineChatSimulator widgetId={activeCase.widgetId} agentName={name} />

          <p
            className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em]"
            style={{ ...MONO, color: "var(--faint)" }}
          >
            {summaryLabel}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {activeCase.summary.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white p-3.5"
                style={{ boxShadow: "0 0 0 1px rgba(10,30,15,0.07)" }}
              >
                <div
                  className="mb-1 text-[9.5px] uppercase tracking-[0.12em]"
                  style={{ ...MONO, color: "var(--faint)" }}
                >
                  {item.label}
                </div>
                <div className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AgentShell>
  );
}

function AgentShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-card grid grid-cols-1 gap-8 !rounded-[32px] p-5 md:grid-cols-[280px_1fr] md:gap-10 md:p-10">
      {children}
    </div>
  );
}

function DemoHeader({ name, accent, text }: { name: string; accent: string; text: string }) {
  return (
    <div className="mb-8">
      <h2
        className="font-semibold"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 2.6vw, 2.4rem)",
          letterSpacing: "-0.04em",
          color: "var(--ink)",
        }}
      >
        {name}{" "}
        <span className="accent-serif" style={{ fontSize: "1.08em" }}>
          {accent}
        </span>
      </h2>
      <p className="mt-3 text-[15px]" style={{ color: "var(--muted)" }}>
        {text}
      </p>
    </div>
  );
}

const NAV = [
  { href: "#lea", label: "Léa (Voice AI)", Icon: Phone },
  { href: "#axel", label: "Axel (Chat AI)", Icon: ChatCircleDots },
  { href: "#jade", label: "Jade (Reviews AI)", Icon: Star },
  { href: "#max", label: "Max (Workflow AI)", Icon: FlowArrow },
];

export function AgentDemoSection() {
  return (
    <div id="demos" className="container-x relative pb-8">
      {/* Header */}
      <div className="relative pb-10 pt-32 text-center md:pt-40">
        <div
          aria-hidden
          className="orb left-1/2 top-16 h-[360px] w-[640px] -translate-x-1/2 opacity-40"
        />
        <h1
          className="relative font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.6rem, 5.4vw, 4.8rem)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          <span className="grad-ink">Nos Agents IA en</span>{" "}
          <span className="accent-serif" style={{ fontSize: "1.08em" }}>
            Action
          </span>
        </h1>
        <p
          className="relative mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Découvrez nos quatre agents IA en simulation. Utilisez la barre de navigation ci-dessous
          pour accéder directement à chaque agent.
        </p>
      </div>

      {/* Sticky agent navigation */}
      <div className="sticky top-[84px] z-30 mb-10 flex justify-center md:top-[92px]">
        <div className="glass-pill no-scrollbar flex max-w-full gap-1.5 overflow-x-auto rounded-full p-1.5">
          {NAV.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 hover:bg-[var(--green-soft)] hover:text-[var(--green-text)]"
              style={{ color: "var(--text)" }}
            >
              <Icon className="h-4 w-4" weight="bold" />
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Agents */}
      <div className="space-y-8">
        <section id="lea" className="scroll-mt-40">
          <AgentSimulation
            badge="VOICE AI"
            imageSrc="https://clientx.uk/wp-content/uploads/2026/05/lea.webp"
            imageAlt="Léa"
            name="Léa"
            role="Assistante Commerciale"
            simulationLabel="SIMULATION LÉA"
            summaryLabel="RÉSUMÉ DU LEAD (APRÈS APPEL)"
            useCases={LEA_USE_CASES}
            defaultKey="spa"
          />
        </section>

        <section id="axel" className="scroll-mt-40">
          <AgentSimulation
            badge="CHAT AI"
            imageSrc="https://clientx.uk/wp-content/uploads/2026/05/axel.webp"
            imageAlt="Axel"
            name="Axel"
            role="Assistant Conversationnel"
            simulationLabel="SIMULATION AXEL"
            summaryLabel="CHAMPS DE RÉSUMÉ AFFICHÉS"
            useCases={AXEL_USE_CASES}
            defaultKey="assurance"
          />
        </section>

        <section id="jade" className="scroll-mt-40">
          <AgentShell>
            <AgentImageCard
              badge="REVIEWS AI"
              imageSrc="https://clientx.uk/wp-content/uploads/2026/05/jade.webp"
              imageAlt="Jade"
              name="Jade"
              role="E-Réputation Manager"
            />
            <div className="min-w-0">
              <DemoHeader
                name="Jade"
                accent="Reviews AI"
                text="Collectez des avis positifs automatiquement et gérez les retours clients avec intelligence."
              />
              <JadeReviewsDemo />
            </div>
          </AgentShell>
        </section>

        <section id="max" className="scroll-mt-40">
          <AgentShell>
            <AgentImageCard
              badge="WORKFLOW AI"
              imageSrc="https://clientx.uk/wp-content/uploads/2026/05/max.webp"
              imageAlt="Max"
              name="Max"
              role="Agent Automatisation"
            />
            <div className="min-w-0">
              <DemoHeader
                name="Max"
                accent="Workflow AI"
                text="Visualisez comment Max orchestre vos processus métiers en arrière-plan."
              />
              <MaxWorkflowDemo />
            </div>
          </AgentShell>
        </section>
      </div>

      {/* Bottom CTA */}
      <div
        className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-[32px] px-6 py-12 text-center md:px-14 md:py-14"
        style={{
          background:
            "radial-gradient(60% 90% at 0% 0%, rgba(50,220,50,0.22), transparent 60%), linear-gradient(135deg,#eefbf0 0%,#f8fdf9 60%,#e7f8ea 100%)",
          boxShadow:
            "0 0 0 1px rgba(50,220,50,0.22), 0 1px 0 #fff inset, 0 40px 80px -40px rgba(22,120,40,0.35)",
        }}
      >
        <div aria-hidden className="mesh-grid pointer-events-none absolute inset-0" />
        <h2
          className="relative font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            letterSpacing: "-0.04em",
            color: "var(--ink)",
          }}
        >
          Besoin d'un Conseil pour Choisir vos Agents ?
        </h2>
        <p
          className="relative mx-auto mb-8 mt-4 max-w-xl text-[15px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Réservez un audit offert de 1h avec un expert ClientX. Nous analyserons votre tunnel
          commercial et vous recommanderons la combinaison idéale d'agents IA.
        </p>
        <div className="relative flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/contact"
            className="btn-glow inline-flex h-12 items-center justify-center rounded-full px-7 text-[15px] font-semibold"
          >
            Réserver mon audit gratuit
          </a>
          <a
            href="/tarifs"
            className="glass-pill inline-flex h-12 items-center justify-center rounded-full px-7 text-[15px] font-semibold"
            style={{ color: "var(--ink)" }}
          >
            Voir la grille tarifaire
          </a>
        </div>
      </div>
    </div>
  );
}
