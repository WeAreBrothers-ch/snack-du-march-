"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ProprietesRevele {
  /** Décalage en ms, pour animer une série d'éléments. */
  readonly delai?: number;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Révélation à l'entrée dans le viewport : opacity + translateY, une seule fois.
 * Ne déplace jamais la mise en page, donc CLS nul (§10).
 *
 * L'état vit dans l'attribut `data-vu` du DOM, pas dans React : c'est une
 * synchronisation avec une API du navigateur, elle ne doit provoquer aucun
 * rendu. Et surtout, le contenu ne doit jamais pouvoir rester invisible —
 * d'où les trois portes de sortie ci-dessous, plus la règle `noscript`
 * déclarée dans le gabarit racine.
 */
export function Revele({ delai = 0, className = "", children }: ProprietesRevele) {
  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = reference.current;
    if (element === null) return;

    const reveler = (): void => {
      element.dataset.vu = "true";
    };

    // 1. Navigateur sans IntersectionObserver : on montre tout de suite.
    if (typeof IntersectionObserver === "undefined") {
      reveler();
      return;
    }

    // 2. Déjà à l'écran à l'hydratation : on n'attend pas un défilement
    //    qui n'aura peut-être jamais lieu.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
      reveler();
      return;
    }

    // 3. Cas normal : on révèle au premier passage, puis on se débranche.
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (entree.isIntersecting) {
            reveler();
            observateur.disconnect();
            return;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observateur.observe(element);
    return () => observateur.disconnect();
  }, []);

  return (
    <div
      ref={reference}
      className={`revele ${className}`.trim()}
      data-vu="false"
      style={{ transitionDelay: `${delai}ms` }}
    >
      {children}
    </div>
  );
}
