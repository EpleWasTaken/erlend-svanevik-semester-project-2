import { getCurrentCartItems } from "./utils/favouritesFunction.js";
import { BASE_URL } from "./constants/api.js";

const singleProduct = document.querySelector(".singlePost_container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = BASE_URL + "api/products/" + id + "?populate=*";

async function fetchSinglePost() {
  try {
    const response = await fetch(url);

    const json = await response.json();

    const data = json.data;

    const addedToCart = getCurrentCartItems();

    let cssClass = "fa-shopping-basket";

    const itemExists = addedToCart.find(function (added) {
      return parseInt(added.id) === data.id;
    });

    if (itemExists) {
      cssClass = "fa-trash";
    }

    singleProduct.innerHTML += `<div class="singlePost">
          <div class="singlePost_image_container">
          <img src="${data.attributes.image.data[0].attributes.url}" id="singlePost_img">
          <i class="fas ${cssClass}" data-name="${data.attributes.title}" data-id="${data.id}" data-image="${data.attributes.image.data[0].attributes.url}" data-price="${data.attributes.price}"></i>
          </div>
          <div class="singlePost_info">
          <h3 class="singlePost_title">${data.attributes.title}</h3>
          <h5 class="singlePost_price">${data.attributes.price},-</h5>
          </div>
          </div>
          <p class="singlePost_descripion">${data.attributes.description}</p>`;

    const added = document.querySelectorAll(".singlePost i");

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

    document.title = `${data.attributes.title}` + " | " + "Bergen Shoe Shop";
  } catch (err) {
    console.log(err);
  }
}

fetchSinglePost();
