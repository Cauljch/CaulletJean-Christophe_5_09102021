let params = new URL(window.location.href).searchParams;
// j'indique que la nouvelle url sera ajoutée d'un id :
let newID = params.get('_id');

// API AVEC L'ID DU CANAPE CHOISI //

const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

// je crée la bonne URL pour chaque article choisi en ajoutant newID
fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
    
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

     
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })
    
  .catch(_error => {
    alert("Les délais d'attente sont dépassés ou le serveur ne répond pas");
  });


// Traitement des données selon le choix de l'utilisateur //

const knapNb = document.getElementById('quantity');
const colorChoice = document.getElementById('colors');

// déclaration de l'évènement lorsqu'on ajoute au panier //
const btnAjoutPanier = document.getElementById('addToCart');
btnAjoutPanier.addEventListener('click', (event) => {
  event.preventDefault();
  if (colorChoice.value != 0) {
    const knapSelect = {
      id: newID,
      image: imageURL,
      alt: imageAlt,
      name: title.textContent,
      price: price.textContent,
      color: colorChoice.value,
      quantity: knapNb.value,
    };
    console.log(knapSelect);
  
    // la variable inscrit les clés/valeurs dans le local storage
    let knapFinalChoice =  JSON.parse(localStorage.getItem('article'));
    console.log(knapFinalChoice);
  
    // on injecte les articles sélectionnés dans le localStorage
    const injectionLocStor = () => {
    knapFinalChoice.push(knapSelect);
    // le push permet de stocker les données récupérées //
    localStorage.setItem('article', JSON.stringify(knapFinalChoice));
    console.log(injectionLocStor);
    }
  
    let confirmation = () => {
      alert('Le produit a bien été ajouté au panier');
    }
  
    let verif = false;
    
    if (knapFinalChoice) {
    // on créée une variable booléenne pour vérifier les infos contenues dans le localStorage
    // à savoir l'id et la couleur //
     knapFinalChoice.forEach (function (clickPanier, key) {
      if (clickPanier.id == newID && clickPanier.color == colorChoice.value) {
        knapFinalChoice[key].quantity = parseInt(clickPanier.quantity) + parseInt(knapNb.value);
        localStorage.setItem('article', JSON.stringify(knapFinalChoice));
        verif = true;
        confirmation();
      }
    });
  
      if (!verif) {
      injectionLocStor();
      confirmation();
      console.log(knapFinalChoice);
      }
    }
  
    // dans le cas ou aucun produit n'est présent //
    else {
      // déclaration d'un tableau avec la sélection de l'utilisateur //
      knapFinalChoice = [];
      injectionLocStor();
      confirmation();
      console.log(knapFinalChoice);
    }


  } else {
    alert("Vous devez impérativement choisir une couleur de canapé");
  }
});
