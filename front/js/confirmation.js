// on récupère le numéro de commande dans le localStorage //
let paramId = new URL(window.location.href).searchParams;
let numOrder = paramId.get('id');
bonCommande = document.getElementById("orderId");
bonCommande.innerText = numOrder;

localStorage.removeItem("article");
localStorage.removeItem("contact");
