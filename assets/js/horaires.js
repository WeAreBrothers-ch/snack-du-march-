/**
 * La pastille « ouvert / fermé ». La maison est ouverte tous les jours de
 * 11 h à 22 h : si cela change, ce sont les deux seules constantes à modifier.
 * L'heure est toujours celle de Lausanne, où que se trouve le visiteur.
 */

const OUVERTURE_HEURE = 11;
const FERMETURE_HEURE = 22;

/**
 * L'heure qu'il est à Lausanne, en heures décimales (14 h 30 → 14.5).
 * @param {Date} date
 */
function heureDeLausanne(date) {
  const morceaux = new Intl.DateTimeFormat("fr-CH", {
    timeZone: "Europe/Zurich",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const valeur = (/** @type {string} */ type) =>
    Number(morceaux.find((morceau) => morceau.type === type)?.value ?? 0);
  return valeur("hour") + valeur("minute") / 60;
}

/**
 * @param {Date} date
 * @returns {boolean}
 */
function estOuvert(date) {
  const heure = heureDeLausanne(date);
  return heure >= OUVERTURE_HEURE && heure < FERMETURE_HEURE;
}

/** Met à jour toutes les pastilles de la page. */
export function initHoraires() {
  const ouvert = estOuvert(new Date());
  document.querySelectorAll("[data-etat]").forEach((pastille) => {
    pastille.setAttribute("data-ouvert", ouvert ? "oui" : "non");
    const texte = pastille.querySelector("[data-etat-texte]");
    if (texte) {
      // Espace insécable entre l'heure et « h » : jamais de « 22 » en fin de ligne.
      texte.textContent = ouvert
        ? `Ouvert jusqu'à ${FERMETURE_HEURE}\u00a0h`
        : `Fermé, ouvre à ${OUVERTURE_HEURE}\u00a0h`;
    }
  });
}
