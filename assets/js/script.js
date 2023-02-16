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
winsEl.innerHTML = wins;
lossesEl.innerHTML = losses;
timerEl.innerHTML = timer;

// var wordsBank = {
//     word1: "javascript",
//     word2: "boolean",
//     word3: "function",
//     word4: "argument",
//     word5: "document",
//     count: 5,
// };

var wordsBank = ["javascript", "boolean", "function", "argument", "document"];

// ////////////////////////////////////////////

function displayWord() {
    originalWord = wordsBank[Math.floor(Math.random() * wordsBank.length)];
    var tempWord = hideRandomLetters(originalWord);
    gameEl.textContent = tempWord;
    return tempWord;
};

function hideRandomLetters(word) {
    var tempWord = "";
    for(var i = 0; i < word.length; i++) {
        var rndNumber = Math.floor(Math.random() * 2);
        if(rndNumber === 0) tempWord += word[i];
        else tempWord += "_";
    }
    return tempWord;
};
function endOfGame() {
    gameEl.textContent = originalWord;
    btnEl.disabled = false;
    winsEl.innerHTML = wins;
    lossesEl.innerHTML = losses;
    timerEl.innerHTML = 10;
    userAnswerEl.value = "";
};

btnEl.addEventListener("click", function() {
    btnEl.disabled = true;
    var gameStatus = true;
    var timeLeft = timer;

    tempWord = displayWord();
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        var answer = userAnswerEl.value;

        if(answer.toLowerCase() === originalWord) {
            gameStatusEl.textContent = "Correct! You won.";
            clearInterval(timeInterval);
            wins++;
            endOfGame();
        }
        if(timeLeft === 0) {
            clearInterval(timeInterval);
            gameStatusEl.textContent = "Time's up! You lose.";
            gameStatus = false;
            losses++;
            endOfGame();
        };
        
    }, 1000);
});

