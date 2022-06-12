const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  saveToLocal(tokenKey, token);
}

export function getToken() {
  return getFromLocal(tokenKey);
}

export function saveUser(user) {
  saveToLocal(userKey, user);
}

function saveToLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocal(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }

  return JSON.parse(value);
}
