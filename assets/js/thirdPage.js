// defining variables 
var tryAgain = document.querySelector('#tryAgainBtn');
var goBackHomeBtn = document.querySelector('#homeBtn');
var i = 0;

// getting items from local storage
var sentPriceHouse = localStorage.getItem("randomHouses");
sentPriceHouse = JSON.parse(sentPriceHouse);

// renders items to screen
function showResultsPrice() {
  document.getElementById('inputRangeEl').textContent = "You have " + sentPriceHouse[i].bitCoinInput;
  document.getElementById('imageEl').src = sentPriceHouse[i].imgSrc;
  document.getElementById('addressEl').textContent = sentPriceHouse[i].address;
  document.getElementById('priceEl').textContent = "House Value: $" + new Intl.NumberFormat('en-US').format(sentPriceHouse[i].price)
    + " = " + sentPriceHouse[i].bcPrice;
};
if (i < sentPriceHouse.length - 1) {
  i++;
} else {
  i = 0;
}

// clears storage and returns to home page
function clearStorage() {
  document.location.replace("./index.html");
  localStorage.removeItem("randomHouses");
}


showResultsPrice();
tryAgain.addEventListener("click", showResultsPrice);
goBackHomeBtn.addEventListener("click", clearStorage);