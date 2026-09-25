/**
 * Le pied de page : le nom monte en géant depuis le bas, ligne après ligne,
 * et le ticket d'adresse vient se poser dessus.
 */

import { element, elements } from "./lib.js";

/** @param {import("./lib.js").Outils} outils */
export function initPied(outils) {
  const { gsap } = outils;

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".pied",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(elements(".pied__ligne"), { yPercent: 120 }, { yPercent: 0, stagger: 0.1, duration: 1 })
    .fromTo(element("[data-pied-carte]"), { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.9 }, "<0.35")
    .fromTo(elements(".pied__bas > *"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.6 }, "<0.3");
}
