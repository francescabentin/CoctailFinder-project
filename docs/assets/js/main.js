"use strict";const coctailArray=document.querySelector(".js_coctails_List"),inputSearch=document.querySelector(".js_input"),btnSearch=document.querySelector(".js_btn_search"),btnReset=document.querySelector(".js_btn_reset"),favoriteList=document.querySelector(".js_favorite_List");let listCoctailsData=[],listFavoriteData=[];function handleSearchEvent(t){t.preventDefault();let e="",n=inputSearch.value;fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+n).then(t=>t.json()).then(t=>{e=t.drinks,renderList(e),addEventToResults(e)})}function renderList(t){coctailArray.innerHTML="";for(const e of t){const t=renderDrink(e);coctailArray.appendChild(t)}}function renderFavList(t){favoriteList.innerHTML="";for(const e of t){const t=renderDrink(e);favoriteList.appendChild(t)}}function renderDrink(t){const e=document.createElement("li");e.setAttribute("class","js-liEvent"),e.setAttribute("id",t.idDrink);const n=document.createElement("div"),i=document.createElement("h1"),r=document.createElement("img");return i.textContent=t.strDrink,r.setAttribute("src",t.strDrinkThumb),r.setAttribute("alt","drink picture"),r.setAttribute("class","resize"),n.appendChild(i),n.appendChild(r),e.appendChild(n),e}function handleClickEvent(t){t.preventDefault();const e=t.currentTarget.id;t.currentTarget.classList.toggle("selected");const n=listCoctailsData.find(t=>t.idDrink===e),i=listFavoriteData.indexOf(n);listFavoriteData.includes(n)?listFavoriteData.splice(i,1):listFavoriteData.push(n),renderFavList(listFavoriteData)}function addEventToResults(){const t=document.querySelectorAll(".js-liEvent");for(const e of t)e.addEventListener("click",handleClickEvent)}fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita").then(t=>t.json()).then(t=>{listCoctailsData=t.drinks,renderList(listCoctailsData),addEventToResults(listCoctailsData)}),btnSearch.addEventListener("click",handleSearchEvent);