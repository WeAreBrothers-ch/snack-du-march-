/**
 * Point d'entrée unique du site.
 *
 * Deux régimes :
 * - animé : GSAP, ScrollTrigger, SplitText, Lenis et Swiper sont là, le
 *   visiteur n'a pas demandé moins d'animations → l'expérience complète ;
 * - statique : une librairie manque, le système demande moins de mouvement
 *   ou le filet de sécurité d'index.html s'est déclenché → tout est visible
 *   d'emblée, le menu, la pastille horaire et la planche fonctionnent.
 *
 * Sur un réseau lent, le haut de page s'affiche sans attendre (classe
 * « patience », posée par index.html) ; les animations prennent le relais
 * dès qu'elles sont prêtes, sans rejouer l'entrée.
 */

import { chargerLibrairies } from "./lib.js";
import { initDefilement, rejoindreAncre } from "./defilement.js";
import { initHoraires } from "./horaires.js";
import { initMenu, initTitreOnglet } from "./menu.js";
import { initEnseigne, jouerEntree, retablirHero } from "./hero.js";
import { initHistoire } from "./histoire.js";
import { initBroche } from "./broche.js";
import { initPlanche } from "./planche.js";
import { initCarte } from "./carte.js";
import { initQuartier, initPrix } from "./quartier.js";
import { initPied } from "./pied.js";
import { restaurerDecoupes } from "./texte.js";

const BUREAU = "(min-width: 992px)";
const MOBILE = "(max-width: 991px)";
/** Au-delà, on n'attend plus les polices pour démarrer (réseau lent). */
const ATTENTE_POLICES = 2500;
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
  // Si le haut de page s'est déjà affiché (réseau lent), son entrée ne se
  // joue pas : on ne cache pas ce qui est déjà lu.
  let entreeJouee = racine.classList.contains("patience");

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

    initEnseigne(outils);
    initHistoire(outils, bureau);
    const nettoyerBroche = initBroche(outils, bureau, planche);
    const nettoyerCarte = initCarte(outils);
    initPrix(outils);
    initQuartier(outils, bureau);
    initPied(outils);

    return () => {
      nettoyerBroche();
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

  // Des polices arrivées en retard changent les hauteurs : on remesure.
  document.fonts.ready.then(() => ScrollTrigger.refresh());
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

  const polices = Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, ATTENTE_POLICES)),
  ]);

  polices
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
