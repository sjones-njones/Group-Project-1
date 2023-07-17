
/*

plan of attack

Math.floor(Math.random() * 10); <-- may not use as we could just run a for loop
through an array put into local storage

do getItam key word 

then find the arraay/index and a for loop 

use an api to fetch data for different images, use id to equal to id of photo

if statment to print photo

have addeventListner to the button to contiue the array length and 
display info i.e. address, street name, zip etc

*/




var Test = localStorage.getItem("Thisisatest");
console.log(Test);



var pictureHere = document.querySelector('.Picture-here')

  /*
 var addressEl = 'orlandoFlorida';
  useAddress(addressEl);
}
formSubmitHandler();

function useAddress(addressEl) {
  
  fetch('https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=' + addressEl + '&home_type=Houses', {
    headers: {
      'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.props[12].zpid);
*/

      var i= 0;


    function showResultsPrice() { 

      var sentPriceHouse = localStorage.getItem("randomHouses");
sentPriceHouse = JSON.parse(sentPriceHouse);

      console.log(sentPriceHouse);

     document.getElementById('image').src = sentPriceHouse[i].imgSrc;

     document.getElementById('addressEl').textContent =  sentPriceHouse[i].address + " " + sentPriceHouse[i].zpid;

     document.getElementById('saleEl').textContent = " This property currently is " + sentPriceHouse[i].bcprice;

     document.getElementById('priceEl').textContent = "$" +sentPriceHouse[i].price;

      if (i < sentPriceHouse.length - 1){
        i++;
      } else {
        i = 0;
      }


    }
    showResultsPrice();

    const tryAgain = document.getElementById("#tryAgain");
    tryAgain.addEventListener("click", showResultsPrice);

    var goBackHomeBtn = document.querySelector('#homeBtn');

    goBackHomeBtn.addEventListener("click", clearStorage);

    function clearStorage(){
      localStorage.removeItem("Thisisatest");
      localStorage.removeItem("randomHouses");
    }
    

//https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=patuxentAve.BroomesIslandMaryland20615&home_type=Houses0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6

//var keyword = getitem(keyword);

//keyword.data.props[i].imgScr

// data recieved should be a list of addresses ~= to bitcoin value

// fetch api request for images of houses

