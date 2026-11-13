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
 * Part du bas du haut de page que la section suivante recouvre en montant.
 * Plus aucune : le haut de page finit sur sa barre du bas, le mur de faïence
 * continue dessous ; la photo, en grandissant, s'arrête au-dessus de la barre.
 */
const RECOUVREMENT = 0;

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
 * Le nom qui se rassemble, lié au défilement : les deux plaques de céramique
 * glissent l'une vers l'autre et se posent côte à côte, sur une seule ligne,
 * sous la frise, puis une plaque unique prend leur place d'un seul bloc :
 * aucun joint entre les deux mots, aucun bandeau. La photo remonte sous elle
 * et grandit un peu vers le bas.
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initNom(outils, bureau) {
  const { gsap } = outils;

  const hero = element(".hero");
  const cadre = element(".hero__cadre");
  const gauche = element(".hero__mot--gauche");
  const droite = element(".hero__mot--droite");

  const nom = element(".hero__nom");
  const bordure = element(".hero__bande");
  const titre = element(".hero__titre");
  const bas = element(".hero__bas");

  /**
   * Les positions de départ et d'arrivée, mesurées sur la mise en page (les
   * transformations en cours n'y entrent pas), une seule fois par état de la
   * page : chaque demande forcerait sinon une remise en page complète.
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

    // Les plaques se posent sous la frise, après son double filet (6 px).
    const dessus = positionDans(bordure, hero).y + bordure.offsetHeight + 6 + ecart;
    const place = posCadre.y - ecart - dessus;

    // La ligne : les deux plaques se chevauchent de 0,23 em (leur rembourrage
    // et leur filet), ce qui laisse entre les lettres l'espace d'un mot.
    // Réduites pour tenir entre les marges et dans la place au-dessus de la
    // photo.
    const styleMot = getComputedStyle(gauche);
    const taille = parseFloat(styleMot.fontSize);
    const joint = -0.23 * taille;
    const longueur = gauche.offsetWidth + joint + droite.offsetWidth;
    const echelle = Math.max(0.2, Math.min(1, (largeur - 2 * marge) / longueur, place / gauche.offsetHeight));
    const hautPlaque = gauche.offsetHeight * echelle;
    const centre = dessus + hautPlaque / 2;
    const debutLigne = (largeur - longueur * echelle) / 2;

    // La photo remonte sous les plaques, puis grandit vers le bas, sans
    // toucher la barre du bas.
    const cible = dessus + hautPlaque + Math.max(16, hauteur * 0.03);
    const monte = Math.min(0, cible - posCadre.y);
    const haut = posCadre.y + monte;
    const limite = Math.min(positionDans(bas, hero).y, hauteur * (1 - RECOUVREMENT)) - ecart;
    const croissance = Math.max(1, Math.min(bureau ? 1.12 : 1.3, (limite - haut) / cadre.offsetHeight));

    // La plaque unique, au même endroit que les deux plaques une fois jointes.
    // L'espace entre ses deux mots est réglé pour que chaque lettre tombe où
    // elle était sur sa plaque.
    nom.style.setProperty("--nom-taille", `${taille}px`);
    nom.style.setProperty("--nom-espace", "0px");
    const naturel = nom.offsetWidth;
    nom.style.setProperty("--nom-espace", `${longueur - naturel}px`);
    nom.style.setProperty("--nom-echelle", String(echelle));
    nom.style.setProperty("--nom-x", `${debutLigne}px`);
    nom.style.setProperty("--nom-y", `${centre - hautPlaque / 2}px`);

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
          (gauche.offsetWidth + joint) * echelle +
          (droite.offsetWidth * echelle) / 2 -
          (posDroite.x + droite.offsetWidth / 2),
        y: centre - (posDroite.y + droite.offsetHeight / 2),
      },
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
      0.1,
    );

  // Les plaques se touchent : la plaque unique prend leur place, d'un seul
  // bloc, sans que rien ne bouge.
  scene
    .fromTo(nom, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ease: "none" }, 0.86)
    .to([gauche, droite], { autoAlpha: 0, duration: 0.01, ease: "none" }, 0.86);

  // La photo reste entière : elle remonte sous les plaques et prend la place
  // qu'elles lui laissent.
  scene.fromTo(
    cadre,
    { y: 0, scale: 1, transformOrigin: "50% 0%" },
    { y: () => mesurer().monte, scale: () => mesurer().croissance, transformOrigin: "50% 0%", duration: 0.8 },
    bureau ? 0.05 : 0.15,
  );

  // Un temps d'arrêt sur le nom rassemblé avant que la page ne reparte.
  scene.to({}, { duration: 0.15 });
}
