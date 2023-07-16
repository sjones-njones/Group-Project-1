var pictureHere = document.querySelector('.Picture-here')

var formSubmitHandler = function () {

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

      var i= 0;

      var addressInfo = document.createElement('p');

      const tryAgain = document.getElementById("tryAgain");
      tryAgain.addEventListener("click", searchCityWeatherInput);

      function searchCityWeatherInput() {

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

      window.addEventListener("load", searchCityWeatherInput());

    });

    };

//===========//

$(function () {


  function goHome(){
    localStorage.removeItem("randomHouses");
    document.location.replace("./index.html");
  }
  
  
  
  
  $("#homeBtn").on("click", goHome);
  });
  

