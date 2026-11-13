/**
 * Le haut de page.
 *
 * L'entrée : pas de rideau ni de mots qui tournent. La photo et son cadre se
 * découvrent de bas en haut, comme un store qu'on lève à l'ouverture, et les
 * deux plaques du nom apparaissent. Une seconde, et le défilement reste libre
 * dès le premier instant.
 *
 * Une fois en place, le haut de page vit : le mur s'approche très
 * lentement (CSS), et la photo change de plat (initHeroPhotos). Au
 * défilement, la composition reste entière : les plaques et la photo s'en
 * vont chacune à sa vitesse (initHeroDefilement).
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
    // Le mur se pose : un léger recul, bordures comprises.
    .fromTo(".hero__mur", { scale: 1.14 }, { scale: 1, duration: 1.9, ease: "power2.out", clearProps: "transform" }, 0)
    .fromTo(
      cadre,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut", clearProps: "clipPath" },
      0.1,
    )
    .fromTo(photo, { scale: 1.18 }, { scale: 1, duration: 1.4 }, 0.1)
    // Les plaques s'ouvrent depuis leur milieu, comme une enseigne qu'on
    // déroule : « Snack du » d'abord, « Marché » juste après.
    .fromTo(
      mots,
      { clipPath: "inset(0% 50% 0% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.16, ease: "power3.inOut", clearProps: "clipPath" },
      0.45,
    )
    // La barre du bas (ouvert, adresse, carte) monte une fois le décor en
    // place.
    .fromTo(
      ".hero__bas > *",
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, clearProps: "opacity,visibility,transform" },
      1.1,
    );
}

/**
 * Quand la mise en page change après l'entrée, le haut de page retrouve son
 * état naturel sans rejouer l'animation.
 * @param {import("./lib.js").Outils} outils
 */
export function retablirHero(outils) {
  outils.gsap.set([".hero__mur", ".hero__cadre", ".hero__photo", ".hero__mot", ".hero__bas > *"], {
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
    .fromTo(".hero__cadre", { y: 0 }, { y: () => window.innerHeight * 0.05, immediateRender: false }, 0);
}

/**
 * La photo du cadre change de plat toutes les quelques secondes : le
 * comptoir, l'assiette, le sandwich, puis le dürüm du départ. Chaque plat se
 * découvre de bas en haut, comme à l'entrée, et recule un peu dans son
 * cadre. Le cycle s'arrête quand le haut de page n'est plus à l'écran. Les
 * photos suivantes ne sont chargées qu'une fois la page installée.
 * @param {import("./lib.js").Outils} outils
 */
export function initHeroPhotos(outils) {
  const { gsap, ScrollTrigger } = outils;
  const suite = elements(".hero__photo--suite");
  if (suite.length === 0) return;

  suite.forEach((image) => {
    if (!image.getAttribute("src") && image.dataset.src) image.setAttribute("src", image.dataset.src);
  });

  const cache = "inset(100% 0% 0% 0%)";
  const cycle = gsap.timeline({ repeat: -1, paused: true });
  // À chaque tour, tout repart de zéro : le dernier plat est le premier.
  cycle.set(suite, { clipPath: cache, scale: 1.15 }, 0);
  suite.forEach((image, rang) => {
    const debut = 3.4 + rang * 4.4;
    cycle
      .to(image, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, debut)
      .to(image, { scale: 1, duration: 1.8, ease: "power2.out" }, debut);
  });
  cycle.to({}, { duration: 3.4 });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top bottom",
    end: "bottom top",
    onToggle: (/** @type {any} */ declencheur) => (declencheur.isActive ? cycle.play() : cycle.pause()),
  });
}
