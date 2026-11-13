/**
 * Le pied de page : un panneau cobalt de bord à bord, collé aux côtés de
 * l'écran (pas de carte en retrait, pas de mur visible sur les côtés). Les trois blocs (adresse,
 * horaires, téléphone) arrivent l'un après l'autre ; le nom monte lettre à
 * lettre depuis sa ligne, au rythme du défilement, jusqu'au bas de la page.
 */

import { element, elements, SCRUB } from "./lib.js";
import { decouperEnLettres } from "./texte.js";

/** @param {import("./lib.js").Outils} outils */
export function initPied(outils) {
  const { gsap, SplitText } = outils;

  gsap.fromTo(
    elements(".pied__voeu, .pied__bloc"),
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".pied__infos", start: "top 92%", toggleActions: "play none none reverse" },
    },
  );

  // Les lettres montent de leur ligne (un masque par lettre).
  const nom = decouperEnLettres(SplitText, element(".pied__nom"));
  gsap.fromTo(
    nom.chars,
    { yPercent: 105 },
    {
      yPercent: 0,
      ease: "power2.out",
      stagger: 0.04,
      scrollTrigger: { trigger: ".pied__nom", start: "top bottom", end: "bottom bottom", scrub: SCRUB },
    },
  );
}
