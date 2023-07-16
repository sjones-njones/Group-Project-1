

$(function () {
  // for the dropdowns in html
  var myOptions = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
  var stateSelect = $('#state-select');
  var randomSelect = $('#random-select');
  var addressContainer = $('#previous-search-container');



  // finds current bc value and uses it to convert house value to bitcoin (see line 20)
  function getBitcoinVal(zestimateEl, housepicEl) {
    fetch("https://rest.coinapi.io/v1/exchangerate/BTC/USD", {
      headers: { 'X-CoinAPI-Key': '406DA5B8-4FA9-4947-81FE-5A06619B3BB3' }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        var rateEl = data.rate.toFixed(2);
        console.log(zestimateEl);
        console.log(rateEl);
        bcValue = (zestimateEl / rateEl).toFixed(0);
        console.log(bcValue);
        var myHouseObject = {
          pic: housepicEl,
          bitcoinHouseValue: bcValue
        };
        localStorage.setItem("myHouse", JSON.stringify(myHouseObject));
        document.location.replace("./secondPage.html");
      });
  }


  // gathers info from random input box
  function formRandomSubmitHandler(event, rateEl) {
    event.preventDefault();
    var staterandomEl = $(randomSelect).val().trim();
    var cityRandom = $('#city-random').val().trim();
    var randomAddress = cityRandom + staterandomEl;
    var bitcoinInputEl = $("#bitcoin-input").val().trim();
    console.log(bitcoinInputEl);
    bitcoinUser(bitcoinInputEl, randomAddress);
  }




  //  uses bitcoin api to define parameters for amount user can spend
  function bitcoinUser(bitcoinInputEl, randomAddress) {
    fetch("https://rest.coinapi.io/v1/exchangerate/BTC/USD", {
      headers: { 'X-CoinAPI-Key': '406DA5B8-4FA9-4947-81FE-5A06619B3BB3' }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data.rate);
        var rateEl = data.rate;
        maxPrice = (bitcoinInputEl * rateEl).toFixed(0);
        console.log(maxPrice);
        locationSearch(randomAddress, maxPrice, rateEl);
      });
  }




  //sets parameters for house search  
  function locationSearch(randomAddress, maxPrice, rateEl) {
    const url = 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=' + randomAddress + '&home_type=Houses&sort=Price_High_Low&maxPrice=' + maxPrice;
    fetch(url, {
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
        var priceArray = [];
        for (let i = 0; i < data.props.length; i++) {
          var cart = {
            address: data.props[i].address,
            price: data.props[i].price,
            bcPrice: (data.props[i].price) / rateEl,
            imgSrc: data.props[i].imgSrc
          };
          priceArray.push(cart);
        }
        console.log(priceArray);
        localStorage.setItem("randomHouses", JSON.stringify(priceArray));
        document.location.replace("./thirdPage.html");
      });
  }





  // gets user input for address
  var formSubmitHandler = function (event) {
    event.preventDefault();
    var streetEl = $("#street-address").val().trim();
    var aptEl = $("#apt-number").val().trim();
    var cityEl = $("#city-address").val().trim();
    var stateEl = $("#state-select").val().trim();
    var zipEl = $("#zip-address").val().trim();
    var addressEl = streetEl + aptEl + " " + cityEl + " " + stateEl + " " + zipEl;
    useAddress(addressEl);
    saveLastAddress(addressEl);
    renderAddressButtons();

  }

  function saveLastAddress(addressEl) {
    if (!searchedAddressArray.includes(addressEl)) {
      searchedAddressArray.unshift(addressEl);
      if (searchedAddressArray.length > 3) {
        searchedAddressArray.pop();
      }
      localStorage.setItem("myAddress", JSON.stringify(searchedAddressArray));
    }
  }


  var searchedAddressArray = JSON.parse(localStorage.getItem("myAddress")) || [];
  function renderAddressButtons() {
    var storedAddresses = JSON.parse(localStorage.getItem("myAddress"));
    if (storedAddresses !== null) {
      $(addressContainer).text("");
      for (var i = 0; i < storedAddresses.length; i++) {
        var button = document.createElement("button");
        $(button).text(storedAddresses[i]);
        $(button).addClass("storedButtons");
        $(addressContainer).append(button);
      }
    }
    else {
      return;
    }
  }
var addressEl;
    // gives previous searched address buttons functionality
    function handleButtons(event) {
      var btnClicked = $(event.target);
      var contents = btnClicked[0].textContent;
      console.log(contents);
      $(addressEl).text(contents);
      useAddress(contents);
    }


  // uses user address to get zpid
  function useAddress(addressVariable) {
    fetch('https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=' + addressVariable + '&home_type=Houses?per_page=100&page=1', {
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




  // uses zpid to get house value
  function getValue(zpidEl) {
    fetch('https://zillow-com1.p.rapidapi.com/property?zpid=' + zpidEl, {
      headers: {
        'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        var housepicEl = data.imgSrc;
        var zestimateEl = data.zestimate;
        getBitcoinVal(zestimateEl, housepicEl);
      });
  }




  // for state dropdown list
  $.each(myOptions, function (index, option) {
    var optionEl = $("<option>");
    $(optionEl).text(option);
    var randomOptionEl = $("<option>");
    randomOptionEl.text(option)
    $(stateSelect).append(optionEl);
    $(randomSelect).append(randomOptionEl);
  });

  function init() {
    renderAddressButtons();
  }

  init();
  // submit button for address input
  $(".btnSubmit").on("click", formSubmitHandler);
  $("#btnRandomSubmit").on("click", formRandomSubmitHandler);
  $(addressContainer).on("click", "button", handleButtons);
});


