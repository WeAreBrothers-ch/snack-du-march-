/**
 * La carte : le panneau plein écran d'un plat, et l'impression A4.
 *
 * Chaque panneau est déjà écrit dans la page, simplement masqué. On ne
 * construit rien en JavaScript : le contenu de la carte reste lisible par
 * Google et par un navigateur sans script.
 */
(function () {
  "use strict";

  function demarrer() {
    installerPanneaux();
    installerImpression();
  }

  function installerPanneaux() {
    var declencheurs = document.querySelectorAll("[data-plat]");
    if (declencheurs.length === 0) return;

    var ouvert = null;
    var declencheurActif = null;

    var fermer = function () {
      if (ouvert === null) return;
      ouvert.hidden = true;
      document.body.style.overflow = "";
      if (declencheurActif !== null) declencheurActif.focus();
      ouvert = null;
      declencheurActif = null;
    };

    var ouvrir = function (panneau, declencheur) {
      fermer();
      panneau.hidden = false;
      document.body.style.overflow = "hidden";
      ouvert = panneau;
      declencheurActif = declencheur;

      var bouton = panneau.querySelector("[data-fermer-panneau]");
      if (bouton !== null) bouton.focus();
    };

    for (var i = 0; i < declencheurs.length; i += 1) {
      (function (declencheur) {
        var panneau = document.getElementById(
          "panneau-" + declencheur.getAttribute("data-plat")
        );
        if (panneau === null) return;

        declencheur.addEventListener("click", function () {
          ouvrir(panneau, declencheur);
        });

        var bouton = panneau.querySelector("[data-fermer-panneau]");
        if (bouton !== null) bouton.addEventListener("click", fermer);
      })(declencheurs[i]);
    }

    document.addEventListener("keydown", function (evenement) {
      if (evenement.key === "Escape") fermer();
    });
  }

  function installerImpression() {
    var bouton = document.querySelector("[data-imprimer]");
    if (bouton === null) return;
    bouton.addEventListener("click", function () {
      window.print();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
