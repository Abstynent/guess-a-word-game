// Declaration of all DOM elements
var winsEl = document.querySelector("#wins");
var lossesEl = document.querySelector("#losses");
var timerEl = document.querySelector("#timer");
var gameEl = document.querySelector("#game");
var btnStartEl = document.querySelector("#btn-start");
var btnResetEl = document.querySelector("#btn-reset");
var gameStatusEl = document.querySelector("#game-status");

// Declarations of all needed variables
var wins = 0;
var losses = 0;
var timer = 10;
var originalWord = "";
var letterGuessed = "";
var blankWord = "";
// Declaration of string containing all words used in the game
var wordsBank = ["javascript", "boolean", "function", "argument", "document"];

// Declare function to update game statistics from localStorage
function renderLastResults() {
    var savedWins = localStorage.getItem("wins");
    var savedLosses = localStorage.getItem("losses");
    if(savedWins > 0) wins = savedWins;
    if(savedLosses > 0) losses = savedLosses;
    renderGameStatistics();
};

// Declare function to render last statistics on the page
function renderGameStatistics() {
    winsEl.innerHTML = wins;
    lossesEl.innerHTML = losses;
    timerEl.innerHTML = timer;
};

// Declare function to prepare string of "_" that will be displayed on the page
function setWord() {
    blankWord = "";
    originalWord = wordsBank[Math.floor(Math.random() * wordsBank.length)];
    for(var i = 0; i !== originalWord.length; i++) blankWord += "_";
    gameEl.textContent = blankWord;
    return blankWord;
};

// Declare function that after pressed key will check if user got a match, 
// if yes adjust string and display on the page
function renderBlankWord() {
    for(i = 0; i < originalWord.length; i++) {
        if(originalWord[i] === letterGuessed) {
            blankWord = setCharAt(blankWord, i, letterGuessed);
            gameEl.textContent = blankWord;
        };
    };
};

// Declare function to adjust temporary string with letter found by user
function setCharAt(str, index, chr) {
    if(index > str.length -1 ) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
};

// Declare function to display guessed word, enable buttons again and save game statistics.
function endOfGame() {
    gameEl.textContent = originalWord;
    btnStartEl.disabled = false;
    btnResetEl.disabled = false;
    renderGameStatistics();
    localStorage.setItem("wins",wins);
    localStorage.setItem("losses",losses);
};

// Reset button, set localStorage data to 0, render to the page
btnResetEl.addEventListener("click", function() {
    wins = 0;
    losses = 0;
    localStorage.setItem("wins",wins);
    localStorage.setItem("losses",losses);
    renderGameStatistics();
});
// MAIN GAME CODE 

// Display last results
renderLastResults();

 // Listen to pressed keys, check if are letter
document.addEventListener("keydown", function(event) {
    if(timer === 0) return;

    var key = event.key.toLowerCase();
    var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
    if (alphabetNumericCharacters.includes(key)) letterGuessed = key;
    renderBlankWord(); // If letter is in original word, display and adjust string
});

// Start button
btnStartEl.addEventListener("click", function() {
    // Disable all buttons during the game
    btnStartEl.disabled = true;
    btnResetEl.disabled = true;
    var timeLeft = timer;

    blankWord = setWord();

    // Start timer, check if user guessed the word or time is up
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