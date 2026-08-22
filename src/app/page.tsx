import { BrocheSignature } from "@/components/broche/BrocheSignature";
import { BlocTraiteur } from "@/components/blocs/BlocTraiteur";
import { EnBref } from "@/components/blocs/EnBref";
import { Hero } from "@/components/blocs/Hero";
import { InfosPratiques } from "@/components/blocs/InfosPratiques";
import { Manifeste } from "@/components/blocs/Manifeste";
import { TroisPieces } from "@/components/blocs/TroisPieces";
import { Ticker } from "@/components/primitives/Ticker";

const ATTRIBUTS = [
  "Broche montée à la main",
  "Veau & agneau",
  "Marinée 24 h",
  "Épices de Gaziantep",
  "Mezze fait maison",
  "Depuis 1998",
];

export default function Accueil() {
  return (
    <>
      <Hero />
      <BrocheSignature />
      <Ticker mots={ATTRIBUTS} />
      <Manifeste />
      <TroisPieces />
      <EnBref />
      <BlocTraiteur />
      <InfosPratiques titre="Ici" />
    </>
  );
}
