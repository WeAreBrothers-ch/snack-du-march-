import { BadgeStatut } from "@/components/chrome/BadgeStatut";
import { PlanDessine } from "@/components/blocs/PlanDessine";
import { Photo } from "@/components/primitives/Photo";
import { PHOTOS } from "@/lib/photos";
import { Section } from "@/components/primitives/Section";
import { jourCourant, semaineAffichable } from "@/lib/horaires";
import { capitaliser } from "@/lib/format";
import { MAISON } from "@/lib/infos";

interface ProprietesInfos {
  readonly titre: string;
  /** Sur la page dédiée, le tableau des horaires prend toute la place. */
  readonly dense?: boolean;
}

/**
 * Les informations pratiques, affichées brutes, sans mise en scène (réf. R07, R13).
 * Cette zone doit rester utile à 22 h 05 sur un téléphone à 3 % de batterie.
 */
export function InfosPratiques({ titre, dense = false }: ProprietesInfos) {
  const semaine = semaineAffichable();
  const aujourdhui = jourCourant(new Date());

  return (
    <Section id="ici" grilleVisible>
      <div className="grille gap-y-8">
        <div className="col-span-4 sm:col-span-6 lg:col-span-6">
          <p className="kicker">{titre}</p>
          <h2 className="t-d2 mt-5">
            {MAISON.adresse.rue}
            <br />
            {MAISON.adresse.codePostal} {MAISON.adresse.ville}
          </h2>
          <p className="t-body mt-6 text-doux">
            Deux minutes à pied de la Riponne, en montant. Métro m2 arrêt Riponne,
            parking de la Riponne juste en dessous.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`tel:${MAISON.telephone}`}
              className="lien font-display"
              style={{
                fontSize: "var(--fs-d3)",
                fontVariationSettings: '"wght" 700, "wdth" 100',
              }}
            >
              {MAISON.telephoneAffiche}
            </a>
            <BadgeStatut />
          </div>

          <p className="mt-8">
            <a
              href={MAISON.itineraire}
              className="lien kicker"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouvrir dans Maps ↗
            </a>
          </p>
        </div>

        <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-8">
          <p className="kicker">Horaires</p>
          <dl className="liste-filets mt-5">
            {semaine.map(({ jour, libelle }) => {
              const actif = jour === aujourdhui;
              return (
                <div
                  key={jour}
                  className="flex items-baseline justify-between gap-6 py-3"
                  style={{ color: actif ? "var(--color-accent)" : undefined }}
                >
                  <dt className={dense ? "t-d3" : "t-body"}>{capitaliser(jour)}</dt>
                  <dd className="tabulaire t-body">{libelle}</dd>
                </div>
              );
            })}
          </dl>
          <p className="micro mt-5">
            Horaires à confirmer auprès de la maison avant tout déplacement tardif.
          </p>
        </div>

        <div className="col-span-4 sm:col-span-6 lg:col-span-6">
          <PlanDessine className="mt-6 h-auto w-full text-texte" />
        </div>

        <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-8">
          <Photo
            ratio="1 / 1"
            illustration="cathedrale"
            sizes="(min-width: 1024px) 40vw, 100vw"
            {...PHOTOS.comptoirVitrine}
          />
        </div>
      </div>
    </Section>
  );
}
