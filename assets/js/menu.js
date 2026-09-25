/**
 * Le menu : un bouton flottant qui apparaît une fois le hero passé, et une
 * fiche qui glisse depuis la droite. Fonctionne aussi sans animation.
 */

import { element, elements } from "./lib.js";

/**
 * @param {import("./lib.js").Outils | null} outils  null si le site tourne sans animation
 * @param {any} [lenis]
 */
export function initMenu(outils, lenis) {
  const flottant = element(".menu-flottant");
  const panneau = element("#panneau-menu");
  const carte = element(".panneau__carte", panneau);
  const fond = element(".panneau__fond", panneau);
  const ouvreurs = elements("[data-menu-ouvrir]");
  const fermeurs = elements("[data-menu-fermer]", panneau);
  const liens = elements("[data-menu-lien]", panneau);

  /** Le bouton qui a ouvert le menu : il retrouve le focus à la fermeture. */
  /** @type {HTMLElement | null} */
  let ouvreur = null;

  /** @param {boolean} ouvert */
  function marquer(ouvert) {
    ouvreurs.forEach((bouton) => bouton.setAttribute("aria-expanded", String(ouvert)));
  }

  /** @param {Event} evenement */
  function ouvrir(evenement) {
    ouvreur = evenement.currentTarget instanceof HTMLElement ? evenement.currentTarget : null;
    panneau.hidden = false;
    marquer(true);
    lenis?.stop();
    element(".panneau__lien", panneau).focus();

    if (!outils) return;
    outils.gsap.fromTo(fond, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    outils.gsap.fromTo(
      carte,
      { xPercent: 105, rotate: 0 },
      { xPercent: 0, rotate: -2, duration: 0.55, ease: "power3.out" },
    );
  }

  /** @param {{ rendreLeFocus?: boolean }} [options] */
  function fermer({ rendreLeFocus = true } = {}) {
    marquer(false);

    const terminer = () => {
      panneau.hidden = true;
      lenis?.start();
      if (rendreLeFocus) ouvreur?.focus();
    };

    if (!outils) {
      terminer();
      return;
    }
    // La sortie est plus rapide que l'entrée : le système répond, il ne s'attarde pas.
    outils.gsap.to(fond, { opacity: 0, duration: 0.25 });
    outils.gsap.to(carte, { xPercent: 105, rotate: 0, duration: 0.3, ease: "power2.in", onComplete: terminer });
  }

  ouvreurs.forEach((bouton) => bouton.addEventListener("click", ouvrir));
  fermeurs.forEach((bouton) => bouton.addEventListener("click", () => fermer()));
  // Un lien emmène ailleurs dans la page : le focus suit le lien, pas le bouton.
  liens.forEach((lien) => lien.addEventListener("click", () => fermer({ rendreLeFocus: false })));

  document.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Escape" && !panneau.hidden) fermer();
  });

  // Le bouton flottant prend le relais une fois le haut de page passé
  // (le hero a déjà son propre bouton « Menu » et sa navigation).
  if (!outils) {
    const hero = document.querySelector(".hero");
    if (!hero || !("IntersectionObserver" in window)) {
      flottant.classList.add("est-visible");
      return;
    }
    new IntersectionObserver(([entree]) => {
      flottant.classList.toggle("est-visible", !entree.isIntersecting);
    }).observe(hero);
    return;
  }

  // Le hero reste épinglé tout le bloc d'accueil : le bouton flottant
  // attend que ce bloc s'en aille.
  outils.ScrollTrigger.create({
    trigger: ".accueil",
    start: "bottom 80%",
    endTrigger: ".pied",
    end: "top 20%",
    toggleClass: { targets: flottant, className: "est-visible" },
    invalidateOnRefresh: true,
  });
}

/** Le titre de l'onglet change quand on quitte la page. Petit clin d'œil. */
export function initTitreOnglet() {
  const titreInitial = document.title;
  document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "On garde la broche au chaud…" : titreInitial;
  });
}
