import { Octogramme } from "@/components/illustrations";

interface ProprietesTicker {
  readonly mots: readonly string[];
}

/**
 * Bandeau défilant d'attributs. Réf. R01, R05, R06, R08.
 *
 * Il est toujours crème : c'est la respiration claire du site, la barre
 * qui coupe les grands aplats verts. En reduced-motion, le défilement
 * s'arrête et le texte reste lisible en entier.
 */
export function Ticker({ mots }: ProprietesTicker) {
  const suite = [...mots, ...mots];

  return (
    <div className="ticker surface-creme border-y border-trait-fort py-4">
      <div className="ticker__piste">
        {suite.map((mot, index) => (
          <span
            key={`${mot}-${index}`}
            className="kicker flex shrink-0 items-center gap-6 px-6"
            style={{ color: "var(--color-texte)" }}
            aria-hidden={index >= mots.length}
          >
            {mot}
            <Octogramme className="h-3 w-3 shrink-0 text-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
