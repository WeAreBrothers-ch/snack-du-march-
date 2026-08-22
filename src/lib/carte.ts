/**
 * LA CARTE — source unique de vérité.
 *
 * Les prix et la structure sont **relevés sur le tableau noir de la maison**
 * (photos `equipe-comptoir.webp` et `comptoir-decoupe.webp`, août 2026).
 * C'est la meilleure source disponible, mais elle reste une lecture de photo :
 * les lignes marquées d'un commentaire « illisible » n'ont pas de prix affiché,
 * plutôt qu'un chiffre inventé.
 *
 * Le tableau range les mezze sous le mot « TRAITEUR — recettes authentiques » :
 * chez eux, « traiteur » désigne d'abord le comptoir de mezze. Voir README.
 */

import type { CategorieCarte } from "./types";

export const CARTE: readonly CategorieCarte[] = [
  {
    id: "sandwichs",
    titre: "Sandwichs",
    illustration: "pain",
    note: "En petit format, 9.– quel que soit le choix.",
    plats: [
      {
        id: "veau-agneau",
        nom: "Le veau-agneau",
        nomTurc: "Yaprak döner",
        description:
          "La broche de la maison, tranchée à la commande. Salade, tomate, oignon rouge, la sauce que vous voulez.",
        prix: 14,
        tags: ["Fait maison"],
        classique: true,
        photo: "sandwichVeauAgneau",
        dedans: [
          "Veau et agneau en morceaux entiers, jamais de viande reconstituée",
          "Marinade et épices de la famille, rapportées de Gaziantep",
          "Pain chauffé à la commande",
          "Salade, tomate, concombre, oignon rouge, persil plat",
        ],
        pourquoi:
          "C'est le plat pour lequel les gens font la queue depuis 1998. La viande a encore une anatomie : on voit les fibres, on sent le grill.",
      },
      {
        id: "poulet",
        nom: "Le poulet",
        nomTurc: "Tavuk döner",
        description: "Poulet mariné, monté sur sa propre broche. Plus doux, tout aussi grillé.",
        prix: 12,
        tags: ["Fait maison"],
        dedans: [
          "Poulet mariné, sur une broche séparée de la viande rouge",
          "Grillé et tranché à la commande",
          "Salade, tomate, oignon rouge",
        ],
        pourquoi:
          "Le poulet à la broche est le test le plus sévère : il sèche à la moindre inattention. Celui-ci ne sèche pas.",
      },
      {
        id: "kofte",
        nom: "La köfte",
        nomTurc: "Köfte",
        description: "Bœuf haché du jour, persil, oignon, cumin. Grillée devant vous.",
        prix: 14,
        tags: ["Fait maison", "Piquant"],
      },
      {
        id: "falafel",
        nom: "Le falafel",
        nomTurc: "Falafel",
        description: "Pois chiches, herbes, croustillant dehors, vert dedans. Frit à la commande.",
        prix: 12,
        tags: ["Végétarien", "Fait maison"],
        dedans: [
          "Pois chiches trempés la veille, jamais de préparation en poudre",
          "Persil, coriandre, cumin, ail",
          "Frit à la minute",
          "Houmous, salade, sauce sésame",
        ],
        pourquoi: "Il est vert à l'intérieur. C'est le seul signe qui ne trompe pas sur un falafel.",
      },
    ],
  },
  {
    id: "durum",
    titre: "Dürüm",
    illustration: "durum",
    plats: [
      {
        id: "durum-veau-agneau",
        nom: "Le dürüm veau-agneau",
        nomTurc: "Yaprak dürüm",
        description: "La même viande, roulée dans la galette. Plus long, moins de pain.",
        prix: 15,
        tags: ["Fait maison"],
        classique: true,
      },
      {
        id: "durum-poulet",
        nom: "Le dürüm poulet",
        nomTurc: "Tavuk dürüm",
        description: "Poulet, crudités, sauce à l'ail. La galette passe sur le grill avant.",
        prix: 14,
        tags: ["Fait maison"],
        photo: "durumMain",
        dedans: [
          "Poulet tranché à la broche",
          "Galette passée sur le grill",
          "Crudités du jour, sauce à l'ail",
        ],
        pourquoi:
          "La galette est chauffée juste avant d'être roulée : c'est ce qui l'empêche de casser.",
      },
      {
        id: "durum-kofte",
        nom: "Le dürüm köfte",
        nomTurc: "Köfte dürüm",
        description: "La köfte grillée, roulée serrée avec le sumac et l'oignon rouge.",
        prix: 15,
        tags: ["Fait maison", "Piquant"],
      },
      {
        id: "durum-falafel",
        nom: "Le dürüm falafel",
        nomTurc: "Falafel dürüm",
        description: "Falafels écrasés, houmous, salade, sumac.",
        prix: 14,
        tags: ["Végétarien", "Fait maison"],
      },
    ],
  },
  {
    id: "assiettes",
    titre: "Assiettes",
    illustration: "couteau",
    plats: [
      {
        id: "assiette-veau-agneau",
        nom: "L'assiette veau-agneau",
        description: "La viande, les frites ou le riz, la salade et les sauces. Dans l'assiette.",
        prix: 22,
        tags: ["Fait maison"],
        classique: true,
        photo: "assietteFrites",
        dedans: [
          "Veau et agneau tranchés à la broche",
          "Frites coupées épaisses, ou riz",
          "Salade, tomate, chou rouge",
          "Sauce blanche, sauce piquante",
        ],
        pourquoi:
          "C'est la version qu'on mange assis, à deux mains. Celle qui laisse voir la viande.",
      },
      {
        id: "assiette-poulet",
        nom: "L'assiette poulet",
        description: "Le poulet de la broche, frites ou riz, salade et sauces.",
        prix: 22,
        tags: ["Fait maison"],
      },
      {
        id: "assiette-kofte",
        nom: "L'assiette köfte",
        description: "Les köfte grillées à la commande, frites ou riz, salade.",
        prix: 22,
        tags: ["Fait maison", "Piquant"],
      },
      {
        id: "assiette-falafel",
        nom: "L'assiette falafel",
        description: "Les falafels, le houmous, la salade et le pain chaud.",
        prix: 20,
        tags: ["Végétarien", "Fait maison"],
      },
    ],
  },
  {
    id: "mezze",
    titre: "Mezze",
    illustration: "houmous",
    note: "Au poids ou en portion, prix au comptoir.",
    plats: [
      {
        id: "houmous",
        nom: "Le houmous",
        nomTurc: "Humus",
        description: "Pois chiches, tahini, citron, un sillon d'huile d'olive.",
        tags: ["Végétarien", "Fait maison"],
        classique: true,
      },
      {
        id: "aubergine",
        nom: "L'aubergine",
        nomTurc: "Patlıcan ezmesi",
        description: "Aubergines brûlées sur la flamme, écrasées à la fourchette.",
        tags: ["Végétarien", "Fait maison"],
      },
      {
        id: "tapenade-tomate",
        nom: "La tapenade de tomate séchée",
        description: "Tomates séchées, huile d'olive, piment doux. C'est celle qui pique un peu.",
        tags: ["Végétarien", "Fait maison", "Piquant"],
      },
      {
        id: "feuilles-de-vigne",
        nom: "Les feuilles de vigne",
        nomTurc: "Yaprak sarma",
        description: "Roulées à la main, riz, herbes, citron. Servies froides.",
        tags: ["Végétarien", "Fait maison"],
      },
    ],
  },
  {
    id: "salades",
    titre: "Salades",
    illustration: "feuilleDeVigne",
    note: "En accompagnement ou en portion, prix au comptoir.",
    plats: [
      {
        id: "taboule",
        nom: "Le taboulé",
        nomTurc: "Kısır",
        description: "Boulgour fin, tomate, persil, mélasse de grenade, piment doux.",
        tags: ["Végétarien", "Fait maison", "Piquant"],
        classique: true,
      },
      {
        id: "berger",
        nom: "La salade du berger",
        nomTurc: "Çoban salatası",
        description: "Tomate, concombre, oignon, persil, citron. Rien d'autre.",
        tags: ["Végétarien", "Fait maison", "Sans gluten"],
      },
      {
        id: "olives-grenades",
        nom: "Olives et grenades",
        description: "Olives, graines de grenade, mélasse. Sucré, salé, acide.",
        tags: ["Végétarien", "Fait maison", "Sans gluten"],
      },
      {
        id: "salade-melee",
        nom: "La salade mêlée",
        description: "Les crudités du jour, telles qu'elles sont au comptoir.",
        tags: ["Végétarien", "Sans gluten"],
      },
    ],
  },
  {
    id: "a-cote",
    titre: "À côté",
    illustration: "piment",
    plats: [
      {
        id: "box",
        nom: "La döner box",
        description: "Viande, frites, sauces, dans la boîte. Celle que tout le monde commande le soir.",
        prix: 14,
        tags: [],
        classique: true,
      },
      {
        id: "tacos",
        nom: "Le tacos",
        description: "La galette pliée, grillée à la presse. Version lausannoise assumée.",
        prix: 12,
        tags: [],
      },
      {
        id: "frites",
        nom: "Les frites",
        description: "Coupées épaisses, cuites deux fois. Avec la sauce à part.",
        prix: 7,
        tags: ["Végétarien"],
        photo: "fritesTerrasse",
      },
      {
        id: "baklava",
        nom: "Le baklava",
        nomTurc: "Baklava",
        description: "À la pièce. Pistache de Gaziantep, comme il se doit.",
        prix: 1.5,
        tags: ["Végétarien"],
      },
    ],
  },
];

/** Les trois pièces mises en avant sur l'accueil : un format par ligne. */
export const TROIS_PIECES = ["veau-agneau", "durum-poulet", "assiette-veau-agneau"] as const;
