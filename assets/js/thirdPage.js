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

*/

var pictureHere = document.querySelector('.Picture-here')

var formSubmitHandler = function () {
  /*
  var streetEl = $("#street-address").val().trim();
  var aptEl = $("#apt-number").val().trim();
  var cityEl = $("#city-address").val().trim();
  var stateEl = $("#state-select").val().trim();
  var zipEl = $("#zip-address").val().trim();
 var addressEl = streetEl + aptEl + " " + cityEl + " " + stateEl + " " + zipEl
 */
 var addressEl = 'atlantaGeorgia';
  useAddress(addressEl);
}
formSubmitHandler();
//patuxentAve.BroomesIslandMaryland20615

// uses user address to get zpid
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

      addEventListener

      for(i=0; i < 8; i++){
      var imageHouse = data.props[i].imgSrc;
      displayimage(imageHouse);

      var addressInfo = document.createElement('p');
      addressInfo.textContent = data.props[i].zpid;
      pictureHere.append(data.props[i].zpid);

      }

      function displayimage(imageHouse){
        document.getElementById('image').src = imageHouse;
      }

    });
}

//https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=patuxentAve.BroomesIslandMaryland20615&home_type=Houses0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6

//var keyword = getitem(keyword);

//keyword.data.props[i].imgScr

// data recieved should be a list of addresses ~= to bitcoin value

// fetch api request for images of houses

