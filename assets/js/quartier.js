/**
 * Le quartier et les prix : le grand texte noir se dévoile de haut en bas
 * par-dessus sa copie caramel, au rythme du défilement. Les photos et les
 * petits papiers d'avis se posent quand on arrive dessus.
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initQuartier(outils, bureau) {
  const { gsap } = outils;

  gsap.timeline({
    scrollTrigger: {
      trigger: ".quartier",
      start: bureau ? "top 5%" : "top 40%",
      end: bureau ? "100% 90%" : "100% 80%",
      scrub: 1,
    },
  }).fromTo(
    "[data-quartier-devant]",
    { clipPath: "inset(0% 0% 100% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
  );

  elements(".quartier__photo").forEach((photo) => {
    gsap.from(photo, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: photo, start: "top 85%", toggleActions: "play complete none none" },
    });
  });

  elements(".papier").forEach((papier) => {
    gsap.from(papier, {
      scale: 0.6,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: papier, start: "top 85%", toggleActions: "play complete none none" },
    });
  });
}

/** @param {import("./lib.js").Outils} outils */
export function initPrix(outils) {
  const { gsap, SplitText } = outils;
  const titre = decouperEnLignes(SplitText, element(".prix__titre"));

  gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: { trigger: ".prix", start: "top 70%", toggleActions: "play complete none none" },
  })
    .from(titre.lines, { y: 120, stagger: 0.1 })
    .from(".prix__note", { y: 30, opacity: 0, duration: 0.8 }, "<0.2")
    .from(elements(".tableau tr"), { y: 24, opacity: 0, stagger: 0.06, duration: 0.7 }, "<")
    .from(elements(".prix__extras li"), { y: 20, opacity: 0, stagger: 0.05, duration: 0.6 }, "<0.3")
    .from(".prix__allergies", { opacity: 0, duration: 0.8 }, "<0.2");
}
