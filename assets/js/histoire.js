/**
 * L'histoire : le titre et les photos apparaissent, puis les trois étapes
 * montent l'une après l'autre, comme des cartes qu'on empile ; celle du
 * dessous recule et s'assombrit pendant qu'on la recouvre.
 *
 * Tout le bloc `.histoire` fait six hauteurs d'écran (sept sur grand écran,
 * voir l'entracte dans histoire.css). Les positions ci-dessous sont exprimées
 * en pourcentage de la hauteur d'écran, depuis le haut du bloc :
 *   0 – 40    l'intro
 *   40 – 120  la première étape monte par-dessus l'intro
 *   200 – 300 la deuxième glisse par-dessus la première
 *   300 – 400 la troisième glisse par-dessus la deuxième (+ 100 sur grand écran)
 *   400 – 500 tout reste en place, puis le bloc s'en va (+ 100 sur grand écran)
 */

import { depuisLeHaut, element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initHistoire(outils, bureau) {
  const { gsap, SplitText } = outils;

  const titre = decouperEnLignes(SplitText, element(".histoire__titre"));
  const sousTitre = decouperEnLignes(SplitText, element(".histoire__sous"));
  const photos = elements(".histoire__cadre");

  const intro = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".histoire",
      start: "top 40%",
      toggleActions: "play none none reverse",
    },
  });

  intro
    .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(sousTitre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.06 }, "<0.2");

  if (window.innerWidth >= 768) {
    intro.fromTo(
      photos,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.07, ease: "power3.inOut" },
      "<",
    );
  }

  // La première étape monte par-dessus l'intro, comme les deux suivantes.
  gsap.fromTo(
    "#etape-1",
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".histoire",
        start: depuisLeHaut(40),
        end: depuisLeHaut(120),
        scrub: 1,
      },
    },
  );

  revelerEtape(outils, "#etape-1", depuisLeHaut(95));

  // Chaque carte recule quand la suivante glisse par-dessus.
  const entracte = bureau ? 100 : 0;
  reculer(outils, "#etape-1", depuisLeHaut(200), depuisLeHaut(300), bureau ? 1.5 : 0, bureau);
  revelerEtape(outils, "#etape-2", depuisLeHaut(250));
  reculer(outils, "#etape-2", depuisLeHaut(300 + entracte), depuisLeHaut(400 + entracte), bureau ? -1.5 : 0, bureau);
  revelerEtape(outils, "#etape-3", depuisLeHaut(350 + entracte));
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
    scale: bureau ? 0.9 : 0.94,
    rotate: rotation,
    "--voile": 0.6,
    ease: "none",
    scrollTrigger: {
      trigger: ".histoire",
      start: debut,
      end: fin,
      scrub: 1,
    },
  });
}

/**
 * Fait monter l'année, le titre et le texte d'une étape ; découvre sa photo.
 * @param {import("./lib.js").Outils} outils
 * @param {string} selecteur
 * @param {() => string} debut
 */
function revelerEtape(outils, selecteur, debut) {
  const { gsap, SplitText } = outils;
  const etape = element(selecteur);
  const annee = decouperEnLignes(SplitText, element(".etape__annee", etape));
  const titre = decouperEnLignes(SplitText, element(".etape__titre", etape));
  const texte = decouperEnLignes(SplitText, element(".etape__texte", etape));
  const cadre = element(".etape__cadre", etape);

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".histoire",
        start: debut,
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(annee.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9 })
    .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.08 }, "<0.1")
    .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, "<0.1")
    .fromTo(
      cadre,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" },
      "<",
    );
}
