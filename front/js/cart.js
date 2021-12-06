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
    // knapQuantiteFinale = knapQuantiteFinale + knapFinalChoice[index].quantity; //
    knapQuantiteFinale.push(parseInt(knapFinalChoice[index].quantity));
  }
console.log(knapQuantiteFinale);
var somme = knapQuantiteFinale.reduce(function (accu, valeur) {
  return accu + valeur;
});
console.log(somme);

// affichage du montant total du panier //
document.querySelector("#totalQuantity").innerHTML = somme;

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
  return priceByKnap;
}

console.log(knapPrixTotal());
// Calcul de la somme de tous les prix récupérés dans le tableau priceByKnap //
const reducer = (cumul, prix) => cumul + prix;
const prixFinal = knapPrixTotal().reduce(reducer, 0);

console.log(prixFinal);
let totalToDisplay = document.getElementById("totalPrice");
// document.querySelector("#totalQuantity").innerHTML = somme; //
totalToDisplay.insertAdjacentHTML("beforeend", "<div>Le prix total est de : €</div>");
prixFinal.innerHTML +=`
<div class="cart__price">
              <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span></p>
              <p>${prixFinal}</p>
              </div>
`
// document.querySelector("#totalPrice").innerHTML = prixFinal; //


/*  ----------------------------LA PARTIE FORMULAIRE---------------------------  */
// on déclare les variables qui vont servir à remplir le formulaire //
let regulPrenom = document.getElementById("firstName");
let regulNom = document.getElementById("lastName");
let regulAdresse = document.getElementById("address");
let regulVille = document.getElementById("city");
let regulMail = document.getElementById("email");

// on déclare les variables qui détectent les erreurs sur les champs de saisie //
let prenomError = document.getElementById("firstNameErrorMsg");
let nomError = document.getElementById("lastNameErrorMsg");
let adresseError = document.getElementById("addressErrorMsg");
let villeError = document.getElementById("cityErrorMsg");
let mailError = document.getElementById("emailErrorMsg");

// on va tester les 5 champs du formulaire au niveau de la saisie en input //
regulPrenom.addEventListener('input', (e) => {
  e.preventDefault();
  if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(regulPrenom.value) == true ) {
    prenomError.innerText = '';
  } else {
    prenomError.innerText =
        'Un prénom doit contenir 3 caractères minimum et seulement des lettres';
  }
});

regulNom.addEventListener('input', (e) => {
  e.preventDefault();
  if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{2,}$/.test(regulNom.value) == true ) {
    nomError.innerText = '';
  } else {
    nomError.innerText =
        'Un nom doit contenir 2 caractères minimum et seulement des lettres';
  }
});

regulAdresse.addEventListener('input', (e) => {
  e.preventDefault();
  if (/^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/.test(regulAdresse.value) == true ) {
    adresseError.innerText = '';
  } else {
    adresseError.innerText = 'Le format d\'\ adresse est non valide et doit comporter 3 caractères minimum';
  }
});

regulVille.addEventListener('input', (e) => {
  e.preventDefault();
  if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,}$/.test(regulVille.value) == true ) {
    villeError.innerText = '';
  } else {
      villeError.innerText = 'Le format de ville est non valide';
  }
});

regulMail.addEventListener('input', (e) => {
  e.preventDefault();
  if (/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(regulMail.value) == true ) {
    mailError.innerText = '';
  } else {
    mailError.innerText = 'email non valide (exemple : contact@generique.com)';
  }
});

// mise en place de l'évènement lié au bouton commander //
// créer un tableau qui va récupérer les id dans le knapFinalChoice //
  // le finalData va contenir les id et la fiche contact à envoyer au serveur post //
  // l'orderId renvoyé par le serveur sera inscrit ds le localS pour être traité ds le fchier de confirmation //

const finalCommand = document.querySelector(".cart__order__form__submit");
finalCommand.addEventListener('click', (e) => {
  e.preventDefault();
  const selectId = [];
  for (let i = 0; i < knapFinalChoice.length; i++) {
    selectId.push(knapFinalChoice[i].id);
  }
  let contact = {
    prenom : document.getElementById("firstName").value,
    nom : document.getElementById("lastName").value,
    adresse : document.getElementById("address").value,
    ville : document.getElementById("city").value,
    mail : document.getElementById("email").value,
  };
  console.log(contact);

  const finalData = {
    selectId,
    contact,
  }

  // création d'une constante initiant une requête Post avec renvoi d'un n° d'ordre //
  const confirmCmd = {
    method: "POST",
    body: JSON.stringify(finalData),
    headers: {
      'Accept' : 'application/json',
      "Content-Type" : "application/json",
    }
  }
  
  fetch("http://localhost:3000/api/products/order", confirmCmd)   // affichage de la réponse du serveur //
    .then(res => res.json())
    .then(data => {
      localStorage.clear;
      if (completeForm()) {
        document.location.href = "confirmation.html";
      }
    })
})



