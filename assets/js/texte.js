/**
 * Découpe de texte en lignes masquées : chaque ligne peut alors « monter »
 * depuis le bas comme si elle sortait d'une fente. On garde la trace de
 * chaque découpe pour tout remettre en place quand la mise en page change.
 */

/** @type {Array<{ revert: () => void }>} */
const decoupesActives = [];

/**
 * @param {any} SplitText
 * @param {HTMLElement | HTMLElement[] | string} cible
 * @returns {{ lines: HTMLElement[], revert: () => void }}
 */
export function decouperEnLignes(SplitText, cible) {
  const decoupe = SplitText.create(cible, {
    type: "lines",
    mask: "lines",
    linesClass: "ligne",
    // Par défaut, SplitText remplace les espaces insécables par des espaces
    // ordinaires : « box : » pourrait alors se couper avant les deux-points.
    reduceWhiteSpace: false,
  });
  decoupesActives.push(decoupe);
  return decoupe;
}

/** Rend leur texte d'origine à tous les éléments découpés. */
export function restaurerDecoupes() {
  decoupesActives.splice(0).forEach((decoupe) => {
    try {
      decoupe.revert();
    } catch {
      // Un élément déjà retiré du DOM n'a plus rien à restaurer.
    }
  });
}
