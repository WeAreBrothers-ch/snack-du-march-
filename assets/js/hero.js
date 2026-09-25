/**
 * L'entrée du haut de page. Pas de rideau ni de mots qui tournent : la photo
 * se découvre de bas en haut, comme un store qu'on lève à l'ouverture, et le
 * nom monte de part et d'autre. Une seconde et demie, et le défilement reste
 * libre dès le premier instant.
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * Crée et lance l'entrée. Les états de départ sont posés immédiatement, avant
 * que la page ne retire son masque d'attente (classe « anime »).
 * @param {import("./lib.js").Outils} outils
 */
export function jouerEntree(outils) {
  const { gsap, SplitText } = outils;

  const image = element(".hero__image");
  const photo = element(".hero__photo");
  const nom = decouperEnLignes(SplitText, elements(".hero__mot"));
  const bandeaux = elements(".hero__haut, .hero__bas");

  gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .fromTo(
      image,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
    )
    .fromTo(photo, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: "power3.out" }, "<")
    .fromTo(nom.lines, { yPercent: 120 }, { yPercent: 0, duration: 1, stagger: 0.08 }, "<0.3")
    .fromTo(
      bandeaux,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" },
      "<0.35",
    );
}

/**
 * Quand la mise en page change après l'entrée, le haut de page retrouve son
 * état naturel sans rejouer l'animation.
 * @param {import("./lib.js").Outils} outils
 */
export function retablirHero(outils) {
  outils.gsap.set([".hero__haut", ".hero__bas", ".hero__image", ".hero__photo"], {
    clearProps: "all",
  });
}
