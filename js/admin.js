import { BASE_URL } from "./constants/api.js";
import displayCurrentCartItems from "./ui/displayProducts.js";
import { getCurrentCartItems } from "./utils/favouritesFunction.js";
import { saveToken } from "./utils/localStorage.js";
import { saveUser } from "./utils/localStorage.js";

export const jwtToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

async function adminPanel() {
  try {
    const request = await fetch(BASE_URL + "api/products/?populate=*");

    const response = await request.json();

    const data = response.data;

    const container = document.querySelector(".admin_container");

    data.forEach((product) => {
      container.innerHTML += `<div class="admin_editor_container">
                              <a href="../html/productsDetails.html?id=${product.id}">
                              <img src="${product.attributes.image.data[0].attributes.url}" id="admin_editor_img" >
                              </a>
                              <div class="admin_editor_info">
                              <h3 class="admin_editor_title">${product.attributes.title}</h3>
                              <h5 class="admin_editor_price">${product.attributes.price} Nok</h5>
                              </div>
                              <button type="button" class="remove_products">Remove product</button>
                              <button type="button" class="edit_products">Edit product</button>
                              </div>`;

      const logoutBtn = document.querySelector(".nav-link.logout");

      logoutBtn.addEventListener("click", logout);

      function logout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location = "../html/login.html";
      }

      const remove = document.querySelector(".remove_products");

      remove.addEventListener("click", deleteProduct);

      async function deleteProduct() {
        try {
          await fetch(`${BASE_URL}/api/products/${product.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${jwtToken()}`,
            },
          });
        } catch (err) {
          console.log(err);
        }
      }
    });

    if (!jwtToken()) {
      window.location.href = "../html/login.html";
    }
  } catch (err) {
    console.log(err);
  }
}

async function addProduct(e) {
  e.preventDefault();
  const image = document.getElementById("image");

  image.onchange = () => {
    const selectedImage = image.files[0];
    console.log(selectedImage);
  };

  // const data = new FormData();
  // data.append("files.image");
  // data.append("data", JSON.stringify(data));

  // try {
  //   await fetch(`${BASE_URL}api/products`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${jwtToken()}`,
  //     },
  //     body: data,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
}

adminPanel();
