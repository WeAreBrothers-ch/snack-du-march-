export interface LienNavigation {
  readonly href: string;
  readonly libelle: string;
}

export const LIENS_PRINCIPAUX: readonly LienNavigation[] = [
  { href: "/la-maison", libelle: "La maison" },
  { href: "/la-carte", libelle: "La carte" },
  { href: "/traiteur", libelle: "Traiteur" },
  { href: "/nous-trouver", libelle: "Nous trouver" },
];
