/**
 * La broche : l'accroche monte ligne par ligne et la photo se découvre ; puis,
 * au défilement, le panneau bordeaux de l'anatomie monte par-dessus. Une fois
 * en place, la planche se dessine : la photo, la légende, les traits qui
 * vont de chaque ingrédient à son repère, les repères eux-mêmes.
 *
 * Le bloc `.broche` fait trois hauteurs d'écran ; positions en pourcentage
 * de la hauteur d'écran, depuis le haut du bloc :
 *   30 – 110  le panneau de l'anatomie monte
 *   90        la planche se dessine
 *   110 – 200 tout reste en place, puis le bloc s'en va
 */

import { depuisLeHaut, element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {import("./planche.js").Planche | null} planche
 */
export function initBroche(outils, planche) {
  const { gsap, SplitText } = outils;

  const avant = element(".broche__avant");
  const accroche = decouperEnLignes(SplitText, element(".broche__accroche"));
  const texte = decouperEnLignes(SplitText, element(".broche__texte"));
  const apercu = element(".broche__apercu");

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: ".broche",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(accroche.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, "<0.25")
    .fromTo(
      apercu,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
      "<",
    );

  // Le panneau de l'anatomie monte ; l'accroche recule dessous.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".broche",
        start: depuisLeHaut(30),
        end: depuisLeHaut(110),
        scrub: 1,
      },
    })
    .fromTo(".anatomie", { yPercent: 100 }, { yPercent: 0, ease: "none" })
    .to(avant, { scale: 0.94, autoAlpha: 0.4, ease: "none" }, "<");

  const titre = decouperEnLignes(SplitText, element(".anatomie__titre"));
  const photo = element(".planche__photo");
  const points = elements(".planche__point");
  const libelles = elements(".planche__liste li");
  const note = element(".anatomie__note");
  const traits = planche ? planche.traits : [];

  const dessin = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".broche",
      start: depuisLeHaut(90),
      toggleActions: "play none none reverse",
    },
  });

  dessin
    .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(
      photo,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" },
      "<0.1",
    )
    .fromTo(libelles, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }, "<0.55");

  if (traits.length > 0) {
    dessin.fromTo(
      traits,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.6, stagger: 0.05, ease: "power2.inOut" },
      "<0.1",
    );
  }

  dessin
    .fromTo(points, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" }, "<0.3")
    .fromTo(note, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.2");
}
