/**
 * L'histoire : le titre et les photos apparaissent, puis la première étape
 * s'ouvre depuis le centre au rythme du défilement. Les deux étapes suivantes
 * glissent par-dessus la précédente, comme des cartes qu'on empile ; celle
 * du dessous recule et s'assombrit pendant qu'on la recouvre.
 *
 * Tout le bloc `.histoire` fait 600 % de la hauteur d'écran. Les positions
 * ci-dessous sont exprimées en pourcentage de cette hauteur d'écran, depuis
 * le haut du bloc :
 *   0 – 60    l'intro
 *   60 – 140  la première étape s'ouvre
 *   200 – 300 la deuxième glisse par-dessus la première
 *   300 – 400 la troisième glisse par-dessus la deuxième
 *   400 – 500 tout reste en place, puis le bloc s'en va
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * Position de départ ScrollTrigger : « le haut du bloc, décalé de n % de la
 * hauteur d'écran, atteint le haut de la fenêtre ».
 * @param {number} pourcent
 */
function depuisLeHaut(pourcent) {
  return () => `top+=${Math.round((window.innerHeight * pourcent) / 100)} top`;
}

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initHistoire(outils, bureau) {
  const { gsap, SplitText } = outils;

  const titre = decouperEnLignes(SplitText, element(".histoire__titre"));
  const sousTitre = decouperEnLignes(SplitText, element(".histoire__sous"));
  const photos = elements(".histoire__photo");

  const intro = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".histoire",
      start: "top 30%",
      toggleActions: "play complete none none",
    },
  });

  if (window.innerWidth >= 768) {
    intro.fromTo(
      photos,
      { clipPath: "inset(50% 50% 50% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, stagger: 0.1 },
    );
  }

  intro
    .from(titre.lines, { y: 150, stagger: 0.1 }, "<0.1")
    .from(sousTitre.lines, { y: 100, stagger: 0.1 }, "<0.2");

  // La première étape s'ouvre depuis le centre.
  gsap.timeline({
    scrollTrigger: {
      trigger: ".histoire",
      start: depuisLeHaut(60),
      end: depuisLeHaut(140),
      scrub: 1,
      invalidateOnRefresh: true,
    },
  }).fromTo(
    "#etape-1",
    { clipPath: "inset(50% 50% 50% 50%)" },
    { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
  );

  revelerEtape(outils, "#etape-1", depuisLeHaut(100), false);

  // Chaque carte recule quand la suivante glisse par-dessus.
  reculer(outils, "#etape-1", depuisLeHaut(200), depuisLeHaut(300), bureau ? 3 : 0, bureau);
  revelerEtape(outils, "#etape-2", depuisLeHaut(230), true);
  reculer(outils, "#etape-2", depuisLeHaut(300), depuisLeHaut(400), bureau ? -3 : 0, bureau);
  revelerEtape(outils, "#etape-3", depuisLeHaut(330), true);
}

/**
 * La carte du dessous rétrécit et se voile pendant qu'on la recouvre.
 * @param {import("./lib.js").Outils} outils
 * @param {string} selecteur
 * @param {() => string} debut
 * @param {() => string} fin
 * @param {number} rotation en degrés
 * @param {boolean} bureau
 */
function reculer(outils, selecteur, debut, fin, rotation, bureau) {
  outils.gsap.to(selecteur, {
    scale: bureau ? 0.88 : 0.92,
    rotate: rotation,
    "--voile": 0.55,
    ease: "none",
    scrollTrigger: {
      trigger: ".histoire",
      start: debut,
      end: fin,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

/**
 * Fait monter le titre, le texte et l'année d'une étape ; ouvre sa photo.
 * @param {import("./lib.js").Outils} outils
 * @param {string} selecteur
 * @param {() => string} debut
 * @param {boolean} ouvrirPhoto
 */
function revelerEtape(outils, selecteur, debut, ouvrirPhoto) {
  const { gsap, SplitText } = outils;
  const etape = element(selecteur);
  const titre = decouperEnLignes(SplitText, element(".etape__titre", etape));
  const texte = decouperEnLignes(SplitText, element(".etape__texte", etape));
  const annee = element(".etape__annee", etape);
  const cadre = element(".etape__cadre", etape);

  const ligne = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".histoire",
      start: debut,
      toggleActions: "play complete none none",
      invalidateOnRefresh: true,
    },
  });

  ligne
    .from(titre.lines, { y: 150, stagger: 0.1 })
    .from(texte.lines, { y: 100, stagger: 0.1 }, "<0.1")
    .from(annee, { yPercent: 60, opacity: 0, duration: 0.8 }, "<0.1");

  if (ouvrirPhoto) {
    ligne.fromTo(
      cadre,
      { clipPath: "inset(50% 50% 50% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
      "<0.2",
    );
  }
}
