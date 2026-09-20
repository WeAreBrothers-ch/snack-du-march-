/**
 * La carte : trois lignes de titre s'ouvrent, puis s'éjectent sur les côtés
 * en tournant pendant que le carrousel des plats s'ouvre au centre.
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
  const mots = elements(".carte__mot").map((mot) => decouperEnLignes(SplitText, mot));
  const vignettes = elements(".carte__vignette");
  const carrousel = element(".carrousel");
  const cadre = element(".carrousel__cadre");
  const texte = decouperEnLignes(SplitText, element(".carrousel__texte"));
  const precedent = element("[data-carrousel-precedent]");
  const suivant = element("[data-carrousel-suivant]");

  gsap.set(carrousel, { autoAlpha: 0 });

  const entree = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".carte",
      start: "top 10%",
      end: "bottom bottom",
      toggleActions: "play complete none reverse",
    },
  });

  mots.forEach((mot, index) => {
    entree
      .from(mot.lines, { y: 150 }, index === 0 ? undefined : `<0.${index}`)
      .fromTo(
        vignettes[index],
        { clipPath: "inset(0% 50% 0% 50%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
        index === 0 ? undefined : `<0.${index}`,
      );
  });

  const ejection = gsap.timeline({
    scrollTrigger: { trigger: ".carte", start: "top top", end: "bottom bottom", scrub: 1 },
  });

  ejection
    .to(carrousel, { autoAlpha: 1, duration: 0.2 })
    .to([lignes[0], lignes[2]], { xPercent: 300, rotate: 80, scale: 0.2, duration: 1.2, ease: "none" })
    .to(lignes[1], { xPercent: -300, rotate: -80, scale: 0.2, duration: 1.2, ease: "none" }, "<")
    .fromTo(
      cadre,
      { clipPath: "inset(0% 50% 0% 50%)", scale: 0.2 },
      { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none" },
      "<0.3",
    );

  gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".carte",
      start: "60% 50%",
      end: "bottom bottom",
      toggleActions: "play complete none reverse",
    },
  })
    .from(texte.lines, { y: 50, stagger: 0.05 })
    .from(precedent, { xPercent: 80, rotate: 360, opacity: 0 }, "<0.1")
    .from(suivant, { xPercent: -80, rotate: 360, opacity: 0 }, "<");

  const glisseur = initGlisseur(outils, cadre, precedent, suivant);
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
      320: { slidesPerView: 1.25, spaceBetween: 12 },
      480: { slidesPerView: 2, spaceBetween: 16 },
      768: { slidesPerView: 2.5, spaceBetween: 16 },
      992: { slidesPerView: 3, spaceBetween: 24 },
      1440: { slidesPerView: 4, spaceBetween: 24 },
    },
  });
}
