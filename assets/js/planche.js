/**
 * Les traits de la planche d'anatomie.
 *
 * Sur grand écran, un trait relie chaque ingrédient de la légende à son
 * repère sur la photo, comme dans un livre de sciences naturelles. Les traits
 * sont tracés en SVG par-dessus la planche et recalculés dès que la mise en
 * page change. Sur téléphone, les numéros suffisent : pas de traits.
 *
 * Ce module ne dépend d'aucune librairie d'animation : il sert aussi en
 * régime statique.
 */

import { positionDans } from "./lib.js";

const NS = "http://www.w3.org/2000/svg";
const BUREAU = "(min-width: 992px)";
/** Espace entre la fin du mot et le début du trait, en pixels. */
const ECART = 6;

/**
 * @typedef {Object} Planche
 * @property {SVGPathElement[]} traits un trait par ingrédient, dans l'ordre de la légende
 */

/** @returns {Planche | null} */
export function initPlanche() {
  const planche = document.querySelector(".planche");
  if (!(planche instanceof HTMLElement)) return null;

  const points = /** @type {HTMLElement[]} */ (Array.from(planche.querySelectorAll(".planche__point")));
  const libelles = /** @type {HTMLElement[]} */ (Array.from(planche.querySelectorAll(".planche__nom")));

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "planche__traits");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  // Chaque trait mesure « 1 » quelle que soit sa longueur réelle : il suffit
  // d'animer stroke-dashoffset de 1 à 0 pour le dessiner.
  const traits = libelles.map(() => {
    const trait = document.createElementNS(NS, "path");
    trait.setAttribute("pathLength", "1");
    svg.appendChild(trait);
    return trait;
  });
  planche.appendChild(svg);

  const bureau = window.matchMedia(BUREAU);

  const tracer = () => {
    if (!bureau.matches) return;
    svg.setAttribute("viewBox", `0 0 ${planche.offsetWidth} ${planche.offsetHeight}`);

    libelles.forEach((libelle, index) => {
      const point = points[index];
      const ligne = libelle.parentElement;
      if (!point || !(ligne instanceof HTMLElement)) return;

      const aGauche = ligne.dataset.cote === "gauche";
      // Le trait part du bord de la ligne (le petit rond numéroté en fait partie,
      // du côté de la photo), à hauteur de son centre.
      const boite = positionDans(ligne, planche);
      const repere = positionDans(point, planche);

      const x1 = aGauche ? boite.x + ligne.offsetWidth + ECART : boite.x - ECART;
      const y1 = boite.y + ligne.offsetHeight / 2;
      const x2 = repere.x + point.offsetWidth / 2;
      const y2 = repere.y + point.offsetHeight / 2;

      traits[index].setAttribute("d", `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`);
    });
  };

  tracer();
  new ResizeObserver(tracer).observe(planche);
  bureau.addEventListener("change", tracer);
  document.fonts?.ready.then(tracer);

  return { traits };
}
