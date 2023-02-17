var winsEl = document.querySelector("#wins");
var lossesEl = document.querySelector("#losses");
var timerEl = document.querySelector("#timer");
var gameEl = document.querySelector("#game");
var btnEl = document.querySelector("#btn-start");
var gameStatusEl = document.querySelector("#game-status");
var userAnswerEl = document.querySelector("#answer-box");

var wins = 0;
var losses = 0;
var timer = 10;
var originalWord = "";

var wordsBank = ["javascript", "boolean", "function", "argument", "document"];

renderLastResults();

function renderLastResults() {
    var savedWins = localStorage.getItem("wins");
    var savedLosses = localStorage.getItem("losses");
    if(savedWins > 0) wins = savedWins;
    if(savedLosses > 0) losses = savedLosses;
    renderGameStatistics();
};

function renderGameStatistics() {
    timer = 10;
    winsEl.innerHTML = wins;
    lossesEl.innerHTML = losses;
    timerEl.innerHTML = timer;
};

function endOfGame() {
    gameEl.textContent = originalWord;
    btnEl.disabled = false;
    renderGameStatistics();
    userAnswerEl.value = "";
    localStorage.setItem("wins",wins);
    localStorage.setItem("losses",losses);
};

// MAIN GAME CODE 
function keyDownAction(event) {
    var pressedKey = event.key
    // console.log("pressedKey: " + pressedKey);
    // for(var i = 0; i < tempWord.length; i++){
    //     if(pressedKey === originalWord[i]) {
    //         tempWord[i] = pressedKey;
    //         console.log("org i: " + originalWord[i]);
    //     };
    // };
    return pressedKey;
};

btnEl.addEventListener("click", function() {
    btnEl.disabled = true;
    // var gameStatus = true;
    var timeLeft = timer;

    tempWord = setWord();
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        var answer = userAnswerEl.value;
        pressedKey = document.addEventListener("keydown", keyDownAction);
        console.log(pressedKey);

        // if(answer.toLowerCase() === originalWord) {
        //     gameStatusEl.textContent = "Correct! You won.";
        //     clearInterval(timeInterval);
        //     wins++;
        //     endOfGame();
        // };

        
        if(timeLeft === 0) {
            clearInterval(timeInterval);
            gameStatusEl.textContent = "Time's up! You lose.";
            // gameStatus = false;
            losses++;
            endOfGame();
        };
        
    }, 1000);
});

function setWord() {
    originalWord = wordsBank[Math.floor(Math.random() * wordsBank.length)];
    var tempWord = "";
    for(var i = 0; i !== originalWord.length; i++) tempWord += "_";
    gameEl.textContent = tempWord;
    return tempWord;
};


// function hideRandomLetters(word) {
//     var tempWord = "";
//     for(var i = 0; i < word.length; i++) {
//         var rndNumber = Math.floor(Math.random() * 2);
//         if(rndNumber === 0) tempWord += word[i];
//         else tempWord += "_";
//     }
//     return tempWord;
// };

// function displayWord() {
//     originalWord = wordsBank[Math.floor(Math.random() * wordsBank.length)];
//     var tempWord = hideRandomLetters(originalWord);
//     gameEl.textContent = tempWord;
//     return tempWord;
// }