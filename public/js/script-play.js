//Display quote
const displayQuote = () => {
  let quote = document.getElementById("quote").value;
  let color = document.getElementById("color").value;
  let bgColor = document.getElementById("bgcolor").value;
  let quoteDisplay = document.getElementById("quote-display");

  quoteDisplay.innerHTML = `" ${quote} "`;
  quoteDisplay.style.color = color;
  quoteDisplay.style.backgroundColor = bgColor;
};

//Load jQuery
$(function () {
  $("#quote").keyup(() => {
    displayQuote();
  });
  $("#color").change(() => {
    displayQuote();
  });
  $("#bgcolor").change(() => {
    displayQuote();
  });
});
