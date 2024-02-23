const paramObj = new URLSearchParams(window.location.search);
const myPostId = paramObj.get("pid");

const APIurl = "https://striveschool-api.herokuapp.com/api/product/"

const APIkey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YmE1ZDljNDM3MDAwMTkzYzM2MzAiLCJpYXQiOjE3MDg0NDAxNTcsImV4cCI6MTcwOTY0OTc1N30.rWrEFaPzRm9S2wd-FZRpE3kEugjSugUg2ZcL4pzPJjs"

const inputName = document.getElementById("inputName");
const inputBrand = document.getElementById("inputBrand");
const inputURL = document.getElementById("inputURL");
const inputPrice = document.getElementById("inputPrice");
const inputDescription = document.getElementById("inputDescription");

const updateAlert = document.getElementById("updateAlert");

window.onload = showProduct();

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

        updateAlert.classList.toggle("d-none");
        setTimeout(() => {
            updateAlert.classList.toggle("d-none");
        }, 5000);

    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }

}