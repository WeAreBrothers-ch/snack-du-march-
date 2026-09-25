/**
 * La broche : l'accroche monte ligne par ligne et la photo se découvre.
 * Sur grand écran, l'accroche reste en place (CSS) et recule pendant que le
 * panneau de l'anatomie monte par-dessus.
 *
 * L'anatomie : le titre monte et la photo se découvre. Sur grand écran, la
 * planche se dessine ensuite : la légende, les traits qui vont de chaque
 * ingrédient à son repère, les repères eux-mêmes. Sur téléphone, c'est le
 * défilement qui raconte la planche, ingrédient par ingrédient (planche.js).
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 * @param {import("./planche.js").Planche | null} planche
 */
export function initBroche(outils, bureau, planche) {
  const { gsap, SplitText } = outils;

  const accroche = decouperEnLignes(SplitText, element(".broche__accroche"));
  const texte = decouperEnLignes(SplitText, element(".broche__texte"));
  const apercu = element(".broche__apercu");

  // Les déclencheurs visent le bloc, jamais la section : sur grand écran,
  // elle reste collée en haut de l'écran et fausserait les mesures.
  const accrocheEntre = gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".broche-bloc", start: "top 70%", toggleActions: "play none none reverse" },
    })
    .fromTo(accroche.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, "<0.25");

  const decouvrir = {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 1.1,
    ease: "power3.inOut",
  };

  if (bureau) {
    // La photo est à côté du titre : elle se découvre avec lui.
    accrocheEntre.fromTo(apercu, { clipPath: "inset(100% 0% 0% 0%)" }, decouvrir, "<");

    // L'accroche recule pendant que le panneau de l'anatomie monte.
    gsap.to(".broche", {
      scale: 0.94,
      autoAlpha: 0.4,
      ease: "none",
      scrollTrigger: { trigger: ".anatomie", start: "top bottom", end: "top top", scrub: 1 },
    });
  } else {
    // Sur téléphone, elle est dessous : elle se découvre en entrant dans l'écran.
    gsap.fromTo(
      apercu,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        ...decouvrir,
        scrollTrigger: { trigger: apercu, start: "top 85%", toggleActions: "play none none reverse" },
      },
    );
  }

  const titre = decouperEnLignes(SplitText, element(".anatomie__titre"));
  const photo = element(".planche__photo");
  const note = element(".anatomie__note");

  const dessin = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".anatomie",
      start: bureau ? "top 35%" : "top 70%",
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
    );

  if (bureau) {
    const traits = planche ? planche.traits : [];
    dessin.fromTo(
      elements(".planche__etape"),
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 },
      "<0.55",
    );
    if (traits.length > 0) {
      dessin.fromTo(
        traits,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.05, ease: "power2.inOut" },
        "<0.1",
      );
    }
    dessin
      .fromTo(
        elements(".planche__point"),
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" },
        "<0.3",
      )
      .fromTo(note, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.2");
  } else {
    gsap.fromTo(
      note,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: note, start: "top 90%", toggleActions: "play none none reverse" },
      },
    );
  }
}
