/**
 * La planche d'anatomie.
 *
 * Sur téléphone, la photo reste en haut de l'écran et la légende défile
 * dessous : l'ingrédient qui passe au milieu de l'écran s'allume, dans la
 * légende comme sur la photo.
 *
 * Sur grand écran, un trait relie chaque ingrédient de la légende à son
 * repère sur la photo, comme dans un livre de sciences naturelles. Les traits
 * sont tracés en SVG par-dessus la planche et recalculés dès que la mise en
 * page change.
 *
 * Ce module ne dépend d'aucune librairie d'animation : il sert aussi en
 * régime statique.
 */

import { positionDans } from "./lib.js";

const NS = "http://www.w3.org/2000/svg";
const BUREAU = "(min-width: 992px)";
/** Espace entre la fin du mot et le début du trait, en pixels. */
const ECART = 14;

/**
 * @typedef {Object} Planche
 * @property {SVGPathElement[]} traits un trait par ingrédient, dans l'ordre de la légende
 */

/** @returns {Planche | null} */
export function initPlanche() {
  const planche = document.querySelector(".planche");
  if (!(planche instanceof HTMLElement)) return null;

  const points = /** @type {HTMLElement[]} */ (Array.from(planche.querySelectorAll(".planche__point")));
  const etapes = /** @type {HTMLElement[]} */ (Array.from(planche.querySelectorAll(".planche__etape")));
  const libelles = /** @type {HTMLElement[]} */ (Array.from(planche.querySelectorAll(".planche__nom")));

  raconter(planche, etapes, points);

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
      const mot = positionDans(libelle, planche);
      const repere = positionDans(point, planche);

      const x1 = aGauche ? mot.x + libelle.offsetWidth + ECART : mot.x - ECART;
      const y1 = mot.y + libelle.offsetHeight / 2;
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

/**
 * Sur téléphone : l'ingrédient qui s'allume est le premier entièrement
 * visible sous la photo ; quand il passe sous elle, le suivant prend le
 * relais. Les styles ne s'appliquent que sur téléphone ; sur grand écran,
 * tout reste allumé.
 * @param {HTMLElement} planche
 * @param {HTMLElement[]} etapes
 * @param {HTMLElement[]} points
 */
function raconter(planche, etapes, points) {
  const scene = planche.querySelector(".planche__scene");
  if (!(scene instanceof HTMLElement) || etapes.length === 0) return;

  const telephone = window.matchMedia("(max-width: 991px)");
  let active = -1;

  /** @param {number} index */
  const activer = (index) => {
    if (index === active) return;
    active = index;
    etapes.forEach((etape, i) => etape.classList.toggle("est-active", i === index));
    points.forEach((point, i) => point.classList.toggle("est-actif", i === index));
  };

  let image = 0;
  const mesurer = () => {
    image = 0;
    if (!telephone.matches) return;
    const bas = scene.getBoundingClientRect().bottom - 8;
    const index = etapes.findIndex((etape) => etape.getBoundingClientRect().top >= bas);
    activer(index === -1 ? etapes.length - 1 : index);
  };
  const demander = () => {
    if (!image) image = requestAnimationFrame(mesurer);
  };

  planche.classList.add("planche--racontee");
  activer(0);
  mesurer();
  window.addEventListener("scroll", demander, { passive: true });
  window.addEventListener("resize", demander);
}
