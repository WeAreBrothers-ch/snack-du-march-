import { formaterPrix } from "@/lib/format";
import type { Plat } from "@/lib/types";

interface ProprietesLigne {
  readonly plat: Plat;
  readonly onOuvrir?: (plat: Plat) => void;
}

/**
 * Une ligne de carte : nom, nom turc, description, tags, prix aligné à droite.
 * Réf. R03 — le modèle est un menu risographié, pas une liste de produits.
 *
 * Un plat sans prix n'affiche rien à droite : le tableau de la maison ne
 * chiffre pas les mezze ni les salades, on ne va pas inventer à sa place.
 */
export function LigneCarte({ plat, onOuvrir }: ProprietesLigne) {
  const detaillable = plat.dedans !== undefined && onOuvrir !== undefined;

  const contenu = (
    <>
      <div className="min-w-0 flex-1">
        {plat.classique === true && (
          <p className="kicker mb-2" style={{ color: "var(--color-accent)" }}>
            Le classique
          </p>
        )}
        <h3 className="t-d3">{plat.nom}</h3>
        {plat.nomTurc !== undefined && <p className="micro mt-1">{plat.nomTurc}</p>}
        <p className="t-small mt-2 max-w-[52ch] text-doux">{plat.description}</p>
        {plat.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {plat.tags.map((tag) => (
              <li key={tag} className="pill">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {detaillable && (
          <p className="kicker indice-detail mt-4" style={{ color: "var(--color-accent)" }}>
            Voir le détail ↗
          </p>
        )}
      </div>
      {plat.prix !== undefined && <p className="prix shrink-0 pl-6">{formaterPrix(plat.prix)}</p>}
    </>
  );

  if (!detaillable) {
    return <div className="ligne-carte flex items-start justify-between py-5">{contenu}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => onOuvrir(plat)}
      className="ligne-carte flex w-full items-start justify-between py-5 text-left"
    >
      {contenu}
    </button>
  );
}
