import { Linogravure } from "@/components/illustrations";
import { Section } from "@/components/primitives/Section";

interface LigneFiche {
  readonly cle: string;
  readonly valeur: string;
  readonly aValider?: boolean;
}

/**
 * La fiche technique de la broche — réf. R11.
 * La page la plus convaincante du site tient dans ce tableau.
 * ⚠️ Les valeurs marquées « à valider » attendent la confirmation du client.
 */
const LIGNES: readonly LigneFiche[] = [
  { cle: "Viandes", valeur: "Veau et agneau, morceaux entiers" },
  { cle: "Montage", valeur: "À la main, couche par couche, chaque matin" },
  { cle: "Marinade", valeur: "Vingt-quatre heures", aValider: true },
  { cle: "Épices", valeur: "Quatorze, dont six rapportées de Gaziantep", aValider: true },
  { cle: "Cuisson", valeur: "Verticale, tranchée à la commande" },
  { cle: "Recette", valeur: "Celle de Hüseyin Celik, inchangée depuis 1998" },
  { cle: "Boucher", valeur: "À documenter avec la maison", aValider: true },
];

export function FicheBroche() {
  return (
    <Section fond="profond">
      <div className="grille gap-y-9">
        <div className="col-span-4 sm:col-span-6 lg:col-span-3">
          <p className="kicker">no. 03</p>
          <h2 className="t-d2 mt-5">La broche</h2>
          <Linogravure cle="broche" className="mt-7 h-auto w-24 text-texte opacity-60" />
        </div>

        <div className="col-span-4 sm:col-span-6 lg:col-span-8 lg:col-start-5">
          <dl className="liste-filets border-t border-trait">
            {LIGNES.map((ligne) => (
              <div
                key={ligne.cle}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="kicker sm:w-40 sm:shrink-0">{ligne.cle}</dt>
                <dd className="t-d3">
                  {ligne.valeur}
                  {ligne.aValider === true && (
                    <span className="micro ml-3 align-middle">à valider</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
