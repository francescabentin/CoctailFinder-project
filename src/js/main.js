'use strict';

// Variables
const coctailArray = document.querySelector('.js_coctails_List');
const inputSearch = document.querySelector('.js_input');
const btnSearch = document.querySelector('.js_btn_search');
const btnReset = document.querySelector('.js_btn_reset');
const favoriteList = document.querySelector('.js_favorite_List')

let listCoctailsData = [];
let listFavoriteData = [];

// paint localStorage Favorites
const favoriteStored = localStorage.getItem('coctailsFav')
if (favoriteStored) {
    listFavoriteData = JSON.parse(favoriteStored);
    renderFavList(listFavoriteData);
}

// Fetch Inicial al cargar la pagina
fetchGet('margarita');
console.log(listFavoriteData);
console.log(JSON.parse(favoriteStored));

// HandleSearchEvent Function
function handleSearchEvent(event) {
    event.preventDefault();
    let inputValue = inputSearch.value;
    fetchGet(inputValue);
}

// Event Search Btn
btnSearch.addEventListener('click', handleSearchEvent);

// render the Coctail List
function renderList(renderListData) {
    coctailArray.innerHTML = '';
    for (const coctail of renderListData) {
        const li = renderDrink(coctail);
        coctailArray.appendChild(li);
    }
}

// render the favorite List
function renderFavList(renderFavData) {
    favoriteList.innerHTML = '';
    for (const coctail of renderFavData) {
        const li = renderDrink(coctail);
        favoriteList.appendChild(li);
    }
}

// each Coctail
function renderDrink(coctail) {
    const li = document.createElement('li');
    li.setAttribute('class','js-liEvent');
     li.setAttribute('id', coctail.idDrink);

    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const img = document.createElement('img');

    h1.textContent = coctail.strDrink;
    img.setAttribute('src', coctail.strDrinkThumb);
    img.setAttribute('alt', 'drink picture');
    img.setAttribute('class', 'resize');

    div.appendChild(h1);
    div.appendChild(img);
    li.appendChild(div);

    return li;
}

// Favorite Coctails handleClickEvent 
function handleClickEvent(ev) {
    ev.preventDefault();
    const elementId = ev.currentTarget.id;

    const favoriteCoctail = listCoctailsData.find((coctail) => coctail.idDrink === elementId);

    const indexCoctail = listFavoriteData.findIndex((coctail) => coctail.idDrink === elementId);

    if (indexCoctail === -1){
    listFavoriteData.push(favoriteCoctail);
    ev.currentTarget.classList.add('selected');
    } else {
        listFavoriteData.splice(indexCoctail, 1);
        ev.currentTarget.classList.remove('selected');   
    }
    localStorage.setItem("coctailsFav", JSON.stringify(listFavoriteData));
    renderFavList(listFavoriteData);
}

// add event to all the coctails Results
function addEventToResults() {
    const liCoctailsList = document.querySelectorAll(".js-liEvent");
    for (const li of liCoctailsList) {
        li.addEventListener("click", handleClickEvent);
    const favoriteCoctail = listFavoriteData.find((coctail)=>coctail.idDrink === li.id );
    if (favoriteCoctail) {
        li.classList.add('selected');
    }
    }
}

// fetch function
function fetchGet(value) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
        .then(response => response.json())
        .then(data => {
            listCoctailsData = data.drinks;
            renderList(listCoctailsData);
            addEventToResults();
        });       
}
