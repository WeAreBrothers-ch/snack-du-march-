import { Photo } from "@/components/primitives/Photo";
import { PHOTOS } from "@/lib/photos";
import { Revele } from "@/components/primitives/Revele";
import { Section } from "@/components/primitives/Section";

/**
 * Le paragraphe qui justifie le prix — c'est sa seule fonction.
 * Gros corps romain, italiques et gras mêlés, jamais de couleur en plus (réf. R09).
 */
export function Manifeste() {
  return (
    <Section grilleVisible>
      <div className="grille items-start gap-y-9">
        <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-2">
          <p className="kicker">Pourquoi c&apos;est plus cher</p>
          <p className="t-lead mt-6">
            On monte la broche à la main, le matin, morceau par morceau. La viande est
            du <em>veau et de l&apos;agneau entiers</em> — pas de la viande
            reconstituée. Elle marine vingt-quatre heures dans les épices que la
            famille rapporte de <strong>Gaziantep</strong> depuis 1998. Ça prend du
            temps, ça coûte plus cher, et c&apos;est <em>exactement</em> pour ça que
            vous faites la queue.
          </p>
        </div>

        <Revele className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-8">
          <Photo
            ratio="3 / 4"
            illustration="broche"
            sizes="(min-width: 1024px) 40vw, 100vw"
            ancrage="22% center"
            {...PHOTOS.brocheDecoupe}
          />
        </Revele>
      </div>
    </Section>
  );
}
