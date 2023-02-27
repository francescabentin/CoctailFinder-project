"use strict";const coctailList=document.querySelector(".js_coctails_List"),inputSearch=document.querySelector(".js_input"),btnSearch=document.querySelector(".js_btn_search"),btnReset=document.querySelector(".js_btn_reset"),favoriteList=document.querySelector(".js_favorite_List");let listCoctailsData=[],listFavoriteData=[];fetchGet("margarita");let favoriteStored=localStorage.getItem("coctailsFav");function handleSearchEvent(t){t.preventDefault();let e=inputSearch.value;fetchGet(""===e?"margarita":e)}function renderList(t){coctailList.innerHTML="";for(const e of t){const t=renderDrink(e);coctailList.appendChild(t)}}function renderFavoriteList(t){favoriteList.innerHTML="";for(const e of t){const t=renderDrink(e);t.setAttribute("class","favorite"),favoriteList.appendChild(t)}deleteFavorite()}function renderDrink(t){const e=document.createElement("li");e.setAttribute("class","js-liEvent"),e.setAttribute("id",t.idDrink);const i=document.createElement("div"),a=document.createElement("img"),r=document.createElement("h1");return i.setAttribute("class","divCoctail"),r.textContent=t.strDrink,a.setAttribute("src",t.strDrinkThumb),a.setAttribute("alt","drink picture"),a.setAttribute("class","resize"),i.appendChild(a),i.appendChild(r),e.appendChild(i),e}function handleClickEvent(t){t.preventDefault();const e=t.currentTarget.id,i=listCoctailsData.find(t=>t.idDrink===e),a=listFavoriteData.findIndex(t=>t.idDrink===e);-1===a?(listFavoriteData.push(i),t.currentTarget.classList.add("selected")):(listFavoriteData.splice(a,1),t.currentTarget.classList.remove("selected")),localStorage.setItem("coctailsFav",JSON.stringify(listFavoriteData)),renderFavoriteList(listFavoriteData)}function addEventToResults(){const t=document.querySelectorAll(".js-liEvent");for(const e of t){e.addEventListener("click",handleClickEvent);listFavoriteData.find(t=>t.idDrink===e.id)&&e.classList.add("selected")}}function handleDeleteEvent(t){const e=t.currentTarget.parentNode.parentNode,i=listFavoriteData.indexOf(e);listFavoriteData.splice(i,1),renderFavoriteList(listFavoriteData),localStorage.setItem("coctailsFav",JSON.stringify(listFavoriteData));document.getElementById(e.id).classList.remove("selected")}function deleteFavorite(){const t=document.querySelectorAll(".favorite");for(const e of t){const t=e.querySelector(".divCoctail"),i=document.createElement("div");i.setAttribute("class","delete"),t.appendChild(i),i.addEventListener("click",handleDeleteEvent)}}function handleClickReset(t){t.preventDefault(),favoriteList.innerHTML="",localStorage.removeItem("coctailsFav");const e=document.querySelectorAll(".selected");for(const t of e)t.classList.remove("selected");listFavoriteData=[]}function fetchGet(t){fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+t).then(t=>t.json()).then(t=>{listCoctailsData=t.drinks,renderList(listCoctailsData),addEventToResults()})}favoriteStored&&(listFavoriteData=JSON.parse(favoriteStored),renderFavoriteList(listFavoriteData)),btnSearch.addEventListener("click",handleSearchEvent),btnReset.addEventListener("click",handleClickReset);