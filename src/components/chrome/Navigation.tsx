"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BadgeStatut } from "./BadgeStatut";
import { LIENS_PRINCIPAUX } from "./liens";
import { MAISON } from "@/lib/infos";

/**
 * Navigation sur une ligne, sans aucun filet : ni séparateurs verticaux entre
 * les entrées, ni trait sous la barre. Le fond opaque suffit à la détacher.
 * Elle est collante, elle ne se cache pas, ne rétrécit pas, ne change pas
 * de couleur — §10, « ce qui ne bouge pas ».
 */
export function Navigation() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (evenement: KeyboardEvent): void => {
      if (evenement.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", surTouche);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = "";
    };
  }, [ouvert]);

  return (
    <header className="surface-fond sticky top-0 z-50">
      <nav aria-label="Navigation principale" className="shell">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display text-[0.95rem] uppercase tracking-[0.14em]"
            style={{ fontVariationSettings: '"wght" 700, "wdth" 88' }}
          >
            {MAISON.nom}
          </Link>

          <ul className="hidden items-center lg:flex">
            {LIENS_PRINCIPAUX.map((lien) => (
              <li key={lien.href} className="px-5 first:pl-0">
                <Link
                  href={lien.href}
                  className={`kicker lien ${chemin === lien.href ? "lien--actif" : ""}`}
                  style={{ color: chemin === lien.href ? "var(--color-texte)" : undefined }}
                  aria-current={chemin === lien.href ? "page" : undefined}
                >
                  {lien.libelle}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <BadgeStatut className="min-w-[168px] justify-end" />
            <a href={`tel:${MAISON.telephone}`} className="btn py-3">
              Appeler
            </a>
          </div>

          <button
            type="button"
            className="pill pill--etape lg:hidden"
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            onClick={() => setOuvert((etat) => !etat)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        hidden={!ouvert}
        className="surface-fond fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto lg:hidden"
      >
        <div className="shell flex min-h-full flex-col justify-between py-7">
          <ul className="liste-filets">
            {LIENS_PRINCIPAUX.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="t-d2 block py-5"
                  onClick={() => setOuvert(false)}
                >
                  {lien.libelle}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-5">
            <BadgeStatut />
            <a href={`tel:${MAISON.telephone}`} className="btn btn--braise">
              Appeler le {MAISON.telephoneAffiche}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
