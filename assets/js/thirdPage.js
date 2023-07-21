// Modal Define 
var modalEl = $(".modal");
var modalTxtEl = $(".message-body");
var modalClose = $(".modal-close");


var i = 0

function showResultsPrice() {

  var sentPriceHouse = JSON.parse(localStorage.getItem("randomHouses"));

  //If a list cannot generate from a user input value, it will put out alternative text
  if (sentPriceHouse.length == 0) { 

    document.getElementById('inputRangeEl').textContent = "OOF we we're not able to find any houses meeting your budget";
    document.getElementById('imageEl').src = "./assets/images/piggy.jpg";
    document.getElementById('addressEl').textContent = "Give it another try below!"

  } else {

    document.getElementById('inputRangeEl').textContent = "You have " + sentPriceHouse[i].bitCoinInput;

    document.getElementById('imageEl').src = sentPriceHouse[i].imgSrc;

    document.getElementById('addressEl').textContent = sentPriceHouse[i].address;

    document.getElementById('priceEl').textContent = "House Value: $" + new Intl.NumberFormat('en-US').format(sentPriceHouse[i].price)
      + " = " + sentPriceHouse[i].bcPrice;

      // Instead of a for loop, the tryAgain button will add to i, moving to the next item in the list
    if (i < sentPriceHouse.length - 1) { 
      i++;
    } else {
      i = 0;
    }
  }
};

showResultsPrice();

var tryAgain = document.querySelector('#tryAgainBtn');

tryAgain.addEventListener("click", showResultsPrice);


var goBackHomeBtn = document.querySelector('#homeBtn');

// going back to the home will also clear the storage generated
goBackHomeBtn.addEventListener("click", clearStorage); 

function clearStorage() {
  document.location.replace("./index.html");
  localStorage.removeItem("randomHouses");
}


showResultsPrice();
tryAgain.addEventListener("click", showResultsPrice);
goBackHomeBtn.addEventListener("click", clearStorage);