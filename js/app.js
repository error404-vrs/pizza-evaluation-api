const $pizzaWrapper = document.querySelector(".pizzas-wrapper");
// const $pizzaPicture = document.querySelector(".pizza-picture");
// const $firstSection = document.querySelector("first-section");
const $pizzaBasket = document.querySelector(".basket-aside");
const $removeIcon = document.querySelector(".basket-product-remove-icon");

// async function showPizzas() {
//     const reponse = await fetch("10.59.122.41:3000/products");
//     const pizzas = await reponse.json();
//     console.log(pizzas);
// }

// showPizzas()

// fetch("10.59.122.41:3000/products")
//     .then(function(res) {
//         console.log(res.json())
//     })

const orders = {
  "products": [

  ]
}

fetch("http://10.59.122.41:3000/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data);
    data.forEach((element) => {
      const $pizzaItem = document.createElement("div");
      const $pizzaPicture = document.createElement("img");
      const $cardPicture = document.createElement("img");
      const $cardButton = document.createElement("span");
      const $pizzaInformation = document.createElement("ul");
      const $pizzaName = document.createElement("il");
      const $pizzaPrice = document.createElement("il");

      $pizzaPicture.src = element.image;
      $cardPicture.src = "../images/carbon_shopping-cart-plus.svg";
      $cardButton.textContent = "Ajouter au panier";
      $pizzaName.textContent = element.name;
      $pizzaPrice.textContent = "$" + element.price;

      $pizzaItem.classList.add("pizza-item");
      $pizzaPicture.classList.add("pizza-picture");
      $cardButton.classList.add("add-to-cart-btn");
      $pizzaInformation.classList.add("pizza-infos");
      $pizzaName.classList.add("pizza-name");
      $pizzaPrice.classList.add("pizza-price");

      $pizzaWrapper.appendChild($pizzaItem);
      $cardButton.appendChild($cardPicture);
      $pizzaItem.appendChild($pizzaPicture);
      $pizzaItem.appendChild($cardButton);
      $pizzaItem.appendChild($pizzaInformation);
      $pizzaInformation.appendChild($pizzaName);
      $pizzaInformation.appendChild($pizzaPrice);

      $pizzaItem.addEventListener("click", function () {

        for (let i = 0; i < $pizzaItem; i++) {
          orders.products.push({
            "uuid": data[i].id,
            "quantity": 1
          })
        }

        console.log(orders)
        console.log(data)

        const card = $pizzaBasket;

        // const onCardTitle = document.createElement("h2")
        // const cardScreen = document.createElement("div")
        // const basketProduct = document.createElement("ul")
        const $basketProduct = document.querySelector(".basket-products");
        const $productItems = document.createElement("li");
        const $itemName = document.createElement("span");
        const $itemDetails = document.createElement("span");
        const $quantity = document.createElement("span");
        const $unitPrice = document.createElement("span");
        const $totalPrice = document.createElement("span");
        const $removeIcon = document.createElement("img");
        // const $separator = document.createElement("hr")
        const $removeItemCard = document.createElement("p")
        const $quantityOnCard = document.querySelector("p")
        const $addItemCard = document.createElement("p")

        console.log($itemName);

        $itemName.textContent = element.name;
        $unitPrice.textContent = "@" + element.price;
        $removeIcon.src = "../images/remove-icon.svg";
        $totalPrice.textContent = "' " + element.price + " '";

        $basketProduct.appendChild($productItems);
        $productItems.appendChild($itemName);
        $productItems.appendChild($itemDetails);
        $itemDetails.appendChild($quantity);
        $itemDetails.appendChild($unitPrice);
        $itemDetails.appendChild($totalPrice);
        $productItems.appendChild($removeIcon);
        // $basketProduct.appendChild($separator)

        $productItems.classList.add("basket-product-item");
        $itemName.classList.add("basket-product-item-name");
        $itemDetails.classList.add("basket-product-details");
        $quantity.classList.add("basket-product-details-quantity");
        $unitPrice.classList.add("basket-product-details-unit-price");
        $totalPrice.classList.add("basket-product-details-total-price");
        $removeIcon.classList.add("basket-product-remove-icon");

        $cardButton.classList.remove("add-to-cart-btn")
        $cardButton.classList.add("add-to-cart-btn-after")

        console.log($removeIcon);

        $removeIcon.addEventListener("click", function () {
          $productItems.remove();
        });
      });
    });
  });
