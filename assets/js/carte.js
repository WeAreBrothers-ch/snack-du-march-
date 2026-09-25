/**
 * La carte : les trois lignes du titre montent et leurs vignettes s'ouvrent ;
 * tant que le titre est à l'écran, ses lignes glissent en sens contraires au
 * rythme du défilement. Puis le texte, les plats et les flèches du carrousel
 * arrivent à leur tour. Le carrousel se feuillette au doigt (Swiper).
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @returns {() => void} fonction de nettoyage (détruit le carrousel)
 */
export function initCarte(outils) {
  const { gsap, SplitText } = outils;

  const mots = decouperEnLignes(SplitText, elements(".carte__mot"));
  const vignettes = elements(".carte__vignette");
  const texte = decouperEnLignes(SplitText, element(".carrousel__texte"));
  const cadre = element(".carrousel__cadre");
  const boutons = elements(".carrousel__bouton");

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".carte__titre", start: "top 75%", toggleActions: "play none none reverse" },
    })
    .fromTo(mots.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.1 })
    .fromTo(
      vignettes,
      { clipPath: "inset(0% 50% 0% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.1, ease: "power3.inOut" },
      "<0.2",
    );

  elements(".carte__ligne").forEach((ligne, index) => {
    const sens = index % 2 === 0 ? 1 : -1;
    gsap.fromTo(
      ligne,
      { x: () => sens * window.innerWidth * 0.1 },
      {
        x: () => -sens * window.innerWidth * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".carte__titre",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".carrousel", start: "top 80%", toggleActions: "play none none reverse" },
    })
    .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 })
    .fromTo(cadre, { autoAlpha: 0, x: 48 }, { autoAlpha: 1, x: 0, duration: 1 }, "<0.15")
    .fromTo(boutons, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, "<0.3");

  const glisseur = initGlisseur(outils, cadre, boutons[0], boutons[1]);
  return () => glisseur.destroy(true, true);
}

/**
 * @param {import("./lib.js").Outils} outils
 * @param {HTMLElement} cadre
 * @param {HTMLElement} precedent
 * @param {HTMLElement} suivant
 */
function initGlisseur(outils, cadre, precedent, suivant) {
  return new outils.Swiper(cadre, {
    wrapperClass: "carrousel__piste",
    slideClass: "plat",
    loop: true,
    speed: 500,
    grabCursor: true,
    navigation: { nextEl: suivant, prevEl: precedent },
    breakpoints: {
      320: { slidesPerView: 1.3, spaceBetween: 12 },
      560: { slidesPerView: 2.2, spaceBetween: 16 },
      992: { slidesPerView: 3.25, spaceBetween: 24 },
      1440: { slidesPerView: 4.25, spaceBetween: 28 },
    },
  });
}
