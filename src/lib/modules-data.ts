import {
  Layout,
  Users,
  EnvelopeSimple,
  CalendarCheck,
  PlayCircle,
  FlowArrow,
  VideoCamera,
  CreditCard,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

export type ModuleIcon = typeof Layout;

export interface ModuleData {
  id: string;
  title: string;
  icon: ModuleIcon;
  desc: string;
  points: string[];
  /** label for the placeholder screenshot box */
  screenshot: string;
}

export const MODULES: ModuleData[] = [
  {
    id: "sites",
    title: "Sites & Tunnels de Vente",
    icon: Layout,
    desc: "Construisez vos pages web, funnels et formulaires de capture en quelques minutes. Directement reliés au CRM natif.",
    points: [
      "Page Builder Drag-and-Drop",
      "Templates prêts à l'emploi",
      "A/B Testing & Analytics",
      "Domaines personnalisés inclus",
    ],
    screenshot: "Funnel Builder",
  },
  {
    id: "crm",
    title: "CRM Systémique & Ventes",
    icon: Users,
    desc: "Centralisez l'historique complet de chaque prospect. Suivez vos pipelines de vente de l'opportunité au paiement.",
    points: [
      "Fiches contacts unifiées",
      "Pipelines personnalisables",
      "Suivi des opportunités",
      "Gestion devis & factures",
    ],
    screenshot: "Pipeline Ventes",
  },
  {
    id: "emailing",
    title: "Emailing, SMS & WhatsApp",
    icon: EnvelopeSimple,
    desc: "Communiquez depuis une seule Inbox unifiée. Séquences automatisées et réponses instantanées sur tous vos canaux.",
    points: [
      "Délivrabilité haute performance",
      "WhatsApp Business API",
      "Campagnes Email & SMS",
      "Conversations centralisées",
    ],
    screenshot: "Inbox Unifiée",
  },
  {
    id: "calendriers",
    title: "Calendriers & Rendez-vous",
    icon: CalendarCheck,
    desc: "Qualifiez vos leads et permettez-leur de réserver directement. Rappels SMS/WhatsApp anti-no-show.",
    points: [
      "Synchronisation Google/Outlook",
      "Rappels automatiques vocal/SMS",
      "Paiement à la réservation",
      "Rappels anti-no-show intelligents",
    ],
    screenshot: "Calendrier",
  },
  {
    id: "formations",
    title: "Formations & E-learning",
    icon: PlayCircle,
    desc: "Hébergez vos cours, formations et communautés dans un espace membre fluide captivant comme Netflix.",
    points: [
      "Accès automatique après paiement",
      "Suivi de la progression",
      "Formats vidéo / PDF / Quizz",
      "Espaces communautaires",
    ],
    screenshot: "Espace Formation",
  },
  {
    id: "social",
    title: "Planificateur Social",
    icon: CalendarCheck,
    desc: "Planifiez et publiez sur Instagram, Facebook, LinkedIn, TikTok et Pinterest depuis votre dashboard.",
    points: [
      "Programmation multi-canaux",
      "Bibliothèque de modèles de contenu",
      "Modération automatique",
      "Statistiques d'engagement",
    ],
    screenshot: "Planificateur Social",
  },
  {
    id: "automatisations",
    title: "Automatisations & Workflows",
    icon: FlowArrow,
    desc: "Remplacez vos outils tiers par des déclencheurs et actions logiques illimités avec une exécution instantanée.",
    points: [
      "Builder de workflows visuel",
      "Actions illimitées",
      "Webhooks & API",
      "Exécution 0 latence",
    ],
    screenshot: "Workflow Builder",
  },
  {
    id: "webinars",
    title: "Webinars Live & Conférences",
    icon: VideoCamera,
    desc: "Exploitez l'arme la plus puissante pour créer du lien avec votre audience grâce à notre module Live intégré.",
    points: [
      "Conférences en direct HD",
      "Rediffusions & replays automatiques",
      "Offres & pop-ups d'achat en temps réel",
      "Chat interactif & modération IA",
    ],
    screenshot: "Webinar Live",
  },
  {
    id: "panier",
    title: "Panier d'Achat 2.0 & Facturation",
    icon: CreditCard,
    desc: "Paiements Stripe & PayPal 1-clic, abonnements récurrents, relances automatiques et devis signés électroniquement.",
    points: [
      "Upsells & Order Bumps 1-clic",
      "Devis & Factures conformes",
      "Gestion TVA & devises",
      "Portail client sécurisé",
    ],
    screenshot: "Checkout 2.0",
  },
];

// keep the PhosphorIcon referenced so the import isn't dropped
export type _PI = PhosphorIcon;
