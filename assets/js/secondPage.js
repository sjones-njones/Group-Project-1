$(function () {

  function goHome(){
    document.location.replace("./index.html");
  }
  
  
  $("#homeBtn").on("click", goHome);
  });