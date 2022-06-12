const form = document.querySelector("form");

const name = document.querySelector("#username");
const nameError = document.querySelector("#usernameError");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

const formButton = document.querySelector("button");

function checkValue(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateLogin() {
  event.preventDefault();

  if (checkValue(name.value, 1) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
  if (checkValue(password.value, 1) === true) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }
}

form.addEventListener("submit", validateLogin);