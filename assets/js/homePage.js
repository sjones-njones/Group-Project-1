$(function(){
var btnSubmitEl = $(".btnSubmit");
var btnFindAHouseEl = $(".btnFindAHouse");

function pageRedirect() {
var yourHouseEl = document.createElement('a');
yourHouseEl.setAttribute('href', './secondPage.html');
btnSubmitEl.appendchild(yourHouseEl);

}

// function formFindAHouseHandler(){




  



$(btnSubmitEl).on("click", pageRedirect); 
// $(btnFindAHouseEl).on("click", formFindAHouseHandler);  
});