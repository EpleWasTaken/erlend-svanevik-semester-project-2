export function getCurrentCartItems() {
  const added = localStorage.getItem("added");

  if (added === null) {
    return [];
  } else {
    return JSON.parse(added);
  }
}
