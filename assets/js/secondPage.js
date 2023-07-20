$(function () {

  // returns to home page
  function goHome() {
    document.location.replace("./index.html");
  }

  // renders items to screen
  function getItems() {
    var myHouseEl = JSON.parse(localStorage.getItem("myHouse"));
    var bitcoinValueEl = $(".bitcoinValue");
    console.log(myHouseEl);
    (bitcoinValueEl).text(myHouseEl.bitcoinHouseValue);
    var pictureEl = $("#picture");
    $(pictureEl).attr("src", myHouseEl.pic);
    var addressString = myHouseEl.address.streetAddress + " " + myHouseEl.address.city + " " + myHouseEl.address.state + " " + myHouseEl.address.zipcode;
    $(".address").text(addressString);
  }

// click event and function call
  getItems();
  $("#homeBtn").on("click", goHome);
});
