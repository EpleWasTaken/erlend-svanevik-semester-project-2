import createProducts from "./displayProducts.js";

export default function searchFunction(items, targetElement) {
  const search = document.querySelector(".search");

  search.onkeyup = function () {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredSearch = items.filter(function (item) {
      if (item.attributes.title.toLowerCase().includes(searchValue)) {
        return true;
      }
    });
    createProducts(filteredSearch, targetElement);
  };
}
