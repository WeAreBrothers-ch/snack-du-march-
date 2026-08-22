import type { Metadata } from "next";
import { BadgeStatut } from "@/components/chrome/BadgeStatut";
import { InfosPratiques } from "@/components/blocs/InfosPratiques";
import { Photo } from "@/components/primitives/Photo";
import { PHOTOS } from "@/lib/photos";
import { Section } from "@/components/primitives/Section";
import { MAISON } from "@/lib/infos";

export const metadata: Metadata = {
  title: "Nous trouver",
  description:
    "Snack du Marché, Rue Pré-du-Marché 3, 1004 Lausanne. Deux minutes à pied de la place de la Riponne, métro m2 arrêt Riponne. Horaires et téléphone.",
  alternates: { canonical: "/nous-trouver" },
};

const ACCES = [
  {
    titre: "À pied",
    detail:
      "Deux minutes depuis la place de la Riponne, en montant. Le comptoir est sur la droite.",
  },
  {
    titre: "En métro",
    detail: "Ligne m2, arrêt Riponne – Maurice Béjart. Sortie côté place.",
  },
  {
    titre: "En voiture",
    detail:
      "Parking de la Riponne, juste sous la place. Comptez cinq minutes à pied depuis la sortie.",
  },
];

export default function PageNousTrouver() {
  return (
    <>
      <Section grilleVisible className="border-b border-trait">
        <div className="grille items-end gap-y-8">
          <div className="col-span-4 sm:col-span-6 lg:col-span-8">
            <p className="kicker">no. 04 — Le comptoir</p>
            <h1 className="t-d1 mt-8">Nous trouver</h1>
          </div>
          <div className="col-span-4 sm:col-span-6 lg:col-span-4">
            <BadgeStatut taille="grand" />
            <a
              href={`tel:${MAISON.telephone}`}
              className="lien mt-6 block font-display"
              style={{
                fontSize: "var(--fs-d2)",
                fontVariationSettings: '"wght" 700, "wdth" 92',
              }}
            >
              {MAISON.telephoneAffiche}
            </a>
          </div>
        </div>
      </Section>

      <InfosPratiques titre="Le comptoir" dense />

      <Section fond="profond">
        <div className="grille gap-y-9">
          <h2 className="t-d2 col-span-4 sm:col-span-6 lg:col-span-4">Comment venir</h2>
          <dl className="liste-filets col-span-4 border-t border-trait sm:col-span-6 lg:col-span-7 lg:col-start-6">
            {ACCES.map((acces) => (
              <div key={acces.titre} className="py-6">
                <dt className="t-d3">{acces.titre}</dt>
                <dd className="t-small mt-2 text-doux">{acces.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section grilleVisible>
        <div className="grille items-center gap-y-8">
          <div className="col-span-4 sm:col-span-4 lg:col-span-7">
            <h2 className="t-d2">Ailleurs</h2>
            <p className="t-body mt-6 text-doux">
              Les photos du jour, les fermetures et les nouveautés passent d&apos;abord
              par là.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
              <li>
                <a
                  href={MAISON.reseaux.instagram}
                  className="lien kicker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href={MAISON.reseaux.facebook}
                  className="lien kicker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook ↗
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-4 sm:col-span-2 lg:col-span-4 lg:col-start-9">
            <Photo
              ratio="1 / 1"
              illustration="cathedrale"
              sizes="(min-width: 1024px) 32vw, 100vw"
              {...PHOTOS.enseigne}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
