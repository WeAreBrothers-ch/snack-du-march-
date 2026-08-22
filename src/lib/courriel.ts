import "server-only";

import { LIBELLES_FORMULES, type DemandeDevis } from "./devis";
import { MAISON } from "./infos";

export type ResultatEnvoi =
  | { readonly ok: true }
  | { readonly ok: false; readonly raison: "non-configure" | "echec" };

function corpsDuMessage(demande: DemandeDevis): string {
  return [
    "Nouvelle demande de devis traiteur",
    "",
    `Nom          : ${demande.nom}`,
    `Téléphone    : ${demande.telephone}`,
    `Courriel     : ${demande.courriel === "" ? "non renseigné" : demande.courriel}`,
    `Date         : ${demande.date}`,
    `Personnes    : ${demande.personnes}`,
    `Lieu         : ${demande.lieu}`,
    `Formule      : ${LIBELLES_FORMULES[demande.formule]}`,
    "",
    "Message :",
    demande.message === "" ? "(aucun)" : demande.message,
    "",
    `— Envoyé depuis le site ${MAISON.nom}`,
  ].join("\n");
}

/**
 * Envoi de la demande par courriel.
 *
 * L'expéditeur est branché par variables d'environnement, de sorte qu'aucune
 * clé ne se trouve dans le dépôt ni côté client. Tant que la configuration
 * n'est pas faite, la fonction le dit explicitement : le formulaire ne
 * prétend jamais avoir envoyé quelque chose qui n'est pas parti.
 *
 * Variables attendues (voir .env.example) :
 *   RESEND_API_KEY        clé d'API Resend
 *   COURRIEL_DESTINATION  adresse de la maison
 *   COURRIEL_EXPEDITEUR   adresse d'envoi vérifiée sur le domaine
 */
export async function envoyerDemandeDevis(
  demande: DemandeDevis,
): Promise<ResultatEnvoi> {
  const cle = process.env.RESEND_API_KEY;
  const destination = process.env.COURRIEL_DESTINATION;
  const expediteur = process.env.COURRIEL_EXPEDITEUR;

  if (!cle || !destination || !expediteur) {
    return { ok: false, raison: "non-configure" };
  }

  try {
    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cle}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: expediteur,
        to: [destination],
        reply_to: demande.courriel === "" ? undefined : demande.courriel,
        subject: `Devis traiteur — ${demande.nom}, ${demande.personnes} pers., ${demande.date}`,
        text: corpsDuMessage(demande),
      }),
    });

    return reponse.ok ? { ok: true } : { ok: false, raison: "echec" };
  } catch {
    return { ok: false, raison: "echec" };
  }
}
