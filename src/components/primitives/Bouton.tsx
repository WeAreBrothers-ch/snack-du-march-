import Link from "next/link";
import type { ReactNode } from "react";

export type VarianteBouton = "contour" | "braise" | "plein";

interface ProprietesBouton {
  readonly href: string;
  readonly variante?: VarianteBouton;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Les trois variantes suffisent : le bouton prend sa couleur de la surface
 * qui le porte, il n'y a donc pas de version « claire » et de version
 * « sombre » à choisir à la main.
 */
const VARIANTES: Readonly<Record<VarianteBouton, string>> = {
  contour: "btn",
  braise: "btn btn--braise",
  plein: "btn btn--plein",
};

/** Externe = tout ce qui n'est pas une route interne du site. */
function estExterne(href: string): boolean {
  return /^(https?:|tel:|mailto:)/.test(href);
}

export function Bouton({
  href,
  variante = "contour",
  className = "",
  children,
}: ProprietesBouton) {
  const classes = `${VARIANTES[variante]} ${className}`.trim();

  if (estExterne(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
