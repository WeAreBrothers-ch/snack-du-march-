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
 * passent à l'ivoire. Sur téléphone, « Marché », posé sous la photo, monte
 * devant elle pour rejoindre « Snack du ». La photo reste entière : elle
 * remonte sous l'enseigne et grandit un peu vers le bas, dans la place que
 * les mots lui laissent.
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

    // L'enseigne s'accroche sous la frise, après son filet ivoire (3 px) ;
    // elle a pour hauteur ce que la photo lui laisse, double filet du bas
    // (6 px) et respiration compris.
    const dessus = positionDans(bordure, hero).y + bordure.offsetHeight + 3;
    const place = posCadre.y - ecart - 6 - dessus;

    // La ligne « Snack du Marché » : les deux mots séparés d'une espace de la
    // police (0,22 em), réduits pour tenir entre les marges et dans la place
    // au-dessus de la photo.
    // Chaque plaque déborde du mot de son rembourrage et de son filet : une
    // fois la céramique effacée, il ne reste que les lettres, qu'on
    // rapproche d'autant.
    const styleMot = getComputedStyle(gauche);
    const bord = parseFloat(styleMot.paddingLeft) + parseFloat(styleMot.borderLeftWidth);
    const espace = parseFloat(styleMot.fontSize) * 0.22 - 2 * bord;
    const longueur = gauche.offsetWidth + espace + droite.offsetWidth;
    const echelle = Math.max(0.2, Math.min(1, (largeur - 2 * marge) / longueur, place / (gauche.offsetHeight * 1.4)));
    const bande = gauche.offsetHeight * echelle * 1.4;
    enseigne.style.setProperty("--enseigne-haut", `${dessus}px`);
    enseigne.style.setProperty("--enseigne-hauteur", `${bande}px`);
    const centre = dessus + bande / 2;
    const debutLigne = (largeur - longueur * echelle) / 2;

    // La photo remonte sous l'enseigne, comme la vitrine sous son fronton,
    // puis grandit vers le bas, sans toucher le bandeau du bas ni la section
    // qui monte ensuite.
    const cible = dessus + bande + 6 + Math.max(16, hauteur * 0.03);
    const monte = Math.min(0, cible - posCadre.y);
    const haut = posCadre.y + monte;
    const limite = Math.min(positionDans(bas, hero).y, hauteur * (1 - RECOUVREMENT)) - ecart;
    const croissance = Math.max(1, Math.min(bureau ? 1.12 : 1.3, (limite - haut) / cadre.offsetHeight));

    return {
      echelle,
      monte,
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
      // Découpes de l'enseigne : un point au milieu de l'écran, qui s'ouvre
      // en bandeau jusqu'aux bords. À l'arrivée, la découpe descend sous le
      // bandeau pour laisser voir son double filet.
      depart: `inset(${bande / 2}px ${largeur / 2}px ${bande / 2}px ${largeur / 2}px)`,
      arrivee: "inset(0px 0px -6px 0px)",
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

  scene.fromTo(enseigne, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ease: "none" }, 0);

  // Les deux plaques glissent jusqu'à leur place sur la ligne. Sur
  // téléphone, « Marché » monte de sous la photo et passe devant elle pour
  // rejoindre « Snack du ».
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

  // L'enseigne se déroule depuis le milieu. Sur téléphone, elle est en
  // place plus tôt : « Marché » arrive par en dessous et doit trouver le
  // bandeau déjà là.
  scene.fromTo(
    enseigne,
    { clipPath: () => mesurer().depart },
    { clipPath: () => mesurer().arrivee, duration: bureau ? 0.6 : 0.45 },
    bureau ? 0.3 : 0.15,
  );

  // La photo reste entière : elle remonte sous l'enseigne et prend la place
  // que les mots lui laissent.
  scene.fromTo(
    cadre,
    { y: 0, scale: 1, transformOrigin: "50% 0%" },
    { y: () => mesurer().monte, scale: () => mesurer().croissance, transformOrigin: "50% 0%", duration: 0.8 },
    bureau ? 0.05 : 0.15,
  );

  // La céramique des plaques s'efface, les lettres passent à l'ivoire : le
  // nom est désormais écrit sur l'enseigne. Chaque plaque s'efface quand
  // elle arrive sur le bandeau, pas avant (des lettres ivoire sur le mur ne
  // se lisent pas) : sur téléphone, « Snack du », tout proche, d'abord ;
  // « Marché », qui monte de sous la photo, ensuite.
  const effacer = {
    backgroundColor: "rgba(251, 249, 242, 0)",
    borderColor: "rgba(18, 38, 160, 0)",
    color: "#fbf9f2",
    ease: "power1.inOut",
  };
  if (bureau) {
    scene.to([gauche, droite], { ...effacer, duration: 0.35 }, 0.4);
  } else {
    scene.to(gauche, { ...effacer, duration: 0.25 }, 0.42).to(droite, { ...effacer, duration: 0.25 }, 0.55);
  }

  // Un temps d'arrêt sur l'enseigne complète avant que la page ne reparte.
  scene.to({}, { duration: 0.15 });
}
