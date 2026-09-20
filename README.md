# Snack du Marché — site web

Site du Snack du Marché, kebab à la broche, Rue Pré-du-Marché 3, 1004 Lausanne.

Le site est **une seule page qui se déroule** : chaque section se met en scène
au fil du défilement (le nom qui entre, la broche qui tourne, les étapes de
l'histoire qui s'empilent, la carte qui s'ouvre au centre).

| Fichier | Ce que c'est |
|---|---|
| `index.html` | **La page.** Hero, histoire, la broche, la carte, les prix, le quartier, pied de page. |
| `la-carte.html` | Redirige vers la section « carte » de la page. Gardée pour les anciens liens. |
| `404.html` | La page qui s'affiche si une adresse n'existe pas. |

---

## Faire tourner le site

Il n'y a **rien à installer**, aucune étape de construction.

**Dans VS Code** : clic droit sur `index.html` → **Open with Live Server**.

> **Pourquoi pas un simple double-clic ?**
> Les scripts du site sont des *modules* : les navigateurs refusent de les
> charger depuis le disque (`file://`). Ouvert en double-clic, le site s'affiche
> en version « statique » (tout est visible, sans animation). En ligne ou avec
> Live Server, l'expérience complète se joue.

## Mettre en ligne

Déposer le contenu du dossier tel quel chez n'importe quel hébergeur : Vercel,
Netlify, Infomaniak, un simple FTP.

---

## Où modifier quoi

```
index.html          toute la page : textes, prix, plats
assets/css/         les styles, un fichier par section
assets/js/          les comportements, un fichier par section
assets/photos/      les onze photographies de la maison
favicon.svg         l'icône de l'onglet
robots.txt          ce que les moteurs de recherche ont le droit de lire
sitemap.xml         la liste des pages, pour Google
```

### Les textes, les prix, les plats

Tout est écrit **directement dans `index.html`**. Pour changer un prix, on
cherche le chiffre dans la section « Les prix » (le tableau) et dans le
carrousel (les cartes `article.plat`), et on le change aux deux endroits.

### Les horaires

Ils sont écrits dans `index.html` (menu, pied de page) et dans
`assets/js/horaires.js` (les deux constantes tout en haut) qui pilotent la
pastille « ouvert / fermé » du menu. Si les horaires changent, modifier les deux.

### Les photos

Onze photos, toutes dans `assets/photos/`. Elles sont recadrées en rond ou en
rectangle arrondi par le CSS ; pour en remplacer une, il suffit de garder le
même nom de fichier.

---

## Comment c'est fait

### Les styles

Une seule feuille est liée depuis le HTML : `assets/css/styles.css`. Elle liste
les fichiers à charger, dans l'ordre : `reset`, `base` (couleurs, polices),
`nav`, `rideau`, `hero`, `histoire`, `broche`, `carte`, `prix`, `quartier`,
`pied`, `statique` (le mode sans animation) et `pages` (404, redirection).

### Les animations

Un seul script est appelé : `assets/js/main.js`. Il charge un module par
section. Les animations s'appuient sur des librairies chargées depuis un CDN :

| Librairie | Rôle |
|---|---|
| GSAP + ScrollTrigger | Les animations liées au défilement |
| SplitText | Le texte qui apparaît ligne par ligne |
| Lenis | Le défilement lissé |
| Swiper | Le carrousel des plats |

Si l'une d'elles ne charge pas, ou si le visiteur a demandé « moins
d'animations » dans son système, **le site bascule en mode statique** : tout
est visible, rien n'est épinglé, le menu et la pastille horaire fonctionnent.

### Les polices

- **Archivo** (titres, chiffres, libellés), en version condensée très grasse.
- **DM Sans** (corps de texte).

Les deux sont chargées depuis Google Fonts. Pour un site suisse, il est
préférable de les héberger nous-mêmes avant la mise en ligne.

---

## À valider avec le client avant publication

- Le numéro de téléphone (deux numéros circulent en ligne).
- Les horaires exacts et les jours de fermeture.
- Les prix, relevés sur une photo du tableau noir.
- Les dates de l'histoire : 1998 (ouverture), 2018 (article de 24 heures).
- L'orthographe des prénoms : Hüseyin et Sertaç Celik.
- L'accord des personnes photographiées.

Le détail des sources et de leur fiabilité est dans `RECHERCHE-CLIENT.md`.
