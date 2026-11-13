/**
 * L'histoire : on entre dans la maison.
 *
 * L'intro est une scène plein écran : le titre, et entre ses deux lignes une
 * vitrine où la devanture se découvre en arrivant. Pendant une courte pause,
 * la vitrine s'ouvre en grand, jusqu'aux bords de l'écran, et la photo
 * recule comme si l'on passait la porte. Sur grand écran, les photos de
 * l'album s'écartent pour lui faire place.
 *
 * Puis la frise monte par-dessus la devanture, qui recule et s'assombrit :
 * trois chapitres, et sur le côté l'année, dont les chiffres roulent d'un
 * chapitre à l'autre, comme un compteur.
 *
 * Les déclencheurs sont posés sur la section, la pause et les chapitres,
 * jamais sur l'intro ni sur le repère : un élément collé fausserait les
 * mesures.
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
  // Quand la frise monte par-dessus la devanture, celle-ci recule et
  // s'assombrit.
  reculer(outils, element(".histoire__intro"), element(".histoire__recul"), pauseIntro, bureau);
  const nettoyerFrise = initFrise(outils, bureau);
  return () => {
    nettoyerFrise();
    nettoyerMur();
  };
}

/**
 * Le mur derrière la frise est le même carreau que celui de la page, mais il
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
 * La frise. Sur grand écran, l'année du repère est un compteur : entre deux
 * chapitres, ses chiffres roulent jusqu'à la nouvelle année, au rythme du
 * défilement (les unités d'abord, comme un vrai compteur), et la table des
 * chapitres suit la lecture. Sur téléphone, pas de repère (une barre collée
 * cachait le titre sous le bouton « Menu ») : l'année de chaque chapitre se
 * compte, une fois, en arrivant à l'écran. Chaque chapitre se découvre en
 * arrivant : la photo de bas en haut, puis glisse doucement dans son cadre ;
 * le titre et le récit montent ligne par ligne.
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 * @returns {() => void} rend leur année aux chapitres (changement de mise en page)
 */
function initFrise(outils, bureau) {
  const { gsap, ScrollTrigger, SplitText } = outils;

  const roues = elements(".roue__bande");
  const chapitres = elements(".chapitre");
  const entrees = elements("[data-frise-entree]");
  const chiffres = (/** @type {HTMLElement} */ chapitre) =>
    (chapitre.dataset.annee || "0000").split("").map(Number);

  if (bureau) {
    chiffres(chapitres[0]).forEach((chiffre, index) => {
      gsap.set(roues[index], { yPercent: -chiffre * 10 });
    });
  }

  chapitres.forEach((chapitre, index) => {
    if (bureau) {
      // Le chapitre en cours, dans la table.
      ScrollTrigger.create({
        trigger: chapitre,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (/** @type {any} */ declencheur) => {
          if (!declencheur.isActive) return;
          entrees.forEach((entree, rang) => entree.classList.toggle("est-courante", rang === index));
        },
      });

      if (index > 0) {
        const de = chiffres(chapitres[index - 1]);
        const vers = chiffres(chapitre);
        const roulement = gsap.timeline({
          scrollTrigger: { trigger: chapitre, start: "top 90%", end: "top 45%", scrub: SCRUB },
        });
        roues.forEach((roue, rang) => {
          if (de[rang] === vers[rang]) return;
          roulement.fromTo(
            roue,
            { yPercent: -de[rang] * 10 },
            { yPercent: -vers[rang] * 10, duration: 1, ease: "power2.inOut", immediateRender: false },
            (roues.length - 1 - rang) * 0.15,
          );
        });
      }
    } else {
      // Téléphone : l'année se compte, une fois, quand le chapitre arrive.
      const chiffresAnnee = element(".chapitre__chiffres", chapitre);
      const cible = Number(chapitre.dataset.annee);
      const compteur = { v: cible - 36 };
      chiffresAnnee.textContent = String(compteur.v);
      gsap.to(compteur, {
        v: cible,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          chiffresAnnee.textContent = String(Math.round(compteur.v));
        },
        scrollTrigger: { trigger: chiffresAnnee, start: "top 88%", toggleActions: "play none none none" },
      });
    }

    const photo = element(".chapitre__photo", chapitre);
    const image = element("img", photo);
    const titre = decouperEnLignes(SplitText, element(".chapitre__titre", chapitre));
    const recit = decouperEnLignes(SplitText, element(".chapitre__recit", chapitre));
    const citation = chapitre.querySelector(".chapitre__citation");

    const entree = gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: chapitre, start: "top 78%", toggleActions: "play none none reverse" },
      })
      .fromTo(photo, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" })
      .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.08 }, 0.35);
    if (citation) {
      entree.fromTo(citation, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.45);
    }
    entree.fromTo(recit.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, 0.5);

    gsap.fromTo(
      image,
      { yPercent: -6, scale: 1.14 },
      {
        yPercent: 6,
        scale: 1.14,
        ease: "none",
        scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  return () => {
    chapitres.forEach((chapitre) => {
      const annee = chapitre.querySelector(".chapitre__chiffres");
      if (annee) annee.textContent = chapitre.dataset.annee || "";
    });
  };
}
