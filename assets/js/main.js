/**
 * Point d'entrée unique du site.
 *
 * Deux régimes :
 * - animé : GSAP, ScrollTrigger, SplitText, Lenis et Swiper sont là, le
 *   visiteur n'a pas demandé moins d'animations → l'expérience complète ;
 * - statique : une librairie manque, le système demande moins de mouvement
 *   ou le filet de sécurité d'index.html s'est déclenché → tout est visible
 *   d'emblée, le menu, la pastille horaire et la planche fonctionnent.
 */

import { chargerLibrairies } from "./lib.js";
import { initDefilement, rejoindreAncre } from "./defilement.js";
import { initHoraires } from "./horaires.js";
import { initMenu, initTitreOnglet } from "./menu.js";
import { jouerEntree, retablirHero } from "./hero.js";
import { initHistoire } from "./histoire.js";
import { initBroche } from "./broche.js";
import { initPlanche } from "./planche.js";
import { initCarte } from "./carte.js";
import { initQuartier, initPrix } from "./quartier.js";
import { initPied } from "./pied.js";
import { restaurerDecoupes } from "./texte.js";

const BUREAU = "(min-width: 992px)";
const MOBILE = "(max-width: 991px)";
const racine = document.documentElement;

/** Bascule le site en régime statique. */
function passerEnStatique() {
  racine.classList.add("statique");
  initMenu(null);
  initPlanche();
}

/**
 * @param {import("./lib.js").Outils} outils
 */
function demarrerAnime(outils) {
  const { gsap, ScrollTrigger } = outils;
  const lenis = initDefilement(outils);
  const planche = initPlanche();
  let entreeJouee = false;

  initMenu(outils, lenis);
  initTitreOnglet();

  const media = gsap.matchMedia();

  media.add({ bureau: BUREAU, mobile: MOBILE }, (contexte) => {
    const bureau = Boolean(contexte.conditions?.bureau);

    // L'entrée ne se joue qu'une fois ; si la mise en page change ensuite
    // (rotation, fenêtre redimensionnée), le haut de page reste en place.
    if (entreeJouee) {
      retablirHero(outils);
    } else {
      jouerEntree(outils);
      entreeJouee = true;
    }

    initHistoire(outils, bureau);
    initBroche(outils, planche);
    const nettoyerCarte = initCarte(outils);
    initPrix(outils);
    initQuartier(outils, bureau);
    initPied(outils);

    return () => {
      nettoyerCarte();
      restaurerDecoupes();
    };
  });

  // Les états de départ sont posés : le haut de page peut quitter son masque.
  racine.classList.add("anime");

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    rejoindreAncre(lenis);
  });
}

function demarrer() {
  initHoraires();

  const moinsDeMouvement = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (moinsDeMouvement || racine.classList.contains("statique")) {
    passerEnStatique();
    return;
  }

  /** @type {import("./lib.js").Outils} */
  let outils;
  try {
    outils = chargerLibrairies();
  } catch {
    passerEnStatique();
    return;
  }

  document.fonts.ready
    .then(() =>
      requestAnimationFrame(() => {
        // Le filet de sécurité a pu passer le site en statique pendant l'attente.
        if (racine.classList.contains("statique")) {
          passerEnStatique();
          return;
        }
        demarrerAnime(outils);
      }),
    )
    .catch(passerEnStatique);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", demarrer, { once: true });
} else {
  demarrer();
}
