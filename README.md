# Snack du Marché — site web

Site du Snack du Marché, kebab à la broche, Rue Pré-du-Marché 3, 1004 Lausanne.

Trois documents à lire dans cet ordre :

1. **`RECHERCHE-CLIENT.md`** — les faits sur la maison, avec leurs sources et leur niveau de fiabilité.
2. **`DIRECTION-ARTISTIQUE.md`** — la direction artistique complète. C'est la référence : toute décision de design y est déjà tranchée.
3. **ce fichier** — comment ouvrir le site et où modifier quoi.

---

## Faire tourner le site

Il n'y a **rien à installer**. Le site est fait de pages HTML, de feuilles de style
et de trois petits fichiers JavaScript. Aucun outil de compilation, aucune dépendance.

- Double-cliquer sur `index.html`, ou
- dans VS Code, clic droit sur `index.html` → **Open with Live Server**
  (le port est déjà réglé sur 5501 dans `.vscode/settings.json`).

## Mettre en ligne

Déposer le contenu du dossier tel quel chez n'importe quel hébergeur : Vercel,
Netlify, Infomaniak, o2switch, un simple FTP. Il n'y a pas d'étape de construction.

---

## Où modifier quoi

```
index.html          l'accueil
la-maison.html      l'histoire de la maison
la-carte.html       la carte
traiteur.html       le service traiteur et le formulaire de devis
nous-trouver.html   l'adresse, les horaires, l'accès
404.html            la page « introuvable »

assets/css/         les styles, découpés par sujet
assets/js/          les trois comportements (voir plus bas)
assets/photos/      les onze photographies de la maison

favicon.svg         l'icône de l'onglet
robots.txt          ce que les moteurs de recherche ont le droit de lire
sitemap.xml         la liste des pages, pour Google
```

### Les textes, les prix, les plats

Ils sont écrits **directement dans les pages HTML**. Pour changer le prix d'un
sandwich, on ouvre `la-carte.html` et on change le chiffre. Pas de détour.

Deux informations sont répétées d'une page à l'autre — le numéro de téléphone et
l'adresse, présents dans l'en-tête et le pied de page. Si elles changent, il faut
faire la modification dans les six pages (une recherche-remplacement suffit).

La revue de presse se trouve dans `la-maison.html`, section « On en a parlé ».
Chaque article est une ligne : le média, le titre entre guillemets, la date et
le lien. Pour en ajouter un, on recopie une ligne existante. **Ne mettre une date
que si elle est vérifiée** — deux des quatre articles n'en portent pas, c'est
volontaire (voir `RECHERCHE-CLIENT.md`, section Réputation).

### Les feuilles de style

| Ce que vous voulez changer | Le fichier |
|---|---|
| Les couleurs, les tailles de texte, les espacements | `assets/css/base.css` |
| Les styles de titres et de paragraphes | `assets/css/typo.css` |
| La grille, les marges, les petites classes utilitaires | `assets/css/mise-en-page.css` |
| Les boutons, les champs, l'accordéon, le badge d'ouverture | `assets/css/composants.css` |
| Les photos, le bandeau défilant, les dessins | `assets/css/medias.css` |
| La navigation, le hero, la broche, la carte, le pied de page | `assets/css/sections.css` |
| La version imprimée de la carte | `assets/css/impression.css` |

Les couleurs sont déclarées **une seule fois**, en haut de `base.css`. Les trois
surfaces (`.surface-fond`, `.surface-profond`, `.surface-creme`) redéfinissent
ensuite les couleurs de texte, de filet et d'accent : poser la bonne classe sur une
section suffit, tout ce qu'elle contient se recolore seul.

### Le JavaScript

| Fichier | Ce qu'il fait |
|---|---|
| `assets/js/site.js` | le badge « Ouvert / Fermé », le menu sur téléphone, l'apparition des blocs au défilement |
| `assets/js/carte.js` | le panneau de détail d'un plat, et l'impression de la carte |
| `assets/js/traiteur.js` | l'accordéon des questions et le formulaire de devis |

**Sans JavaScript, tout le contenu du site reste visible et tous les liens marchent.**

### Les photos

Les onze photographies sont dans `assets/photos/`. Chaque `<img>` porte une
description dans son attribut `alt` : elle décrit ce qu'on voit réellement, pour les
lecteurs d'écran et pour Google.

**Aucune photo ne nomme les personnes qu'elle montre.** Les légendes décrivent la
scène (« la lame, à la commande »), pas les visages : écrire « Hüseyin » sous la
mauvaise personne serait une erreur sur de vraies gens. Dès que la maison confirme
qui est qui, les prénoms peuvent revenir sous les portraits de `la-maison.html`.

Ce qui manque encore :

- **Des photos de vraies prestations traiteur.** La galerie de la page Traiteur
  montre pour l'instant des images du comptoir, et le dit.
- **Une photo large en haute définition** de la devanture (au moins 2 400 px de
  large). Les photos actuelles font au mieux 1 125 px : elles sont superbes dans
  une colonne, mais elles deviennent floues dès qu'on les met en fond d'écran.
  C'est la seule chose qui empêche aujourd'hui un hero en pleine image.

### Brancher le formulaire de devis

Un site en pages HTML n'a pas de serveur : il ne peut pas envoyer un courriel tout
seul. Il faut lui donner l'adresse d'un service qui s'en charge — **Formspree**,
**Web3Forms** ou **Basin**, cinq minutes d'inscription, gratuit pour ce volume.

Ouvrir `assets/js/traiteur.js` et coller l'adresse obtenue à la première ligne :

```js
var ENDPOINT_DEVIS = "https://formspree.io/f/xxxxxxxx";
```

C'est tout. Tant que la ligne est vide, le formulaire vérifie quand même la saisie,
puis affiche honnêtement « l'envoi n'est pas encore branché, appelez-nous » — il ne
prétend jamais avoir envoyé quelque chose qui n'est pas parti.

---

## Comment c'est construit

- **HTML, CSS et JavaScript**, rien d'autre. Pas de framework, pas de compilation.
- **Deux polices**, Tanker (titres) et Erode (texte), toutes deux auto-hébergées
  dans `assets/fonts/` sous licence libre FFL. Le site ne fait aucune requête vers
  un serveur tiers : pas de Google Fonts, rien à charger ailleurs.
- **Zéro image d'icône** : les dessins au trait sont des SVG écrits à la main,
  directement dans les pages. Quatorze linogravures, plus **la broche** — le seul
  dessin qui porte un aplat, parce que le chapeau d'un döner n'est pas un contour,
  c'est une masse. La broche sert en grand, sur « La maison » et la page 404 ; aux
  petites tailles — le tampon, la carte des formules — c'est la version simple au
  trait qui prend le relais, les seize couches de viande devenant illisibles
  sous 100 px.
- **Trois surfaces** (`vert`, `vert profond`, `crème`) qui portent toutes les couleurs.

### Cinq gestes de mise en page

Ils viennent d'une référence partagée par le client (defoodtruckclub.nl). On n'a
gardé que les gestes : la palette, les polices et les coins vifs de la DA sont
inchangés.

1. **Le mot accentué** — un seul mot en braise dans un titre, jamais deux titres
   accentués qui se suivent. Classe `.mot-accent`.
2. **Le titre qui mord sur la photo** — sur l'accueil, chaque ligne du grand titre
   porte son propre aplat vert et découpe un bloc dans la photographie.
3. **Le tampon** — un cachet d'encre circulaire posé de travers, à cheval sur un
   bord de section. Une seule occurrence par page, jamais sur la carte (elle
   s'imprime). Sa couleur est la braise pleine, pour tenir sur le vert comme sur
   la crème. Classe `.tampon`.
4. **Les formules en billet** — filet plein à l'extérieur, perforation pointillée
   à l'intérieur, et le prix posé sur sa propre perforation.
5. **L'empilement** — sur l'accueil, quatre sections glissent l'une par-dessus
   l'autre au défilement. Classe `.pile`, désactivée si le visiteur a demandé à
   réduire les animations.

### Détails qui comptent

- **Le badge « Ouvert / Fermé »** est calculé sur le fuseau `Europe/Zurich`, pas sur
  l'heure du visiteur — un visiteur à l'étranger voit le bon statut.
- **La carte s'imprime sur une seule feuille A4**, en trois colonnes, sans la
  navigation ni le pied de page — les vingt-quatre plats tiennent sur le recto.
  Le site est vert foncé à l'écran mais repasse en **noir sur blanc à l'impression** —
  marges de la feuille comprises. Le bouton « Imprimer la carte » ouvre la boîte
  d'impression du navigateur, d'où l'on peut aussi enregistrer en PDF.
- **Le mouvement se coupe** si le visiteur a demandé à réduire les animations, et
  aucune information n'est perdue : la broche passe en mode fixe avec ses cinq
  annotations affichées ensemble.

---

## À valider avec la maison avant la mise en ligne

Ces points sont signalés dans le site (mention « à valider ») ou dans les commentaires
du code. La liste détaillée est en fin de `RECHERCHE-CLIENT.md`.

- [ ] Les **prix** de la carte — relevés sur le tableau noir des photos, donc plausibles, mais lus sur une image : à confirmer de vive voix
- [ ] Le **service traiteur événementiel** — sur leur tableau, « traiteur » désigne le comptoir de mezze. Toute la page Traiteur repose sur l'hypothèse que la prestation en réception existe bel et bien
- [ ] **Qui est qui** sur les photographies, pour remettre les prénoms sous les portraits
- [ ] Les **horaires** exacts et les jours de fermeture (dans les six pages, et dans `assets/js/site.js` pour le calcul du badge)
- [ ] Le **numéro de téléphone** — deux numéros différents circulent en ligne
- [ ] Les **chiffres de la broche** : 24 heures de marinade, 14 épices dont 6 de Gaziantep
- [ ] Le nom du **boucher** et la nature du partenariat
- [ ] Le détail réel de l'**offre traiteur** : formats, capacités, délais, rayon, prix
- [ ] Les **distinctions de presse** : quel média, quelle année, quel classement
- [ ] L'accord des **personnes photographiées**
- [ ] Le **nom de domaine** définitif (adresses `canonical` en haut de chaque page, `sitemap.xml`, `robots.txt`)
