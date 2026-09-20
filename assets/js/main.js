/**
 * Point d'entrée unique du site.
 *
 * Deux régimes :
 * - animé : GSAP, ScrollTrigger, SplitText, Lenis et Swiper sont là, le
 *   visiteur n'a pas demandé moins d'animations → l'expérience complète ;
 * - statique : une librairie manque ou le système demande moins de mouvement
 *   → tout est visible d'emblée, le menu et la pastille horaire fonctionnent.
 */

import { chargerLibrairies } from "./lib.js";
import { initDefilement, remonterEnHaut } from "./defilement.js";
import { initHoraires } from "./horaires.js";
import { initMenu, initTitreOnglet } from "./menu.js";
import { jouerOuverture, retablirHero } from "./rideau.js";
import { initHistoire } from "./histoire.js";
import { initBroche } from "./broche.js";
import { initCarte } from "./carte.js";
import { initQuartier, initPrix } from "./quartier.js";
import { initPied } from "./pied.js";
import { restaurerDecoupes } from "./texte.js";

const BUREAU = "(min-width: 992px)";
const MOBILE = "(max-width: 991px)";

/** Bascule le site en régime statique. */
function passerEnStatique() {
  document.documentElement.classList.add("statique");
  initMenu(null);
}

/**
 * @param {import("./lib.js").Outils} outils
 */
function demarrerAnime(outils) {
  const { gsap, ScrollTrigger } = outils;
  const lenis = initDefilement(outils);
  let ouvertureJouee = false;

  initMenu(outils, lenis);
  initTitreOnglet();

  const media = gsap.matchMedia();

  media.add({ bureau: BUREAU, mobile: MOBILE }, (contexte) => {
    const bureau = Boolean(contexte.conditions?.bureau);

    /** Relance le défilement et cale ScrollTrigger une fois le hero en place. */
    function lancer() {
      lenis.start();
      remonterEnHaut(lenis, outils);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    if (ouvertureJouee) {
      retablirHero(outils);
      lenis.start();
    } else {
      lenis.stop();
      remonterEnHaut(lenis, outils);
      jouerOuverture(outils, {
        bureau,
        quandTermine: () => {
          ouvertureJouee = true;
          lancer();
        },
      });
    }

    initHistoire(outils, bureau);
    initBroche(outils, bureau);
    const nettoyerCarte = initCarte(outils);
    initPrix(outils);
    initQuartier(outils, bureau);
    initPied(outils);

    return () => {
      nettoyerCarte();
      restaurerDecoupes();
    };
  });
}

function demarrer() {
  initHoraires();

  const moinsDeMouvement = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (moinsDeMouvement) {
    passerEnStatique();
    return;
  }

  try {
    const outils = chargerLibrairies();
    document.fonts.ready
      .then(() => requestAnimationFrame(() => demarrerAnime(outils)))
      .catch(passerEnStatique);
  } catch {
    passerEnStatique();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", demarrer, { once: true });
} else {
  demarrer();
}
