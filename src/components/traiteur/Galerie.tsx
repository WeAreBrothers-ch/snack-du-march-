import { Photo } from "@/components/primitives/Photo";
import { Revele } from "@/components/primitives/Revele";
import { Section } from "@/components/primitives/Section";
import { PHOTOS, type PhotoMaison } from "@/lib/photos";
import type { CleIllustration } from "@/lib/types";

const PRISES: readonly { readonly photo: PhotoMaison; readonly illustration: CleIllustration }[] = [
  { photo: PHOTOS.brocheDecoupe, illustration: "broche" },
  { photo: PHOTOS.assietteFrites, illustration: "plateau" },
  { photo: PHOTOS.comptoirVitrine, illustration: "houmous" },
  { photo: PHOTOS.durumMain, illustration: "durum" },
  { photo: PHOTOS.sandwichVeauAgneau, illustration: "pain" },
  { photo: PHOTOS.fritesTerrasse, illustration: "piment" },
];

/**
 * Ce qu'on sait faire, photographié au comptoir.
 * Les photos de vraies prestations traiteur restent à faire : on ne fait pas
 * passer une assiette du comptoir pour un buffet de mariage (§7).
 */
export function Galerie() {
  return (
    <Section grilleVisible>
      <header className="grille items-end gap-y-4">
        <h2 className="t-d2 col-span-4 sm:col-span-4 lg:col-span-7">Ce qu&apos;on sert</h2>
        <p className="kicker col-span-4 sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:text-right">
          Au comptoir, tous les jours
        </p>
      </header>

      <ul className="galerie mt-7">
        {PRISES.map((prise, index) => (
          <li key={prise.photo.src}>
            <Revele delai={(index % 3) * 60}>
              <Photo
                ratio="3 / 4"
                illustration={prise.illustration}
                sizes="(min-width: 1024px) 30vw, 50vw"
                {...prise.photo}
              />
            </Revele>
          </li>
        ))}
      </ul>

      <p className="micro mt-7">
        Photographies prises au comptoir. Les images de prestations traiteur seront
        ajoutées après la prochaine.
      </p>
    </Section>
  );
}
