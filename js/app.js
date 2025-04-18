const $pizzaWrapper = document.querySelector(".pizzas-wrapper");
const $pizzaBasket = document.querySelector(".basket-aside");
const $confirmButton = document.querySelector(".confirm-order-btn");

let currentTotalPrice = 3;

const orders = {
  products: [],
  basketMap: new Map(),
};

function updateTotalPriceDisplay() {
  const $totalDisplay = document.querySelector(".total-order-price");
  $totalDisplay.textContent = `$${currentTotalPrice.toFixed(2)}`;
}


$confirmButton.addEventListener("click", function () {
  const $confirmedPage = document.querySelector(".confirmed-section");
  const $confirmedImage = document.createElement("img");
  const $confirmedTitle = document.createElement("h1");

  const $existingImage = $confirmedPage.querySelector("img");
  const $existingTitle = $confirmedPage.querySelector("h1");
  
  if ($existingImage) {
    $confirmedPage.removeChild($existingImage);
  }
  
  if ($existingTitle) {
    $confirmedPage.removeChild($existingTitle);
  }

  $confirmedImage.src = "../images/carbon_checkmark-outline.svg";
  $confirmedTitle.textContent = "Order Confirmed";

  $confirmedPage.appendChild($confirmedImage);
  $confirmedPage.appendChild($confirmedTitle);

  $confirmedPage.classList.add("show-confirmed");
  
  const $closeBtn = document.querySelector(".close-btn");
  $closeBtn.addEventListener("click", function () {
    $confirmedPage.classList.remove("show-confirmed");
  });
});



async function getProducts() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("ngrok-skip-browser-warning", "1");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const res = await fetch("https://prime-garfish-currently.ngrok-free.app/products", requestOptions);
  const data = await res.json();
  return data;
}

function calculTotalPrice(pizza, quantity = 1) {
  let basicPrice = calculTotalPrice.currentTotal || 3;
  basicPrice += pizza.price * quantity;
  if (basicPrice < 3) {
    basicPrice = 3;
  }
  calculTotalPrice.currentTotal = basicPrice;
  currentTotalPrice = basicPrice;
}

function createPizzaCard(pizzaData) {
  const $pizzaCard = document.createElement("div");
  const $pizzaPicture = document.createElement("img");
  const $cardButton = document.createElement("span");
  const $pizzaInformation = document.createElement("ul");
  const $pizzaName = document.createElement("li");
  const $pizzaPrice = document.createElement("li");

  $pizzaPicture.src = pizzaData.image;
  $pizzaPicture.classList.add("pizza-picture");

  $cardButton.classList.add("add-to-cart-btn");
  $cardButton.textContent = "Ajouter au panier";

  $pizzaCard.classList.add("pizza-item");
  $pizzaInformation.classList.add("pizza-infos");
  $pizzaName.classList.add("pizza-name");
  $pizzaPrice.classList.add("pizza-price");

  $pizzaName.textContent = pizzaData.name;
  $pizzaPrice.textContent = "$" + pizzaData.price;

  $pizzaInformation.appendChild($pizzaName);
  $pizzaInformation.appendChild($pizzaPrice);
  $pizzaCard.appendChild($pizzaPicture);
  $pizzaCard.appendChild($cardButton);
  $pizzaCard.appendChild($pizzaInformation);

  return { $pizzaCard, $cardButton };
}

function transformButtonToQuantityControls($button, pizza) {
  $button.classList.add("after-add-button");
  $button.textContent = "";

  const $minus = document.createElement("button");
  $minus.textContent = "-";
  $minus.classList.add("quantity-minus");

  const $plus = document.createElement("button");
  $plus.textContent = "+";
  $plus.classList.add("quantity-plus");

  const $quantity = document.createElement("span");
  $quantity.classList.add("quantity-display");
  $quantity.textContent = "1";

  $button.appendChild($minus);
  $button.appendChild($quantity);
  $button.appendChild($plus);

  $minus.addEventListener("click", () => {
    const item = orders.basketMap.get(pizza.id);
    if (item.quantity > 1) {
      item.quantity--;
      $quantity.textContent = item.quantity;
      item.$quantity.textContent = `x${item.quantity}`;
      item.$totalPrice.textContent = "$" + (pizza.price * item.quantity);
      currentTotalPrice -= pizza.price;
    } else {
      item.$productItems.remove();
      orders.basketMap.delete(pizza.id);
      orders.products = orders.products.filter((p) => p.uuid !== pizza.id);
      currentTotalPrice -= pizza.price;
      $button.classList.remove("after-add-button");
      $button.textContent = "Ajouter au panier";
    }
    updateTotalPriceDisplay();
  });

  $plus.addEventListener("click", () => {
    const item = orders.basketMap.get(pizza.id);
    item.quantity++;
    $quantity.textContent = item.quantity;
    item.$quantity.textContent = `x${item.quantity}`;
    item.$totalPrice.textContent = "$" + (pizza.price * item.quantity);
    currentTotalPrice += pizza.price;
    updateTotalPriceDisplay();
  });
}

function handleBasket(pizza, $cardButton) {
  const $basketProduct = document.querySelector(".basket-products");

  if (orders.basketMap.has(pizza.id)) {
    const existingItem = orders.basketMap.get(pizza.id);
    existingItem.quantity++;
    existingItem.$quantity.textContent = `x${existingItem.quantity}`;
    existingItem.$totalPrice.textContent = "$" + (pizza.price * existingItem.quantity);
  } else {
    const $productItems = document.createElement("li");
    const $itemName = document.createElement("span");
    const $itemDetails = document.createElement("span");
    const $quantity = document.createElement("span");
    const $unitPrice = document.createElement("span");
    const $totalPrice = document.createElement("span");
    const $removeIcon = document.createElement("img");

    $itemName.textContent = pizza.name;
    $unitPrice.textContent = "@ $" + pizza.price;
    $quantity.textContent = "x1";
    $totalPrice.textContent = "$" + pizza.price;
    $removeIcon.src = "../images/remove-icon.svg";

    $productItems.classList.add("basket-product-item");
    $itemName.classList.add("basket-product-item-name");
    $itemDetails.classList.add("basket-product-details");
    $quantity.classList.add("basket-product-details-quantity");
    $unitPrice.classList.add("basket-product-details-unit-price");
    $totalPrice.classList.add("basket-product-details-total-price");
    $removeIcon.classList.add("basket-product-remove-icon");

    $itemDetails.appendChild($quantity);
    $itemDetails.appendChild($unitPrice);
    $itemDetails.appendChild($totalPrice);
    $productItems.appendChild($itemName);
    $productItems.appendChild($itemDetails);
    $productItems.appendChild($removeIcon);
    $basketProduct.appendChild($productItems);

    orders.basketMap.set(pizza.id, {
      quantity: 1,
      $quantity,
      $totalPrice,
      pizza,
      $productItems,
    });

    $removeIcon.addEventListener("click", () => {
      const pizzaInMap = orders.basketMap.get(pizza.id);
      const totalPriceToRemove = pizzaInMap.pizza.price * pizzaInMap.quantity;
    
      calculTotalPrice.currentTotal -= totalPriceToRemove;
      currentTotalPrice = calculTotalPrice.currentTotal; 
      updateTotalPriceDisplay();
    
      pizzaInMap.$productItems.remove();
      orders.basketMap.delete(pizza.id);
      orders.products = orders.products.filter((p) => p.uuid !== pizza.id); 
    
      $cardButton.classList.remove("after-add-button");
      $cardButton.textContent = "Ajouter au panier";
    
      if (orders.basketMap.size === 0) {
        currentTotalPrice = 3;
      } else {
        currentTotalPrice = 0;
        orders.basketMap.forEach(item => {
          currentTotalPrice += item.pizza.price * item.quantity;
        });
      }

      calculTotalPrice.currentTotal = currentTotalPrice;
      updateTotalPriceDisplay();
    });
  }

  calculTotalPrice(pizza);
  updateTotalPriceDisplay();
}

async function main() {
  const data = await getProducts();

  data.forEach((pizza) => {
    const { $pizzaCard, $cardButton } = createPizzaCard(pizza);
    $pizzaWrapper.appendChild($pizzaCard);

    $cardButton.addEventListener("click", () => {
      const existingOrder = orders.products.find((p) => p.uuid === pizza.id);
      if (!existingOrder) {
        orders.products.push({
          uuid: pizza.id,
          quantity: 1,
        });
        transformButtonToQuantityControls($cardButton, pizza);
        handleBasket(pizza, $cardButton);
      }
    });
  });
}

main();
