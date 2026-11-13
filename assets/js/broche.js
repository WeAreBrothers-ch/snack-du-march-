/**
 * La broche : l'accroche monte ligne par ligne, la photo se découvre de bas
 * en haut au rythme du défilement, puis les trois gestes arrivent : chaque
 * filet se trace, le numéro, le titre et le texte montent.
 *
 * L'anatomie : le panneau cobalt monte comme une carte qui s'élargit ; le
 * titre monte et la photo se découvre. Puis une ligne lit la planche au
 * défilement (lirePlanche) : chaque ingrédient croisé s'allume. Sur grand
 * écran, la scène reste en place pendant la lecture (CSS) et le trait de
 * chaque ingrédient se dessine jusqu'à son repère ; sur téléphone, la photo
 * passe sous la ligne.
 */

import { element, elements, SCRUB } from "./lib.js";
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
  const apercu = element(".broche__apercu");

  gsap.fromTo(
    accroche.lines,
    { yPercent: 120 },
    {
      yPercent: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".broche", start: "top 75%", toggleActions: "play none none reverse" },
    },
  );

  devoiler(outils, apercu, { trigger: apercu, start: "top 95%", end: "center 60%" });

  // Les gestes : chacun à son tour, quand il entre dans l'écran.
  elements(".geste").forEach((geste) => {
    const titre = decouperEnLignes(SplitText, element(".geste__titre", geste));
    const texte = decouperEnLignes(SplitText, element(".geste__texte", geste));
    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: geste, start: "top 88%", toggleActions: "play none none reverse" },
      })
      .fromTo(geste, { "--filet": 0 }, { "--filet": 1, duration: 0.9, ease: "power3.inOut" }, 0)
      .fromTo(
        element(".geste__num", geste),
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        0.1,
      )
      .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8 }, 0.15)
      .fromTo(texte.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, 0.25);
  });

  // Le panneau de l'anatomie monte comme une carte en retrait des bords, et
  // s'élargit jusqu'aux bords quand il arrive en haut de l'écran.
  // La découpe est animée telle quelle (et non par des variables CSS, qui
  // recalculeraient le style de tout le panneau à chaque image).
  const carteDe = () => {
    const retrait = Math.round(Math.min(window.innerWidth * 0.06, 48));
    const arrondi = bureau ? 32 : 20;
    return `inset(0px ${retrait}px 0px ${retrait}px round ${arrondi}px ${arrondi}px 0px 0px)`;
  };
  gsap.fromTo(
    ".anatomie",
    { clipPath: carteDe },
    {
      clipPath: "inset(0px 0px 0px 0px round 0px 0px 0px 0px)",
      ease: "power1.inOut",
      immediateRender: true,
      scrollTrigger: {
        trigger: ".anatomie",
        start: "top bottom",
        end: bureau ? "top top" : "top 15%",
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
    { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: enEntrant(".anatomie", bureau ? "top 40%" : "top 75%") },
  );
  // Une fois découverte, la photo n'a plus de découpe : l'étiquette et la
  // ligne de lecture, qui dépassent un peu de son cadre, ne sont plus rognées.
  gsap.fromTo(
    photo,
    { clipPath: "inset(100% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      clearProps: "clipPath",
      duration: 1,
      ease: "power3.inOut",
      scrollTrigger: enEntrant(bureau ? ".anatomie" : photo, bureau ? "top 30%" : "top 85%"),
    },
  );
  gsap.fromTo(
    note,
    { autoAlpha: 0, y: 16 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: bureau ? enEntrant(".anatomie", "top 25%") : enEntrant(note, "top 90%"),
    },
  );

  if (bureau) {
    // La photo recule doucement pendant la lecture.
    gsap.fromTo(
      element("img", photo),
      { scale: 1.08 },
      { scale: 1, ease: "none", scrollTrigger: { trigger: ".anatomie", start: "top top", end: "bottom bottom", scrub: true } },
    );
  }

  return lirePlanche(outils, photo, points, ingredients, bureau && planche ? planche.traits : [], bureau);
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
 * @param {SVGPathElement[]} traits les traits de la légende (grand écran)
 * @param {boolean} bureau
 * @returns {() => void} rend la planche telle quelle (changement de mise en page)
 */
function lirePlanche(outils, photo, points, ingredients, traits, bureau) {
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
  const compteurNum = document.querySelector("[data-planche-num]");
  const compteurNom = document.querySelector("[data-planche-nom]");

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
      traits[index]?.classList.toggle("est-vu", vu);
      if (vu) dernier = index;
    });
    lecture.classList.toggle("est-active", progression > 0 && progression < 1);
    if (dernier === courant) return;
    courant = dernier;
    points.forEach((point, index) => point.classList.toggle("est-courant", index === dernier));
    ingredients.forEach((ingredient, index) => ingredient.classList.toggle("est-courant", index === dernier));
    traits.forEach((trait, index) => trait.classList.toggle("est-courant", index === dernier));
    if (dernier >= 0) etiquette.textContent = `${dernier + 1} · ${noms[dernier]}`;
    if (compteurNum) {
      compteurNum.textContent = String(dernier + 1).padStart(2, "0");
      if (compteurNom) compteurNom.textContent = dernier >= 0 ? noms[dernier] : "La lecture commence";
    }
  };

  planche.classList.add("planche--lue");

  // Sur grand écran, la scène est collée : la ligne la parcourt pendant les
  // trois premiers quarts du défilement, puis la planche reste lue, entière,
  // le temps de la regarder. Sur téléphone, la photo passe sous le milieu de
  // l'écran.
  const parcours = bureau
    ? { trigger: ".anatomie", start: "top top", end: "bottom bottom" }
    : { trigger: photo, start: "top 62%", end: "bottom 62%" };
  const etendue = bureau ? 0.75 : 1;
  const avancer = (/** @type {any} */ declencheur) => {
    const progression = Math.min(1, declencheur.progress / etendue);
    lecture.style.top = `${progression * 100}%`;
    lire(progression);
  };

  outils.ScrollTrigger.create({ ...parcours, onUpdate: avancer, onRefresh: avancer });

  return () => {
    planche.classList.remove("planche--lue");
    [...points, ...ingredients, ...traits].forEach((el) => el.classList.remove("est-vu", "est-courant"));
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
    .timeline({ scrollTrigger: { ...parcours, scrub: SCRUB } })
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
