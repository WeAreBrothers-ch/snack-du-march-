/**
 * Les photographies de la maison — source unique.
 *
 * Chaque entrée porte son chemin ET sa description. La description sert
 * d'attribut `alt` : elle décrit ce que l'on voit réellement sur l'image,
 * jamais ce que la section raconte autour.
 *
 * ⚠️ Aucune photo ne nomme les personnes qu'elle montre. L'identification
 * (qui est Hüseyin, qui est Sertaç) doit être confirmée par la maison avant
 * d'écrire un prénom sous un visage.
 */

export interface PhotoMaison {
  readonly src: string;
  readonly sujet: string;
}

export const PHOTOS = {
  brocheDecoupe: {
    src: "/photos/broche-decoupe.webp",
    sujet: "la lame électrique sur la broche de veau et agneau, au comptoir",
  },
  comptoirVitrine: {
    src: "/photos/comptoir-vitrine.webp",
    sujet: "le comptoir, la vitrine des crudités et les deux broches sous le tableau noir",
  },
  comptoirDecoupe: {
    src: "/photos/comptoir-decoupe.webp",
    sujet: "un homme de la maison, la lame à la main, devant la broche",
  },
  deuxGenerations: {
    src: "/photos/deux-generations.webp",
    sujet: "deux hommes de la maison à la broche, derrière le comptoir",
  },
  equipeComptoir: {
    src: "/photos/equipe-comptoir.webp",
    sujet: "deux de la maison derrière le comptoir, sous le tableau des recettes",
  },
  devantureNuit: {
    src: "/photos/devanture-nuit.webp",
    sujet: "la devanture éclairée à la tombée du soir, rue Pré-du-Marché",
  },
  enseigne: {
    src: "/photos/enseigne.webp",
    sujet: "l'enseigne lumineuse du Snack du Marché, kebab et mezze",
  },
  sandwichVeauAgneau: {
    src: "/photos/sandwich-veau-agneau.webp",
    sujet: "le sandwich veau-agneau ouvert, crudités et sauce blanche",
  },
  durumMain: {
    src: "/photos/durum-main.webp",
    sujet: "un dürüm poulet tenu à la main, une assiette de frites derrière",
  },
  assietteFrites: {
    src: "/photos/assiette-frites.webp",
    sujet: "l'assiette : viande à la broche, frites, salade et sauces",
  },
  fritesTerrasse: {
    src: "/photos/frites-terrasse.webp",
    sujet: "une portion de frites et sa sauce, en terrasse, rue Pré-du-Marché",
  },
} as const satisfies Record<string, PhotoMaison>;

export type ClePhoto = keyof typeof PHOTOS;
