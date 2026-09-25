/**
 * Le menu : un bouton flottant qui apparaît une fois le hero passé, et un
 * panneau qui glisse depuis la droite. Fonctionne aussi sans animation.
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

  /** @param {boolean} ouvert */
  function marquer(ouvert) {
    ouvreurs.forEach((bouton) => bouton.setAttribute("aria-expanded", String(ouvert)));
  }

  function ouvrir() {
    panneau.hidden = false;
    marquer(true);
    lenis?.stop();

    if (!outils) return;
    outils.gsap.fromTo(fond, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    outils.gsap.fromTo(
      carte,
      { rotate: 0, xPercent: 110, yPercent: -12 },
      { rotate: -8, xPercent: 6, yPercent: -12, duration: 0.55, ease: "power3.out" },
    );
    element(".panneau__lien", panneau).focus();
  }

  function fermer() {
    marquer(false);
    if (!outils) {
      panneau.hidden = true;
      lenis?.start();
      return;
    }
    // La sortie est plus rapide que l'entrée : le système répond, il ne s'attarde pas.
    outils.gsap.to(fond, { opacity: 0, duration: 0.25 });
    outils.gsap.to(carte, {
      rotate: 0,
      xPercent: 110,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        panneau.hidden = true;
        lenis?.start();
      },
    });
  }

  ouvreurs.forEach((bouton) => bouton.addEventListener("click", ouvrir));
  fermeurs.forEach((bouton) => bouton.addEventListener("click", fermer));
  liens.forEach((lien) => lien.addEventListener("click", fermer));

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
