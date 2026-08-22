import { TRAIT, type ProprietesDessin } from "./socle";

/** 01 — La broche verticale. L'emblème de la maison. */
export function Broche({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 48 104" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M24 4v10" />
        <path d="M24 78v16" />
        <path d="M13 94h22" />
        <path d="M17 94v5" />
        <path d="M31 94v5" />
        <path d="M24 14c-6 3-9 9-9 16 0 9 1 17 2 25 1 9 2 18 7 25 5-7 6-16 7-25 1-8 2-16 2-25 0-7-3-13-9-16Z" />
        <path d="M15.6 30c5 2.6 11.8 2.6 16.8 0" />
        <path d="M15.2 41c5.4 2.8 12.2 2.8 17.6 0" />
        <path d="M15.8 52c5.2 2.8 11.6 2.8 16.4 0" />
        <path d="M17 63c4.4 2.6 9.6 2.6 14 0" />
        <path d="M18.6 74c3.4 2.2 7.4 2.2 10.8 0" />
      </g>
    </svg>
  );
}

/** 02 — Le couteau à döner. */
export function Couteau({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 96 48" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M10 30h50c14 0 24-4 28-9-5-4-14-6-28-6H16c-4 0-6 2-6 5v10Z" />
        <path d="M10 21H4c-2 0-3 1-3 3v5c0 2 1 3 3 3h6" />
        <path d="M16 24h36" />
        <path d="M64 20c4 1 8 2 11 4" />
      </g>
    </svg>
  );
}

/** 03 — Le pain pide entaillé. */
export function Pain({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 80 56" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M40 6C20 6 6 14 6 28s14 22 34 22 34-8 34-22S60 6 40 6Z" />
        <path d="M14 24c8-3 16-4 26-4s18 1 26 4" />
        <path d="M26 18l-6 11" />
        <path d="M40 16l-6 12" />
        <path d="M54 18l-6 11" />
        <path d="M22 38h2M32 41h2M42 41h2M52 38h2" />
      </g>
    </svg>
  );
}

/** 04 — La galette de dürüm roulée. */
export function Durum({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 48 96" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M14 18v62c0 6 4 10 10 10s10-4 10-10V18" />
        <ellipse cx="24" cy="18" rx="10" ry="5" />
        <path d="M19 17c1-2 4-3 6-2" />
        <path d="M8 46c0-14 3-24 8-30" />
        <path d="M8 46l6 4" />
        <path d="M8 46c0 12 2 22 6 28" />
        <path d="M34 60c4-2 6-6 6-11" />
      </g>
    </svg>
  );
}

/** 05 — Le bol de houmous et son sillon d'huile. */
export function Houmous({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <circle cx="36" cy="36" r="30" />
        <circle cx="36" cy="36" r="24" />
        <path d="M36 20c-9 0-15 7-15 15 0 5 3 9 8 9 4 0 6-3 6-6 0-2-2-4-4-4" />
        <circle cx="46" cy="42" r="2.4" />
        <circle cx="40" cy="49" r="2.4" />
        <circle cx="51" cy="34" r="2.4" />
      </g>
    </svg>
  );
}

/** 06 — L'aubergine brûlée sur la flamme. */
export function Aubergine({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 56 80" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M30 26c-11 5-19 16-19 28 0 13 8 22 18 22s18-9 18-22c0-12-6-22-15-27" />
        <path d="M30 26c-1-4-1-8 0-12" />
        <path d="M30 14V6" />
        <path d="M30 22c-6-6-13-8-19-6 2 7 8 12 15 12" />
        <path d="M30 22c5-5 11-7 16-5-2 6-7 10-13 10" />
        <path d="M18 48c2 5 2 11 0 16" />
        <path d="M26 44c2 6 2 13 0 19" />
      </g>
    </svg>
  );
}

/** 07 — La branche de pistachier. La signature de Gaziantep. */
export function Pistachier({ className }: ProprietesDessin) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      <g {...TRAIT}>
        <path d="M12 62C22 52 32 40 40 24" />
        <path d="M22 50c-6-1-10-5-11-11 6-1 11 2 13 7" />
        <path d="M30 38c-6-2-9-7-9-13 6 0 11 4 12 9" />
        <path d="M36 26c-5-3-7-9-6-15 6 2 9 7 9 13" />
        <path d="M40 24c5-4 12-4 17 0-3 6-9 8-15 6" />
        <path d="M46 40c-5-4-6-11-3-16 5 3 7 10 5 15" />
        <path d="M46 40c5 2 11 0 14-4-4-4-11-4-15-1" />
      </g>
    </svg>
  );
}
