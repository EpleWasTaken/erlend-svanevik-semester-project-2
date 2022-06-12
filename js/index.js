import { BASE_URL } from "./constants/api.js";
import { getCurrentCartItems } from "./utils/favouritesFunction.js";
const hero_img = document.querySelector(".hero_banner");

async function fetchAPI() {
  try {
    const request = await fetch(BASE_URL + "api/hero?populate=*");

    const response = await request.json();

    const data = response.data;

    hero_img.innerHTML = `<img src="${data.attributes.image.data.attributes.url}" id="hero">
                            <h1 id="hero_text">Bergen Shoe Shop</h1>`;
  } catch (err) {
    console.log(err);
  }
}

fetchAPI();

const featured_img = document.querySelector(".featured");

async function fetchFeatured() {
  try {
    const fRequest = await fetch(BASE_URL + "api/products?populate=*");

    const fResponse = await fRequest.json();

    const data = fResponse.data;

    data.forEach(function (product) {
      const addedToCart = getCurrentCartItems();

      let cssClass = "fa-shopping-basket";

      const itemExists = addedToCart.find(function (added) {
        return parseInt(added.id) === product.id;
      });

      if (itemExists) {
        cssClass = "fa-trash";
      }

      if (product.attributes.featured === true) {
        featured_img.innerHTML += `<div class="featured_container">
        <div class="featured_image_container">
        <a href="html/productsDetails.html?id=${product.id}">
        <img src="${product.attributes.image.data[0].attributes.url}" id="featured_img" >
        </a>
        <i class="fas ${cssClass}" data-name="${product.attributes.title}" data-id="${product.id}" data-image="${product.attributes.image.data[0].attributes.url}" data-price="${product.attributes.price}"></i>
        </div>
        <div class="featured_info">
        <h3 class="featured_title">${product.attributes.title}</h3>
        <h5 class="featured_price">${product.attributes.price} NOK</h5>
        </div>
        <button onclick="window.location='html/productsDetails.html?id=${product.id}'" id="product_viewmore">View Product</button>
        </div>`;

        const added = document.querySelectorAll(".featured_container i");

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
      }
    });
  } catch (err) {
    console.log(err);
  }
}

fetchFeatured();
