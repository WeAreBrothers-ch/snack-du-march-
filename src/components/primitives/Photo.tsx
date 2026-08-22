import Image from "next/image";
import { Linogravure } from "@/components/illustrations";
import type { CleIllustration } from "@/lib/types";

export type RegistrePhoto = "documentaire" | "piece";

interface ProprietesPhoto {
  /** Ratio CSS, ex. « 4 / 5 ». Toujours déclaré : c'est ce qui garantit CLS = 0. */
  readonly ratio: string;
  /** Ce qu'il y a — ou ce qu'il y aura — sur l'image. Sert d'alt et de brief photo. */
  readonly sujet: string;
  readonly illustration: CleIllustration;
  readonly registre?: RegistrePhoto;
  /** Chemin de l'image réelle. Tant qu'il est absent, la zone d'attente s'affiche. */
  readonly src?: string;
  readonly sizes?: string;
  readonly prioritaire?: boolean;
  /** `object-position` : où ancrer le recadrage. Par défaut, le centre. */
  readonly ancrage?: string;
  readonly className?: string;
}

/**
 * Emplacement photographique.
 *
 * Sans `src`, il rend une zone d'attente dessinée dans la langue du site —
 * papier teinté, trame de copeaux, linogravure du sujet, brief de shooting —
 * et non un carré gris. Le jour du shooting, on ajoute `src` : rien d'autre ne change.
 */
export function Photo({
  ratio,
  sujet,
  illustration,
  registre = "piece",
  src,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  prioritaire = false,
  ancrage = "center",
  className = "",
}: ProprietesPhoto) {
  if (src === undefined) {
    return (
      <figure className={`photo-vide ${className}`.trim()} style={{ aspectRatio: ratio }}>
        <span className="photo-vide__trame trame-copeau" aria-hidden="true" />
        <span className="photo-vide__centre">
          <Linogravure
            cle={illustration}
            className="h-auto max-h-full w-[42%] max-w-[160px] text-texte opacity-60"
          />
        </span>
        <figcaption className="photo-vide__legende micro">Photo à venir — {sujet}</figcaption>
      </figure>
    );
  }

  const classeRegistre = registre === "documentaire" ? "photo-doc" : "photo-piece";

  return (
    <div
      className={`cadre-media relative ${classeRegistre} ${className}`.trim()}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={sujet}
        fill
        sizes={sizes}
        priority={prioritaire}
        className="object-cover"
        style={{ objectPosition: ancrage }}
      />
    </div>
  );
}
