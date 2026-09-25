/**
 * L'histoire : le titre monte et les photos de l'album se découvrent, puis
 * les trois cartes s'empilent (l'empilement lui-même est en CSS, avec
 * position: sticky). Le script ajoute les gestes : le contenu de chaque carte
 * monte à son arrivée, et la carte du dessous recule et s'assombrit pendant
 * que la suivante glisse par-dessus.
 *
 * Les déclencheurs sont posés sur les pauses entre les cartes, jamais sur les
 * cartes elles-mêmes : un élément collé fausserait les mesures.
 */

import { element, elements } from "./lib.js";
import { decouperEnLignes } from "./texte.js";

/**
 * @param {import("./lib.js").Outils} outils
 * @param {boolean} bureau
 */
export function initHistoire(outils, bureau) {
  const { gsap, SplitText } = outils;

  const titre = decouperEnLignes(SplitText, element(".histoire__titre"));
  const sousTitre = decouperEnLignes(SplitText, element(".histoire__sous"));
  const photos = elements(".histoire__cadre");

  const intro = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: ".histoire__intro",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  intro
    .fromTo(titre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(sousTitre.lines, { yPercent: 120 }, { yPercent: 0, duration: 0.8, stagger: 0.06 }, "<0.2");

  if (bureau) {
    // Les photos entourent le titre : elles se découvrent avec lui.
    intro.fromTo(
      photos,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.07, ease: "power3.inOut" },
      "<",
    );
  } else {
    // Sur téléphone, l'album est sous le titre : chaque photo se découvre en
    // entrant dans l'écran.
    photos.forEach((photo) => {
      gsap.fromTo(
        photo,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: photo, start: "top 90%", toggleActions: "play none none reverse" },
        },
      );
    });
  }

  const etapes = elements(".etape");
  const pauses = elements(".histoire__pause");

  etapes.forEach((etape, index) => {
    // La pause qui précède une carte : son bas est le haut naturel de la carte.
    const avant = pauses[index - 1];
    revelerEtape(
      outils,
      etape,
      avant
        ? { trigger: avant, start: "bottom 55%" }
        : { trigger: ".histoire__etapes", start: "top 55%" },
    );

    // La pause qui suit : pendant qu'elle défile hors de l'écran, la carte
    // suivante monte, et celle-ci recule.
    const apres = pauses[index];
    if (!apres) return;
    gsap.to(etape, {
      scale: bureau ? 0.9 : 0.94,
      rotate: bureau ? (index % 2 === 0 ? 1.5 : -1.5) : 0,
      "--voile": 0.6,
      ease: "none",
      scrollTrigger: { trigger: apres, start: "bottom bottom", end: "bottom top", scrub: 1 },
    });
  });
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
