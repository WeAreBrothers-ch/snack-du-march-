# Snack du Marché — site web

Site du Snack du Marché, kebab à la broche, Rue Pré-du-Marché 3, 1004 Lausanne.

Le site est **une seule page qui se déroule**, pensée d'abord pour le
téléphone, sur un **mur de faïence d'Iznik** (cobalt, turquoise, rouge), et
que le défilement anime de bout en bout : le nom qui se
rassemble sur son enseigne cobalt, au-dessus de la vitrine, la devanture qui
s'ouvre sur l'histoire de la maison et sa frise à l'année qui roule, la
planche d'anatomie qu'une ligne lit de haut en bas, la carte, un menu qu'on
déplie au doigt.

| Fichier | Ce que c'est |
|---|---|
| `index.html` | **La page.** Hero, histoire, la broche et son anatomie, la carte, les prix, le quartier, pied de page. |
| `la-carte.html` | Redirige vers la section « carte » de la page. Gardée pour les anciens liens. |
| `404.html` | La page qui s'affiche si une adresse n'existe pas. |

---

## Faire tourner le site

Il n'y a **rien à installer**, aucune étape de construction.

**Dans VS Code** : clic droit sur `index.html` → **Open with Live Server**.

> **Pourquoi pas un simple double-clic ?**
> Les scripts du site sont des *modules* : les navigateurs refusent de les
> charger depuis le disque (`file://`). Ouvert en double-clic, le site passe
> au bout de quatre secondes en version « statique » (tout est visible, sans
> animation). En ligne ou avec Live Server, l'expérience complète se joue.

## Mettre en ligne

Déposer le contenu du dossier tel quel chez n'importe quel hébergeur : Vercel,
Netlify, Infomaniak, un simple FTP.

---

## Où modifier quoi

```
index.html          toute la page : textes, prix, plats
assets/css/         les styles, un fichier par section
assets/js/          les comportements, un fichier par section
assets/photos/      les photographies de la maison
assets/img/         le carreau d'Iznik et ses bordures (tirés de l'image du client)
assets/fonts/       les polices (Zodiak, Gambetta), hébergées avec le site
assets/vendor/      GSAP et Lenis, hébergés avec le site (voir LISEZ-MOI.md)
favicon.svg         l'icône de l'onglet
robots.txt          ce que les moteurs de recherche ont le droit de lire
sitemap.xml         la liste des pages, pour Google
```

### Les textes, les prix, les plats

Tout est écrit **directement dans `index.html`**. Pour changer un prix, on
cherche le chiffre dans la section « Les prix » (les fiches `.format`) et dans le
menu de la carte (les lignes `li.plat`), et on le change aux deux endroits.

### Les horaires

Ils sont écrits dans `index.html` (haut de page, menu, pied de page) et dans
`assets/js/horaires.js` (les deux constantes tout en haut) qui pilotent la
pastille « ouvert / fermé » du haut de page et du menu, toujours à l'heure de
Lausanne. Si les horaires changent, modifier les deux.

### Les photos

Toutes dans `assets/photos/`. Elles sont recadrées en rectangle à coins doux
par le CSS ; pour en remplacer une, il suffit de garder le même nom de fichier.

`sandwich-anatomie.webp` est un recadrage carré de `sandwich-veau-agneau.webp`
pour la planche d'anatomie : les repères (`--x`, `--y` dans `index.html`) sont
placés en pourcentage de **cette** image. Si on la remplace, il faut replacer
les repères.

Dans le menu, les plats dont la maison n'a pas encore de photo (döner box,
köfte, falafel, baklava) montrent leur recette en grand, sur un aplat cobalt
(`ul.plat__recette`). Le jour où une vraie photo existe, on remplace cette liste
par un `figure.plat__photo` avec l'image (et son `--ratio`, largeur / hauteur),
comme pour les autres.

---

## Comment c'est fait

### Les styles

`index.html` lie les feuilles une à une (elles se chargent en parallèle ; des
`@import` se chargeraient à la chaîne), dans l'ordre : `reset`, `polices`,
`base` (couleurs, échelle typographique, motif de faïence), `nav`, `hero`,
`histoire`, `broche`, `carte`, `prix`, `quartier`, `pied` et `statique` (le
mode sans animation). `assets/css/styles.css` liste les mêmes pour les pages
annexes (404, redirection, avec `pages.css`) : **ajouter une feuille aux deux
endroits**.

Toutes les tailles de texte viennent de quelques jetons définis dans
`base.css` (`--t-corps`, `--t-lead`, `--t-h2`…) : ils grandissent avec
l'écran, le texte courant compris, pour garder les proportions du téléphone
au grand écran.

### Les animations

Un seul script est appelé : `assets/js/main.js`. Il charge un module par
section. Les animations s'appuient sur des librairies **hébergées avec le
site** (`assets/vendor/`) : aucun CDN, donc aucune connexion externe avant le
premier affichage.

| Librairie | Rôle |
|---|---|
| GSAP + ScrollTrigger | Les animations liées au défilement |
| SplitText | Le texte qui apparaît ligne par ligne |
| Lenis | Le défilement lissé, **à la souris seulement** : au doigt, le défilement reste celui du système |

Le menu de la carte n'utilise aucune librairie : `carte.js` déplie un plat à la
fois (la hauteur est animée en CSS, `grid-template-rows`). Sans animation, il
fonctionne aussi.

La mise en page animée (classe `anime`, posée par `index.html` dès le premier
affichage) est la même avant et après le démarrage des scripts : la page ne
saute pas quand ils arrivent. La classe `pret` dit que les animations sont en
place. Sur un réseau lent, le haut de page s'affiche au bout de deux secondes
et demie sans son entrée, et les animations prennent le relais dès qu'elles
sont prêtes. Si l'une des librairies ne charge pas, si le visiteur a demandé
« moins d'animations » dans son système, ou si rien n'a démarré au bout de
douze secondes, **le site bascule en mode statique** : tout est visible, le
haut de page n'est plus épinglé ; le menu, la pastille horaire, l'empilement
des cartes de l'histoire (CSS) et la planche d'anatomie fonctionnent
toujours.

La planche d'anatomie (`assets/js/planche.js`) ne dépend d'aucune librairie :
sur grand écran, elle trace les traits qui relient la légende aux repères et
les recalcule dès que la mise en page change ; sur téléphone, la légende
numérotée se passe de traits.

### La faïence

Le motif et les bordures sont dans `assets/img/`. Les couleurs, la taille du
motif (`--maille`), la hauteur des bordures (`--bande-h`) sont des jetons
en tête de `base.css`. Le drapeau de la Turquie est un symbole SVG au début
de `index.html` (`#drapeau-tr`). Voir `DIRECTION-ARTISTIQUE.md`.

### Les polices

Deux serifs de [Fontshare](https://www.fontshare.com) (licence ITF Free Font
License : usage libre, web compris), hébergées avec le site (`assets/fonts/`,
déclarées dans `assets/css/polices.css`, préchargées par `index.html`) :

- **Zodiak** (titres, chiffres, libellés), graisses 700 et 900.
- **Gambetta** (texte courant), graisses 400 et 500.

Quatre fichiers, ~80 Ko. Pour changer de police : remplacer les fichiers,
`polices.css` et les deux variables `--f-titre` / `--f-texte` de `base.css`,
puis recaler l'échelle `--t-*` (les serifs sont plus larges que l'ancien
grotesque condensé) et les largeurs `--mot` des plats sans photo dans
`index.html` (largeur du mot en multiples de la taille, en Zodiak 900).

### La performance sur téléphone

Ce qui a été mesuré (réseau 4G lent et processeur 4× plus lent simulés) et
corrigé : plus aucune dépendance externe (Google Fonts, jsDelivr), CSS et
modules chargés en parallèle (`<link>` et `modulepreload`), mise en page
animée figée dès le premier affichage, fond ivoire uni (aucune image en
fond de page), mesures des animations calculées une fois par état de la page,
défilement natif au doigt, menu déplié en CSS, photos chargées au
calme une fois la page installée.

---

## À valider avec le client avant publication

- Le numéro de téléphone (deux numéros circulent en ligne).
- Les horaires exacts et les jours de fermeture.
- Les prix, relevés sur une photo du tableau noir.
- Les dates de l'histoire : 1998 (ouverture), 2018 (article de 24 heures).
- L'orthographe des prénoms : Hüseyin et Sertaç Celik.
- L'accord des personnes photographiées.

Le détail des sources et de leur fiabilité est dans `RECHERCHE-CLIENT.md`.
