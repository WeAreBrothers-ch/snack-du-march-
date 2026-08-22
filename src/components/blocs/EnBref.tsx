import Link from "next/link";
import { Photo } from "@/components/primitives/Photo";
import { PHOTOS } from "@/lib/photos";
import { Revele } from "@/components/primitives/Revele";
import { Section } from "@/components/primitives/Section";

const FAITS = [
  { valeur: "1998", legende: "l'année de l'ouverture" },
  { valeur: "2", legende: "générations derrière le comptoir" },
  { valeur: "1", legende: "seule recette, celle du père" },
] as const;

/** Le récit en trois chiffres et un portrait. Porte d'entrée vers La maison. */
export function EnBref() {
  return (
    <Section grilleVisible>
      <div className="grille items-center gap-y-8">
        <Revele className="col-span-4 sm:col-span-3 lg:col-span-4">
          <Photo
            ratio="3 / 2"
            illustration="broche"
            sizes="(min-width: 1024px) 32vw, 100vw"
            {...PHOTOS.deuxGenerations}
          />
          <p className="micro mt-3">no. 01 — Deux générations, rue Pré-du-Marché</p>
        </Revele>

        <div className="col-span-4 sm:col-span-3 lg:col-span-6 lg:col-start-7">
          <p className="kicker">La maison</p>
          <h2 className="t-d2 mt-5">
            Hüseyin a ouvert en 1998. Sertaç a grandi derrière le comptoir.
          </h2>
          <p className="t-body mt-8 text-doux">
            La famille vient de Gaziantep, la ville où l&apos;UNESCO est allée chercher
            sa définition de la gastronomie turque. Les épices arrivent encore de
            là-bas, deux fois par an. La recette, elle, n&apos;a pas bougé.
          </p>

          <dl className="liste-filets mt-7">
            {FAITS.map((fait) => (
              <div key={fait.valeur} className="flex items-baseline gap-6 py-4">
                <dt
                  className="font-display text-accent tabulaire shrink-0"
                  style={{
                    fontSize: "var(--fs-d3)",
                    fontVariationSettings: '"wght" 700, "wdth" 100',
                  }}
                >
                  {fait.valeur}
                </dt>
                <dd className="t-small text-doux">{fait.legende}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-7">
            <Link href="/la-maison" className="lien kicker">
              Lire l&apos;histoire ↗
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
