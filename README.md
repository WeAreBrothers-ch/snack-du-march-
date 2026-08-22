# Snack du Marché — site web

Site du Snack du Marché, kebab à la broche, Rue Pré-du-Marché 3, 1004 Lausanne.

Trois documents à lire dans cet ordre :

1. **`RECHERCHE-CLIENT.md`** — les faits sur la maison, avec leurs sources et leur niveau de fiabilité.
2. **`DIRECTION-ARTISTIQUE.md`** — la direction artistique complète. C'est la référence : toute décision de design y est déjà tranchée.
3. **ce fichier** — comment faire tourner le site et où modifier quoi.

---

## Faire tourner le site

```bash
npm install
npm run dev     # → http://localhost:3000
```

Pour vérifier que tout est bon avant de mettre en ligne :

```bash
npm run build   # doit finir sans erreur
npm run lint    # doit finir sans erreur
```

## Mettre en ligne

Le site est prêt pour Vercel, sans configuration particulière. Il faut simplement
renseigner les trois variables d'environnement du formulaire de devis (voir plus bas).

---

## Où modifier quoi

Tout le contenu modifiable est rassemblé dans `src/lib/`. Aucun texte de la maison
n'est écrit en dur ailleurs.

| Ce que vous voulez changer | Le fichier |
|---|---|
| Adresse, téléphone, horaires, réseaux sociaux | `src/lib/infos.ts` |
| La carte : plats, descriptions, prix, tags | `src/lib/carte.ts` |
| Le traiteur : formules, étapes, questions fréquentes | `src/lib/traiteur.ts` |
| Les annotations de la broche sur l'accueil | `src/components/broche/donnees.ts` |
| Les couleurs, les tailles de texte, les espacements | `src/app/globals.css` |

### Les photos

Les onze photographies de la maison sont dans `public/photos/`. Elles sont
déclarées une seule fois, dans **`src/lib/photos.ts`**, avec leur description —
qui sert de texte alternatif pour les lecteurs d'écran et pour Google.

Pour remplacer une photo : déposer le nouveau fichier dans `public/photos/` et
changer le chemin dans `src/lib/photos.ts`. Toutes les pages suivent.

Pour en ajouter une : ajouter une entrée dans `PHOTOS`, puis l'utiliser avec
`<Photo ratio="4 / 5" illustration="broche" {...PHOTOS.maNouvellePhoto} />`.
Un emplacement sans photo affiche une zone d'attente dessinée, jamais un trou.

**Aucune photo ne nomme les personnes qu'elle montre.** Les légendes décrivent la
scène (« la lame, à la commande »), pas les visages : écrire « Hüseyin » sous la
mauvaise personne serait une erreur sur de vraies gens. Dès que la maison confirme
qui est qui, les prénoms peuvent revenir dans `src/app/la-maison/page.tsx`.

Ce qui manque encore :

- **Des photos de vraies prestations traiteur.** La galerie de la page Traiteur
  montre pour l'instant des images du comptoir, et le dit.
- **Une photo large en haute définition** de la devanture (au moins 2 400 px de
  large). Les photos actuelles font au mieux 1 125 px : elles sont superbes dans
  une colonne, mais elles deviennent floues dès qu'on les met en fond d'écran.
  C'est la seule chose qui empêche aujourd'hui un hero en pleine image.

### Brancher le formulaire de devis

Tant que les trois variables ci-dessous ne sont pas renseignées, le formulaire le dit
honnêtement au visiteur et le renvoie vers le téléphone — il ne prétend jamais avoir
envoyé quelque chose qui n'est pas parti.

Copier `.env.example` en `.env.local`, puis remplir :

```
RESEND_API_KEY=        # clé d'API du service d'envoi
COURRIEL_DESTINATION=  # l'adresse de la maison, qui reçoit les demandes
COURRIEL_EXPEDITEUR=   # l'adresse d'envoi, vérifiée sur le domaine
```

Ces clés ne sont lues que côté serveur : elles n'apparaissent jamais dans le navigateur.

---

## Comment c'est construit

- **Next.js 16** (App Router) + **React 19** + **TypeScript** strict
- **Tailwind CSS v4**, configuré pour n'exposer *que* les couleurs et les rayons de
  la direction artistique — les valeurs interdites (dégradés, coins arrondis mous,
  ombres portées) sont techniquement impossibles à écrire
- **Trois surfaces** (`vert`, `vert profond`, `crème`) : poser la bonne
  classe sur une section suffit, tout ce qu'elle contient se recolore seul. C'est
  ce qui permet de changer la palette du site sans toucher aux composants —
  les couleurs vivent dans `src/app/styles-surfaces.css`, nulle part ailleurs
- **Deux polices**, auto-hébergées : Bricolage Grotesque (titres) et Instrument Sans (texte)
- **Zéro image d'icône** : les 14 dessins au trait sont des SVG écrits à la main
  (`src/components/illustrations/`)
- **Zod** pour la validation du formulaire, côté serveur

```
src/
  app/            les pages, les feuilles de style, le sitemap
  components/
    chrome/       navigation, pied de page, badge d'ouverture
    primitives/   briques réutilisables (section, bouton, photo, ticker…)
    blocs/        les sections de l'accueil
    broche/       le geste signature
    carte/        la carte et ses panneaux produit
    maison/       les sections de la page « La maison »
    traiteur/     les sections de la page « Traiteur »
    illustrations/ les 14 linogravures
  lib/            le contenu, la logique métier, les types
```

### Détails qui comptent

- **Le badge « Ouvert / Fermé »** est calculé sur le fuseau `Europe/Zurich`, pas sur
  l'heure du visiteur — un visiteur à l'étranger voit le bon statut.
- **La carte s'imprime** en A4, en deux colonnes, sans la navigation ni le pied de page.
  Le site est vert foncé à l'écran mais repasse en **noir sur blanc à l'impression** —
  marges de la feuille comprises. Le bouton « Imprimer la carte » ouvre la boîte
  d'impression du navigateur, d'où l'on peut aussi enregistrer en PDF.
- **Le mouvement se coupe** si le visiteur a demandé à réduire les animations, et
  aucune information n'est perdue : la broche passe en mode fixe avec ses cinq
  annotations affichées ensemble.
- **Sans JavaScript**, tout le contenu reste visible.

---

## À valider avec la maison avant la mise en ligne

Ces points sont signalés dans le site (mention « à valider ») ou dans les commentaires
du code. La liste détaillée est en fin de `RECHERCHE-CLIENT.md`.

- [ ] Les **prix** de la carte — relevés sur le tableau noir des photos, donc plausibles, mais lus sur une image : à confirmer de vive voix
- [ ] Le **service traiteur événementiel** — sur leur tableau, « traiteur » désigne le comptoir de mezze. Toute la page Traiteur repose sur l'hypothèse que la prestation en réception existe bel et bien
- [ ] **Qui est qui** sur les photographies, pour remettre les prénoms sous les portraits
- [ ] Les **horaires** exacts et les jours de fermeture
- [ ] Le **numéro de téléphone** — deux numéros différents circulent en ligne
- [ ] Les **chiffres de la broche** : 24 heures de marinade, 14 épices dont 6 de Gaziantep
- [ ] Le nom du **boucher** et la nature du partenariat
- [ ] Le détail réel de l'**offre traiteur** : formats, capacités, délais, rayon, prix
- [ ] Les **distinctions de presse** : quel média, quelle année, quel classement
- [ ] L'accord des **personnes photographiées**
- [ ] Le **nom de domaine** définitif (`src/lib/infos.ts`, champ `SITE.url`)
