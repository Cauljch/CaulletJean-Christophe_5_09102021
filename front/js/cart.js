// on récupère les données présentes dans le localStorage //
let knapInLocalStorage =  JSON.parse(localStorage.getItem('article'));
console.log(knapInLocalStorage);

const knapBasket = document.querySelector("#cart_items");
// affichage des produits enregistrés dans le localStorage //

const knapBasket = [];
for (let k = 0; k < knapInLocalStorage.length; k++) {
    const element = knapInLocalStorage[k];
    
}



if (knapInLocalStorage == []) {
    
} else {
    
}
