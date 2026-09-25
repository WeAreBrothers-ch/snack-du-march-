/**
 * Le défilement lissé (Lenis), la barre de progression et les liens d'ancre.
 * Lenis remplace le défilement natif par un mouvement amorti ; ScrollTrigger
 * est prévenu à chaque image pour rester synchronisé.
 */

import { element, elements } from "./lib.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @returns {any} l'instance Lenis
 */
export function initDefilement(outils) {
  const { gsap, ScrollTrigger, Lenis } = outils;

  // Au rechargement, la page repart du haut… sauf si l'adresse vise une
  // section (un lien « #carte », par exemple) : on s'y rendra une fois tout
  // mis en place.
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  if (!window.location.hash) window.scrollTo(0, 0);

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

  initProgression(outils);
  initAncres(lenis);

  return lenis;
}

/**
 * Si l'adresse vise une section, s'y rendre sans animation.
 * @param {any} lenis
 */
export function rejoindreAncre(lenis) {
  const cible = trouverCible(window.location.hash);
  if (cible) lenis.scrollTo(cible, { immediate: true, force: true });
}

/**
 * @param {string} ancre
 * @returns {HTMLElement | null}
 */
function trouverCible(ancre) {
  if (!ancre || ancre === "#") return null;
  const cible = document.getElementById(decodeURIComponent(ancre.slice(1)));
  return cible instanceof HTMLElement ? cible : null;
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
 * Depuis le menu ouvert, le défilement est suspendu, et le menu le relance en
 * se refermant, ce qui couperait un défilement déjà parti : on attend donc
 * qu'il soit refermé pour glisser.
 * @param {any} lenis
 */
function initAncres(lenis) {
  elements('a[href^="#"]').forEach((lien) => {
    lien.addEventListener("click", (evenement) => {
      const cible = trouverCible(lien.getAttribute("href") || "");
      if (!cible) return;
      evenement.preventDefault();

      const debut = performance.now();
      const glisser = () => {
        if (lenis.isStopped && performance.now() - debut < 1000) {
          requestAnimationFrame(glisser);
          return;
        }
        lenis.scrollTo(cible, { offset: 0, duration: 1.4, force: true });
      };
      glisser();
      // Le focus suit le lien, comme avec une ancre native (clavier, lecteurs d'écran).
      if (!cible.hasAttribute("tabindex")) cible.setAttribute("tabindex", "-1");
      cible.focus({ preventScroll: true });
    });
  });
}
