/**
 * Le défilement lissé (Lenis), la barre de progression et les liens d'ancre.
 * Lenis remplace le défilement natif par un mouvement amorti ; ScrollTrigger
 * est prévenu à chaque image pour rester synchronisé.
 */

import { element, elements } from "./lib.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @returns {any} l'instance Lenis, arrêtée (le rideau la relance)
 */
export function initDefilement(outils) {
  const { gsap, ScrollTrigger, Lenis } = outils;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  const lenis = new Lenis({
    duration: 1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 0.9,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((temps) => {
    lenis.raf(temps * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  lenis.stop();

  initProgression(outils);
  initAncres(lenis);

  return lenis;
}

/**
 * Remet la page tout en haut, en forçant Lenis à suivre.
 * @param {any} lenis
 * @param {import("./lib.js").Outils} outils
 */
export function remonterEnHaut(lenis, outils) {
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);
  lenis.resize();
  lenis.scrollTo(0, { immediate: true, force: true });
  lenis.raf(performance.now());
  outils.ScrollTrigger.update();
}

/** @param {import("./lib.js").Outils} outils */
function initProgression(outils) {
  const barre = element(".progression");
  outils.ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (declencheur) => {
      outils.gsap.set(barre, { width: `${declencheur.progress * 100}%` });
    },
  });
}

/**
 * Les liens internes passent par Lenis pour glisser jusqu'à la section.
 * @param {any} lenis
 */
function initAncres(lenis) {
  elements('a[href^="#"]').forEach((lien) => {
    lien.addEventListener("click", (evenement) => {
      const cible = lien.getAttribute("href");
      if (!cible || cible === "#") return;
      const section = document.querySelector(cible);
      if (!(section instanceof HTMLElement)) return;
      evenement.preventDefault();
      lenis.scrollTo(section, { offset: 0, duration: 1.4 });
    });
  });
}
