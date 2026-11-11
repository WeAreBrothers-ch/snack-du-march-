/**
 * Les librairies d'animation sont chargées par des balises <script> classiques
 * (voir index.html). Ce module les récupère, vérifie qu'elles sont bien là et
 * les expose proprement au reste du site.
 *
 * @typedef {Object} Outils
 * @property {any} gsap
 * @property {any} ScrollTrigger
 * @property {any} SplitText
 * @property {any} [Lenis] absent ou ignoré au doigt : le défilement y est natif
 */

/**
 * @returns {Outils}
 * @throws {Error} si une librairie n'a pas pu être chargée (CDN indisponible)
 */
export function chargerLibrairies() {
  const fenetre = /** @type {any} */ (window);
  const outils = {
    gsap: fenetre.gsap,
    ScrollTrigger: fenetre.ScrollTrigger,
    SplitText: fenetre.SplitText,
    Lenis: fenetre.Lenis,
  };

  const manquantes = Object.entries(outils)
    .filter(([nom, valeur]) => nom !== "Lenis" && !valeur)
    .map(([nom]) => nom);

  if (manquantes.length > 0) {
    throw new Error(`Librairies manquantes : ${manquantes.join(", ")}`);
  }

  outils.gsap.registerPlugin(outils.ScrollTrigger, outils.SplitText);
  // Sur mobile, la barre d'adresse qui se replie redimensionne la fenêtre :
  // sans cela, chaque geste relancerait tout le calcul des animations.
  outils.ScrollTrigger.config({ ignoreMobileResize: true });
  return outils;
}

/**
 * Le lissage des animations liées au défilement. À la souris, Lenis lisse
 * déjà la molette : un lissage de plus (scrub chiffré) ajouterait de la
 * traîne. Au doigt, le défilement est natif : un léger lissage gomme les
 * à-coups des événements de défilement.
 */
export const SCRUB = window.matchMedia("(pointer: coarse)").matches ? 0.35 : true;

/**
 * Sélectionne un élément obligatoire. Une erreur claire vaut mieux qu'un
 * `null` qui casse plus loin.
 * @param {string} selecteur
 * @param {ParentNode} [racine]
 * @returns {HTMLElement}
 */
export function element(selecteur, racine = document) {
  const trouve = racine.querySelector(selecteur);
  if (!(trouve instanceof HTMLElement || trouve instanceof SVGElement)) {
    throw new Error(`Élément introuvable : ${selecteur}`);
  }
  return /** @type {HTMLElement} */ (trouve);
}

/**
 * @param {string} selecteur
 * @param {ParentNode} [racine]
 * @returns {HTMLElement[]}
 */
export function elements(selecteur, racine = document) {
  return /** @type {HTMLElement[]} */ (
    Array.from(racine.querySelectorAll(selecteur)).filter(
      (noeud) => noeud instanceof HTMLElement || noeud instanceof SVGElement,
    )
  );
}

/**
 * Position d'un élément dans un de ses ancêtres positionnés, sans tenir
 * compte des transformations en cours : une animation ne fausse pas la mesure.
 * @param {HTMLElement} el
 * @param {HTMLElement} ancetre
 */
export function positionDans(el, ancetre) {
  let x = 0;
  let y = 0;
  /** @type {Element | null} */
  let noeud = el;
  while (noeud instanceof HTMLElement && noeud !== ancetre) {
    x += noeud.offsetLeft;
    y += noeud.offsetTop;
    noeud = noeud.offsetParent;
  }
  return { x, y };
}
