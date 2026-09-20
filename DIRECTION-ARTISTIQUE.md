# Direction artistique — Snack du Marché

**Version 3.0 — 18.09.2026.** Remplace la version 2 (la Une de journal), à la
demande du client.

---

## En une phrase

**Le site est une mise en scène de la broche.** Une seule page, qui se joue au
fil du défilement comme un court film : le nom entre, la broche tourne,
l'histoire s'empile, le sandwich se disséque, la carte s'ouvre.

## D'où vient la direction

Le client a montré une référence : *Bánh Mì Vietnam* (banhmivietnam.xyz),
un site éditorial d'un seul écran qui raconte un sandwich section par section,
avec des sections épinglées et des animations au défilement. On garde
l'esprit et le rythme ; le bánh mì devient la broche de la maison.

## Palette

L'ardoise noire de l'enseigne à la craie, la craie, et un bordeaux profond.
Trois couleurs. Jamais plus.

| Jeton | Valeur | Rôle |
|---|---|---|
| `--fond` | `#121615` | L'ardoise : le fond, partout |
| `--craie` | `#f1efe6` | Le texte, le ticket d'adresse, les papiers d'avis |
| `--bordeaux` | `#7b1f2d` | Disque du hero, panneaux pleins (étapes, anatomie, pied de page), boutons, vignettes, texte fantôme |
| `--bordeaux-clair` | `#b13a4d` | La même couleur, éclaircie pour rester lisible en texte sur le noir : prix, survols, barre de progression |

Sur les panneaux bordeaux, le texte est craie ; les grands chiffres (années,
nom en pied de page) et l'étoile sont **ton sur ton**, en ardoise. C'est ce qui
fait le côté classe : le contraste vient de la matière, pas de la couleur.

## Typographie

| Rôle | Police | Réglage |
|---|---|---|
| Titres, chiffres, libellés | **Archivo** | `font-weight: 900`, `font-stretch` 70 à 85 %, capitales, interlettrage serré |
| Corps de texte | **DM Sans** | 400, interligne 1.5 |

Aucun italique. Aucun titre bicolore.

## Les gestes du site

1. **Le rideau d'ouverture** : trois mots (Broche, Épices, Maison), puis le disque caramel se referme sur le hero.
2. **Le hero** : le nom de part et d'autre de la broche, dans un disque. Les mots glissent depuis les côtés, la photo arrive en tournant.
3. **Les étapes de l'histoire** : trois panneaux noirs qui s'empilent (1998, 2018, 2026), l'année en caramel géant.
4. **L'anatomie** : le panneau noir s'ouvre en biseau, l'étoile rouge et le sandwich surgissent, les ingrédients s'égrènent.
5. **La carte** : trois mots (Tout est / fait / maison) s'éjectent en tournant pendant que le carrousel s'ouvre au centre.
6. **Le grand texte du quartier** : la copie noire se dévoile de haut en bas sur sa copie caramel.
7. **Le pied de page** : le nom en géant, le ticket d'adresse posé dessus.

Un seul élément décoratif par section. Pas de numérotation.

## Photographies

Recadrées en rond (hero, anatomie, coins) ou en rectangle à coins doux
(étapes, carrousel, quartier). En couleur, jamais de noir et blanc. Les
étapes ont un cadre crème épais, comme un tirage.

## Mouvement

- Le défilement est lissé (Lenis). Les sections clés sont épinglées le temps de leur animation.
- Les textes apparaissent **ligne par ligne**, en montant depuis une fente.
- Les images s'ouvrent depuis leur centre (`clip-path`).
- Tout est **réduit sur téléphone** et **désactivé** si le visiteur demande moins d'animations.

## Interdits

- Le vert-rouge-blanc « kebab shop », les halos orange sur fond noir.
- Le motif ottoman, les arabesques, la calligraphie décorative.
- Le gastro froid : blanc pur, serif fine, « expérience culinaire ».
- Les dégradés, les ombres floues, les icônes génériques.
- Une deuxième page.
