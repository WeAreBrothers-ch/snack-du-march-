# Librairies hébergées avec le site

Elles étaient chargées depuis un CDN (jsDelivr) : trois connexions de plus à
ouvrir avant que les animations ne démarrent, et un site qui s'effondre si le
CDN est lent. Elles sont maintenant servies avec le site.

| Fichier | Version | Licence |
|---|---|---|
| `gsap.min.js`, `ScrollTrigger.min.js`, `SplitText.min.js` | GSAP 3.13.0 | [Licence standard « sans frais » de GSAP](https://gsap.com/standard-license) |
| `lenis.min.js` | Lenis 1.3.4 | MIT |

Les polices (`../fonts/`) sont **Archivo** et **DM Sans**, en version variable
(licence SIL OFL), tirées de Fontsource.

Pour mettre à jour une librairie : `npm pack gsap@<version>` (ou `lenis`),
puis copier le fichier `dist/…min.js` ici, et changer la version dans ce
tableau.

Swiper n'est plus utilisé : le carrousel des plats défile nativement
(`scroll-snap`), plus fluide au doigt et sans 160 Ko de JavaScript.
