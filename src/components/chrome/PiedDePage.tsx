import Link from "next/link";
import { Linogravure } from "@/components/illustrations";
import { LIENS_PRINCIPAUX } from "./liens";
import { MAISON } from "@/lib/infos";
import { semaineAffichable } from "@/lib/horaires";
import { capitaliser } from "@/lib/format";

const MOT_MARQUE = "Snack du Marché";

/**
 * Wordmark géant coupé par le bord bas, avec le calage d'encre riso.
 * Réf. R06, R07 — c'est la dernière chose qu'on voit, elle doit être un objet.
 */
export function PiedDePage() {
  const semaine = semaineAffichable();

  return (
    <footer className="surface-profond border-t border-trait-fort pt-12">
      <div className="shell grille gap-y-9">
        <div className="col-span-4 sm:col-span-3 lg:col-span-4">
          <p className="kicker mb-4">La maison</p>
          <address className="t-body not-italic">
            {MAISON.adresse.rue}
            <br />
            {MAISON.adresse.codePostal} {MAISON.adresse.ville}
          </address>
          <a
            href={`tel:${MAISON.telephone}`}
            className="lien mt-4 inline-block font-display text-[1.4rem]"
            style={{ fontVariationSettings: '"wght" 600, "wdth" 100' }}
          >
            {MAISON.telephoneAffiche}
          </a>
        </div>

        <div className="col-span-4 sm:col-span-3 lg:col-span-3">
          <p className="kicker mb-4">Horaires</p>
          <dl className="liste-filets t-small">
            {semaine.map(({ jour, libelle }) => (
              <div key={jour} className="flex justify-between gap-4 py-2">
                <dt>{capitaliser(jour)}</dt>
                <dd className="tabulaire text-doux">{libelle}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav
          aria-label="Pied de page"
          className="col-span-4 sm:col-span-3 lg:col-span-2 lg:col-start-9"
        >
          <p className="kicker mb-4">Le site</p>
          <ul className="t-small space-y-2">
            {LIENS_PRINCIPAUX.map((lien) => (
              <li key={lien.href}>
                <Link href={lien.href} className="lien">
                  {lien.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-4 sm:col-span-3 lg:col-span-2">
          <p className="kicker mb-4">Ailleurs</p>
          <ul className="t-small space-y-2">
            <li>
              <a
                href={MAISON.reseaux.instagram}
                className="lien"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={MAISON.reseaux.facebook}
                className="lien"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={MAISON.itineraire}
                className="lien"
                target="_blank"
                rel="noopener noreferrer"
              >
                Itinéraire ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell mt-7 flex items-end justify-between gap-8">
        <p className="micro max-w-[42ch]">
          Snack du Marché — depuis {MAISON.fondation}, {MAISON.adresse.rue}, Lausanne.
        </p>
        <div className="flex shrink-0 items-end gap-6 text-doux">
          <Linogravure cle="pistachier" className="h-14 w-14" />
          <Linogravure cle="cathedrale" className="h-12 w-16" />
        </div>
      </div>

      <div className="mt-7 overflow-hidden" aria-hidden="true">
        <p
          className="t-hero mal-cale translate-y-[14%] px-[var(--marge)] text-center"
          data-texte={MOT_MARQUE}
        >
          {MOT_MARQUE}
        </p>
      </div>

      <div className="shell border-t border-trait py-5">
        <p className="micro">Site réalisé à Lausanne.</p>
      </div>
    </footer>
  );
}
