import { CARTE } from "./carte";
import type { CategorieCarte, Plat } from "./types";

const TOUS_LES_PLATS: readonly Plat[] = CARTE.flatMap(
  (categorie: CategorieCarte) => categorie.plats,
);

export function trouverPlat(id: string): Plat | undefined {
  return TOUS_LES_PLATS.find((plat) => plat.id === id);
}

/** Rend les plats demandés, dans l'ordre, en ignorant silencieusement les inconnus. */
export function selectionner(ids: readonly string[]): readonly Plat[] {
  return ids.flatMap((id) => {
    const plat = trouverPlat(id);
    return plat === undefined ? [] : [plat];
  });
}
