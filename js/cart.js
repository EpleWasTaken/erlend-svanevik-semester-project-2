import { getCurrentCartItems } from "./utils/favouritesFunction.js";

const cart = getCurrentCartItems();

const container = document.querySelector(".cart_container");
const main = document.querySelector("main");
const total = document.querySelector(".total");

if (cart.length === 0) {
  container.innerHTML = `<div class="empty_cart">No items have been added to the cart. :)</div>`;
  main.style.height = "750px";
  main.style.paddingTop = "350px";
  total.style.display = "none";
}

cart.forEach((item) => {
  container.innerHTML += `<div class="cart_item">
                            <a href="../html/productsDetails.html?id=${item.id}">
                            <img src="${item.image}" id="cart_img" >
                            </a>
                            <div class="cart_info">
                            <h3 class="cart_title">${item.name}</h3>
                            <h5 class="cart_price">${item.price} ,-</h5>
                            </div>
                            <button onclick="window.location='../html/productsDetails.html?id=${item.id}'" id="cart_viewmore">View Product</button>
                        </div>`;
});

// Adding all prices of all items to the total amount at bottom of page

let totalPrice = 0;

cart.forEach((item) => {
  totalPrice = parseFloat(totalPrice) + parseFloat(item.price);
});

total.innerHTML += `<div class="cart_checkout_container">
                    <div class="cart_total">Cart total price: ${totalPrice.toFixed(
                      2
                    )} NOK</div>
                    <button id="cart_checkout" onclick='alert("Are you sure you want to check out all item(s) in the cart with a value of ${totalPrice.toFixed(
                      2
                    )}NOK?")'>Checkout all items in cart</button>
                    <button id="cart_clearall">Clear cart</button>
                    </div>`;

const clear = document.getElementById("cart_clearall");

clear.addEventListener("click", clearLocal);

function clearLocal() {
  localStorage.removeItem("added");
  container.innerHTML = `<div class="empty_cart">No items have been added to the cart. :)</div>`;
  total.innerHTML = "";
  main.style.height = "600px";
  main.style.paddingTop = "250px";
}
