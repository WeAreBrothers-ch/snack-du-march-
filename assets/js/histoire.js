/**
 * L'histoire : on entre dans la maison.
 *
 * L'intro est une scène plein écran : le titre, et entre ses deux lignes une
 * vitrine où la devanture se découvre en arrivant. Pendant une courte pause,
 * la vitrine s'ouvre en grand, jusqu'aux bords de l'écran, et la photo
 * recule comme si l'on passait la porte. Sur grand écran, les photos de
 * l'album s'écartent pour lui faire place.
 *
 * Sur téléphone, un ruban de photos glisse de côté sous la vitrine, puis
 * s'efface quand elle s'ouvre.
 *
 * Puis trois cartes s'empilent par-dessus la devanture, qui recule et
 * s'assombrit : chacune se colle en haut de l'écran et laisse dépasser son
 * onglet (l'année, le titre) quand la suivante la recouvre.
 *
 * Les déclencheurs sont posés sur la section, la pause et les cartes, jamais
 * sur l'intro : un élément collé fausserait les mesures.
 */

import { element, elements, positionDans, SCRUB } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 * @returns {() => void} fonction de nettoyage (changement de mise en page)
 */
export function initHistoire(outils, bureau) {
  const pauseIntro = element(".histoire__pause--intro");

  const nettoyerMur = alignerMur(outils);
  initIntro(outils, bureau, pauseIntro);
  // Quand les cartes montent par-dessus la devanture, celle-ci recule et
  // s'assombrit.
  reculer(outils, element(".histoire__intro"), element(".histoire__recul"), pauseIntro, bureau);
  const nettoyerPile = initPile(outils);
  return () => {
    nettoyerPile();
    nettoyerMur();
  };
}

/**
 * Le mur derrière les cartes est le même carreau que celui de la page, mais il
 * est peint par un autre élément : il faut le décaler de la hauteur qui
 * sépare le haut de la page du haut de ce mur, pour que les deux se
 * raccordent. Remesuré à chaque calcul des animations (une photo qui arrive
 * déplace tout).
 * @param {import("./lib.js").Outils} outils
 * @returns {() => void}
 */
function alignerMur(outils) {
  const mur = element(".histoire__mur");
  const aligner = () => {
    mur.style.setProperty("--mur-y", `${-Math.round(mur.getBoundingClientRect().top + window.scrollY)}px`);
  };
  aligner();
  outils.ScrollTrigger.addEventListener("refreshInit", aligner);
  return () => outils.ScrollTrigger.removeEventListener("refreshInit", aligner);
}

/**
 * Le titre monte ; la devanture se découvre dans sa vitrine, puis s'ouvre.
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 * @param {HTMLElement} pauseIntro
 */
function initIntro(outils, bureau, pauseIntro) {
  const { gsap, SplitText } = outils;

  const intro = element(".histoire__intro");
  const fenetre = element(".histoire__fenetre");
  const devanture = element("img", fenetre);
  const vitrine = element(".histoire__vitrine");
  const titre = decouperEnLignes(SplitText, element(".histoire__titre"));
  const sousTitre = decouperEnLignes(SplitText, element(".histoire__sous"));
  const photos = elements(".histoire__cadre");
  const ruban = element(".histoire__photos");

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".histoire", start: "top 70%", toggleActions: "play none none reverse" },
    })
    .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(sousTitre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.06 }, "<0.3");

  if (bureau) {
    // L'album entoure le titre : ses photos se découvrent avec lui.
    gsap.fromTo(
      photos,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".histoire", start: "top 55%", toggleActions: "play none none reverse" },
      },
    );
  }

  /**
   * La vitrine, mesurée sur la mise en page (sans les transformations),
   * une seule fois par état de la page (voir hero.js).
   * @type {ReturnType<typeof calculer> | null}
   */
  let mesure = null;
  let cle = "";
  function mesurer() {
    const courante = `${intro.offsetWidth}x${intro.offsetHeight}x${window.innerHeight}`;
    if (!mesure || cle !== courante) {
      mesure = calculer();
      cle = courante;
    }
    return mesure;
  }

  function calculer() {
    const largeur = intro.offsetWidth;
    const hauteur = intro.offsetHeight;
    const position = positionDans(vitrine, intro);
    const rayon = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.75;
    const droite = largeur - position.x - vitrine.offsetWidth;
    const bas = hauteur - position.y - vitrine.offsetHeight;
    return {
      fermee: `inset(${position.y + vitrine.offsetHeight}px ${droite}px ${bas}px ${position.x}px round ${rayon}px)`,
      vitrine: `inset(${position.y}px ${droite}px ${bas}px ${position.x}px round ${rayon}px)`,
    };
  }

  // Une seule ligne de temps, liée au défilement : la section monte dans
  // l'écran (0 → 0,8), puis l'intro reste en place le temps de la pause
  // (0,8 → 1,7). Les durées suivent ces distances.
  const scene = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".histoire",
      start: "top 80%",
      endTrigger: pauseIntro,
      end: "bottom bottom",
      scrub: SCRUB,
      invalidateOnRefresh: true,
      onRefreshInit: () => {
        mesure = null;
      },
    },
  });

  scene
    // La devanture se découvre de bas en haut dans sa vitrine.
    .fromTo(
      fenetre,
      { clipPath: () => mesurer().fermee },
      { clipPath: () => mesurer().vitrine, duration: 0.55, ease: "power2.out" },
      0,
    )
    .fromTo(devanture, { scale: 1.45 }, { scale: 1.3, duration: 0.8 }, 0)
    // Pendant la pause, elle s'ouvre jusqu'aux bords, et la photo recule.
    // Départ explicite : sinon GSAP relit la découpe calculée par le
    // navigateur, qui abrège « inset(a b c b) » en trois valeurs et confond
    // alors le bord gauche avec le rayon (l'ouverture partait de travers).
    .fromTo(
      fenetre,
      { clipPath: () => mesurer().vitrine },
      { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 0.8, ease: "power2.inOut", immediateRender: false },
      0.85,
    )
    .to(devanture, { scale: 1, duration: 0.85, ease: "power2.out" }, 0.85)
    .fromTo(element(".histoire__fenetre-voile"), { opacity: 0.3 }, { opacity: 0.5, duration: 0.8 }, 0.85);


  if (bureau) {
    // Les photos de l'album s'écartent du centre et s'effacent.
    photos.forEach((photo) => {
      const ecart = () => {
        const position = positionDans(photo, intro);
        return {
          x: (position.x + photo.offsetWidth / 2 - intro.offsetWidth / 2) * 0.6,
          y: (position.y + photo.offsetHeight / 2 - intro.offsetHeight / 2) * 0.6,
        };
      };
      scene.to(
        photo,
        { x: () => ecart().x, y: () => ecart().y, scale: 1.15, autoAlpha: 0, duration: 0.75, ease: "power2.in" },
        0.85,
      );
    });
  }

  if (!bureau) {
    // Téléphone : le ruban de photos arrive, glisse de côté pendant que la
    // vitrine se découvre, puis s'efface quand elle s'ouvre.
    const course = () => Math.max(0, ruban.offsetWidth + 2 * parseFloat(getComputedStyle(ruban).marginLeft) - intro.offsetWidth);
    scene
      .fromTo(ruban, { autoAlpha: 0, x: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" }, 0)
      .fromTo(ruban, { x: 0 }, { x: () => -course(), duration: 1.0, ease: "none", immediateRender: false }, 0)
      .to(ruban, { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, 0.85);
  }

  // Le temps de lire, sur la devanture ouverte.
  scene.to({}, { duration: 0.05 });
}

/**
 * Pendant qu'un panneau suivant glisse par-dessus, celui-ci recule, et son
 * voile s'assombrit (l'opacité d'un calque à part : rien n'est repeint).
 * @param {import("./lib.js").Outils} outils
 * @param {HTMLElement} panneau
 * @param {HTMLElement} voile
 * @param {HTMLElement} pause la pause qui défile pendant ce temps
 * @param {boolean} bureau
 */
function reculer(outils, panneau, voile, pause, bureau) {
  const parcours = { trigger: pause, start: "bottom bottom", end: "bottom top", scrub: SCRUB };
  outils.gsap.to(panneau, {
    scale: bureau ? 0.92 : 0.94,
    ease: "none",
    scrollTrigger: parcours,
  });
  outils.gsap.fromTo(voile, { opacity: 0 }, { opacity: 0.6, ease: "none", scrollTrigger: { ...parcours } });
}

/**
 * Les cartes. Chacune se découvre en arrivant : l'année se compte (les 36
 * ans qui précèdent défilent, comme un compteur), la photo se découvre de
 * bas en haut, le texte monte ligne par ligne. Quand la suivante la
 * recouvre, une carte s'assombrit : son voile prend de l'opacité au rythme
 * du défilement. L'empilement lui-même est en CSS (position: sticky).
 * @param {import("./lib.js").Outils} outils
 * @returns {() => void} rend leur année aux cartes (changement de mise en page)
 */
function initPile(outils) {
  const { gsap, SplitText } = outils;
  const chapitres = elements(".chapitre");

  chapitres.forEach((chapitre, index) => {
    const annee = element(".chapitre__annee", chapitre);
    const cible = Number(annee.dataset.annee);
    const compteur = { v: cible - 36 };
    annee.textContent = String(compteur.v);

    const photo = element(".chapitre__photo", chapitre);
    const image = element("img", photo);
    const titre = decouperEnLignes(SplitText, element(".chapitre__titre", chapitre));
    const recit = decouperEnLignes(SplitText, element(".chapitre__recit", chapitre));
    const citation = chapitre.querySelector(".chapitre__citation");

    const entree = gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: chapitre, start: "top 82%", toggleActions: "play none none none" },
      })
      .to(
        compteur,
        {
          v: cible,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            annee.textContent = String(Math.round(compteur.v));
          },
        },
        0,
      )
      .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8 }, 0.1)
      .fromTo(photo, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" }, 0.15)
      .fromTo(image, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: "power2.out" }, 0.15);
    if (citation) {
      entree.fromTo(citation, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.4);
    }
    entree.fromTo(recit.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, 0.45);

    // Recouverte par la suivante : le voile s'assombrit.
    const suivante = chapitres[index + 1];
    if (suivante) {
      gsap.fromTo(
        element(".chapitre__voile", chapitre),
        { opacity: 0 },
        {
          opacity: 0.45,
          ease: "none",
          scrollTrigger: { trigger: suivante, start: "top 85%", end: "top 30%", scrub: true },
        },
      );
    }
  });

  return () => {
    chapitres.forEach((chapitre) => {
      const annee = element(".chapitre__annee", chapitre);
      annee.textContent = annee.dataset.annee || "";
    });
  };
}
