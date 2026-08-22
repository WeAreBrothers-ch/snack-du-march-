"use client";

import { useEffect, useState } from "react";

/** `true` si le visiteur a demandé à réduire les animations. */
export function useMouvementReduit(): boolean {
  const [reduit, setReduit] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const requete = window.matchMedia("(prefers-reduced-motion: reduce)");
    const appliquer = (): void => setReduit(requete.matches);
    appliquer();
    requete.addEventListener("change", appliquer);
    return () => requete.removeEventListener("change", appliquer);
  }, []);

  return reduit;
}
