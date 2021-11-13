// on récupère les données présentes dans le localStorage //
let knapFinalChoice =  JSON.parse(localStorage.getItem('article'));
console.log(knapFinalChoice);

const knapBasket = document.getElementsByClassName("cart");
console.log(knapBasket);
// affichage des produits enregistrés dans le localStorage //

// on parcourt la variable pour afficher les éléments //
if(knapFinalChoice === null || knapFinalChoice == 0) {
  alert("votre panier est vide / retourner à l'accueil pour faire votre selection")
} else {
  let contenuPanier = [];
  for (let k = 0; k < knapFinalChoice.length; k++) {
    contenuPanier +=  
    `<article class="cart__item" data-id="${knapFinalChoice[k].id}">
    <div class="cart__item__img">
      <img src="${knapFinalChoice[k].image}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>"${knapFinalChoice[k].name}"</h2>
        <p>"${knapFinalChoice[k].color}"</p>
        <p>prix : "${knapFinalChoice[k].price}" "€"</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${knapFinalChoice[k].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

  if (k == knapFinalChoice.length) {
  knapBasket.innerHtml = contenuPanier;
  }}
}

// insertion d'un bouton supprimer l'article //

let btnSupArticle = document.querySelectorAll(".deleteItem");
for (let k = 0; k < btnSupArticle.length; k++) {
  btnSupArticle[k] = addEventListener("click", (event) => {
    event.preventDefault();
    let idArticleDelete = knapFinalChoice[k].id;
    knapFinalChoice = knapFinalChoice.filter(index => index.id != idArticleDelete);

    // cette variable mise à jour revient modifier le localStorage //
    localStorage.setItem("article", JSON.stringify(knapFinalChoice));
    alert("le produit a bien été supprimé du panier");
    window.location.href("panier.html");
  });
}
// montant total des produits dans le panier //
let knapPrixTotal = [];
for (let p = 0; p < knapFinalChoice.length; p++) {
  let knapPriceInBasket = knapFinalChoice[p].price;
  knapPrixTotal.push(knapPriceInBasket);
  console.log(knapPrixTotal);
}

// Calcul de la somme de tous les prix récupérés dans le tableau //
const reducer = (somme, valeur) => somme + valeur;
const prixFinal = knapPrixTotal.reduce(reducer, 0);

let totalToDisplay = document.getElementById("totalPrice");
totalToDisplay.insertAdjacentHTML("beforeend", "<div>Le prix total est de ${prixFinal} €</div>");



// fonction opérant le calcul par article identique dans le panier //
function totalAmount() {
    let knapInBasket = [];
    for (article of knapFinalChoice) {
        let relatedAmount = parseInt(article.price) * parseInt(article.quantity);
        knapInBasket.push(relatedAmount);
    }
}
totalAmount();
function removeKnap() {
    let articleOut = document.getElementsByClassName("deleteItem");
    for (let i = 0; i < articleOut.length; i++) {
        articleOut[i].addEventListener('click', (event) => {
        event.preventDefault();
    })
} 
}


