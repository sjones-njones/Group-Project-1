$(function () {
  // for the dropdowns in html
  var myOptions = { "": "", "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
  var myCurrencyOptions = { "": "Choose a currency", "BTC": "Bitcoin", "ETH": "Ethereum", "DOGE": "Dogecoin" }
  var stateSelect = $('#state-select');
  var randomSelect = $('#random-select');
  var addressContainer = $('#previous-search-container');
  var addressEl;
  var addressAndCurrency;
  var currencySelect;

  // Modal Define 
  var modalEl = $(".modal");
  var modalTxtEl = $(".message-body");
  var modalClose = $(".modal-close");

  var searchedAddressArray = JSON.parse(localStorage.getItem("myAddress")) || [];

  // finds current bc value and uses it to convert house value to bitcoin 
  function getBitcoinVal(zestimateEl, housepicEl, addressSite, currencyCode) {
    fetch("https://rest.coinapi.io/v1/exchangerate/" + currencyCode + "/USD", {
      headers: { 'X-CoinAPI-Key': '3451CF48-8278-4C0F-B820-A91C2043A14E' }
    })
      .then(function (response) {
        if (response.ok) {
          return response.json()


            .then(function (data) {
              var rateEl = data.rate.toFixed(2);
              bcValue = (zestimateEl / rateEl).toFixed(0);
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

        } else {
          $(modalEl).addClass("is-active");
          $(modalTxtEl).text("We're sorry, something went wrong!")
        }

      })
      .catch(function (error) {
        $(modalClose).on('click', modalHandler);

      });

  }



  //  uses bitcoin api to define parameters for amount user can spend
  function bitcoinUser(bitcoinInputEl, randomAddress, currencyCodeRandom, currencyInput, currencySelectRandom) {
    fetch("https://rest.coinapi.io/v1/exchangerate/" + currencyCodeRandom + "/USD", {
      headers: { 'X-CoinAPI-Key': '3451CF48-8278-4C0F-B820-A91C2043A14E' }
    })

      .then(function (response) {
        if (response.ok) {
          return response.json()

            .then(function (data) {
              var rateEl = data.rate;
              maxPrice = (bitcoinInputEl * rateEl).toFixed(0);
              locationSearch(randomAddress, maxPrice, rateEl, bitcoinInputEl, currencyInput, currencySelectRandom);
            });
        } else {
          $(modalEl).addClass("is-active");
          $(modalTxtEl).text("We're sorry, something went wrong!")
        }

      })
      .catch(function (error) {
        $(modalClose).on('click', modalHandler);

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
    if (currencySelectRandom === "Bitcoin") {
      var currencyCodeRandom = "BTC";
    } else if (currencySelectRandom === "Ethereum") {
      var currencyCodeRandom = "ETH";
    } else {
      var currencyCodeRandom = "DOGE";
    }
    bitcoinUser(bitcoinInputEl, randomAddress, currencyCodeRandom, currencyInput, currencySelectRandom);
  }

  //sets parameters for house search  
  function locationSearch(randomAddress, maxPrice, rateEl, bitcoinInputEl, currencyInput, currencySelectRandom) {
    const url = 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=' + randomAddress + '&home_type=Houses&sort=Price_High_Low&maxPrice=' + maxPrice;
    fetch(url, {
      headers: {
        'Access-Control-Allow-Origin': 'https://sjones-njones.github.io',
        'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      }
    })
      .then(function (response) {
        if (response.ok) {
          return response.json()

            .then(function (data) {
              var priceArray = [];
              for (let i = 0; i < data.props.length; i++) {
                var cart = {
                  bitCoinInput: currencyInput,
                  address: data.props[i].address,
                  zipCode: data.props[i].zpid,
                  price: data.props[i].price,
                  bcPrice: ((data.props[i].price) / rateEl).toFixed(2) + " " + currencySelectRandom,
                  forSale: data.props[i].listingStatus,
                  imgSrc: data.props[i].imgSrc
                };
                priceArray.push(cart);
              }
              localStorage.setItem("randomHouses", JSON.stringify(priceArray));
              document.location.replace("./thirdPage.html");
            });
        } else {
          $(modalEl).addClass("is-active");
          $(modalTxtEl).text("We're sorry, something went wrong!")
        }

      })
      .catch(function (error) {
        $(modalClose).on('click', modalHandler);

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
    var currencySelect = $("#currency-select").val().trim();
    var addressAndCurrency = {
      address: addressEl,
      currency: currencySelect
    }
    useAddress(addressEl, currencySelect);
    saveLastAddress(addressAndCurrency);
  }

  // saves addresses
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

  // renders previous search buttons
  function renderAddressButtons() {
    var storedAddresses = JSON.parse(localStorage.getItem("myAddress"));
    if (storedAddresses !== null) {
      $(".historic-container").removeClass("is-hidden");
      $(addressContainer).text("");
      for (var i = 0; i < storedAddresses.length; i++) {
        var button = document.createElement("button");
        $(button).text(storedAddresses[i].address + ", " + storedAddresses[i].currency);
        $(button).addClass("button  is-link m-4");
        $(addressContainer).append(button);
      }
    }
    else {
      return;
    }
  }

  // gives previous searched address buttons functionality
  function handleButtons(event) {
    var btnClicked = $(event.target);
    var contents = btnClicked[0].textContent;
    var comma = ",";
    const contentsArray = contents.split(comma);
    $(addressEl).text(contentsArray[0]);
    $(currencySelect).text(contentsArray[1]);
    var addressString = contentsArray[0].toString().trim();
    var currencyString = contentsArray[1].toString().trim();
    useAddress(addressString, currencyString);
  }

  // uses user address to get zpid
  function useAddress(addressVariable, currencySelect) {
    fetch('https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=' + addressVariable + '&home_type=Houses?per_page=100&page=1', {
      headers: {
        'Access-Control-Allow-Origin': 'https://sjones-njones.github.io',
        'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      }
    })

      .then(function (response) {
        if (response.ok) {
          return response.json()

            .then(function (data) {
              var zpidEl = data.zpid;
              getValue(zpidEl, currencySelect);
            });
        } else {
          $(modalEl).addClass("is-active");
          $(modalTxtEl).text("We're sorry, something went wrong!")
        }

      })
      .catch(function (error) {
        $(modalClose).on('click', modalHandler);

      });
  }

  // uses zpid to get house value
  function getValue(zpidEl, currencySelect) {
    fetch('https://zillow-com1.p.rapidapi.com/property?zpid=' + zpidEl, {
      headers: {
        'Access-Control-Allow-Origin': 'https://sjones-njones.github.io',
        'X-RapidAPI-Key': '0e88e3b544msh53627318f7da7a0p18e841jsn5dd8f250f5f6',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      }
    })
      .then(function (response) {
        if (response.ok) {
          return response.json()

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
              getBitcoinVal(zestimateEl, housepicEl, addressSite, currencyCode);
            });
        } else {
          $(modalEl).addClass("is-active");
          $(modalTxtEl).text("We're sorry, something went wrong!")
        }

      })
      .catch(function (error) {
        $(modalClose).on('click', modalHandler);

      });
  }

  function modalHandler() {
    $(modalEl).removeClass('is-active');
  }

  // for currency dropdown list
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

  // runs when page loads
  function init() {
    renderAddressButtons();
  }

  // submit button for address input
  $(modalClose).on('click', modalHandler);
  $("#btnSubmit").on("click", formSubmitHandler);
  $("#btnRandomSubmit").on("click", formRandomSubmitHandler);
  $(addressContainer).on("click", "button", handleButtons);
  init();
});
