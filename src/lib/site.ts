import {
  Buildings,
  Car,
  GraduationCap,
  ShoppingBagOpen,
  Sun,
  HouseLine,
  ForkKnife,
  Heartbeat,
  Layout,
  EnvelopeSimple,
  PlayCircle,
  Users,
  VideoCamera,
  CalendarCheck,
  FlowArrow,
  CreditCard,
  Phone,
  ChatCircleText,
  Browser,
  Star,
  Sparkle,
  Question,
  Robot,
} from "@phosphor-icons/react";

import type { ComponentType } from "react";
export type IconType = ComponentType<{ className?: string; weight?: "regular" | "bold" | "fill" }>;

/* ---------------- Sectors ---------------- */
export interface Sector {
  index: string;
  name: string;
  desc: string;
  icon: IconType;
}
export const SECTORS: Sector[] = [
  {
    index: "01",
    name: "Assurance et banque",
    desc: "Courtiers, banques et institutions financières",
    icon: Buildings,
  },
  {
    index: "02",
    name: "Automobile",
    desc: "Concessionnaires, réparateurs et services automobiles",
    icon: Car,
  },
  {
    index: "03",
    name: "École et formation",
    desc: "Écoles, centres de formation et organismes de certification",
    icon: GraduationCap,
  },
  {
    index: "04",
    name: "E-commerce",
    desc: "Boutiques en ligne, DNVB et marques direct-to-consumer",
    icon: ShoppingBagOpen,
  },
  {
    index: "05",
    name: "Énergie renouvelable & Traitement d'eau",
    desc: "Solaire, traitement des eaux, filtration et purification",
    icon: Sun,
  },
  {
    index: "06",
    name: "Immobilier",
    desc: "Agences immobilières, promoteurs et gestionnaires locatifs",
    icon: HouseLine,
  },
  {
    index: "07",
    name: "Restauration",
    desc: "Restaurants, brasseries et établissements de restauration",
    icon: ForkKnife,
  },
  {
    index: "08",
    name: "Fitness beauté et bien-être",
    desc: "Salles de sport, clubs de golf, centres de beauté, soins et coaching",
    icon: Heartbeat,
  },
];

/* ---------------- 4 Steps ---------------- */
export interface Step {
  label: string;
  subtitle: string;
  title: string;
  desc: string;
  link: string;
}
export const STEPS: Step[] = [
  {
    label: "01 Créer",
    subtitle: "Sites, Funnels, E-learning",
    title: "Construisez les portes d'entrée de votre activité.",
    desc: "Sites, tunnels de vente, formulaires, boutiques en ligne et espaces de formation alimentent directement votre CRM unifié.",
    link: "Explorer le module Créer",
  },
  {
    label: "02 Diffuser",
    subtitle: "Email, WhatsApp, Social",
    title: "Parlez à la bonne personne au bon moment.",
    desc: "Emails, SMS, WhatsApp et messages sociaux partent avec tout le contexte historique du contact.",
    link: "Explorer le module Diffuser",
  },
  {
    label: "03 Convertir",
    subtitle: "Calendriers, Ventes, Devis",
    title: "Faites avancer chaque opportunité sans friction.",
    desc: "Calendriers intelligents, pipelines de vente visuels, paiements et devis signés en ligne.",
    link: "Explorer le module Convertir",
  },
  {
    label: "04 Orchestrer",
    subtitle: "CRM & Automatisations",
    title: "Transformez les actions isolées en un système.",
    desc: "Le CRM systémique et le moteur d'automatisation coordonnent le travail du premier clic jusqu'à la livraison.",
    link: "Explorer le module Orchestrer",
  },
];

/* ---------------- Features ---------------- */
export interface Feature {
  index: string;
  category: string;
  title: string;
  desc: string;
  icon: IconType;
}
export const FEATURES: Feature[] = [
  {
    index: "01",
    category: "Conversion",
    title: "Sites & Tunnels de Vente",
    desc: "Construisez vos pages web et funnels de vente aussi facilement qu'un glisser-déposer. Ultra-rapides et connectés au CRM.",
    icon: Layout,
  },
  {
    index: "02",
    category: "Marketing",
    title: "Emailing & SMS Marketing",
    desc: "Une infrastructure robuste, des templates modernes, des emails qui atterrissent en boîte principale et des campagnes SMS ciblées.",
    icon: EnvelopeSimple,
  },
  {
    index: "03",
    category: "Livraison",
    title: "Formations & E-learning",
    desc: "Créez une expérience d'apprentissage fluide et captivante comme Netflix grâce à notre module de cours intégré.",
    icon: PlayCircle,
  },
  {
    index: "04",
    category: "Ventes",
    title: "CRM Systémique & Ventes",
    desc: "Suivez vos contacts de manière unifiée pour centraliser l'intégralité de vos interactions et opportunités de vente.",
    icon: Users,
  },
  {
    index: "05",
    category: "Engagement",
    title: "Webinars Live & Direct",
    desc: "Exploitez l'arme la plus puissante pour créer du lien avec votre audience grâce à nos Lives et replays intégrés.",
    icon: VideoCamera,
  },
  {
    index: "06",
    category: "Visibilité",
    title: "Planificateur Réseaux Sociaux",
    desc: "Planifiez vos publications, automatisez vos messages directs et pilotez Instagram, Facebook, TikTok, LinkedIn.",
    icon: CalendarCheck,
  },
  {
    index: "07",
    category: "Gain de temps",
    title: "Automatisations & Workflows",
    desc: "Remplacez vos outils externes coûteux par un moteur de déclencheurs et d'actions illimités sans aucune latence.",
    icon: FlowArrow,
  },
  {
    index: "08",
    category: "Closing",
    title: "Calendriers & Rendez-vous IA",
    desc: "Qualifiez vos prospects, optimisez vos disponibilités et échangez avec des leads chauds avec rappels anti-no-show.",
    icon: CalendarCheck,
  },
  {
    index: "09",
    category: "Revenus",
    title: "Paniers 2.0 & Facturation",
    desc: "Encaissez via Stripe ou PayPal, proposez des upsells 1-clic, générez vos devis avec signature électronique et vos factures.",
    icon: CreditCard,
  },
];

/* ---------------- Pricing ---------------- */
/** Tarifs France uniquement (en euros). */
export type Region = "fr";

export interface PlanRegion {
  price: number;
  currency: "€";
  monthly: number;
  install1: number;
}
export interface Plan {
  name: string;
  desc: string;
  featured: boolean;
  badge?: string;
  badgeStyle?: "solid" | "outline";
  users: string;
  contacts: string;
  regions: { fr: PlanRegion };
}

export const PLANS: Plan[] = [
  {
    name: "Starter",
    desc: "Idéal pour lancer son activité avec la plateforme unifiée ClientX.",
    featured: false,
    users: "3",
    contacts: "5 000",
    regions: {
      fr: { price: 990, currency: "€", monthly: 82.5, install1: 495 },
    },
  },
  {
    name: "Pro",
    desc: "La formule complète pour les équipes et entreprises en forte croissance.",
    featured: true,
    badge: "Le plus populaire",
    badgeStyle: "solid",
    users: "10",
    contacts: "15 000",
    regions: {
      fr: { price: 2490, currency: "€", monthly: 207.5, install1: 1245 },
    },
  },
  {
    name: "Scale",
    desc: "Pour les structures à fort volume et déploiement stratégique sans aucune restriction.",
    featured: false,
    users: "Illimité",
    contacts: "Illimité",
    regions: {
      fr: { price: 4990, currency: "€", monthly: 415.8, install1: 2495 },
    },
  },
];

/* Included in all plans — grouped */
export const INCLUDED_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Créer & vendre",
    items: [
      "Site et pages de réservation illimités",
      "Formations illimitées",
      "Communautés illimitées",
      "Quiz & sondages illimités",
      "Panier d'achat 2.0 illimité",
      "2 applications mobiles (utilisateurs / apprenants)",
    ],
  },
  {
    title: "Communiquer & convertir",
    items: [
      "Email marketing (environ 10 000 emails / mois)*",
      "SMS marketing (environ 505 SMS / mois)*",
      "Inbox unifiée illimitée",
      "Planificateur social illimité",
      "Calendriers illimités",
    ],
  },
  {
    title: "Gérer & automatiser",
    items: [
      "Messages et relances automatiques illimités",
      "Factures & devis illimités",
      "Signatures électroniques illimitées",
      "Tableaux de bord illimités",
      "Connexion à vos autres outils illimitée",
      "Stockage média illimité",
      "0 % de frais de transaction",
    ],
  },
];

/* AI agents consumption */
export interface AgentRate {
  unit: string;
  /** Prix client en euros (coût × marge). */
  eur: number;
}

/** "0,04 €" — euros, jusqu'à 4 décimales. */
export function formatRate(eur: number) {
  return (
    new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(
      eur,
    ) + " €"
  );
}
export interface AgentCard {
  name: string;
  icon: IconType;
  rates: AgentRate[];
}
/*
 * Prix client = coût plateforme × marge (multiplicateur), repris du plan SaaS
 * "Pro Clientx" → onglet Rebilling (crm.clientx.ai). Mettre à jour ici si la marge change.
 *   Voice AI ............ 0,02 /min × 2   = 0,04 /min (+ téléphonie ci-dessous)
 *   Téléphonie .......... appel sortant 0,014 × 2 = 0,028 /min · entrant 0,0085 × 2 = 0,017 /min
 *                         SMS 0,0083 × 2 = 0,0166 /segment
 *   Conversation AI ..... 0,02 /message × 2 = 0,04
 *   WhatsApp ............ 0,074 × 1,9 = 0,1406 /template envoyé
 *   Content AI .......... 1 000 mots 0,09 × 5 = 0,45 · image 0,06 × 5 = 0,30
 *   Reviews AI .......... 0,01 /avis × 10 = 0,10
 *   Workflow premium .... 0,01 /exécution × 5 = 0,05
 *   Workflow modèles IA . GPT-4o mini, 750 000 mots : entrée 0,6 × 2 = 1,20 · sortie 2,4 × 2 = 4,80
 *   Agent Studio ........ 0,25 / 750 000 tokens × 3 = 0,75
 *   AI Studio ........... 2,11 / 1 M tokens × 5 = 10,55
 *   Ask AI .............. 2,11 / 1 M tokens × 3 = 6,33
 *   Email ............... 0,000675 × ~10 = 0,0068 /email · vérification 0,0025 × 2 = 0,005
 */
export const AI_AGENTS: AgentCard[] = [
  {
    name: "Voice AI",
    icon: Phone,
    rates: [
      { unit: "Par minute d'agent vocal IA", eur: 0.04 },
      { unit: "+ minute d'appel sortant", eur: 0.028 },
      { unit: "+ minute d'appel entrant", eur: 0.017 },
    ],
  },
  {
    name: "Conversation AI",
    icon: ChatCircleText,
    rates: [
      { unit: "Par message IA", eur: 0.04 },
      { unit: "Par template WhatsApp envoyé", eur: 0.1406 },
    ],
  },
  {
    name: "Site & réseaux sociaux IA",
    icon: Browser,
    rates: [
      { unit: "Par 1 000 mots générés", eur: 0.45 },
      { unit: "Par image générée", eur: 0.3 },
    ],
  },
  {
    name: "Reviews AI",
    icon: Star,
    rates: [{ unit: "Par réponse IA à un avis", eur: 0.1 }],
  },
  {
    name: "Relances automatiques IA",
    icon: FlowArrow,
    rates: [
      { unit: "Par action premium exécutée", eur: 0.05 },
      { unit: "Modèles IA, 750 000 mots en entrée", eur: 1.2 },
      { unit: "Modèles IA, 750 000 mots en sortie", eur: 4.8 },
    ],
  },
  {
    name: "Agent Studio",
    icon: Robot,
    rates: [{ unit: "Par 750 000 tokens", eur: 0.75 }],
  },
  {
    name: "AI Studio",
    icon: Sparkle,
    rates: [{ unit: "Par million de tokens", eur: 10.55 }],
  },
  {
    name: "Ask AI",
    icon: Question,
    rates: [{ unit: "Par million de tokens", eur: 6.33 }],
  },
  {
    name: "SMS & Emails",
    icon: EnvelopeSimple,
    rates: [
      { unit: "Par SMS (segment)", eur: 0.0166 },
      { unit: "Par email envoyé", eur: 0.0068 },
      { unit: "Par vérification d'email", eur: 0.005 },
    ],
  },
];

/* ---------------- FAQ ---------------- */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Est-ce que ClientX remplace mon logiciel de réservation ?",
    a: "Pas forcément. ClientX fait ce que les logiciels de réservation ne font pas : répondre à vos clientes sur Instagram, Facebook et WhatsApp, relancer celles qui ne reviennent plus et collecter des avis Google. Nous vous aidons à reprendre votre agenda et vos fiches clientes si vous le souhaitez.",
  },
  {
    q: "Y a-t-il une commission sur mes soins ou mes réservations ?",
    a: "Non. Vous payez un abonnement fixe, sans pourcentage sur vos prestations. Vos clientes restent les vôtres.",
  },
  {
    q: "Comment se passe la mise en place ?",
    a: "Elle est accompagnée et facturée 490 € HT, une seule fois. Nous configurons avec vous vos soins, vos tarifs, vos horaires et le ton de l'assistante, puis nous vous formons à l'utiliser.",
  },
  {
    q: "Puis-je tester avant de m'engager ?",
    a: "Oui, l'essai gratuit dure 14 jours. Vous pouvez aussi demander une démonstration en direct.",
  },
  {
    q: "Mes données et celles de mes clientes sont-elles protégées ?",
    a: "Oui. Vos données restent les vôtres et notre système de management est certifié ISO 9001.",
  },
];

/* ---------------- Assets ---------------- */
export const CLIENTX_LOGO =
  "https://vibe.filesafe.space/1777308110755418327/assets/4ebc601b-b398-4969-93ae-2ef85decd1ff.png";
export const CLIENTX_HERO_LOGO =
  "https://assets.cdn.filesafe.space/yKKBFo4WiCYiUP0GEgmp/media/6aba9d0172844d8ecf243bea.png";
export const VIDEO_SRC =
  "https://assets.cdn.filesafe.space/zoW9RVMsMP37fO8WXMgD/media/7a3c0f19-4e92-49b4-a9b2-2a7f4f0e5181.mp4";
export const BOOKING_IFRAME_SRC = "https://link.clientx.ai/widget/booking/51RZQPaa7WdsUiefZ3FL";
export const BOOKING_SCRIPT_SRC = "https://link.clientx.ai/js/form_embed.js";

export const CLIENT_LOGOS = [
  { name: "Inwi", src: "https://clientx.uk/wp-content/uploads/2025/06/inwi_2.png.webp" },
  { name: "CNSS", src: "https://clientx.uk/wp-content/uploads/2025/06/cnss.png.webp" },
  { name: "Volvo", src: "https://clientx.uk/wp-content/uploads/2025/06/volvo.png.webp" },
  { name: "SOFAC", src: "https://clientx.uk/wp-content/uploads/2025/06/sofac_3.png.webp" },
  { name: "Tanger Med", src: "https://clientx.uk/wp-content/uploads/2025/06/tangez_med.png.webp" },
  { name: "Autocaz", src: "https://clientx.uk/wp-content/uploads/2025/06/autocaz.png.webp" },
  { name: "Fuso", src: "https://clientx.uk/wp-content/uploads/2025/06/fuso.png.webp" },
  {
    name: "Kapset Group",
    src: "https://clientx.uk/wp-content/uploads/2025/06/kapset_group.png.webp",
  },
  { name: "CIMR", src: "https://clientx.uk/wp-content/uploads/2025/06/CIMR.png.webp" },
  { name: "Groupe Allali", src: "https://clientx.uk/wp-content/uploads/2025/06/Allali.png.webp" },
  { name: "Centrale", src: "https://clientx.uk/wp-content/uploads/2025/06/centrale.png.webp" },
  { name: "Panzani", src: "https://clientx.uk/wp-content/uploads/2025/06/panzani.png.webp" },
  { name: "Honoris", src: "https://clientx.uk/wp-content/uploads/2025/06/honorie.png.webp" },
  { name: "Ostelea", src: "https://clientx.uk/wp-content/uploads/2025/06/ostelea.png.webp" },
  { name: "Barry", src: "https://clientx.uk/wp-content/uploads/2025/06/barry.png.webp" },
  { name: "Miami", src: "https://clientx.uk/wp-content/uploads/2025/06/miami.png.webp" },
  { name: "Filipinos", src: "https://clientx.uk/wp-content/uploads/2025/06/filipinos.png.webp" },
  {
    name: "Quintessence",
    src: "https://clientx.uk/wp-content/uploads/2025/06/quinteness.png.webp",
  },
  {
    name: "American Academy",
    src: "https://clientx.uk/wp-content/uploads/2025/06/american_academy.png.webp",
  },
  { name: "Peugeot", src: "https://clientx.uk/wp-content/uploads/2025/06/peugoet.png.webp" },
  { name: "Mafoder", src: "https://clientx.uk/wp-content/uploads/2025/06/mafoder.png.webp" },
  { name: "Jamain", src: "https://clientx.uk/wp-content/uploads/2025/06/jamain.png.webp" },
  { name: "Comicom", src: "https://clientx.uk/wp-content/uploads/2025/06/comicom.png.webp" },
  { name: "Dimateq", src: "https://clientx.uk/wp-content/uploads/2025/06/dimated.png.webp" },
  { name: "Alamana", src: "https://clientx.uk/wp-content/uploads/2025/06/alamana.png.webp" },
  { name: "Ecdome", src: "https://clientx.uk/wp-content/uploads/2025/06/ecdome.png.webp" },
  { name: "Khayatey", src: "https://clientx.uk/wp-content/uploads/2025/06/khayatey.png.webp" },
  { name: "Maserati", src: "https://clientx.uk/wp-content/uploads/2025/06/maserati.png.webp" },
  { name: "Chery", src: "https://clientx.uk/wp-content/uploads/2025/06/chery.png.webp" },
  { name: "Land Rover", src: "https://clientx.uk/wp-content/uploads/2025/06/land_rover.png.webp" },
  { name: "Citroen", src: "https://clientx.uk/wp-content/uploads/2025/06/citroen.png.webp" },
  { name: "Epil Tech", src: "https://clientx.uk/wp-content/uploads/2025/06/epil_tech.png.webp" },
  { name: "Auto Hall", src: "https://clientx.uk/wp-content/uploads/2025/06/auto_holl.png.webp" },
  { name: "Jaguar", src: "https://clientx.uk/wp-content/uploads/2025/06/jaguar.png.webp" },
  { name: "Ford", src: "https://clientx.uk/wp-content/uploads/2025/06/ford_2.png.webp" },
  {
    name: "Aston Martin",
    src: "https://clientx.uk/wp-content/uploads/2025/06/aston_martin.png.webp",
  },
  { name: "Opel", src: "https://clientx.uk/wp-content/uploads/2025/06/opel_2.png.webp" },
  { name: "Renault", src: "https://clientx.uk/wp-content/uploads/2025/06/renault.png.webp" },
  { name: "OCP", src: "https://clientx.uk/wp-content/uploads/2025/06/ocp_2-1.png.webp" },
  { name: "Ayven", src: "https://clientx.uk/wp-content/uploads/2025/06/ayven.png.webp" },
  { name: "Menara", src: "https://clientx.uk/wp-content/uploads/2025/06/menara.png.webp" },
  { name: "Chronopost", src: "https://clientx.uk/wp-content/uploads/2025/06/chronopost.png.webp" },
  { name: "GSK", src: "https://clientx.uk/wp-content/uploads/2025/06/GSK.png.webp" },
  { name: "Bayer", src: "https://clientx.uk/wp-content/uploads/2025/06/bayer.png.webp" },
  { name: "Leo", src: "https://clientx.uk/wp-content/uploads/2025/06/leo.png.webp" },
  {
    name: "Prestigia",
    src: "https://clientx.uk/wp-content/uploads/2025/06/prestigialogo.png.webp",
  },
  { name: "Coralia", src: "https://clientx.uk/wp-content/uploads/2025/06/logo-coralia.png.webp" },
  { name: "Addoha", src: "https://clientx.uk/wp-content/uploads/2025/06/ADDOHA.png.webp" },
  { name: "Automobile", src: "https://clientx.uk/wp-content/uploads/2025/06/automobile.png.webp" },
  { name: "Omoda", src: "https://clientx.uk/wp-content/uploads/2025/06/omoda.png.webp" },
  { name: "Suzuki", src: "https://clientx.uk/wp-content/uploads/2025/06/suzuki.png.webp" },
  { name: "CFAO", src: "https://clientx.uk/wp-content/uploads/2025/06/cfao.png.webp" },
  {
    name: "Ford Trucks",
    src: "https://clientx.uk/wp-content/uploads/2025/06/ford_trucks.png.webp",
  },
];

/* ---------------- Appels à l'action ---------------- */
/** Bouton principal : essai gratuit 14 jours. La démo passe en second. */
export const TRIAL_URL = "/contact?offre=essai-gratuit-14-jours";
export const DEMO_URL = "/contact";
