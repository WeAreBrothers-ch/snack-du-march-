/**
 * La carte : les trois lignes du titre montent, puis s'écartent comme deux
 * battants pendant que le carrousel des plats s'ouvre entre elles.
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @returns {() => void} fonction de nettoyage (détruit le carrousel)
 */
export function initCarte(outils) {
  const { gsap, SplitText } = outils;

  const lignes = elements(".carte__ligne");
  const mots = decouperEnLignes(SplitText, elements(".carte__mot"));
  const vignettes = elements(".carte__vignette");
  const carrousel = element(".carrousel");
  const cadre = element(".carrousel__cadre");
  const texte = decouperEnLignes(SplitText, element(".carrousel__texte"));
  const boutons = elements(".carrousel__bouton");

  gsap.set(carrousel, { autoAlpha: 0 });

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".carte",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(mots.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.1 })
    .fromTo(
      vignettes,
      { clipPath: "inset(0% 50% 0% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.1, ease: "power3.inOut" },
      "<0.2",
    );

  // Les lignes s'écartent, le carrousel s'ouvre depuis le centre.
  gsap
    .timeline({
      scrollTrigger: { trigger: ".carte", start: "top top", end: "35% top", scrub: 1 },
    })
    .to([lignes[0], lignes[2]], { xPercent: 70, autoAlpha: 0, ease: "none" })
    .to(lignes[1], { xPercent: -70, autoAlpha: 0, ease: "none" }, "<")
    .to(carrousel, { autoAlpha: 1, duration: 0.1, ease: "none" }, "-=0.25")
    .fromTo(
      cadre,
      { clipPath: "inset(0% 50% 0% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
      "<",
    );

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".carte",
        start: "22% top",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 })
    .fromTo(boutons, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, "<0.2");

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
