import type { Metadata } from "next";
import { BoutonImpression } from "@/components/carte/BoutonImpression";
import { CarteInteractive } from "@/components/carte/CarteInteractive";
import { Separateur } from "@/components/primitives/Separateur";
import { MAISON } from "@/lib/infos";

export const metadata: Metadata = {
  title: "La carte",
  description:
    "Sandwichs, dürüm, assiettes et mezze faits maison. Broche de veau et agneau tranchée à la commande, falafels frits à la minute. Rue Pré-du-Marché 3, Lausanne.",
  alternates: { canonical: "/la-carte" },
};

export default function PageCarte() {
  return (
    <div className="page-carte surface-profond">
      <div className="shell page-carte__corps py-7 lg:py-16">
        <header className="grille items-end gap-y-8">
          <div className="col-span-4 sm:col-span-6 lg:col-span-7">
            <p className="kicker">no. 02 — Depuis {MAISON.fondation}</p>
            <h1 className="t-d1 mt-5">La carte</h1>
            <p className="t-lead mt-8">
              Elle n&apos;a pas beaucoup changé depuis 1998. <em>Ce n&apos;est pas de
              la paresse.</em>
            </p>
          </div>
          <div className="col-span-4 sm:col-span-6 lg:col-span-4 lg:col-start-9 lg:text-right">
            <div data-sans-impression>
              <BoutonImpression />
              <p className="micro mt-4">
                Prix en francs suisses, service compris.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-7 border-2 border-texte p-6 lg:mt-9 lg:p-12">
          <CarteInteractive />
        </div>

        <Separateur />

        <div className="grille gap-y-8" data-sans-impression>
          <p className="t-body col-span-4 sm:col-span-6 lg:col-span-6 text-doux">
            Une allergie, un régime, une question sur ce qu&apos;il y a dans un plat ?
            Demandez au comptoir. On cuisine tout nous-mêmes, donc on sait exactement
            ce qu&apos;il y a dedans.
          </p>
          <p className="col-span-4 sm:col-span-6 lg:col-span-4 lg:col-start-9">
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
          </p>
        </div>
      </div>
    </div>
  );
}
