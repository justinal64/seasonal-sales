var categories = {};
var products = {};

document.getElementById("discount").addEventListener("change", function() {
    var discountValue = this.value;
    var discountSeason = this;
    console.log(discountSeason);
    applyDiscount(discountValue);
})

function catArray() {
    var categories = JSON.parse(this.responseText);
    console.log("categories = ", categories);
    // console.log("catArray data", categories.categories[0].id);
    var discountSelect = document.getElementById("discount");
    var discount = "<option value=''></value>";

    for(var i = 0; i < 3; i++) {
        discount += `<option value="${(categories.categories[i].discount * 100)}">${categories.categories[i].season_discount}</option>`;
    }
    discountSelect.innerHTML += discount;

}

function applyDiscount(discount) {
    // Logic to apply discount
    console.log("The discount is ", discount, "%");
}

function onError() {
  console.log("An error occurred while transferring");
}

function onProgress() {
    // console.log("onProgress working");
}

function onLoad() {
  var products = JSON.parse(this.responseText);
  console.log("data", products);

  var productDiv = document.getElementById("products");


  var product = "";
  var currentProduct;

  for (var i = 0; i < 10; i++) {
    currentProduct = products["products"][i];
    // console.log("currentProduct price = ", currentProduct.price);
    product += "<div class='products'>";
    product += `<p>${currentProduct.name} ${currentProduct.price}`;
    // Better solution?????
    if(currentProduct.category_id === 1) {
        product += " Winter</p>";
    } else if (currentProduct.category_id === 2) {
        product += " Furniture</p>";
    } else {
        product += " Household</p>";
    }

    //   product += "</div>";
    //   product += `<img class='album' src=${currentProduct.icon_url} width="200px" height="200px">`;
        // product += currentSong.icon_url;
      // product += "</img>";
    product += "</div>";
  };


  productDiv.innerHTML += product;
}

var productsRequest = new XMLHttpRequest();

productsRequest.addEventListener("load", onLoad); //Callback
productsRequest.addEventListener("error", onError)
productsRequest.addEventListener("progress", onProgress)
productsRequest.open("GET", "products.json")
productsRequest.send();


var categoriesRequest = new XMLHttpRequest();

categoriesRequest.addEventListener("load", catArray); //Callback
categoriesRequest.addEventListener("error", onError)
categoriesRequest.addEventListener("progress", onProgress)
categoriesRequest.open("GET", "categories.json")
categoriesRequest.send();