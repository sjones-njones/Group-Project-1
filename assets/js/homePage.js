$(function(){
var btnSubmitEl = $(".btnSubmit");
var btnFindAHouseEl = $(".btnFindAHouse");

function formSubmitHandler(event) {
  event.preventDefault();
 
  }
  
  
  function formFindAHouseHandler(event){
    event.preventDefault();

  }
  
    
  
  
  
  $(btnSubmitEl).on("click", formSubmitHandler); 
  $(btnFindAHouseEl).on("click", formFindAHouseHandler);  
});