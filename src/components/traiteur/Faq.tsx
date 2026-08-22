"use client";

import { useState } from "react";
import { Section } from "@/components/primitives/Section";
import { QUESTIONS } from "@/lib/traiteur";

/** Accordéon à filets. L'ouverture se fait en grid-template-rows, jamais en height. */
export function Faq() {
  const [ouverte, setOuverte] = useState<string | null>(null);

  return (
    <Section fond="profond">
      <div className="grille gap-y-8">
        <h2 className="t-d2 col-span-4 sm:col-span-6 lg:col-span-4">
          Les questions qu&apos;on nous pose
        </h2>

        <ul className="liste-filets col-span-4 border-t border-trait sm:col-span-6 lg:col-span-7 lg:col-start-6">
          {QUESTIONS.map((entree) => {
            const active = ouverte === entree.question;
            const identifiant = entree.question
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            return (
              <li key={entree.question} className="accordeon" data-ouvert={active}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOuverte(active ? null : entree.question)}
                    aria-expanded={active}
                    aria-controls={`reponse-${identifiant}`}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="t-d3">{entree.question}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-display leading-none"
                      style={{
                        color: "var(--color-accent)",
                        fontSize: "var(--fs-d3)",
                        fontVariationSettings: '"wght" 400, "wdth" 100',
                      }}
                    >
                      {active ? "–" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={`reponse-${identifiant}`}
                  role="region"
                  className="accordeon__corps"
                >
                  <div>
                    <p className="t-body pb-6 pr-10 text-doux">{entree.reponse}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
