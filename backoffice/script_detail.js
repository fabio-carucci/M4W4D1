const paramObj = new URLSearchParams(window.location.search);
const myPostId = paramObj.get("pid");

const APIurl = "https://striveschool-api.herokuapp.com/api/product/"

const APIkey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YmE1ZDljNDM3MDAwMTkzYzM2MzAiLCJpYXQiOjE3MDg0NDAxNTcsImV4cCI6MTcwOTY0OTc1N30.rWrEFaPzRm9S2wd-FZRpE3kEugjSugUg2ZcL4pzPJjs"

const inputName = document.getElementById("inputName");
const inputBrand = document.getElementById("inputBrand");
const inputURL = document.getElementById("inputURL");
const inputPrice = document.getElementById("inputPrice");
const inputDescription = document.getElementById("inputDescription");

const productBox = document.getElementById("product");

const updateAlert = document.getElementById("updateAlert");

window.onload = showProduct();
window.addEventListener('resize', () => {
    let screenWidth = window.innerWidth;
    let card = document.querySelector(".card");
    if (screenWidth <= 992) {
        card.style.width = "70%";
    } else {
        card.style.width = "100%";
    }
});

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

        inputName.value = json.name;
        inputBrand.value = json.brand;
        inputURL.value = json.imageUrl;
        inputPrice.value = json.price;
        inputDescription.value = json.description;

        createTemplates(json);

    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }
}

// Function that edit the specific product

async function editProduct (event) {
    event.preventDefault();

    if (!(inputName.value && inputBrand.value && inputURL.value && inputPrice.value && inputDescription.value)) {
        alert("Per favore, riempi tutti i campi.");
        return;
    }

    let product = {};
    product["name"] = inputName.value;
    product["brand"] = inputBrand.value;
    product["imageUrl"] = inputURL.value;
    product["price"] = inputPrice.value;
    product["description"] = inputDescription.value;

    try {
        const res = await fetch((APIurl + myPostId), {
            method: 'PUT',
            headers: {
                'Authorization': APIkey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        const json = await res.json();

        createTemplates(json);

        updateAlert.classList.toggle("d-none");
        setTimeout(() => {
            updateAlert.classList.toggle("d-none");
        }, 5000);

    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }

}

function createTemplates ({name, description, brand, imageUrl, price}) {
    productBox.innerHTML = "";  

    let card = document.createElement("div");
    card.classList.add("card");

    let screenWidth = window.innerWidth;
    if (screenWidth <= 992) {
        card.style.width = "70%";
    } else {
        card.style.width = "100%";
    }
    
    let row = document.createElement("div");
    row.classList.add("row", "g-0");

    card.appendChild(row);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("col-12")

    row.appendChild(imgContainer);

    let cardImg = document.createElement("img");
    cardImg.src = imageUrl;

    imgContainer.appendChild(cardImg);

    let bodyContainer = document.createElement("div");
    bodyContainer.classList.add("col-12")

    row.appendChild(bodyContainer);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-sm-center");

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

    productBox.appendChild(card);
}