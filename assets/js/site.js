/**
 * Comportements présents sur toutes les pages :
 *   1. le statut « ouvert / fermé », calculé sur l'heure de Lausanne ;
 *   2. le menu de navigation sur téléphone ;
 *   3. la révélation des blocs à l'entrée dans l'écran.
 *
 * Rien ici n'est indispensable à la lecture du site : sans JavaScript,
 * tout le contenu reste visible et tous les liens fonctionnent.
 */
(function () {
  "use strict";

  /* ══ 1. Horaires ══════════════════════════════════════════════════════
     Le calcul se fait toujours sur le fuseau Europe/Zurich, jamais sur
     l'heure du navigateur — sinon un visiteur à l'étranger voit un statut
     faux. Les fonctions sont pures : une date entre, un statut sort. */

  var FUSEAU = "Europe/Zurich";
  var MINUTES_PAR_JOUR = 24 * 60;

  var JOURS = [
    "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi",
  ];

  /** À confirmer auprès de la maison. `null` = fermé toute la journée. */
  var HORAIRES = {
    lundi: { ouverture: "11:00", fermeture: "22:00" },
    mardi: { ouverture: "11:00", fermeture: "22:00" },
    mercredi: { ouverture: "11:00", fermeture: "22:00" },
    jeudi: { ouverture: "11:00", fermeture: "22:00" },
    vendredi: { ouverture: "11:00", fermeture: "22:00" },
    samedi: { ouverture: "11:00", fermeture: "22:00" },
    dimanche: { ouverture: "11:00", fermeture: "22:00" },
  };

  var INDEX_PAR_JOUR_ANGLAIS = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };

  /** « 11:00 » → 660. Rend null si le format est invalide, plutôt que planter. */
  function enMinutes(heure) {
    var trouve = /^(\d{1,2}):(\d{2})$/.exec(String(heure).trim());
    if (trouve === null) return null;
    var heures = Number(trouve[1]);
    var minutes = Number(trouve[2]);
    if (heures > 23 || minutes > 59) return null;
    return heures * 60 + minutes;
  }

  /** « 22:00 » → « 22 h », « 11:30 » → « 11 h 30 ». Usage suisse romand. */
  function formaterHeure(heure) {
    var trouve = /^(\d{1,2}):(\d{2})$/.exec(String(heure).trim());
    if (trouve === null) return heure;
    return trouve[2] === "00"
      ? Number(trouve[1]) + " h"
      : Number(trouve[1]) + " h " + trouve[2];
  }

  /** Position exacte dans la semaine, exprimée dans le fuseau de la maison. */
  function momentLocal(date) {
    try {
      var parties = new Intl.DateTimeFormat("en-US", {
        timeZone: FUSEAU,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(date);

      var lire = function (type) {
        for (var i = 0; i < parties.length; i += 1) {
          if (parties[i].type === type) return parties[i].value;
        }
        return "";
      };

      var indexJour = INDEX_PAR_JOUR_ANGLAIS[lire("weekday")];
      var heures = Number(lire("hour"));
      var minutes = Number(lire("minute"));

      if (indexJour === undefined || isNaN(heures) || isNaN(minutes)) return null;
      return { indexJour: indexJour, minutes: heures * 60 + minutes };
    } catch (erreur) {
      return null;
    }
  }

  function nomDuJour(indexJour) {
    return JOURS[((indexJour % 7) + 7) % 7];
  }

  function plageDuJour(indexJour) {
    return HORAIRES[nomDuJour(indexJour)] || null;
  }

  /** Cherche la prochaine ouverture dans les sept jours qui suivent. */
  function prochaineOuverture(moment) {
    for (var decalage = 0; decalage < 8; decalage += 1) {
      var plage = plageDuJour(moment.indexJour + decalage);
      if (plage === null) continue;
      var ouverture = enMinutes(plage.ouverture);
      if (ouverture === null) continue;
      if (decalage > 0 || ouverture > moment.minutes) {
        return { dansNJours: decalage, heure: plage.ouverture };
      }
    }
    return null;
  }

  /** Statut à un instant donné : { ouvert, libelle }. */
  function statutA(date) {
    var moment = momentLocal(date);
    if (moment === null) {
      return { ouvert: false, libelle: "Ouvert tous les jours de 11 h à 22 h" };
    }

    var plage = plageDuJour(moment.indexJour);
    var ouverture = plage === null ? null : enMinutes(plage.ouverture);
    var fermeture = plage === null ? null : enMinutes(plage.fermeture);

    if (plage !== null && ouverture !== null && fermeture !== null) {
      var finReelle = fermeture > ouverture ? fermeture : fermeture + MINUTES_PAR_JOUR;
      if (moment.minutes >= ouverture && moment.minutes < finReelle) {
        return {
          ouvert: true,
          libelle: "Ouvert · on ferme à " + formaterHeure(plage.fermeture),
        };
      }
    }

    var suivante = prochaineOuverture(moment);
    if (suivante === null) return { ouvert: false, libelle: "Fermé" };

    var heure = formaterHeure(suivante.heure);
    if (suivante.dansNJours === 0) {
      return { ouvert: false, libelle: "Fermé · on ouvre à " + heure };
    }
    if (suivante.dansNJours === 1) {
      return { ouvert: false, libelle: "Fermé · on rouvre demain à " + heure };
    }
    return {
      ouvert: false,
      libelle:
        "Fermé · on rouvre " +
        nomDuJour(moment.indexJour + suivante.dansNJours) +
        " à " +
        heure,
    };
  }

  /** Écrit le statut dans tous les badges de la page. */
  function rafraichirStatut() {
    var statut = statutA(new Date());
    var badges = document.querySelectorAll("[data-statut]");

    for (var i = 0; i < badges.length; i += 1) {
      var libelle = badges[i].querySelector("[data-statut-libelle]");
      if (libelle !== null) libelle.textContent = statut.libelle;
      badges[i].setAttribute("data-ouvert", String(statut.ouvert));
      badges[i].setAttribute("data-pret", "true");
    }
  }

  /** Surligne la ligne du jour dans les tableaux d'horaires. */
  function surlignerAujourdhui() {
    var moment = momentLocal(new Date());
    if (moment === null) return;
    var jour = nomDuJour(moment.indexJour);
    var lignes = document.querySelectorAll("[data-jour]");

    for (var i = 0; i < lignes.length; i += 1) {
      if (lignes[i].getAttribute("data-jour") === jour) {
        lignes[i].classList.add("jour-actif");
      }
    }
  }

  /* ══ 2. Menu de navigation sur téléphone ══════════════════════════════ */

  function installerMenu() {
    var bascule = document.querySelector("[data-menu-bascule]");
    var menu = document.getElementById("menu-mobile");
    if (bascule === null || menu === null) return;

    var ouvrir = function (ouvert) {
      menu.hidden = !ouvert;
      bascule.setAttribute("aria-expanded", String(ouvert));
      bascule.textContent = ouvert ? "Fermer" : "Menu";
      document.body.style.overflow = ouvert ? "hidden" : "";
    };

    bascule.addEventListener("click", function () {
      ouvrir(menu.hidden);
    });

    document.addEventListener("keydown", function (evenement) {
      if (evenement.key === "Escape" && !menu.hidden) ouvrir(false);
    });

    // Le menu est réservé au téléphone : si l'écran s'élargit, on le referme.
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024 && !menu.hidden) ouvrir(false);
    });
  }

  /* ══ 3. Révélation au défilement ══════════════════════════════════════
     opacity + translateY, une seule fois, et jamais de déplacement de la
     mise en page. Le contenu ne doit jamais pouvoir rester invisible :
     d'où les portes de sortie ci-dessous, plus la règle `noscript`. */

  function installerRevelations() {
    var blocs = document.querySelectorAll(".revele");
    if (blocs.length === 0) return;

    var reveler = function (element) {
      element.setAttribute("data-vu", "true");
    };

    // Navigateur sans IntersectionObserver : on montre tout de suite.
    if (typeof IntersectionObserver === "undefined") {
      for (var i = 0; i < blocs.length; i += 1) reveler(blocs[i]);
      return;
    }

    var observateur = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (entree) {
          if (entree.isIntersecting) {
            reveler(entree.target);
            observateur.unobserve(entree.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    for (var j = 0; j < blocs.length; j += 1) {
      // Déjà à l'écran : on n'attend pas un défilement qui n'aura pas lieu.
      if (blocs[j].getBoundingClientRect().top < window.innerHeight * 0.9) {
        reveler(blocs[j]);
      } else {
        observateur.observe(blocs[j]);
      }
    }
  }

  /* ══ Démarrage ════════════════════════════════════════════════════════ */

  function demarrer() {
    rafraichirStatut();
    window.setInterval(rafraichirStatut, 60000);
    surlignerAujourdhui();
    installerMenu();
    installerRevelations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
