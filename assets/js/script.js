var winsEl = document.querySelector("#wins");
var lossesEl = document.querySelector("#losses");
var timerEl = document.querySelector("#timer");
var gameEl = document.querySelector("#game");
var btnEl = document.querySelector("#btn-start");
var gameStatusEl = document.querySelector("#game-status");

var wins = 0;
var losses = 0;
var timer = 10;
var originalWord = "";
var letterGuessed = "";
var blankWord = "";

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
    winsEl.innerHTML = wins;
    lossesEl.innerHTML = losses;
    timerEl.innerHTML = timer;
};

function endOfGame() {
    gameEl.textContent = originalWord;
    btnEl.disabled = false;
    renderGameStatistics();
    localStorage.setItem("wins",wins);
    localStorage.setItem("losses",losses);
};

// MAIN GAME CODE 
document.addEventListener("keydown", function(event) {
    if(timer === 0) return;

    var key = event.key.toLowerCase();
    var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
    if (alphabetNumericCharacters.includes(key)) letterGuessed = key;
    renderBlankWord();
});

function renderBlankWord() {
    for(i = 0; i < originalWord.length; i++) {
        if(originalWord[i] === letterGuessed) {
            blankWord = setCharAt(blankWord, i, letterGuessed);
            gameEl.textContent = blankWord;
        };
    };
};
btnEl.addEventListener("click", function() {
    btnEl.disabled = true;
    var timeLeft = timer;

    blankWord = setWord();
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(blankWord === originalWord) {
            clearInterval(timeInterval);
            gameStatusEl.textContent = "Correct! You won.";
            wins++;
            endOfGame();
        };

        if(timeLeft === 0) {
            clearInterval(timeInterval);
            gameStatusEl.textContent = "Time's up! You lose.";
            losses++;
            endOfGame();
        };
        
    }, 1000);
});

function setCharAt(str, index, chr) {
    if(index > str.length -1 ) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
};

function setWord() {
    originalWord = wordsBank[Math.floor(Math.random() * wordsBank.length)];
    for(var i = 0; i !== originalWord.length; i++) blankWord += "_";
    gameEl.textContent = blankWord;
    return blankWord;
};