const APIurl = "https://striveschool-api.herokuapp.com/api/product"

const APIkey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YmE1ZDljNDM3MDAwMTkzYzM2MzAiLCJpYXQiOjE3MDg0NDAxNTcsImV4cCI6MTcwOTY0OTc1N30.rWrEFaPzRm9S2wd-FZRpE3kEugjSugUg2ZcL4pzPJjs"

const productBox = document.getElementById("product-box");

const inputName = document.getElementById("inputName");
const inputBrand = document.getElementById("inputBrand");
const inputURL = document.getElementById("inputURL");
const inputPrice = document.getElementById("inputPrice");
const inputDescription = document.getElementById("inputDescription");

window.onload = getProducts();

// Function that shows every product 

async function getProducts() {
    try {
        const res = await fetch(APIurl, {
            method: 'GET',
            headers: {
                'Authorization': APIkey,
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json();
        console.log(json);

        productBox.innerHTML = "";
        json.forEach(product => {
            createTemplates(product);
        });

    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }
}

function createTemplates ({_id, name, description, brand, imageUrl, price}) {
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("col-sm-6", "col-lg-4", "col-xl-3");

    let card = document.createElement("div");
    card.classList.add("card");

    cardContainer.appendChild(card);
    
    let row = document.createElement("div");
    row.classList.add("row", "g-0");

    card.appendChild(row);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("col-6", "col-sm-12")

    row.appendChild(imgContainer);

    let cardImg = document.createElement("img");
    cardImg.src = imageUrl;

    imgContainer.appendChild(cardImg);

    let bodyContainer = document.createElement("div");
    bodyContainer.classList.add("col-6",  "col-sm-12")

    row.appendChild(bodyContainer);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-sm-center");

    bodyContainer.appendChild(cardBody);

    let titleContainer = document.createElement("a");
    titleContainer.classList.add("card-title-container")
    titleContainer.href = `detail.html?pid=${_id}`;
    titleContainer.style.cursor = "pointer";
    titleContainer.style.color = "#3498db";

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

    productBox.appendChild(cardContainer);
}