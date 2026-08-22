import { Linogravure } from "@/components/illustrations";
import { Revele } from "@/components/primitives/Revele";
import { Section } from "@/components/primitives/Section";
import { prixAvecDevise } from "@/lib/format";
import { FORMULES } from "@/lib/traiteur";

/**
 * Trois blocs de même hauteur, bordure 2px, coins vifs.
 * Aucune ombre, aucune carte dans une carte (§5, règles 4 et 5).
 */
export function Formules() {
  return (
    <Section id="formules" grilleVisible>
      <header className="grille items-end gap-y-4">
        <h2 className="t-d2 col-span-4 sm:col-span-4 lg:col-span-7">Trois formules</h2>
        <p className="kicker col-span-4 sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:text-right">
          Dès quinze personnes
        </p>
      </header>

      <ul className="mt-7 grid gap-[var(--gouttiere)] lg:grid-cols-3">
        {FORMULES.map((formule, index) => (
          <li key={formule.id} className="flex">
            <Revele delai={index * 60} className="flex w-full">
              <article className="flex w-full flex-col border-2 border-texte p-8">
                <Linogravure
                  cle={formule.illustration}
                  className="h-16 w-auto text-accent"
                />
                <h3 className="t-d3 mt-8">{formule.nom}</h3>
                <p className="t-small mt-4 text-doux">{formule.description}</p>

                <ul className="liste-filets mt-8">
                  {formule.inclus.map((element) => (
                    <li key={element} className="t-small py-3">
                      {element}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-10">
                  <span className="prix">{prixAvecDevise(formule.prixDes)}</span>
                  <span className="micro ml-3">{formule.unite}</span>
                </p>
              </article>
            </Revele>
          </li>
        ))}
      </ul>

      <p className="micro mt-7">
        Prix indicatifs, à confirmer selon la saison, le nombre de convives et le lieu.
      </p>
    </Section>
  );
}
