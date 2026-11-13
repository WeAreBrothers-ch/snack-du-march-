/**
 * La carte : un menu où l'on déplie un plat à la fois.
 *
 * initPlats branche les lignes du menu (pas de librairie : elle sert aussi
 * en régime statique). Un clic déplie le plat et referme le précédent ; la
 * hauteur est animée en CSS. Avec GSAP, la photo (ou la recette) se découvre
 * de bas en haut à l'ouverture, et les pastilles de composition arrivent
 * l'une après l'autre.
 *
 * initCarte joue les entrées au défilement : le titre monte, puis les lignes
 * du menu l'une après l'autre.
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/** Durée de la transition CSS d'ouverture (carte.css), en ms. */
const OUVERTURE = 500;

/**
 * @param {import("./lib.js").Outils | null} outils sans GSAP (régime statique), pas d'animation de contenu
 */
export function initPlats(outils) {
  const plats = elements(".plat");
  if (plats.length === 0) return;

  /** @param {HTMLElement} plat @param {boolean} ouvert */
  const regler = (plat, ouvert) => {
    plat.classList.toggle("est-ouvert", ouvert);
    element(".plat__tete", plat).setAttribute("aria-expanded", String(ouvert));
  };

  /** @type {number | undefined} */
  let remesure;
  /** Les hauteurs ont changé : les animations plus bas se remesurent. */
  const remesurer = () => {
    if (!outils) return;
    window.clearTimeout(remesure);
    remesure = window.setTimeout(() => outils.ScrollTrigger.refresh(), OUVERTURE + 80);
  };

  /** @param {HTMLElement} plat */
  const decouvrir = (plat) => {
    if (!outils) return;
    const { gsap } = outils;
    const media = plat.querySelector(".plat__photo, .plat__recette");
    const pastilles = plat.querySelectorAll(".plat__compo li");
    if (media) {
      gsap.fromTo(
        media,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut", clearProps: "clipPath", delay: 0.1 },
      );
    }
    if (pastilles.length > 0) {
      gsap.fromTo(
        pastilles,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out", delay: 0.3, clearProps: "opacity,visibility,transform" },
      );
    }
  };

  plats.forEach((plat) => {
    element(".plat__tete", plat).addEventListener("click", () => {
      const ouvrir = !plat.classList.contains("est-ouvert");
      plats.forEach((autre) => regler(autre, autre === plat && ouvrir));
      if (ouvrir) decouvrir(plat);
      remesurer();
    });
  });
}

/**
 * @param {import("./lib.js").Outils} outils
 * @returns {() => void} fonction de nettoyage
 */
export function initCarte(outils) {
  const { gsap } = outils;

  const titre = decouperEnLignes(outils.SplitText, element(".carte__titre"));
  const texte = decouperEnLignes(outils.SplitText, element(".carte__texte"));

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".carte", start: "top 75%", toggleActions: "play none none reverse" },
    })
    .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, "<0.25")
    .fromTo(".carte__lien", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.3");

  gsap.fromTo(
    elements(".plat"),
    { autoAlpha: 0, y: 26 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: { trigger: ".menu", start: "top 85%", toggleActions: "play none none reverse" },
    },
  );

  return () => {};
}
