# Direction artistique — Snack du Marché

**Version 4.2 — novembre 2026.** Le carreau redevient le mur de toute la page, en plein ; le texte est posé sur des plaques de céramique. Le haut de page garde son nom en deux plaques séparées (le bandeau qui les rassemblait faisait bâclé). **Version 4.0.** Le client n'a pas aimé la version « ardoise
et bordeaux » : il préfère l'esprit du site du P'tit Central (un bistrot
lausannois aux murs de carreaux, fait lui aussi par WeAreBrothers) et veut
que la Turquie se voie d'emblée. Le site passe de la nuit à la **faïence
d'Iznik**, à partir du carreau qu'il a choisi. Les gestes et la mise en page
de la 3.2 restent : seuls la matière, les couleurs et l'ornement changent.

---

## En une phrase

**Le site est une mise en scène de la broche, sur un mur de faïence.** Une
seule page, qui se joue au fil du défilement comme un court film : le nom se
rassemble sur son enseigne, l'histoire s'empile, le sandwich se dissèque sur
sa planche, la carte s'ouvre. Le mur, lui, ne bouge pas : c'est le carreau
d'Iznik, en plein, d'un seul tenant du haut de page au pied de page. Le texte
ne se pose jamais dessus : il est sur des **plaques de céramique** ivoire,
bordées d'un double filet cobalt, en retrait des bords pour laisser voir le
mur.

## D'où vient la direction

- **Le carreau du client** : un panneau de faïence d'Iznik, tulipes, œillets
  et grenades en cobalt, turquoise et rouge sur blanc, entouré d'une bordure
  cobalt à rosettes et rinceaux. Il est traité (voir « Les assets »).
- **Le P'tit Central** (lepetitcentral.ch) : un bistrot de quartier, des
  carreaux bleu et blanc, un ton posé. On garde l'idée d'une maison qui vit
  sous ses carreaux ; on ne copie ni sa mise en page ni ses textes. L'identité
  du Snack est plus affirmée : le cobalt franc, la bordure.
- **Bánh Mì Vietnam**, la référence de la version précédente, reste celle du
  rythme : sections épinglées, animations au défilement.
- Pour le hero et la carte : les héros à photo encadrée et les menus à prix alignés vus sur Mobbin.

## Palette

Relevée sur le carreau. Le cobalt porte la maison ; le rouge et le turquoise
n'ont que de petits rôles.

| Jeton | Valeur | Rôle |
|---|---|---|
| `--cobalt` | `#1226a0` | Barres et bordures, panneaux pleins (étapes, anatomie, pied de page, menu), titres de section, boutons, cadre de la photo du haut de page |
| `--cobalt-fonce` | `#0b1778` | Réserve |
| `--nuit` | `#0a1250` | Le bleu le plus sombre : ton sur ton sur les panneaux (années, nom en pied de page), voiles |
| `--turquoise` | `#2fa9c4` | Survols sur cobalt, focus. Rien d'autre |
| `--rouge` | `#d41c0c` | Le rouge du carreau : prix, survols sur fond clair, « Afiyet olsun » |
| `--fond` | `#f3eddc` | Un ivoire chaud (pages annexes, réserve) |
| `--craie` | `#fbf9f2` | La céramique : plaques du nom, avis, cadres des photos, texte sur cobalt |
| `--encre` | `#0d1553` | Texte courant |
| `--drapeau` | `#e30a17` | Le rouge du drapeau turc, pour le drapeau seul |

Sur les panneaux cobalt, le texte est ivoire ; les grands chiffres sont
**ton sur ton**, en bleu nuit.

## Les assets

Tous tirés de l'image du client (`assets/img/`), débruités en moyennant les
répétitions du carreau :

- `carreau-iznik.webp` : le motif, sans couture (un motif fait deux carreaux
  de haut). C'est le mur de toute la page, en plein (`body`) : pas de
  version pâlie, pas de jonction. Le carreau pâli de la version 4.0
  brouillait le texte ; les plaques le remplacent.
- **Les plaques** (`.plaque`, `base.css`) : ivoire, double filet cobalt,
  coins doux, en retrait des bords (`--retrait`). L'histoire (la frise), la
  broche, la carte, les prix, le quartier. Les titres posés sur le mur (le
  nom, le titre de l'histoire) ont chacun leur petite plaque.
- `bande-h.webp`, `bande-v.webp` : la bordure du carreau, à répéter. En
  filet entre deux sections (`.espace`), en tête de chaque panneau, en haut
  du hero ; sur grand écran, sur les côtés du hero.
- Le **drapeau de la Turquie** est un symbole SVG défini dans `index.html`
  (`#drapeau-tr`), utilisé à côté de « Afiyet olsun » dans le pied de page. Pas dans la
  navigation, pas plus : c'est un clin d'œil, pas un décor.

## Typographie

Deux serifs de Fontshare, choisies pour ne pas faire « site généré » : un
grotesque condensé en capitales, c'est le réflexe de tous les sites de
restauration récents ; une serif contrastée, c'est une enseigne de bistrot,
et elle va avec la faïence.

| Rôle | Police | Réglage |
|---|---|---|
| Titres, chiffres, libellés | **Zodiak** | graisse 900 (titres, années) ou 700 (libellés, prix), capitales, libellés espacés |
| Corps de texte | **Gambetta** | 400 et 500, interligne 1.35 à 1.5 |

Aucun italique. Aucun titre bicolore. Espaces insécables de la typographie
française (avant « : ; ? ! », dans les guillemets, entre l'heure et « h »).

### L'échelle

Toutes les tailles viennent de six jetons (`base.css`), calés sur Zodiak et Gambetta (titres plus petits qu'avec l'ancien grotesque condensé, texte courant un peu plus grand). Ils grandissent avec
l'écran **tous ensemble**, le texte courant compris : c'est ce qui tient les
proportions entre titres, photos et paragraphes. Le texte courant ne descend
jamais sous 18 px.

| Jeton | Téléphone → grand écran | Usage |
|---|---|---|
| `--t-petit` | 15 → 17 px | Mentions, légendes des avis |
| `--t-corps` | 18 → 21 px | Texte courant, légende de la planche |
| `--t-label` | 15 → 18 px | Libellés en capitales : navigation, adresse, ouvert/fermé |
| `--t-lead` | 20 → 34 px | Textes des étapes, de la broche, du carrousel |
| `--t-h3` | 30 → 64 px | Titres des étapes |
| `--t-h2` | 40 → 108 px | Titres de section |

Au-delà de 1 792 px de large (`--largeur-max`), le contenu cesse de s'étaler :
il reste centré, les panneaux cobalt continuent d'aller d'un bord à l'autre.

## Les gestes du site

1. **Le hero** : le carreau en plein, encadré par ses barres cobalt (en haut l'étiquette et le menu, puis la bordure ornée ; en bas ouvert ou fermé, l'adresse, la carte). Le nom, sur deux plaques de céramique, de part et d'autre de la photo, dans son cadre cobalt. Pas de rideau. **À l'ouverture** : le mur se pose (léger recul, bordures comprises), la photo se découvre de bas en haut comme un store qu'on lève, les deux plaques s'ouvrent depuis leur milieu (« Snack du » puis « Marché »), la barre du bas monte. **Ensuite, le haut de page vit** : le mur s'approche très lentement (une caméra qui avance, transform seul), et la photo du cadre change de plat toutes les quatre secondes (dürüm, comptoir, assiette, sandwich, dürüm), chaque plat se découvrant de bas en haut. Le cycle s'arrête quand le haut de page n'est plus à l'écran ; les plats suivants ne sont chargés qu'une fois la page installée.
   **Au défilement**, la composition reste entière : le hero n'est pas épinglé, rien ne se rassemble. Les deux plaques s'écartent doucement de la photo (la première monte, la seconde traîne) et la photo s'approche un peu dans son cadre. L'ancien geste (le nom rassemblé sur un bandeau cobalt, puis la vitrine à trois photos) est abandonné : les mots séparés sont plus harmonieux que réunis.
2. **L'histoire : on entre dans la maison, puis on lit la frise.** Le titre, et sous lui une vitrine où la devanture se découvre ; pendant une courte pause, elle s'ouvre jusqu'aux bords de l'écran. Puis la frise monte par-dessus : une page de journal sur sa plaque de céramique, trois chapitres (1998, 2018, 2026). Sur grand écran, l'année reste en place sur le côté et **ses chiffres roulent comme un compteur** d'un chapitre à l'autre, les unités d'abord ; la table des chapitres suit la lecture. **Sur téléphone, pas de repère collé** (il passait sous le bouton « Menu » et montrait des chiffres à moitié roulés) : chaque chapitre porte son année en grand, qui se compte une fois en arrivant à l'écran. La presse est citée en grand, comme une coupure. Le titre de l'intro et son sous-titre sont sur des plaques, sur le mur, petites sur téléphone pour ne pas cacher la devanture. Référence : les frises éditoriales de Freitag, Büro, Mews (Mobbin).
3. **La broche** : le titre, la photo de la broche dans son format (paysage, jamais agrandie au-delà du fichier), et trois gestes numérotés entre des filets cobalt qui se tracent : la viande entière, la recette du père, tranchée au couteau. Chaque phrase dit un fait vérifié (voir `RECHERCHE-CLIENT.md`).
4. **L'anatomie** : le panneau cobalt monte comme une carte, en retrait des bords et les coins du haut arrondis, et s'élargit jusqu'aux bords. La vraie photo du veau-agneau, huit repères. **Une ligne lit la planche** de haut en bas au défilement : chaque repère s'allume quand elle le croise, avec son ingrédient. Sur téléphone, la photo passe sous la ligne et une étiquette nomme l'ingrédient. Sur grand écran, la scène reste en place le temps de la lecture : la légende est de part et d'autre, chaque trait se dessine de l'ingrédient au repère quand il est lu, le dernier lu passe au turquoise, la photo recule doucement.
5. **La carte** : « Tout est fait maison » en grand ; tant qu'il est à l'écran, ses lignes glissent en sens contraires. Puis le carrousel des plats, qu'on feuillette au doigt
6. **Le grand texte du quartier** : la copie cobalt se dévoile de haut en bas sur sa copie cobalt pâle ; les photos et les avis défilent chacun à sa vitesse.
7. **Le pied de page** : le panneau cobalt monte comme une carte qui s'élargit. Ce qu'on vient y chercher, en grand et en ivoire plein : l'adresse (et l'itinéraire), les horaires (et ouvert ou fermé), le téléphone. Puis le nom, d'un bord à l'autre, dont les lettres montent de leur ligne au rythme du défilement. Plus de ticket de travers ni de nom ton sur ton : ils ne se lisaient pas.

Un seul élément décoratif par section : la bordure en tête, ou le cadre cobalt.

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
- Le texte courant ne descend pas sous 18 px ; on vérifie sur 375 × 548
  (petit iPhone, barres déployées) et 390 × 664 avant le grand écran.

## Photographies

Toujours en rectangle à coins doux (`--rayon`), jamais en rond. En couleur,
jamais de noir et blanc. Les étapes ont un cadre ivoire, comme un tirage ; les photos du quartier un filet cobalt ; celle du haut de page a un cadre cobalt.

Une photo montre ce qu'elle dit : un plat sans photo est présenté par son nom,
en grand, sur un aplat cobalt, jamais par la photo d'un autre plat.

## Mouvement

- **Le défilement mène.** La plupart des gestes sont liés au doigt : ils avancent quand on descend, reculent quand on remonte, s'arrêtent quand on s'arrête. Une page qu'on fait défiler doit vivre, pas seulement faire apparaître ses blocs.
- Le défilement est lissé (Lenis) à la souris, natif au doigt. Seul le haut de page est épinglé par le script ; l'intro et les cartes de l'histoire, et sur grand écran l'accroche de la broche, restent en place grâce au CSS (`position: sticky`), sans détourner le défilement.
- Les textes apparaissent **ligne par ligne**, en montant depuis une fente.
- Les images se découvrent **de bas en haut** (`clip-path`) ou s'ouvrent (la vitrine) ; dans leur cadre, elles bougent un peu moins vite que la page.
- Les panneaux **montent** par-dessus le précédent, qui recule et s'assombrit. Les panneaux cobalt (anatomie, pied de page) montent comme une carte en retrait des bords, qui s'élargit jusqu'aux bords. Plus de bord en biais : il coupait la frise de travers.
- Rien ne tourne, ne rebondit, ne flotte ni ne surgit de zéro.
- Tout est **désactivé** si le visiteur demande moins d'animations.

## Interdits

- Le vert-rouge-blanc « kebab shop », les halos orange sur fond noir, les
  néons.
- Le motif ottoman **hors du carreau du client** : pas d'arabesques, de
  calligraphie ou de croissants redessinés, pas de clipart « oriental ».
  Toute l'ornementation vient du carreau fourni ; le drapeau est le seul
  symbole ajouté, en petit.
- Le motif derrière du texte courant, plein ou pâli : il n'est que dans le
  haut de page et dans les bandes, et le nom y est toujours sur une plaque.
- Plus d'un rouge : `--rouge` pour les prix et les survols, `--drapeau` pour
  le drapeau, c'est tout.
- Les dégradés, les ombres floues, les icônes génériques.
- Les tics des sites générés : rideau d'ouverture, mots qui tournent, éléments qui flottent ou rebondissent, étoiles et badges derrière une photo, phrases d'accroche creuses.
- Le petit texte « pour faire joli » : un texte existe parce qu'il sert, et il est lisible.
- La barre de progression du défilement.
- Une deuxième page.


## Les prix (version 4.3)

Plus de tableau à quatre colonnes (illisible sur téléphone) : quatre fiches
(Sandwich, Dürüm, Assiette, Petit) où les prix identiques sont regroupés
(« Poulet · Falafel 12.– », « Veau & agneau · Köfte 14.– »), le prix en rouge
et en grand, relié à la viande par une ligne de points. Une colonne sur
téléphone, deux à partir de la tablette. Mêmes prix que le tableau noir.

## Le bouton « Menu »

Le bouton flottant se retire quand on descend et revient dès qu'on remonte :
il ne cache plus le titre ni la légende de la planche.
