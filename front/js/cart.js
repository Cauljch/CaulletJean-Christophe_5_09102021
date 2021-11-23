// on récupère les données présentes dans le localStorage //
let knapFinalChoice =  JSON.parse(localStorage.getItem('article'));

const knapBasket = document.getElementById("cartAndFormContainer");
console.log(knapBasket);
// affichage des produits enregistrés dans le localStorage //

// on parcourt la variable pour afficher les éléments //
if(knapFinalChoice === null || knapFinalChoice == 0) {
  alert("votre panier est vide / retourner à l'accueil pour faire votre selection")
} else {
  console.log(knapFinalChoice);
  const contenuPanier = document.getElementById("cart__items")
  for (let k = 0; k < knapFinalChoice.length; k++) {
    contenuPanier.innerHTML += `
    <article class="cart__item" data-id="${knapFinalChoice[k].id}">
      <div class="cart__item__img">
        <img src="${knapFinalChoice[k].image}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${knapFinalChoice[k].name}</h2>
        <p>${knapFinalChoice[k].color}</p>
        <p>prix : ${knapFinalChoice[k].price} €</p>
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
    </article>`;
  console.log(contenuPanier);

  if (k === knapFinalChoice.length) {
  let finalDisplay = document.getElementById("cart__items");
  finalDisplay.innerHTML += contenuPanier;
  }}
}

// déclaration de modification de la quantité par article //
function modifQuantite() {
  let knapQuantite = document.getElementsByName("itemQuantity");
  for (let q = 0; q < knapQuantite.length; q++) {
    knapQuantite[q] = addEventListener("input", (event) => {
      event.preventDefault();
      let newValue = knapQuantite[q].value;
      knapFinalChoice[k].quantity = newValue;
      alert("votre quantité de produit a bien été modifiée")
      window.location.reload;
    })
  }
}

// mise à jour des articles dans le localStorage //
localStorage.setItem("article", JSON.stringify(knapFinalChoice));


// insertion d'un bouton supprimer l'article //
function removeKnap() {
  const btnSupArticle = document.getElementsByClassName("deleteItem");
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
}

// affichage du nombre total d'articles dans le panier //
// on crée un tableau qui récupère toutes les quantités affichées dans le panier //
// puis on fait la somme des valeurs du tableau avec la méthode reduce //
var knapQuantiteFinale = [];
  for (let index = 0; index < knapFinalChoice.length; index++) {
    knapQuantiteFinale = knapQuantiteFinale + knapFinalChoice[index].quantity;
  }

var somme = knapQuantiteFinale.reduce(function (accu, valeur) {
  return accu+valeur;
});
console.log(somme);

// affichage du montant total du panier //
let somme = document.getElementById("totalQuantity");

// fonction opérant le calcul par article identique dans le panier //
function totalAmount() {
  let knapInBasket = [];
  for (article of knapFinalChoice) {
      let relatedAmount = parseInt(article.price) * parseInt(article.quantity);
      knapInBasket.push(relatedAmount);
  }
}
totalAmount();

// montant total des produits dans le panier //
function knapPrixTotal() {
  let priceByKnap = [];
  for (let p = 0; p < knapFinalChoice.length; p++) {
    let knapPriceInBasket = knapFinalChoice[p].price * knapFinalChoice[p].quantity;
    priceByKnap.push(knapPriceInBasket);
  }
}

// Calcul de la somme de tous les prix récupérés dans le tableau priceByKnap //
const reducer = (cumul, prix) => cumul + prix;
const prixFinal = priceByKnap.reduce(reducer, 0);

let totalToDisplay = document.getElementById("totalPrice");
totalToDisplay.insertAdjacentHTML("beforeend", "<div>Le prix total est de ${prixFinal} €</div>");


//Formulaire - mise en place des RegEX pour vérifier les entrées de l'utilisateur
let form = document.querySelector(".cart__order__form");

const contact = {
    prenom = document.getElementById("firstName").value,
    nom = document.getElementById("lastName").value,
    adresse = document.getElementById("address").value,
    ville = document.getElementById("city").value,
    mail = document.getElementById("email").value,
}

// on va tester les 5 champs du formulaire //

function testPrenom () {
  const regulPrenom = this.firstName;
  const prenomError = document.getElementById("firstNameErrorMsg");
  if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(regulPrenom)) {
    prenomError.innerText = '';
    return true;
  } else {
    prenomError.innerText =
      'Un prénom doit contenir 3 caractères minimum et seulement des lettres';
  }
}

function testNom () {
  const regulNom = this.lasttName;
  const nomError = document.getElementById("lastNameErrorMsg");
  if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{2,}$/.test(regulNom)) {
    nomError.innerText = '';
    return true;
  } else {
    nomError.innerText =
      'Un nom doit contenir 2 caractères minimum et seulement des lettres';
  }
}

function testAdresse () {
  const regulAdresse = this.address;
  const adresseError = document.getElementById("addressErrorMsg");
  if (/^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/.test(regulAdresse)) {
    adresseError.innerText = '';
    return true;
  } else {
    adresseError.innerText = `Le format d'adresse est non valide et doit comporter 3 caractères minimum`;
  }
}

function testVille () {
  const regulVille = this.city;
  const villeError = document.getElementById("cityErrorMsg");
  if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,}$/.test(regulVille)) {
    villeError.innerText = '';
    return true;
  } else {
    villeError.innerText = `Le format de ville est non valide`;
  }
}

function testMail () {
  const regulMail = this.email;
  const mailError = document.getElementById("emailErrorMsg");
  if (/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(regulMail)) {
    mailError.innerText = '';
    return true;
  } else {
    mailError.innerText = `email non valide (exemple : contact@generique.com)`;
  }
}

function completeForm () {
  if (
    testPrenom () &&
    testNom () &&
    testAdresse () &&
    testVille () &&
    testMail ()
  ) {
    return true;
  } else {
    alert ("le formulaire n'est pas complété entièrement");
    return false;
  }
}