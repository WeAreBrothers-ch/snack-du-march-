/**
 * Le haut de page.
 *
 * L'entrée : pas de rideau ni de mots qui tournent. Le cadre cobalt apparaît,
 * la photo s'y découvre de bas en haut, comme un store qu'on lève à
 * l'ouverture, et le nom monte de part et d'autre, sur ses plaques de
 * céramique. Une seconde et demie, et le défilement reste libre dès le
 * premier instant.
 *
 * L'enseigne : au défilement, le hero reste épinglé. Les deux plaques se
 * rejoignent au-dessus de la photo pour former « Snack du Marché » sur une
 * seule ligne, sur un bandeau cobalt qui se déroule depuis le milieu, comme
 * l'enseigne au-dessus de la vitrine : la céramique s'efface, les lettres
 * passent à l'ivoire. La photo reste entière : rien ne passe dessus, et
 * elle grandit un peu vers le bas, dans la place que les mots lui laissent.
 */

import { element, elements, positionDans } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * Part du bas du haut de page que la section suivante recouvre en montant
 * (histoire.css) : la photo, en grandissant, s'arrête au-dessus.
 */
const RECOUVREMENT = 0.15;

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
  const bandeaux = elements(".hero__haut, .hero__bande, .hero__bas");

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
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out" },
      "<0.35",
    );
}

/**
 * Quand la mise en page change après l'entrée, le haut de page retrouve son
 * état naturel sans rejouer l'animation.
 * @param {import("./lib.js").Outils} outils
 */
export function retablirHero(outils) {
  outils.gsap.set([".hero__haut", ".hero__bande", ".hero__bas", ".hero__cadre", ".hero__image", ".hero__photo"], {
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

  const bordure = element(".hero__bande");
  const titre = element(".hero__titre");
  const bas = element(".hero__bas");

  /**
   * Les positions de départ et d'arrivée, mesurées sur la mise en page (les
   * transformations en cours n'y entrent pas) : recalculées à chaque
   * changement de taille de la fenêtre.
   */
  function mesurer() {
    const largeur = hero.offsetWidth;
    const hauteur = hero.offsetHeight;
    const marge = parseFloat(getComputedStyle(titre).paddingLeft);
    const ecart = Math.max(12, hauteur * 0.02);

    const posCadre = positionDans(cadre, hero);
    const posGauche = positionDans(gauche, hero);
    const posDroite = positionDans(droite, hero);

    // La place de l'enseigne : entre la bordure du haut et la photo.
    const dessus = positionDans(bordure, hero).y + bordure.offsetHeight + ecart;
    const dessous = posCadre.y - ecart;

    // La ligne « Snack du Marché » : les deux mots séparés d'une espace de la
    // police (0,13 em), réduits pour tenir entre les marges et dans la place
    // au-dessus de la photo.
    // Chaque plaque déborde du mot de son rembourrage et de son filet : une
    // fois la céramique effacée, il ne reste que les lettres, qu'on
    // rapproche d'autant.
    const styleMot = getComputedStyle(gauche);
    const bord = parseFloat(styleMot.paddingLeft) + parseFloat(styleMot.borderLeftWidth);
    const espace = parseFloat(styleMot.fontSize) * 0.13 - 2 * bord;
    const longueur = gauche.offsetWidth + espace + droite.offsetWidth;
    const echelle = Math.max(
      0.2,
      Math.min(1, (largeur - 2 * marge) / longueur, (dessous - dessus) / (gauche.offsetHeight * 1.4)),
    );
    const bande = gauche.offsetHeight * echelle * 1.4;
    const centre = (dessus + dessous) / 2;
    const debutLigne = (largeur - longueur * echelle) / 2;

    // La photo grandit vers le bas, sans toucher le bandeau du bas ni la
    // section qui monte ensuite.
    const limite = Math.min(positionDans(bas, hero).y, hauteur * (1 - RECOUVREMENT)) - ecart;
    const croissance = Math.max(1, Math.min(bureau ? 1.12 : 1.3, (limite - posCadre.y) / cadre.offsetHeight));

    return {
      echelle,
      croissance,
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
      // Découpes de l'enseigne : un bandeau sans largeur au milieu de
      // l'écran, qui se déroule jusqu'aux bords.
      depart: `inset(${centre - bande / 2}px ${largeur / 2}px ${hauteur - centre - bande / 2}px ${largeur / 2}px)`,
      arrivee: `inset(${centre - bande / 2}px 0px ${hauteur - centre - bande / 2}px 0px)`,
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
    .fromTo(enseigne, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ease: "none" }, 0)
    .to(
      gauche,
      { x: () => mesurer().gauche.x, y: () => mesurer().gauche.y, scale: () => mesurer().echelle, duration: 0.75 },
      0.05,
    )
    .to(
      droite,
      { x: () => mesurer().droite.x, y: () => mesurer().droite.y, scale: () => mesurer().echelle, duration: 0.75 },
      0.05,
    )
    // L'enseigne se déroule depuis le milieu pendant que les mots arrivent.
    .fromTo(enseigne, { clipPath: () => mesurer().depart }, { clipPath: () => mesurer().arrivee, duration: 0.6 }, 0.3)
    // La photo reste entière, et prend la place que les mots lui laissent.
    .fromTo(
      cadre,
      { scale: 1, transformOrigin: "50% 0%" },
      { scale: () => mesurer().croissance, transformOrigin: "50% 0%", duration: 0.8 },
      0.05,
    )
    // La céramique des plaques s'efface, les lettres passent à l'ivoire : le
    // nom est désormais écrit sur l'enseigne.
    .to(
      [gauche, droite],
      {
        backgroundColor: "rgba(251, 249, 242, 0)",
        borderColor: "rgba(18, 38, 160, 0)",
        color: "#fbf9f2",
        duration: 0.35,
        ease: "power1.inOut",
      },
      0.4,
    )
    // Un temps d'arrêt sur l'enseigne complète avant que la page ne reparte.
    .to({}, { duration: 0.15 });
}
