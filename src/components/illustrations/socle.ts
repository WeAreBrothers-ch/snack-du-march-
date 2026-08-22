/**
 * Le style commun des 14 linogravures — DIRECTION-ARTISTIQUE.md §6.5.
 * Trait 1,75 px, terminaisons rondes, jamais de remplissage,
 * jamais d'autre couleur que celle héritée.
 */
export const TRAIT = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export interface ProprietesDessin {
  readonly className?: string;
}
