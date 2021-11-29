// on récupère le numéro de commande dans le localStorage //
const bonCommande = localStorage.getItem("orderId");
bonCommande = document.getElementById("orderId").innerHTML;

localStorage.removeItem("article");
localStorage.removeItem("contact");