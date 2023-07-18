
var i = 0;

var sentPriceHouse = localStorage.getItem("randomHouses");
sentPriceHouse = JSON.parse(sentPriceHouse);

  
      console.log(sentPriceHouse);
      console.log(sentPriceHouse[i]);


    function showResultsPrice() { 
      console.log(sentPriceHouse[i]);

      document.getElementById('inputRangeEl').textContent = "This is the BitCoin you have " + sentPriceHouse[i].bitCoinInput;

      document.getElementById('imageEl').src = sentPriceHouse[i].imgSrc;

     document.getElementById('addressEl').textContent =  sentPriceHouse[i].address + " " + sentPriceHouse[i].zipCode;

     document.getElementById('priceEl').textContent = "This is worth $" + sentPriceHouse[i].price + " and coverted to BitCoin is " + sentPriceHouse[i].bcPrice.toFixed(2);

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
   
  