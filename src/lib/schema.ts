/**
 * Données structurées Schema.org.
 * Elles décrivent la maison à Google : type, adresse, horaires, service traiteur.
 */

import { HORAIRES, JOURS_ORDONNES, MAISON, SITE } from "./infos";

const JOUR_SCHEMA: Readonly<Record<string, string>> = {
  lundi: "Monday",
  mardi: "Tuesday",
  mercredi: "Wednesday",
  jeudi: "Thursday",
  vendredi: "Friday",
  samedi: "Saturday",
  dimanche: "Sunday",
};

export function schemaRestaurant(): string {
  const horaires = JOURS_ORDONNES.flatMap((jour) => {
    const plage = HORAIRES[jour];
    const nomAnglais = JOUR_SCHEMA[jour];
    if (plage === null || nomAnglais === undefined) return [];
    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${nomAnglais}`,
        opens: plage.ouverture,
        closes: plage.fermeture,
      },
    ];
  });

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: MAISON.nom,
    description: SITE.description,
    url: SITE.url,
    telephone: MAISON.telephone,
    servesCuisine: ["Turque", "Kebab", "Méditerranéenne"],
    priceRange: "CHF 10–25",
    foundingDate: String(MAISON.fondation),
    address: {
      "@type": "PostalAddress",
      streetAddress: MAISON.adresse.rue,
      postalCode: MAISON.adresse.codePostal,
      addressLocality: MAISON.adresse.ville,
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: MAISON.adresse.latitude,
      longitude: MAISON.adresse.longitude,
    },
    openingHoursSpecification: horaires,
    sameAs: [MAISON.reseaux.instagram, MAISON.reseaux.facebook],
    hasMenu: `${SITE.url}/la-carte`,
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Service traiteur",
        serviceType: "Traiteur",
        description:
          "Plateaux de mezze, tables dressées et broche montée sur place, dès 15 personnes, à Lausanne et dans un rayon de 20 kilomètres.",
        areaServed: { "@type": "City", name: "Lausanne" },
        provider: { "@type": "Restaurant", name: MAISON.nom },
      },
    },
  });
}
