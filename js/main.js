"use strict";
const listElement = document.querySelector(".js-list");
const menuItem = document.querySelector(".js-item");
const newFormElement = document.querySelector(".js-new-form");
const addButton = document.querySelector(".js-btn-add");
const inputDesc = document.querySelector(".js-input-desc");
const inputPhoto = document.querySelector(".js-input-photo");
const inputName = document.querySelector(".js-input-name");
const inputRace = document.querySelector(".js-input-race");
const labelMessageError = document.querySelector(".js-label-error");
const newCancelButton = document.querySelector(".js-btn-cancel");
const inputSearchRace = document.querySelector(".js_in_search_race");
const searchButton = document.querySelector(".js_search_btn");
const inputSearchDesc = document.querySelector(".js_in_search_desc");

//2.Función genérica para crear objetos. Convertir cada gatito en un objeto estandar
function getKittenData(img, nm, rc, desc) {
    const kittenData = {
        image: img,
        name: nm.toUpperCase(),
        race: rc,
        desc: desc,
    };
    return kittenData;
}
// Función genérica para renderizar gatitos. La función nos devuelve el elemento HTML con el objeto genérico creado como parámetro
function renderKitten(kittenData) {
    const html = `<li class="card"> <article> <img class="card_img" src= "${kittenData.image}" alt="gatito" /><h3 class="card_title"> ${kittenData.name} </h3><h4 class="card_race"> ${kittenData.race} </h4><p class="card_description"> ${kittenData.desc} </p></article></li>`;
    return html;
}
//4.Crear objeto para cada gatito. Ejecutamos la función getKittenData para crear un objeto de cada gatito:
// const kittenOneObject = getKittenData(
//     "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
//     "Anastacio",
//     "British Shorthair",
//     "Cariñoso, juguetón, le guta estar tranquilo y que nadie lemoleste. Es una maravilla acariciarle!"
// );
// const kittenTwoObject = getKittenData(
//     "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
//     "Fiona",
//     "American Shorthair",
//     "Risueño, le guta estar tranquilo y que nadie lemoleste. Es una maravilla acariciarle!"
// );
// const kittenThreeObject = getKittenData(
//     "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
//     "Cielo",
//     "British Shorthair",
//     "Cariñoso, juguetón, le guta estar tranquilo y que nadie lemoleste. Es una maravilla acariciarle!"
// );
//5.Crear un array con los objetos creados de cada gatito
let kittenDataList = [];      
const GITHUB_USER = 'bellita85';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;          

fetch(SERVER_URL)
.then(response => response.json())
.then (data=> {
    let dataArray = data.results;
    console.log(dataArray);
    for (const item of dataArray){
        const newKitten = getKittenData(item.image, item.name, item.race, item.desc);
        kittenDataList.push(newKitten);
    }
    console.log(kittenDataList);
    listElement.innerHTML = renderKittenList(kittenDataList);

})

//6.Función para renderizar el conjunto de gatitos a partir de un array con un bucle for...of y meterlos dentro del ul. Usamos la función renderKitten dentro que renderiza cada uno de los gatitos (desde el objeto creado a un li)
function renderKittenList(kittenDataList) {
    let html = ""; 
    for (const kitten of kittenDataList) {
        html += renderKitten(kitten);
    }
    listElement.innerHTML = html;
}
// BOTON PLUSS + Aparece y desaparece fomrulario
function showNewCatForm() {
    newFormElement.classList.remove("collapsed");
}
function hideNewCatForm() {
    newFormElement.classList.add("collapsed");
}
function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains("collapsed")) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
menuItem.addEventListener("click", handleClickNewCatForm);
//  boton AÑADIR( si esta vacio pon el mensaje, si no esta vacio creame uno new. y al crear el gatito y dale a añadir vaciame todo y cierrame)
function addNewKittenPlus () {
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;
    const newKittenDataObject = getKittenData(valuePhoto, valueName, valueRace, valueDesc);
    const html = renderKitten(newKittenDataObject);
    listElement.innerHTML += html;
    //Ejercicio 2.11
    kittenDataList.push(newKittenDataObject); 
    cancelNewKitten ();   
}
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;
    if (valueDesc === "" || valuePhoto === "" || valueName === "") {
        alert("Debe rellenar todos los valores.");
    } else {
        addNewKittenPlus ();
    }
    // renderRace(inputRace);  
}
// function renderRace(race) {
//     if (race.value === "" || race.value === undefined) {
//         console.log(`<p class="card_race">No se ha especificado la raza</p>`);
//     } else {
//         //Si se ha especificado un valor lo recoge
//         console.log(`<h3 class="card_race">${race.value}</h3>`);
//     }
// }
addButton.addEventListener("click", addNewKitten);

// Event listener. CANCELAR nuevo gatito 
function cancelNewKitten  (){

    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
    newFormElement.classList.toggle("collapsed");
};
function handlecancel (ev) {
    ev.preventDefault();
    cancelNewKitten (); 
}
newCancelButton.addEventListener("click", handlecancel);
//Event listener. Botón BUSCAR
function filterKitten() {
    debugger
    let html = "";
    const descrSearchText = inputSearchDesc.value.toLowerCase();
    const raceSearchText = inputSearchRace.value.toLowerCase(); 
    if (descrSearchText === "" && raceSearchText === "") {
        alert("Debe rellenar alguno de los dos valores.");
    }else if (descrSearchText !== "" || raceSearchText !== "") {
        const filterNewKitten = kittenDataList.filter((kitten) =>  
            kitten.desc.toLowerCase().includes(descrSearchText) && kitten.race.toLowerCase().includes(raceSearchText));
            html = renderKittenList (filterNewKitten);
            }
        if (html === ''){
            html = 'No existe ningún gatito que se ajuste a tu búsqueda.';  
        }
    }
 
function handleserch (event) {
    event.preventDefault();
    filterKitten();
};
searchButton.addEventListener("click",handleserch);

// renderKittenList(kittenDataList); esto me pinta a los 3 gatos directamente. 