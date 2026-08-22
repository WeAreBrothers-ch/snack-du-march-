/**
 * Les cinq annotations de la broche — DIRECTION-ARTISTIQUE.md §9.
 * ⚠️ Les chiffres (24 heures, 14 épices, 6 de Gaziantep) sont des hypothèses
 * plausibles issues de la presse. À faire valider par Sertaç Celik :
 * un chiffre faux détruit exactement la crédibilité qu'on construit ici.
 */

export interface AnnotationBroche {
  readonly numero: string;
  readonly texte: string;
  /** Progression de défilement à laquelle l'annotation se révèle, de 0 à 1. */
  readonly seuil: number;
  readonly cote: "gauche" | "droite";
  /** Position verticale de l'ancrage sur la broche, en pourcentage. */
  readonly ancrage: number;
}

export const ANNOTATIONS: readonly AnnotationBroche[] = [
  {
    numero: "01",
    texte: "Veau et agneau, morceaux entiers",
    seuil: 0.1,
    cote: "droite",
    ancrage: 20,
  },
  {
    numero: "02",
    texte: "Montée à la main, chaque matin",
    seuil: 0.28,
    cote: "gauche",
    ancrage: 36,
  },
  {
    numero: "03",
    texte: "Marinée vingt-quatre heures",
    seuil: 0.48,
    cote: "droite",
    ancrage: 52,
  },
  {
    numero: "04",
    texte: "Quatorze épices, dont six viennent de Gaziantep",
    seuil: 0.68,
    cote: "gauche",
    ancrage: 66,
  },
  {
    numero: "05",
    texte: "Tranchée à la commande, jamais avant",
    seuil: 0.86,
    cote: "droite",
    ancrage: 80,
  },
];
