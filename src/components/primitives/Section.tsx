import type { ReactNode } from "react";

export type FondSection = "fond" | "profond" | "creme";

interface ProprietesSection {
  readonly id?: string;
  readonly fond?: FondSection;
  /** Affiche la grille de construction en filets. */
  readonly grilleVisible?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Bande horizontale pleine largeur.
 *
 * Le rythme de la page vient de l'alternance de ces bandes : deux verts
 * pour le fond courant, la crème pour les respirations claires
 * (DIRECTION-ARTISTIQUE.md §5 et réf. R06). Chaque surface redéfinit ses
 * couleurs de texte, de filet et d'accent : les composants à l'intérieur
 * n'ont jamais à savoir sur quel fond ils sont posés.
 */
const SURFACES: Readonly<Record<FondSection, string>> = {
  fond: "surface-fond",
  profond: "surface-profond",
  creme: "surface-creme",
};

export function Section({
  id,
  fond = "fond",
  grilleVisible = false,
  className = "",
  children,
}: ProprietesSection) {
  const classes = ["section-y", SURFACES[fond], grilleVisible ? "grille-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      <div className="shell">{children}</div>
    </section>
  );
}
