"use client";

import { useEffect, useRef } from "react";
import { Photo } from "@/components/primitives/Photo";
import { formaterPrix } from "@/lib/format";
import { PHOTOS } from "@/lib/photos";
import type { CleIllustration, Plat } from "@/lib/types";

interface ProprietesPanneau {
  readonly plat: Plat | null;
  readonly illustration: CleIllustration;
  readonly onFermer: () => void;
}

/**
 * Panneau plein écran d'un plat — réf. R02 (un plat = un écran) et R05
 * (deux micro-rubriques nommées). Il glisse depuis le bas.
 */
export function PanneauPlat({ plat, illustration, onFermer }: ProprietesPanneau) {
  const fermeture = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (plat === null) return;
    const surTouche = (evenement: KeyboardEvent): void => {
      if (evenement.key === "Escape") onFermer();
    };
    document.addEventListener("keydown", surTouche);
    document.body.style.overflow = "hidden";
    fermeture.current?.focus();
    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = "";
    };
  }, [plat, onFermer]);

  if (plat === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={plat.nom}
      className="surface-fond fixed inset-0 z-100 overflow-y-auto"
    >
      <div className="shell py-8">
        <div className="flex items-start justify-between gap-6">
          <p className="kicker">La carte — {plat.nom}</p>
          <button ref={fermeture} type="button" onClick={onFermer} className="btn py-3">
            Fermer
          </button>
        </div>

        <div className="grille mt-7 gap-y-9">
          <div className="col-span-4 sm:col-span-6 lg:col-span-6">
            <Photo
              ratio="4 / 5"
              illustration={illustration}
              sizes="(min-width: 1024px) 48vw, 100vw"
              {...(plat.photo === undefined
                ? { sujet: `${plat.nom}, photographié au comptoir` }
                : PHOTOS[plat.photo])}
            />
          </div>

          <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-8">
            <h2 className="t-d1">{plat.nom}</h2>
            {plat.nomTurc !== undefined && <p className="micro mt-3">{plat.nomTurc}</p>}
            {plat.prix !== undefined && (
              <p className="prix mt-6">{formaterPrix(plat.prix)}</p>
            )}
            <p className="t-body mt-6 text-doux">{plat.description}</p>

            {plat.dedans !== undefined && (
              <section className="mt-8">
                <h3 className="kicker">Ce qu&apos;il y a dedans</h3>
                <ul className="liste-filets mt-4">
                  {plat.dedans.map((element) => (
                    <li key={element} className="t-small py-3">
                      {element}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {plat.pourquoi !== undefined && (
              <section className="mt-8">
                <h3 className="kicker">Pourquoi on l&apos;aime</h3>
                <p className="t-lead mt-4">{plat.pourquoi}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
