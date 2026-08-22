"use client";

import { useCallback, useState } from "react";
import { Linogravure } from "@/components/illustrations";
import { CARTE } from "@/lib/carte";
import type { CleIllustration, Plat } from "@/lib/types";
import { LigneCarte } from "./LigneCarte";
import { PanneauPlat } from "./PanneauPlat";

/**
 * La carte en deux colonnes, traitée comme un objet imprimé (réf. R03).
 * Chaque catégorie porte sa linogravure dans le blanc du bas de colonne.
 */
export function CarteInteractive() {
  const [platOuvert, setPlatOuvert] = useState<Plat | null>(null);
  const [illustrationOuverte, setIllustrationOuverte] = useState<CleIllustration>("pain");

  const ouvrir = useCallback((plat: Plat, illustration: CleIllustration): void => {
    setPlatOuvert(plat);
    setIllustrationOuverte(illustration);
  }, []);

  const fermer = useCallback((): void => setPlatOuvert(null), []);

  return (
    <>
      <div className="carte-grille grid gap-x-[var(--gouttiere)] gap-y-8 lg:grid-cols-2">
        {CARTE.map((categorie) => (
          <section
            key={categorie.id}
            id={categorie.id}
            className="flex flex-col break-inside-avoid"
          >
            <h2 className="t-d2 border-b-2 border-texte pb-4">{categorie.titre}</h2>
            {categorie.note !== undefined && (
              <p className="micro pt-3">{categorie.note}</p>
            )}

            <div className="liste-filets">
              {categorie.plats.map((plat) => (
                <LigneCarte
                  key={plat.id}
                  plat={plat}
                  onOuvrir={(choisi) => ouvrir(choisi, categorie.illustration)}
                />
              ))}
            </div>

            <div className="mt-auto flex justify-end pt-12" aria-hidden="true">
              <Linogravure
                cle={categorie.illustration}
                className="h-auto w-24 text-texte opacity-40"
              />
            </div>
          </section>
        ))}
      </div>

      <PanneauPlat
        plat={platOuvert}
        illustration={illustrationOuverte}
        onFermer={fermer}
      />
    </>
  );
}
