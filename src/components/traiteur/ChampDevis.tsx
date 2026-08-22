import type { ReactNode } from "react";

interface ProprietesChamp {
  readonly nom: string;
  readonly libelle: string;
  readonly erreur?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Étiquette toujours visible au-dessus du champ, filet 1px, jamais de fond.
 * Le message d'erreur est relié au champ par aria-describedby.
 */
export function ChampDevis({
  nom,
  libelle,
  erreur,
  className = "",
  children,
}: ProprietesChamp) {
  return (
    <div className={className}>
      <label htmlFor={nom} className="kicker block" style={{ color: "inherit", opacity: 0.75 }}>
        {libelle}
      </label>
      <div className="mt-2">{children}</div>
      {erreur !== undefined && (
        <p id={`${nom}-erreur`} className="micro mt-2" style={{ color: "var(--color-braise)" }}>
          {erreur}
        </p>
      )}
    </div>
  );
}
