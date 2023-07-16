$(function () {


  function goHome(){
    document.location.replace("./index.html");
  }
 
  function getItems(){
  var myHouseEl  = JSON.parse(localStorage.getItem("myHouse"));
var bitcoinValueEl = $(".bitcoinValue");
console.log(myHouseEl);
(bitcoinValueEl).text(myHouseEl.bitcoinHouseValue + " bitcoins");
var pictureEl = $("#picture");
$(pictureEl).attr("src", myHouseEl.pic);
 }


 getItems();
  $("#homeBtn").on("click", goHome);
  });



