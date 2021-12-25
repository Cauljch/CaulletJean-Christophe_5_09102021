// on récupère le numéro de commande dans le localStorage //
/*const bonCommande = localStorage.getItem("orderId");
bonCommande = document.getElementById("orderId").innerHTML;*/
let paramId = new URL(window.location.href).searchParams;
let numOrder = paramId.get('id');
bonCommande = document.getElementById("orderId");
bonCommande.innerText = numOrder;

localStorage.removeItem("article");
localStorage.removeItem("contact");

// mettre un blocage sur la quantité ajoutée ds la page produit lorsque nulle //
