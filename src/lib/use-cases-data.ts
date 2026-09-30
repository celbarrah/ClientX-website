import {
  Buildings,
  Lightning,
  Target,
  ShoppingBagOpen,
  Sun,
  HouseLine,
  ForkKnife,
  Heartbeat,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

export type IconType = ComponentType<{ className?: string; weight?: "regular" | "bold" | "fill" }>;

export interface UseCaseDetail {
  initials: string;
  name: string;
  sub: string;
  status: string;
  summary: string;
  context: string;
  defis: string[];
  results: { label: string; val: string; pct?: string }[];
}

export interface SectorData {
  id: string;
  title: string;
  desc: string;
  icon: IconType;
  badge: string;
  challenges: string[];
  solution: string;
  metrics: { label: string; value: string }[];
  results: string;
  useCases: UseCaseDetail[];
}

export const SECTORS_DATA: SectorData[] = [
  {
    id: "banque",
    title: "Assurance et banque",
    desc: "Courtiers, banques, mutuelles et institutions financières",
    icon: Buildings,
    badge: "Secteur Réglementé",
    challenges: [
      "Capture et conformité stricte des données prospects (RGPD & ISO 9001)",
      "Multi-canaux de contact sans historique unifié des échanges",
      "Processus de souscription longs et abandons fréquents au formulaire",
    ],
    solution:
      "CRM hautement sécurisé avec formulaires intelligents conditionnels, calcul automatique de scoring d'emprunt ou de devis d'assurance, relances automatiques par SMS/WhatsApp certifiées et suivi de conformité.",
    metrics: [
      { label: "Taux de signature", value: "+42%" },
      { label: "Délai de traitement", value: "-65%" },
      { label: "Conformité ISO 9001", value: "100%" },
    ],
    results:
      "+42% de conversion de simulation à signature, 0 perte de données, conformité ISO 9001 garantie.",
    useCases: [
      {
        initials: "SF",
        name: "Sofac",
        sub: "Crédit & Microcrédit",
        status: "Actif",
        summary:
          "Sofac est un établissement spécialisé dans le crédit et le microcrédit, accompagnant les particuliers et professionnels dans le financement de leurs projets.",
        context:
          "Accélération de l'instruction des dossiers de crédit et de microcrédit, automatisation des pièces justificatives et conformité bancaire stricte.",
        defis: [
          "Délai d'attente pour obtenir les pièces justificatives des emprunteurs",
          "Abandon des prospects en cours de demande de simulation de crédit",
          "Conformité réglementaire bancaire et traçabilité intégrale des échanges",
        ],
        results: [
          { label: "Dossiers de crédit finalisés", val: "+54%" },
          { label: "Délai moyen d'accord", val: "48h" },
          { label: "Gain temps conseiller", val: "3.5h / jour" },
        ],
      },
      {
        initials: "RM",
        name: "RMA",
        sub: "Assurance",
        status: "Actif",
        summary:
          "RMA est un assureur multi-branches proposant des produits d'assurance auto, habitation, santé et prévoyance pour les particuliers et entreprises.",
        context:
          "Optimisation des taux de transformation des devis d'assurance et simplification des souscriptions avec signatures électroniques conformes.",
        defis: [
          "Multi-canaux de contact sans historique unifié des échanges prospects",
          "Faible conversion des devis envoyés par email sans relance intelligente",
          "Résiliations annuelles sans alerte préventive",
        ],
        results: [
          { label: "Taux de signature", val: "+42%" },
          { label: "Délai de traitement", val: "-65%" },
          { label: "Conformité ISO 9001", val: "100%" },
        ],
      },
      {
        initials: "AM",
        name: "Atlas Montana",
        sub: "Courtage d'assurance",
        status: "Actif",
        summary: "Courtier en assurance multi-risques spécialisé auto, habitation et prévoyance.",
        context:
          "Automatisation du parcours client de la simulation en ligne jusqu'à l'émission de la police d'assurance avec suivi omnicanal.",
        defis: [
          "Relances devis chronophages pour les courtiers",
          "Gestion manuelle des pièces et justificatifs contractuels",
          "Processus de souscription avec trop de points de friction",
        ],
        results: [
          { label: "Signature devis", val: "+38%" },
          { label: "Rétention annuelle", val: "96.2%" },
          { label: "Zéro papier", val: "100%" },
        ],
      },
    ],
  },
  {
    id: "auto",
    title: "Automobile",
    desc: "Concessionnaires, réseaux de distribution, réparateurs et services automobiles",
    icon: Lightning,
    badge: "Distribution & Service",
    challenges: [
      "Gestion dispersée des demandes d'essai et révisions après-vente",
      "No-show important aux rendez-vous atelier et d'essai en concession",
      "Manque de réactivation des parcs clients pour renouvellement véhicule",
    ],
    solution:
      "Calendrier de réservation d'essai de véhicule connecté directement au CRM, notifications instantanées par SMS de rappel et workflows automatisés de suivi après-vente (révisions, contrôle technique).",
    metrics: [
      { label: "Réduction des No-Shows", value: "-58%" },
      { label: "Essais transformés", value: "+35%" },
      { label: "Temps d'attribution lead", value: "< 2 min" },
    ],
    results: "Taux de présence aux essais augmenté à 91%, cycle de vente réduit de 14 jours.",
    useCases: [
      {
        initials: "FD",
        name: "Ford",
        sub: "Automobile & Concessions",
        status: "Actif",
        summary:
          "Ford est un constructeur automobile dont le réseau de concessions commercialise une gamme de véhicules neufs, du citadin au SUV.",
        context:
          "Le réseau de concessions Ford devait optimiser le flux de demandes d'essais entrants depuis les campagnes digitales et maximiser le taux de présence en concession.",
        defis: [
          "Relancer instantanément chaque demande d'essai issue des campagnes web",
          "Sécuriser la présence effective le jour de l'essai en concession",
          "Transmettre les opportunités chaudes aux commerciaux de chaque site",
          "Assurer le suivi après-vente et la fidélisation atelier",
        ],
        results: [
          { label: "RDV essais réservés", val: "2 140" },
          { label: "Taux de présence", val: "89.4%" },
          { label: "Ventes générées", val: "+28%" },
        ],
      },
      {
        initials: "OP",
        name: "Opel",
        sub: "Automobile & Concessions",
        status: "Actif",
        summary:
          "Opel est un constructeur automobile dont le réseau de concessions commercialise une gamme de véhicules neufs, du citadin au SUV.",
        context:
          "Gestion unifiée des stocks de véhicules neufs et d'occasion avec réservation directe de créneaux en concession et estimation de reprise immédiate.",
        defis: [
          "Traitement hétérogène des leads sur plusieurs points de vente",
          "Délais de rappel trop longs (plusieurs heures)",
          "Manque de visibilité sur le closing commercial en concession",
        ],
        results: [
          { label: "Prise en charge lead", val: "< 90 sec" },
          { label: "Taux de transformation", val: "+34%" },
          { label: "Avis Google 5 étoiles", val: "+420" },
        ],
      },
    ],
  },
  {
    id: "ecole",
    title: "École et formation",
    desc: "Centres de formation, universités privées, bootcamps et organismes certifiés",
    icon: Target,
    badge: "Éducation & EdTech",
    challenges: [
      "Gestion lourde des inscriptions, devis et conventions de formation",
      "Décrochage des apprenants faute de suivi pédagogique automatisé",
      "Facturation et certification manuelles chronophages",
    ],
    solution:
      "Espaces de formation intégrés, délivrance automatique d'attestations, relances intelligentes lors de pauses d'apprentissage et tunnels de capture pour journées portes ouvertes.",
    metrics: [
      { label: "Taux de complétion", value: "+74%" },
      { label: "Inscriptions en ligne", value: "x2.3" },
      { label: "Heures admin sauvées / mois", value: "85h" },
    ],
    results:
      "Triplement des candidatures qualifiées et 85h de travail administratif économisées chaque mois.",
    useCases: [
      {
        initials: "EF",
        name: "EduFormat Pro",
        sub: "Organisme de formation certifié Qualiopi",
        status: "Actif",
        summary:
          "Centre de formation professionnelle : automatisation des inscriptions, conventions, émargements et délivrance d'attestations.",
        context:
          "Gestion de plus de 1 200 stagiaires par an nécessitant une conformité Qualiopi irréprochable et un gain de temps administratif massif.",
        defis: [
          "Paperasse administrative et signature des conventions chronophages",
          "Taux d'abandon entre la demande initiale et le dépôt du dossier de financement",
          "Suivi pédagogique personnalisé complexe à grande échelle",
        ],
        results: [
          { label: "Dossiers financés", val: "+62%" },
          { label: "Temps admin sauvé", val: "120h / mois" },
          { label: "Taux de satisfaction", val: "98.4%" },
        ],
      },
      {
        initials: "BT",
        name: "Bootcamp Tech Academy",
        sub: "Bootcamps intensifs Développeur & Data",
        status: "Actif",
        summary:
          "École tech en ligne et présentiel : tunnels de candidature, tests techniques automatisés et intégration directe des promotions.",
        context:
          "Triplement des candidatures pour les sessions de rentrée avec gestion complète de la sélection et du paiement échelonné sans frais.",
        defis: [
          "Filtrage manuel de plus de 3 000 candidatures annuelles",
          "Gestion des entretiens de sélection et confirmations d'inscriptions",
          "Gestion des paiements en plusieurs fois et suivi des impayés",
        ],
        results: [
          { label: "Candidatures traitées", val: "x3" },
          { label: "Taux de remplissage promo", val: "100%" },
          { label: "Impayés", val: "0.2%" },
        ],
      },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce & DNVB",
    desc: "Marques direct-to-consumer, boutiques en ligne et grossistes B2B",
    icon: ShoppingBagOpen,
    badge: "Digital Commerce",
    challenges: [
      "Paniers abandonnés élevés et dépendance coûteuse aux régies publicitaires",
      "Service client submergé par les questions récurrentes de suivi de colis",
      "Difficulté à réengager les clients après le premier achat",
    ],
    solution:
      "Tunnels d'upsell en 1-clic, relances omnicanales de paniers par SMS/WhatsApp ultra-réactives, et flux de fidélisation prédictifs basés sur la récurrence de commande.",
    metrics: [
      { label: "Paniers récupérés", value: "+28%" },
      { label: "Panier moyen (AOV)", value: "+31%" },
      { label: "Tickets SAV résolus", value: "-45%" },
    ],
    results:
      "+31% de panier moyen grâce aux upsells en 1-clic et récupération automatique de 28% des paniers.",
    useCases: [
      {
        initials: "NV",
        name: "NovaVibe Cosmétiques",
        sub: "DNVB Skincare & Beauté bio",
        status: "Actif",
        summary:
          "Boutique en ligne DNVB générant plus de 15 000 commandes/mois : récupération paniers par SMS et tunnels de cross-sell post-achat.",
        context:
          "Rentabiliser le trafic Meta et TikTok Ads en maximisant la LifeTime Value et en réduisant le taux d'abandon au checkout.",
        defis: [
          "Taux d'abandon de panier élevé sur mobile",
          "Service client saturé par les questions récurrentes",
          "Coût publicitaire en forte augmentation",
        ],
        results: [
          { label: "Paniers récupérés", val: "+28.4%" },
          { label: "Panier moyen (AOV)", val: "+31%" },
          { label: "Réponses automatiques", val: "88%" },
        ],
      },
      {
        initials: "PB",
        name: "ProSupply B2B",
        sub: "Grossiste équipement & fournitures pro",
        status: "Actif",
        summary:
          "Grossiste B2B pour artisans et PME : réapprovisionnements en 1-clic par WhatsApp et gestion unifiée des devis grands comptes.",
        context:
          "Digitalisation des prises de commandes récurrentes de ses 800 clients professionnels avec facturation automatisée.",
        defis: [
          "Prise de commandes par email et téléphone source d'erreurs",
          "Facturation manuelle et relance des retards de paiement",
          "Manque de proactivité sur les cycles de réapprovisionnement",
        ],
        results: [
          { label: "Commandes automatisées", val: "72%" },
          { label: "Délai moyen paiement", val: "-18 jours" },
          { label: "Chiffre d'affaires", val: "+45%" },
        ],
      },
    ],
  },
  {
    id: "energie",
    title: "Énergie & Traitement d'eau",
    desc: "Installateurs solaires, pompes à chaleur, purification et rénovation énergétique",
    icon: Sun,
    badge: "Transition Écologique",
    challenges: [
      "Coût d'acquisition du lead solaire ou PAC très élevé",
      "Nécessité de qualifier techniquement l'éligibilité avant d'envoyer un commercial",
      "Relances devis négligées par les équipes sur le terrain",
    ],
    solution:
      "Simulateurs d'économies d'énergie en ligne qualifiant surface et toiture, planification directe des visites techniques géolocalisées et relance devis multicanale automatique.",
    metrics: [
      { label: "Coût d'acquisition client", value: "-37%" },
      { label: "RDV qualifiés posés", value: "+88%" },
      { label: "Signature devis", value: "+24%" },
    ],
    results:
      "Division par 2 du temps de qualification lead et augmentation de 24% des signatures de devis.",
    useCases: [
      {
        initials: "SE",
        name: "Soleil Energie Habitat",
        sub: "Installateur Photovoltaïque & PAC",
        status: "Actif",
        summary:
          "Entreprise RGE régionale : simulateur d'autoconsommation solaire et prise de RDV technique directement dans l'agenda des techniciens.",
        context:
          "Réduire le gaspillage de temps des techniciens sur des toitures non éligibles et booster le taux de conversion lors des visites au domicile.",
        defis: [
          "Taux de no-show et annulations aux visites techniques",
          "Devis complexes longs à émettre après la visite",
          "Manque de relance des devis en attente de subventions",
        ],
        results: [
          { label: "RDV techniques honorés", val: "93%" },
          { label: "Délai remise de devis", val: "< 15 min" },
          { label: "Signature devis", val: "+26%" },
        ],
      },
      {
        initials: "PW",
        name: "PureWater Solutions",
        sub: "Filtration d'eau & Adoucisseurs",
        status: "Actif",
        summary:
          "Spécialiste de la filtration et de la purification d'eau pour particuliers : test de dureté offert et calendrier de pose instantané.",
        context:
          "Acquisition multicanale avec qualification automatisée et relances régulières pour le changement annuel des filtres.",
        defis: [
          "Centralisation des leads foires et réseaux sociaux",
          "Réactivation de la base installée pour les consommables",
          "Gestion des plannings d'intervention sur 4 départements",
        ],
        results: [
          { label: "Réabonnements filtres", val: "+82%" },
          { label: "No-show installateurs", val: "-60%" },
          { label: "Croissance annuelle", val: "+41%" },
        ],
      },
    ],
  },
  {
    id: "immobilier",
    title: "Immobilier & Promotion",
    desc: "Agences immobilières, promoteurs neufs et gestionnaires locatifs",
    icon: HouseLine,
    badge: "PropTech & Real Estate",
    challenges: [
      "Perte de mandats face aux concurrents par manque de réactivité",
      "Gestion manuelle fastidieuse des plannings de visites",
      "Suivi des acquéreurs complexe sur plusieurs programmes",
    ],
    solution:
      "Visites virtuelles avec réservation directe dans le calendrier de l'agent, segmentation acheteurs/vendeurs automatisée et signature électronique intégrée.",
    metrics: [
      { label: "Délai de premier contact", value: "< 5 min" },
      { label: "Mandats exclusifs gagnés", value: "+33%" },
      { label: "Taux de visites honorées", value: "94%" },
    ],
    results:
      "94% de visites honorées et 33% de mandats exclusifs en plus dès le premier trimestre.",
    useCases: [
      {
        initials: "CO",
        name: "Coralia Immobilier",
        sub: "Promotion immobilière",
        status: "Actif",
        summary:
          "Promoteur immobilier déployant plusieurs programmes, du logement social au haut standing.",
        context:
          "Commercialisation de résidences neuves avec capture des investisseurs Pinel/LMNP et primo-accédants via des landing pages par programme.",
        defis: [
          "Gestion des prospects dispersée entre plusieurs bureaux de vente",
          "Relance des acquéreurs potentiels lors de chaque tranche de travaux",
          "Conformité des dossiers de réservation et signatures VEFA",
        ],
        results: [
          { label: "Lots réservés en ligne", val: "142" },
          { label: "Délai signature contrat", val: "3 jours" },
          { label: "Coût acquisition lead", val: "-35%" },
        ],
      },
      {
        initials: "KL",
        name: "KLK",
        sub: "Promotion immobilière",
        status: "Actif",
        summary:
          "Promoteur immobilier déployant plusieurs programmes, du logement social au haut standing.",
        context:
          "Accélération du cycle de vente de programmes neufs avec visite virtuelle 3D connectée au planning des conseillers commerciaux.",
        defis: [
          "Délais de qualification des investisseurs trop longs",
          "Absence de suivi automatique des contacts non retenus au premier lot",
          "Multiplication des canaux d'appels entrants sans CRM central",
        ],
        results: [
          { label: "Attribution prospects", val: "Instantanée" },
          { label: "Taux closing lots", val: "+29%" },
          { label: "Recommandations", val: "+45%" },
        ],
      },
    ],
  },
  {
    id: "restauration",
    title: "Restauration & Hôtellerie",
    desc: "Restaurants, traiteurs, chaînes de restauration et lieux événementiels",
    icon: ForkKnife,
    badge: "Food & Hospitality",
    challenges: [
      "Commissions exorbitantes des plateformes tierces de réservation et commande",
      "No-shows du week-end coûteux pour le taux de remplissage",
      "Absence de fichier client direct exploitable pour les événements creux",
    ],
    solution:
      "Module de réservation en direct sans commissions, confirmations instantanées par WhatsApp avec demande de confirmation, et campagnes SMS ciblées pour les soirées à faible affluence.",
    metrics: [
      { label: "Commissions économisées", value: "-80%" },
      { label: "No-shows aux services", value: "-62%" },
      { label: "Revenez-vous fidélité", value: "+45%" },
    ],
    results:
      "Plus de 80% d'économies sur les commissions tierces et taux de no-show réduit de 62%.",
    useCases: [
      {
        initials: "LB",
        name: "Le Bistrot Gourmand",
        sub: "Brasserie & Cuisine du terroir (120 couverts)",
        status: "Actif",
        summary:
          "Brasserie réputée : réservation de table en direct sans commission, empreinte bancaire anti-no-show et relances SMS pour les soirs calmes.",
        context:
          "Reprendre le contrôle de son fichier client face aux plateformes tierces qui ponctionnaient des commissions élevées chaque mois.",
        defis: [
          "Commissions tierces sur chaque couvert réservé",
          "15% à 20% de tables non honorées les vendredis et samedis soirs",
          "Difficulté à remplir la salle les soirs calmes",
        ],
        results: [
          { label: "Commissions sauvées / an", val: "28 000 €" },
          { label: "Taux de no-show", val: "< 2%" },
          { label: "Remplissage soirs calmes", val: "+55%" },
        ],
      },
      {
        initials: "TE",
        name: "Traiteur Événementiel Saveurs",
        sub: "Traiteur mariages, séminaires & réceptions",
        status: "Actif",
        summary:
          "Traiteur haut de gamme : devis personnalisé en ligne, dégustations programmées au calendrier et facturation avec acomptes échelonnés.",
        context:
          "Gestion d'une centaine de réceptions par an avec centralisation des choix de menus et des acomptes.",
        defis: [
          "Temps passé à élaborer des devis sur mesure sans suite",
          "Suivi complexe des dates d'options et des versements d'acomptes",
          "Coordination des dégustations préparatoires",
        ],
        results: [
          { label: "Devis convertis en contrats", val: "+44%" },
          { label: "Acomptes perçus à temps", val: "99.5%" },
          { label: "Heures admin sauvées", val: "40h / mois" },
        ],
      },
    ],
  },
  {
    id: "fitness",
    title: "Fitness beauté et bien-être",
    desc: "Salles de sport, clubs de golf, centres de beauté, épilation définitive, soins et coaching personnel",
    icon: Heartbeat,
    badge: "Santé, Beauté & Bien-être",
    challenges: [
      "Désabonnements silencieux après les 3 premiers mois",
      "Gestion complexe des abonnements récurrents et des réservations de soins / cours",
      "Processus d'essai gratuit ou première séance mal converti en forfait régulier",
    ],
    solution:
      "Abonnements avec prélèvements récurrents automatisés, système de réservation de créneaux avec quotas et calendrier direct, et messages personnalisés envoyés automatiquement.",
    metrics: [
      { label: "Rétention annuelle", value: "+39%" },
      { label: "Conversion séance d'essai", value: "+48%" },
      { label: "Paiements récurrents sans impayé", value: "98.5%" },
    ],
    results:
      "+39% de fidélisation annuelle et 48% de conversion d'un cours d'essai vers un pass annuel.",
    useCases: [
      {
        initials: "MF",
        name: "Morfit",
        sub: "Fitness & Cours d'essai",
        status: "Actif",
        summary:
          "Salle de sport orientée conversion : remplir les créneaux de cours d'essai et transformer chaque présence en inscription.",
        context:
          "Morfit devait remplir ses créneaux de cours d'essai en continu et convertir chaque venue en adhésion, sans surcharger les équipes en salle ni gérer la réputation en ligne manuellement.",
        defis: [
          "Relancer chaque prospect jusqu'à la prise de rendez-vous",
          "Sécuriser la présence réelle au cours d'essai (rappels J-1)",
          "Convertir chaque venue en adhésion sans relance manuelle des coachs",
          "Entretenir la e-réputation Google après chaque passage",
        ],
        results: [
          { label: "Leads générés", val: "3 749" },
          { label: "RDV cours d'essai pris", val: "2 800", pct: "74.7%" },
          { label: "Inscrits signés", val: "1 878", pct: "67.1%" },
          { label: "Chiffre d'affaires généré", val: "+1 000 000 €" },
        ],
      },
      {
        initials: "EP",
        name: "Epiltech",
        sub: "Beauté · Épilation définitive & Soins",
        status: "Actif",
        summary:
          "Epiltech exploite un réseau de 12 centres de beauté spécialisés dans l'épilation définitive, les soins du visage et l'amincissement.",
        context:
          "Remplir les bilans offerts sur les 12 centres du réseau et maximiser la signature de forfaits de cure dès la première consultation.",
        defis: [
          "Taux de présence au bilan initial gratuit",
          "Attribution géographique automatique du lead vers le centre le plus proche",
          "Suivi des séances espacées de 6 semaines pour éviter l'abandon de cure",
        ],
        results: [
          { label: "Présence aux bilans", val: "88.2%" },
          { label: "Forfaits cure signés", val: "+52%" },
          { label: "Réseau équipé", val: "12 centres" },
        ],
      },
      {
        initials: "UG",
        name: "UGolf",
        sub: "Golf & Initiations gratuites",
        status: "Actif",
        summary:
          "UGolf exploite un réseau de clubs de golf en France (Villenave-d'Ornon, Cameyrac, Toulouse Seilh, Toulouse Téoula) et propose des initiations gratuites et des adhésions.",
        context:
          "Dynamiser la découverte du golf via des sessions d'initiation gratuites de 2h le week-end et transformer les curieux en abonnés annuels.",
        defis: [
          "Remplissage des créneaux d'initiations le week-end par groupe de 8 personnes",
          "Rappels météo et logistique la veille pour garantir la présence",
          "Offre promotionnelle d'adhésion envoyée après l'initiation",
        ],
        results: [
          { label: "Initiations honorées", val: "94%" },
          { label: "Nouveaux abonnés club", val: "+36%" },
          { label: "Clubs connectés", val: "4 sites pilotes" },
        ],
      },
    ],
  },
];

// keep PhosphorIcon referenced
export type _PI = PhosphorIcon;
