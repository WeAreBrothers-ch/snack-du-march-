/**
 * Le haut de page.
 *
 * L'entrée : pas de rideau ni de mots qui tournent. La photo et son cadre se
 * découvrent de bas en haut, comme un store qu'on lève à l'ouverture, et les
 * deux plaques du nom apparaissent. Une seconde, et le défilement reste libre
 * dès le premier instant.
 *
 * Au défilement, la composition reste entière : les plaques et la photo
 * s'en vont chacune à sa vitesse (initHeroDefilement).
 */

import { element, elements, SCRUB } from "./lib.js";

/**
 * Crée et lance l'entrée. Les états de départ sont posés immédiatement, avant
 * que la page ne retire son masque d'attente (classe « anime »).
 *
 * Une seule idée : la photo, avec son cadre, se découvre de bas en haut ; les
 * deux plaques du nom apparaissent à son rythme. Les barres, la bordure et
 * le mur sont là dès le premier instant : ils ne bougent pas. Rien ne monte
 * à l'intérieur des plaques (un texte qui sort d'une fente laissait d'abord
 * des plaques vides).
 * @param {import("./lib.js").Outils} outils
 */
export function jouerEntree(outils) {
  const { gsap } = outils;

  const cadre = element(".hero__cadre");
  const photo = element(".hero__photo");
  const mots = elements(".hero__mot");

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .fromTo(
      cadre,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut", clearProps: "clipPath" },
      0,
    )
    .fromTo(photo, { scale: 1.18 }, { scale: 1, duration: 1.4 }, 0)
    .fromTo(mots, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.12, ease: "power2.out" }, 0.35);
}

/**
 * Quand la mise en page change après l'entrée, le haut de page retrouve son
 * état naturel sans rejouer l'animation.
 * @param {import("./lib.js").Outils} outils
 */
export function retablirHero(outils) {
  outils.gsap.set([".hero__cadre", ".hero__photo", ".hero__mot"], {
    clearProps: "all",
  });
}

/**
 * Au défilement, le haut de page s'en va comme une composition en
 * profondeur : les deux plaques s'écartent doucement de la photo (la
 * première monte, la seconde traîne), et la photo s'approche un peu dans
 * son cadre.
 * Rien ne se rassemble, rien ne change de couleur : le nom reste sur ses
 * plaques, de part et d'autre de la photo.
 * @param {import("./lib.js").Outils} outils
 */
export function initHeroDefilement(outils) {
  const { gsap } = outils;
  const parcours = { trigger: ".hero", start: "top top", end: "bottom top", scrub: SCRUB };

  gsap
    .timeline({ defaults: { ease: "none" }, scrollTrigger: parcours })
    .fromTo(".hero__mot--gauche", { y: 0 }, { y: () => -window.innerHeight * 0.1 }, 0)
    .fromTo(".hero__mot--droite", { y: 0 }, { y: () => window.innerHeight * 0.06 }, 0)
    // Pas de rendu immédiat : l'entrée anime déjà l'échelle de la photo.
    .fromTo(".hero__photo", { scale: 1 }, { scale: 1.12, immediateRender: false }, 0);
}
