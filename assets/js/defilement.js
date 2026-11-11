/**
 * Le défilement lissé (Lenis) et les liens d'ancre.
 * Lenis remplace le défilement natif par un mouvement amorti ; ScrollTrigger
 * est prévenu à chaque image pour rester synchronisé.
 */

import { elements } from "./lib.js";

/** Vrai sur un écran tactile (téléphone, tablette) : le défilement y reste natif. */
const AU_DOIGT = window.matchMedia("(pointer: coarse)").matches;

/**
 * Un défilement natif qui répond comme Lenis (scrollTo, stop, start). Au
 * doigt, le défilement du système est déjà fluide et porté par le processeur
 * graphique ; le remplacer par un défilement en JavaScript n'apporterait que
 * du travail en plus, et des à-coups quand la barre d'adresse se replie.
 */
function defilementNatif() {
  const racine = document.documentElement;
  const natif = {
    isStopped: false,
    /**
     * @param {HTMLElement} cible
     * @param {{ offset?: number, immediate?: boolean }} [options]
     */
    scrollTo(cible, options = {}) {
      const haut = cible.getBoundingClientRect().top + window.scrollY + (options.offset || 0);
      window.scrollTo({ top: haut, behavior: options.immediate ? "instant" : "smooth" });
    },
    stop() {
      natif.isStopped = true;
      racine.classList.add("verrou");
    },
    start() {
      natif.isStopped = false;
      racine.classList.remove("verrou");
    },
  };
  return natif;
}

/**
 * @param {import("./lib.js").Outils} outils
 * @returns {any} l'instance Lenis (à la souris) ou un défilement natif (au doigt)
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

  if (AU_DOIGT || !Lenis) {
    const natif = defilementNatif();
    initAncres(natif);
    return natif;
  }

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
