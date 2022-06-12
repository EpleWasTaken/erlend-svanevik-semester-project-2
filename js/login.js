import { jwtToken } from "./admin.js";
import { BASE_URL } from "./constants/api.js";
import displayMessage from "./utils/formMessage.js";
import { saveToken } from "./utils/localStorage.js";
import { saveUser } from "./utils/localStorage.js";

// const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message_container");
const button = document.querySelector("#login_btn");

button.addEventListener("click", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("warning", "Invalid values", ".message_container");
  }

  login(usernameValue, passwordValue);
}

async function login(username, password) {
  const url = BASE_URL + "api/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(data);

  try {
    const response = await fetch(url, options);
    console.log(response);
    const json = await response.json();
    console.log(json);

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      button.innerHTML = "Logging in...";

      window.location.href = "../html/admin_panel.html";
    }

    if (json.error) {
      displayMessage("error", "Wrong username/password", ".message_container");
    }

    console.log(json);
  } catch (err) {
    console.log(err);
  }
}
