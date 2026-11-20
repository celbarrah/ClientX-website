/**
 * Pages Fonctionnalités (6). Vocabulaire de métier : clientes, soins, planning.
 * Pas de jargon technique (funnel, pipeline, workflow, tunnel, « +20 outils »).
 */

export interface Fonctionnalite {
  slug: string;
  name: string;
  /** Une phrase pour les cartes et le menu. */
  short: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroAccent: string;
  heroText: string;
  /** Photo d'ambiance (réutilise les visuels des pages métiers). */
  image: string;
  imageAlt: string;
  imagePosition?: string;
  points: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
}

const TRIAL_FAQ = {
  q: "Puis-je tester avant de m'engager ?",
  a: "Oui, l'essai gratuit dure 14 jours.",
};

export const FONCTIONNALITES: Fonctionnalite[] = [
  {
    slug: "assistante-ia",
    name: "Assistante IA",
    short: "Elle répond à vos clientes sur Instagram, Facebook et WhatsApp.",
    seoTitle: "Assistante IA Instagram, Facebook et WhatsApp — ClientX AI",
    seoDescription:
      "Une assistante IA qui répond à vos clientes sur Instagram, Facebook et WhatsApp et propose un créneau libre. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Une assistante qui répond",
    heroAccent: "pendant que vous travaillez.",
    heroText:
      "Elle répond aux messages de vos clientes sur Instagram, Facebook et WhatsApp, présente vos soins et vos tarifs, et propose un créneau libre de votre planning.",
    image: "/images/activites/institut.jpg",
    imageAlt: "Soin du visage dans un institut de beauté",
    imagePosition: "50% 30%",
    points: [
      {
        title: "Trois réseaux, une seule boîte de réception",
        text: "Les messages d'Instagram, de Facebook et de WhatsApp arrivent au même endroit.",
      },
      {
        title: "Elle connaît vos soins et vos tarifs",
        text: "Vous lui indiquez ce qu'elle présente, vos horaires, et ce qu'elle ne doit jamais promettre.",
      },
      {
        title: "Elle propose un créneau libre",
        text: "La cliente choisit une heure dans votre planning, sans attendre votre réponse.",
      },
      {
        title: "Vous gardez la main",
        text: "Vous pouvez reprendre n'importe quelle conversation à tout moment.",
      },
    ],
    steps: [
      {
        title: "On la configure avec vous",
        text: "Vos soins, vos tarifs, vos horaires et votre façon de parler.",
      },
      {
        title: "Elle répond à vos clientes",
        text: "Sur Instagram, Facebook et WhatsApp, jour et soir.",
      },
      {
        title: "Vous suivez les rendez-vous",
        text: "Vous voyez qui a réservé et quelles conversations demandent votre attention.",
      },
    ],
    faq: [
      {
        q: "Mes clientes savent-elles qu'elles parlent à une assistante ?",
        a: "Vous décidez de la présentation. L'assistante peut se présenter comme l'assistante de votre établissement.",
      },
      TRIAL_FAQ,
    ],
  },
  {
    slug: "relance-clientes",
    name: "Relance des clientes",
    short: "Un message personnalisé aux clientes que vous n'avez pas vues depuis un moment.",
    seoTitle: "Relance des clientes inactives — ClientX AI",
    seoDescription:
      "Relancez automatiquement les clientes qui ne sont pas revenues, avec un message personnalisé par SMS, email ou WhatsApp. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Les clientes qui s'éloignent",
    heroAccent: "reviennent.",
    heroText:
      "ClientX repère les clientes que vous n'avez pas vues depuis un moment et leur envoie un message personnalisé pour reprendre rendez-vous.",
    image: "/images/activites/coiffure.jpg",
    imageAlt: "Coiffeuse en train de couper des cheveux",
    imagePosition: "50% 40%",
    points: [
      {
        title: "Elle repère les clientes inactives",
        text: "Vous décidez à partir de quand une cliente est considérée comme inactive.",
      },
      {
        title: "Un message qui lui ressemble",
        text: "Le message tient compte de son prénom et de son dernier soin.",
      },
      {
        title: "SMS, email ou WhatsApp",
        text: "Chaque cliente reçoit le message par le canal qui lui convient.",
      },
      {
        title: "Un rendez-vous en un clic",
        text: "La cliente choisit un créneau directement depuis le message.",
      },
    ],
    steps: [
      { title: "Vous fixez le délai", text: "Par exemple, trois mois sans rendez-vous." },
      { title: "Le message part tout seul", text: "Personnalisé, avec une raison de revenir." },
      { title: "La cliente reprend rendez-vous", text: "Elle choisit un créneau libre." },
    ],
    faq: [
      {
        q: "Risque-t-on d'envoyer trop de messages ?",
        a: "Non. Vous choisissez la fréquence, et une cliente qui a repris rendez-vous ne reçoit plus de relance.",
      },
      TRIAL_FAQ,
    ],
  },
  {
    slug: "avis-google",
    name: "Avis Google",
    short: "Une demande d'avis envoyée après chaque passage.",
    seoTitle: "Collecter des avis Google — ClientX AI",
    seoDescription:
      "Envoyez automatiquement une demande d'avis Google après chaque passage et gagnez en visibilité près de chez vous. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Plus d'avis Google,",
    heroAccent: "sans y penser.",
    heroText:
      "Après chaque passage, la cliente reçoit une demande d'avis. Vous gagnez en visibilité près de chez vous, sans devoir le demander vous-même.",
    image: "/images/activites/laser-epilation.jpg",
    imageAlt: "Séance d'épilation laser en cabine",
    imagePosition: "50% 40%",
    points: [
      {
        title: "Une demande après chaque passage",
        text: "Le message part au bon moment, quand la cliente vient de vivre son soin.",
      },
      {
        title: "Un lien direct vers votre fiche Google",
        text: "La cliente laisse son avis en quelques secondes.",
      },
      {
        title: "Vous suivez vos avis",
        text: "Vous voyez les nouveaux avis arriver et pouvez y répondre.",
      },
    ],
    steps: [
      { title: "La cliente passe en cabine", text: "Son soin est enregistré dans votre planning." },
      {
        title: "Elle reçoit une demande d'avis",
        text: "Un message court avec un lien vers votre fiche Google.",
      },
      { title: "L'avis arrive", text: "Vous gagnez en visibilité dans les recherches locales." },
    ],
    faq: [
      {
        q: "Les avis sont-ils tous positifs ?",
        a: "Non, ce sont les avis réels de vos clientes. L'objectif est d'en recevoir davantage, pas de les choisir.",
      },
      TRIAL_FAQ,
    ],
  },
  {
    slug: "agenda-rendez-vous",
    name: "Agenda et rendez-vous",
    short: "Un planning clair, avec des rappels qui limitent les absences.",
    seoTitle: "Agenda et rendez-vous pour instituts et salons — ClientX AI",
    seoDescription:
      "Un agenda pour vos soins, avec réservation en ligne et rappels automatiques par SMS et email. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Un planning clair,",
    heroAccent: "des absences en moins.",
    heroText:
      "Vos clientes réservent en ligne ou par message. Elles reçoivent un rappel avant chaque rendez-vous et peuvent confirmer ou déplacer en un clic.",
    image: "/images/activites/spa-massage.jpg",
    imageAlt: "Massage relaxant dans un spa",
    imagePosition: "50% 40%",
    points: [
      {
        title: "Réservation en ligne",
        text: "Vos clientes choisissent un soin et un créneau libre, à toute heure.",
      },
      {
        title: "Rappels automatiques",
        text: "Un rappel par SMS ou email part avant chaque rendez-vous.",
      },
      {
        title: "Confirmer ou déplacer en un clic",
        text: "Une cliente qui ne peut pas venir libère son créneau avant qu'il soit perdu.",
      },
      {
        title: "Plusieurs lieux, plusieurs équipes",
        text: "Chaque centre ou chaque praticienne garde son propre planning.",
      },
    ],
    steps: [
      { title: "Vous créez vos soins", text: "Durée, tarif et disponibilités." },
      { title: "Vos clientes réservent", text: "En ligne ou par message avec l'assistante." },
      { title: "Les rappels partent seuls", text: "Moins d'absences, des créneaux mieux remplis." },
    ],
    faq: [
      {
        q: "Puis-je reprendre mon agenda actuel ?",
        a: "Nous vous aidons à reprendre vos soins, vos horaires et vos fiches clientes lors de la mise en place accompagnée.",
      },
      TRIAL_FAQ,
    ],
  },
  {
    slug: "paiements-forfaits",
    name: "Paiements et forfaits",
    short: "Encaissez vos soins, vos forfaits et vos cartes cadeaux en ligne.",
    seoTitle: "Paiements, forfaits et cartes cadeaux — ClientX AI",
    seoDescription:
      "Encaissez vos soins et vos forfaits en ligne, sans commission sur vos ventes. Devis et factures inclus. Essai gratuit 14 jours.",
    heroTitle: "Encaissez vos forfaits,",
    heroAccent: "sans commission.",
    heroText:
      "Vos clientes paient leurs soins et leurs forfaits en ligne. Devis, factures et signatures électroniques sont inclus, et rien n'est prélevé sur vos ventes.",
    image: "/images/activites/amincissement.jpg",
    imageAlt: "Soin d'amincissement en cabine",
    imagePosition: "50% 50%",
    points: [
      {
        title: "Paiement en ligne",
        text: "Vos clientes paient par carte ou par PayPal au moment de réserver ou de signer un forfait.",
      },
      {
        title: "Devis et factures",
        text: "Vous envoyez un devis, la cliente le signe en ligne, et la facture est générée.",
      },
      {
        title: "Zéro commission",
        text: "Un abonnement fixe. Aucun pourcentage n'est prélevé sur vos ventes.",
      },
    ],
    steps: [
      { title: "Vous créez vos forfaits", text: "Soins à l'unité, cures ou abonnements." },
      { title: "La cliente paie en ligne", text: "Par carte ou par PayPal." },
      { title: "La facture est envoyée", text: "Vous suivez vos encaissements au même endroit." },
    ],
    faq: [
      {
        q: "Quels moyens de paiement sont disponibles ?",
        a: "Le paiement par carte et par PayPal. Les frais de transaction éventuels viennent du prestataire de paiement, pas de ClientX.",
      },
      TRIAL_FAQ,
    ],
  },
  {
    slug: "fiches-clientes",
    name: "Fiches clientes",
    short: "L'historique de chaque cliente, au même endroit.",
    seoTitle: "Fiches clientes et historique — ClientX AI",
    seoDescription:
      "L'historique de chaque cliente : soins, messages, rendez-vous et avis, au même endroit. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Chaque cliente,",
    heroAccent: "son historique complet.",
    heroText:
      "Ses soins, ses messages, ses rendez-vous et ses avis sont réunis sur une seule fiche. Vous savez qui elle est avant même qu'elle entre en cabine.",
    image: "/images/activites/onglerie.jpg",
    imageAlt: "Prothésiste ongulaire pendant une pose",
    imagePosition: "50% 40%",
    points: [
      {
        title: "Une fiche par cliente",
        text: "Coordonnées, soins réalisés, préférences et notes.",
      },
      {
        title: "Tous les messages réunis",
        text: "Instagram, Facebook, WhatsApp, SMS et email sont dans le même fil.",
      },
      {
        title: "Qui revient, qui s'éloigne",
        text: "Vous voyez d'un coup d'œil les clientes fidèles et celles à relancer.",
      },
    ],
    steps: [
      {
        title: "On reprend vos clientes",
        text: "Votre liste actuelle est importée lors de la mise en place.",
      },
      { title: "La fiche se complète", text: "Chaque rendez-vous et chaque message s'y ajoutent." },
      {
        title: "Vous relancez au bon moment",
        text: "Les clientes à relancer sont faciles à repérer.",
      },
    ],
    faq: [
      {
        q: "Les données de mes clientes sont-elles protégées ?",
        a: "Oui. Vos données restent les vôtres et notre système de management est certifié ISO 9001.",
      },
      TRIAL_FAQ,
    ],
  },
];

export function getFonctionnalite(slug: string): Fonctionnalite | undefined {
  return FONCTIONNALITES.find((f) => f.slug === slug);
}
