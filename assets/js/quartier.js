/**
 * Le quartier et les prix : le grand texte cobalt se dévoile de haut en bas
 * par-dessus sa copie pâle, au rythme du défilement. La devanture est
 * découpée en tranches qui se décalent comme une broche qui tourne, puis se
 * recomposent quand la photo arrive au milieu de l'écran. Les clichés et les
 * avis se posent en arrivant, chacun de son côté.
 */

import { element, elements, SCRUB } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/** Nombre de tranches de la devanture. */
const TRANCHES = 9;

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 * @returns {() => void} fonction de nettoyage (changement de mise en page)
 */
export function initQuartier(outils, bureau) {
  const { gsap } = outils;

  gsap.fromTo(
    "[data-quartier-devant]",
    { clipPath: "inset(0% 0% 100% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".quartier__typo",
        start: "top 70%",
        end: "bottom 35%",
        scrub: SCRUB,
      },
    },
  );

  // Les clichés arrivent chacun de son côté ; les avis se posent ensuite.
  const arrivees = [
    { cible: ".cliche:not(.cliche--bas)", x: -40 },
    { cible: ".cliche--bas", x: 40 },
    { cible: ".papier--haut", x: 30 },
    { cible: ".papier--bas", x: -30 },
    { cible: ".quartier__acces", x: 0 },
  ];
  arrivees.forEach(({ cible, x }) => {
    gsap.fromTo(
      cible,
      { autoAlpha: 0, y: 40, x },
      {
        autoAlpha: 1,
        y: 0,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: cible, start: "top 90%", toggleActions: "play none none reverse" },
      },
    );
  });

  // Les avis, posés devant, glissent un peu plus vite que la page.
  gsap.fromTo(
    ".papier--haut",
    { yPercent: 12 },
    {
      yPercent: -12,
      ease: "none",
      scrollTrigger: { trigger: ".quartier__scene", start: "top bottom", end: "bottom top", scrub: true },
    },
  );

  return initTourne(outils, bureau);
}

/**
 * La devanture en tranches. Chaque tranche est une bande horizontale de la
 * photo ; au défilement, elles se décalent de côté en sinusoïde, chacune avec
 * son retard sur la précédente (une broche qui tourne), de plus en plus
 * amplement quand la photo s'éloigne du milieu de l'écran ; au milieu, elles
 * se recomposent : la photo est entière.
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 * @returns {() => void} rend la photo entière (changement de mise en page)
 */
function initTourne(outils, bureau) {
  const { gsap, ScrollTrigger } = outils;
  const cadre = element("[data-tourne]");
  const image = /** @type {HTMLImageElement} */ (element("img", cadre));

  const source = image.src;
  const tranches = Array.from({ length: TRANCHES }, (_, rang) => {
    const tranche = document.createElement("span");
    tranche.className = "tourne__tranche";
    tranche.setAttribute("aria-hidden", "true");
    tranche.style.top = `${(rang * 100) / TRANCHES}%`;
    // Un peu plus haute que sa part : pas de filet clair entre deux tranches.
    tranche.style.height = `${100 / TRANCHES + 0.6}%`;
    tranche.style.backgroundImage = `url("${source}")`;
    tranche.style.backgroundSize = `100% ${TRANCHES * 100}%`;
    tranche.style.backgroundPosition = `0 ${(rang / (TRANCHES - 1)) * 100}%`;
    return tranche;
  });
  cadre.append(...tranches);
  cadre.classList.add("tourne--prete");

  // Les coins arrondis de la photo, portés par la première et la dernière.
  tranches[0].style.borderRadius = "var(--rayon) var(--rayon) 0 0";
  tranches[TRANCHES - 1].style.borderRadius = "0 0 var(--rayon) var(--rayon)";

  const regler = tranches.map((tranche) => gsap.quickSetter(tranche, "x", "px"));
  const amplitude = () => cadre.offsetWidth * (bureau ? 0.14 : 0.11);

  /** @param {number} progression de 0 (entre par le bas) à 1 (sort par le haut) ; 0,5 : au milieu */
  const tourner = (progression) => {
    // Rien ne bouge autour du milieu : la photo y est entière, le temps de
    // la regarder ; l'écart grandit ensuite en douceur.
    const ecart = Math.min(1, Math.max(0, (Math.abs(progression - 0.5) - 0.07) / 0.3));
    const force = ecart * ecart * (3 - 2 * ecart);
    const phase = progression * Math.PI * 6;
    const grandeur = amplitude();
    regler.forEach((appliquer, rang) => appliquer(Math.sin(phase + rang * 0.75) * grandeur * force));
  };

  const declencheur = ScrollTrigger.create({
    trigger: cadre,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (/** @type {any} */ d) => tourner(d.progress),
    onRefresh: (/** @type {any} */ d) => tourner(d.progress),
  });

  return () => {
    declencheur.kill();
    tranches.forEach((tranche) => tranche.remove());
    cadre.classList.remove("tourne--prete");
  };
}

/** @param {import("./lib.js").Outils} outils */
export function initPrix(outils) {
  const { gsap, SplitText } = outils;
  const titre = decouperEnLignes(SplitText, element(".prix__titre"));

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".prix", start: "top 70%", toggleActions: "play none none reverse" },
    })
    .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(".prix__note", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "<0.2")
    .fromTo(elements(".format"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7 }, "<")
    .fromTo(elements(".prix__extras li"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.6 }, "<0.3")
    .fromTo(".prix__allergies", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, "<0.2");
}
