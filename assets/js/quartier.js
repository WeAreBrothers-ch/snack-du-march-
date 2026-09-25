/**
 * Le quartier et les prix : le grand texte craie se dévoile de haut en bas
 * par-dessus sa copie bordeaux, au rythme du défilement. Les photos et les
 * papiers d'avis se posent quand on arrive dessus.
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initQuartier(outils, bureau) {
  const { gsap } = outils;

  gsap.fromTo(
    "[data-quartier-devant]",
    { clipPath: "inset(0% 0% 100% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".quartier",
        start: bureau ? "top 5%" : "top 40%",
        end: bureau ? "100% 90%" : "100% 80%",
        scrub: 1,
      },
    },
  );

  elements(".quartier__photo, .papier").forEach((bloc) => {
    gsap.fromTo(
      bloc,
      { autoAlpha: 0, y: 48 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: bloc, start: "top 88%", toggleActions: "play none none reverse" },
      },
    );
  });
}

/** @param {import("./lib.js").Outils} outils */
export function initPrix(outils) {
  const { gsap, SplitText } = outils;
  const titre = decouperEnLignes(SplitText, element(".prix__titre"));

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".prix", start: "top 70%", toggleActions: "play none none reverse" },
    })
    .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(".prix__note", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "<0.2")
    .fromTo(elements(".tableau tr"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.6 }, "<")
    .fromTo(elements(".prix__extras li"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.6 }, "<0.3")
    .fromTo(".prix__allergies", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, "<0.2");
}
