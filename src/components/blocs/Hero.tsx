import Image from "next/image";
import { Bouton } from "@/components/primitives/Bouton";
import { MAISON } from "@/lib/infos";
import { PHOTOS } from "@/lib/photos";

const FAITS = ["Broche montée à la main", "Veau & agneau entiers", "Marinée 24 h"];

/**
 * Hero pleine hauteur : la typographie occupe la gauche, la photo une colonne
 * verticale qui déborde du bord droit de l'écran.
 *
 * Le plein écran a été essayé et abandonné pour une raison mesurable : les
 * photographies de la maison font au mieux 1 125 px de large. En fond
 * d'écran sur un grand moniteur, elles sont agrandies de 2× et recadrées en
 * bandeau — l'image devient floue et le sujet disparaît. Dans cette colonne,
 * la même photo est *réduite* : elle reste nette à toutes les tailles.
 *
 * Le jour où la maison fournit une vraie photo large en haute définition, ce
 * composant peut redevenir un plein écran sans rien changer d'autre.
 */
export function Hero() {
  return (
    <section
      className="relative"
      style={{ minHeight: "calc(100svh - 4rem)" }}
    >
      {/* La colonne image déborde du bord droit : pas de marge, pas de cadre. */}
      <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <Image
          src={PHOTOS.devantureNuit.src}
          alt={PHOTOS.devantureNuit.sujet}
          fill
          sizes="42vw"
          priority
          className="object-cover"
          style={{ objectPosition: "center 45%" }}
        />
      </div>

      <div className="grille-visible relative flex h-full min-h-[inherit] items-center">
        <div className="shell grille w-full items-center gap-y-8 py-10 lg:py-14">
          <div className="col-span-4 sm:col-span-6 lg:col-span-6">
            <p className="kicker">
              Lausanne · {MAISON.adresse.rue} · Depuis {MAISON.fondation}
            </p>

            <h1 className="t-hero mt-4" style={{ fontSize: "clamp(3.4rem, 17vw, 11rem)" }}>
              {MAISON.nom}
            </h1>

            <p className="t-lead mt-6 max-w-[32ch]">
              Broche maison, veau et agneau. Recettes de <em>Gaziantep</em>, comptoir de
              la Riponne.
            </p>

            <ul className="liste-filets mt-7 max-w-[32ch] border-t border-trait">
              {FAITS.map((fait) => (
                <li key={fait} className="micro py-2">
                  {fait}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Bouton href="/la-carte">Voir la carte</Bouton>
              <Bouton href="/traiteur" variante="braise">
                Le traiteur
              </Bouton>
            </div>
          </div>

          {/* Sur mobile, la colonne passe sous le texte, au format portrait. */}
          <div className="relative col-span-4 aspect-[4/5] sm:col-span-6 lg:hidden">
            <Image
              src={PHOTOS.devantureNuit.src}
              alt={PHOTOS.devantureNuit.sujet}
              fill
              sizes="100vw"
              priority
              className="object-cover"
              style={{ objectPosition: "center 45%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
