/**
 * La carte : les trois lignes du titre montent et leurs vignettes s'ouvrent ;
 * tant que le titre est à l'écran, ses lignes glissent en sens contraires au
 * rythme du défilement. Puis le texte, les plats et les flèches du carrousel
 * arrivent à leur tour. Le carrousel défile nativement (scroll-snap) : au
 * doigt, c'est le défilement du système, fluide et sans JavaScript à chaque
 * mouvement ; les flèches le font avancer d'un plat.
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @returns {() => void} fonction de nettoyage (détruit le carrousel)
 */
export function initCarte(outils) {
  const { gsap, SplitText } = outils;

  const mots = decouperEnLignes(SplitText, elements(".carte__mot"));
  const vignettes = elements(".carte__vignette");
  const texte = decouperEnLignes(SplitText, element(".carrousel__texte"));
  const cadre = element(".carrousel__cadre");
  const boutons = elements(".carrousel__bouton");

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".carte__titre", start: "top 75%", toggleActions: "play none none reverse" },
    })
    .fromTo(mots.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.1 })
    .fromTo(
      vignettes,
      { clipPath: "inset(0% 50% 0% 50%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.1, ease: "power3.inOut" },
      "<0.2",
    );

  elements(".carte__ligne").forEach((ligne, index) => {
    const sens = index % 2 === 0 ? 1 : -1;
    gsap.fromTo(
      ligne,
      { x: () => sens * window.innerWidth * 0.1 },
      {
        x: () => -sens * window.innerWidth * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".carte__titre",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".carrousel", start: "top 80%", toggleActions: "play none none reverse" },
    })
    .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 })
    .fromTo(cadre, { autoAlpha: 0, x: 48 }, { autoAlpha: 1, x: 0, duration: 1 }, "<0.15")
    .fromTo(boutons, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, "<0.3");

  return initGlisseur(cadre, boutons[0], boutons[1]);
}

/**
 * Le carrousel : le défilement est celui du navigateur (CSS : scroll-snap).
 * Le script ne fait que brancher les deux flèches et les griser aux
 * extrémités.
 * @param {HTMLElement} cadre
 * @param {HTMLElement} precedent
 * @param {HTMLElement} suivant
 * @returns {() => void} fonction de nettoyage
 */
function initGlisseur(cadre, precedent, suivant) {
  /** Largeur d'un pas : un plat, et l'espace qui le sépare du suivant. */
  const pas = () => {
    const [premier, second] = elements(".plat", cadre);
    return second ? second.offsetLeft - premier.offsetLeft : premier.offsetWidth;
  };

  /** @param {number} sens */
  const aller = (sens) => cadre.scrollBy({ left: sens * pas(), behavior: "smooth" });
  const versPrecedent = () => aller(-1);
  const versSuivant = () => aller(1);

  const majBoutons = () => {
    const reste = cadre.scrollWidth - cadre.clientWidth - cadre.scrollLeft;
    precedent.toggleAttribute("disabled", cadre.scrollLeft < 4);
    suivant.toggleAttribute("disabled", reste < 4);
  };

  precedent.addEventListener("click", versPrecedent);
  suivant.addEventListener("click", versSuivant);
  cadre.addEventListener("scroll", majBoutons, { passive: true });
  window.addEventListener("resize", majBoutons, { passive: true });
  majBoutons();

  return () => {
    precedent.removeEventListener("click", versPrecedent);
    suivant.removeEventListener("click", versSuivant);
    cadre.removeEventListener("scroll", majBoutons);
    window.removeEventListener("resize", majBoutons);
  };
}
