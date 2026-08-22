/**
 * Calcul du statut « ouvert / fermé » de la maison.
 *
 * Deux règles non négociables :
 *  1. Le calcul se fait toujours sur le fuseau Europe/Zurich, jamais sur
 *     l'heure du navigateur — sinon un visiteur à l'étranger voit un statut faux.
 *  2. La fonction est pure : elle prend une date, elle rend un statut.
 *     Aucun accès au DOM, aucun effet de bord. Elle est donc testable.
 */

import {
  HORAIRES,
  JOUR_PAR_INDEX,
  JOURS_ORDONNES,
  MAISON,
  type CleJour,
  type PlageHoraire,
} from "./infos";

export interface Statut {
  readonly ouvert: boolean;
  /** Libellé prêt à afficher, ex. « Ouvert · on ferme à 22 h ». */
  readonly libelle: string;
}

interface MomentLocal {
  readonly indexJour: number;
  readonly minutes: number;
}

const MINUTES_PAR_JOUR = 24 * 60;

const INDEX_PAR_JOUR_ANGLAIS: Readonly<Record<string, number>> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** « 11:00 » → 660. Rend `null` si le format est invalide plutôt que de planter. */
export function enMinutes(heure: string): number | null {
  const correspondance = /^(\d{1,2}):(\d{2})$/.exec(heure.trim());
  if (correspondance === null) return null;
  const heures = Number(correspondance[1]);
  const minutes = Number(correspondance[2]);
  if (heures > 23 || minutes > 59) return null;
  return heures * 60 + minutes;
}

/** « 22:00 » → « 22 h », « 11:30 » → « 11 h 30 ». Usage suisse romand. */
export function formaterHeure(heure: string): string {
  const correspondance = /^(\d{1,2}):(\d{2})$/.exec(heure.trim());
  if (correspondance === null) return heure;
  const [, heures, minutes] = correspondance;
  return minutes === "00" ? `${Number(heures)} h` : `${Number(heures)} h ${minutes}`;
}

/** Position exacte dans la semaine, exprimée dans le fuseau de la maison. */
function momentLocal(date: Date): MomentLocal | null {
  try {
    const parties = new Intl.DateTimeFormat("en-US", {
      timeZone: MAISON.fuseau,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);

    const lire = (type: Intl.DateTimeFormatPartTypes): string =>
      parties.find((partie) => partie.type === type)?.value ?? "";

    const indexJour = INDEX_PAR_JOUR_ANGLAIS[lire("weekday")];
    const heures = Number(lire("hour"));
    const minutes = Number(lire("minute"));

    if (indexJour === undefined || Number.isNaN(heures) || Number.isNaN(minutes)) {
      return null;
    }
    return { indexJour, minutes: heures * 60 + minutes };
  } catch {
    return null;
  }
}

function plageDuJour(indexJour: number): PlageHoraire | null {
  const cle = JOUR_PAR_INDEX[((indexJour % 7) + 7) % 7];
  return cle === undefined ? null : HORAIRES[cle];
}

/** Cherche la prochaine ouverture dans les sept jours qui suivent. */
function prochaineOuverture(
  moment: MomentLocal,
): { readonly dansNJours: number; readonly heure: string } | null {
  for (let decalage = 0; decalage < 8; decalage += 1) {
    const plage = plageDuJour(moment.indexJour + decalage);
    if (plage === null) continue;
    const ouverture = enMinutes(plage.ouverture);
    if (ouverture === null) continue;
    if (decalage > 0 || ouverture > moment.minutes) {
      return { dansNJours: decalage, heure: plage.ouverture };
    }
  }
  return null;
}

function nomDuJour(indexJour: number): CleJour | null {
  return JOUR_PAR_INDEX[((indexJour % 7) + 7) % 7] ?? null;
}

/**
 * Statut à un instant donné. Passer explicitement la date rend la fonction
 * déterministe, donc testable.
 */
export function statutA(date: Date): Statut {
  const moment = momentLocal(date);
  if (moment === null) {
    return { ouvert: false, libelle: `Ouvert tous les jours de 11 h à 22 h` };
  }

  const plage = plageDuJour(moment.indexJour);
  const ouverture = plage === null ? null : enMinutes(plage.ouverture);
  const fermeture = plage === null ? null : enMinutes(plage.fermeture);

  if (plage !== null && ouverture !== null && fermeture !== null) {
    const finReelle = fermeture > ouverture ? fermeture : fermeture + MINUTES_PAR_JOUR;
    if (moment.minutes >= ouverture && moment.minutes < finReelle) {
      return {
        ouvert: true,
        libelle: `Ouvert · on ferme à ${formaterHeure(plage.fermeture)}`,
      };
    }
  }

  const suivante = prochaineOuverture(moment);
  if (suivante === null) {
    return { ouvert: false, libelle: "Fermé" };
  }

  const heure = formaterHeure(suivante.heure);
  if (suivante.dansNJours === 0) {
    return { ouvert: false, libelle: `Fermé · on ouvre à ${heure}` };
  }
  if (suivante.dansNJours === 1) {
    return { ouvert: false, libelle: `Fermé · on rouvre demain à ${heure}` };
  }
  const jour = nomDuJour(moment.indexJour + suivante.dansNJours);
  return {
    ouvert: false,
    libelle: jour === null ? `Fermé · on rouvre à ${heure}` : `Fermé · on rouvre ${jour} à ${heure}`,
  };
}

/** Jour courant dans le fuseau de la maison, pour surligner la ligne du tableau. */
export function jourCourant(date: Date): CleJour | null {
  const moment = momentLocal(date);
  return moment === null ? null : nomDuJour(moment.indexJour);
}

/** Données prêtes pour le tableau des horaires de la page « Nous trouver ». */
export function semaineAffichable(): readonly {
  readonly jour: CleJour;
  readonly libelle: string;
}[] {
  return JOURS_ORDONNES.map((jour) => {
    const plage = HORAIRES[jour];
    return {
      jour,
      libelle:
        plage === null
          ? "Fermé"
          : `${formaterHeure(plage.ouverture)} – ${formaterHeure(plage.fermeture)}`,
    };
  });
}
