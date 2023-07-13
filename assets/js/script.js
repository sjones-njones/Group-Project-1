
fetch ("https://rest.coinapi.io/v1/exchangerate/BTC/USD", {
  headers: {'X-CoinAPI-Key': '406DA5B8-4FA9-4947-81FE-5A06619B3BB3'}
})
.then(function(response) {
  return response.json()
})
.then(function(data) {
console.log(data);
});

fetch ('https://zillow-com1.p.rapidapi.com/property?zpid=2080998890', {
headers: {'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'}
})
.then(function(response) {
  return response.json()
})
.then(function(data) {
console.log(data);
});



