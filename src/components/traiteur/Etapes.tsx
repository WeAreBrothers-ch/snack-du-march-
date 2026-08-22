import { Revele } from "@/components/primitives/Revele";
import { Section } from "@/components/primitives/Section";
import { CHIFFRES_TRAITEUR, ETAPES } from "@/lib/traiteur";

/** Le pitch en trois chiffres, puis les quatre étapes en pills (réf. R06). */
export function Etapes() {
  return (
    <Section fond="profond">
      <div className="grille items-start gap-y-8">
        <div className="col-span-4 sm:col-span-6 lg:col-span-5">
          <p className="kicker" style={{ color: "var(--color-trait)" }}>
            Comment ça marche
          </p>
          <p className="t-lead mt-6">
            Un anniversaire, un mariage, une inauguration, un jeudi au bureau. On dresse
            pour quinze personnes comme pour <em>cent cinquante</em>.
          </p>

          <dl className="liste-filets mt-8" style={{ borderColor: "var(--color-doux)" }}>
            {CHIFFRES_TRAITEUR.map((chiffre) => (
              <div
                key={chiffre.valeur}
                className="flex items-baseline gap-6 py-4"
                style={{ borderColor: "var(--color-doux)" }}
              >
                <dt
                  className="font-display tabulaire shrink-0"
                  style={{
                    fontSize: "var(--fs-d3)",
                    fontVariationSettings: '"wght" 700, "wdth" 100',
                    color: "var(--color-accent)",
                  }}
                >
                  {chiffre.valeur}
                </dt>
                <dd className="t-small" style={{ color: "var(--color-doux)" }}>
                  {chiffre.legende}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="col-span-4 grid gap-10 sm:col-span-6 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {ETAPES.map((etape, index) => (
            <li key={etape.numero}>
              <Revele delai={index * 60}>
                <span
                  className="pill pill--etape"
                  style={{ borderColor: "var(--color-texte)", color: "var(--color-texte)" }}
                >
                  {etape.numero}
                </span>
                <h3 className="t-d3 mt-5">{etape.titre}</h3>
                <p className="t-small mt-3" style={{ color: "var(--color-doux)" }}>
                  {etape.detail}
                </p>
              </Revele>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
