let apiData = [];  // declaration de la variable qui va récolter les articles à intégrer dans l'index

// récupération des éléments produits dans l'api products //
const apiProducts = async () => {
  await fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((data) => apiData = data);
}

const kanapsDisplay = async () => {  // fonction d'affichage des données par les id items déclarés dans l'index //
  await apiProducts(); 
  document.getElementById("items").innerHTML = (
    apiData.map(article => (
      `<a href="./product.html?_id=${article._id}">
        <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}"></img>
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
        </article>
      </a>`
    )).join('')
  );
}

kanapsDisplay();

