/**
 * Le quartier et les prix : le grand texte cobalt se dévoile de haut en bas
 * par-dessus sa copie pâle, au rythme du défilement (téléphone seulement :
 * sur grand écran, la section est calme). Dessous, le ruban : photos, avis et
 * adresse. Au doigt, on le balaie (défilement natif, scroll-snap), avec un
 * compteur et une barre ; sur grand écran, les cartes sont à plat, sur une ou
 * deux rangées.
 */

import { element, elements, SCRUB } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * Le compteur et la barre. Sans dépendance : sert aussi sans animation.
 * @param {HTMLElement} piste
 * @returns {{ maj: (progres: number) => void }}
 */
function brancherRail(piste) {
  const cartes = elements(".ruban__carte", piste);
  const compteur = element("[data-ruban-compteur]");
  const barre = element("[data-ruban-barre]");
  const deux = (/** @type {number} */ n) => String(n).padStart(2, "0");
  let courant = -1;

  /** @param {number} progres de 0 (début) à 1 (fin) */
  const maj = (progres) => {
    const p = Math.min(1, Math.max(0, progres));
    barre.style.setProperty("--progres", String(0.12 + 0.88 * p));
    const rang = Math.min(cartes.length - 1, Math.round(p * (cartes.length - 1)));
    if (rang !== courant) {
      courant = rang;
      compteur.textContent = `${deux(rang + 1)} / ${deux(cartes.length)}`;
    }
  };
  maj(0);
  return { maj };
}

/** Sans animation : le ruban se balaie, le compteur et la barre le suivent. */
export function initRubanStatique() {
  const piste = document.querySelector(".ruban__piste");
  if (!(piste instanceof HTMLElement)) return;
  const rail = brancherRail(piste);
  piste.addEventListener(
    "scroll",
    () => {
      const reste = piste.scrollWidth - piste.clientWidth;
      rail.maj(reste > 0 ? piste.scrollLeft / reste : 0);
    },
    { passive: true },
  );
}

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 * @returns {() => void} fonction de nettoyage (changement de mise en page)
 */
export function initQuartier(outils, bureau) {
  const { gsap, ScrollTrigger } = outils;

  // Sur téléphone, le grand texte se dévoile de haut en bas. Sur grand écran,
  // la section est calme : le titre est simplement là.
  if (!bureau) {
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
  }

  const ruban = element(".ruban");
  const piste = element(".ruban__piste");
  const rail = brancherRail(piste);

  // Les cartes arrivent l'une après l'autre quand le ruban entre à l'écran.
  gsap.fromTo(
    elements(".ruban__carte"),
    { autoAlpha: 0, y: 36 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger: ruban, start: "top 85%", toggleActions: "play none none none" },
    },
  );

  {
    // Défilement natif au doigt. La carte au centre est à sa taille, les autres
    // reculent un peu, comme un jeu de cartes qu'on feuillette (sur grand écran,
    // les cartes sont à plat : l'effet n'a lieu qu'en dessous de 992 px).
    const cartes = elements(".ruban__carte");
    let attente = false;
    const suivre = () => {
      attente = false;
      const centre = piste.scrollLeft + piste.clientWidth / 2;
      const reste = piste.scrollWidth - piste.clientWidth;
      rail.maj(reste > 0 ? piste.scrollLeft / reste : 0);
      cartes.forEach((carte) => {
        const milieu = carte.offsetLeft + carte.offsetWidth / 2;
        const ecart = Math.min(1, Math.abs(milieu - centre) / (piste.clientWidth * 0.9));
        carte.style.setProperty("--recul", String(ecart));
      });
    };
    const demander = () => {
      if (!attente) {
        attente = true;
        requestAnimationFrame(suivre);
      }
    };
    piste.addEventListener("scroll", demander, { passive: true });
    window.addEventListener("resize", demander, { passive: true });
    suivre();
    return () => {
      piste.removeEventListener("scroll", demander);
      window.removeEventListener("resize", demander);
      cartes.forEach((carte) => carte.style.removeProperty("--recul"));
    };
  }
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
    .fromTo(".prix__choix", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "<")
    .fromTo(elements(".tableau tbody tr"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.6 }, "<0.1")
    .fromTo(elements(".prix__extras li"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.6 }, "<0.3")
    .fromTo(".prix__allergies", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, "<0.2");
}
