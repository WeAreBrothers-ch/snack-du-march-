/**
 * Le pied de page : le panneau cobalt monte comme une carte qui s'élargit
 * jusqu'aux bords, comme celui de l'anatomie. Les trois blocs (adresse,
 * horaires, téléphone) arrivent l'un après l'autre ; le nom monte lettre à
 * lettre depuis sa ligne, au rythme du défilement, jusqu'au bas de la page.
 */

import { element, elements, SCRUB } from "./lib.js";
import { decouperEnLettres } from "./texte.js";

/** @param {import("./lib.js").Outils} outils */
export function initPied(outils) {
  const { gsap, SplitText } = outils;

  // La découpe est animée telle quelle (et non par des variables CSS, qui
  // recalculeraient le style de tout le panneau à chaque image).
  const carteDe = () => {
    const retrait = Math.round(Math.min(window.innerWidth * 0.06, 48));
    const arrondi = window.innerWidth >= 992 ? 32 : 20;
    return `inset(0px ${retrait}px 0px ${retrait}px round ${arrondi}px ${arrondi}px 0px 0px)`;
  };
  gsap.fromTo(
    ".pied",
    { clipPath: carteDe },
    {
      clipPath: "inset(0px 0px 0px 0px round 0px 0px 0px 0px)",
      ease: "power1.inOut",
      immediateRender: true,
      scrollTrigger: {
        trigger: ".pied",
        start: "top bottom",
        end: "top 40%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );

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
