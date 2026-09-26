# Direction artistique — Snack du Marché

**Version 3.2 — 25.09.2026.** Après le retour du client (« il n'y a pas
d'animation, rien de spécial ») : chaque section retrouve un geste à elle,
lié au défilement et pensé d'abord pour le téléphone. La version 3.1 avait
corrigé la 3.0 : une ouverture sans effet de démonstration, des proportions
tenues du téléphone au grand écran, une vraie planche d'anatomie à la place
de l'étoile.

---

## En une phrase

**Le site est une mise en scène de la broche.** Une seule page, qui se joue au
fil du défilement comme un court film : le nom se rassemble sur son enseigne,
l'histoire s'empile, le sandwich se dissèque sur sa planche, la carte s'ouvre.

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
| `--craie` | `#f1efe6` | Le texte, le ticket d'adresse, les papiers d'avis, les repères de la planche |
| `--bordeaux` | `#7b1f2d` | Cadre de la photo et enseigne du haut de page, panneaux pleins (étapes, anatomie, pied de page, menu), boutons, plats sans photo, texte fantôme |
| `--bordeaux-clair` | `#b13a4d` | La même couleur, éclaircie pour rester lisible en texte sur le noir : prix, survols |

Sur les panneaux bordeaux, le texte est craie ; les grands chiffres (années,
nom en pied de page, nom des plats sans photo) sont **ton sur ton**, en
ardoise. C'est ce qui fait le côté classe : le contraste vient de la matière,
pas de la couleur.

## Typographie

| Rôle | Police | Réglage |
|---|---|---|
| Titres, chiffres, libellés | **Archivo** | graisse 800 à 900, largeur 68 à 85, capitales, interlettrage serré |
| Corps de texte | **DM Sans** | 400 et 500, interligne 1.35 à 1.5 |

Aucun italique. Aucun titre bicolore. Espaces insécables de la typographie
française (avant « : ; ? ! », dans les guillemets, entre l'heure et « h »).

### L'échelle

Toutes les tailles viennent de six jetons (`base.css`). Ils grandissent avec
l'écran **tous ensemble**, le texte courant compris : c'est ce qui tient les
proportions entre titres, photos et paragraphes. Le texte courant ne descend
jamais sous 17 px.

| Jeton | Téléphone → grand écran | Usage |
|---|---|---|
| `--t-petit` | 14 → 16 px | Mentions, légendes des avis |
| `--t-corps` | 17 → 20 px | Texte courant, légende de la planche |
| `--t-label` | 16 → 20 px | Libellés en capitales : navigation, adresse, ouvert/fermé |
| `--t-lead` | 19 → 32 px | Textes des étapes, de la broche, du carrousel |
| `--t-h3` | 36 → 80 px | Titres des étapes |
| `--t-h2` | 47 → 152 px | Titres de section |

Au-delà de 1 792 px de large (`--largeur-max`), le contenu cesse de s'étaler :
il reste centré, les panneaux bordeaux continuent d'aller d'un bord à l'autre.

## Les gestes du site

1. **Le hero** : le nom de part et d'autre de la photo, dans son cadre bordeaux. Pas de rideau : la page est là tout de suite, la photo se découvre de bas en haut, comme un store qu'on lève à l'ouverture, et le nom monte. Une seconde et demie. En bas, ce qui sert : ouvert ou fermé, l'adresse, la carte.
   **L'enseigne** : au premier défilement, le hero reste épinglé ; les deux mots se rejoignent au-dessus de la photo pour former « Snack du Marché » sur une seule ligne, sur un bandeau bordeaux qui se déroule depuis le milieu, comme l'enseigne au-dessus de la vitrine. La photo reste entière (rien ne passe dessus) et grandit un peu vers le bas.
2. **L'histoire : on entre dans la maison.** Le titre, et sous lui une vitrine où la devanture se découvre. Pendant une courte pause, la vitrine s'ouvre jusqu'aux bords de l'écran et la photo recule, comme si l'on passait la porte (sur grand écran, les photos de l'album posées autour s'écartent). Puis trois cartes bordeaux glissent par-dessus, l'une après l'autre (1998, 2018, 2026), et chacune, la dernière comprise, reste le temps d'être lue ; l'année en ardoise géante arrive de la droite, la photo bouge dans son cadre.
3. **La broche** : la photo se découvre de bas en haut au rythme du défilement, en reculant depuis un gros plan, puis glisse doucement dans son cadre.
4. **L'anatomie** : le panneau bordeaux monte avec un bord en biais, qui se redresse en arrivant. La vraie photo du veau-agneau, huit repères posés sur les ingrédients, la légende numérotée. Sur téléphone, une ligne craie lit la planche : elle reste au milieu de l'écran pendant que la photo passe dessous, chaque repère s'allume quand elle le croise, avec son ingrédient dans la légende, et une étiquette le nomme. Pas un écran de plus à faire défiler. Sur grand écran, une planche comme dans un livre de sciences naturelles : la légende de part et d'autre, reliée à chaque repère par un trait qui se dessine.
5. **La carte** : « Tout est fait maison » en grand ; tant qu'il est à l'écran, ses lignes glissent en sens contraires. Puis le carrousel des plats, qu'on feuillette au doigt.
6. **Le grand texte du quartier** : la copie craie se dévoile de haut en bas sur sa copie bordeaux ; les photos et les avis défilent chacun à sa vitesse.
7. **Le pied de page** : le panneau monte en biais, le nom monte en géant au rythme du défilement, le ticket d'adresse se pose sur le bas des lettres.

Un seul élément décoratif par section.

## Le téléphone d'abord

Le site se pense sur un téléphone, puis s'élargit.

- Chaque section se lit dans le fil de la page : rien ne dépend d'une scène
  « plein écran » qui supposerait une hauteur d'écran précise.
- Ce qui doit tenir dans un écran (une carte de l'histoire) se mesure sur la
  **hauteur toujours visible** (`--ecran-visible`, barres du navigateur
  déployées) ; les fonds, eux, couvrent la plus grande (`--ecran`).
- Chaque section a ses images sur téléphone.
- Une animation ne rallonge pas la page : rien ne se raconte sur plusieurs
  écrans de défilement. La vitrine de l'histoire s'ouvre pendant une courte
  pause ; la lecture de l'anatomie se fait pendant que la photo passe.
- Le texte courant ne descend pas sous 17 px ; on vérifie sur 375 × 548
  (petit iPhone, barres déployées) et 390 × 664 avant le grand écran.

## Photographies

Toujours en rectangle à coins doux (`--rayon`), jamais en rond. En couleur,
jamais de noir et blanc. Les étapes ont un cadre ardoise, comme un tirage.

Une photo montre ce qu'elle dit : un plat sans photo est présenté par son nom,
en grand, sur un aplat bordeaux, jamais par la photo d'un autre plat.

## Mouvement

- **Le défilement mène.** La plupart des gestes sont liés au doigt : ils avancent quand on descend, reculent quand on remonte, s'arrêtent quand on s'arrête. Une page qu'on fait défiler doit vivre, pas seulement faire apparaître ses blocs.
- Le défilement est lissé (Lenis) à la souris, natif au doigt. Seul le haut de page est épinglé par le script ; l'intro et les cartes de l'histoire, et sur grand écran l'accroche de la broche, restent en place grâce au CSS (`position: sticky`), sans détourner le défilement.
- Les textes apparaissent **ligne par ligne**, en montant depuis une fente.
- Les images se découvrent **de bas en haut** (`clip-path`) ou s'ouvrent (la vitrine) ; dans leur cadre, elles bougent un peu moins vite que la page.
- Les panneaux **montent** par-dessus le précédent, qui recule et s'assombrit. Les panneaux bordeaux (anatomie, pied de page) montent avec un bord en biais, qui se redresse.
- Rien ne tourne, ne rebondit, ne flotte ni ne surgit de zéro.
- Tout est **désactivé** si le visiteur demande moins d'animations.

## Interdits

- Le vert-rouge-blanc « kebab shop », les halos orange sur fond noir.
- Le motif ottoman, les arabesques, la calligraphie décorative.
- Le gastro froid : blanc pur, serif fine, « expérience culinaire ».
- Les dégradés, les ombres floues, les icônes génériques.
- Les tics des sites générés : rideau d'ouverture, mots qui tournent, éléments qui flottent ou rebondissent, étoiles et badges derrière une photo, phrases d'accroche creuses.
- Le petit texte « pour faire joli » : un texte existe parce qu'il sert, et il est lisible.
- La barre de progression du défilement.
- Une deuxième page.
