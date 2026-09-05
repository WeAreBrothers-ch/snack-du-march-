# Direction artistique — Snack du Marché

**Version 2.0 — 05.09.2026.** Remplace intégralement la version 1 (fond vert forêt),
abandonnée à la demande du client.

---

## En une phrase

**Le site est le journal de la maison.** Pas un site de restaurant qui parle de
lui : une Une de quotidien qui parle du Snack du Marché — parce que la presse en
a parlé, et que c'est ce dont la famille est fière.

## D'où vient la direction

Le client a montré quatre références : *The Snack Break* (Hal's New York),
*The Ranch Report*, une affiche « Breaking News » de taquería, le *Swiitch Times*.
Toutes sont des **journaux de marque** : format tabloïd, gros titres en grotesque
noir, filets épais, bandeaux noirs à texte répété, encadrés, pastilles, photos en
couleur. Ce n'est pas le quotidien de qualité austère : c'est le tabloïd assumé,
imprimé, qui claque.

## Les deux pages

| Page | Rôle |
|---|---|
| **La Une** (`index.html`) | L'article de tête sur la maison, la revue de presse, le courrier des lecteurs, la petite annonce traiteur, le carnet pratique, l'ours. |
| **La carte** (`la-carte.html`) | Le tableau des prix traité comme une page de résultats, puis le détail en colonnes. |

Il n'y en aura pas une troisième. Tout ce qui manque se dit au comptoir.

## Palette

Deux encres, un accent. Jamais plus.

| Jeton | Valeur | Rôle |
|---|---|---|
| `--papier` | `#f2eee4` | Le fond, partout |
| `--papier-clair` | `#faf8f3` | Fond des encadrés |
| `--encre` | `#16130f` | Texte, filets, bandeaux pleins |
| `--encre-douce` | `#4f4a43` | Texte secondaire, légendes |
| `--trait` | `#b8b0a0` | Filets fins internes |
| `--rouge` | `#b0211a` | **L'accent unique** : lettrine, pastille, mentions « piquant », jour courant, losanges du bandeau défilant |

Le rouge est un condiment. Il ne fait jamais de fond, sauf la pastille « depuis 1998 ».

## Typographie

| Rôle | Police | Réglage |
|---|---|---|
| Titres, chiffres, libellés | **Archivo** | `font-weight: 800–900`, `font-stretch: 88 %`, capitales, interlettrage serré |
| Corps de texte | **Erode** (locale) | 400, justifié en colonnes, césure active |

Aucun italique, nulle part. Aucun titre bicolore.

Le bloc-titre est un **SVG à `textLength` forcé** : il occupe toujours exactement
la largeur de la page, sans JavaScript et sans jamais déborder.

## Les gestes du journal

1. **Le bloc-titre pleine largeur** — c'est lui qui porte tout le design.
2. **Les filets** — 1 px pour l'intérieur, 2 px pour l'ossature, 4 px sous les têtes de bloc, 6 px pour les grandes coupures.
3. **Les barres de section noires** — titre en capitales à gauche, mention de service à droite.
4. **Le bandeau noir défilant** sous la navigation, losanges rouges en séparateur.
5. **La lettrine rouge** au premier paragraphe de l'article de tête. Une seule sur le site.
6. **La pastille « depuis 1998 »**, posée en tampon sur la photographie pleine largeur.
7. **Les encadrés à ombre portée pleine** (7 px, sans flou) — la petite annonce, le bon à savoir.
8. **Les points de conduite** entre le nom du plat et son prix, comme dans les petites annonces.
9. **Le grain de papier**, une couche fixe en `multiply` à 30 %.

## Photographies

En couleur, contraste légèrement poussé, saturation légèrement retenue, cadrées
d'un filet noir de 2 px. Au survol, la saturation remonte. Jamais de noir et
blanc : la nourriture doit donner faim.

## Ton de voix

Court, factuel, sans superlatif. On ne vend pas, on raconte. Les prix sont
affichés en clair. Ce qu'on ne sait pas, on ne l'invente pas : on renvoie au
comptoir.

## Interdits

- Le vert-rouge-blanc « kebab shop », les halos orange sur fond noir.
- Le motif ottoman, les arabesques, la calligraphie décorative.
- Le gastro froid : blanc pur, serif fine espacée, « expérience culinaire ».
- Le template restaurant : carrousel, étoiles dorées, Google Maps pleine largeur.
- Les dégradés, les coins très arrondis, les ombres floues, les icônes génériques.
- Une troisième page.
