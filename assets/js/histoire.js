/**
 * L'histoire : on entre dans la maison.
 *
 * L'intro est une scène plein écran : le titre, et entre ses deux lignes une
 * vitrine où la devanture se découvre en arrivant. Pendant une courte pause,
 * la vitrine s'ouvre en grand, jusqu'aux bords de l'écran, et la photo
 * recule comme si l'on passait la porte. Sur grand écran, les photos de
 * l'album s'écartent pour lui faire place.
 *
 * Puis les trois cartes s'empilent (l'empilement lui-même est en CSS, avec
 * position: sticky) : chacune glisse par-dessus la précédente, qui recule et
 * s'assombrit. Pendant qu'une carte est à l'écran, sa grande année glisse
 * de côté et sa photo prend de la profondeur, au rythme du défilement.
 *
 * Les déclencheurs sont posés sur la section et sur les pauses, jamais sur
 * l'intro ni sur les cartes : un élément collé fausserait les mesures.
 */

import { element, elements, positionDans } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initHistoire(outils, bureau) {
  // La pause qui suit l'intro, puis celles qui suivent chaque carte.
  const pauses = elements(".histoire__pause");
  const [pauseIntro] = pauses;

  initIntro(outils, bureau, pauseIntro);
  reculer(outils, element(".histoire__intro"), pauseIntro, { "--recul": 0.6 }, bureau);

  elements(".etape").forEach((etape, index) => {
    const avant = pauses[index];
    const apres = pauses[index + 1];

    revelerEtape(outils, etape, { trigger: avant, start: "bottom 55%" });
    animerPendant(outils, etape, avant, apres);

    if (apres) {
      reculer(outils, etape, apres, { "--voile": 0.6, rotate: bureau ? (index % 2 === 0 ? 1.5 : -1.5) : 0 }, bureau);
    }
  });
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

  /** La vitrine, mesurée sur la mise en page (sans les transformations). */
  function mesurer() {
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
      scrub: 0.6,
      invalidateOnRefresh: true,
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
    .to(fenetre, { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 0.8, ease: "power2.inOut" }, 0.85)
    .to(devanture, { scale: 1, duration: 0.85, ease: "power2.out" }, 0.85)
    .fromTo(fenetre, { "--voile": 0.3 }, { "--voile": 0.5, duration: 0.8 }, 0.85);

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

  // Le temps de lire, sur la devanture ouverte.
  scene.to({}, { duration: 0.05 });
}

/**
 * Pendant qu'un panneau suivant glisse par-dessus, celui-ci recule.
 * @param {import("./lib.js").Outils} outils
 * @param {HTMLElement} panneau
 * @param {HTMLElement} pause la pause qui défile pendant ce temps
 * @param {Record<string, number>} proprietes
 * @param {boolean} bureau
 */
function reculer(outils, panneau, pause, proprietes, bureau) {
  outils.gsap.to(panneau, {
    scale: bureau ? 0.9 : 0.94,
    ...proprietes,
    ease: "none",
    scrollTrigger: { trigger: pause, start: "bottom bottom", end: "bottom top", scrub: 1 },
  });
}

/**
 * Tant que la carte est à l'écran (de son arrivée au moment où la suivante
 * l'a recouverte) : l'année glisse depuis la droite jusqu'à sa place, la
 * photo prend de la profondeur.
 * @param {import("./lib.js").Outils} outils
 * @param {HTMLElement} etape
 * @param {HTMLElement} avant
 * @param {HTMLElement | undefined} apres
 */
function animerPendant(outils, etape, avant, apres) {
  const { gsap } = outils;
  const fin = apres || ".histoire";

  // L'année est en place quand la carte suivante commence à monter.
  gsap.fromTo(
    element(".etape__annee", etape),
    { xPercent: 30 },
    {
      xPercent: 0,
      ease: "power1.out",
      scrollTrigger: { trigger: avant, start: "bottom bottom", endTrigger: fin, end: "bottom bottom", scrub: true },
    },
  );
  // La photo glisse dans son cadre jusqu'à ce que la carte soit recouverte.
  gsap.fromTo(
    element(".etape__cadre img", etape),
    { yPercent: -8, scale: 1.18 },
    {
      yPercent: 8,
      scale: 1.18,
      ease: "none",
      scrollTrigger: { trigger: avant, start: "bottom bottom", endTrigger: fin, end: "bottom top", scrub: true },
    },
  );
}

/**
 * Fait monter l'année, le titre et le texte d'une carte ; découvre sa photo.
 * @param {import("./lib.js").Outils} outils
 * @param {HTMLElement} etape
 * @param {{ trigger: HTMLElement | string, start: string }} declencheur
 */
function revelerEtape(outils, etape, declencheur) {
  const { gsap, SplitText } = outils;
  const annee = decouperEnLignes(SplitText, element(".etape__annee", etape));
  const titre = decouperEnLignes(SplitText, element(".etape__titre", etape));
  const texte = decouperEnLignes(SplitText, element(".etape__texte", etape));
  const cadre = element(".etape__cadre", etape);

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { ...declencheur, toggleActions: "play none none reverse" },
    })
    .fromTo(annee.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9 })
    .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.08 }, "<0.1")
    .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, "<0.1")
    .fromTo(
      cadre,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" },
      "<",
    );
}
