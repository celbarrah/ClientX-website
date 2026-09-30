import { motion } from "framer-motion";
import {
  TrendUp,
  UsersThree,
  ArrowsLeftRight,
  Play,
  Eye,
  Lightning,
  CircleNotch,
  TextAlignLeft,
  CheckCircle,
  CreditCard,
} from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const line = "var(--line)";
const lineStrong = "var(--line-strong)";
const ink = "var(--ink)";
const muted = "var(--muted)";
const green = "var(--green)";
const greenText = "var(--green-text)";
const greenSoft = "var(--green-soft)";
const bgSoft = "var(--bg-soft)";
const surface = "var(--surface)";

const dot = (c: string) => ({
  width: 6,
  height: 6,
  borderRadius: 999,
  background: c,
  display: "inline-block",
});

/* ---------- shared mini-panel ---------- */
function Panel({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-2xl border ${className}`}
      style={{
        borderColor: dark ? "rgba(255,255,255,0.12)" : line,
        background: dark ? "rgba(255,255,255,0.04)" : surface,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {children}
    </div>
  );
}

function Bar({ h, c = green, o = 1 }: { h: number; c?: string; o?: number }) {
  return <div style={{ height: h, borderRadius: 4, background: c, opacity: o, width: "100%" }} />;
}

/* ============================================================
   1. SITES & FUNNELS — page/funnel builder
   ============================================================ */
function SitesFunnelsMock() {
  return (
    <Panel className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={dot(green)} />
          <span className="text-[11px] font-medium" style={{ color: muted }}>
            Landing — Offre Pro
          </span>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: greenSoft, color: greenText }}
        >
          A/B
        </span>
      </div>
      <div className="mt-3 space-y-2.5">
        <Block label="Hero">
          <div style={{ height: 34, borderRadius: 6, background: bgSoft }} />
        </Block>
        <Block label="Formulaire">
          <div className="grid grid-cols-2 gap-1.5">
            <div style={{ height: 18, borderRadius: 5, background: bgSoft }} />
            <div style={{ height: 18, borderRadius: 5, background: bgSoft }} />
          </div>
        </Block>
        <Block label="Bouton CTA">
          <div
            style={{
              height: 24,
              width: "55%",
              borderRadius: 999,
              background: ink,
            }}
          />
        </Block>
      </div>
    </Panel>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex flex-col gap-0.5">
        <span style={{ ...dot(lineStrong), width: 4, height: 4 }} />
        <span style={{ ...dot(lineStrong), width: 4, height: 4 }} />
      </span>
      <div className="flex-1">
        <div className="text-[10px] font-medium" style={{ color: muted }}>
          {label}
        </div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================
   2. CRM — pipeline (kanban)
   ============================================================ */
function CrmMock() {
  const cols = [
    {
      title: "Nouveau",
      items: [
        { n: "S. Bennani", v: "1 200 €" },
        { n: "K. Idrissi", v: "800 €" },
      ],
    },
    { title: "Qualifié", items: [{ n: "M. Lahlou", v: "3 400 €" }] },
    { title: "Gagné", items: [{ n: "R. Fassi", v: "5 900 €" }] },
  ];
  return (
    <Panel className="p-4">
      <div className="grid grid-cols-3 gap-2.5">
        {cols.map((c) => (
          <div key={c.title}>
            <div className="mb-2 flex items-center gap-1.5">
              <span style={dot(green)} />
              <span className="text-[10px] font-semibold" style={{ color: muted }}>
                {c.title}
              </span>
            </div>
            <div className="space-y-2">
              {c.items.map((it) => (
                <div
                  key={it.n}
                  className="rounded-lg border p-2"
                  style={{ borderColor: line, background: bgSoft }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 999,
                        background: greenSoft,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <span className="text-[8px] font-bold" style={{ color: greenText }}>
                        {it.n[0]}
                      </span>
                    </span>
                    <span className="text-[10px] font-medium" style={{ color: ink }}>
                      {it.n}
                    </span>
                  </div>
                  <div
                    className="mt-1 text-[10px]"
                    style={{ color: greenText, fontVariantNumeric: "tabular-nums" }}
                  >
                    {it.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ============================================================
   3. EMAILING & SMS — composer + status
   ============================================================ */
function EmailMock() {
  return (
    <Panel className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium" style={{ color: muted }}>
          Campagne — Promo été
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: greenSoft, color: greenText }}
        >
          <CheckCircle className="h-3 w-3" weight="fill" /> Envoyé
        </span>
      </div>
      <div
        className="mt-3 rounded-lg border p-2.5"
        style={{ borderColor: line, background: bgSoft }}
      >
        <div style={{ height: 12, width: "60%", borderRadius: 4, background: lineStrong }} />
        <div className="mt-2 space-y-1.5">
          <div style={{ height: 8, borderRadius: 4, background: line }} />
          <div style={{ height: 8, width: "82%", borderRadius: 4, background: line }} />
        </div>
      </div>
      <div className="mt-3">
        <div
          className="mb-1 flex items-center justify-between text-[10px]"
          style={{ color: muted }}
        >
          <span>Taux d'ouverture</span>
          <span style={{ color: ink, fontVariantNumeric: "tabular-nums" }}>42,8%</span>
        </div>
        <div style={{ height: 5, borderRadius: 999, background: bgSoft, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "42%", borderRadius: 999, background: green }} />
        </div>
      </div>
    </Panel>
  );
}

/* ============================================================
   4. CALENDRIERS — week strip + toast
   ============================================================ */
function CalendarMock() {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const booked = [1, 3, 5];
  return (
    <Panel className="p-4">
      <div className="flex justify-between">
        {days.map((d, i) => (
          <div key={i} className="flex-1 text-center">
            <div className="text-[10px] font-medium" style={{ color: muted }}>
              {d}
            </div>
            <div className="mt-1.5 space-y-1">
              <div
                style={{
                  height: booked.includes(i) ? 18 : 10,
                  borderRadius: 4,
                  background: booked.includes(i) ? green : bgSoft,
                }}
              />
              <div style={{ height: 8, borderRadius: 4, background: bgSoft }} />
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-3 flex items-center gap-2 rounded-lg border p-2"
        style={{ borderColor: greenSoft, background: greenSoft }}
      >
        <Lightning className="h-3.5 w-3.5" weight="fill" style={{ color: greenText }} />
        <span className="text-[10px] font-medium" style={{ color: greenText }}>
          Rappel envoyé · RDV 14h30
        </span>
      </div>
    </Panel>
  );
}

/* ============================================================
   5. FORMATIONS — course row with progress
   ============================================================ */
function CoursesMock() {
  const courses = [
    { t: "Module 1", p: 100 },
    { t: "Module 2", p: 64 },
    { t: "Module 3", p: 28 },
    { t: "Module 4", p: 0 },
  ];
  return (
    <Panel className="p-4">
      <div className="flex items-center gap-2">
        <Play className="h-4 w-4" weight="fill" style={{ color: green }} />
        <span className="text-[11px] font-medium" style={{ color: muted }}>
          Ma formation — Continuer
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {courses.map((c) => (
          <div key={c.t}>
            <div
              className="relative aspect-video overflow-hidden rounded-lg"
              style={{ background: bgSoft }}
            >
              {c.p === 100 && (
                <span className="absolute right-1 top-1">
                  <CheckCircle className="h-3.5 w-3.5" weight="fill" style={{ color: green }} />
                </span>
              )}
              <span
                className="absolute bottom-0 left-0"
                style={{ height: 3, width: "100%", background: line }}
              />
              <span
                className="absolute bottom-0 left-0"
                style={{ height: 3, width: `${c.p}%`, background: green }}
              />
            </div>
            <div className="mt-1.5 text-[9px] font-medium" style={{ color: muted }}>
              {c.t}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ============================================================
   6. AUTOMATISATIONS — vertical flow
   ============================================================ */
function WorkflowMock() {
  const nodes = [
    { t: "Déclencheur", s: "Nouveau lead", icon: Lightning },
    { t: "Action 1", s: "Envoi email", icon: ArrowsLeftRight },
    { t: "Action 2", s: "Tag + tâche", icon: CheckCircle },
  ];
  return (
    <Panel className="p-4">
      <div className="flex items-center gap-2">
        <CircleNotch className="h-3.5 w-3.5" weight="bold" style={{ color: green }} />
        <span className="text-[11px] font-medium" style={{ color: muted }}>
          Workflow — Lead entrant
        </span>
      </div>
      <div className="mt-3 space-y-0">
        {nodes.map((n, i) => (
          <div key={i}>
            <div
              className="flex items-center gap-2.5 rounded-lg border p-2"
              style={{ borderColor: line, background: bgSoft }}
            >
              <span
                className="grid h-6 w-6 place-items-center rounded-md"
                style={{ background: greenSoft }}
              >
                <n.icon className="h-3.5 w-3.5" weight="bold" style={{ color: greenText }} />
              </span>
              <div>
                <div className="text-[10px] font-semibold" style={{ color: ink }}>
                  {n.t}
                </div>
                <div className="text-[9px]" style={{ color: muted }}>
                  {n.s}
                </div>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="ml-5 h-4 w-px" style={{ background: greenSoft }} />
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ============================================================
   7. PLANIFICATEUR SOCIAL — month grid + post chips
   ============================================================ */
function SocialMock() {
  const nets: Record<string, string> = {
    IG: "#E1306C",
    FB: "#1877F2",
    TT: "#000000",
    LI: "#0A66C2",
  };
  const grid = Array.from({ length: 21 });
  const posts: Record<number, string> = { 3: "IG", 8: "FB", 10: "TT", 15: "LI", 17: "IG" };
  return (
    <Panel className="p-4">
      <div className="text-[11px] font-medium" style={{ color: muted }}>
        Octobre — Programmation
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {grid.map((_, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-md"
            style={{ background: bgSoft, position: "relative" }}
          >
            <span className="text-[8px]" style={{ color: muted }}>
              {i + 1}
            </span>
            {posts[i] && (
              <span
                style={{
                  ...dot(nets[posts[i]]),
                  position: "absolute",
                  right: 3,
                  top: 3,
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        {Object.entries(nets).map(([k, c]) => (
          <span key={k} className="flex items-center gap-1">
            <span style={dot(c)} />
            <span className="text-[9px]" style={{ color: muted }}>
              {k}
            </span>
          </span>
        ))}
      </div>
    </Panel>
  );
}

/* ============================================================
   8. WEBINARS — live frame + chat
   ============================================================ */
function WebinarMock() {
  return (
    <Panel className="overflow-hidden p-0">
      <div className="relative aspect-video" style={{ background: "#0c1110" }}>
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 60% 40%, rgba(22,196,91,0.25), transparent 70%)",
          }}
        />
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-bold text-white">
          <span style={dot("#fff")} /> LIVE
        </span>
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold text-white">
          <Eye className="h-3 w-3" weight="fill" /> 1 248
        </span>
        <div className="absolute bottom-2 left-2 right-2 space-y-1">
          <div className="rounded-lg bg-white/10 px-2 py-1 text-[9px] text-white/90 backdrop-blur">
            Sophie : Super contenu 🔥
          </div>
          <div className="rounded-lg bg-white/10 px-2 py-1 text-[9px] text-white/90 backdrop-blur">
            Karim : Lien inscription ?
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ============================================================
   9. PANIER & FACTURATION — checkout
   ============================================================ */
function CheckoutMock() {
  return (
    <Panel className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium" style={{ color: muted }}>
          Commande — Offre Pro
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ background: green, color: ink }}
        >
          <CheckCircle className="h-3 w-3" weight="fill" /> Payé
        </span>
      </div>
      <div className="mt-3 space-y-2">
        <LineItem label="Offre Pro — 1 an" value="2 490 €" />
        <div
          className="flex items-center justify-between rounded-lg border p-2"
          style={{ borderColor: line, background: bgSoft }}
        >
          <div className="flex items-center gap-2">
            <span
              style={{
                width: 26,
                height: 15,
                borderRadius: 999,
                background: green,
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: 1,
                  top: 1,
                  width: 13,
                  height: 13,
                  borderRadius: 999,
                  background: surface,
                }}
              />
            </span>
            <span className="text-[10px] font-medium" style={{ color: ink }}>
              Order bump — Pack Templates
            </span>
          </div>
          <span className="text-[10px] font-semibold" style={{ color: ink }}>
            +97 €
          </span>
        </div>
      </div>
      <div
        className="mt-3 flex items-center justify-between border-t pt-2.5 text-[12px] font-semibold"
        style={{ borderColor: line, color: ink }}
      >
        <span>Total</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>2 587 €</span>
      </div>
    </Panel>
  );
}

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[10px]" style={{ color: muted }}>
      <span>{label}</span>
      <span style={{ color: ink, fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

/* ============================================================
   HERO — dashboard mini-UI
   ============================================================ */
function DashboardMock() {
  return (
    <Panel className="overflow-hidden p-0">
      {/* top bar */}
      <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: line }}>
        <span style={dot("#ff5f57")} />
        <span style={dot("#febc2e")} />
        <span style={dot("#28c840")} />
      </div>
      <div className="flex">
        {/* sidebar */}
        <div
          className="hidden w-12 flex-col items-center gap-3 border-r py-3 sm:flex"
          style={{ borderColor: line }}
        >
          <span className="grid h-6 w-6 place-items-center rounded-lg" style={{ background: ink }}>
            <TextAlignLeft className="h-3.5 w-3.5" weight="bold" style={{ color: "#fff" }} />
          </span>
          {[UsersThree, EnvelopeIcon, CalendarIconSmall, CreditCard].map((Ic, i) => (
            <Ic key={i} className="h-4 w-4" weight="regular" style={{ color: muted }} />
          ))}
        </div>
        {/* main */}
        <div className="flex-1 p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold" style={{ color: ink }}>
                Vue d'ensemble
              </div>
              <div className="text-[9px]" style={{ color: muted }}>
                Octobre 2026
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold"
              style={{ background: greenSoft, color: greenText }}
            >
              <span style={dot(green)} /> Live
            </span>
          </div>
          {/* KPI row */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { l: "Leads", v: "3 749", t: "+12%" },
              { l: "RDV", v: "2 800", t: "+8%" },
              { l: "CA", v: "1,0 M€", t: "+24%" },
            ].map((k) => (
              <div
                key={k.l}
                className="rounded-lg border p-2"
                style={{ borderColor: line, background: bgSoft }}
              >
                <div className="text-[8px]" style={{ color: muted }}>
                  {k.l}
                </div>
                <div
                  className="text-[12px] font-bold"
                  style={{ color: ink, fontVariantNumeric: "tabular-nums" }}
                >
                  {k.v}
                </div>
                <div className="flex items-center gap-0.5 text-[8px]" style={{ color: greenText }}>
                  <TrendUp className="h-2.5 w-2.5" weight="bold" /> {k.t}
                </div>
              </div>
            ))}
          </div>
          {/* chart */}
          <div className="mt-3 rounded-lg border p-3" style={{ borderColor: line }}>
            <div className="flex items-end justify-between gap-1.5" style={{ height: 56 }}>
              {[40, 55, 35, 70, 48, 82, 60, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
                  style={{
                    flex: 1,
                    borderRadius: 4,
                    background: `linear-gradient(to top, ${green}, ${greenSoft})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* small icon imports used by dashboard sidebar */
function EnvelopeIcon(p: any) {
  return <CreditCard {...p} />;
}
function CalendarIconSmall(p: any) {
  return <ArrowsLeftRight {...p} />;
}

/* ============================================================
   Registry + wrapper
   ============================================================ */
const MOCKS: Record<string, () => React.ReactElement> = {
  // bento / features
  "Sites & Tunnels de Vente": SitesFunnelsMock,
  "CRM Systémique & Ventes": CrmMock,
  "Emailing & SMS Marketing": EmailMock,
  "Calendriers & Rendez-vous IA": CalendarMock,
  "Formations & E-learning": CoursesMock,
  "Automatisations & Workflows": WorkflowMock,
  "Planificateur Réseaux Sociaux": SocialMock,
  "Webinars Live & Direct": WebinarMock,
  "Paniers 2.0 & Facturation": CheckoutMock,
  // modules page labels
  "Funnel Builder": SitesFunnelsMock,
  "Pipeline Ventes": CrmMock,
  "Inbox Unifiée": EmailMock,
  Calendrier: CalendarMock,
  "Espace Formation": CoursesMock,
  "Planificateur Social": SocialMock,
  "Workflow Builder": WorkflowMock,
  "Webinar Live": WebinarMock,
  "Checkout 2.0": CheckoutMock,
  // hero
  "ClientX Dashboard": DashboardMock,
  dashboard: DashboardMock,
  // steps
  "Email, WhatsApp, Social": EmailMock,
  "Calendriers, Ventes, Devis": CrmMock,
  "CRM & Automatisations": WorkflowMock,
  "Sites, Funnels, E-learning": SitesFunnelsMock,
};

export function ModuleMock({
  kind,
  className = "",
  dark = false,
}: {
  kind: string;
  className?: string;
  dark?: boolean;
}) {
  const Comp = MOCKS[kind] || DashboardMock;
  return (
    <div className={className} style={{ width: "100%" }}>
      <Comp />
    </div>
  );
}
