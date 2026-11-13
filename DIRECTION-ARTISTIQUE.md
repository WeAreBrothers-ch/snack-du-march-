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
| `--t-lead` | 20 → 34 px | Textes de la frise, de la broche |
| `--t-h3` | 30 → 64 px | Titres des étapes |
| `--t-h2` | 40 → 108 px | Titres de section |

Au-delà de 1 792 px de large (`--largeur-max`), le contenu cesse de s'étaler :
il reste centré, les panneaux cobalt continuent d'aller d'un bord à l'autre.

## Les gestes du site

1. **Le hero** : le carreau en plein, encadré par ses barres cobalt (en haut l'étiquette et le menu, puis la bordure ornée ; en bas ouvert ou fermé, l'adresse, la carte). Le nom, sur deux plaques de céramique, de part et d'autre de la photo, dans son cadre cobalt. Pas de rideau : la photo se découvre de bas en haut, comme un store qu'on lève, et le nom apparaît. Une seconde et demie.
   **Les deux mots se rejoignent en une seule plaque** : au premier défilement, le hero reste épinglé ; les deux plaques glissent l'une vers l'autre (même départ, même arrivée, `power2.inOut`) et se posent sur une seule ligne, sous la frise, « Marché » recouvrant d'un rien le rembourrage de « Snack du » (0,23 em, là où il n'y a pas de lettres : les lettres restent à un espace de mot l'une de l'autre). **Le trait de séparation s'efface selon la position réelle des plaques** (`--jointure`, recalculée à chaque image par `hero.js` d'après leurs rectangles à l'écran, jamais d'après un minutage) : le filet gauche de « Marché » s'amincit pendant qu'il glisse sur le filet droit de « Snack du », sur 0,05 em de recouvrement, et seulement quand les deux plaques sont à la même hauteur (tolérance de 0,06 em : un demi-pixel d'arrondi ne doit pas empêcher la fusion complète). La taille de la plaque ne change pas (le filet qui disparaît devient du rembourrage). **À l'arrivée (fusion complète), une plaque unique (`.hero__nom`) prend la place des deux d'un seul bloc, sans fondu** : il n'y a plus qu'un seul élément, donc plus aucun filet décalé d'un pixel. Pourquoi : deux plaques transformées séparément sont arrondies chacune au pixel d'écran avant leur transformation, et leurs filets du haut et du bas, bien qu'à la même position (mesurée à 10⁻⁶ px), tombaient sur des lignes différentes (une marche d'un pixel au zoom maximum). L'échange est invisible : les deux plaques sont déjà fondues, la plaque unique est posée au même endroit et ses lettres tombent à moins d'un pixel d'écran des leurs. Retour en arrière : les deux plaques reviennent, la jointure se rouvre. Les plaques sont mesurées à la fraction de pixel (pas à l'entier d'`offsetTop`). Plus de bandeau cobalt. La photo reste entière, remonte sous la plaque et grandit vers le bas, jusqu'à la barre du bas, qui reste visible. Le haut de page finit net sur sa barre ; le mur de faïence continue dessous. Mesuré avec un processeur ralenti 4× : 60 images par seconde, aucune image perdue, sur téléphone et sur bureau. *Essais abandonnés : plaque unique avec fondu (à-coup visible) ; « pont » superposé (fil à la jonction) ; plaques sur calques séparés `will-change` (marche d'un pixel) ; calage de la plaque unique sur la position mesurée (moins bon que le calcul d'avance).*
2. **L'histoire : on entre dans la maison, puis trois cartes s'empilent.** Le titre, et sous lui une vitrine où la devanture se découvre ; pendant une courte pause, elle s'ouvre jusqu'aux bords de l'écran. **Le titre et sa phrase sont sur une seule plaque**, sans séparation. **Sur téléphone, la même composition que sur grand écran, en petit** : cinq petites photos posées à distance du titre et de la vitrine, sans rien toucher (trois aux coins ; deux **accrochées aux flancs de la vitrine**, à 4 vw d'écart, pour garder le même espace quelle que soit la hauteur de l'écran) ; elles s'écartent et s'effacent quand la vitrine s'ouvre.
   **Les cartes** (référence : les piles de cartes de 21st, où l'on voit le bord des cartes du dessous) : trois cartes, 1998, 2018, 2026, **cobalt, ivoire, cobalt**. Chacune se colle en haut de l'écran, **un cran plus bas que la précédente** (`--rang` x `--onglet`) ; **l'espace entre deux cartes est un `gap` de flex, jamais une marge** (une marge compte dans la hauteur de la carte collée : les deux premières cartes repartaient avant l'arrivée de la troisième, qui se posait sur un mur vide), **Les trois cartes ont exactement la même hauteur** (celle de la plus haute, réglée par `histoire.js`) : sinon la carte du dessous dépasse sous la dernière ; et une pause finale laisse la dernière carte, par-dessus les autres, le temps d'être lue : quand la suivante la recouvre, il reste visible son **onglet**, l'année et le titre, comme un jeu de cartes dont on ne verrait que le bord. Du CSS seul (`position: sticky`) ; la carte recouverte s'assombrit (voile). L'année se compte en arrivant (les 36 ans qui précèdent défilent). **Sur téléphone, la photo prend toute la largeur de la carte, en 4/3, coins arrondis, sans cadre ni ombre** (une petite part est recadrée en haut et en bas, réglée photo par photo avec `--cadrage` pour garder les visages et l'enseigne) ; un tirage petit et centré, avec cadre, faisait « posé n'importe comment ». La carte tient dans l'écran même avec les deux onglets au-dessus. Sur grand écran : photo à gauche, à son format (`--r`), texte à droite. La citation de *24 heures* a son filet rouge. **Derrière les cartes, un mur de carreaux opaque raccordé au mur de la page** (`.histoire__mur`, décalé par `histoire.js`) : sans lui, la devanture de l'intro, qui reste collée derrière, transparaissait entre les cartes.
3. **La broche, la signature de la maison** : une **plaque cobalt** (la seule du milieu de page avec les cartes de l'histoire et l'anatomie, pour qu'on la remarque) ; une étiquette « La broche », le titre **très grand** en ivoire, la photo de la broche en 4/3 (la viande et la seconde broche, cadrées à gauche), puis les trois gestes en gros caractères : **un grand chiffre ton sur ton** (bleu nuit sur le cobalt) à gauche, le titre en capitales, le texte au-dessous. La colonne du chiffre a une largeur fixe : titres et textes partent du même bord. Sur grand écran : titre et photo à gauche, les trois gestes à droite, l'un sous l'autre. *Une scène plein écran épinglée (photo en fond, un geste à la fois) a été essayée puis abandonnée : « trop moche » ; la photo, en gros plan sur un tiers de son cadre, devenait floue.*
4. **L'anatomie** : le panneau cobalt monte comme une carte, en retrait des bords et les coins du haut arrondis, et s'élargit jusqu'aux bords. La vraie photo du veau-agneau, huit repères. **Une ligne lit la planche** de haut en bas au défilement : chaque repère s'allume quand elle le croise, avec son ingrédient. Sur téléphone, la photo passe sous la ligne et une étiquette nomme l'ingrédient. Sur grand écran, la scène reste en place le temps de la lecture : la légende est de part et d'autre, chaque trait se dessine de l'ingrédient au repère quand il est lu, le dernier lu passe au turquoise, la photo recule doucement.
5. **La carte** : « Tout est fait maison » en grand, sur trois lignes avec leurs vignettes ; tant qu'il est à l'écran, ses lignes glissent en sens contraires. Puis le carrousel des plats, qu'on feuillette au doigt (scroll-snap). *Un menu à plats dépliables a été essayé puis abandonné : le client préfère le carrousel.*
6. **Le quartier : un ruban** (références : le ruban photos + citation de Seed, la carte d'adresse avec boutons de Little Amps, sur Mobbin). Le grand texte cobalt se dévoile de haut en bas. Dessous, **une seule rangée de cartes de même hauteur, à balayer du doigt** (scroll-snap) : la devanture, un avis (cobalt), la terrasse, l'enseigne, un avis (ivoire), et **la carte d'adresse** (cobalt) avec les boutons « Itinéraire » et « Appeler ». Les photos prennent la largeur de leur format : **jamais rognées**. Un compteur (« 03 / 06 ») et une barre de progression disent où l'on en est ; la carte au centre est à sa taille, les autres reculent un peu. **Toute la section tient dans un écran de téléphone** (elle en faisait plus de trois). Sur grand écran, le ruban reste collé en haut de l'écran et glisse de côté pendant qu'on descend. *Ont été abandonnés : la devanture découpée en tranches, les avis penchés qui chevauchaient les photos, la longue colonne de clichés.* **Sur grand écran, une grille nette sur 24 colonnes** : en haut les trois photos (9 / 6 / 9 colonnes, même hauteur, la devanture donne la hauteur), dessous trois tiers égaux (les deux avis, l'adresse), le texte à l'aise dans chaque bloc (le bas de chaque avis porte sa source) ; **la section est calme** (elle n'est pas la plus importante du site) : le titre à sa taille, sans dévoilement ; les cartes à plat sur une ou deux rangées, sans défilement détourné et sans compteur (le compteur et la barre ne servent qu'au doigt) ; le titre reste dévoilé de haut en bas sur téléphone seulement.
7. **Le pied de page** : court, **collé aux bords de l'écran** (plus de carte en retrait ni de mur visible sur les côtés) ; **mais un espace de mur de carreaux le sépare de la dernière plaque** (comme entre les autres sections) : plaque et pied de page ne se touchent jamais.  « Afiyet olsun » et le drapeau, puis trois blocs serrés (adresse et itinéraire sur toute la largeur ; horaires avec ouvert ou fermé, et téléphone avec les réseaux, côte à côte), puis le nom, **sur une seule ligne**, d'un bord à l'autre, dont les lettres montent au rythme du défilement, et la ligne des mentions. Moins d'un écran de téléphone.

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
jamais de noir et blanc. Les petites photos de l'intro de l'histoire (celles posées autour du titre et de la vitrine) n'ont **pas de contour bleu**, seulement un filet d'ivoire ; les autres photos gardent leur cadre ou leur filet cobalt (haut de page, ruban du quartier, vignettes du titre de la carte).

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

## Les prix, sur téléphone (version 4.4)

Quatre fiches empilées faisaient trois écrans : remplacées par **un choix de
viande en quatre pastilles** (veau & agneau par défaut), qui affiche d'un coup
les quatre formats (Sandwich, Dürüm, Assiette, Petit) en une liste de quatre
lignes, le prix en grand et en rouge. C'est un vrai `<table>` (accessible) avec
des boutons radio et le sélecteur `:has()` : sans JavaScript, et le tableau
entier s'affiche dans les vieux navigateurs. Sur grand écran, tout le tableau,
sans les pastilles. Les extras (box, tacos, frites, baklava, mezze) sont des
pastilles qui passent à la ligne. Tient dans un écran de téléphone.
