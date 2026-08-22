"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Progression de 0 à 1 de la traversée d'une section haute par le viewport.
 * Pilotée par requestAnimationFrame et fermée par IntersectionObserver :
 * aucune boucle ne tourne quand la section n'est pas à l'écran.
 */
export function useProgressionDefilement(
  reference: RefObject<HTMLElement | null>,
): number {
  const [progression, setProgression] = useState(0);
  const image = useRef<number | null>(null);

  useEffect(() => {
    const element = reference.current;
    if (element === null || typeof IntersectionObserver === "undefined") return;

    let visible = false;

    const mesurer = (): void => {
      const rectangle = element.getBoundingClientRect();
      const course = rectangle.height - window.innerHeight;
      const valeur = course <= 0 ? 0 : -rectangle.top / course;
      setProgression(Math.min(1, Math.max(0, valeur)));
      if (visible) image.current = window.requestAnimationFrame(mesurer);
    };

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          visible = entree.isIntersecting;
          if (visible && image.current === null) {
            image.current = window.requestAnimationFrame(mesurer);
          }
          if (!visible && image.current !== null) {
            window.cancelAnimationFrame(image.current);
            image.current = null;
          }
        }
      },
      { threshold: 0 },
    );

    observateur.observe(element);

    return () => {
      observateur.disconnect();
      if (image.current !== null) window.cancelAnimationFrame(image.current);
      image.current = null;
    };
  }, [reference]);

  return progression;
}
