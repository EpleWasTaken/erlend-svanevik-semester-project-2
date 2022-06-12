import { BASE_URL } from "./constants/api.js";
import createProducts from "./ui/displayProducts.js";
import searchFunction from "./ui/searchProducts.js";

const container = ".products_container";

async function fetchProducts() {
  try {
    const request = await fetch(BASE_URL + "api/products?populate=*");

    const response = await request.json();

    const res = response.data;

    createProducts(res, container);
    searchFunction(res, container);
  } catch (err) {
    console.log(err);
  }
}

fetchProducts();
