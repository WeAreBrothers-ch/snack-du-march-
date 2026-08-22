/**
 * Source unique de vérité pour les informations de l'établissement.
 * Fiabilité des données : voir RECHERCHE-CLIENT.md.
 * Les valeurs marquées « à confirmer » doivent être validées par le client
 * avant mise en ligne.
 */

export type CleJour =
  | "lundi"
  | "mardi"
  | "mercredi"
  | "jeudi"
  | "vendredi"
  | "samedi"
  | "dimanche";

/** Heure locale au format « HH:MM » (24 h), fuseau Europe/Zurich. */
export type Heure = string;

export interface PlageHoraire {
  readonly ouverture: Heure;
  readonly fermeture: Heure;
}

/** `null` = fermé toute la journée. */
export type HorairesSemaine = Readonly<Record<CleJour, PlageHoraire | null>>;

export const JOURS_ORDONNES: readonly CleJour[] = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
] as const;

/** Index JS `Date.getDay()` (0 = dimanche) → clé de jour. */
export const JOUR_PAR_INDEX: Readonly<Record<number, CleJour>> = {
  0: "dimanche",
  1: "lundi",
  2: "mardi",
  3: "mercredi",
  4: "jeudi",
  5: "vendredi",
  6: "samedi",
};

/** À confirmer auprès du client : Restaurant Guru annonce 11h–22h tous les jours. */
export const HORAIRES: HorairesSemaine = {
  lundi: { ouverture: "11:00", fermeture: "22:00" },
  mardi: { ouverture: "11:00", fermeture: "22:00" },
  mercredi: { ouverture: "11:00", fermeture: "22:00" },
  jeudi: { ouverture: "11:00", fermeture: "22:00" },
  vendredi: { ouverture: "11:00", fermeture: "22:00" },
  samedi: { ouverture: "11:00", fermeture: "22:00" },
  dimanche: { ouverture: "11:00", fermeture: "22:00" },
};

export const MAISON = {
  nom: "Snack du Marché",
  fondation: 1998,
  fuseau: "Europe/Zurich",
  adresse: {
    rue: "Rue Pré-du-Marché 3",
    codePostal: "1004",
    ville: "Lausanne",
    pays: "Suisse",
    quartier: "Riponne",
    /** Coordonnées de la rue Pré-du-Marché, à affiner avec le client. */
    latitude: 46.5257,
    longitude: 6.6335,
  },
  /** Concordant Restaurant Guru + Mapstr. Une source isolée donne un autre numéro. */
  telephone: "+41792431113",
  telephoneAffiche: "079 243 11 13",
  courriel: "",
  reseaux: {
    instagram: "https://www.instagram.com/snackdumarche/",
    facebook: "https://www.facebook.com/snackdumarche/",
  },
  itineraire:
    "https://www.google.com/maps/search/?api=1&query=Rue+Pr%C3%A9-du-March%C3%A9+3+1004+Lausanne",
} as const;

export const SITE = {
  url: "https://snackdumarche.ch",
  titre: "Snack du Marché — Kebab à la broche, Lausanne",
  description:
    "Broche de veau et agneau montée à la main chaque matin, marinée 24 heures, recettes de Gaziantep. Rue Pré-du-Marché 3, Lausanne, depuis 1998. Service traiteur dès 15 personnes.",
} as const;
