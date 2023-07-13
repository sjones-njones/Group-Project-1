// $(function(){
// var btnSubmitEl = $(".btnSubmit");
// var btnFindAHouseEl = $(".btnFindAHouse");

// function formSubmitHandler(event) {
//   event.preventDefault();
 
//   }
  
  
//   function formFindAHouseHandler(event){
//     event.preventDefault();

//   }
  
    
  
  
  
//   $(btnSubmitEl).on("click", formSubmitHandler); 
//   $(btnFindAHouseEl).on("click", formFindAHouseHandler);  
// });



const https = require('https');
 
var options = {
  "method": "GET",
  "hostname": "rest.coinapi.io",
  "path": "/v1/exchangerate/BTC/USD",
  "headers": {'X-CoinAPI-Key': '149048D1-0422-4874-814A-2D1BCE0DFDB3'}
};
 
var request = https.request(options, function (response) {
  var chunks = [];
  response.on("data", function (chunk) {
    chunks.push(chunk);
  });
});
 
request.end();

console.log(request);