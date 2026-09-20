/**
 * La broche : l'accroche et l'aperçu apparaissent, puis, en défilant,
 * l'aperçu se rétracte pendant que le panneau noir de l'anatomie s'ouvre.
 * L'étoile rouge et le sandwich surgissent, les ingrédients s'égrènent,
 * et le sandwich se met à flotter.
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initBroche(outils, bureau) {
  const { gsap, SplitText } = outils;

  const accroche = decouperEnLignes(SplitText, element(".broche__accroche"));
  const apercu = element(".broche__apercu");
  const apercuImage = element("img", apercu);
  const sandwich = element(".anatomie__sandwich");
  const etoile = element(".anatomie__etoile");

  const flotteApercu = boucleFlottante(gsap, apercu, 24);
  const flotteSandwich = boucleFlottante(gsap, sandwich, bureau ? 24 : 16);

  const avant = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".broche",
      start: "top 50%",
      end: "bottom bottom",
      toggleActions: "play complete none reverse",
    },
  });

  avant
    .from(accroche.lines, { y: 150, stagger: 0.1 })
    .from(apercuImage, { scale: 0.5, opacity: 0 }, "<0.1")
    .add(() => flotteApercu.play());

  const ouverture = gsap.timeline({
    scrollTrigger: {
      trigger: ".broche",
      start: bureau ? "20% 10%" : "20% top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  ouverture
    .to(apercu, { scale: 0, duration: 1 })
    .fromTo(
      ".anatomie",
      { clipPath: "polygon(60% 0, 60% 0, 40% 100%, 40% 100%)" },
      { clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)", ease: "none", duration: 1 },
      bureau ? "<0.2" : "<0.1",
    )
    .from(etoile, { scale: 0, opacity: 0 }, "<0.6")
    .from(sandwich, { scale: 0, opacity: 0 }, bureau ? "<0.1" : "<0.2")
    .add(() => flotteSandwich.play());

  gsap.timeline({
    scrollTrigger: {
      trigger: ".broche",
      start: "50% 20%",
      end: "bottom bottom",
      toggleActions: "play complete none reverse",
    },
  })
    .from(elements('[data-liste="gauche"] li'), { opacity: 0, stagger: { each: 0.1, from: "start" } })
    .from(elements('[data-liste="droite"] li'), { opacity: 0, stagger: { each: 0.1, from: "end" } }, "<");
}

/**
 * Un lent va-et-vient vertical, en pause tant qu'on ne le lance pas.
 * @param {any} gsap
 * @param {HTMLElement} cible
 * @param {number} amplitude en pixels
 */
function boucleFlottante(gsap, cible, amplitude) {
  return gsap
    .timeline({ delay: 3, repeat: -1, yoyo: true, paused: true })
    .to(cible, { y: -amplitude, duration: 1, ease: "power1.inOut" });
}
