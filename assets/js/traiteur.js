/**
 * La page traiteur : l'accordéon des questions et le formulaire de devis.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POUR RECEVOIR LES DEMANDES PAR COURRIEL
 *  Un site en pages HTML n'a pas de serveur : il ne peut pas envoyer un
 *  courriel tout seul. Il faut lui donner l'adresse d'un service qui s'en
 *  charge (Formspree, Web3Forms, Basin… comptez cinq minutes d'inscription).
 *  Collez l'adresse obtenue entre les guillemets ci-dessous, et c'est tout :
 *  le formulaire enverra les demandes sans qu'on touche à autre chose.
 *
 *  Tant que la ligne est vide, le formulaire ne ment jamais : il vérifie la
 *  saisie, puis affiche « appelez-nous » au lieu de prétendre avoir envoyé.
 * ─────────────────────────────────────────────────────────────────────────
 */
var ENDPOINT_DEVIS = "";

(function () {
  "use strict";

  var TELEPHONE_AFFICHE = "079 243 11 13";
  var RENVOI = "Appelez-nous au " + TELEPHONE_AFFICHE + ", c'est plus rapide.";

  /* ══ L'accordéon des questions ════════════════════════════════════════
     L'ouverture se fait en grid-template-rows, jamais en height : la
     hauteur du texte n'a pas besoin d'être connue à l'avance. */

  function installerAccordeon() {
    var entrees = document.querySelectorAll(".accordeon");

    for (var i = 0; i < entrees.length; i += 1) {
      (function (entree) {
        var bouton = entree.querySelector(".accordeon__bouton");
        var signe = entree.querySelector(".accordeon__signe");
        if (bouton === null) return;

        bouton.addEventListener("click", function () {
          var ouvert = entree.getAttribute("data-ouvert") === "true";
          fermerToutes(entrees);
          if (!ouvert) {
            entree.setAttribute("data-ouvert", "true");
            bouton.setAttribute("aria-expanded", "true");
            if (signe !== null) signe.textContent = "–";
          }
        });
      })(entrees[i]);
    }
  }

  function fermerToutes(entrees) {
    for (var i = 0; i < entrees.length; i += 1) {
      entrees[i].setAttribute("data-ouvert", "false");
      var bouton = entrees[i].querySelector(".accordeon__bouton");
      var signe = entrees[i].querySelector(".accordeon__signe");
      if (bouton !== null) bouton.setAttribute("aria-expanded", "false");
      if (signe !== null) signe.textContent = "+";
    }
  }

  /* ══ Le formulaire de devis ═══════════════════════════════════════════ */

  /**
   * Contrôle une demande. Rend un objet { champ: message } — vide si tout va
   * bien. Les règles sont les mêmes que celles qu'on appliquerait côté
   * serveur : une seule source de vérité, écrite une fois.
   */
  function verifier(donnees) {
    var erreurs = {};

    if (donnees.nom.length < 2) erreurs.nom = "Indiquez votre nom.";
    else if (donnees.nom.length > 120) erreurs.nom = "Ce nom est trop long.";

    if (donnees.telephone.length < 6) {
      erreurs.telephone = "Indiquez un numéro où vous joindre.";
    } else if (!/^[+0-9 ().\-/]{6,30}$/.test(donnees.telephone)) {
      erreurs.telephone = "Ce numéro ne semble pas valide.";
    }

    if (donnees.courriel !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(donnees.courriel)) {
      erreurs.courriel = "Cette adresse ne semble pas valide.";
    }

    if (donnees.date === "") erreurs.date = "Indiquez la date de votre événement.";

    var personnes = Number(donnees.personnes);
    if (donnees.personnes === "" || isNaN(personnes)) {
      erreurs.personnes = "Indiquez le nombre de personnes.";
    } else if (personnes !== Math.trunc(personnes)) {
      erreurs.personnes = "Indiquez un nombre entier.";
    } else if (personnes < 1) {
      erreurs.personnes = "Indiquez le nombre de personnes.";
    } else if (personnes > 2000) {
      erreurs.personnes = "Au-delà de deux mille, appelez-nous directement.";
    }

    if (donnees.lieu.length < 2) erreurs.lieu = "Indiquez le lieu.";
    else if (donnees.lieu.length > 160) erreurs.lieu = "Ce lieu est trop long.";

    if (donnees.message.length > 2000) {
      erreurs.message = "Ce message est trop long.";
    }

    return erreurs;
  }

  function lire(formulaire) {
    var valeur = function (nom) {
      var champ = formulaire.elements[nom];
      return champ === undefined || champ === null ? "" : String(champ.value).trim();
    };

    return {
      nom: valeur("nom"),
      telephone: valeur("telephone"),
      courriel: valeur("courriel"),
      date: valeur("date"),
      personnes: valeur("personnes"),
      lieu: valeur("lieu"),
      formule: valeur("formule"),
      message: valeur("message"),
      siteWeb: valeur("siteWeb"),
    };
  }

  function afficherErreurs(formulaire, erreurs) {
    var zones = formulaire.querySelectorAll("[data-erreur]");
    var premier = null;

    for (var i = 0; i < zones.length; i += 1) {
      var nom = zones[i].getAttribute("data-erreur");
      var message = erreurs[nom];
      var champ = formulaire.elements[nom];

      zones[i].textContent = message || "";
      zones[i].hidden = !message;

      if (champ !== undefined && champ !== null && champ.setAttribute) {
        if (message) {
          champ.setAttribute("aria-invalid", "true");
          champ.setAttribute("aria-describedby", nom + "-erreur");
          if (premier === null) premier = champ;
        } else {
          champ.removeAttribute("aria-invalid");
          champ.removeAttribute("aria-describedby");
        }
      }
    }

    if (premier !== null) premier.focus();
  }

  function installerFormulaire() {
    var formulaire = document.querySelector("[data-devis]");
    if (formulaire === null) return;

    var message = document.querySelector("[data-devis-message]");
    var succes = document.querySelector("[data-devis-succes]");
    var bouton = formulaire.querySelector('button[type="submit"]');

    var dire = function (texte) {
      if (message === null) return;
      message.textContent = texte;
      message.hidden = texte === "";
    };

    var reussir = function (texte) {
      formulaire.hidden = true;
      if (succes === null) return;
      succes.textContent = texte;
      succes.hidden = false;
      succes.focus && succes.focus();
    };

    formulaire.addEventListener("submit", function (evenement) {
      evenement.preventDefault();
      dire("");

      var donnees = lire(formulaire);

      // Champ piège : un robot l'a rempli. On ne dit rien, on n'envoie rien.
      if (donnees.siteWeb !== "") {
        reussir("Merci, on vous répond sous 24 heures.");
        return;
      }

      var erreurs = verifier(donnees);
      afficherErreurs(formulaire, erreurs);
      for (var cle in erreurs) {
        if (Object.prototype.hasOwnProperty.call(erreurs, cle)) return;
      }

      if (ENDPOINT_DEVIS === "") {
        dire("L'envoi automatique n'est pas encore branché sur ce site. " + RENVOI);
        return;
      }

      envoyer(formulaire, donnees, bouton, dire, reussir);
    });
  }

  function envoyer(formulaire, donnees, bouton, dire, reussir) {
    if (bouton !== null) {
      bouton.disabled = true;
      bouton.textContent = "Envoi…";
    }

    var rendreLeBouton = function () {
      if (bouton === null) return;
      bouton.disabled = false;
      bouton.textContent = "Envoyer la demande";
    };

    var corps = new FormData();
    corps.append("Nom", donnees.nom);
    corps.append("Téléphone", donnees.telephone);
    corps.append("Courriel", donnees.courriel === "" ? "non renseigné" : donnees.courriel);
    corps.append("Date", donnees.date);
    corps.append("Personnes", donnees.personnes);
    corps.append("Lieu", donnees.lieu);
    corps.append("Formule", donnees.formule);
    corps.append("Message", donnees.message === "" ? "(aucun)" : donnees.message);

    fetch(ENDPOINT_DEVIS, {
      method: "POST",
      body: corps,
      headers: { Accept: "application/json" },
    })
      .then(function (reponse) {
        if (reponse.ok) {
          reussir("C'est parti. On vous répond sous 24 heures.");
        } else {
          rendreLeBouton();
          dire("L'envoi n'a pas abouti. " + RENVOI);
        }
      })
      .catch(function () {
        rendreLeBouton();
        dire("L'envoi n'a pas abouti. " + RENVOI);
      });
  }

  function demarrer() {
    installerAccordeon();
    installerFormulaire();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
