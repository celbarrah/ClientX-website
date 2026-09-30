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
const bgSoft = "#f3f6f4";
const sub = "#f7f9f8";
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

/* ---------- shared bits ---------- */
function Avatar({
  name,
  color = "#16a34a",
  size = 22,
}: {
  name: string;
  color?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `${color}1f`,
        color,
      }}
    >
      {initials}
    </span>
  );
}

function Chip({
  children,
  tone = "green",
}: {
  children: React.ReactNode;
  tone?: "green" | "grey" | "amber" | "blue";
}) {
  const t = {
    green: [greenSoft, greenText],
    grey: ["#eef1ef", "#5b645f"],
    amber: ["#fff4e0", "#b26a00"],
    blue: ["#e8f0fe", "#1a56db"],
  }[tone];
  return (
    <span
      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[9.5px] font-semibold"
      style={{ background: t[0], color: t[1] }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   1. SITES & FUNNELS — live landing page preview
   ============================================================ */
function SitesFunnelsMock() {
  return (
    <Panel className="overflow-hidden p-0">
      {/* browser bar */}
      <div
        className="flex items-center gap-2 border-b px-3 py-2"
        style={{ borderColor: line, background: sub }}
      >
        <span style={dot("#ff5f57")} />
        <span style={dot("#febc2e")} />
        <span style={dot("#28c840")} />
        <span
          className="ml-1 flex-1 truncate rounded-md px-2 py-0.5 text-[9.5px]"
          style={{ background: "#fff", color: muted, boxShadow: `0 0 0 1px ${line}` }}
        >
          clientx.ai/offre-pro
        </span>
        <Chip>A/B · Variante B</Chip>
      </div>
      {/* page */}
      <div className="grid grid-cols-[1.25fr_1fr] gap-3 p-3.5">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ background: green }} />
            <span className="text-[9px] font-bold" style={{ color: ink }}>
              Atlas Immobilier
            </span>
          </div>
          <div
            className="mt-2.5 text-[13px] font-bold leading-tight"
            style={{ color: ink, letterSpacing: "-0.02em" }}
          >
            Vendez votre bien en 30 jours, au meilleur prix.
          </div>
          <div className="mt-1.5 text-[9px] leading-snug" style={{ color: muted }}>
            Estimation gratuite en 2 minutes par un expert local.
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span
              className="rounded-full px-2.5 py-1 text-[9px] font-bold"
              style={{ background: green, color: "#031003" }}
            >
              Estimer mon bien
            </span>
            <span className="text-[9px] font-medium" style={{ color: ink }}>
              ★ 4,9 (312 avis)
            </span>
          </div>
        </div>
        {/* form */}
        <div
          className="rounded-xl p-2.5"
          style={{ background: sub, boxShadow: `0 0 0 1px ${line}` }}
        >
          <div className="text-[9.5px] font-bold" style={{ color: ink }}>
            Estimation gratuite
          </div>
          {["Nom complet", "Téléphone", "Ville du bien"].map((f) => (
            <div
              key={f}
              className="mt-1.5 rounded-md bg-white px-2 py-1 text-[8.5px]"
              style={{ color: "#9aa39e", boxShadow: `0 0 0 1px ${line}` }}
            >
              {f}
            </div>
          ))}
          <div
            className="mt-2 rounded-md py-1 text-center text-[8.5px] font-bold"
            style={{ background: ink, color: "#fff" }}
          >
            Recevoir mon estimation
          </div>
        </div>
      </div>
      {/* stats */}
      <div className="grid grid-cols-3 border-t text-center" style={{ borderColor: line }}>
        {[
          ["Visites", "8 412"],
          ["Leads", "1 043"],
          ["Conversion", "12,4 %"],
        ].map(([l, v], i) => (
          <div key={l} className="py-2" style={{ borderLeft: i ? `1px solid ${line}` : undefined }}>
            <div className="text-[8.5px]" style={{ color: muted }}>
              {l}
            </div>
            <div
              className="text-[11px] font-bold"
              style={{ color: i === 2 ? greenText : ink, fontVariantNumeric: "tabular-nums" }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ============================================================
   2. CRM — pipeline (kanban) with real deals
   ============================================================ */
function CrmMock() {
  const cols = [
    {
      title: "Nouveau",
      tone: "grey" as const,
      items: [
        { n: "Salma Bennani", c: "Dentaire Sourire", v: "1 200 €", col: "#7c3aed" },
        { n: "Karim Idrissi", c: "Atlas Auto", v: "800 €", col: "#0891b2" },
      ],
    },
    {
      title: "Qualifié",
      tone: "amber" as const,
      items: [
        { n: "Mehdi Lahlou", c: "Opel Casablanca", v: "3 400 €", col: "#ea580c" },
        { n: "Inès Roux", c: "Spa Oasis", v: "1 900 €", col: "#db2777" },
      ],
    },
    {
      title: "Gagné",
      tone: "green" as const,
      items: [{ n: "Rachid Fassi", c: "KLK Group", v: "5 900 €", col: "#16a34a" }],
    },
  ];
  return (
    <Panel className="p-3.5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: ink }}>
          Pipeline — Ventes 2026
        </span>
        <span
          className="text-[10px] font-bold"
          style={{ color: greenText, fontVariantNumeric: "tabular-nums" }}
        >
          13 200 € en cours
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cols.map((c) => (
          <div key={c.title} className="rounded-xl p-1.5" style={{ background: sub }}>
            <div className="mb-1.5 flex items-center justify-between px-1">
              <Chip tone={c.tone}>{c.title}</Chip>
              <span className="text-[9px] font-semibold" style={{ color: muted }}>
                {c.items.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {c.items.map((it) => (
                <div
                  key={it.n}
                  className="rounded-lg bg-white p-2"
                  style={{ boxShadow: `0 0 0 1px ${line}, 0 2px 6px -3px rgba(16,60,28,0.18)` }}
                >
                  <div className="flex items-center gap-1.5">
                    <Avatar name={it.n} color={it.col} size={18} />
                    <span className="truncate text-[9.5px] font-semibold" style={{ color: ink }}>
                      {it.n}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-[8.5px]" style={{ color: muted }}>
                    {it.c}
                  </div>
                  <div
                    className="mt-1 text-[10px] font-bold"
                    style={{ color: ink, fontVariantNumeric: "tabular-nums" }}
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
   3. EMAILING, SMS & WHATSAPP — unified inbox + campaign
   ============================================================ */
function EmailMock() {
  const convs = [
    {
      n: "Yasmine Alaoui",
      ch: "WhatsApp",
      chc: "#25D366",
      m: "Parfait, je confirme pour jeudi 10h 👍",
      t: "09:42",
      u: true,
    },
    {
      n: "Thomas Martin",
      ch: "Email",
      chc: "#1a56db",
      m: "Re : Devis Offre Pro — merci pour l'envoi",
      t: "09:15",
      u: true,
    },
    {
      n: "Nadia Chraibi",
      ch: "SMS",
      chc: "#7c3aed",
      m: "Oui, rappelez-moi après 18h svp",
      t: "Hier",
      u: false,
    },
  ];
  return (
    <Panel className="p-3.5">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: ink }}>
          Inbox unifiée
        </span>
        <Chip>3 canaux connectés</Chip>
      </div>
      <div className="space-y-1.5">
        {convs.map((c) => (
          <div
            key={c.n}
            className="flex items-center gap-2 rounded-lg p-2"
            style={{ background: c.u ? "#f1fbf3" : sub }}
          >
            <Avatar name={c.n} color={c.chc} size={24} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[10px] font-semibold" style={{ color: ink }}>
                  {c.n}
                </span>
                <span className="text-[8px] font-bold" style={{ color: c.chc }}>
                  {c.ch}
                </span>
              </div>
              <div className="truncate text-[9px]" style={{ color: muted }}>
                {c.m}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[8.5px]" style={{ color: muted }}>
                {c.t}
              </span>
              {c.u && <span style={dot(green)} />}
            </div>
          </div>
        ))}
      </div>
      {/* campaign row */}
      <div className="mt-2.5 rounded-lg p-2.5" style={{ boxShadow: `0 0 0 1px ${line}` }}>
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-semibold" style={{ color: ink }}>
            Campagne « Offre d'automne » · 4 820 envois
          </span>
          <Chip>
            <CheckCircle className="h-2.5 w-2.5" weight="fill" /> Envoyé
          </Chip>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            ["Ouverture", "42,8 %", 43],
            ["Clics", "9,1 %", 18],
            ["Réponses", "3,4 %", 9],
          ].map(([l, v, w]) => (
            <div key={l as string}>
              <div className="flex justify-between text-[8.5px]" style={{ color: muted }}>
                <span>{l}</span>
                <span style={{ color: ink, fontWeight: 600 }}>{v}</span>
              </div>
              <div
                className="mt-1 h-1 overflow-hidden rounded-full"
                style={{ background: "#e9eeeb" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${w}%`, background: green }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ============================================================
   4. CALENDRIERS — week view with real bookings
   ============================================================ */
function CalendarMock() {
  const days = [
    { d: "Lun", n: 12, ev: [{ t: "10:00", l: "Démo · Sofac", c: "#16a34a" }] },
    {
      d: "Mar",
      n: 13,
      ev: [
        { t: "09:30", l: "Audit · Opel", c: "#1a56db" },
        { t: "15:00", l: "Onboarding", c: "#7c3aed" },
      ],
    },
    { d: "Mer", n: 14, ev: [{ t: "14:30", l: "Démo · Spa Oasis", c: "#16a34a" }] },
    { d: "Jeu", n: 15, ev: [{ t: "10:00", l: "Closing · KLK", c: "#ea580c" }] },
    {
      d: "Ven",
      n: 16,
      ev: [
        { t: "11:00", l: "Suivi · Doha", c: "#1a56db" },
        { t: "16:00", l: "Démo · Autocaz", c: "#16a34a" },
      ],
    },
  ];
  return (
    <Panel className="p-3.5">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: ink }}>
          Semaine du 12 octobre
        </span>
        <Chip tone="grey">7 RDV · 0 no-show</Chip>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d) => (
          <div key={d.d} className="rounded-lg p-1.5" style={{ background: sub, minHeight: 92 }}>
            <div className="text-center">
              <div className="text-[8.5px]" style={{ color: muted }}>
                {d.d}
              </div>
              <div className="text-[11px] font-bold" style={{ color: ink }}>
                {d.n}
              </div>
            </div>
            <div className="mt-1 space-y-1">
              {d.ev.map((e) => (
                <div
                  key={e.l}
                  className="rounded-md bg-white px-1 py-1"
                  style={{ borderLeft: `2px solid ${e.c}`, boxShadow: `0 0 0 1px ${line}` }}
                >
                  <div className="text-[7.5px] font-bold" style={{ color: e.c }}>
                    {e.t}
                  </div>
                  <div className="truncate text-[7.5px] font-medium" style={{ color: ink }}>
                    {e.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-2.5 flex items-center gap-2 rounded-lg px-2.5 py-2"
        style={{ background: greenSoft }}
      >
        <Lightning className="h-3.5 w-3.5" weight="fill" style={{ color: greenText }} />
        <span className="text-[9.5px] font-medium" style={{ color: greenText }}>
          Rappel SMS envoyé à Inès Roux · RDV aujourd'hui 14:30
        </span>
      </div>
    </Panel>
  );
}

/* ============================================================
   5. FORMATIONS — course player + modules
   ============================================================ */
function CoursesMock() {
  const mods = [
    { t: "Les bases de la prospection", d: "12 min", done: true },
    { t: "Scripts d'appel qui convertissent", d: "18 min", done: true },
    { t: "Gérer les objections", d: "15 min", now: true },
    { t: "Closing & relances", d: "21 min" },
  ];
  return (
    <Panel className="overflow-hidden p-0">
      <div className="grid grid-cols-[1.1fr_1fr]">
        <div
          className="relative flex min-h-[130px] flex-col justify-end p-3"
          style={{ background: "linear-gradient(140deg,#0f3d1f 0%,#16a34a 100%)" }}
        >
          <span className="absolute left-1/2 top-[38%] grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90">
            <Play className="h-4 w-4" weight="fill" style={{ color: "#0f3d1f" }} />
          </span>
          <div className="text-[8.5px] font-semibold uppercase tracking-wider text-white/70">
            Module 3 · 15 min
          </div>
          <div className="text-[11px] font-bold leading-tight text-white">Masterclass Closing</div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/25">
            <div className="h-full w-[64%] rounded-full bg-white" />
          </div>
        </div>
        <div className="p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[9.5px] font-semibold" style={{ color: ink }}>
              Programme
            </span>
            <span className="text-[9px] font-bold" style={{ color: greenText }}>
              64 %
            </span>
          </div>
          <div className="space-y-1">
            {mods.map((m) => (
              <div
                key={m.t}
                className="flex items-center gap-1.5 rounded-md px-1.5 py-1"
                style={{ background: m.now ? "#f1fbf3" : "transparent" }}
              >
                {m.done ? (
                  <CheckCircle
                    className="h-3 w-3 shrink-0"
                    weight="fill"
                    style={{ color: green }}
                  />
                ) : (
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ border: `1.5px solid ${m.now ? green : "#cfd7d2"}` }}
                  />
                )}
                <span
                  className="flex-1 truncate text-[8.5px]"
                  style={{ color: ink, fontWeight: m.now ? 600 : 400 }}
                >
                  {m.t}
                </span>
                <span className="text-[8px]" style={{ color: muted }}>
                  {m.d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ============================================================
   6. AUTOMATISATIONS — real workflow with branch
   ============================================================ */
function WorkflowMock() {
  const Node = ({
    icon: I,
    t,
    s,
    tone = green,
  }: {
    icon: typeof Lightning;
    t: string;
    s: string;
    tone?: string;
  }) => (
    <div
      className="flex items-center gap-2 rounded-lg bg-white px-2 py-1.5"
      style={{ boxShadow: `0 0 0 1px ${line}, 0 2px 6px -3px rgba(16,60,28,0.18)` }}
    >
      <span
        className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
        style={{ background: `${tone}1f` }}
      >
        <I className="h-3.5 w-3.5" weight="bold" style={{ color: tone }} />
      </span>
      <div className="min-w-0">
        <div className="truncate text-[9.5px] font-semibold" style={{ color: ink }}>
          {t}
        </div>
        <div className="truncate text-[8.5px]" style={{ color: muted }}>
          {s}
        </div>
      </div>
    </div>
  );
  const Link = () => <div className="mx-auto h-3 w-px" style={{ background: "#b9dcc3" }} />;
  return (
    <Panel className="p-3.5">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: ink }}>
          Workflow — Lead Facebook Ads
        </span>
        <Chip>
          <span style={dot(green)} /> Actif · 1 284 exécutions
        </Chip>
      </div>
      <div className="rounded-xl p-2.5" style={{ background: sub }}>
        <Node icon={Lightning} t="Déclencheur" s="Nouveau lead · Formulaire Meta" />
        <Link />
        <Node
          icon={ArrowsLeftRight}
          t="WhatsApp + Email"
          s="Message de bienvenue en 30 s"
          tone="#1a56db"
        />
        <Link />
        <Node icon={CircleNotch} t="Condition" s="A réservé un appel ?" tone="#b26a00" />
        <Link />
        <div className="grid grid-cols-2 gap-1.5">
          <Node icon={CheckCircle} t="Oui" s="Tag « Chaud » + commercial" />
          <Node icon={UsersThree} t="Non" s="Relance J+1, J+3" tone="#7c3aed" />
        </div>
      </div>
    </Panel>
  );
}

/* ============================================================
   7. PLANIFICATEUR SOCIAL — scheduled posts with previews
   ============================================================ */
function SocialMock() {
  const posts = [
    {
      d: "Lun 12",
      h: "18:00",
      net: "Instagram",
      c: "#E1306C",
      title: "3 erreurs qui coûtent des clients",
      g: "linear-gradient(135deg,#fde2ec,#f9b4cc)",
    },
    {
      d: "Mer 14",
      h: "12:30",
      net: "LinkedIn",
      c: "#0A66C2",
      title: "Étude de cas : +54% de dossiers",
      g: "linear-gradient(135deg,#dbeafe,#a5c8f5)",
    },
    {
      d: "Ven 16",
      h: "19:00",
      net: "TikTok",
      c: "#111111",
      title: "Coulisses : un workflow en 60 s",
      g: "linear-gradient(135deg,#e5e7eb,#c3c7ce)",
    },
  ];
  return (
    <Panel className="p-3.5">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: ink }}>
          Programmation — Octobre
        </span>
        <Chip>12 posts planifiés</Chip>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {posts.map((p) => (
          <div
            key={p.title}
            className="overflow-hidden rounded-lg bg-white"
            style={{ boxShadow: `0 0 0 1px ${line}` }}
          >
            <div className="relative aspect-[4/3]" style={{ background: p.g }}>
              <span
                className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[7.5px] font-bold"
                style={{ color: p.c }}
              >
                {p.net}
              </span>
              <span
                className="absolute bottom-1.5 left-1.5 right-1.5 text-[8.5px] font-bold leading-tight"
                style={{ color: "#111" }}
              >
                {p.title}
              </span>
            </div>
            <div className="flex items-center justify-between px-1.5 py-1">
              <span className="text-[8px] font-semibold" style={{ color: ink }}>
                {p.d}
              </span>
              <span className="text-[8px]" style={{ color: muted }}>
                {p.h}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2 text-center">
        {[
          ["Portée", "48,2 k"],
          ["Engagement", "6,7 %"],
          ["DM auto", "312"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-lg py-1.5" style={{ background: sub }}>
            <div className="text-[8.5px]" style={{ color: muted }}>
              {l}
            </div>
            <div className="text-[11px] font-bold" style={{ color: ink }}>
              {v}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ============================================================
   8. WEBINARS — live frame + chat
   ============================================================ */
function WebinarMock() {
  const people = ["Sara M", "Omar B", "Lina K", "Hugo D"];
  const cols = ["#16a34a", "#1a56db", "#db2777", "#ea580c"];
  return (
    <Panel className="overflow-hidden p-0">
      <div className="relative aspect-video" style={{ background: "#0c1110" }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, rgba(50,220,50,0.35), transparent 60%), linear-gradient(180deg,#0f1a14,#050806)",
          }}
        />
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-bold text-white">
          <span style={dot("#fff")} /> LIVE
        </span>
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold text-white">
          <Eye className="h-3 w-3" weight="fill" /> 1 248
        </span>
        {/* speaker */}
        <div className="absolute left-1/2 top-[34%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span
            className="grid h-12 w-12 place-items-center rounded-full text-[14px] font-bold text-white"
            style={{
              background: "linear-gradient(135deg,#32dc32,#138a3a)",
              boxShadow: "0 0 0 3px rgba(255,255,255,0.15)",
            }}
          >
            YA
          </span>
          <span className="mt-1.5 text-[9.5px] font-semibold text-white">Youssef A. · Hôte</span>
          <span className="text-[8.5px] text-white/60">
            Masterclass : l'IA au service de vos ventes
          </span>
        </div>
        {/* chat */}
        <div className="absolute bottom-2 left-2 w-[58%] space-y-1">
          <div className="rounded-lg bg-white/10 px-2 py-1 text-[9px] text-white/90 backdrop-blur">
            <b>Sophie</b> : Super contenu 🔥
          </div>
          <div className="rounded-lg bg-white/10 px-2 py-1 text-[9px] text-white/90 backdrop-blur">
            <b>Karim</b> : Lien d'inscription ?
          </div>
        </div>
        {/* offer + attendees */}
        <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1.5">
          <div className="flex -space-x-1.5">
            {people.map((p, i) => (
              <span
                key={p}
                className="grid h-5 w-5 place-items-center rounded-full text-[7px] font-bold text-white"
                style={{ background: cols[i], boxShadow: "0 0 0 1.5px #0c1110" }}
              >
                {p
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </span>
            ))}
          </div>
          <span
            className="rounded-md px-2 py-1 text-[8.5px] font-bold"
            style={{ background: green, color: "#031003" }}
          >
            Offre spéciale · -30 %
          </span>
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
