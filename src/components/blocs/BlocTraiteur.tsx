import { Bouton } from "@/components/primitives/Bouton";
import { Photo } from "@/components/primitives/Photo";
import { Revele } from "@/components/primitives/Revele";
import { prixAvecDevise } from "@/lib/format";
import { PHOTOS } from "@/lib/photos";
import { FORMULES } from "@/lib/traiteur";

/**
 * Le pilier commercial de l'accueil.
 *
 * C'est la seule bande crème de la page : sur un site vert foncé, le clair
 * est ce qui arrête l'œil. La première version posait un aplat braise pleine
 * largeur — le client l'a trouvé trop présent, et la braise reprend son rôle
 * de condiment (prix, chiffres, filets) plutôt que de fond.
 *
 * Le bloc annonce aussi les trois formules et leur prix de départ : il ne se
 * contente plus de renvoyer vers la page, il vend.
 */
export function BlocTraiteur() {
  return (
    <section className="surface-creme">
      <div className="shell grille items-center gap-y-9 py-14 lg:py-20">
        <div className="col-span-4 sm:col-span-6 lg:col-span-6">
          <p className="kicker">Le traiteur</p>
          <h2 className="t-d1 mt-4">Vous êtes 15, ou 150.</h2>
          <p className="t-lead mt-6">
            Un anniversaire, un mariage, une inauguration, un jeudi au bureau. Et si
            vous voulez, <em>on vient monter la broche sur place</em>.
          </p>

          <dl className="liste-filets mt-8 border-t border-trait">
            {FORMULES.map((formule) => (
              <div key={formule.id} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="t-d3">{formule.nom}</dt>
                <dd className="micro shrink-0">dès {prixAvecDevise(formule.prixDes)} / pers.</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Bouton href="/traiteur" variante="braise">
              Découvrir le traiteur
            </Bouton>
            <Bouton href="/traiteur#devis">Demander un devis</Bouton>
          </div>
        </div>

        <Revele className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-8">
          <Photo
            ratio="4 / 5"
            illustration="plateau"
            sizes="(min-width: 1024px) 40vw, 100vw"
            {...PHOTOS.equipeComptoir}
          />
        </Revele>
      </div>
    </section>
  );
}
