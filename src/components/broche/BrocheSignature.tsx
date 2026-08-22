"use client";

import { useRef } from "react";
import { Linogravure } from "@/components/illustrations";
import { useMouvementReduit } from "@/lib/useMouvementReduit";
import { ANNOTATIONS } from "./donnees";
import { BrocheStatique } from "./BrocheStatique";
import { useProgressionDefilement } from "./useProgressionDefilement";

/**
 * LE GESTE SIGNATURE — DIRECTION-ARTISTIQUE.md §9.
 *
 * La broche tourne au défilement pendant que les cinq faits qui la
 * documentent s'allument un par un. Les cinq sont visibles dès l'arrivée,
 * en retrait : on lit tout de suite ce qu'il y a à savoir, le défilement
 * ne fait qu'appuyer. La première version révélait les lignes une par une
 * dans un grand vide — c'était élégant et creux.
 *
 * En attendant le shooting 360°, la rotation est portée par la linogravure :
 * la compression horizontale reproduit le passage de face en profil.
 */
export function BrocheSignature() {
  const section = useRef<HTMLElement>(null);
  const progression = useProgressionDefilement(section);
  const mouvementReduit = useMouvementReduit();

  const angle = progression * Math.PI * 4;
  // Plancher à 0,55 : la broche se met de profil sans jamais devenir un trait.
  const compression = 0.55 + 0.45 * Math.abs(Math.cos(angle));
  const indexActif = ANNOTATIONS.reduce(
    (actif, annotation, index) => (progression >= annotation.seuil ? index : actif),
    -1,
  );

  if (mouvementReduit) {
    return (
      <section className="surface-profond relative overflow-hidden">
        <span className="trame-lame absolute inset-0" aria-hidden="true" />
        <BrocheStatique />
      </section>
    );
  }

  return (
    <section ref={section} className="surface-profond relative" style={{ height: "150vh" }}>
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden">
        <span className="trame-lame absolute inset-0" aria-hidden="true" />

        <div className="shell grille relative w-full items-center gap-y-8">
          <div className="col-span-4 sm:col-span-2 lg:col-span-4 lg:col-start-1">
            <div
              className="broche__objet broche__taille mx-auto"
              style={{
                transform: `scaleX(${compression.toFixed(3)})`,
                willChange: "transform",
              }}
            >
              <Linogravure cle="broche" className="h-full w-auto" />
            </div>
          </div>

          <div className="col-span-4 sm:col-span-4 lg:col-span-7 lg:col-start-6">
            <p className="kicker">no. 01 — La broche</p>
            <h2 className="t-d2 mt-3">Ce qu&apos;il y a dedans</h2>

            <ol className="liste-filets mt-7 border-t border-trait">
              {ANNOTATIONS.map((annotation, index) => {
                const allumee = index <= indexActif;
                return (
                  <li
                    key={annotation.numero}
                    className="flex items-baseline gap-5 py-4"
                    style={{
                      opacity: allumee ? 1 : 0.32,
                      transition: "opacity 420ms var(--ease-out)",
                    }}
                  >
                    <span
                      className="numero shrink-0"
                      style={{ color: allumee ? "var(--color-accent)" : "inherit" }}
                    >
                      {annotation.numero}
                    </span>
                    <span className="t-d3">{annotation.texte}</span>
                  </li>
                );
              })}
            </ol>

            <div
              aria-hidden="true"
              className="mt-6 h-px w-full"
              style={{ background: "var(--color-trait)" }}
            >
              <span
                className="block h-px bg-accent"
                style={{
                  width: `${Math.round(progression * 100)}%`,
                  transition: "width 120ms linear",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
