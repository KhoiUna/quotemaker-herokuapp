const button = document.querySelector("button");
button.addEventListener("pointerover", (target) => {
  button.style.backgroundColor = "black";
  button.style.color = "white";
});
button.addEventListener("pointerout", () => {
  button.style.backgroundColor = "white";
  button.style.color = "black";
});
