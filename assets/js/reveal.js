/**
 * Apparition au défilement. Discrète : une opacité et dix-huit pixels.
 * Si le visiteur a demandé moins d'animations, on ne fait rien du tout.
 */

/** Révèle les blocs marqués `.revele` quand ils entrent dans l'écran. */
export function initReveal() {
  const blocs = document.querySelectorAll(".revele");
  if (blocs.length === 0) return;

  const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduit || typeof IntersectionObserver !== "function") {
    blocs.forEach((bloc) => bloc.classList.add("est-visible"));
    return;
  }

  const observateur = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((entree) => {
        if (!entree.isIntersecting) return;
        entree.target.classList.add("est-visible");
        observateur.unobserve(entree.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );

  blocs.forEach((bloc) => observateur.observe(bloc));
}
