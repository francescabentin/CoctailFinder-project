'use strict';

// Variables

const coctailArray = document.querySelector('.js_coctails_List');
const btnSearch = document.querySelector('.js_btn_search');
const btnReset = document.querySelector('.js_btn_reset');
const favoriteList = document.querySelector('js_favorite_List')

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'

let listCoctailsData = [];
let listFavoriteData = [];

// HandleSearchEvent Function

function handleSearchEvent() {
    console.log('hola');
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.drinks);
        listCoctailsData = data.drinks;
       renderList(listCoctailsData);
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
       
// each Coctail
function renderDrink(coctail) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const h1 = document.createElement('h1');
        const img = document.createElement('img');
        
        h1.textContent = coctail.strDrink;
        img.setAttribute('src', coctail.strImageSource);
        img.setAttribute('alt', 'drink picture');
        
        div.appendChild(h1);
        div.appendChild(img);
        li.appendChild(div);
       
        return li;
    }