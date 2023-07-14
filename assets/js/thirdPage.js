/*

    fetch('https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=' + addressEl + '&home_type=Houses', {
      headers: {
        'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        var zpidEl = data.zpid;
        getValue(zpidEl);
      });
  }


Math.floor(Math.random() * 10); <-- may not use as we could just run a for loop
through an array put into local storage

do getItam key word 

then find the arraay/index and a for loop 

use an api to fetch data for different images, use id to equal to id of photo

if statment to print photo

have addeventListner to the button to contiue the array length and 
display info i.e. address, street name, zip etc




function{

var houseBitCoinValue = localStorage.getItem()

console.log(houseBitCoinValue);

houseBitCoinValue.

}

*/

fetch('https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=' + addressEl + '&home_type=Houses', {
    headers: {
      'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    }
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      var zpidEl = data.zpid;
      getValue(zpidEl);
    });

/*
function getBitcoinVal(){
    fetch("https://rest.coinapi.io/v1/exchangerate/BTC/USD", {
      headers: { 'X-CoinAPI-Key' : '406DA5B8-4FA9-4947-81FE-5A06619B3BB3' }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        var rateEl = data.rate.toFixed(2);
        console.log (zestimateEl);
        console.log (rateEl);
        bcValue = zestimateEl/rateEl;
        console.log(bcValue);
      });
      }

      getBitcoinVal();

      */