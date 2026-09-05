# Snack du Marché — site web

Site du Snack du Marché, kebab à la broche, Rue Pré-du-Marché 3, 1004 Lausanne.

Le site est une **Une de journal** : deux pages, pas une de plus.

| Fichier | Ce que c'est |
|---|---|
| `index.html` | **La Une.** L'histoire de la maison, la revue de presse, les avis, l'annonce traiteur, l'adresse et les horaires. |
| `la-carte.html` | **La carte.** Le tableau des prix, puis le détail plat par plat. |
| `404.html` | La page qui s'affiche si une adresse n'existe pas. |

---

## Faire tourner le site

Il n'y a **rien à installer**, aucune étape de construction, aucune dépendance.

**Dans VS Code** : clic droit sur `index.html` → **Open with Live Server**
(le port est déjà réglé sur 5501 dans `.vscode/settings.json`).

> **Pourquoi pas un simple double-clic ?**
> Les trois petits fichiers JavaScript du site sont des *modules*. Les navigateurs
> refusent de les charger quand la page est ouverte directement depuis le disque
> (`file://`) — c'est une règle de sécurité, pas un bug. Ouvert en double-clic, le
> site s'affiche parfaitement, mais trois détails ne fonctionnent pas : la date du
> jour, la pastille « ouvert / fermé » et le bouton d'impression. En ligne, ou avec
> Live Server, tout marche.

## Mettre en ligne

Déposer le contenu du dossier tel quel chez n'importe quel hébergeur : Vercel,
Netlify, Infomaniak, o2switch, un simple FTP.

---

## Où modifier quoi

```
index.html          la Une
la-carte.html       la carte
404.html            la page « introuvable »

assets/css/         les styles, découpés par sujet
assets/js/          les quatre comportements (voir plus bas)
assets/photos/      les onze photographies de la maison
assets/fonts/       la police du corps de texte

favicon.svg         l'icône de l'onglet
robots.txt          ce que les moteurs de recherche ont le droit de lire
sitemap.xml         la liste des pages, pour Google
```

### Les textes, les prix, les plats

Ils sont écrits **directement dans les pages HTML**. Pour changer le prix d'un
sandwich, on ouvre `la-carte.html` et on change le chiffre. Pas de détour.

Deux informations sont répétées d'une page à l'autre — le numéro de téléphone et
l'adresse. Si elles changent, une recherche-remplacement dans les trois pages suffit.

### La revue de presse

Elle est dans `index.html`, section « On en a parlé ». Chaque article est un bloc
`<a class="presse__item">` : le média, le titre entre guillemets, la date et le
lien. Pour en ajouter un, on recopie un bloc existant. **Ne mettre une date que si
elle est vérifiée** — deux des quatre articles n'en portent pas, c'est volontaire.

### Les horaires

Ils sont écrits deux fois : dans le tableau du « carnet pratique » d'`index.html`,
et dans `assets/js/edition.js` (les deux constantes `OUVERTURE_HEURE` et
`FERMETURE_HEURE`, tout en haut du fichier) qui pilotent la pastille
« ouvert / fermé ». Si les horaires changent, modifier les deux.

---

## Comment c'est fait

### Les styles

Une seule feuille est liée depuis le HTML : `assets/css/styles.css`. Elle ne
contient rien d'autre que la liste des fichiers à charger, dans l'ordre :

```
reset.css        remise à zéro des styles du navigateur
base.css         couleurs, polices, échelle de titres, utilitaires
journal.css      l'ossature commune : bloc-titre, navigation, bandeaux, encadrés
une.css          ce qui n'existe que sur la Une
carte.css        ce qui n'existe que sur la carte
impression.css   la mise en page papier
```

### Les comportements

Un seul script est appelé : `assets/js/main.js`. Il en charge trois autres.

| Fichier | Ce qu'il fait |
|---|---|
| `edition.js` | Écrit la date du jour, allume la pastille « ouvert / fermé », souligne la ligne d'horaire du jour. |
| `reveal.js` | Fait apparaître les blocs quand on arrive dessus. |
| `impression.js` | Branche le bouton « imprimer la carte ». |

Si le JavaScript ne se charge pas, **le site reste entièrement lisible** : seuls
ces trois agréments disparaissent.

### Le bloc-titre

« SNACK DU MARCHÉ » n'est pas du texte mis à une taille fixe : c'est un dessin
SVG dont la largeur est forcée à celle de la page. Il occupe donc toujours
exactement la largeur disponible, sur un téléphone comme sur un grand écran,
sans jamais déborder et sans JavaScript.

### Les polices

- **Archivo** (titres, chiffres, libellés) — chargée depuis Google Fonts.
- **Erode** (corps de texte) — hébergée dans `assets/fonts/`.

> Archivo passe aujourd'hui par les serveurs de Google. Pour un site suisse, il
> est préférable de l'héberger nous-mêmes : c'est plus rapide et cela évite
> d'envoyer l'adresse IP des visiteurs à Google. C'est une petite manipulation à
> faire avant la mise en ligne.

---

## À valider avec le client avant publication

- Le numéro de téléphone (deux numéros circulent en ligne).
- Les horaires exacts et les jours de fermeture.
- Les prix du tableau, relevés sur une photo du tableau noir.
- L'offre traiteur : le site reste volontairement vague, faute d'information confirmée.
- L'orthographe des prénoms : Hüseyin et Sertaç Celik.
- L'accord des personnes photographiées.
- Les informations d'accès (métro M2 Riponne — Maurice Béjart, parking de la Riponne).

Le détail des sources et de leur fiabilité est dans `RECHERCHE-CLIENT.md`.
