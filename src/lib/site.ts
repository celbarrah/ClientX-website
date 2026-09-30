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
  ShareNetwork,
  Star,
  Sparkle,
  Question,
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
export type Region = "fr" | "ma";

export interface PlanRegion {
  price: number;
  currency: "€" | "MAD";
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
  regions: { fr: PlanRegion; ma: PlanRegion };
}

export const PLANS: Plan[] = [
  {
    name: "Starter",
    desc: "Idéal pour lancer son activité avec la plateforme unifiée ClientX.",
    featured: false,
    users: "1",
    contacts: "5 000",
    regions: {
      fr: { price: 990, currency: "€", monthly: 82.5, install1: 495 },
      ma: { price: 14000, currency: "MAD", monthly: 1167, install1: 7000 },
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
      ma: { price: 35100, currency: "MAD", monthly: 2925, install1: 17550 },
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
      ma: { price: 70300, currency: "MAD", monthly: 5858, install1: 35150 },
    },
  },
];

/* Included in all plans — grouped */
export const INCLUDED_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Créer & vendre",
    items: [
      "Sites & funnels illimités",
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
      "Automatisations illimitées",
      "Factures & devis illimités",
      "Signatures électroniques illimitées",
      "Dashboards illimités",
      "Accès API illimité",
      "Stockage média illimité",
      "0 % de frais de transaction",
    ],
  },
];

/* AI agents consumption */
export interface AgentRate {
  unit: string;
  price: string;
}
export interface AgentCard {
  name: string;
  icon: IconType;
  rates: AgentRate[];
}
export const AI_AGENTS: AgentCard[] = [
  {
    name: "Voice AI",
    icon: Phone,
    rates: [{ unit: "Par minute d'appel, entrant ou sortant", price: "0,45 €" }],
  },
  {
    name: "Conversation AI",
    icon: ChatCircleText,
    rates: [{ unit: "Par conversation WhatsApp", price: "0,37 €" }],
  },
  {
    name: "Funnel & Web AI",
    icon: Browser,
    rates: [
      { unit: "Par funnel généré", price: "2,97 €" },
      { unit: "Par 1 000 mots générés", price: "0,45 €" },
    ],
  },
  {
    name: "Social Media AI",
    icon: ShareNetwork,
    rates: [
      { unit: "Par 1 000 mots générés", price: "0,45 €" },
      { unit: "Par image générée", price: "0,30 €" },
    ],
  },
  {
    name: "Reviews AI",
    icon: Star,
    rates: [
      { unit: "Par réponse à un avis", price: "0,01 €" },
      { unit: "Par message envoyé", price: "0,14 €" },
    ],
  },
  {
    name: "Workflow AI",
    icon: FlowArrow,
    rates: [
      { unit: "Par message IA", price: "0,10 €" },
      { unit: "Par SMS de relance", price: "0,04 €" },
    ],
  },
  {
    name: "AI Studio",
    icon: Sparkle,
    rates: [{ unit: "Par million de tokens", price: "≈ 9,50 €" }],
  },
  { name: "Ask AI", icon: Question, rates: [{ unit: "Par million de tokens", price: "≈ 5,70 €" }] },
];

/* ---------------- FAQ ---------------- */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "ClientX AI peut-il remplacer tous mes abonnements actuels ?",
    a: "Oui ! ClientX remplace votre outil de tunnel, votre CRM, votre système d'emailing, votre planificateur de rendez-vous, vos outils d'automatisation, vos hébergements de formation et votre planificateur social, vous faisant économiser plus de 15 000€ par an.",
  },
  {
    q: "Comment fonctionne l'accompagnement et l'onboarding ?",
    a: "Chaque nouveau membre bénéficie d'un rendez-vous 1:1 d'onboarding technique avec un eXpert ClientX AI pour configurer vos domaines, vos DNS, vos emails et paramétrer vos premiers workflows sur-mesure.",
  },
  {
    q: "Mes données clients sont-elles sécurisées et conformes RGPD ?",
    a: "Absolument. Vos données sont chiffrées selon les protocoles les plus stricts et notre système de management est certifié ISO 9001. Vos données restent votre propriété exclusive.",
  },
  {
    q: "Puis-je tester avant de m'engager ?",
    a: "Oui, vous pouvez réserver une démonstration offerte pour voir la plateforme en direct sur votre propre activité, puis profiter d'un essai avec accompagnement technique 1:1.",
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
