/**
 * Le haut de page.
 *
 * L'entrée : pas de rideau ni de mots qui tournent. La photo et son cadre se
 * découvrent de bas en haut, comme un store qu'on lève à l'ouverture, et les
 * deux plaques du nom apparaissent. Une seconde, et le défilement reste libre
 * dès le premier instant.
 *
 * Une fois en place, le mur s'approche très lentement (CSS). Au défilement,
 * le haut de page reste épinglé et se joue comme une scène (initHeroDefilement).
 */

import { element, elements, positionDans, SCRUB } from "./lib.js";

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
 * La scène du défilement. Le hero reste épinglé (CSS) pendant plus d'un
 * écran de défilement, et tout est lié au doigt :
 * - les deux plaques du nom sortent chacune de son côté ;
 * - la photo grandit jusqu'à remplir le haut de page (tout l'écran sur
 *   téléphone ; sur grand écran, toute la hauteur) ;
 * - pendant qu'elle grandit, elle change de plat : le comptoir, l'assiette,
 *   le sandwich, chacun se découvrant de bas en haut comme à l'entrée ;
 * - le mur de faïence s'approche.
 * Les barres cobalt du haut et du bas restent : le plat grandit derrière,
 * comme une vitrine qu'on approche.
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initHeroDefilement(outils, bureau) {
  const { gsap } = outils;

  const hero = element(".hero");
  const cadre = element(".hero__cadre");
  const suite = elements(".hero__photo--suite");

  // Les plats suivants se chargent maintenant (et non au premier affichage :
  // ils ne disputent pas le réseau à la première photo).
  suite.forEach((image) => {
    if (!image.getAttribute("src") && image.dataset.src) image.setAttribute("src", image.dataset.src);
  });

  /**
   * L'échelle d'arrivée et le décalage qui amène le centre de la photo au
   * centre du haut de page, mesurés sur la mise en page (sans les
   * transformations en cours), une seule fois par état de la page.
   * @type {{ echelle: number, y: number } | null}
   */
  let mesure = null;
  let cle = "";
  function mesurer() {
    const courante = `${hero.offsetWidth}x${hero.offsetHeight}x${window.innerHeight}`;
    if (!mesure || cle !== courante) {
      const largeur = hero.offsetWidth;
      const hauteur = hero.offsetHeight;
      const position = positionDans(cadre, hero);
      const couvrir = Math.max(largeur / cadre.offsetWidth, hauteur / cadre.offsetHeight) * 1.02;
      const remplir = Math.min(largeur / cadre.offsetWidth, hauteur / cadre.offsetHeight);
      mesure = {
        echelle: bureau ? remplir : couvrir,
        y: hauteur / 2 - (position.y + cadre.offsetHeight / 2),
      };
      cle = courante;
    }
    return mesure;
  }

  const scene = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".accueil",
      start: "top top",
      end: "bottom bottom",
      scrub: SCRUB,
      invalidateOnRefresh: true,
      onRefreshInit: () => {
        mesure = null;
      },
    },
  });

  // Les plaques sortent, chacune de son côté.
  scene
    .to(".hero__mot--gauche", { x: () => -window.innerWidth * 1.1, duration: 0.4, ease: "power2.in" }, 0.02)
    .to(".hero__mot--droite", { x: () => window.innerWidth * 1.1, duration: 0.4, ease: "power2.in" }, 0.06);

  // Le mur s'approche.
  scene.fromTo(".hero__mur", { scale: 1 }, { scale: 1.35, duration: 1, immediateRender: false }, 0);

  // La photo grandit, jusqu'à remplir le haut de page.
  scene.fromTo(
    cadre,
    { scale: 1, y: 0, transformOrigin: "50% 50%" },
    {
      scale: () => mesurer().echelle,
      y: () => mesurer().y,
      transformOrigin: "50% 50%",
      duration: 0.78,
      ease: "power2.inOut",
    },
    0.1,
  );

  // Et change de plat en grandissant.
  suite.forEach((image, rang) => {
    const debut = 0.22 + rang * 0.17;
    scene
      .fromTo(
        image,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.15, ease: "power2.inOut" },
        debut,
      )
      .fromTo(image, { scale: 1.2 }, { scale: 1, duration: 0.2, ease: "power2.out" }, debut);
  });

  // Un temps d'arrêt sur le dernier plat, avant que la page ne reparte.
  scene.to({}, { duration: 0.08 });
}
