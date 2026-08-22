"use client";

/**
 * La carte est une affiche : elle doit pouvoir sortir en A4.
 * La feuille de style d'impression (styles-impression.css) reconstruit
 * la page en noir sur papier, sans navigation ni pied de page.
 */
export function BoutonImpression() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn--braise">
      Imprimer la carte (A4)
    </button>
  );
}
