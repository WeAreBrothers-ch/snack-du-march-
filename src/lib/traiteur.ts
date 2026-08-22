/**
 * LE TRAITEUR — contenu de la page pilier.
 * ⚠️ Formats, capacités, délais, rayon et prix sont des hypothèses de travail
 * cohérentes avec l'activité constatée. À documenter avec le client
 * (voir la liste en fin de RECHERCHE-CLIENT.md).
 */

import type { CleIllustration } from "./types";

export interface FormuleTraiteur {
  readonly id: string;
  readonly nom: string;
  readonly illustration: CleIllustration;
  readonly description: string;
  readonly inclus: readonly string[];
  readonly prixDes: number;
  readonly unite: string;
}

export interface EtapeTraiteur {
  readonly numero: string;
  readonly titre: string;
  readonly detail: string;
}

export interface QuestionTraiteur {
  readonly question: string;
  readonly reponse: string;
}

export const FORMULES: readonly FormuleTraiteur[] = [
  {
    id: "plateau",
    nom: "Le plateau",
    illustration: "plateau",
    description:
      "Les mezze, les falafels, les pains. Livré froid, prêt à poser sur la table.",
    inclus: [
      "Houmous, caviar d'aubergine, taboulé, feuilles de vigne",
      "Falafels et sauces maison",
      "Pains chauds livrés à part",
      "Vaisselle jetable compostable sur demande",
    ],
    prixDes: 18,
    unite: "par personne",
  },
  {
    id: "table",
    nom: "La table",
    illustration: "houmous",
    description:
      "Les mezze, les viandes, les pains, dressés chez vous. On installe, vous servez.",
    inclus: [
      "Tout le plateau, plus les viandes grillées",
      "Kefta, poulet mariné, veau-agneau tranché",
      "Dressage sur place, plats de service fournis",
      "On repasse récupérer le matériel le lendemain",
    ],
    prixDes: 32,
    unite: "par personne",
  },
  {
    id: "broche",
    nom: "La broche",
    illustration: "broche",
    description:
      "On vient avec la broche. On la monte, on la cuit, on tranche devant vos invités. C'est le plus beau des trois.",
    inclus: [
      "La broche montée le matin même, à la main",
      "Le gril vertical, installé et repris par nos soins",
      "Un de la maison derrière la lame, tout le service",
      "Mezze, pains et sauces compris",
    ],
    prixDes: 46,
    unite: "par personne",
  },
];

export const ETAPES: readonly EtapeTraiteur[] = [
  {
    numero: "01",
    titre: "Vous nous dites",
    detail: "La date, le nombre de personnes, le lieu. Un message ou un appel suffit.",
  },
  {
    numero: "02",
    titre: "On vous propose",
    detail: "Une formule, une quantité, un prix ferme. Par écrit, sous 24 heures.",
  },
  {
    numero: "03",
    titre: "On cuisine",
    detail: "Les mezze la veille, la broche le matin même. Rien n'est préparé d'avance.",
  },
  {
    numero: "04",
    titre: "On vient",
    detail: "On livre, on dresse, et si c'est la broche, on reste trancher.",
  },
];

export const CHIFFRES_TRAITEUR = [
  { valeur: "dès 15", legende: "personnes" },
  { valeur: "48 h", legende: "de délai" },
  { valeur: "20 km", legende: "autour de Lausanne" },
] as const;

export const QUESTIONS: readonly QuestionTraiteur[] = [
  {
    question: "À partir de combien de personnes ?",
    reponse:
      "Quinze. En dessous, on vous prépare volontiers une grande commande au comptoir, c'est plus simple pour tout le monde et moins cher pour vous.",
  },
  {
    question: "Jusqu'où vous déplacez-vous ?",
    reponse:
      "Lausanne et vingt kilomètres autour : Morges, Lutry, Échallens, Cully. Au-delà, appelez-nous, on regarde.",
  },
  {
    question: "La viande est-elle halal ?",
    reponse:
      "Oui. La viande vient du même fournisseur que celle du comptoir, avec la même certification. Si vous avez besoin du document, on vous l'envoie.",
  },
  {
    question: "Et les allergies ?",
    reponse:
      "Dites-le à la commande. On cuisine tout nous-mêmes, donc on sait exactement ce qu'il y a dans chaque plat. Le gluten et le sésame sont les deux à surveiller.",
  },
  {
    question: "Quel délai pour réserver ?",
    reponse:
      "Quarante-huit heures pour le plateau et la table. Une semaine pour la broche sur place, parce qu'il faut commander la viande.",
  },
];
