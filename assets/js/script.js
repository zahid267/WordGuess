
var wordArray = ["javascript", "function","variable","loop","object"];


var wordInput = document.querySelector("#word");

var startButton = document.querySelector("#start");
var sWord = "";
var dashStr = "";
/*var msgDiv = document.querySelector("#msg");


renderLastRegistered();

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

function renderLastRegistered() {
  // TODO: Retrieve the last email and password and render it to the page
  var email = localStorage.getItem("email");
  var password = localStorage.getItem("password");
  emailInput.value = email;
  passwordInput.value = password;

}*/

startButton.addEventListener("click", function(event) {
  event.preventDefault();
  setWord();
});

function setWord(){
  var windex = Math.floor((Math.random() * wordArray.length));  // +1
  sWord = wordArray[windex];
  var lw = sWord.length;
  var str = "-";
  dashStr = str.repeat(lw);
  console.log("selected word :" + sWord);
  wordInput.value =  dashStr;
  wordInput.focus();

}
wordInput.addEventListener("keydown",function(event){
  event.stopPropagation();
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  if (alphabetNumericCharacters.includes(key)) {
    /*elements.forEach(function(element) {
      element.textContent += event.key;
    });*/
    console.log("selected letter : " + key);

    if(sWord.indexOf(key) > -1){
      var lIndex = sWord.indexOf(key);
      dashStr = replaceChar(dashStr, key, lIndex)
      console.log("rep-dash : " + dashStr);
      wordInput.value =  dashStr;
      wordInput.focus();
    
    }
  }

  

});
function replaceChar(origString, replaceChar, index) {
  let newStringArray = origString.split("");

  newStringArray[index] = replaceChar;

  let newString = newStringArray.join("");

  return newString;
}