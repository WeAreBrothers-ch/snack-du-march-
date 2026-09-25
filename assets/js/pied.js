/**
 * Le pied de page : le panneau bordeaux monte avec un bord en biais, comme
 * celui de l'anatomie ; le nom monte en géant depuis le bas au rythme du
 * défilement, et le ticket d'adresse vient se poser dessus.
 */

import { element, elements } from "./lib.js";

/** @param {import("./lib.js").Outils} outils */
export function initPied(outils) {
  const { gsap } = outils;

  gsap.fromTo(
    ".pied",
    { "--biais": () => `${Math.round(window.innerWidth * 0.3)}px` },
    {
      "--biais": "0px",
      ease: "none",
      scrollTrigger: { trigger: ".pied", start: "top bottom", end: "top 40%", scrub: true, invalidateOnRefresh: true },
    },
  );

  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: ".pied", start: "top 85%", end: "top 25%", scrub: 0.6 },
    })
    .fromTo(elements(".pied__ligne"), { yPercent: 110 }, { yPercent: 0, stagger: 0.25, duration: 1, ease: "power2.out" })
    .fromTo(
      element("[data-pied-carte]"),
      { autoAlpha: 0, yPercent: -60 },
      { autoAlpha: 1, yPercent: 0, duration: 0.8, ease: "power2.out" },
      0.55,
    );

  gsap.fromTo(
    elements(".pied__bas > *"),
    { autoAlpha: 0, y: 14 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pied__bas", start: "top 98%", toggleActions: "play none none reverse" },
    },
  );
}
