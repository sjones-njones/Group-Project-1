$(function(){
  var myOptions = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
  var stateSelect = $('#state-select');
  var randomSelect = $('#random-select');


fetch("https://rest.coinapi.io/v1/exchangerate/BTC/USD", {
  headers: { 'X-CoinAPI-Key': '406DA5B8-4FA9-4947-81FE-5A06619B3BB3' }
})
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log(data);
  });

fetch('https://zillow-com1.p.rapidapi.com/property?zpid=2080998890', {
  headers: {
    'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
    'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
  }
})
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log(data);
  });


fetch('https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=santa%20monica%2C%20ca&home_type=Houses', {
  headers: {
    'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
    'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
  }
})
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log(data);
  });


$.each(myOptions, function (index, option) {
  console.log(index);
  console.log(option);
  var optionEl = $("<option>");
  $(optionEl).text(option);
  var randomOptionEl = $("<option>");
  randomOptionEl.text(option)
  $(stateSelect).append(optionEl);
  $(randomSelect).append(randomOptionEl);
});

});