import Link from "next/link";
import { Photo } from "@/components/primitives/Photo";
import { Revele } from "@/components/primitives/Revele";
import { Section } from "@/components/primitives/Section";
import { formaterPrix } from "@/lib/format";
import { TROIS_PIECES } from "@/lib/carte";
import { PHOTOS } from "@/lib/photos";
import { selectionner } from "@/lib/selection";
import type { CleIllustration } from "@/lib/types";

/** Le dessin sert de repli si la photo venait à manquer. */
const ILLUSTRATIONS: Readonly<Record<string, CleIllustration>> = {
  "veau-agneau": "pain",
  "durum-poulet": "durum",
  "assiette-veau-agneau": "couteau",
};

/** « On en fait peu. C'est voulu. » Un format par pièce : le pain, la galette, l'assiette. */
export function TroisPieces() {
  const pieces = selectionner(TROIS_PIECES);

  return (
    <Section fond="profond">
      <header className="grille items-end gap-y-4">
        <h2 className="t-d2 col-span-4 sm:col-span-4 lg:col-span-7">
          Trois choses, bien faites
        </h2>
        <p className="kicker col-span-4 sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:text-right">
          On en fait peu. C&apos;est voulu.
        </p>
      </header>

      <ul className="galerie mt-7">
        {pieces.map((plat, index) => (
          <li key={plat.id}>
            <Revele delai={index * 60}>
              <Photo
                ratio="4 / 5"
                illustration={ILLUSTRATIONS[plat.id] ?? "pain"}
                sizes="(min-width: 1024px) 30vw, 50vw"
                {...(plat.photo === undefined
                  ? { sujet: plat.nom }
                  : PHOTOS[plat.photo])}
              />
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-trait pt-4">
                <h3 className="t-d3">{plat.nom}</h3>
                {plat.prix !== undefined && (
                  <p className="prix shrink-0">{formaterPrix(plat.prix)}</p>
                )}
              </div>
              {plat.nomTurc !== undefined && <p className="micro mt-1">{plat.nomTurc}</p>}
              <p className="t-small mt-3 text-doux">{plat.description}</p>
            </Revele>
          </li>
        ))}
      </ul>

      <p className="mt-7">
        <Link href="/la-carte" className="lien kicker">
          Voir toute la carte ↗
        </Link>
      </p>
    </Section>
  );
}
