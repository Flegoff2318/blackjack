var sabot = 52;
var nbsabot = 3;
var cartes = nbsabot * cartes; // ici 156 donc 3 cartes de chaque
for (i = 1; i <= cartes; i++) {
  // on veut decompter les cartes tirées des possibilités de tirage futur
}
//APRES COMPTAGE SI AS TIRE
if (lastcard % 13 == 1 && compteJoueur > 21) {
  compteJoueur = compteJoueur - 10;
}

function mise() {
  if (monies - 1000 > 0) {
    document.getElementById("moneydisplay").innerHTML = document.getElementById(
      "moneydisplay"
    ).innerHTML = "Vous avez " + monies + "$.<br>Vous avez misé <b>1000$</b>.";
  }
}
