import { Bouton } from "@/components/primitives/Bouton";
import { Linogravure } from "@/components/illustrations";
import { Section } from "@/components/primitives/Section";

export default function PageIntrouvable() {
  return (
    <Section grilleVisible>
      <div className="grille items-center gap-y-9">
        <div className="col-span-4 sm:col-span-4 lg:col-span-7">
          <p className="kicker">Erreur 404</p>
          <h1 className="t-d1 mt-8">Cette page n&apos;existe pas</h1>
          <p className="t-lead mt-7">
            Elle a peut-être changé d&apos;adresse. La carte, elle, n&apos;a pas bougé.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Bouton href="/">Retour à l&apos;accueil</Bouton>
            <Bouton href="/la-carte" variante="braise">
              Voir la carte
            </Bouton>
          </div>
        </div>
        <div className="col-span-4 flex justify-start sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:justify-end">
          <Linogravure cle="broche" className="h-auto w-24 text-texte opacity-45" />
        </div>
      </div>
    </Section>
  );
}
