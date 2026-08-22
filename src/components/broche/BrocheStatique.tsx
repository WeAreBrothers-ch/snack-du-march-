import { Linogravure } from "@/components/illustrations";
import { ANNOTATIONS } from "./donnees";

/**
 * Repli sans mouvement : la broche est fixe et les cinq annotations sont
 * affichées ensemble. Aucune information n'est perdue — c'est la règle §9.
 */
export function BrocheStatique() {
  return (
    <div className="shell grille items-center gap-y-9 py-24">
      <div className="col-span-4 sm:col-span-2 lg:col-span-4 lg:col-start-2">
        <Linogravure cle="broche" className="mx-auto h-auto w-40 text-texte lg:w-56" />
      </div>
      <ol className="col-span-4 sm:col-span-4 lg:col-span-5 lg:col-start-7 liste-filets">
        {ANNOTATIONS.map((annotation) => (
          <li key={annotation.numero} className="flex gap-5 py-5">
            <span className="numero pt-1">{annotation.numero}</span>
            <span className="t-d3 text-texte">{annotation.texte}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
