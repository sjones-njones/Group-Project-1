$(function () {

function goHome(){
  localStorage.removeItem("randomHouses");
  document.location.replace("./index.html");
}


$("#homeBtn").on("click", goHome);
});
