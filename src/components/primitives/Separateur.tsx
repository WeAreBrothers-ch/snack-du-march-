import { Octogramme } from "@/components/illustrations";

/**
 * Filet pleine largeur avec l'octogramme centré dessus.
 * Une seule occurrence par section — c'est la règle §6.3.
 */
export function Separateur() {
  return (
    <div
      role="presentation"
      className="relative grid place-items-center"
      style={{ marginBlock: "var(--section-y)" }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: "var(--color-trait)" }}
      />
      <span
        className="relative px-4 text-accent"
        style={{ background: "var(--sur-inverse)" }}
      >
        <Octogramme className="h-[22px] w-[22px]" />
      </span>
    </div>
  );
}
