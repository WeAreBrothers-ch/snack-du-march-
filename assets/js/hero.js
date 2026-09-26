/**
 * Le haut de page.
 *
 * L'entrée : pas de rideau ni de mots qui tournent. Le cadre bordeaux
 * apparaît, la photo s'y découvre de bas en haut, comme un store qu'on lève
 * à l'ouverture, et le nom monte de part et d'autre. Une seconde et demie,
 * et le défilement reste libre dès le premier instant.
 *
 * L'enseigne : au défilement, le hero reste épinglé ; la photo reste et
 * grandit un peu, un bandeau bordeaux s'ouvre en travers, du milieu de la
 * photo jusqu'aux bords de l'écran, et les deux mots glissent dessus pour
 * former « Snack du Marché » sur une seule ligne, comme une enseigne.
 */

import { element, elements, positionDans } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * Crée et lance l'entrée. Les états de départ sont posés immédiatement, avant
 * que la page ne retire son masque d'attente (classe « anime »).
 * @param {import("./lib.js").Outils} outils
 */
export function jouerEntree(outils) {
  const { gsap, SplitText } = outils;

  const cadre = element(".hero__cadre");
  const image = element(".hero__image");
  const photo = element(".hero__photo");
  const nom = decouperEnLignes(SplitText, elements(".hero__mot"));
  const bandeaux = elements(".hero__haut, .hero__bas");

  gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .fromTo(cadre, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" })
    .fromTo(
      image,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
      "<0.1",
    )
    .fromTo(photo, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: "power3.out" }, "<")
    .fromTo(nom.lines, { yPercent: 120 }, { yPercent: 0, duration: 1, stagger: 0.08 }, "<0.3")
    .fromTo(
      bandeaux,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" },
      "<0.35",
    );
}

/**
 * Quand la mise en page change après l'entrée, le haut de page retrouve son
 * état naturel sans rejouer l'animation.
 * @param {import("./lib.js").Outils} outils
 */
export function retablirHero(outils) {
  outils.gsap.set([".hero__haut", ".hero__bas", ".hero__cadre", ".hero__image", ".hero__photo"], {
    clearProps: "all",
  });
}

/**
 * Le nom qui se rassemble sur le bandeau, lié au défilement.
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initEnseigne(outils, bureau) {
  const { gsap } = outils;

  const hero = element(".hero");
  const enseigne = element(".hero__enseigne");
  const cadre = element(".hero__cadre");
  const gauche = element(".hero__mot--gauche");
  const droite = element(".hero__mot--droite");

  /**
   * Les positions de départ et d'arrivée, mesurées sur la mise en page (les
   * transformations en cours n'y entrent pas) : recalculées à chaque
   * changement de taille de la fenêtre.
   */
  function mesurer() {
    const largeur = hero.offsetWidth;
    const hauteur = hero.offsetHeight;
    const marge = parseFloat(getComputedStyle(hero).paddingLeft);
    const rayon = parseFloat(getComputedStyle(cadre).borderTopLeftRadius);

    const posCadre = positionDans(cadre, hero);
    const centre = posCadre.y + cadre.offsetHeight / 2;

    // La ligne « Snack du Marché » : les deux mots séparés d'une espace de la
    // police (0,13 em), réduits si nécessaire pour tenir entre les marges
    // (sur téléphone).
    const espace = parseFloat(getComputedStyle(gauche).fontSize) * 0.13;
    const longueur = gauche.offsetWidth + espace + droite.offsetWidth;
    const echelle = Math.min(1, (largeur - 2 * marge) / longueur);
    const debutLigne = (largeur - longueur * echelle) / 2;

    const posGauche = positionDans(gauche, hero);
    const posDroite = positionDans(droite, hero);
    const bande = gauche.offsetHeight * echelle * 1.5;

    return {
      echelle,
      gauche: {
        x: debutLigne + (gauche.offsetWidth * echelle) / 2 - (posGauche.x + gauche.offsetWidth / 2),
        y: centre - (posGauche.y + gauche.offsetHeight / 2),
      },
      droite: {
        x:
          debutLigne +
          (gauche.offsetWidth + espace) * echelle +
          (droite.offsetWidth * echelle) / 2 -
          (posDroite.x + droite.offsetWidth / 2),
        y: centre - (posDroite.y + droite.offsetHeight / 2),
      },
      // Découpes de l'enseigne : un trait au milieu de la photo, de la
      // largeur du cadre, puis le bandeau d'un bord à l'autre.
      depart: `inset(${centre}px ${largeur - posCadre.x - cadre.offsetWidth}px ${hauteur - centre}px ${
        posCadre.x
      }px round ${rayon}px)`,
      arrivee: `inset(${centre - bande / 2}px 0px ${hauteur - centre - bande / 2}px 0px round 0px)`,
    };
  }

  gsap
    .timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: ".accueil",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
    // L'enseigne part d'un trait invisible au milieu de la photo, et s'ouvre.
    .fromTo(enseigne, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ease: "none" }, 0)
    .fromTo(enseigne, { clipPath: () => mesurer().depart }, { clipPath: () => mesurer().arrivee, duration: 0.8 }, 0.05)
    // La photo reste, et prend la place que les mots lui laissent.
    .fromTo(cadre, { scale: 1 }, { scale: bureau ? 1.1 : 1.28, duration: 0.85 }, 0)
    .to(
      gauche,
      { x: () => mesurer().gauche.x, y: () => mesurer().gauche.y, scale: () => mesurer().echelle, duration: 0.75 },
      0.1,
    )
    .to(
      droite,
      { x: () => mesurer().droite.x, y: () => mesurer().droite.y, scale: () => mesurer().echelle, duration: 0.75 },
      0.1,
    )
    // Un temps d'arrêt sur l'enseigne complète avant que la page ne reparte.
    .to({}, { duration: 0.15 });
}
