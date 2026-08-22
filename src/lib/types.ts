/** Types partagés entre les données, la logique et l'interface. */

import type { ClePhoto } from "./photos";

/** Les 14 linogravures du projet. Aucune icône de librairie n'entre ici. */
export type CleIllustration =
  | "broche"
  | "couteau"
  | "pain"
  | "durum"
  | "houmous"
  | "aubergine"
  | "pistachier"
  | "piment"
  | "grenade"
  | "feuilleDeVigne"
  | "mains"
  | "plateau"
  | "cathedrale"
  | "mortier";

export type TagPlat = "Végétarien" | "Piquant" | "Fait maison" | "Sans gluten";

export interface Plat {
  readonly id: string;
  readonly nom: string;
  /** Nom turc, affiché en micro-typo sous le nom français. */
  readonly nomTurc?: string;
  readonly description: string;
  /**
   * En francs suisses, relevé sur le tableau noir de la maison.
   * Absent quand le tableau n'affiche pas de prix pour cette ligne :
   * on préfère ne rien afficher plutôt qu'inventer un chiffre.
   */
  readonly prix?: number;
  readonly tags: readonly TagPlat[];
  /** Un seul plat par catégorie porte l'étiquette « LE CLASSIQUE ». */
  readonly classique?: boolean;
  /** Micro-rubrique « ce qu'il y a dedans » du panneau produit. */
  readonly dedans?: readonly string[];
  /** Micro-rubrique « pourquoi on l'aime » du panneau produit. */
  readonly pourquoi?: string;
  /** Clé dans `PHOTOS` (src/lib/photos.ts) quand une vraie photo existe. */
  readonly photo?: ClePhoto;
}

export interface CategorieCarte {
  readonly id: string;
  readonly titre: string;
  readonly illustration: CleIllustration;
  /** Précision affichée sous le titre : format alternatif, prix au comptoir… */
  readonly note?: string;
  readonly plats: readonly Plat[];
}
