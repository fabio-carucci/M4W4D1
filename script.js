const APIurl = "https://striveschool-api.herokuapp.com/api/product/"

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

// Function that add a product 

async function addProducts(event) {
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
        const res = await fetch(APIurl, {
            method: 'POST',
            headers: {
                'Authorization': APIkey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })

        inputName.value = "";
        inputBrand.value = "";
        inputURL.value = "";
        inputPrice.value = "";
        inputDescription.value = "";

        getProducts();


    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }
}

// Function that delete a product 

async function deleteProduct(productId) {
    try {
        const res = await fetch(`${APIurl}/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': APIkey,
                'Content-Type': 'application/json'
            }
        });

        getProducts();

    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }
}

function createTemplates ({_id, name, description, brand, imageUrl, price}) {
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("col-3");

    let card = document.createElement("div");
    card.classList.add("card");

    cardContainer.appendChild(card);

    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    cardImg.src = imageUrl;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    card.appendChild(cardImg);
    card.appendChild(cardBody);

    let cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = name;

    let cardBrand = document.createElement("h5");
    cardBrand.classList.add("card-brand");
    cardBrand.innerText = brand;

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerText = description;

    let cardPrice = document.createElement("span");
    cardPrice.classList.add("card-price");
    cardPrice.innerText = price;

    let cardButtons = document.createElement("div");
    cardButtons.classList.add("card-buttons");

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardBrand);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardButtons);

    let editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-warning");
    editButton.innerText = "MODIFICA";
    // Inserire addEventListener per funzione di edit

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.innerText = "ELIMINA";
    deleteButton.dataset.productId = _id;
    deleteButton.addEventListener("click", (e) => {
        let productId = e.target.getAttribute('data-product-id');
        deleteProduct(productId);
    });

    cardButtons.appendChild(editButton);
    cardButtons.appendChild(deleteButton);

    productBox.appendChild(cardContainer);
}

// let data = {
//     "name": "3310 cellphone", 
//     "description": "An unforgettable icon.", 
//     "brand": "Nokia", 
//     "imageUrl": "https://bit.ly/3CExjRa", 
//     "price": 100, 
// }

// addProducts(data);