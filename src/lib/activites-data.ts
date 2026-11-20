/**
 * Pages métiers (« Activités »). V1 : institut, laser & épilation, coiffure.
 * Les 5 autres métiers du menu (spa & massage, amincissement, onglerie, barbier, fitness)
 * sont listés dans ACTIVITES_MENU mais pas encore publiés.
 *
 * Vocabulaire : parler le langage des professionnelles (clientes, soins, cabine, planning),
 * pas celui de l'informatique (pas de funnel, pipeline, workflow, « +20 outils »).
 */

export interface ActiviteMenuItem {
  slug: string;
  label: string;
  /** false = page pas encore publiée : affichée « Bientôt » dans le menu, non cliquable. */
  live: boolean;
}

export const ACTIVITES_MENU: ActiviteMenuItem[] = [
  { slug: "coiffure", label: "Coiffure", live: true },
  { slug: "institut", label: "Institut de beauté", live: true },
  { slug: "spa-massage", label: "Spa & massage", live: false },
  { slug: "laser-epilation", label: "Laser & épilation", live: true },
  { slug: "amincissement", label: "Amincissement", live: false },
  { slug: "onglerie", label: "Onglerie", live: false },
  { slug: "barbier", label: "Barbier", live: false },
  { slug: "fitness", label: "Fitness", live: false },
];

export interface ActiviteBlock {
  title: string;
  text: string;
}

export interface Activite {
  slug: string;
  /** « Institut de beauté » */
  name: string;
  /** « les instituts de beauté » — utilisé dans « Pour … » */
  audience: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroAccent: string;
  heroText: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  pains: ActiviteBlock[];
  solutions: ActiviteBlock[];
  /** Preuve chiffrée réelle (clients ClientX). Absente tant qu'aucun chiffre n'est validé. */
  proof?: {
    client: string;
    intro: string;
    stats: { value: string; label: string; note?: string }[];
  };
  faq: { q: string; a: string }[];
}

export const ACTIVITES: Activite[] = [
  {
    slug: "institut",
    name: "Institut de beauté",
    audience: "les instituts de beauté",
    seoTitle: "Logiciel pour institut de beauté — ClientX AI",
    seoDescription:
      "Une IA qui répond à vos clientes sur Instagram, Facebook et WhatsApp, relance celles qui ne reviennent plus et collecte les avis Google. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Votre institut est plein,",
    heroAccent: "même quand vous êtes en cabine.",
    heroText:
      "ClientX répond à vos clientes sur Instagram, Facebook et WhatsApp, remplit votre planning, relance celles qui ne sont pas revenues et vous apporte des avis Google. Sans commission sur vos soins.",
    image: "/images/activites/institut.jpg",
    imageAlt: "Soin du visage en institut de beauté",
    imagePosition: "50% 35%",
    pains: [
      {
        title: "Les messages restent sans réponse",
        text: "Une cliente écrit sur Instagram pendant un soin. Quand vous répondez, elle a déjà réservé ailleurs.",
      },
      {
        title: "Les habituées disparaissent",
        text: "Sans relance, une cliente qui n'est pas revenue depuis trois mois ne reviendra souvent jamais.",
      },
      {
        title: "Les créneaux vides coûtent cher",
        text: "Annulations de dernière minute, trous dans le planning : chaque cabine vide, c'est du chiffre perdu.",
      },
    ],
    solutions: [
      {
        title: "Une assistante qui répond pour vous",
        text: "Sur Instagram, Facebook et WhatsApp, elle répond aux questions sur vos soins et vos tarifs, et propose un créneau libre dans votre agenda.",
      },
      {
        title: "Les clientes inactives reviennent",
        text: "Un message personnalisé part automatiquement aux clientes que vous n'avez pas vues depuis un moment, avec une raison de revenir.",
      },
      {
        title: "Des avis Google sans y penser",
        text: "Après chaque soin, la cliente reçoit une demande d'avis. Plus d'avis, plus de visibilité près de chez vous.",
      },
      {
        title: "Zéro commission",
        text: "Vos clientes sont les vôtres. Vous payez un abonnement fixe, jamais un pourcentage sur vos soins.",
      },
    ],
    faq: [
      {
        q: "Est-ce que je remplace mon logiciel de réservation ?",
        a: "ClientX fait ce que les plateformes de réservation ne font pas : répondre à vos clientes sur les réseaux, les relancer et collecter des avis. Nous vous accompagnons pour la reprise de votre agenda et de vos fiches clientes.",
      },
      {
        q: "L'assistante parle-t-elle comme moi ?",
        a: "Oui. Vous choisissez le ton, les soins et les tarifs qu'elle présente, et ce qu'elle ne doit jamais promettre. Vous gardez la main à tout moment.",
      },
      {
        q: "Puis-je tester avant de m'engager ?",
        a: "Oui, l'essai gratuit dure 14 jours.",
      },
    ],
  },
  {
    slug: "laser-epilation",
    name: "Laser & épilation",
    audience: "les centres de laser et d'épilation",
    seoTitle: "Logiciel pour centre d'épilation laser — ClientX AI",
    seoDescription:
      "Des bilans offerts bien remplis, des cures signées et des séances suivies jusqu'au bout. L'IA répond sur Instagram, Facebook et WhatsApp. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Des bilans honorés,",
    heroAccent: "des cures menées jusqu'au bout.",
    heroText:
      "Dans l'épilation définitive, tout se joue sur le bilan offert puis sur le suivi des séances. ClientX remplit vos bilans, rappelle chaque cliente et la relance entre deux séances.",
    image: "/images/activites/laser-epilation.jpg",
    imageAlt: "Séance d'épilation laser en cabine",
    imagePosition: "50% 40%",
    pains: [
      {
        title: "Des bilans offerts non honorés",
        text: "La cliente réserve le bilan gratuit, puis oublie ou hésite. La place reste vide.",
      },
      {
        title: "Des cures abandonnées en route",
        text: "Les séances sont espacées de plusieurs semaines. Sans rappel, certaines clientes arrêtent avant la fin du forfait.",
      },
      {
        title: "Plusieurs centres, une seule logique",
        text: "Chaque demande doit arriver au centre le plus proche de la cliente, sans que votre équipe fasse le tri à la main.",
      },
    ],
    solutions: [
      {
        title: "Des bilans remplis et confirmés",
        text: "L'assistante répond sur Instagram, Facebook et WhatsApp, réserve le bilan et envoie un rappel la veille.",
      },
      {
        title: "Chaque séance rappelée",
        text: "Rappel avant chaque séance et message de suivi entre deux séances pour que la cure aille jusqu'au bout.",
      },
      {
        title: "La cliente va au bon centre",
        text: "La demande est dirigée vers le centre le plus proche de chez elle, avec ses disponibilités.",
      },
      {
        title: "Zéro commission",
        text: "Vous payez un abonnement fixe. Aucun pourcentage n'est prélevé sur vos forfaits.",
      },
    ],
    proof: {
      client: "Epiltech",
      intro:
        "Epiltech utilise ClientX sur ses 11 centres de beauté spécialisés dans l'épilation définitive, les soins du visage et l'amincissement.",
      stats: [
        { value: "88,2 %", label: "de présence aux bilans" },
        { value: "+52 %", label: "de forfaits cure signés" },
        {
          value: "1 879",
          label: "avis Google",
          note: "Note de 4,45/5, dont 87 % d'avis positifs",
        },
        { value: "11", label: "centres équipés" },
      ],
    },
    faq: [
      {
        q: "Cela fonctionne-t-il avec plusieurs centres ?",
        a: "Oui. Les demandes sont dirigées vers le centre le plus proche de la cliente, et chaque centre garde son propre planning.",
      },
      {
        q: "Qui s'occupe de la mise en place ?",
        a: "Nous. La mise en place est accompagnée : vos soins, vos tarifs, vos centres et vos messages sont configurés avec vous.",
      },
      {
        q: "Puis-je tester avant de m'engager ?",
        a: "Oui, l'essai gratuit dure 14 jours.",
      },
    ],
  },
  {
    slug: "coiffure",
    name: "Coiffure",
    audience: "les salons de coiffure",
    seoTitle: "Logiciel pour salon de coiffure — ClientX AI",
    seoDescription:
      "Une IA qui répond à vos clientes sur Instagram, Facebook et WhatsApp, remplit votre planning et relance celles qui ne sont pas revenues. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Gardez les mains dans les cheveux,",
    heroAccent: "on s'occupe des messages.",
    heroText:
      "ClientX répond à vos clientes sur Instagram, Facebook et WhatsApp, propose des créneaux, relance celles qui reviennent moins et collecte les avis Google. Sans commission sur vos prestations.",
    image: "/images/activites/coiffure.jpg",
    imageAlt: "Coiffeuse en train de couper des cheveux",
    imagePosition: "50% 40%",
    pains: [
      {
        title: "Impossible de répondre pendant une coupe",
        text: "Les demandes de rendez-vous arrivent toute la journée, et vous ne pouvez pas lâcher les ciseaux.",
      },
      {
        title: "Les rendez-vous non honorés",
        text: "Un créneau annulé au dernier moment, c'est une heure de travail perdue.",
      },
      {
        title: "Les clientes s'espacent",
        text: "Une couleur tous les deux mois devient une couleur tous les quatre mois, sans que vous le voyiez.",
      },
    ],
    solutions: [
      {
        title: "Les messages ont une réponse",
        text: "L'assistante répond sur Instagram, Facebook et WhatsApp, présente vos prestations et propose un créneau libre.",
      },
      {
        title: "Des rappels qui réduisent les absences",
        text: "Chaque cliente reçoit un rappel avant son rendez-vous et peut confirmer ou déplacer en un message.",
      },
      {
        title: "Le bon message au bon moment",
        text: "Quand une cliente n'est pas revenue au rythme habituel, un message personnalisé lui propose de reprendre rendez-vous.",
      },
      {
        title: "Zéro commission",
        text: "Vous payez un abonnement fixe, sans pourcentage sur chaque prestation.",
      },
    ],
    faq: [
      {
        q: "Je suis seule dans mon salon, est-ce adapté ?",
        a: "Oui. C'est justement quand on est seule qu'il est le plus difficile de répondre aux messages pendant les prestations.",
      },
      {
        q: "Mes clientes savent-elles qu'elles parlent à une assistante ?",
        a: "Vous décidez de la présentation. L'assistante peut se présenter comme l'assistante de votre salon, et vous reprenez la conversation quand vous le souhaitez.",
      },
      {
        q: "Puis-je tester avant de m'engager ?",
        a: "Oui, l'essai gratuit dure 14 jours.",
      },
    ],
  },
];

export function getActivite(slug: string): Activite | undefined {
  return ACTIVITES.find((a) => a.slug === slug);
}
