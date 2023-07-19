
var i = 0;

var sentPriceHouse = localStorage.getItem("randomHouses");
sentPriceHouse = JSON.parse(sentPriceHouse);
  
    function showResultsPrice() { 
      console.log(sentPriceHouse[i]);

      document.getElementById('inputRangeEl').textContent = "You have " + sentPriceHouse[i].bitCoinInput;

      document.getElementById('imageEl').src = sentPriceHouse[i].imgSrc;

     document.getElementById('addressEl').textContent =  sentPriceHouse[i].address;

     document.getElementById('priceEl').textContent = "House Value: $" + sentPriceHouse[i].price + " = " + sentPriceHouse[i].bcPrice;

      if (i < sentPriceHouse.length - 1){
        i++;
      } else {
        i = 0;
      }

    }
    showResultsPrice();

    var tryAgain = document.querySelector('#tryAgainBtn');
    tryAgain.addEventListener("click", showResultsPrice);


    var goBackHomeBtn = document.querySelector('#homeBtn');

    goBackHomeBtn.addEventListener("click", clearStorage);

    function clearStorage(){
      document.location.replace("./index.html");
      localStorage.removeItem("randomHouses");
    }
   
  