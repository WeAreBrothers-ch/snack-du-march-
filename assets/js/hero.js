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
 * sous la frise, et la seconde se fond dans la première (--jointure, calculée
 * sur leur position réelle) : une seule plaque, sans joint, sans remplacement
 * d'élément, sans bandeau. La
 * photo remonte sous elle et grandit un peu vers le bas.
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

    // Les deux plaques sont mesurées à la fraction de pixel (et non à l'entier
    // d'offsetTop / offsetHeight) : arrondies, leurs positions finales
    // différaient de quelques dixièmes de pixel, et leurs filets du haut et du
    // bas ne tombaient plus sur les mêmes lignes de l'écran (un cran d'un pixel
    // à la jonction). Transformations retirées le temps de la mesure.
    const ancien = [gauche.style.transform, droite.style.transform];
    gauche.style.transform = "none";
    droite.style.transform = "none";
    const rh = hero.getBoundingClientRect();
    const rg = gauche.getBoundingClientRect();
    const rd = droite.getBoundingClientRect();
    [gauche.style.transform, droite.style.transform] = ancien;
    const posGauche = { x: rg.left - rh.left, y: rg.top - rh.top };
    const posDroite = { x: rd.left - rh.left, y: rd.top - rh.top };
    const larG = rg.width;
    const larD = rd.width;
    const hauPlaque = rg.height;

    // Les plaques se posent sous la frise, après son double filet (6 px).
    const dessus = positionDans(bordure, hero).y + bordure.offsetHeight + 6 + ecart;
    const place = posCadre.y - ecart - dessus;

    // La ligne : les deux plaques se chevauchent de 0,23 em (leur rembourrage
    // et leur filet), ce qui laisse entre les lettres l'espace d'un mot.
    // Réduites pour tenir entre les marges et dans la place au-dessus de la
    // photo.
    const styleMot = getComputedStyle(gauche);
    const taille = parseFloat(styleMot.fontSize);
    const taille0 = taille;
    const joint = -0.23 * taille;
    const longueur = larG + joint + larD;
    const echelle = Math.max(0.2, Math.min(1, (largeur - 2 * marge) / longueur, place / hauPlaque));
    const hautPlaque = hauPlaque * echelle;
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
    nom.style.setProperty("--nom-taille", `${taille0}px`);
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
        x: debutLigne + (larG * echelle) / 2 - (posGauche.x + larG / 2),
        y: centre - (posGauche.y + hauPlaque / 2),
      },
      droite: {
        x:
          debutLigne +
          (larG + joint) * echelle +
          (larD * echelle) / 2 -
          (posDroite.x + larD / 2),
        y: centre - (posDroite.y + hauPlaque / 2),
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
  // Les deux plaques partent et arrivent ensemble, en ralentissant : elles se
  // posent l'une sur l'autre sans choc. À l'arrivée, « Marché » recouvre d'un
  // rien (0,23 em : le rembourrage et le filet de « Snack du », où il n'y a
  // pas de lettres) ; leurs lettres sont alors à un espace de mot l'une de
  // l'autre.
  scene
    .to(
      gauche,
      {
        x: () => mesurer().gauche.x,
        y: () => mesurer().gauche.y,
        scale: () => mesurer().echelle,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0.04,
    )
    .to(
      droite,
      {
        x: () => mesurer().droite.x,
        y: () => mesurer().droite.y,
        scale: () => mesurer().echelle,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0.04,
    );

  // La jonction. Le bord gauche de « Marché » (filet et coins) s'efface au
  // moment précis où il arrive sur le bord droit de « Snack du » : on mesure la
  // position réelle des deux plaques, à chaque image, et non un minutage
  // approximatif. --jointure va de 0 à 1 sur les 0,05 premiers em de
  // chevauchement (le filet de « Marché » s'amincit pendant qu'il glisse sur
  // celui de « Snack du » : le trait ne se voit jamais seul), et seulement quand
  // les deux plaques sont à la même hauteur (sinon « Marché » n'est qu'une plaque
  // qui passe devant l'autre). À l'arrivée, la valeur est exactement 1.
  const taille = parseFloat(getComputedStyle(gauche).fontSize);
  let precedent = -1;

  const raccorder = () => {
    const a = gauche.getBoundingClientRect();
    const b = droite.getBoundingClientRect();
    const em = (a.width / gauche.offsetWidth) * taille;
    const chevauche = (a.right - b.left) / em;
    const decalage = Math.abs((a.top + a.bottom) / 2 - (b.top + b.bottom) / 2) / em;
    const jx = Math.min(1, Math.max(0, chevauche / 0.05));
    // Une tolérance de 0,06 em : un écart d'un demi-pixel entre les deux plaques
    // (arrondis) ne doit pas empêcher la fusion complète à l'arrivée.
    const jy = Math.min(1, Math.max(0, 1 - (decalage - 0.06) / 0.14));
    const j = Math.round(Math.min(jx, jy) * 100) / 100;
    if (j !== precedent) {
      precedent = j;
      droite.style.setProperty("--jointure", String(j));
      // Fusion complète : la plaque unique prend la place des deux, d'un seul
      // bloc. Les deux plaques sont alors déjà fondues l'une dans l'autre (même
      // aspect) : l'échange ne se voit pas, et il n'y a plus qu'un seul élément,
      // donc plus aucun filet décalé d'un pixel.
      const fusionnee = j >= 1;
      nom.style.visibility = fusionnee ? "visible" : "hidden";
      gauche.style.visibility = fusionnee ? "hidden" : "";
      droite.style.visibility = fusionnee ? "hidden" : "";
    }
  };
  scene.eventCallback("onUpdate", raccorder);
  raccorder();

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
