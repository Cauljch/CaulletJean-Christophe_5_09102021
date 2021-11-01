// déclaration des variables nécessaires pour l'affichage des produits //
let prodImg = document.getElementsByClassName ("item__img");
let prodPrice = document.getElementById("price");
let prodDesc = document.getElementById("description");
let prodColor = document.getElementById("colors");
let prodName = document.getElementById("title");

let imageURL = "";
let imageAlt = "";

// modif de l'url avec de nouveaux parametres de recherche //
let searchId = new URL(window.location.href).searchParams;
let newUrl = searchId.get('_id');

// Appel de l'api avec les nouveaux paramètres de recherche //
console.log(searchId);
fetch("http://localhost:3000/api/products/" +newUrl )
  .then((response) => response.json())
  .then(data => {
    prodImg[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    prodName.innerHTML = `<h1>${data.name}</h1>`;
    prodPrice.innerText = `${data.price}`;
    prodDesc.innerText = `${data.description}`;

    // on choisit les couleurs par modèle //
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  });

//---------JE RECUPERE LES DONNEES PAR RAPPORT AU CHOIX DE L'UTILISATEUR---------

let productNb = document.getElementById('quantity');
let colorChoice = document.getElementById('colors');

// je configure un eventListener quand l'utilisateur clique sur ajouter au panier
const addCart = document.getElementById('addtoCart');
addCart.addEventListener('click', (event) => {
  event.preventDefault();
  const  kanapSelect = {
    id: newID,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };
  console.log(kanapSelect);

  let kanapLocalStorage =  JSON.parse(localStorage.getItem('product'));
  console.log(kanapLocalStorage);

  // Ajout des produits sélectionnés dans le localStorage //
  const addKanapLocalStorage = () => {
  kanapLocalStorage.push(kanapSelect);
  // Stockage des données dans le localStorage //
  localStorage.setItem('product', JSON.stringify(kanapLocalStorage));
  console.log(addKanapLocalStorage);
    if (quantity == 0) {
      alert("Merci de choisir une quantité de produit")
    }
  }
});

/* valider une couleur de produit
valider une quantité de produit  - confirmer qu'une quantité a été ajoutée au panier:"vous venez d'ajouter(n)articles dans le panier"
si oui alors visualiser le panier en mode pop-up
    donner la possibilité de supprimer des articles et de revenir à la page d'accueil
si non alerter "merci de sélectionner une quantité de produits"
votre commande est-elle complète ? O/N
Si oui redirection vers la page confirmation pour saisir les données utilisateur
Si non redirection vers la page d'accueil
*/