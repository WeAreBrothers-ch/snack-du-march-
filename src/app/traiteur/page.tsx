import type { Metadata } from "next";
import { Etapes } from "@/components/traiteur/Etapes";
import { Faq } from "@/components/traiteur/Faq";
import { Formules } from "@/components/traiteur/Formules";
import { FormulaireDevis } from "@/components/traiteur/FormulaireDevis";
import { Galerie } from "@/components/traiteur/Galerie";
import { HeroTraiteur } from "@/components/traiteur/HeroTraiteur";
import { Ticker } from "@/components/primitives/Ticker";

export const metadata: Metadata = {
  title: "Traiteur",
  description:
    "Traiteur turc à Lausanne, dès 15 personnes : plateaux de mezze, tables dressées, ou la broche montée et tranchée chez vous. Devis sous 24 heures, Lausanne et 20 km autour.",
  alternates: { canonical: "/traiteur" },
};

const OCCASIONS = [
  "Mariages",
  "Anniversaires",
  "Inaugurations",
  "Repas d'équipe",
  "Assemblées d'association",
  "Fêtes de quartier",
  "Baptêmes",
];

export default function PageTraiteur() {
  return (
    <>
      <HeroTraiteur />
      <Etapes />
      <Formules />
      <Ticker mots={OCCASIONS} />
      <Galerie />
      <FormulaireDevis />
      <Faq />
    </>
  );
}
