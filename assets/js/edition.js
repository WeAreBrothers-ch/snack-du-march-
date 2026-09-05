/**
 * L'édition du jour : la date en tête de page, l'état ouvert / fermé,
 * et la ligne d'horaire du jour mise en évidence.
 *
 * La maison est ouverte tous les jours de 11 h à 22 h. Si cela change,
 * c'est la seule constante à modifier ci-dessous.
 */

const OUVERTURE_HEURE = 11;
const FERMETURE_HEURE = 22;

const JOURS = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

/**
 * Formate la date du jour à la manière d'une manchette de quotidien.
 * @param {Date} date
 * @returns {string}
 */
function formaterDate(date) {
  try {
    // En deux morceaux : un quotidien écrit « samedi 5 septembre », sans virgule.
    const jour = new Intl.DateTimeFormat("fr-CH", { weekday: "long" }).format(date);
    const reste = new Intl.DateTimeFormat("fr-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
    return `${jour} ${reste}`;
  } catch {
    return JOURS[date.getDay()];
  }
}

/**
 * @param {Date} date
 * @returns {boolean} vrai si le comptoir est ouvert à cet instant
 */
function estOuvert(date) {
  const heure = date.getHours() + date.getMinutes() / 60;
  return heure >= OUVERTURE_HEURE && heure < FERMETURE_HEURE;
}

/** Écrit la date, l'état d'ouverture et marque le jour courant. */
export function initEdition() {
  const maintenant = new Date();

  const dates = document.querySelectorAll("[data-edition-date]");
  dates.forEach((element) => {
    element.textContent = `Édition du ${formaterDate(maintenant)}`;
  });

  const ouvert = estOuvert(maintenant);
  const etats = document.querySelectorAll("[data-etat]");
  etats.forEach((element) => {
    element.setAttribute("data-ouvert", ouvert ? "oui" : "non");
    const texte = element.querySelector("[data-etat-texte]");
    if (texte) {
      texte.textContent = ouvert
        ? `Ouvert — jusqu'à ${FERMETURE_HEURE} h`
        : `Fermé — ouvre à ${OUVERTURE_HEURE} h`;
    }
  });

  const jourCourant = maintenant.getDay();
  const lignes = document.querySelectorAll("[data-jour]");
  lignes.forEach((ligne) => {
    const jour = Number(ligne.getAttribute("data-jour"));
    ligne.setAttribute(
      "data-aujourdhui",
      jour === jourCourant ? "oui" : "non"
    );
  });
}
