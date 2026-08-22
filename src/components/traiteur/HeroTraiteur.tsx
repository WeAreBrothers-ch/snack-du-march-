import { Linogravure } from "@/components/illustrations";
import { Bouton } from "@/components/primitives/Bouton";
import type { CleIllustration } from "@/lib/types";

interface Doodle {
  readonly cle: CleIllustration;
  readonly haut: string;
  readonly cote: "left" | "right";
  readonly decalage: string;
  readonly rotation: number;
  readonly largeur: string;
  /** Les doodles secondaires disparaissent sur petit écran. */
  readonly secondaire?: boolean;
}

const DOODLES: readonly Doodle[] = [
  { cle: "plateau", haut: "8%", cote: "left", decalage: "4%", rotation: -8, largeur: "116px" },
  { cle: "houmous", haut: "62%", cote: "left", decalage: "10%", rotation: 6, largeur: "84px" },
  { cle: "feuilleDeVigne", haut: "34%", cote: "left", decalage: "1%", rotation: 14, largeur: "96px", secondaire: true },
  { cle: "broche", haut: "6%", cote: "right", decalage: "8%", rotation: 7, largeur: "70px" },
  { cle: "pistachier", haut: "58%", cote: "right", decalage: "3%", rotation: -12, largeur: "104px" },
  { cle: "grenade", haut: "30%", cote: "right", decalage: "13%", rotation: 9, largeur: "76px", secondaire: true },
  { cle: "mortier", haut: "82%", cote: "right", decalage: "24%", rotation: -6, largeur: "92px", secondaire: true },
];

/**
 * Le seul hero non typographique du site — un champ de doodles autour du titre
 * (réf. R13). Il doit surprendre : c'est la page qui rapporte de l'argent.
 */
export function HeroTraiteur() {
  return (
    <section className="relative overflow-hidden border-b border-trait">
      <div className="shell relative py-24 text-center lg:py-36">
        {DOODLES.map((doodle) => (
          <span
            key={`${doodle.cle}-${doodle.haut}`}
            aria-hidden="true"
            className={`pointer-events-none absolute text-texte opacity-45 ${
              doodle.secondaire === true ? "hidden lg:block" : ""
            }`}
            style={{
              top: doodle.haut,
              [doodle.cote]: doodle.decalage,
              width: doodle.largeur,
              transform: `rotate(${doodle.rotation}deg)`,
            }}
          >
            <Linogravure cle={doodle.cle} className="h-auto w-full" />
          </span>
        ))}

        <div className="relative mx-auto max-w-[26ch]">
          <p className="kicker">Le service traiteur</p>
          <h1 className="t-d1 mt-8">Le traiteur</h1>
          <p className="t-lead mx-auto mt-7 max-w-[30ch]">
            On amène <em>Gaziantep</em> chez vous.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Bouton href="#devis" variante="braise">
              Demander un devis
            </Bouton>
            <Bouton href="#formules">Voir les formules</Bouton>
          </div>
        </div>
      </div>
    </section>
  );
}
