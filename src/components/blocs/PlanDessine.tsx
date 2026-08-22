/**
 * Le plan du quartier, dessiné au trait. Pas de carte Google intégrée :
 * elle est grise, lourde, et elle casse la page (§8.5, interdit n°16).
 */
export function PlanDessine({ className = "" }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-label="Plan du quartier de la Riponne : le Snack du Marché se trouve rue Pré-du-Marché 3, deux minutes à pied au nord de la place de la Riponne."
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      >
        <path d="M18 196h284" />
        <path d="M40 12v212" />
        <path d="M118 12v212" />
        <path d="M18 118h284" />
        <path d="M118 66h184" />
        <path d="M196 12v212" />
        <path d="M40 66 118 118" />
      </g>

      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="128" y="128" width="58" height="56" opacity="0.5" />
      </g>

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 66h78" />
      </g>

      <circle cx="86" cy="66" r="7" fill="currentColor" stroke="none" />
      <circle cx="86" cy="66" r="14" fill="none" stroke="currentColor" strokeWidth="1.2" />

      <g
        fill="currentColor"
        fontSize="9"
        letterSpacing="1.6"
        style={{ textTransform: "uppercase" }}
      >
        <text x="46" y="60">
          Rue Pré-du-Marché
        </text>
        <text x="134" y="160">
          Place de la Riponne
        </text>
        <text x="204" y="112" opacity="0.6">
          Rue Haldimand
        </text>
        <text x="24" y="212" opacity="0.6">
          Métro m2 — Riponne
        </text>
      </g>
    </svg>
  );
}
