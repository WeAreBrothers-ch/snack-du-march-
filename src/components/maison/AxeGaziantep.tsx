import { Section } from "@/components/primitives/Section";

/**
 * Gaziantep – Lausanne. Pas une carte du monde : un axe, deux points, une distance.
 * C'est l'angle que personne d'autre à Lausanne ne peut revendiquer.
 */
export function AxeGaziantep() {
  return (
    <Section fond="creme">
      <div className="grille items-center gap-y-8">
        <div className="col-span-4 sm:col-span-6 lg:col-span-5">
          <p className="kicker" style={{ color: "var(--color-trait)" }}>
            L&apos;origine
          </p>
          <h2 className="t-d2 mt-5">Gaziantep</h2>
          <p className="t-body mt-8" style={{ color: "var(--color-doux)" }}>
            Gaziantep est à trois mille deux cents kilomètres d&apos;ici. C&apos;est la
            ville où l&apos;UNESCO est allée chercher sa définition de la gastronomie
            turque : le baklava, la pistache, le piment. C&apos;est aussi celle
            d&apos;où vient la famille Celik, et d&apos;où arrivent encore les épices,
            deux fois par an, dans une valise.
          </p>
        </div>

        <div className="col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-7">
          <svg
            viewBox="0 0 480 200"
            className="h-auto w-full"
            role="img"
            aria-label="Diagramme : Lausanne et Gaziantep, reliées par un arc, trois mille deux cents kilomètres."
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            >
              <path d="M60 140C160 40 320 40 420 140" strokeDasharray="5 7" />
            </g>

            <circle cx="60" cy="140" r="6" fill="currentColor" />
            <circle cx="420" cy="140" r="6" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
            <circle cx="420" cy="140" r="12" fill="none" stroke="var(--color-accent)" strokeWidth="1" />

            <g fill="currentColor" fontSize="11" letterSpacing="2.2">
              <text x="40" y="168">
                LAUSANNE
              </text>
              <text x="378" y="168" fill="var(--color-accent)">
                GAZIANTEP
              </text>
              <text x="196" y="66" opacity="0.6">
                3 200 KM
              </text>
            </g>
          </svg>
        </div>
      </div>
    </Section>
  );
}
