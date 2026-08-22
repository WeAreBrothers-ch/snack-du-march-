"use client";

import { useEffect, useState } from "react";
import { statutA, type Statut } from "@/lib/horaires";

interface ProprietesBadge {
  readonly taille?: "normal" | "grand";
  readonly className?: string;
}

/**
 * Statut ouvert / fermé, calculé sur le fuseau de la maison.
 *
 * Rendu uniquement après hydratation : le serveur ne connaît pas l'heure
 * du visiteur, et un statut faux vaut moins que pas de statut du tout.
 * La pistache n'apparaît nulle part ailleurs sur le site (§3, règle 5).
 */
export function BadgeStatut({ taille = "normal", className = "" }: ProprietesBadge) {
  const [statut, setStatut] = useState<Statut | null>(null);

  useEffect(() => {
    const rafraichir = (): void => setStatut(statutA(new Date()));
    rafraichir();
    const minuterie = window.setInterval(rafraichir, 60_000);
    return () => window.clearInterval(minuterie);
  }, []);

  const ouvert = statut?.ouvert ?? false;
  const grand = taille === "grand";

  return (
    <span
      aria-live="polite"
      className={`inline-flex items-center gap-2 whitespace-nowrap transition-opacity duration-300 ${
        grand ? "t-d3" : "micro"
      } ${className}`.trim()}
      style={{
        opacity: statut === null ? 0 : 1,
        color: ouvert ? "var(--color-pistache)" : "var(--color-doux)",
      }}
    >
      <span
        aria-hidden="true"
        className={grand ? "h-3 w-3 rounded-pill" : "h-1.5 w-1.5 rounded-pill"}
        style={{ background: "currentColor" }}
      />
      {statut?.libelle ?? "Horaires"}
    </span>
  );
}
