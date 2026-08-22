import type { Metadata } from "next";
import { AxeGaziantep } from "@/components/maison/AxeGaziantep";
import { CeQuiVientDeLaBas } from "@/components/maison/CeQuiVientDeLaBas";
import { FicheBroche } from "@/components/maison/FicheBroche";
import { Portrait } from "@/components/maison/Portrait";
import { QuatreTemps } from "@/components/maison/QuatreTemps";
import { Bouton } from "@/components/primitives/Bouton";
import { PHOTOS } from "@/lib/photos";
import { Section } from "@/components/primitives/Section";
import { Ticker } from "@/components/primitives/Ticker";

export const metadata: Metadata = {
  title: "La maison",
  description:
    "Ouvert en 1998 par Hüseyin Celik, aujourd'hui tenu avec son fils Sertaç. Une famille de Gaziantep, une broche montée à la main chaque matin, une recette qui n'a pas bougé.",
  alternates: { canonical: "/la-maison" },
};

const ATTRIBUTS = [
  "Gaziantep, ville UNESCO de la gastronomie",
  "Deux générations",
  "Une seule recette",
  "Depuis 1998",
];

export default function PageMaison() {
  return (
    <>
      <Section grilleVisible className="border-b border-trait">
        <p className="kicker">no. 01 — Depuis 1998</p>
        <h1 className="t-d1 mt-8">La maison</h1>
        <p className="t-lead mt-8">
          Hüseyin a ouvert en 1998. Sertaç a grandi derrière le comptoir.{" "}
          <em>La recette n&apos;a pas bougé.</em>
        </p>
      </Section>

      <AxeGaziantep />

      <Portrait
        numero="02"
        prenom="Hüseyin"
        annotation="La lame, à la commande"
        titre="Il a ouvert avec la recette de son père"
        photo={PHOTOS.comptoirDecoupe}
        texte="Il est arrivé de Gaziantep et il a ouvert un comptoir rue Pré-du-Marché. Tout ce qui se vend ici est fait ici : la broche, les mezze, les sauces. Les recettes viennent de la famille, et il n'a jamais voulu les adapter au goût d'ailleurs. Vingt-huit ans plus tard, c'est toujours vrai."
      />

      <Portrait
        numero="03"
        prenom="Sertaç"
        annotation="Le comptoir, sous le tableau"
        titre="Des étudiants d'hier amènent leurs enfants"
        photo={PHOTOS.equipeComptoir}
        inverse
        texte="Il a grandi derrière ce comptoir avant d'y travailler. Il dit que le plus joli compliment qu'on puisse leur faire, ce sont ces gens qui venaient ici en étudiants et qui reviennent aujourd'hui avec leurs propres enfants. C'est la seule mesure de confiance qui l'intéresse."
      />

      <Ticker mots={ATTRIBUTS} />

      <FicheBroche />
      <CeQuiVientDeLaBas />
      <QuatreTemps />

      <Section fond="creme">
        <div className="grille items-end gap-y-8">
          <div className="col-span-4 sm:col-span-6 lg:col-span-7">
            <h2 className="t-d2">La même chose, pour cent cinquante personnes</h2>
            <p className="t-body mt-6" style={{ color: "var(--color-doux)" }}>
              Le travail de la broche ne change pas quand elle sort du comptoir. On la
              monte le matin, on la charge, et on vient la trancher chez vous.
            </p>
          </div>
          <div className="col-span-4 sm:col-span-6 lg:col-span-4 lg:col-start-9 lg:text-right">
            <Bouton href="/traiteur" variante="braise">
              Découvrir le traiteur
            </Bouton>
          </div>
        </div>
      </Section>
    </>
  );
}
