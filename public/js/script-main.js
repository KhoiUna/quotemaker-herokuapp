//Change username's color randomly
const usernameColor = () => {
  function random() {
    return Math.floor(Math.random() * 255);
  }
  document.getElementById(
    "username"
  ).style.color = `rgb(${random()}, ${random()},${random()} )`;
};
usernameColor();

//Hover buttons
const addButton = document.querySelector("#add");
addButton.addEventListener("pointerover", () => {
  addButton.style.backgroundColor = "black";
  addButton.style.color = "white";
});
addButton.addEventListener("pointerout", () => {
  addButton.style.backgroundColor = "rgb(214, 213, 213)";
  addButton.style.color = "black";
});
