const $pizzaWrapper = document.querySelector(".pizzas-wrapper");
// const $pizzaPicture = document.querySelector(".pizza-picture");
// const $firstSection = document.querySelector("first-section");
const $pizzaBasket = document.querySelector(".basket-aside");
const $removeIcon = document.querySelector(".basket-product-remove-icon");
const $confirmButton = document.querySelector(".confirm-order-btn");

// CONFIGURATION DU BOUTON DE CPNFIRMATION DE COMMANDE (au debut exeptionnelment)

$confirmButton.addEventListener("click", function () {
  const $confirmedPage = document.querySelector(".confirmed-section");
  const $confirmedImage = document.createElement("img");
  const $confirmedTitle = document.createElement("h1");
  const $confirmedPageParapgraph = document.createElement("p");
  const $confirmedProductList = document.createElement("ul");
  const $confirmConfirmedButton = document.createElement("a");

  $confirmedImage.src = "../images/carbon_checkmark-outline.svg";
  $confirmedTitle.textContent = "Order Confirmed";

  $confirmedPage.appendChild($confirmedImage);
  $confirmedPage.appendChild($confirmedTitle);
});

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
  products: [],
};

async function getProducts() {
  const res = await fetch("http://10.59.122.27:3000/products");
  const data = await res.json();

  return data;
}

function calculTotalPrice(pizza) {
  // const $pizzaCardClass = document.querySelector(".pizza-item");
  let basicPrice = calculTotalPrice.currentTotal || 3;
  calculTotalPrice.currentTotal = basicPrice + pizza.price;
  console.log(calculTotalPrice.currentTotal);
}

function createPizzaCard(pizzaData) {
  // Tu crées la carte de pizza
  const $pizzaCard = document.createElement("div");
  const $pizzaPicture = document.createElement("img");
  const $cardPicture = document.createElement("img");
  const $cardButton = document.createElement("span");
  const $pizzaInformation = document.createElement("ul");
  const $pizzaName = document.createElement("li");
  const $pizzaPrice = document.createElement("li");

  // Tu la customises
  $pizzaPicture.src = pizzaData.image;
  $cardPicture.src = "../images/carbon_shopping-cart-plus.svg";
  $cardButton.textContent = "Ajouter au panier";
  $pizzaName.textContent = pizzaData.name;
  $pizzaPrice.textContent = "$" + pizzaData.price;

  $pizzaCard.classList.add("pizza-item");
  $pizzaPicture.classList.add("pizza-picture");
  $cardButton.classList.add("add-to-cart-btn");
  $pizzaInformation.classList.add("pizza-infos");
  $pizzaName.classList.add("pizza-name");
  $pizzaPrice.classList.add("pizza-price");

  // Et tu la retournes (return $pizzaCard) (mais tu ne fais pas d'appendChild sur ton pizzaWrapper)
  $cardButton.appendChild($cardPicture);
  $pizzaCard.appendChild($pizzaPicture);
  $pizzaCard.appendChild($cardButton);
  $pizzaCard.appendChild($pizzaInformation);
  $pizzaInformation.appendChild($pizzaName);
  $pizzaInformation.appendChild($pizzaPrice);

  return $pizzaCard;
}

function handleBasket(pizza) {
  console.log("Add a pizza");
  console.log(pizza);

  const $basketProduct = document.querySelector(".basket-products");
  const $productItems = document.createElement("li");
  const $itemName = document.createElement("span");
  const $itemDetails = document.createElement("span");
  const $quantity = document.createElement("span");
  const $unitPrice = document.createElement("span");
  const $totalPrice = document.createElement("span");
  const $removeIcon = document.createElement("img");

  $itemName.textContent = pizza.name;
  $unitPrice.textContent = "@" + pizza.price;
  $removeIcon.src = "../images/remove-icon.svg";
  $totalPrice.textContent = "' " + pizza.price + " '";

  $basketProduct.appendChild($productItems);
  $productItems.appendChild($itemName);
  $productItems.appendChild($itemDetails);
  $productItems.appendChild($quantity);
  $productItems.appendChild($unitPrice);
  $productItems.appendChild($totalPrice);
  $productItems.appendChild($removeIcon);

  $productItems.classList.add("basket-product-item");
  $itemName.classList.add("basket-product-item-name");
  $itemDetails.classList.add("basket-product-details");
  $quantity.classList.add("basket-product-details-quantity");
  $unitPrice.classList.add("basket-product-details-unit-price");
  $totalPrice.classList.add("basket-product-details-total-price");
  $removeIcon.classList.add("basket-product-remove-icon");
}

async function main() {
  // Récupère les produits (getProducts())
  const data = await getProducts();

  // Tu fais ta boucle forEach
  data.forEach(function (pizza) {
    // tu appelles à l'intérieur createPizzaCard
    const $pizza = createPizzaCard(pizza);

    console.log($pizza);

    $pizzaWrapper.appendChild($pizza);

    $pizza
      .querySelector(".add-to-cart-btn")
      .addEventListener("click", function () {
        handleBasket(pizza);
        calculTotalPrice(pizza);
      });

    // $pizzaCard.addEventListener("click", function() {
    //   const card = $pizzaBasket;

    // // const onCardTitle = document.createElement("h2")
    // // const cardScreen = document.createElement("div")
    // // const basketProduct = document.createElement("ul")
    // const $basketProduct = document.querySelector(".basket-products");
    // const $productItems = document.createElement("li");
    // const $itemName = document.createElement("span");
    // const $itemDetails = document.createElement("span");
    // const $quantity = document.createElement("span");
    // const $unitPrice = document.createElement("span");
    // const $totalPrice = document.createElement("span");
    // const $removeIcon = document.createElement("img");
    // // const $separator = document.createElement("hr")
    // const $removeItemCard = document.createElement("button");
    // const $quantityOnCard = document.querySelector("span");
    // const $addItemCard = document.createElement("button");

    //     $removeItemCard.textContent = "-";
    //     $addItemCard.textContent = "+";

    //     if ($productItems in $basketProduct) {
    //       console.log($productItems);
    //     }

    //     $pizzaItem.classList.add("piza-item-after");

    //     $addItemCard.classList.add("item-card");
    //     $removeItemCard.classList.add("item-card");

    //     $cardButton.textContent = "";
    //     $cardButton.appendChild($removeItemCard);
    //     // $cardButton.appendChild($quantityOnCard)
    //     $cardButton.appendChild($addItemCard);

    //     $cardButton.addEventListener("click", function () {
    //       console.log("toto");
    //     });

    //     $removeItemCard.addEventListener("click", function () {
    //       $productItems.remove($productItems);
    //       $productItems.remove($productItems);
    //     });

    //     $addItemCard.addEventListener("click", function () {
    //       $productItems.remove($productItems);
    //       $basketProduct.appendChild($productItems);
    //       $productItems.appendChild($itemName);
    //       $productItems.appendChild($itemDetails);
    //       $itemDetails.appendChild($quantity);
    //       $itemDetails.appendChild($unitPrice);
    //       $itemDetails.appendChild($totalPrice);
    //       $productItems.appendChild($removeIcon);
    //     });

    // })
  });

  // Tu ajoutes tes eventListener sur pizzaCard
  // Tu fais appendChild sur ton pizzaWrapper
}
main();

fetch("http://10.59.122.27:3000/products")
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

      $cardButton.appendChild($cardPicture);
      $pizzaItem.appendChild($pizzaPicture);
      $pizzaItem.appendChild($cardButton);
      $pizzaItem.appendChild($pizzaInformation);
      $pizzaInformation.appendChild($pizzaName);
      $pizzaInformation.appendChild($pizzaPrice);

      $pizzaItem.addEventListener("click", function () {
        for (let i = 0; i < $pizzaItem; i++) {
          orders.products.push({
            uuid: data[i].id,
            quantity: 1,
          });
        }

        console.log(orders);
        console.log(data);

        // const card = $pizzaBasket;

        // // const onCardTitle = document.createElement("h2")
        // // const cardScreen = document.createElement("div")
        // // const basketProduct = document.createElement("ul")
        // const $basketProduct = document.querySelector(".basket-products");
        // const $productItems = document.createElement("li");
        // const $itemName = document.createElement("span");
        // const $itemDetails = document.createElement("span");
        // const $quantity = document.createElement("span");
        // const $unitPrice = document.createElement("span");
        // const $totalPrice = document.createElement("span");
        // const $removeIcon = document.createElement("img");
        // // const $separator = document.createElement("hr")
        // const $removeItemCard = document.createElement("button");
        // const $quantityOnCard = document.querySelector("span");
        // const $addItemCard = document.createElement("button");

        // $removeItemCard.textContent = "-";
        // $addItemCard.textContent = "+";

        // if ($productItems in $basketProduct) {
        //   console.log($productItems);
        // }

        // $pizzaItem.classList.add("piza-item-after");

        // $addItemCard.classList.add("item-card");
        // $removeItemCard.classList.add("item-card");

        // $cardButton.textContent = "";
        // $cardButton.appendChild($removeItemCard);
        // // $cardButton.appendChild($quantityOnCard)
        // $cardButton.appendChild($addItemCard);

        // $cardButton.addEventListener("click", function () {
        //   console.log("toto");
        // });

        // $removeItemCard.addEventListener("click", function () {
        //   $productItems.remove($productItems);
        //   $productItems.remove($productItems);
        // });

        // $addItemCard.addEventListener("click", function () {
        //   $productItems.remove($productItems);
        //   $basketProduct.appendChild($productItems);
        //   $productItems.appendChild($itemName);
        //   $productItems.appendChild($itemDetails);
        //   $itemDetails.appendChild($quantity);
        //   $itemDetails.appendChild($unitPrice);
        //   $itemDetails.appendChild($totalPrice);
        //   $productItems.appendChild($removeIcon);
        // });

        console.log($itemName);

        $itemName.textContent = element.name;
        $unitPrice.textContent = "@" + element.price;
        $removeIcon.src = "../images/remove-icon.svg";
        $totalPrice.textContent = "' " + element.price + " '";

        // $addItemCard.textContent = "+"
        // $removeItemCard.textContent = "-"
        // $cardButton.textContent = "0"

        $basketProduct.appendChild($productItems);
        $productItems.appendChild($itemName);
        $productItems.appendChild($itemDetails);
        $itemDetails.appendChild($quantity);
        $itemDetails.appendChild($unitPrice);
        $itemDetails.appendChild($totalPrice);
        $productItems.appendChild($removeIcon);
        // $basketProduct.appendChild($separator)
        // $pizzaItem.addEventListener("click", function() {
        // })
        // $cardButton.textContent = "coucou"

        // $cardButton.appendChild($addItemCard)
        // $cardButton.appendChild($quantityOnCard)
        // $cardButton.appendChild($removeItemCard)

        $productItems.classList.add("basket-product-item");
        $itemName.classList.add("basket-product-item-name");
        $itemDetails.classList.add("basket-product-details");
        $quantity.classList.add("basket-product-details-quantity");
        $unitPrice.classList.add("basket-product-details-unit-price");
        $totalPrice.classList.add("basket-product-details-total-price");
        $removeIcon.classList.add("basket-product-remove-icon");

        $cardButton.classList.remove("add-to-cart-btn");
        $cardButton.classList.add("add-to-cart-btn-after");

        console.log($removeIcon);

        $removeIcon.addEventListener("click", function () {
          $productItems.remove();
        });
      });
    });
  });
