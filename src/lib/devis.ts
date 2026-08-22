import { z } from "zod";

/**
 * Schéma d'une demande de devis traiteur.
 * Il vaut à la fois pour la validation côté serveur et pour le typage :
 * une seule source de vérité, donc aucun écart possible entre les deux.
 */
export const schemaDevis = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom.").max(120),
  telephone: z
    .string()
    .trim()
    .min(6, "Indiquez un numéro où vous joindre.")
    .max(30)
    .regex(/^[+0-9 ().\-/]+$/, "Ce numéro ne semble pas valide."),
  courriel: z.union([z.literal(""), z.email("Cette adresse ne semble pas valide.")]),
  date: z.string().trim().min(1, "Indiquez la date de votre événement.").max(40),
  personnes: z.coerce
    .number()
    .int("Indiquez un nombre entier.")
    .min(1, "Indiquez le nombre de personnes.")
    .max(2000, "Au-delà de deux mille, appelez-nous directement."),
  lieu: z.string().trim().min(2, "Indiquez le lieu.").max(160),
  formule: z.enum(["plateau", "table", "broche", "je-ne-sais-pas"]),
  message: z.string().trim().max(2000).optional().default(""),
  /** Champ piège invisible : rempli, c'est un robot. */
  siteWeb: z.string().max(0).optional().default(""),
});

export type DemandeDevis = z.infer<typeof schemaDevis>;

export type EtatDevis =
  | { readonly statut: "repos" }
  | { readonly statut: "erreurs"; readonly champs: Readonly<Record<string, string>> }
  | { readonly statut: "non-configure"; readonly message: string }
  | { readonly statut: "echec"; readonly message: string }
  | { readonly statut: "envoye"; readonly message: string };

export const ETAT_INITIAL: EtatDevis = { statut: "repos" };

export const LIBELLES_FORMULES: Readonly<Record<DemandeDevis["formule"], string>> = {
  plateau: "Le plateau",
  table: "La table",
  broche: "La broche",
  "je-ne-sais-pas": "Je ne sais pas encore",
};
