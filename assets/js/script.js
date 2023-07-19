$(function () {
  // for the dropdowns in html
  var myOptions = { "": "", "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
  var myCurrencyOptions = { "": "Choose a currency", "BTC": "Bitcoin", "ETH": "Ethereum", "DOGE": "Dogecoin" }
  var stateSelect = $('#state-select');
  var randomSelect = $('#random-select');
  var addressContainer = $('#previous-search-container');

  // finds current bc value and uses it to convert house value to bitcoin (see line 20)
  function getBitcoinVal(zestimateEl, housepicEl, addressSite, currencyCode) {
    console.log(currencyCode);
    fetch("https://rest.coinapi.io/v1/exchangerate/" + currencyCode + "/USD", {
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
        if (currencyCode === "BTC") {
          var unit = " Bitcoin";
        } else if (currencyCode === "ETH") {
          var unit = " Ethereum";
        } else {
          var unit = " Dogecoin";
        }
        var myHouseObject = {
          address: addressSite,
          pic: housepicEl,
          bitcoinHouseValue: new Intl.NumberFormat('en-US').format(bcValue) + unit
        };
        localStorage.setItem("myHouse", JSON.stringify(myHouseObject));
        document.location.replace("./secondPage.html");
      });
  }


  //  uses bitcoin api to define parameters for amount user can spend
  function bitcoinUser(bitcoinInputEl, randomAddress, currencyCodeRandom, currencyInput, currencySelectRandom) {
    fetch("https://rest.coinapi.io/v1/exchangerate/" + currencyCodeRandom + "/USD", {
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
        locationSearch(randomAddress, maxPrice, rateEl, bitcoinInputEl, currencyInput, currencySelectRandom);
      });
  }

  // gathers info from random input box
  function formRandomSubmitHandler(event, rateEl) {
    event.preventDefault();
    var staterandomEl = $(randomSelect).val().trim();
    var cityRandom = $('#city-random').val().trim();
    var randomAddress = cityRandom + staterandomEl;
    var bitcoinInputEl = $("#bitcoin-input").val().trim();
    var currencySelectRandom = $("#currency-select-random").val().trim();
    var currencyInput = bitcoinInputEl + " " + currencySelectRandom;
    console.log(currencyInput);
    if (currencySelectRandom === "Bitcoin") {
      var currencyCodeRandom = "BTC";
    } else if (currencySelectRandom === "Ethereum") {
      var currencyCodeRandom = "ETH";
    } else {
      var currencyCodeRandom = "DOGE";
    }
    console.log(bitcoinInputEl);
    bitcoinUser(bitcoinInputEl, randomAddress, currencyCodeRandom, currencyInput, currencySelectRandom);
     }

  //sets parameters for house search  
  function locationSearch(randomAddress, maxPrice, rateEl, bitcoinInputEl) {
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
        if (bitcoinInputEl >= 1){
        var priceArray = [];
        for (let i = 0; i < data.props.length; i++) {
          var cart = {
            bitCoinInput: bitcoinInputEl,
            address: data.props[i].address,
            zipCode:  data.props[i].zpid,
            price: data.props[i].price,
            bcPrice: (data.props[i].price) / rateEl,
            imgSrc: data.props[i].imgSrc,
            currencyChoice:  $("#currency-select-random").val().trim()
          };
          priceArray.push(cart);
        } 
      } else if (bitcoinInputEl <= 1 ){
        var priceArray = [];
        for (let i = 0; i < 1; i++) {
          var cart = {
            bitCoinInput: (data.props[1].price - data.props[1].price),
            address: " You need more BitCoin ",
            zipCode: " ",
            price: " too much ",
            bcPrice: (data.props[1].price - data.props[1].price),
            imgSrc: "./assets/images/jamie-attfield-l306sgjOZtw-unsplash.jpg",
          };
          priceArray.push(cart);
        }
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
    console.log(stateEl);
    var zipEl = $("#zip-address").val().trim();
    var addressEl = streetEl + aptEl + " " + cityEl + " " + stateEl + " " + zipEl;
    var currencySelect = $("#currency-select").val().trim();
    console.log(currencySelect);
    var addressAndCurrency = {
      address: addressEl,
      currency: currencySelect
    }
    console.log(addressAndCurrency);
    useAddress(addressEl, currencySelect);
    saveLastAddress(addressAndCurrency);
  }

  function saveLastAddress(addressAndCurrency) {
    if (!searchedAddressArray.includes(addressAndCurrency)) {
      searchedAddressArray.unshift(addressAndCurrency);
      if (searchedAddressArray.length > 3) {
        searchedAddressArray.pop();
      }
      localStorage.setItem("myAddress", JSON.stringify(searchedAddressArray));
      renderAddressButtons();
    }
  }

  var searchedAddressArray = JSON.parse(localStorage.getItem("myAddress")) || [];

  function renderAddressButtons() {
    var storedAddresses = JSON.parse(localStorage.getItem("myAddress"));
    if (storedAddresses !== null) {
      $(".historic-container").removeClass("is-hidden");
      $(addressContainer).text("");
      for (var i = 0; i < storedAddresses.length; i++) {
        var button = document.createElement("button");
        $(button).text(storedAddresses[i].address + ", " + storedAddresses[i].currency);
        $(button).addClass(" button is-primary rounded m-1 p-2");
        $(addressContainer).append(button);
      }
    }
    else {
      return;
    }
  }
  var addressEl;
  var addressAndCurrency;
  var currencySelect;
  // gives previous searched address buttons functionality
  function handleButtons(event) {
    var btnClicked = $(event.target);
    var contents = btnClicked[0].textContent;
    var comma = ",";
    console.log(contents);
    console.log(typeof contents);
    const contentsArray = contents.split(comma);
    console.log(contentsArray);
    $(addressEl).text(contentsArray[0]);
    $(currencySelect).text(contentsArray[1]);
    var addressString = contentsArray[0].toString().trim();
    var currencyString = contentsArray[1].toString().trim();
    console.log(currencyString);
    console.log(addressString);
    useAddress(addressString, currencyString);
  }

  // uses user address to get zpid
  function useAddress(addressVariable, currencySelect) {
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
        getValue(zpidEl, currencySelect);
      });
  }

  // uses zpid to get house value
  function getValue(zpidEl, currencySelect) {
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
        var addressSite = data.address;
        var housepicEl = data.imgSrc;
        var zestimateEl = data.zestimate;

        if (currencySelect === "Bitcoin") {
          var currencyCode = "BTC";
        } else if (currencySelect === "Ethereum") {
          var currencyCode = "ETH";
        } else {
          var currencyCode = "DOGE";
        }
        console.log(currencyCode);
        getBitcoinVal(zestimateEl, housepicEl, addressSite, currencyCode);
      });
  }
  // // for currency dropdown list
  $.each(myCurrencyOptions, function (index, option) {
    var currencyOptionEl = $("<option>");
    var randomCurrencyOptionEl = $("<option>");
    $(currencyOptionEl).text(option);
    $(randomCurrencyOptionEl).text(option);
    $("#currency-select").append(currencyOptionEl);
    $("#currency-select-random").append(randomCurrencyOptionEl);
  });

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

  // submit button for address input
  $("#btnSubmit").on("click", formSubmitHandler);
  $("#btnRandomSubmit").on("click", formRandomSubmitHandler);
  $(addressContainer).on("click", "button", handleButtons);
  init();
});