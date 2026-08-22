import type { CleIllustration } from "@/lib/types";
import type { ProprietesDessin } from "./socle";
import {
  Aubergine,
  Broche,
  Couteau,
  Durum,
  Houmous,
  Pain,
  Pistachier,
} from "./dessins-produit";
import {
  Cathedrale,
  FeuilleDeVigne,
  Grenade,
  Mains,
  Mortier,
  Piment,
  Plateau,
} from "./dessins-maison";

type Dessin = (proprietes: ProprietesDessin) => React.ReactElement;

const DESSINS: Readonly<Record<CleIllustration, Dessin>> = {
  broche: Broche,
  couteau: Couteau,
  pain: Pain,
  durum: Durum,
  houmous: Houmous,
  aubergine: Aubergine,
  pistachier: Pistachier,
  piment: Piment,
  grenade: Grenade,
  feuilleDeVigne: FeuilleDeVigne,
  mains: Mains,
  plateau: Plateau,
  cathedrale: Cathedrale,
  mortier: Mortier,
};

interface ProprietesLinogravure {
  readonly cle: CleIllustration;
  readonly className?: string;
}

/**
 * Point d'entrée unique des 14 dessins au trait.
 * Ils sont décoratifs : l'information est toujours portée par le texte à côté.
 */
export function Linogravure({ cle, className }: ProprietesLinogravure) {
  const Dessin = DESSINS[cle];
  if (Dessin === undefined) return null;
  return <Dessin className={className ?? "h-auto w-full"} />;
}

/**
 * L'octogramme seldjoukide — la seule citation ornementale turque du site.
 * Une occurrence par section, jamais rempli, jamais doré, jamais animé.
 */
export function Octogramme({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1.25" />
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        stroke="currentColor"
        strokeWidth="1.25"
        transform="rotate(45 12 12)"
      />
    </svg>
  );
}
