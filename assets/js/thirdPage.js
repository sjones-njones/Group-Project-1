
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

//localStorage.getItem("randomHouses");
//localStorage.setItem("Thisisatest", 'abc');

localStorage.getItem("Thisisatest", testvalue);
console.log(localStorage.getItem("Thisisatest"));
//console.log(localStorage.getItem("randomHouses"));
console.log(localStorage.getItem("Thisisatest", ));

var pictureHere = document.querySelector('.Picture-here')

var formSubmitHandler = function () {

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

      var addressInfo = document.createElement('p');

      const tryAgain = document.getElementById("tryAgain");
      tryAgain.addEventListener("click", showResultsPrice);

      function showResultsPrice() {

       document.getElementById('image').src = data.props[i].imgSrc;

       document.getElementById('addressEl').textContent = data.props[i].address + " " + data.props[i].zpid;

       document.getElementById('saleEl').textContent = " This property currently is " + data.props[i].listingStatus;

       document.getElementById('priceEl').textContent = "$" + data.props[i].price;

        if (i < data.props.length - 1){
          i++;
        } else {
          i = 0;
        }


      }

      window.addEventListener("load", showResultsPrice());

    };

    var goBackHomeBtn = document.querySelector('#homeBtn');

    goBackHomeBtn.addEventListener(clearStorage());

    clearStorage(){
      localStorage.removeItem("Thisisatest");
     // localStorage.removeItem("randomHouses");
    }
    

//https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=patuxentAve.BroomesIslandMaryland20615&home_type=Houses0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6

//var keyword = getitem(keyword);

//keyword.data.props[i].imgScr

// data recieved should be a list of addresses ~= to bitcoin value

// fetch api request for images of houses

