/**
 * Point d'entrée unique du site. Il n'y a rien d'autre à charger :
 * chaque module expose une fonction d'initialisation, appelée ici.
 */

import { initEdition } from "./edition.js";
import { initReveal } from "./reveal.js";
import { initImpression } from "./impression.js";

/** Lance tous les comportements de la page. */
function demarrer() {
  initEdition();
  initReveal();
  initImpression();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", demarrer, { once: true });
} else {
  demarrer();
}
