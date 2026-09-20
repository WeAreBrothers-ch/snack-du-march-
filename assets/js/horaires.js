/**
 * La pastille « ouvert / fermé ». La maison est ouverte tous les jours de
 * 11 h à 22 h : si cela change, ce sont les deux seules constantes à modifier.
 */

const OUVERTURE_HEURE = 11;
const FERMETURE_HEURE = 22;

/**
 * @param {Date} date
 * @returns {boolean}
 */
function estOuvert(date) {
  const heure = date.getHours() + date.getMinutes() / 60;
  return heure >= OUVERTURE_HEURE && heure < FERMETURE_HEURE;
}

/** Met à jour toutes les pastilles de la page. */
export function initHoraires() {
  const ouvert = estOuvert(new Date());
  document.querySelectorAll("[data-etat]").forEach((pastille) => {
    pastille.setAttribute("data-ouvert", ouvert ? "oui" : "non");
    const texte = pastille.querySelector("[data-etat-texte]");
    if (texte) {
      texte.textContent = ouvert
        ? `Ouvert — jusqu'à ${FERMETURE_HEURE} h`
        : `Fermé — ouvre à ${OUVERTURE_HEURE} h`;
    }
  });
}
