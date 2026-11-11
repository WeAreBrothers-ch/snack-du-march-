/**
 * Le haut de page.
 *
 * L'entrée : pas de rideau ni de mots qui tournent. La photo et son cadre se
 * découvrent de bas en haut, comme un store qu'on lève à l'ouverture, et les
 * deux plaques du nom apparaissent. Une seconde, et le défilement reste libre
 * dès le premier instant.
 *
 * L'enseigne : au défilement, le hero reste épinglé. Les deux plaques se
 * rejoignent au-dessus de la photo pour former « Snack du Marché » sur une
 * seule ligne, sur un bandeau cobalt qui se déroule depuis le milieu, comme
 * l'enseigne au-dessus de la vitrine : la céramique s'efface, les lettres
 * passent à l'ivoire. La photo reste entière : rien ne passe dessus, et
 * elle grandit un peu vers le bas, dans la place que les mots lui laissent.
 */

import { element, elements, positionDans, SCRUB } from "./lib.js";

/**
 * Part du bas du haut de page que la section suivante recouvre en montant
 * (histoire.css, 15 %), plus la jonction en dégradé qui la précède : la
 * photo, en grandissant, s'arrête au-dessus.
 */
const RECOUVREMENT = 0.22;

/**
 * Crée et lance l'entrée. Les états de départ sont posés immédiatement, avant
 * que la page ne retire son masque d'attente (classe « anime »).
 *
 * Une seule idée : la photo, avec son cadre, se découvre de bas en haut ; les
 * deux plaques du nom apparaissent à son rythme. Les barres, la bordure et
 * le mur sont là dès le premier instant : ils ne bougent pas. Rien ne monte
 * à l'intérieur des plaques (un texte qui sort d'une fente laissait d'abord
 * des plaques vides).
 * @param {import("./lib.js").Outils} outils
 */
export function jouerEntree(outils) {
  const { gsap } = outils;

  const cadre = element(".hero__cadre");
  const photo = element(".hero__photo");
  const mots = elements(".hero__mot");

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .fromTo(
      cadre,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut", clearProps: "clipPath" },
      0,
    )
    .fromTo(photo, { scale: 1.18 }, { scale: 1, duration: 1.4 }, 0)
    .fromTo(mots, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.12, ease: "power2.out" }, 0.35);
}

/**
 * Quand la mise en page change après l'entrée, le haut de page retrouve son
 * état naturel sans rejouer l'animation.
 * @param {import("./lib.js").Outils} outils
 */
export function retablirHero(outils) {
  outils.gsap.set([".hero__cadre", ".hero__photo", ".hero__mot"], {
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
  const nom = element(".hero__enseigne-nom");

  const bordure = element(".hero__bande");
  const titre = element(".hero__titre");
  const bas = element(".hero__bas");

  /**
   * Les positions de départ et d'arrivée, mesurées sur la mise en page (les
   * transformations en cours n'y entrent pas). Chaque animation les demande
   * (une dizaine de fois par calcul) : on ne mesure qu'une fois par état de
   * la page, sinon chaque demande force une remise en page complète.
   * @type {ReturnType<typeof calculer> | null}
   */
  let mesure = null;
  let cle = "";
  function mesurer() {
    const courante = `${hero.offsetWidth}x${hero.offsetHeight}x${window.innerHeight}`;
    if (!mesure || cle !== courante) {
      mesure = calculer();
      cle = courante;
    }
    return mesure;
  }

  function calculer() {
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
    const centre = (dessus + dessous) / 2;
    let bande = gauche.offsetHeight * echelle * 1.4;
    if (!bureau) {
      // Sur téléphone, le nom est écrit sur l'enseigne même : on le
      // dimensionne pour qu'il tienne entre les marges et dans la place
      // au-dessus de la photo.
      const taille = parseFloat(styleMot.fontSize);
      nom.style.fontSize = `${taille}px`;
      const reduction = Math.max(
        0.2,
        Math.min(1, (largeur - 2 * marge) / nom.offsetWidth, (dessous - dessus) / (taille * 1.6)),
      );
      nom.style.fontSize = `${taille * reduction}px`;
      nom.style.top = `${centre}px`;
      bande = taille * reduction * 1.6;
    }
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
      // Découpes de l'enseigne : un point au milieu de l'écran (et non une
      // fente haute comme le bandeau), qui s'ouvre en bandeau jusqu'aux bords.
      depart: `inset(${centre}px ${largeur / 2}px ${hauteur - centre}px ${largeur / 2}px)`,
      arrivee: `inset(${centre - bande / 2}px 0px ${hauteur - centre - bande / 2}px 0px)`,
    };
  }

  const scene = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: ".accueil",
      start: "top top",
      end: "bottom bottom",
      scrub: SCRUB,
      invalidateOnRefresh: true,
      onRefreshInit: () => {
        mesure = null;
      },
    },
  });

  scene.fromTo(enseigne, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ease: "none" }, bureau ? 0 : 0.1);

  if (bureau) {
    // Les deux plaques glissent jusqu'à leur place sur la ligne.
    scene
      .to(
        gauche,
        { x: () => mesurer().gauche.x, y: () => mesurer().gauche.y, scale: () => mesurer().echelle, duration: 0.75 },
        0.05,
      )
      .to(
        droite,
        { x: () => mesurer().droite.x, y: () => mesurer().droite.y, scale: () => mesurer().echelle, duration: 0.75 },
        0.05,
      );
  } else {
    // Sur téléphone, rien ne traverse la photo : les plaques s'effacent sur
    // place, pendant que l'enseigne, nom déjà écrit, s'ouvre derrière.
    scene.to([gauche, droite], { autoAlpha: 0, duration: 0.35, ease: "power1.in" }, 0.15);
  }

  // L'enseigne se déroule depuis le milieu.
  scene.fromTo(
    enseigne,
    { clipPath: () => mesurer().depart },
    { clipPath: () => mesurer().arrivee, duration: 0.6 },
    bureau ? 0.3 : 0.1,
  );

  // La photo reste entière, et prend la place que les mots lui laissent.
  scene.fromTo(
    cadre,
    { scale: 1, transformOrigin: "50% 0%" },
    { scale: () => mesurer().croissance, transformOrigin: "50% 0%", duration: 0.8 },
    0.05,
  );

  if (bureau) {
    // La céramique des plaques s'efface, les lettres passent à l'ivoire : le
    // nom est désormais écrit sur l'enseigne.
    scene.to(
      [gauche, droite],
      {
        backgroundColor: "rgba(251, 249, 242, 0)",
        borderColor: "rgba(18, 38, 160, 0)",
        color: "#fbf9f2",
        duration: 0.35,
        ease: "power1.inOut",
      },
      0.4,
    );
  }

  // Un temps d'arrêt sur l'enseigne complète avant que la page ne reparte.
  scene.to({}, { duration: 0.15 });
}
