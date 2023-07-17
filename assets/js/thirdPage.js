var Test = localStorage.getItem("Thisisatest");
console.log(Test);



var pictureHere = document.querySelector('.Picture-here')

var i = 0;

var sentPriceHouse = localStorage.getItem("randomHouses");
sentPriceHouse = JSON.parse(sentPriceHouse);

  
      console.log(sentPriceHouse);


    function showResultsPrice() { 

      document.getElementById('inputRangeEl').textContent = "This is the BitCoin you have " + sentPriceHouse[0]. bitCoinInput;

     document.getElementById('imageEl').src = sentPriceHouse[i].imgSrc;

     document.getElementById('addressEl').textContent =  sentPriceHouse[i].address + " " + sentPriceHouse[i].zipCode;

     document.getElementById('saleEl').textContent = " This property currently is " + sentPriceHouse[i].forSale;

     document.getElementById('priceEl').textContent = "This is worth $" + sentPriceHouse[i].price + " and coverted to BitCoin is " + sentPriceHouse[i].bcPrice;

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
      localStorage.removeItem("Thisisatest");
      localStorage.removeItem("randomHouses");
    }
   