import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Play,
  RotateCcw,
  Zap,
  Clock,
  MessageSquare,
  Mail,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Webhook,
  Tag,
  X,
  Calendar,
  Search,
  Edit3,
  PlusCircle,
  ArrowRight,
  User,
} from "lucide-react";

// ─── Node Detail Definitions ─────────────────────────────────────────────────
const NODE_DETAILS: Record<
  string,
  {
    title: string;
    type: string;
    icon: any;
    color: string;
    description: string;
    content?: React.ReactNode;
  }
> = {};

// ─── Custom Node ─────────────────────────────────────────────────────────────
const CustomNode = ({ data }: any) => {
  const Icon = data.icon || Zap;
  const isActive = data.isActive;
  const isCompleted = data.isCompleted;
  const isBranch = data.isBranch;

  return (
    <div
      onClick={() => data.onSelect && data.onSelect(data.nodeKey)}
      className={`px-3 py-2.5 shadow-lg rounded-xl border-2 transition-all duration-300 bg-white cursor-pointer hover:border-[#32dc32]/60 ${
        isBranch ? "min-w-[160px]" : "min-w-[190px]"
      } ${
        isActive
          ? "border-[#32dc32] shadow-[0_0_20px_rgba(50,220,50,0.35)] scale-105"
          : isCompleted
            ? "border-[#32dc32]/40 opacity-90"
            : "border-[rgba(10,30,15,0.09)]"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2.5 h-2.5 bg-[#9aa39e] border-none"
      />
      <div className="flex items-center gap-2.5">
        <div
          className={`p-1.5 rounded-lg flex-shrink-0 ${
            isActive
              ? "bg-[#32dc32] text-black"
              : isCompleted
                ? "bg-[#32dc32]/20 text-[#16a34a]"
                : "bg-[#eef2ef] text-[#6b7570]"
          }`}
        >
          <Icon size={14} />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-bold text-[#6b7570] uppercase tracking-wider truncate">
            {data.label}
          </div>
          <div className="text-xs font-semibold mt-0.5 leading-tight">{data.title}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2.5 h-2.5 bg-[#9aa39e] border-none"
      />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

// ─── Booking Workflow (Prise de RDV) ─────────────────────────────────────────
const buildBookingWorkflow = (onSelect: (key: string) => void) => ({
  nodes: [
    {
      id: "1",
      type: "custom",
      position: { x: 300, y: 0 },
      data: {
        label: "Déclencheur",
        title: "RDV Réservé",
        icon: Calendar,
        nodeKey: "trigger",
        onSelect,
      },
    },
    {
      id: "2",
      type: "custom",
      position: { x: 300, y: 100 },
      data: {
        label: "Action",
        title: "Envoyer Email",
        icon: Mail,
        nodeKey: "send_email",
        onSelect,
      },
    },
    {
      id: "3",
      type: "custom",
      position: { x: 300, y: 200 },
      data: {
        label: "Action",
        title: "Envoyer SMS",
        icon: MessageSquare,
        nodeKey: "send_sms",
        onSelect,
      },
    },
    {
      id: "4",
      type: "custom",
      position: { x: 300, y: 300 },
      data: {
        label: "Action",
        title: "Assigner Lead",
        icon: UserPlus,
        nodeKey: "assign_lead",
        onSelect,
      },
    },
    {
      id: "5",
      type: "custom",
      position: { x: 300, y: 400 },
      data: {
        label: "Condition",
        title: "Opportunité Trouvée ?",
        icon: Search,
        nodeKey: "find_opp",
        onSelect,
      },
    },
    // Found branch
    {
      id: "6",
      type: "custom",
      position: { x: 100, y: 520 },
      data: {
        label: "Action",
        title: "Maj Opportunité",
        icon: Edit3,
        nodeKey: "update_opp",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "7",
      type: "custom",
      position: { x: 100, y: 630 },
      data: {
        label: "Action",
        title: "Ajouter Propriétaire",
        icon: User,
        nodeKey: "add_owner",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "8",
      type: "custom",
      position: { x: 100, y: 740 },
      data: {
        label: "Attente",
        title: "Attendre (RDV - 2h)",
        icon: Clock,
        nodeKey: "wait_rdv",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "9",
      type: "custom",
      position: { x: 100, y: 850 },
      data: {
        label: "Action",
        title: "SMS Rappel RDV",
        icon: MessageSquare,
        nodeKey: "reminder_sms",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "10",
      type: "custom",
      position: { x: 100, y: 960 },
      data: {
        label: "Action",
        title: "Email Rappel RDV",
        icon: Mail,
        nodeKey: "reminder_email",
        onSelect,
        isBranch: true,
      },
    },
    // Not found branch
    {
      id: "11",
      type: "custom",
      position: { x: 510, y: 520 },
      data: {
        label: "Action",
        title: "Créer Opportunité",
        icon: PlusCircle,
        nodeKey: "create_opp",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "12",
      type: "custom",
      position: { x: 510, y: 630 },
      data: {
        label: "Action",
        title: "Ajouter Propriétaire",
        icon: User,
        nodeKey: "add_owner2",
        onSelect,
        isBranch: true,
      },
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5" },
    // Found
    { id: "e5-6", source: "5", target: "6", label: "Trouvée ✓" },
    { id: "e6-7", source: "6", target: "7" },
    { id: "e7-8", source: "7", target: "8" },
    { id: "e8-9", source: "8", target: "9" },
    { id: "e9-10", source: "9", target: "10" },
    // Not found → create → merge back to add_owner
    { id: "e5-11", source: "5", target: "11", label: "Non trouvée ✗" },
    { id: "e11-12", source: "11", target: "12" },
    // Merge: both paths reach add_owner stage
    {
      id: "e12-7",
      source: "12",
      target: "7",
      style: { strokeDasharray: "5,5" },
    },
  ],
  simulation: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
});

// ─── Other Workflows ──────────────────────────────────────────────────────────
const buildFollowupWorkflow = (onSelect: (key: string) => void) => ({
  nodes: [
    {
      id: "1",
      type: "custom",
      position: { x: 300, y: 0 },
      data: {
        label: "Déclencheur",
        title: "Opp. Modifiée",
        icon: Edit3,
        nodeKey: "fl_trigger",
        onSelect,
      },
    },
    {
      id: "2",
      type: "custom",
      position: { x: 300, y: 100 },
      data: {
        label: "Action",
        title: "SMS Relance 1",
        icon: MessageSquare,
        nodeKey: "fl_sms1",
        onSelect,
      },
    },
    {
      id: "3",
      type: "custom",
      position: { x: 300, y: 200 },
      data: {
        label: "Attente",
        title: "Attendre 1 jour",
        icon: Clock,
        nodeKey: "fl_wait1",
        onSelect,
      },
    },
    {
      id: "4",
      type: "custom",
      position: { x: 300, y: 300 },
      data: {
        label: "Condition",
        title: "A répondu ?",
        icon: AlertCircle,
        nodeKey: "fl_cond1",
        onSelect,
      },
    },

    // Yes Branch (Shared for all)
    {
      id: "5",
      type: "custom",
      position: { x: 100, y: 420 },
      data: {
        label: "Action",
        title: "SMS Réponse",
        icon: MessageSquare,
        nodeKey: "fl_sms_reply",
        onSelect,
        isBranch: true,
      },
    },

    // No Branch -> Step 2
    {
      id: "6",
      type: "custom",
      position: { x: 500, y: 420 },
      data: {
        label: "Action",
        title: "SMS Relance 2",
        icon: MessageSquare,
        nodeKey: "fl_sms2",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "7",
      type: "custom",
      position: { x: 500, y: 530 },
      data: {
        label: "Attente",
        title: "Attendre 2 jours",
        icon: Clock,
        nodeKey: "fl_wait2",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "8",
      type: "custom",
      position: { x: 500, y: 640 },
      data: {
        label: "Condition",
        title: "A répondu ?",
        icon: AlertCircle,
        nodeKey: "fl_cond2",
        onSelect,
        isBranch: true,
      },
    },

    // No Branch -> Step 3
    {
      id: "9",
      type: "custom",
      position: { x: 700, y: 760 },
      data: {
        label: "Action",
        title: "Email Relance 3",
        icon: Mail,
        nodeKey: "fl_email3",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "10",
      type: "custom",
      position: { x: 700, y: 870 },
      data: {
        label: "Attente",
        title: "Attendre 3 jours",
        icon: Clock,
        nodeKey: "fl_wait3",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "11",
      type: "custom",
      position: { x: 700, y: 980 },
      data: {
        label: "Condition",
        title: "A répondu ?",
        icon: AlertCircle,
        nodeKey: "fl_cond3",
        onSelect,
        isBranch: true,
      },
    },

    // End No
    {
      id: "12",
      type: "custom",
      position: { x: 900, y: 1100 },
      data: {
        label: "Fin",
        title: "Terminer",
        icon: CheckCircle,
        nodeKey: "fl_end",
        onSelect,
        isBranch: true,
      },
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5", label: "Oui ✓" },
    { id: "e4-6", source: "4", target: "6", label: "Non ✗" },

    { id: "e6-7", source: "6", target: "7" },
    { id: "e7-8", source: "7", target: "8" },
    {
      id: "e8-5",
      source: "8",
      target: "5",
      label: "Oui ✓",
      style: { strokeDasharray: "5,5" },
    },
    { id: "e8-9", source: "8", target: "9", label: "Non ✗" },

    { id: "e9-10", source: "9", target: "10" },
    { id: "e10-11", source: "10", target: "11" },
    {
      id: "e11-5",
      source: "11",
      target: "5",
      label: "Oui ✓",
      style: { strokeDasharray: "5,5" },
    },
    { id: "e11-12", source: "11", target: "12", label: "Non ✗" },
  ],
  simulation: ["1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12"],
});

const buildReviewsWorkflow = (onSelect: (key: string) => void) => ({
  nodes: [
    {
      id: "1",
      type: "custom",
      position: { x: 250, y: 0 },
      data: {
        label: "Déclencheur",
        title: "Service Terminé",
        icon: CheckCircle,
        nodeKey: "rv_trigger",
        onSelect,
      },
    },
    {
      id: "2",
      type: "custom",
      position: { x: 250, y: 100 },
      data: {
        label: "Attente",
        title: "Attendre 1 heure",
        icon: Clock,
        nodeKey: "rv_wait",
        onSelect,
      },
    },
    {
      id: "3",
      type: "custom",
      position: { x: 250, y: 200 },
      data: {
        label: "Action",
        title: "SMS Demande d'avis",
        icon: MessageSquare,
        nodeKey: "rv_sms",
        onSelect,
      },
    },
    {
      id: "4",
      type: "custom",
      position: { x: 250, y: 300 },
      data: {
        label: "Condition",
        title: "A cliqué ?",
        icon: AlertCircle,
        nodeKey: "rv_cond",
        onSelect,
      },
    },
    {
      id: "5",
      type: "custom",
      position: { x: 100, y: 420 },
      data: {
        label: "Action",
        title: 'Tag "Avis Laissé"',
        icon: Tag,
        nodeKey: "rv_tag",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "6",
      type: "custom",
      position: { x: 400, y: 420 },
      data: {
        label: "Attente",
        title: "Attendre 2 jours",
        icon: Clock,
        nodeKey: "rv_wait2",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "7",
      type: "custom",
      position: { x: 400, y: 530 },
      data: {
        label: "Action",
        title: "Email Rappel",
        icon: Mail,
        nodeKey: "rv_email",
        onSelect,
        isBranch: true,
      },
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5", label: "Oui ✓" },
    { id: "e4-6", source: "4", target: "6", label: "Non ✗" },
    { id: "e6-7", source: "6", target: "7" },
  ],
  simulation: ["1", "2", "3", "4", "6", "7"],
});

const buildLeadgenWorkflow = (onSelect: (key: string) => void) => ({
  nodes: [
    {
      id: "1",
      type: "custom",
      position: { x: 300, y: 0 },
      data: {
        label: "Déclencheur",
        title: "Facebook Lead Form",
        icon: Zap,
        nodeKey: "lg_trigger",
        onSelect,
      },
    },
    {
      id: "2",
      type: "custom",
      position: { x: 300, y: 100 },
      data: {
        label: "Action",
        title: 'Tag "meta leads"',
        icon: Tag,
        nodeKey: "lg_tag",
        onSelect,
      },
    },
    {
      id: "3",
      type: "custom",
      position: { x: 300, y: 200 },
      data: {
        label: "Action",
        title: "Envoyer WhatsApp",
        icon: MessageSquare,
        nodeKey: "lg_wa",
        onSelect,
      },
    },
    {
      id: "4",
      type: "custom",
      position: { x: 300, y: 300 },
      data: {
        label: "Condition",
        title: "Trouver Opportunité",
        icon: Search,
        nodeKey: "lg_find",
        onSelect,
      },
    },
    // Found branch
    {
      id: "5",
      type: "custom",
      position: { x: 100, y: 420 },
      data: {
        label: "Action",
        title: "Maj Opportunité",
        icon: Edit3,
        nodeKey: "lg_update",
        onSelect,
        isBranch: true,
      },
    },
    {
      id: "6",
      type: "custom",
      position: { x: 300, y: 550 },
      data: {
        label: "Action",
        title: "Ajouter Propriétaire",
        icon: User,
        nodeKey: "lg_owner",
        onSelect,
      },
    },
    {
      id: "7",
      type: "custom",
      position: { x: 300, y: 660 },
      data: {
        label: "Action",
        title: "Google Sheet",
        icon: ArrowRight,
        nodeKey: "lg_gsheet",
        onSelect,
      },
    },
    // Not found branch
    {
      id: "8",
      type: "custom",
      position: { x: 500, y: 420 },
      data: {
        label: "Action",
        title: "Créer Opportunité",
        icon: PlusCircle,
        nodeKey: "lg_create",
        onSelect,
        isBranch: true,
      },
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5", label: "Trouvée ✓" },
    { id: "e5-6", source: "5", target: "6" },
    { id: "e6-7", source: "6", target: "7" },
    { id: "e4-8", source: "4", target: "8", label: "Non trouvée ✗" },
    { id: "e8-6", source: "8", target: "6", style: { strokeDasharray: "5,5" } },
  ],
  simulation: ["1", "2", "3", "4", "5", "6", "7"],
});

// ─── Node Details Panel Content ───────────────────────────────────────────────
const NODE_INFO: Record<
  string,
  {
    label: string;
    type: string;
    iconColor: string;
    description: string;
    details: { key: string; value: string }[];
    messagePreview?: string;
  }
> = {
  trigger: {
    label: "Déclencheur",
    type: "Appointment Booked",
    iconColor: "bg-blue-500/10 text-blue-600",
    description:
      "Ce nœud déclenche le workflow automatiquement dès qu'un rendez-vous est réservé dans le CRM.",
    details: [
      { key: "Événement", value: "Appointment Booked" },
      { key: "Source", value: "Calendrier CRM / Widget booking" },
      { key: "Délai de déclenchement", value: "Immédiat (0 sec)" },
    ],
  },
  send_email: {
    label: "Action",
    type: "Envoyer Email",
    iconColor: "bg-purple-500/10 text-purple-600",
    description: "Envoie un email de confirmation au contact dès que le RDV est enregistré.",
    details: [
      { key: "Objet", value: "Confirmation de votre rendez-vous" },
      { key: "Destinataire", value: "{{contact.email}}" },
      { key: "Template", value: "Confirmation RDV — ClientX" },
    ],
    messagePreview: `Bonjour {{contact.fullName}},\n\nVotre rendez-vous est confirmé pour le {{appointment.only_start_date}} à {{appointment.only_start_time}}.\n\nNous avons hâte de vous accueillir.\n\nL'équipe ClientX`,
  },
  send_sms: {
    label: "Action",
    type: "Envoyer SMS",
    iconColor: "bg-green-500/10 text-green-600",
    description:
      "Envoie un SMS de confirmation au numéro du contact immédiatement après la réservation.",
    details: [
      { key: "Destinataire", value: "{{contact.phone}}" },
      { key: "Délai", value: "Immédiat" },
      { key: "Caractères", value: "~180 caractères" },
    ],
    messagePreview: `Bonjour {{contact.firstName}} 👋\n\nVotre RDV est confirmé pour le {{appointment.only_start_date}} à {{appointment.only_start_time}}.\n\nÀ très bientôt,\n{{user.name}}`,
  },
  assign_lead: {
    label: "Action",
    type: "Assigner Lead à l'utilisateur",
    iconColor: "bg-orange-500/10 text-orange-600",
    description:
      "Assigne automatiquement le lead à l'utilisateur CRM responsable (commercial ou closer).",
    details: [
      { key: "Assignation", value: "Utilisateur responsable" },
      { key: "Règle", value: "Round-robin ou Manuel" },
      { key: "Notification", value: "Email + CRM in-app" },
    ],
  },
  find_opp: {
    label: "Condition",
    type: "Trouver Opportunité",
    iconColor: "bg-yellow-500/10 text-yellow-600",
    description: "Recherche si une opportunité existe déjà pour ce contact dans le pipeline CRM.",
    details: [
      { key: "Critère", value: "Contact ID dans pipeline actif" },
      { key: "Si trouvée", value: "→ Mettre à jour opportunité" },
      { key: "Si non trouvée", value: "→ Créer nouvelle opportunité" },
    ],
  },
  update_opp: {
    label: "Action",
    type: "Mettre à jour Opportunité",
    iconColor: "bg-cyan-500/10 text-cyan-600",
    description:
      'Met à jour l\'opportunité existante avec la date du RDV et le statut "RDV Confirmé".',
    details: [
      { key: "Champ mis à jour", value: "Statut → RDV Confirmé" },
      { key: "Date RDV", value: "{{appointment.only_start_date}}" },
      { key: "Pipeline", value: "Deals en cours" },
    ],
  },
  add_owner: {
    label: "Action",
    type: "Ajouter Propriétaire",
    iconColor: "bg-pink-500/10 text-pink-600",
    description: "Ajoute le propriétaire (commercial assigné) à l'opportunité pour le suivi.",
    details: [
      { key: "Propriétaire", value: "{{user.name}}" },
      { key: "Rôle", value: "Commercial / Closer" },
      { key: "Notification", value: "Alerte CRM envoyée" },
    ],
  },
  wait_rdv: {
    label: "Attente",
    type: "Attendre RDV - 2 heures",
    iconColor: "bg-gray-500/10 text-[#3b4540]",
    description:
      "Attend jusqu'à 2 heures avant l'heure du RDV, puis déclenche les rappels automatiques.",
    details: [
      { key: "Type d'attente", value: "Basé sur date/heure de RDV" },
      { key: "Délai avant RDV", value: "2 heures" },
      { key: "Fuseau horaire", value: "Europe/Paris (ou contact)" },
    ],
  },
  reminder_sms: {
    label: "Action",
    type: "SMS Rappel RDV",
    iconColor: "bg-green-500/10 text-green-600",
    description: "Envoie un SMS de rappel au contact 2 heures avant son rendez-vous.",
    details: [
      { key: "Destinataire", value: "{{contact.phone}}" },
      { key: "Timing", value: "2h avant le RDV" },
      { key: "Objectif", value: "Réduire les no-shows de 30%" },
    ],
    messagePreview: `Bonjour {{contact.firstName}} 👋\n\nRappel : vous avez un rendez-vous dans 2 heures — {{appointment.only_start_date}} à {{appointment.only_start_time}}.\n\nTitre : "{{appointment.title}}"\n\nÀ tout à l'heure,\n{{user.name}}`,
  },
  reminder_email: {
    label: "Action",
    type: "Email Rappel RDV",
    iconColor: "bg-purple-500/10 text-purple-600",
    description: "Envoie un email de rappel complet 2 heures avant le rendez-vous.",
    details: [
      { key: "Objet", value: "Rappel : votre RDV dans 2h" },
      { key: "Destinataire", value: "{{contact.email}}" },
      { key: "Contenu", value: "Détails RDV + lien si visio" },
    ],
    messagePreview: `Bonjour {{contact.fullName}},\n\nCeci est un rappel de votre rendez-vous intitulé "{{appointment.title}}" prévu le {{appointment.only_start_date}} à {{appointment.only_start_time}}.\n\nMerci,\n{{user.name}}`,
  },
  create_opp: {
    label: "Action",
    type: "Créer Opportunité",
    iconColor: "bg-emerald-500/10 text-emerald-600",
    description: "Crée une nouvelle opportunité dans le pipeline CRM pour ce contact.",
    details: [
      { key: "Pipeline", value: "Deals en cours" },
      { key: "Étape initiale", value: "RDV Pris" },
      { key: "Valeur estimée", value: "À renseigner selon l'agent" },
    ],
  },
  add_owner2: {
    label: "Action",
    type: "Ajouter Propriétaire",
    iconColor: "bg-pink-500/10 text-pink-600",
    description:
      "Ajoute le propriétaire à la nouvelle opportunité créée, puis rejoint le flux principal.",
    details: [
      { key: "Propriétaire", value: "{{user.name}}" },
      { key: "Suite", value: 'Fusion avec le parcours "Trouvée"' },
      { key: "Notification", value: "Alerte CRM envoyée" },
    ],
  },
  // Followup
  fl_trigger: {
    label: "Déclencheur",
    type: "Opportunité Modifiée",
    iconColor: "bg-blue-500/10 text-blue-600",
    description: 'Se déclenche quand une opportunité est déplacée vers l\'étape "Lead Qualifié".',
    details: [
      { key: "Événement", value: "Opportunity Status Changed" },
      { key: "Nouveau statut", value: "Lead Qualifié" },
    ],
  },
  fl_sms1: {
    label: "Action",
    type: "SMS Relance 1",
    iconColor: "bg-green-500/10 text-green-600",
    description: "Premier SMS de prise de contact après qualification.",
    details: [{ key: "Timing", value: "Immédiat" }],
    messagePreview: `Bonjour {{contact.firstName}} 👋\n\nJ'ai vu que vous étiez intéressé(e). Quand seriez-vous disponible pour un appel ?\n\n{{user.name}} — ClientX`,
  },
  fl_wait1: {
    label: "Attente",
    type: "1 jour",
    iconColor: "bg-gray-500/10 text-[#3b4540]",
    description: "Attente d'un jour pour laisser le temps au prospect de répondre.",
    details: [{ key: "Durée", value: "1 jour" }],
  },
  fl_cond1: {
    label: "Condition",
    type: "Le client a répondu ?",
    iconColor: "bg-yellow-500/10 text-yellow-600",
    description: "Vérifie si le contact a envoyé une réponse au SMS.",
    details: [
      { key: "Si oui", value: "→ SMS Réponse" },
      { key: "Si non", value: "→ SMS Relance 2" },
    ],
  },
  fl_sms2: {
    label: "Action",
    type: "SMS Relance 2",
    iconColor: "bg-green-500/10 text-green-600",
    description: "Deuxième relance si pas de réponse.",
    details: [{ key: "Timing", value: "J+1" }],
    messagePreview: `Bonjour {{contact.firstName}},\n\nJe me permets de vous relancer concernant notre échange. Avez-vous pu y réfléchir ?`,
  },
  fl_wait2: {
    label: "Attente",
    type: "2 jours",
    iconColor: "bg-gray-500/10 text-[#3b4540]",
    description: "Attente de deux jours.",
    details: [{ key: "Durée", value: "2 jours" }],
  },
  fl_cond2: {
    label: "Condition",
    type: "Le client a répondu ?",
    iconColor: "bg-yellow-500/10 text-yellow-600",
    description: "Vérifie si le contact a envoyé une réponse.",
    details: [
      { key: "Si oui", value: "→ SMS Réponse" },
      { key: "Si non", value: "→ Email Relance 3" },
    ],
  },
  fl_email3: {
    label: "Action",
    type: "Email Relance 3",
    iconColor: "bg-purple-500/10 text-purple-600",
    description: "Dernière relance par email.",
    details: [{ key: "Timing", value: "J+3" }],
    messagePreview: `Bonjour {{contact.fullName}},\n\nN'ayant pas de retour de votre part, je suppose que ce n'est pas le bon moment. N'hésitez pas à me recontacter.`,
  },
  fl_wait3: {
    label: "Attente",
    type: "3 jours",
    iconColor: "bg-gray-500/10 text-[#3b4540]",
    description: "Attente finale avant clôture.",
    details: [{ key: "Durée", value: "3 jours" }],
  },
  fl_cond3: {
    label: "Condition",
    type: "Le client a répondu ?",
    iconColor: "bg-yellow-500/10 text-yellow-600",
    description: "Vérifie si le contact a envoyé une réponse.",
    details: [
      { key: "Si oui", value: "→ SMS Réponse" },
      { key: "Si non", value: "→ Terminer" },
    ],
  },
  fl_sms_reply: {
    label: "Action",
    type: "SMS Réponse",
    iconColor: "bg-purple-500/10 text-purple-600",
    description: "Envoie un message pour confirmer la réception de sa réponse.",
    details: [{ key: "Timing", value: "Dès la réponse" }],
    messagePreview: `Super {{contact.firstName}}, je note ça. Je vous recontacte très vite !`,
  },
  fl_end: {
    label: "Fin",
    type: "Terminer",
    iconColor: "bg-gray-500/10 text-[#5b645f]",
    description: "Le workflow se termine car le prospect n'a pas répondu.",
    details: [
      { key: "Résultat", value: "Aucune réponse" },
      { key: "Action", value: "Archivage" },
    ],
  },
  // Reviews
  rv_trigger: {
    label: "Déclencheur",
    type: "Service Terminé",
    iconColor: "bg-blue-500/10 text-blue-600",
    description: "Se déclenche quand un service/rendez-vous est marqué comme terminé.",
    details: [{ key: "Événement", value: "Appointment Status = Completed" }],
  },
  rv_wait: {
    label: "Attente",
    type: "1 heure",
    iconColor: "bg-gray-500/10 text-[#3b4540]",
    description: "Attend 1 heure après la fin du service avant d'envoyer la demande d'avis.",
    details: [
      { key: "Durée", value: "1 heure" },
      {
        key: "Raison",
        value: "Laisser le client partir et se sentir à l'aise",
      },
    ],
  },
  rv_sms: {
    label: "Action",
    type: "SMS Demande d'avis",
    iconColor: "bg-green-500/10 text-green-600",
    description: "Envoie un SMS avec le lien Google Reviews personnalisé.",
    details: [{ key: "Lien", value: "Google Reviews (lien direct)" }],
    messagePreview: `Bonjour {{contact.firstName}} ! Merci pour votre visite 🙏\n\nCela nous ferait vraiment plaisir que vous partagiez votre expérience en 30 secondes ici 👉 [lien Google]\n\nMerci beaucoup !`,
  },
  rv_cond: {
    label: "Condition",
    type: "A cliqué sur le lien ?",
    iconColor: "bg-yellow-500/10 text-yellow-600",
    description: "Vérifie si le contact a cliqué sur le lien d'avis dans le SMS.",
    details: [
      { key: "Si oui", value: '→ Tag "Avis Laissé"' },
      { key: "Si non", value: "→ Attendre 2 jours et relancer par email" },
    ],
  },
  rv_tag: {
    label: "Action",
    type: 'Tag "Avis Laissé"',
    iconColor: "bg-cyan-500/10 text-cyan-600",
    description: 'Ajoute le tag "Avis Laissé" au contact pour éviter les relances futures.',
    details: [
      { key: "Tag ajouté", value: "Avis Laissé" },
      { key: "Résultat", value: "Contact sorti du workflow de relance" },
    ],
  },
  rv_wait2: {
    label: "Attente",
    type: "2 jours",
    iconColor: "bg-gray-500/10 text-[#3b4540]",
    description: "Attend 2 jours si le contact n'a pas cliqué.",
    details: [{ key: "Durée", value: "2 jours" }],
  },
  rv_email: {
    label: "Action",
    type: "Email Rappel Avis",
    iconColor: "bg-purple-500/10 text-purple-600",
    description: "Email de rappel pour laisser un avis si le SMS n'a pas été cliqué.",
    details: [{ key: "Objet", value: "Votre avis compte beaucoup pour nous" }],
    messagePreview: `Bonjour {{contact.fullName}},\n\nNous espérons que vous avez été satisfait(e) de nos services.\n\nSi vous avez 30 secondes, votre avis Google nous aide énormément 🙏\n\n[lien Google Reviews]\n\nMerci,\n{{user.name}}`,
  },
  // Leadgen
  lg_trigger: {
    label: "Déclencheur",
    type: "Facebook Lead Form",
    iconColor: "bg-blue-500/10 text-blue-600",
    description:
      "Se déclenche instantanément dès qu'un utilisateur soumet un formulaire de lead sur Facebook ou Instagram.",
    details: [
      { key: "Source", value: "Meta Lead Ads" },
      { key: "Délai", value: "Immédiat" },
    ],
  },
  lg_tag: {
    label: "Action",
    type: "Ajouter Tag",
    iconColor: "bg-cyan-500/10 text-cyan-600",
    description:
      'Ajoute automatiquement le tag "meta leads" au contact pour le segmenter dans le CRM.',
    details: [
      { key: "Tag", value: "meta leads" },
      { key: "Usage", value: "Tracking d'origine" },
    ],
  },
  lg_wa: {
    label: "Action",
    type: "Envoyer WhatsApp",
    iconColor: "bg-green-500/10 text-green-600",
    description:
      "Envoie un message WhatsApp automatisé pour engager la conversation immédiatement.",
    details: [
      { key: "Canal", value: "WhatsApp Business API" },
      { key: "Timing", value: "Moins de 1 min" },
    ],
    messagePreview: `Bonjour {{contact.firstName}} 👋\n\nMerci pour votre demande sur Facebook ! Je suis l'assistant ClientX. Comment puis-je vous aider ?`,
  },
  lg_find: {
    label: "Condition",
    type: "Trouver Opportunité",
    iconColor: "bg-yellow-500/10 text-yellow-600",
    description: "Recherche si le contact a déjà une opportunité en cours dans le pipeline CRM.",
    details: [
      { key: "Critère", value: "Email / Téléphone" },
      { key: "Pipeline", value: "Ventes Meta" },
    ],
  },
  lg_update: {
    label: "Action",
    type: "Mettre à jour Opportunité",
    iconColor: "bg-purple-500/10 text-purple-600",
    description: "Met à jour l'opportunité existante avec les nouvelles informations du lead.",
    details: [
      { key: "Action", value: "Update Status" },
      { key: "Statut", value: "Relance en cours" },
    ],
  },
  lg_create: {
    label: "Action",
    type: "Créer Opportunité",
    iconColor: "bg-emerald-500/10 text-emerald-600",
    description: "Crée une nouvelle opportunité dans le pipeline si aucune n'a été trouvée.",
    details: [
      { key: "Pipeline", value: "Ventes Meta" },
      { key: "Étape", value: "Nouveau Lead" },
    ],
  },
  lg_owner: {
    label: "Action",
    type: "Ajouter Propriétaire",
    iconColor: "bg-pink-500/10 text-pink-600",
    description:
      "Assigne un membre de l'équipe (commercial) à l'opportunité pour le suivi personnalisé.",
    details: [
      { key: "Assignation", value: "Rotation automatique" },
      { key: "Notification", value: "Alerte mobile" },
    ],
  },
  lg_gsheet: {
    label: "Action",
    type: "Google Sheet",
    iconColor: "bg-green-500/10 text-green-600",
    description:
      "Envoie les données du lead vers une feuille de calcul Google Sheets pour le reporting externe.",
    details: [
      { key: "Destination", value: "Reporting Leads Meta" },
      { key: "Champs", value: "Nom, Email, Tél, Source" },
    ],
  },
};

const WORKFLOWS_META = [
  {
    id: "booking",
    name: "Prise de RDV",
    description: "RDV réservé → confirmation + rappel automatique",
  },
  {
    id: "followup",
    name: "Relance 3 étapes",
    description: "Séquence de relance multi-canal J+0, J+1, J+3",
  },
  {
    id: "reviews",
    name: "Demande d'Avis",
    description: "Génération d'avis Google automatisée après service",
  },
  {
    id: "leadgen",
    name: "Lead Gen (Meta)",
    description: "Traitement instantané des leads Facebook Ads",
  },
];

const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed, color: "#c3ccc6" },
  style: { strokeWidth: 2, stroke: "#c3ccc6" },
  animated: false,
};

// ─── Main Component ───────────────────────────────────────────────────────────
export function MaxWorkflowDemo() {
  const [activeWorkflow, setActiveWorkflow] = useState<string>("booking");
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleSelectNode = useCallback((key: string) => {
    setSelectedNode(key);
  }, []);

  const buildWorkflow = useCallback(
    (id: string) => {
      switch (id) {
        case "booking":
          return buildBookingWorkflow(handleSelectNode);
        case "followup":
          return buildFollowupWorkflow(handleSelectNode);
        case "reviews":
          return buildReviewsWorkflow(handleSelectNode);
        case "leadgen":
          return buildLeadgenWorkflow(handleSelectNode);
        default:
          return buildBookingWorkflow(handleSelectNode);
      }
    },
    [handleSelectNode],
  );

  const workflow = useMemo(() => buildWorkflow(activeWorkflow), [activeWorkflow, buildWorkflow]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsBuilding(true);
      setIsSimulating(false);
      setCurrentStep(-1);
      setSelectedNode(null);
      setNodes(
        workflow.nodes.map((n) => ({
          ...n,
          data: { ...n.data, isActive: false, isCompleted: false },
        })),
      );
      setEdges([]);
      for (let i = 0; i < workflow.edges.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 350));
        setEdges((eds) => [
          ...eds,
          { ...workflow.edges[i], style: { strokeWidth: 2, stroke: "#c3ccc6" } },
        ]);
      }
      if (!cancelled) setIsBuilding(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [workflow, setNodes, setEdges]);

  useEffect(() => {
    if (!isSimulating || currentStep >= workflow.simulation.length) {
      if (currentStep >= workflow.simulation.length) setIsSimulating(false);
      return;
    }
    const tid = setTimeout(() => {
      const activeId = workflow.simulation[currentStep];
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            isActive: n.id === activeId,
            isCompleted: workflow.simulation.slice(0, currentStep).includes(n.id),
          },
        })),
      );
      setEdges((eds) =>
        eds.map((e) => ({
          ...e,
          animated: e.source === workflow.simulation[currentStep - 1] && e.target === activeId,
          style: {
            strokeWidth: 2,
            stroke:
              e.source === workflow.simulation[currentStep - 1] && e.target === activeId
                ? "#22c55e"
                : "#c3ccc6",
          },
        })),
      );
      setCurrentStep((p) => p + 1);
    }, 1100);
    return () => clearTimeout(tid);
  }, [isSimulating, currentStep, workflow, setNodes, setEdges]);

  const startSimulation = () => {
    if (isBuilding) return;
    setIsSimulating(true);
    setCurrentStep(0);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isActive: false, isCompleted: false },
      })),
    );
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        animated: false,
        style: { ...e.style, stroke: "#c3ccc6" },
      })),
    );
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setCurrentStep(-1);
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isActive: false, isCompleted: false },
      })),
    );
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        animated: false,
        style: { ...e.style, stroke: "#c3ccc6" },
      })),
    );
  };

  const nodeInfo = selectedNode ? NODE_INFO[selectedNode] : null;

  return (
    <div
      className="w-full max-w-5xl mx-auto border border-[rgba(10,30,15,0.09)] rounded-2xl overflow-hidden bg-white/50 flex flex-col"
      style={{ height: 820 }}
    >
      {/* Top Bar */}
      <div className="border-b border-[rgba(10,30,15,0.09)] bg-white/80 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#16a34a] uppercase tracking-wider">
              Max Workflow AI
            </div>
            <div className="text-sm text-[#6b7570]">
              Sélectionnez un scénario puis cliquez sur un nœud pour voir ses détails
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={startSimulation}
              disabled={isBuilding || isSimulating}
              className="bg-[#32dc32] text-black text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-40"
            >
              <Play size={13} /> Simuler
            </button>
            <button
              onClick={resetSimulation}
              disabled={isBuilding}
              className="px-3 bg-[#eef2ef] text-[#0b0f0c] text-xs font-bold py-2 rounded-lg disabled:opacity-40"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {WORKFLOWS_META.map((wf) => (
            <button
              key={wf.id}
              onClick={() => setActiveWorkflow(wf.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeWorkflow === wf.id
                  ? "bg-[#32dc32] text-black font-bold"
                  : "bg-[#f7faf8] hover:bg-[#eef2ef] text-[#6b7570] border border-[rgba(10,30,15,0.09)]"
              }`}
            >
              {wf.name}
            </button>
          ))}
        </div>
      </div>

      {/* Flow + Panel */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ReactFlow */}
        <div className="flex-1 bg-[#f6f9f7] relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.3}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#d5ddd8" gap={20} />
            <Controls className="bg-white border-[rgba(10,30,15,0.09)]" />
          </ReactFlow>
          {/* Status pill */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur border border-[rgba(10,30,15,0.09)] px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 pointer-events-none">
            <div
              className={`w-2 h-2 rounded-full ${isBuilding ? "bg-yellow-500 animate-pulse" : isSimulating ? "bg-[#32dc32] animate-pulse" : "bg-[#9aa39e]"}`}
            ></div>
            {isBuilding
              ? "Construction..."
              : isSimulating
                ? "Simulation..."
                : "Cliquez sur un nœud →"}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div
          className={`transition-all duration-300 border-l border-[rgba(10,30,15,0.09)] bg-white overflow-y-auto flex-shrink-0 ${selectedNode ? "w-72" : "w-0"}`}
        >
          {nodeInfo && (
            <div className="p-4 flex flex-col gap-4 min-w-[288px]">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold mb-2 ${nodeInfo.iconColor}`}
                  >
                    {nodeInfo.label}
                  </div>
                  <div className="font-bold text-sm leading-tight">{nodeInfo.type}</div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg hover:bg-[#eef2ef] text-[#6b7570] flex-shrink-0"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-[#6b7570] leading-relaxed border-b border-[rgba(10,30,15,0.09)] pb-4">
                {nodeInfo.description}
              </p>

              {/* Details */}
              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6b7570]">
                  Configuration
                </div>
                {nodeInfo.details.map((d, i) => (
                  <div
                    key={i}
                    className="bg-[#f7faf8] rounded-lg px-3 py-2.5 border border-[rgba(10,30,15,0.09)]"
                  >
                    <div className="text-[10px] text-[#6b7570] mb-0.5">{d.key}</div>
                    <div className="text-xs font-semibold font-mono">{d.value}</div>
                  </div>
                ))}
              </div>

              {/* Message Preview */}
              {nodeInfo.messagePreview && (
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6b7570]">
                    Aperçu du message
                  </div>
                  <div className="bg-[#f7faf8] border border-[#32dc32]/30 rounded-lg p-3">
                    <pre className="text-xs text-[#0b0f0c] whitespace-pre-wrap leading-relaxed font-mono">
                      {nodeInfo.messagePreview}
                    </pre>
                  </div>
                </div>
              )}

              {/* Info box */}
              <div className="bg-[#32dc32]/10 border border-[#32dc32]/20 rounded-lg p-3">
                <div className="text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-1">
                  Max Workflow AI
                </div>
                <p className="text-xs text-[#6b7570] leading-relaxed">
                  Ce nœud est géré automatiquement par Max, sans aucune intervention manuelle.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
