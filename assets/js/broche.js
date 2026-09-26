/**
 * La broche : l'accroche monte ligne par ligne, et la photo de la broche se
 * découvre de bas en haut au rythme du défilement, en reculant depuis un
 * gros plan ; elle glisse ensuite doucement dans son cadre. Sur grand écran,
 * l'accroche reste en place (CSS) et recule pendant que le panneau de
 * l'anatomie monte par-dessus.
 *
 * L'anatomie : le panneau bordeaux monte avec un bord en biais ; le titre
 * monte et la photo se découvre. Sur grand écran, la planche se dessine
 * ensuite d'un seul geste : la légende, les traits qui vont de chaque
 * ingrédient à son repère, les repères eux-mêmes. Sur téléphone, une ligne
 * lit la planche au défilement (lirePlanche).
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 * @param {import("./planche.js").Planche | null} planche
 * @returns {() => void} fonction de nettoyage (changement de mise en page)
 */
export function initBroche(outils, bureau, planche) {
  const { gsap, SplitText } = outils;

  const accroche = decouperEnLignes(SplitText, element(".broche__accroche"));
  const texte = decouperEnLignes(SplitText, element(".broche__texte"));
  const apercu = element(".broche__apercu");

  // Les déclencheurs visent le bloc, jamais la section : sur grand écran,
  // elle reste collée en haut de l'écran et fausserait les mesures.
  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".broche-bloc", start: "top 70%", toggleActions: "play none none reverse" },
    })
    .fromTo(accroche.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, "<0.25");

  const decouvrir = {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: 1.1,
    ease: "power3.inOut",
  };

  // Sur grand écran, la photo occupe la colonne de droite : elle se découvre
  // pendant que la section entre dans l'écran. Sur téléphone, elle est sous
  // le texte : elle se découvre en y entrant.
  devoiler(
    outils,
    apercu,
    bureau
      ? { trigger: ".broche-bloc", start: "top 85%", end: "top top" }
      : { trigger: apercu, start: "top bottom", end: "center 55%" },
  );

  if (bureau) {
    // L'accroche recule pendant que le panneau de l'anatomie monte.
    gsap.to(".broche", {
      scale: 0.94,
      autoAlpha: 0.4,
      ease: "none",
      scrollTrigger: { trigger: ".anatomie", start: "top bottom", end: "top top", scrub: 1 },
    });
  }

  // Le panneau de l'anatomie monte avec un bord en biais, qui se redresse
  // quand il arrive en haut de l'écran.
  gsap.fromTo(
    ".anatomie",
    { "--biais": () => `${Math.round(window.innerWidth * 0.3)}px` },
    {
      "--biais": "0px",
      ease: "none",
      scrollTrigger: {
        trigger: ".anatomie",
        start: "top bottom",
        end: bureau ? "top top" : "top 25%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );

  const titre = decouperEnLignes(SplitText, element(".anatomie__titre"));
  const photo = element(".planche__photo");
  const points = elements(".planche__point");
  const ingredients = elements(".planche__ingredient");
  const note = element(".anatomie__note");

  const decouvrirPhoto = { ...decouvrir, duration: 1 };

  if (bureau) {
    const traits = planche ? planche.traits : [];
    const dessin = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: ".anatomie", start: "top 35%", toggleActions: "play none none reverse" },
    });

    dessin
      .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
      .fromTo(photo, { clipPath: "inset(100% 0% 0% 0%)" }, decouvrirPhoto, "<0.1")
      .fromTo(ingredients, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }, "<0.55");
    if (traits.length > 0) {
      dessin.fromTo(
        traits,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.05, ease: "power2.inOut" },
        "<0.1",
      );
    }
    dessin
      .fromTo(
        points,
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" },
        "<0.3",
      )
      .fromTo(note, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.2");
    return () => {};
  }

  // Sur téléphone : le titre monte, la photo se découvre, puis la planche se
  // lit au défilement (voir lirePlanche).
  /**
   * @param {string | Element} declencheur
   * @param {string} debut
   */
  const enEntrant = (declencheur, debut) => ({
    trigger: declencheur,
    start: debut,
    toggleActions: "play none none reverse",
  });

  gsap.fromTo(
    titre.lines,
    { yPercent: 120 },
    { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: enEntrant(".anatomie", "top 75%") },
  );
  gsap.fromTo(photo, { clipPath: "inset(100% 0% 0% 0%)" }, { ...decouvrirPhoto, scrollTrigger: enEntrant(photo, "top 85%") });
  gsap.fromTo(
    note,
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: enEntrant(note, "top 90%") },
  );

  return lirePlanche(outils, photo, points, ingredients);
}

/**
 * La lecture de la planche, sur téléphone : une ligne craie traverse la photo
 * de haut en bas pendant que la photo passe sous le milieu de l'écran (elle
 * semble immobile, la photo défile dessous). Chaque repère s'allume quand elle
 * le croise, avec son ingrédient dans la légende ; au bout de la ligne, une
 * étiquette nomme le dernier croisé. Rien n'allonge la page.
 * @param {import("./lib.js").Outils} outils
 * @param {HTMLElement} photo
 * @param {HTMLElement[]} points
 * @param {HTMLElement[]} ingredients
 * @returns {() => void} rend la planche telle quelle (changement de mise en page)
 */
function lirePlanche(outils, photo, points, ingredients) {
  const planche = /** @type {HTMLElement} */ (photo.closest(".planche"));

  let ligne = photo.querySelector(".planche__lecture");
  if (!(ligne instanceof HTMLElement)) {
    ligne = document.createElement("div");
    ligne.className = "planche__lecture";
    ligne.setAttribute("aria-hidden", "true");
    ligne.innerHTML = '<span class="planche__lecture-nom"></span>';
    photo.appendChild(ligne);
  }
  const lecture = ligne;
  const etiquette = element(".planche__lecture-nom", lecture);

  // Les repères sont rangés de haut en bas, comme la légende.
  const hauteurs = points.map((point) => parseFloat(point.style.getPropertyValue("--y")));
  const noms = ingredients.map((ingredient) => element(".planche__nom", ingredient).textContent || "");

  let courant = -2;
  /** @param {number} progression de 0 à 1 */
  const lire = (progression) => {
    const niveau = progression * 100;
    let dernier = -1;
    hauteurs.forEach((hauteur, index) => {
      const vu = hauteur <= niveau;
      points[index].classList.toggle("est-vu", vu);
      ingredients[index].classList.toggle("est-vu", vu);
      if (vu) dernier = index;
    });
    lecture.classList.toggle("est-active", progression > 0 && progression < 1);
    if (dernier === courant) return;
    courant = dernier;
    points.forEach((point, index) => point.classList.toggle("est-courant", index === dernier));
    if (dernier >= 0) etiquette.textContent = `${dernier + 1} · ${noms[dernier]}`;
  };

  planche.classList.add("planche--lue");

  outils.gsap.fromTo(
    lecture,
    { top: "0%" },
    {
      top: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: photo,
        start: "top 62%",
        end: "bottom 62%",
        scrub: true,
        onUpdate: (/** @type {any} */ declencheur) => lire(declencheur.progress),
        onRefresh: (/** @type {any} */ declencheur) => lire(declencheur.progress),
      },
    },
  );

  return () => {
    planche.classList.remove("planche--lue");
    [...points, ...ingredients].forEach((el) => el.classList.remove("est-vu", "est-courant"));
    lecture.classList.remove("est-active");
  };
}

/**
 * La photo se découvre de bas en haut au rythme du défilement, et recule
 * depuis un gros plan pendant qu'elle s'ouvre. Ensuite, tant qu'elle est à
 * l'écran, elle glisse doucement dans son cadre.
 * @param {import("./lib.js").Outils} outils
 * @param {HTMLElement} apercu
 * @param {{ trigger: string | Element, start: string, end: string }} parcours
 */
function devoiler(outils, apercu, parcours) {
  const { gsap } = outils;
  const image = element("img", apercu);

  gsap
    .timeline({ scrollTrigger: { ...parcours, scrub: 0.6 } })
    .fromTo(apercu, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out" }, 0)
    .fromTo(image, { scale: 1.4 }, { scale: 1.1, ease: "power1.out" }, 0);

  gsap.fromTo(
    image,
    { yPercent: -4 },
    {
      yPercent: 4,
      ease: "none",
      scrollTrigger: { trigger: parcours.trigger, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}
