import { Photo } from "@/components/primitives/Photo";
import { Revele } from "@/components/primitives/Revele";
import { Section } from "@/components/primitives/Section";
import { PHOTOS, type PhotoMaison } from "@/lib/photos";
import type { CleIllustration } from "@/lib/types";

interface Temps {
  readonly numero: string;
  readonly titre: string;
  readonly detail: string;
  readonly photo: PhotoMaison;
  readonly illustration: CleIllustration;
}

const TEMPS: readonly Temps[] = [
  {
    numero: "01",
    titre: "On choisit",
    detail:
      "Du veau et de l'agneau en morceaux entiers, commandés chez le boucher. Jamais de viande hachée reconstituée.",
    photo: PHOTOS.comptoirVitrine,
    illustration: "couteau",
  },
  {
    numero: "02",
    titre: "On marine",
    detail:
      "Les épices, le yaourt, le temps. La viande passe la nuit dans la marinade, jamais moins.",
    photo: PHOTOS.equipeComptoir,
    illustration: "mortier",
  },
  {
    numero: "03",
    titre: "On monte",
    detail:
      "Couche par couche, à la main, le matin même. C'est le moment le plus long de la journée.",
    photo: PHOTOS.deuxGenerations,
    illustration: "broche",
  },
  {
    numero: "04",
    titre: "On tranche",
    detail:
      "À la commande, jamais avant. Ce qui n'est pas vendu le jour même n'est pas resservi.",
    photo: PHOTOS.brocheDecoupe,
    illustration: "couteau",
  },
];

/**
 * Les étapes numérotées en pills — réf. R06.
 * Les quatre vignettes passent en registre documentaire : le même traitement
 * sur les quatre unifie des photos prises à des moments différents.
 */
export function QuatreTemps() {
  return (
    <Section fond="profond">
      <header>
        <p className="kicker">no. 05</p>
        <h2 className="t-d2 mt-5">Le geste, en quatre temps</h2>
      </header>

      <ol className="mt-7 grid grid-cols-2 gap-x-[var(--gouttiere)] gap-y-9 lg:grid-cols-4">
        {TEMPS.map((temps, index) => (
          <li key={temps.numero}>
            <Revele delai={index * 60}>
              <Photo
                ratio="1 / 1"
                illustration={temps.illustration}
                registre="documentaire"
                sizes="(min-width: 1024px) 30vw, 50vw"
                {...temps.photo}
              />
              <p className="mt-5">
                <span className="pill pill--etape">{temps.numero}</span>
              </p>
              <h3 className="t-d3 mt-4">{temps.titre}</h3>
              <p className="t-small mt-3 text-doux">{temps.detail}</p>
            </Revele>
          </li>
        ))}
      </ol>
    </Section>
  );
}
