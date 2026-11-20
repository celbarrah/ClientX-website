/**
 * Pages métiers (« Activités »). V1 : institut, laser & épilation, coiffure.
 * Les 8 métiers du menu sont publiés.
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
  { slug: "spa-massage", label: "Spa & massage", live: true },
  { slug: "laser-epilation", label: "Laser & épilation", live: true },
  { slug: "amincissement", label: "Amincissement", live: true },
  { slug: "onglerie", label: "Onglerie", live: true },
  { slug: "barbier", label: "Barbier", live: true },
  { slug: "fitness", label: "Fitness", live: true },
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
  {
    slug: "spa-massage",
    name: "Spa & massage",
    audience: "les spas et les salons de massage",
    seoTitle: "Logiciel pour spa et salon de massage — ClientX AI",
    seoDescription:
      "Une IA qui répond à vos clientes sur Instagram, Facebook et WhatsApp, remplit vos cabines et relance celles qui ne reviennent plus. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Des cabines réservées,",
    heroAccent: "des clientes apaisées.",
    heroText:
      "Pendant un soin, vous ne répondez pas. ClientX répond à vos clientes sur Instagram, Facebook et WhatsApp, remplit vos cabines et relance celles qui ne sont pas revenues. Sans commission sur vos soins.",
    image: "/images/activites/spa-massage.jpg",
    imageAlt: "Massage relaxant dans un spa",
    imagePosition: "50% 40%",
    pains: [
      {
        title: "Impossible de répondre en plein soin",
        text: "Une cliente écrit pendant un massage. Quand vous répondez, elle a déjà réservé ailleurs.",
      },
      {
        title: "Des cabines vides",
        text: "Annulations tardives, créneaux creux en semaine : chaque cabine vide est du chiffre perdu.",
      },
      {
        title: "Des premières visites sans suite",
        text: "Une cliente qui a aimé son soin ne revient pas toujours seule. Sans relance, elle passe à autre chose.",
      },
    ],
    solutions: [
      {
        title: "Une assistante qui répond pour vous",
        text: "Sur Instagram, Facebook et WhatsApp, elle présente vos soins et vos tarifs, et propose un créneau libre.",
      },
      {
        title: "Des rappels qui limitent les absences",
        text: "Chaque cliente reçoit un rappel avant son soin et peut confirmer ou déplacer en un message.",
      },
      {
        title: "Les clientes reviennent",
        text: "Un message personnalisé part aux clientes que vous n'avez pas vues depuis un moment.",
      },
      {
        title: "Zéro commission",
        text: "Vous payez un abonnement fixe. Aucun pourcentage n'est prélevé sur vos prestations.",
      },
    ],
    faq: [
      {
        q: "Pour un petit spa, est-ce adapté ?",
        a: "Oui. C'est justement quand l'équipe est en cabine que les messages restent sans réponse.",
      },
      {
        q: "L'assistante peut-elle parler de mes forfaits ?",
        a: "Oui. Vous choisissez les soins et les forfaits qu'elle présente, et ce qu'elle ne doit jamais promettre.",
      },
      {
        q: "Puis-je tester avant de m'engager ?",
        a: "Oui, l'essai gratuit dure 14 jours.",
      },
    ],
  },
  {
    slug: "amincissement",
    name: "Amincissement",
    audience: "les centres d'amincissement",
    seoTitle: "Logiciel pour centre d'amincissement — ClientX AI",
    seoDescription:
      "Des bilans offerts bien remplis et des cures suivies jusqu'au bout. L'IA répond sur Instagram, Facebook et WhatsApp. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Des bilans honorés,",
    heroAccent: "des cures suivies jusqu'au bout.",
    heroText:
      "Dans l'amincissement, tout se joue sur le premier bilan puis sur la régularité des séances. ClientX remplit vos bilans, rappelle chaque cliente et la relance entre deux séances.",
    image: "/images/activites/amincissement.jpg",
    imageAlt: "Soin d'amincissement en cabine",
    imagePosition: "50% 50%",
    pains: [
      {
        title: "Des bilans offerts non honorés",
        text: "La cliente réserve le bilan gratuit, puis oublie ou hésite. La place reste vide.",
      },
      {
        title: "Des cures abandonnées",
        text: "Quand les séances s'espacent, certaines clientes arrêtent avant la fin du forfait.",
      },
      {
        title: "Un suivi qui prend du temps",
        text: "Rappeler chaque cliente au bon moment est difficile quand vous êtes en cabine.",
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
        title: "Des avis Google sans y penser",
        text: "Après une étape clé de la cure, la cliente reçoit une demande d'avis.",
      },
      {
        title: "Zéro commission",
        text: "Vous payez un abonnement fixe. Aucun pourcentage n'est prélevé sur vos prestations.",
      },
    ],
    faq: [
      {
        q: "Comment sont gérés les forfaits de cure ?",
        a: "Nous configurons avec vous vos soins et vos forfaits, pour que les messages et les rappels correspondent à votre façon de travailler.",
      },
      {
        q: "Cela fonctionne-t-il avec plusieurs centres ?",
        a: "Oui. Chaque centre garde son planning, et les demandes peuvent être dirigées vers le plus proche.",
      },
      {
        q: "Puis-je tester avant de m'engager ?",
        a: "Oui, l'essai gratuit dure 14 jours.",
      },
    ],
  },
  {
    slug: "onglerie",
    name: "Onglerie",
    audience: "les ongleries et les prothésistes ongulaires",
    seoTitle: "Logiciel pour onglerie — ClientX AI",
    seoDescription:
      "Une IA qui répond à vos clientes sur Instagram, Facebook et WhatsApp, propose des créneaux et relance pour les remplissages. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Les mains dans les ongles,",
    heroAccent: "les messages sont traités.",
    heroText:
      "Les clientes vous écrivent sur Instagram avec leurs idées de nail art. ClientX répond, propose un créneau et rappelle chaque cliente quand c'est l'heure de reprendre rendez-vous. Sans commission.",
    image: "/images/activites/onglerie.jpg",
    imageAlt: "Prothésiste ongulaire pendant une pose",
    imagePosition: "50% 40%",
    pains: [
      {
        title: "Les messages arrivent pendant la pose",
        text: "Vous avez les mains occupées, et la cliente attend une réponse pour réserver.",
      },
      {
        title: "Un créneau annulé coûte cher",
        text: "Une pose dure longtemps : une annulation tardive laisse un trou dans la journée.",
      },
      {
        title: "Les remplissages se perdent",
        text: "Sans rappel, une cliente oublie de reprendre rendez-vous et part ailleurs.",
      },
    ],
    solutions: [
      {
        title: "Une assistante qui répond pour vous",
        text: "Elle répond aux questions sur vos prestations et vos tarifs, et propose un créneau libre.",
      },
      {
        title: "Des rappels avant chaque rendez-vous",
        text: "Chaque cliente confirme ou déplace en un message, ce qui limite les absences.",
      },
      {
        title: "Le bon message au bon moment",
        text: "Quand c'est l'heure de reprendre rendez-vous, un message personnalisé est envoyé à la cliente.",
      },
      {
        title: "Zéro commission",
        text: "Vous payez un abonnement fixe. Aucun pourcentage n'est prélevé sur vos prestations.",
      },
    ],
    faq: [
      {
        q: "Je travaille seule, est-ce adapté ?",
        a: "Oui. C'est quand on est seule que les messages restent le plus souvent sans réponse.",
      },
      {
        q: "L'assistante gère-t-elle les photos d'inspiration ?",
        a: "Vous reprenez la conversation quand vous le souhaitez, par exemple pour valider un modèle.",
      },
      {
        q: "Puis-je tester avant de m'engager ?",
        a: "Oui, l'essai gratuit dure 14 jours.",
      },
    ],
  },
  {
    slug: "barbier",
    name: "Barbier",
    audience: "les barbiers",
    seoTitle: "Logiciel pour barbier — ClientX AI",
    seoDescription:
      "Une IA qui répond à vos clients sur Instagram, Facebook et WhatsApp, remplit votre planning et relance ceux qui espacent leurs visites. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Un fauteuil toujours occupé,",
    heroAccent: "sans pause pour répondre.",
    heroText:
      "Quand vous avez le rasoir à la main, vous ne répondez pas aux messages. ClientX répond à vos clients sur Instagram, Facebook et WhatsApp, propose un créneau et relance ceux qui espacent leurs visites.",
    image: "/images/activites/barbier.jpg",
    imageAlt: "Barbier avec dégradé et barbe",
    imagePosition: "50% 40%",
    pains: [
      {
        title: "Pas le temps de répondre",
        text: "Les demandes arrivent toute la journée, et vous ne pouvez pas lâcher le rasoir.",
      },
      {
        title: "Les rendez-vous non honorés",
        text: "Un client qui ne vient pas, c'est un créneau perdu pour tout le monde.",
      },
      {
        title: "Les habitués s'espacent",
        text: "Une coupe toutes les trois semaines devient une coupe toutes les six, sans que vous le voyiez.",
      },
    ],
    solutions: [
      {
        title: "Les messages ont une réponse",
        text: "L'assistante répond sur Instagram, Facebook et WhatsApp et propose un créneau libre.",
      },
      {
        title: "Des rappels qui réduisent les absences",
        text: "Chaque client reçoit un rappel et peut confirmer ou déplacer en un message.",
      },
      {
        title: "Les habitués reviennent",
        text: "Un message personnalisé part à ceux qui n'ont pas pris rendez-vous depuis un moment.",
      },
      {
        title: "Zéro commission",
        text: "Vous payez un abonnement fixe. Aucun pourcentage n'est prélevé sur vos prestations.",
      },
    ],
    faq: [
      {
        q: "Mes clients savent-ils qu'ils parlent à une assistante ?",
        a: "Vous décidez de la présentation. L'assistante peut se présenter comme l'assistante de votre salon.",
      },
      {
        q: "Je suis seul dans mon salon, est-ce adapté ?",
        a: "Oui, c'est même le cas où il est le plus utile de ne pas manquer un message.",
      },
      {
        q: "Puis-je tester avant de m'engager ?",
        a: "Oui, l'essai gratuit dure 14 jours.",
      },
    ],
  },
  {
    slug: "fitness",
    name: "Fitness",
    audience: "les salles de sport et les studios",
    seoTitle: "Logiciel pour salle de sport et studio — ClientX AI",
    seoDescription:
      "Des séances d'essai bien remplies, des inscriptions et des adhérents relancés. L'IA répond sur Instagram, Facebook et WhatsApp. Zéro commission. Essai gratuit 14 jours.",
    heroTitle: "Des séances d'essai remplies,",
    heroAccent: "des adhérents qui restent.",
    heroText:
      "ClientX répond aux prospects sur Instagram, Facebook et WhatsApp, réserve les séances d'essai, rappelle la veille et relance les adhérents qui ne viennent plus. Sans commission.",
    image: "/images/activites/fitness.jpg",
    imageAlt: "Coach sportive accompagnant une cliente",
    imagePosition: "50% 35%",
    pains: [
      {
        title: "Des séances d'essai sans suite",
        text: "Un prospect réserve, puis ne vient pas. Le créneau est perdu et le contact aussi.",
      },
      {
        title: "Des visiteurs qui ne s'inscrivent pas",
        text: "Sans relance après la séance d'essai, beaucoup d'entre eux ne donnent plus de nouvelles.",
      },
      {
        title: "Des adhérents qui disparaissent",
        text: "Quand un adhérent vient moins souvent, vous le voyez trop tard.",
      },
    ],
    solutions: [
      {
        title: "Les séances d'essai se remplissent",
        text: "L'assistante répond aux prospects, réserve la séance d'essai et envoie un rappel la veille.",
      },
      {
        title: "Chaque visite est relancée",
        text: "Après la séance d'essai, un message propose de s'inscrire.",
      },
      {
        title: "Les adhérents inactifs reviennent",
        text: "Un message personnalisé part à ceux que vous n'avez pas vus depuis un moment.",
      },
      {
        title: "Zéro commission",
        text: "Vous payez un abonnement fixe. Aucun pourcentage n'est prélevé sur vos prestations.",
      },
    ],
    faq: [
      {
        q: "Cela fonctionne-t-il pour un studio de coaching ?",
        a: "Oui. Nous configurons vos séances, vos horaires et vos offres d'essai avec vous.",
      },
      {
        q: "L'assistante peut-elle demander des avis Google ?",
        a: "Oui. Après une séance ou une étape, une demande d'avis peut être envoyée.",
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
