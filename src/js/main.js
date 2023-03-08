"use strict";

// Variables
const coctailList = document.querySelector(".js_coctails_List");
const inputSearch = document.querySelector(".js_input");
const btnSearch = document.querySelector(".js_btn_search");
const btnReset = document.querySelector(".js_btn_reset");
const favoriteList = document.querySelector(".js_favorite_List");

let listCoctailsData = [];
let listFavoriteData = [];

const placeholder = `https://via.placeholder.com/150x110/ffffff/666666/?text=C`;

// fetch when the page loads
fetchGet("margarita");

// paint localStorage Favorites
let favoriteStored = localStorage.getItem("coctailsFav");
if (favoriteStored) {
    listFavoriteData = JSON.parse(favoriteStored);
    renderFavoriteList(listFavoriteData);
}

// handleSearchEvent Function
function handleSearchEvent(event) {
    event.preventDefault();
    let inputValue = inputSearch.value;
    if (inputValue === "") {
        fetchGet("margarita");
    } else {
        fetchGet(inputValue);
    }
}

// add event Search Btn
btnSearch.addEventListener("click", handleSearchEvent);

// fetch function
function fetchGet(value) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
        .then((response) => response.json())
        .then((data) => {
            listCoctailsData = data.drinks.map((x) => ({
                name: x.strDrink,
                img: x.strDrinkThumb,
                id: x.idDrink,
            }));
            renderList(listCoctailsData);
            addEventToResults();
        });
}

// render the Coctail List
function renderList(coctailDataList) {
    coctailList.innerHTML = "";
    for (const coctail of coctailDataList) {
        const li = renderDrink(coctail);
        coctailList.appendChild(li);
    }
}

// render the favorite List
function renderFavoriteList(favoriteDataList) {
    favoriteList.innerHTML = "";
    for (const coctail of favoriteDataList) {
        const li = renderDrink(coctail);
        li.setAttribute("class", "favorite");
        favoriteList.appendChild(li);
    }
    deleteFavorite();
}

// each Coctail
function renderDrink(coctail) {
    const li = document.createElement("li");
    li.setAttribute("class", "js-liEvent");
    li.setAttribute("id", coctail.id);

    const div = document.createElement("div");
    const img = document.createElement("img");
    const h1 = document.createElement("h1");

    div.setAttribute("class", "divCoctail");
    h1.textContent = coctail.name;
    img.setAttribute("src", coctail.img || placeholder);
    img.setAttribute("alt", "coctail picture");
    img.setAttribute("class", "resize");

    div.appendChild(img);
    div.appendChild(h1);
    li.appendChild(div);

    return li;
}

// Favorite Coctails handleClickEvent
function handleClickEvent(ev) {
    ev.preventDefault();
    const elementId = ev.currentTarget.id;
    const favoriteCoctail = listCoctailsData.find(
        (coctail) => coctail.id === elementId
    );
    const indexCoctail = listFavoriteData.findIndex(
        (coctail) => coctail.id === elementId
    );
    if (indexCoctail === -1) {
        listFavoriteData.push(favoriteCoctail);
        ev.currentTarget.classList.add("selected");
    } else {
        listFavoriteData.splice(indexCoctail, 1);
        ev.currentTarget.classList.remove("selected");
    }
    localStorage.setItem("coctailsFav", JSON.stringify(listFavoriteData));
    renderFavoriteList(listFavoriteData);
}

// add event to all the coctails Results
function addEventToResults() {
    const liCoctailsList = document.querySelectorAll(".js-liEvent");
    for (const li of liCoctailsList) {
        li.addEventListener("click", handleClickEvent);
        const favoriteCoctail = listFavoriteData.find(
            (coctail) => coctail.id === li.id
        );
        if (favoriteCoctail) {
            li.classList.add("selected");
        }
    }
}

//  handleClickDeleteEvent function
function handleDeleteEvent(ev) {
    const coctail = ev.currentTarget.parentNode.parentNode;
    //remove the coctail from favorite list and dom
    const indexCoctail = listFavoriteData.indexOf(coctail);
    listFavoriteData.splice(indexCoctail, 1);
    renderFavoriteList(listFavoriteData);
    // update the localStorage data
    localStorage.setItem("coctailsFav", JSON.stringify(listFavoriteData));
    // remove the selected class from regular list
    const selectedLi = document.getElementById(coctail.id);
    selectedLi.classList.remove("selected");
}

// function add clickDeleteEvent to all the favorites
function deleteFavorite() {
    const favoritesAll = document.querySelectorAll(".favorite");
    for (const favorite of favoritesAll) {
        const div = favorite.querySelector(".divCoctail");
        const icon = document.createElement("div");
        icon.setAttribute("class", "delete");
        div.appendChild(icon);
        icon.addEventListener("click", handleDeleteEvent);
    }
}

// Reset Function
function handleClickReset(ev) {
    ev.preventDefault();
    favoriteList.innerHTML = "";
    localStorage.removeItem("coctailsFav");
    listFavoriteData;
    const selected = document.querySelectorAll(".selected");
    for (const selec of selected) {
        selec.classList.remove("selected");
    }
    listFavoriteData = [];
    inputSearch.value = "";
}

// add reset event to the
btnReset.addEventListener("click", handleClickReset);
