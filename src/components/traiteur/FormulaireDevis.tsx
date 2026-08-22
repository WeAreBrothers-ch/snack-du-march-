"use client";

import { useActionState } from "react";
import { soumettreDevis } from "@/app/traiteur/actions";
import { ETAT_INITIAL, LIBELLES_FORMULES, type EtatDevis } from "@/lib/devis";
import { MAISON } from "@/lib/infos";
import { ChampDevis } from "./ChampDevis";

function erreurDe(etat: EtatDevis, champ: string): string | undefined {
  return etat.statut === "erreurs" ? etat.champs[champ] : undefined;
}

/** Le formulaire de devis. C'est la page qui rapporte de l'argent (§8.4). */
export function FormulaireDevis() {
  const [etat, action, enCours] = useActionState(soumettreDevis, ETAT_INITIAL);
  const envoye = etat.statut === "envoye";

  return (
    <section id="devis" className="surface-creme">
      <div className="shell py-14 lg:py-20">
        <div className="grille gap-y-9">
          <header className="col-span-4 sm:col-span-6 lg:col-span-4">
            <p className="kicker" style={{ color: "var(--color-trait)" }}>
              Le devis
            </p>
            <h2 className="t-d2 mt-5">Dites-nous tout</h2>
            <p className="t-body mt-6" style={{ color: "var(--color-doux)" }}>
              On répond en vingt-quatre heures. Ou appelez, c&apos;est plus rapide :{" "}
              <a href={`tel:${MAISON.telephone}`} className="lien">
                {MAISON.telephoneAffiche}
              </a>
              .
            </p>
          </header>

          <div className="col-span-4 sm:col-span-6 lg:col-span-7 lg:col-start-6">
            {envoye ? (
              <p className="t-lead" role="status">
                {etat.message}
              </p>
            ) : (
              <form action={action} noValidate className="grid gap-8 sm:grid-cols-2">
                <ChampDevis nom="nom" libelle="Votre nom" erreur={erreurDe(etat, "nom")}>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    autoComplete="name"
                    required
                    className="champ"
                    aria-describedby={erreurDe(etat, "nom") ? "nom-erreur" : undefined}
                  />
                </ChampDevis>

                <ChampDevis
                  nom="telephone"
                  libelle="Téléphone"
                  erreur={erreurDe(etat, "telephone")}
                >
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="champ"
                    aria-describedby={
                      erreurDe(etat, "telephone") ? "telephone-erreur" : undefined
                    }
                  />
                </ChampDevis>

                <ChampDevis
                  nom="courriel"
                  libelle="Courriel (facultatif)"
                  erreur={erreurDe(etat, "courriel")}
                >
                  <input
                    id="courriel"
                    name="courriel"
                    type="email"
                    autoComplete="email"
                    className="champ"
                  />
                </ChampDevis>

                <ChampDevis nom="date" libelle="Date" erreur={erreurDe(etat, "date")}>
                  <input id="date" name="date" type="date" required className="champ" />
                </ChampDevis>

                <ChampDevis
                  nom="personnes"
                  libelle="Nombre de personnes"
                  erreur={erreurDe(etat, "personnes")}
                >
                  <input
                    id="personnes"
                    name="personnes"
                    type="number"
                    min={1}
                    max={2000}
                    inputMode="numeric"
                    required
                    className="champ"
                  />
                </ChampDevis>

                <ChampDevis nom="lieu" libelle="Lieu" erreur={erreurDe(etat, "lieu")}>
                  <input id="lieu" name="lieu" type="text" required className="champ" />
                </ChampDevis>

                <ChampDevis
                  nom="formule"
                  libelle="Formule"
                  className="sm:col-span-2"
                  erreur={erreurDe(etat, "formule")}
                >
                  <select id="formule" name="formule" className="champ" defaultValue="je-ne-sais-pas">
                    {Object.entries(LIBELLES_FORMULES).map(([valeur, libelle]) => (
                      <option key={valeur} value={valeur} className="text-texte">
                        {libelle}
                      </option>
                    ))}
                  </select>
                </ChampDevis>

                <ChampDevis
                  nom="message"
                  libelle="Autre chose ?"
                  className="sm:col-span-2"
                  erreur={erreurDe(etat, "message")}
                >
                  <textarea id="message" name="message" rows={4} className="champ" />
                </ChampDevis>

                <div aria-hidden="true" className="hidden">
                  <label htmlFor="siteWeb">Ne rien écrire ici</label>
                  <input id="siteWeb" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" className="btn btn--plein" disabled={enCours}>
                    {enCours ? "Envoi…" : "Envoyer la demande"}
                  </button>

                  {(etat.statut === "non-configure" || etat.statut === "echec") && (
                    <p className="t-small mt-5" role="alert" style={{ color: "var(--color-accent)" }}>
                      {etat.message}
                    </p>
                  )}

                  <p className="micro mt-5" style={{ color: "var(--color-trait)" }}>
                    On garde ces informations le temps de vous répondre, rien de plus.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
