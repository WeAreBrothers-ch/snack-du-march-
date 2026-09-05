/**
 * Le bouton « imprimer la carte ». Rien de plus que la boîte de dialogue
 * du navigateur — la mise en page papier est gérée par `impression.css`.
 */

/** Branche les boutons d'impression de la page. */
export function initImpression() {
  const boutons = document.querySelectorAll("[data-imprimer]");
  boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      window.print();
    });
  });
}
