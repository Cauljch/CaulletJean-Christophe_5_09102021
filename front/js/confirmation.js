// on récupère le numéro de commande dans le localStorage //
const bonCommande = localStorage.getItem("orderId");
bonCommande = document.getElementById("orderId").innerHTML;

localStorage.removeItem("article");
localStorage.removeItem("contact");

// mettre un blocage sur la quantité ajoutée ds la page produit lorsque nulle //
