// déclaration des variables nécessaires pour l'affichage des produits //
let knapImg = document.getElementsByClassName ("item__img");
let knapPrice = document.getElementById("price");
let knapDesc = document.getElementById("description");
let knapColor = document.getElementById("colors");
let knapName = document.getElementById("title");

let imageURL = "";
let imageAlt = "";

// modif de l'url avec de nouveaux parametres de recherche //
let searchId = new URL(window.location.href).searchParams;
let newUrl = searchId.get('_id');

// Appel de l'api avec les nouveaux paramètres de recherche //
// console.log(searchId); //
fetch("http://localhost:3000/api/products/" +newUrl )
  .then((response) => response.json())
  .then(data => {
    knapImg[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    knapName.innerHTML = `<h1>${data.name}</h1>`;
    knapPrice.innerText = `${data.price}`;
    knapDesc.innerText = `${data.description}`;

    // on choisit les couleurs par modèle //
    for (modele in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[modele],
        data.colors[modele]
      );
    }
  });

//---------JE RECUPERE LES DONNEES PAR RAPPORT AU CHOIX DE L'UTILISATEUR---------

// je configure un eventListener quand l'utilisateur clique sur ajouter au panier //
const addCart = document.getElementById("addToCart");
addCart.addEventListener('click', (event) => {
  event.preventDefault();
  const knapNb = document.getElementById("quantity");
  const colorChoice = document.getElementById("colors");
  let  knapSelect = {
    id: newUrl,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    colors: colorChoice.value,
    quantity: knapNb.value,
    };
    confirmBox(knapSelect);
});

  knapFinalChoice = ["id", "colors", "quantity", "price"];
  let sameId = knapSelect.find(elt => elt.id === knapFinalChoice.id && elt.colors === knapFinalChoice.colors);
  if (sameId = true) {
    let quantityById = knapSelect.quantity + knapFinalChoice.quantity;
    knapFinalChoice.quantity = quantityById;
    localStorage.setItem("article", JSON.stringify(knapInLocalStorage));
  } else {
    knapFinalChoice.push(knapSelect);
    localStorage.setItem("article", JSON.stringify(knapInLocalStorage));
  };  {
    knapFinalChoice = [];
    knapFinalChoice.push(knapSelect);
    localStorage.setItem("article", JSON.stringify(knapInLocalStorage));
}

