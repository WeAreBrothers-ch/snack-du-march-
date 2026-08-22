import { TRAIT, type ProprietesDessin } from "./socle";

/** 08 — Le piment d'Alep séché. */
export function Piment({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 56 80" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M30 14c8 6 12 16 11 27-1 12-8 24-19 31 6-11 8-20 7-29-1-10-5-19-11-25" />
        <path d="M30 14c-3-4-8-6-13-5 1 5 5 8 9 9" />
        <path d="M30 14V6" />
        <path d="M26 36c3 6 4 13 3 20" />
      </g>
    </svg>
  );
}

/** 09 — La grenade ouverte. */
export function Grenade({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 72 80" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M36 18c-16 0-28 12-28 27s12 27 28 27 28-12 28-27-12-27-28-27Z" />
        <path d="M36 18V8" />
        <path d="M30 12l-5-6M42 12l5-6M36 8l-4-6M36 8l4-6" />
        <path d="M18 40c8-6 28-6 36 0" />
        <circle cx="26" cy="50" r="3" />
        <circle cx="36" cy="55" r="3" />
        <circle cx="46" cy="50" r="3" />
        <circle cx="31" cy="62" r="3" />
        <circle cx="41" cy="62" r="3" />
      </g>
    </svg>
  );
}

/** 10 — La feuille de vigne roulée. */
export function FeuilleDeVigne({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 80 56" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M16 20h44c5 0 9 4 9 8s-4 8-9 8H16c-5 0-9-4-9-8s4-8 9-8Z" />
        <path d="M16 20c4 2 6 5 6 8s-2 6-6 8" />
        <path d="M30 21c3 3 3 11 0 14" />
        <path d="M44 21c3 3 3 11 0 14" />
        <path d="M58 12c6-4 14-4 18 1-4 5-11 6-16 4" />
        <path d="M60 17l8-3" />
      </g>
    </svg>
  );
}

/** 11 — La main ouverte. Le geste, la transmission, le comptoir. */
export function Mains({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 80 96" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M26 58V46c0-3 2-5 5-5s5 2 5 5v10" />
        <path d="M36 56V28c0-3 2-5 5-5s5 2 5 5v26" />
        <path d="M46 54V22c0-3 2-5 5-5s5 2 5 5v30" />
        <path d="M56 56V32c0-3 2-5 5-5s5 2 5 5v22" />
        <path d="M26 58c-4-7-11-10-16-6-3 6 0 13 6 17" />
        <path d="M16 69c2 12 12 21 25 21 14 0 25-10 25-24V52" />
      </g>
    </svg>
  );
}

/** 12 — Le plateau traiteur vu de dessus. */
export function Plateau({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 96 72" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <rect x="6" y="10" width="84" height="52" rx="6" />
        <rect x="12" y="16" width="72" height="40" rx="4" />
        <circle cx="30" cy="28" r="8" />
        <circle cx="30" cy="28" r="4" />
        <circle cx="52" cy="30" r="7" />
        <circle cx="70" cy="26" r="6" />
        <path d="M20 44h56" />
        <path d="M26 48l4-4M36 48l4-4M46 48l4-4M56 48l4-4M66 48l4-4" />
      </g>
    </svg>
  );
}

/** 13 — La cathédrale de Lausanne. Six traits, pas un de plus. */
export function Cathedrale({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 96 72" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M8 66V34l14-10 14 10v32" />
        <path d="M36 66V22l16-14 16 14v44" />
        <path d="M68 66V38l12-8 12 8v28" />
        <circle cx="52" cy="36" r="9" />
        <path d="M52 27v18M43 36h18" />
        <path d="M4 66h88" />
      </g>
    </svg>
  );
}

/** 14 — Le mortier et le pilon. */
export function Mortier({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M12 40h50c0 14-11 25-25 25S12 54 12 40Z" />
        <path d="M8 40h58" />
        <path d="M30 65v6h14v-6" />
        <path d="M26 71h22" />
        <path d="M50 36 66 12c2-3 6-3 8-1s2 6-1 8L52 38" />
        <path d="M44 48c4 3 10 3 14 0" />
      </g>
    </svg>
  );
}
