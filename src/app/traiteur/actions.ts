"use server";

import { envoyerDemandeDevis } from "@/lib/courriel";
import { schemaDevis, type EtatDevis } from "@/lib/devis";
import { MAISON } from "@/lib/infos";

const RENVOI_TELEPHONE = `Appelez-nous au ${MAISON.telephoneAffiche}, c'est plus rapide.`;

export async function soumettreDevis(
  _precedent: EtatDevis,
  donnees: FormData,
): Promise<EtatDevis> {
  const analyse = schemaDevis.safeParse(Object.fromEntries(donnees.entries()));

  if (!analyse.success) {
    const champs: Record<string, string> = {};
    for (const probleme of analyse.error.issues) {
      const cle = probleme.path[0];
      if (typeof cle === "string" && champs[cle] === undefined) {
        champs[cle] = probleme.message;
      }
    }
    return { statut: "erreurs", champs };
  }

  // Champ piège : un robot l'a rempli. On ne dit rien, on n'envoie rien.
  if (analyse.data.siteWeb !== "") {
    return { statut: "envoye", message: "Merci, on vous répond sous 24 heures." };
  }

  const resultat = await envoyerDemandeDevis(analyse.data);

  if (resultat.ok) {
    return {
      statut: "envoye",
      message: "C'est parti. On vous répond sous 24 heures.",
    };
  }

  return resultat.raison === "non-configure"
    ? {
        statut: "non-configure",
        message: `L'envoi automatique n'est pas encore branché sur ce site. ${RENVOI_TELEPHONE}`,
      }
    : {
        statut: "echec",
        message: `L'envoi n'a pas abouti. ${RENVOI_TELEPHONE}`,
      };
}
