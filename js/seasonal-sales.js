var categories = {};
var products = {};
var discountSelect = document.getElementById("discount");

document.getElementById("discount").addEventListener("change", function() {
    var discountValue = this.value;
    // Selects the text IE. "Winter"
    var discountSeason = this.options[this.selectedIndex].text;
    if(discountSeason === categories.categories[0].season_discount) {
      discountSeason = categories.categories[0].id;
    } else if(discountSeason === categories.categories[1].season_discount) {
      discountSeason = categories.categories[1].id;
    } else {
      discountSeason = categories.categories[2].id;
    }
    applyDiscount(discountValue, discountSeason);
})

// Create the <select>
function catArray() {
    categories = JSON.parse(this.responseText);
    var discount = "<option value=''></value>";
    for(var i = 0; i < categories.categories.length; i++) {
        discount += `<option value="${(categories.categories[i].discount)}">${categories.categories[i].season_discount}</option>`;
    }
    discountSelect.innerHTML += discount;
}

// Apply the discount when an <option> is selected
function applyDiscount(discount, season) {
    // loop over array and apply the discount
    for(var i = 0; i < products.products.length; i++) {
        if(products.products[i].category_id === season) {
                                            // Limits the decimal value to 2 places
            products.products[i].price = (products.products[i].price * (1.0 - discount)).toFixed(2);
        }
    }
    displayArray();
}

function onError() {
    alert("An error occurred while transferring");
}

function onLoad() {
    products = JSON.parse(this.responseText);
    displayArray();
}

function displayArray() {
    var productDiv = document.getElementById("products");
    var product = "";
    var currentProduct;

    for (var i = 0; i < products.products.length; i++) {
        currentProduct = products["products"][i];
        product += "<div class='products'>";
        product += `<p>${currentProduct.name} ${currentProduct.price}`;

        if(currentProduct.category_id === 1) {
            product += " Winter</p>";
        } else if (currentProduct.category_id === 2) {
            product += " Furniture</p>";
        } else {
            product += " Household</p>";
        }
        product += "</div>";
    };
  productDiv.innerHTML = product;
}

var productsRequest = new XMLHttpRequest();
productsRequest.addEventListener("load", onLoad);
productsRequest.addEventListener("error", onError)
productsRequest.open("GET", "products.json")
productsRequest.send();

var categoriesRequest = new XMLHttpRequest();
categoriesRequest.addEventListener("load", catArray);
categoriesRequest.addEventListener("error", onError)
categoriesRequest.open("GET", "categories.json")
categoriesRequest.send();