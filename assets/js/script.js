
var wordArray = ["javascript", "function","variable","loop","object","boolean"];


var wordInput = document.querySelector("#word");

var startButton = document.querySelector("#start_button");
var timerEl = document.querySelector("#timerCount");
var win = document.querySelector("#wins");
var lose = document.querySelector("#loses");
var wordBlank = document.querySelector("#result_msg");
var resetButton = document.querySelector("#reset_button");


var sWord = "";
var dashStr = "";
var winCounter = 0; var loseCounter = 0;  var timerCount = 10;
var isWin = false;
/*var msgDiv = document.querySelector("#msg");

}*/

startButton.addEventListener('click', setWord);

function setWord(){
  timerCount = 10;
  isWin = false;
  startButton.disabled = true;
  var windex = Math.floor((Math.random() * wordArray.length));  // +1
  sWord = wordArray[windex];
  var lw = sWord.length;
  var str = "-";
  dashStr = str.repeat(lw);
  console.log("selected word :" + sWord);
  wordInput.value =  dashStr;
  wordInput.focus();
  timerEl.textContent = timerCount;
  startTimer();
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  var timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}


wordInput.addEventListener("keydown",function(event){
  //event.stopPropagation();
  event.preventDefault();
  if(timerCount <= 0){return false;}
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  if (alphabetNumericCharacters.includes(key)) {
   // console.log("selected letter : " + key);
    if(sWord.indexOf(key) > -1){
      var lIndex = sWord.indexOf(key);
      dashStr = replaceChar(sWord, dashStr, key, lIndex)
     // console.log("rep-dash : " + dashStr);
      wordInput.value =  dashStr;
      if(sWord.toLowerCase() === dashStr.toLowerCase()){
        isWin = true;
      }else{
        wordInput.focus();
      }
    
    }
  }

  

});
function replaceChar(origWord, dashString, replaceChar, index) {
  origWord = origWord.toLowerCase();
  
  let wArray = origWord.split('');
  let DashArray = dashString.split('');
  for(var i=0; i<wArray.length; i++){
    if(wArray[i] === replaceChar){
      DashArray[i] = replaceChar;
    }
  }
  let newString = DashArray.join('');
  return newString;
}

function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

resetButton.addEventListener('click', function(){
  loseCounter = 0;  winCounter = 0
  localStorage.setItem("winCount", winCounter);
  localStorage.setItem("loseCount", loseCounter);
  win.textContent = winCounter;
  lose.textContent = loseCounter;
});

function init(){
  winCounter = localStorage.getItem("winCount");
  if(winCounter === ""){winCounter = 0}
  loseCounter = localStorage.getItem("loseCount");
  if(loseCounter === ""){loseCounter = 0}
  win.textContent = winCounter;
  lose.textContent = loseCounter;
}
init();