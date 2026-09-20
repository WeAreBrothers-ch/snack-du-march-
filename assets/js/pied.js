/**
 * Le pied de page : le nom monte en géant depuis le bas, ligne après ligne,
 * et le ticket d'adresse surgit au centre.
 */

import { element, elements } from "./lib.js";

/** @param {import("./lib.js").Outils} outils */
export function initPied(outils) {
  const { gsap } = outils;

  gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".pied",
      start: "top 20%",
      end: "bottom 80%",
      toggleActions: "play complete none none",
    },
  })
    .from(element("[data-pied-carte]"), { scale: 0, duration: 0.8, ease: "back.out(1.4)" })
    .from(elements(".pied__ligne"), { yPercent: 150, stagger: 0.1, duration: 1 }, "<")
    .from(elements(".pied__bas > *"), { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, "<0.4");
}
