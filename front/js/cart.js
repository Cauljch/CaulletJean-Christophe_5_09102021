// on récupère les données présentes dans le localStorage //
let knapFinalChoice =  JSON.parse(localStorage.getItem('article'));

const knapBasket = document.getElementById("cartAndFormContainer");
console.log(knapBasket);
// affichage des produits enregistrés dans le localStorage //

// on parcourt la variable pour afficher les éléments //
if(knapFinalChoice === null || knapFinalChoice == 0) {
  alert("votre panier est vide / retourner à l'accueil pour faire votre selection")
} else {
  const contenuPanier = document.getElementById("cart__items")
  console.log('contenuPanier', contenuPanier)
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
          <input type="number" class="itemQuantity${k}" name="itemQuantity${k}" min="1" max="100" value="${knapFinalChoice[k].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <br>
          <p class="deleteItem${k}">Supprimer</p>
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
  console.log('knapFinalChoice', knapFinalChoice);

  for (let q = 0; q < knapFinalChoice.length; q++) {
    const knapQuantite = document.querySelector(".itemQuantity"+q);
    knapQuantite.addEventListener("input", (event) => {
      event.preventDefault();
      let newValue = event.target.value;
      knapFinalChoice[q].quantity = newValue;
      alert("votre quantité de produit a bien été modifiée");
      window.location.reload;
      localStorage.setItem("article", JSON.stringify(knapFinalChoice));
      document.querySelector("#totalQuantity").innerHTML = knapQuantiteFinale();
    })
  }
}
modifQuantite();

// écoute du bouton supprimer l'article //
function removeKnap() {
  for (let k = 0;k < knapFinalChoice.length; k++) {
    const btnSupArticle = document.querySelector(".deleteItem"+k);

    btnSupArticle.addEventListener("click", (event) => {
      event.preventDefault();
      let idArticleDelete = knapFinalChoice[k].id;
      let idArticleColor = knapFinalChoice[k].color;
      knapFinalChoice = knapFinalChoice.filter(index => index.id !== idArticleDelete || index.color !== idArticleColor);
      localStorage.setItem("article", JSON.stringify(knapFinalChoice));
      alert("le produit a bien été supprimé du panier");
      location.reload();
      document.querySelector("#totalQuantity").innerHTML = knapQuantiteFinale();
    });
  }
}

removeKnap();

// affichage du nombre total d'articles dans le panier //
// on crée un tableau qui récupère toutes les quantités affichées dans le panier //
// puis on fait la somme des valeurs du tableau avec la méthode reduce //
function knapQuantiteFinale()
{
  var knapQuantiteFinale = [];
  for (let index = 0; index < knapFinalChoice.length; index++) {
    knapQuantiteFinale.push(parseInt(knapFinalChoice[index].quantity));
  }
  console.log(knapQuantiteFinale);
  var somme = knapQuantiteFinale.reduce(function (accu, valeur) {
    return accu + valeur;
  });
  return somme
}

// affichage du total des articles du panier //
document.querySelector("#totalQuantity").innerHTML = knapQuantiteFinale();

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

document.querySelector("#totalPrice").innerHTML = prixFinal;


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
  console.log(regulPrenom.value);
  e.preventDefault();
  // on teste les 5 variables des regexp qui détectent les erreurs de saisie //
  // si les variables sont vides alors on peut enregistrer les infos pour la commande //
  if ((!regulPrenom.value) && (!regulNom.value) && (!regulAdresse.value) && (!regulVille.value) && (!regulMail.value)) {
    alert("Veuillez remplir les données du formulaire");
    mailError.innerText = 'email non valide (exemple : contact@generique.com)';
  } else {
    const selectId = [];
    for (let i = 0; i < knapFinalChoice.length; i++) {
      selectId.push(knapFinalChoice[i].id);
    }
    let contact = {
      firstName : document.getElementById("firstName").value,
      lastName : document.getElementById("lastName").value,
      address : document.getElementById("address").value,
      city : document.getElementById("city").value,
      email : document.getElementById("email").value,
    };
    console.log(contact);

    const finalData = {
      selectId,
      contact,
    }
    console.log(finalData);

    // création d'une constante initiant une requête Post avec renvoi d'un n° d'ordre //
    /*const confirmCmd = {
      method: "POST",
      body: JSON.stringify(finalData),
      headers: {
        'Accept' : 'application/json',
        "Content-Type" : "application/json",
      }
    }*/

    const confirmCmd = {
      method: "POST",
      body: JSON.stringify({
        contact: {
          firstName : contact.firstName,
          lastName : contact.lastName,
          address : contact.address,
          city : contact.city,
          email : contact.email
        },
        products: selectId
        }),
      headers: {
        'Accept' : 'application/json',
        "Content-Type" : "application/json",
      }
    }
    
    fetch("http://localhost:3000/api/products/order", confirmCmd)   // affichage de la réponse du serveur //
      .then(res => res.json())
      .then(data => {
        console.log(data);
        //localStorage.clear;
        //if (completeForm()) { 
          document.location.href = `confirmation.html?id=${data.orderId}`;
        //} 
      })

  }
  })


/* corrections à effectuer 
ajout d'un produit dans le panier alors q'aucune couleur n'a été sélectionnée
le montant total du panier ne se met à jour qu'après un reload
la commande est validée même si une rubrique est mal renseignée */

