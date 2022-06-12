import { getCurrentCartItems } from "../utils/favouritesFunction.js";

export default function createProducts(item, targetElement) {
  const element = document.querySelector(targetElement);

  element.innerHTML = "";

  const addedToCart = getCurrentCartItems();

  item.forEach((item) => {
    let cssClass = "fa-shopping-basket";

    const itemExists = addedToCart.find(function (added) {
      return parseInt(added.id) === item.id;
    });

    if (itemExists) {
      cssClass = "fa-trash";
    }

    element.innerHTML += `<div class="product_container">
                          <div class="product_image_container">
                          <a href="../html/productsDetails.html?id=${item.id}">
                          <img src="${item.attributes.image.data[0].attributes.url}" id="product_img">
                          </a>
                          <i class="fas ${cssClass}" data-name="${item.attributes.title}" data-id="${item.id}" data-image="${item.attributes.image.data[0].attributes.url}" data-price="${item.attributes.price}"></i>
                          </div>
                          <div class="product_info">
                          <h3 class="product_title">${item.attributes.title}</h3>
                          <h5 class="product_price">${item.attributes.price} NOK</h5>
                          </div>
                          <p class="singlePost_descripion">${item.attributes.description}</p>
                          <button onclick="window.location='../html/productsDetails.html?id=${item.id}'" id="product_viewmore">View Product</button>
                          </div>`;

    const added = document.querySelectorAll(".product_container i");

    added.forEach(function (icon) {
      icon.addEventListener("click", toggleCart);
    });

    function toggleCart() {
      this.classList.toggle("fa-trash");
      this.classList.toggle("fa-shopping-basket");

      const id = this.dataset.id;
      const name = this.dataset.name;
      const image = this.dataset.image;
      const price = this.dataset.price;

      const currentlyAdded = getCurrentCartItems();

      const existingAdded = currentlyAdded.find(function (add) {
        return add.id === id;
      });

      if (existingAdded === undefined) {
        const featured = { id: id, name: name, image: image, price: price };

        currentlyAdded.push(featured);

        saveToAdded(currentlyAdded);
      } else {
        const newAdded = currentlyAdded.filter((add) => add.id !== id);
        saveToAdded(newAdded);
      }
    }

    function saveToAdded(save) {
      localStorage.setItem("added", JSON.stringify(save));
    }
  });
}
