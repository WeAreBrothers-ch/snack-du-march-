/**
 * L'ouverture du site : trois mots montent, se rétractent, le disque caramel
 * se referme et le hero entre en scène — le nom depuis les côtés, la broche
 * en tournant, puis le texte ligne par ligne.
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {{ bureau: boolean, quandTermine: () => void }} options
 */
export function jouerOuverture(outils, { bureau, quandTermine }) {
  const { gsap, SplitText } = outils;

  const rideau = element(".rideau");
  const cercle = element(".rideau__cercle", rideau);
  const mots = element(".rideau__mots", rideau);
  const motsDecoupes = decouperEnLignes(SplitText, elements(".rideau__mot", rideau));

  const haut = element(".hero__haut");
  const bas = element(".hero__bas");
  const motGauche = element(".hero__mot--gauche");
  const motDroite = element(".hero__mot--droite");
  const image = element(".hero__image");
  const texteDecoupe = decouperEnLignes(SplitText, element(".hero__texte"));

  const duree = bureau ? 1.8 : 1.2;
  const distance = bureau ? 350 : 300;

  gsap.set([haut, bas], { opacity: 0 });
  gsap.set(image, { opacity: 0, scale: 0, rotate: 360 });

  const ligne = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      rideau.style.display = "none";
      quandTermine();
    },
  });

  ligne
    .from(motsDecoupes.lines, { yPercent: 100, stagger: 0.12, duration: 0.8, delay: 0.6 })
    .to(mots, { scale: 0, duration: 0.6, delay: 0.5, ease: "power3.in" })
    .fromTo(
      cercle,
      { clipPath: "circle(100% at 50% 50%)", scale: 1 },
      { clipPath: "circle(0% at 50% 50%)", scale: 0, duration: 0.8, ease: "power3.inOut" },
      "<",
    )
    .fromTo(motGauche, { xPercent: -distance }, { xPercent: 0, duration: duree }, "<")
    .fromTo(motDroite, { xPercent: distance }, { xPercent: 0, duration: duree }, "<")
    .to(image, { opacity: 1, scale: 1, rotate: 0, duration: 1.2 }, "<0.8")
    .to([haut, bas], { opacity: 1, duration: 1.3 }, ">-0.5")
    .from(texteDecoupe.lines, { y: 50, duration: 1, stagger: 0.08 }, "<0.2");
}

/**
 * Quand la mise en page change après l'ouverture, le hero doit retrouver son
 * état naturel sans rejouer l'animation.
 * @param {import("./lib.js").Outils} outils
 */
export function retablirHero(outils) {
  element(".rideau").style.display = "none";
  outils.gsap.set(
    [".hero__haut", ".hero__bas", ".hero__mot", ".hero__image", ".hero__texte"],
    { clearProps: "all" },
  );
}
