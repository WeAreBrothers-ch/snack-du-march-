/**
 * Formatage aux usages suisses romands.
 * Le prix s'écrit « CHF 14.– », jamais « 14€ » ni « 14,00 CHF ».
 */

export function formaterPrix(montant: number): string {
  if (!Number.isFinite(montant) || montant < 0) return "—";
  const entier = Math.trunc(montant);
  const centimes = Math.round((montant - entier) * 100);
  return centimes === 0
    ? `${entier}.–`
    : `${entier}.${String(centimes).padStart(2, "0")}`;
}

export function prixAvecDevise(montant: number): string {
  const prix = formaterPrix(montant);
  return prix === "—" ? prix : `CHF ${prix}`;
}

/** Majuscule initiale, pour les noms de jours stockés en minuscules. */
export function capitaliser(mot: string): string {
  return mot.length === 0 ? mot : mot[0].toUpperCase() + mot.slice(1);
}
