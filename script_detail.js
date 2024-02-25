const paramObj = new URLSearchParams(window.location.search);
const myPostId = paramObj.get("pid");

const APIurl = "https://striveschool-api.herokuapp.com/api/product/"

const APIkey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YmE1ZDljNDM3MDAwMTkzYzM2MzAiLCJpYXQiOjE3MDg0NDAxNTcsImV4cCI6MTcwOTY0OTc1N30.rWrEFaPzRm9S2wd-FZRpE3kEugjSugUg2ZcL4pzPJjs"

const productBox = document.getElementById("product");

window.onload = showProduct();
document.addEventListener('DOMContentLoaded', adjustProductBoxWidth);
window.addEventListener('resize', adjustProductBoxWidth);

// Function that show the selected product

async function showProduct () {
    try {
        const res = await fetch((APIurl + myPostId), {
            method: 'GET',
            headers: {
                'Authorization': APIkey,
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();

        createTemplates(json);

    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }
}

function createTemplates ({_id, name, description, brand, imageUrl, price}) {
    productBox.innerHTML = "";  

    let card = document.createElement("div");
    card.classList.add("card");
    
    let row = document.createElement("div");
    row.classList.add("row", "g-0");

    card.appendChild(row);

    let bodyContainer = document.createElement("div");
    bodyContainer.classList.add("col-12",  "col-md-6", "d-flex", "align-items-center")

    row.appendChild(bodyContainer);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center");

    bodyContainer.appendChild(cardBody);

    let titleContainer = document.createElement("div");

    cardBody.appendChild(titleContainer);

    let cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = name;

    titleContainer.appendChild(cardTitle);

    let cardBrand = document.createElement("h5");
    cardBrand.classList.add("card-brand");
    cardBrand.innerText = brand;

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerText = description;

    let cardPrice = document.createElement("span");
    cardPrice.classList.add("card-price");
    cardPrice.innerText = `${price} €`;

    cardBody.appendChild(cardBrand);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardPrice);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("col-12",  "col-md-6")

    row.appendChild(imgContainer);

    let cardImg = document.createElement("img");
    cardImg.src = imageUrl;
    cardImg.style.height = "350px";

    imgContainer.appendChild(cardImg);

    productBox.appendChild(card);
}

function adjustProductBoxWidth() {
    let screenWidth = window.innerWidth;
  
    if (screenWidth >= 1200) {
        productBox.style.width = '70%';
    } else if (screenWidth >= 992) {
        productBox.style.width = '70%';
    } else if (screenWidth >= 768) {
        productBox.style.width = '90%';
    } else if (screenWidth >= 576){
        productBox.style.width = '70%';
    } else {
        productBox.style.width = '90%'
    }
  }
  
