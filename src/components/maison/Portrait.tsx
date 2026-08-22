import { Photo } from "@/components/primitives/Photo";
import type { PhotoMaison } from "@/lib/photos";
import { Revele } from "@/components/primitives/Revele";
import { Section } from "@/components/primitives/Section";

interface ProprietesPortrait {
  readonly numero: string;
  readonly prenom: string;
  readonly annotation: string;
  readonly titre: string;
  readonly texte: string;
  readonly photo: PhotoMaison;
  /** Inverse la colonne image / colonne texte. Une section sur deux. */
  readonly inverse?: boolean;
}

/**
 * Portrait documentaire annoté — réf. R11.
 *
 * L'annotation décrit la scène, jamais la personne : tant que la maison n'a
 * pas confirmé qui est sur quelle photo, écrire un prénom sous un visage
 * serait une erreur sur de vraies personnes.
 */
export function Portrait({
  numero,
  prenom,
  annotation,
  titre,
  texte,
  photo,
  inverse = false,
}: ProprietesPortrait) {
  return (
    <Section grilleVisible={inverse}>
      <div className="grille items-center gap-y-9">
        <Revele
          className={
            inverse
              ? "col-span-4 sm:col-span-3 lg:col-span-4 lg:col-start-9 lg:order-2"
              : "col-span-4 sm:col-span-3 lg:col-span-4 lg:col-start-2"
          }
        >
          <Photo
            ratio="3 / 4"
            illustration="mains"
            sizes="(min-width: 1024px) 32vw, 100vw"
            {...photo}
          />
          <p className="micro mt-3">
            no. {numero} — {annotation}
          </p>
        </Revele>

        <div
          className={
            inverse
              ? "col-span-4 sm:col-span-3 lg:col-span-5 lg:col-start-2 lg:order-1"
              : "col-span-4 sm:col-span-3 lg:col-span-5 lg:col-start-7"
          }
        >
          <p className="kicker">{prenom}</p>
          <h2 className="t-d2 mt-5">{titre}</h2>
          <p className="t-body mt-8 text-doux">{texte}</p>
        </div>
      </div>
    </Section>
  );
}
