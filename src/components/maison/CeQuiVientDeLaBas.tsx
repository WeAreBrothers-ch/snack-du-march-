import { Linogravure } from "@/components/illustrations";
import { Revele } from "@/components/primitives/Revele";
import { Section } from "@/components/primitives/Section";
import type { CleIllustration } from "@/lib/types";

interface Provenance {
  readonly nom: string;
  readonly nomTurc: string;
  readonly illustration: CleIllustration;
  readonly note: string;
}

const PROVENANCES: readonly Provenance[] = [
  {
    nom: "Le piment d'Alep",
    nomTurc: "Pul biber",
    illustration: "piment",
    note: "Séché au soleil, écrasé gros. Il chauffe lentement, il ne brûle pas.",
  },
  {
    nom: "La pistache d'Antep",
    nomTurc: "Antep fıstığı",
    illustration: "pistachier",
    note: "Celle du baklava. Plus verte et plus longue que les autres.",
  },
  {
    nom: "La mélasse de grenade",
    nomTurc: "Nar ekşisi",
    illustration: "grenade",
    note: "L'acidité du taboulé. Une cuillère suffit pour tout le saladier.",
  },
  {
    nom: "Le sumac",
    nomTurc: "Sumak",
    illustration: "mortier",
    note: "Sur l'oignon rouge, toujours. C'est ce qui réveille le sandwich.",
  },
  {
    nom: "L'aubergine fumée",
    nomTurc: "Közlenmiş patlıcan",
    illustration: "aubergine",
    note: "Brûlée sur la flamme, pelée à la main, écrasée à la fourchette.",
  },
  {
    nom: "La feuille de vigne",
    nomTurc: "Asma yaprağı",
    illustration: "feuilleDeVigne",
    note: "Roulée une par une. Personne n'a trouvé le moyen d'aller plus vite.",
  },
];

export function CeQuiVientDeLaBas() {
  return (
    <Section grilleVisible>
      <header>
        <p className="kicker">no. 04</p>
        <h2 className="t-d2 mt-5">Ce qui vient de là-bas</h2>
      </header>

      <ul className="mt-7 grid gap-x-[var(--gouttiere)] gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {PROVENANCES.map((provenance, index) => (
          <li key={provenance.nom}>
            <Revele delai={(index % 3) * 60}>
              <Linogravure
                cle={provenance.illustration}
                className="h-20 w-auto text-accent"
              />
              <h3 className="t-d3 mt-6">{provenance.nom}</h3>
              <p className="micro mt-2">{provenance.nomTurc}</p>
              <p className="t-small mt-4 text-doux">{provenance.note}</p>
            </Revele>
          </li>
        ))}
      </ul>
    </Section>
  );
}
