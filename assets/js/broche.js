/**
 * La broche : l'accroche monte ligne par ligne et la photo se découvre.
 * Sur grand écran, l'accroche reste en place (CSS) et recule pendant que le
 * panneau de l'anatomie monte par-dessus.
 *
 * L'anatomie : le titre monte et la photo se découvre. Sur grand écran, la
 * planche se dessine ensuite d'un seul geste : la légende, les traits qui
 * vont de chaque ingrédient à son repère, les repères eux-mêmes. Sur
 * téléphone, chaque partie se joue en entrant dans l'écran, en une seconde :
 * les repères se posent un à un sur la photo, la légende monte ligne par
 * ligne.
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
  const points = elements(".planche__point");
  const ingredients = elements(".planche__ingredient");
  const note = element(".anatomie__note");

  const decouvrirPhoto = { ...decouvrir, duration: 1 };

  if (bureau) {
    const traits = planche ? planche.traits : [];
    const dessin = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".anatomie", start: "top 35%", toggleActions: "play none none reverse" },
    });

    dessin
      .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
      .fromTo(photo, { clipPath: "inset(100% 0% 0% 0%)" }, decouvrirPhoto, "<0.1")
      .fromTo(ingredients, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }, "<0.55");
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
        points,
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" },
        "<0.3",
      )
      .fromTo(note, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.2");
    return;
  }

  // Sur téléphone, la planche est plus haute que l'écran : chaque partie se
  // joue quand elle y entre.
  /**
   * @param {string | Element} declencheur
   * @param {string} debut
   */
  const enEntrant = (declencheur, debut) => ({
    trigger: declencheur,
    start: debut,
    toggleActions: "play none none reverse",
  });

  gsap.fromTo(
    titre.lines,
    { yPercent: 120 },
    { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: enEntrant(".anatomie", "top 75%") },
  );

  // La photo se découvre, puis les repères s'y posent dans l'ordre de la légende.
  gsap
    .timeline({ scrollTrigger: enEntrant(photo, "top 80%") })
    .fromTo(photo, { clipPath: "inset(100% 0% 0% 0%)" }, decouvrirPhoto)
    .fromTo(
      points,
      { scale: 0.5, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" },
      "-=0.3",
    );

  gsap.fromTo(
    ingredients,
    { autoAlpha: 0, y: 14 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: enEntrant(".planche__liste", "top 90%"),
    },
  );

  gsap.fromTo(
    note,
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: enEntrant(note, "top 90%") },
  );
}
