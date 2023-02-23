'use strict';

// Variables
const coctailArray = document.querySelector('.js_coctails_List');
const inputSearch = document.querySelector('.js_input');
const btnSearch = document.querySelector('.js_btn_search');
const btnReset = document.querySelector('.js_btn_reset');
const favoriteList = document.querySelector('.js_favorite_List')

let listCoctailsData = [];
let listFavoriteData = [];

// Fetch Inicial al cargar la pagina
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(response => response.json())
    .then(data => {
        listCoctailsData = data.drinks;
        renderList(listCoctailsData);
         addEventToResults(listCoctailsData);
    });

// HandleSearchEvent Function
function handleSearchEvent(event) {
    event.preventDefault();
    let listCoctailsData = "";
    let inputValue = inputSearch.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            listCoctailsData = data.drinks;
            renderList(listCoctailsData);
            addEventToResults(listCoctailsData);
        });       
}

// Event Search Btn
btnSearch.addEventListener('click', handleSearchEvent);

/*
// Painting the Coctails List
function renderList(renderListData) {
     for (const coctail of renderListData) {
            coctailArray.innerHTML += renderDrink(coctail);
        }
}
// Painting each drink
function renderDrink(coctail) {
    let html =  ` <li>
                <div>
                    <h1> ${coctail.strDrink}</h1>
                    <img src=" ${coctail.strImageSource}" alt="drink picture">
                </div>
            </li>`
return html;
}
*/

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
    ev.currentTarget.classList.toggle('selected');

    const favoriteCoctail = listCoctailsData.find((coctail) => coctail.idDrink === elementId);
    
    const indexCoctail = listFavoriteData.indexOf(favoriteCoctail);

    if (!listFavoriteData.includes(favoriteCoctail)){
    listFavoriteData.push(favoriteCoctail);
    } else {
        listFavoriteData.splice(indexCoctail,1);
    }
    renderFavList(listFavoriteData);
}

// add event to all the coctails Results
function addEventToResults() {
    const liCoctailsList = document.querySelectorAll(".js-liEvent");
    for (const li of liCoctailsList) {
        li.addEventListener("click", handleClickEvent);
    }
}
