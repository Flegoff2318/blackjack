function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var banque;
var joueur;
var newcard;
var idnewcardj = 0;
var idnewcardb = 0;
var compteJoueur;
var compteBanque;
var joueurInitial;
var banqueInitial;
var lastcard;
var monies = 10000;
var bet = 0;
var pari = 0;

window.onload = function () {
  document.getElementById("moneydisplay").innerHTML =
    "Vous avez " + monies + "$.";
  banque = getRandomInt(1, 52);
  joueur = getRandomInt(1, 52);
  if (joueur % 13 == 0) {
    compteJoueur = 10;
  } else if (joueur % 13 == 11) {
    compteJoueur = 10;
  } else if (joueur % 13 == 12) {
    compteJoueur = 10;
  } else {
    compteJoueur = joueur % 13;
  }
  //BANQUE
  if (banque % 13 == 0) {
    compteBanque = 10;
  } else if (banque % 13 == 11) {
    compteBanque = 10;
  } else if (banque % 13 == 12) {
    compteBanque = 10;
  } else {
    compteBanque = banque % 13;
  }
  if (joueur % 13 == 1) {
    compteJoueur = 11;
    joueurInitial = compteJoueur;
  }
  if (banque % 13 == 1) {
    compteBanque = 11;
    banqueInitial = compteBanque;
  }

  document.getElementById("cBanque").src = "cartes\\images\\" + banque + ".jpg";
  document.getElementById("cJoueur").src = "cartes\\images\\" + joueur + ".jpg";
  document.getElementById("pBanque").innerHTML =
    "La banque a " + compteBanque + ".";
  document.getElementById("pJoueur").innerHTML =
    "Vous avez " + compteJoueur + ". Carte ou reste ?";
};

function tirage() {
  if (document.getElementById("betbutton").disabled == false) {
    document.getElementById("betbutton").disabled = true;
  }

  newcard = getRandomInt(1, 52);
  if (newcard % 13 == 1) {
    lastcard = 1;
  }
  idnewcardj++;
  document.getElementById("divJoueur").innerHTML +=
    "<img id='" +
    idnewcardj +
    "' src='cartes\\images\\" +
    newcard +
    ".jpg' alt='carte du joueur' />";
  if (newcard % 13 == 0) {
    compteJoueur = compteJoueur + 10;
  } else if (newcard % 13 == 11) {
    compteJoueur = compteJoueur + 10;
  } else if (newcard % 13 == 12) {
    compteJoueur = compteJoueur + 10;
  } else if (newcard % 13 == 1) {
    compteJoueur = compteJoueur + 11;
  } else {
    compteJoueur = compteJoueur + (newcard % 13);
  }
  if (joueurInitial == 11 && compteJoueur > 21) {
    joueurInitial = 0;
    compteJoueur = compteJoueur - 10;
  }
  if (lastcard == 1 && compteJoueur > 21) {
    compteJoueur = compteJoueur - 10;
    lastcard = 0;
  }
  if (compteJoueur <= 21) {
    document.getElementById("pJoueur").innerHTML =
      "Vous avez " + compteJoueur + ". Carte ou reste ?";
  } else {
    document.getElementById("card").disabled = true;
    document.getElementById("stay").disabled = true;
    document.getElementById("pJoueur").innerHTML =
      "Perdu, vous avez " + compteJoueur + ". Rejouer ?";
  }
  if (compteJoueur == 21) {
    document.getElementById("card").disabled = true;
    document.getElementById("stay").disabled = true;
    document.getElementById("pJoueur").innerHTML =
      "Vous avez " + compteJoueur + ". <b>BlackJack !</b>";
    if (pari == 1) {
      pari = 0;
      monies = monies + bet * 2;
      document.getElementById("moneydisplay").innerHTML =
        "Vous avez " + monies + "$.";
    }
  }
  return false;
}

function rester() {
  if (document.getElementById("betbutton").disabled == false) {
    document.getElementById("betbutton").disabled = true;
  }
  document.getElementById("card").disabled = true;
  document.getElementById("stay").disabled = true;
  document.getElementById("pJoueur").innerHTML =
    "Vous avez " + compteJoueur + ".";
  while (compteBanque <= compteJoueur) {
    newcard = getRandomInt(1, 52);
    idnewcardb++;
    if (newcard % 13 == 1) {
      lastcard = 1;
    }
    if (newcard % 13 == 0) {
      compteBanque = compteBanque + 10;
    } else if (newcard % 13 == 11) {
      compteBanque = compteBanque + 10;
    } else if (newcard % 13 == 12) {
      compteBanque = compteBanque + 10;
    } else if (newcard % 13 == 1) {
      compteBanque = compteBanque + 11;
    } else {
      compteBanque = compteBanque + (newcard % 13);
    }
    if (lastcard == 1 && compteBanque > 21) {
      compteBanque = compteBanque - 10;
      lastcard = 0;
    }
    document.getElementById("divBanque").innerHTML +=
      "<img id='" +
      idnewcardb +
      "' src='cartes\\images\\" +
      newcard +
      ".jpg' alt='carte de la banque' />";
    if (banqueInitial == 11 && compteBanque > 21) {
      banqueInitial = 0;
      compteBanque = compteBanque - 10;
    }
  }

  if (compteBanque > compteJoueur && compteBanque <= 21) {
    document.getElementById("pBanque").innerHTML =
      "La banque a " + compteBanque + ". Vous avez perdu !";
  }
  if (compteBanque > 21) {
    document.getElementById("pBanque").innerHTML =
      "La banque a " + compteBanque + ". Vous avez gagné !";
    if (pari == 1) {
      pari = 0;
      monies = monies + bet * 2;
      document.getElementById("moneydisplay").innerHTML =
        "Vous avez " + monies + "$.";
    }
  }
  return false;
}
function mise() {
  if (monies - 1000 > -1) {
    bet = bet + 1000;
    pari = 1;
    monies = monies - 1000;
    document.getElementById("moneydisplay").innerHTML =
      "Vous avez " + monies + "$.<br>Vous avez misé <b>" + bet + "</b>$.";
  } else {
    document.getElementById("moneydisplay").innerHTML =
      "Vous n'avez plus assez d'argent. *tousse* <i>Clochard !</i> *tousse*";
  }
  return false;
}

function allin(){
  if(monies>0){
    bet = bet + monies;
    pari = 1;
    monies=0;
    document.getElementById("moneydisplay").innerHTML =
      "Vous avez " + monies + "$.<br>All in ! Vous avez misé <b>" + bet + "</b>$.";
  } else{
    document.getElementById("moneydisplay").innerHTML = "T'es à la rue frérot !";
  }
  return false;
}

function retry() {
  bet = 0;
  compteJoueur = 0;
  compteBanque = 0;
  joueurInitial = 0;
  banqueInitial = 0;
  document.getElementById("stay").disabled = false;
  document.getElementById("card").disabled = false;
  document.getElementById("betbutton").disabled = false;
  document.getElementById("moneydisplay").innerHTML =
    "Vous avez " + monies + "$.";
  banque = getRandomInt(1, 52);
  joueur = getRandomInt(1, 52);
  if (joueur % 13 == 0) {
    compteJoueur = 10;
  } else if (joueur % 13 == 11) {
    compteJoueur = 10;
  } else if (joueur % 13 == 12) {
    compteJoueur = 10;
  } else {
    compteJoueur = joueur % 13;
  }
  //BANQUE
  if (banque % 13 == 0) {
    compteBanque = 10;
  } else if (banque % 13 == 11) {
    compteBanque = 10;
  } else if (banque % 13 == 12) {
    compteBanque = 10;
  } else {
    compteBanque = banque % 13;
  }
  if (joueur % 13 == 1) {
    compteJoueur = 11;
    joueurInitial = compteJoueur;
  }
  if (banque % 13 == 1) {
    compteBanque = 11;
    banqueInitial = compteBanque;
  }

  document.getElementById("divBanque").innerHTML =
    "<img src='cartes\\images\\" + banque + ".jpg' alt='carte de la banque' />";
  document.getElementById("divJoueur").innerHTML =
    "<img src='cartes\\images\\" + joueur + ".jpg' alt='carte du joueur' />";
  document.getElementById("pBanque").innerHTML =
    "La banque a " + compteBanque + ".";
  document.getElementById("pJoueur").innerHTML =
    "Vous avez " + compteJoueur + ". Carte ou reste ?";
}
