const button = document.querySelector("button");
button.addEventListener("pointerover", (target) => {
  button.style.backgroundColor = "black";
  button.style.color = "white";
});
button.addEventListener("pointerout", () => {
  button.style.backgroundColor = "white";
  button.style.color = "black";
});

const googleButton = document.getElementById("googleButton");
googleButton.addEventListener("pointerover", (target) => {
  googleButton.style.backgroundColor = "black";
  googleButton.style.color = "white";
});
googleButton.addEventListener("pointerout", () => {
  googleButton.style.backgroundColor = "white";
  googleButton.style.color = "black";
});
googleButton.onclick = () => {
  location.assign("/auth/google");
};
