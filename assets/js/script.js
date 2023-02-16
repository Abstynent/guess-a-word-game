var winsEl = document.querySelector("#wins");
var lossesEl = document.querySelector("#losses");
var timerEl = document.querySelector("#timer");
var gameEl = document.querySelector("#game");
var btnEl = document.querySelector("#btn-start");

var wins = 0;
var losses = 0;
var timer = 10;

winsEl.innerHTML = wins;
lossesEl.innerHTML = losses;
timerEl.innerHTML = timer;

var wordsBank = {
    word1: "javascript",
    word2: "boolean",
    word3: "function",
    word4: "argument",
    word5: "document",
    count: 5,
};

// ////////////////////////////////////////////

function prepareWord() {
    var rndSelection = Math.floor(Math.random() * wordsBank.count) + 1;
    var tempWord = "";
    switch(rndSelection) {
        case 1: 
            tempWord = hideRandomLetters(wordsBank.word1);
            gameEl.textContent = tempWord;
            break;
        case 2:
            tempWord = hideRandomLetters(wordsBank.word2);
            gameEl.textContent = tempWord;
            break;
        case 3:
            tempWord = hideRandomLetters(wordsBank.word3);
            gameEl.textContent = tempWord;
            break;
        case 4:
            tempWord = hideRandomLetters(wordsBank.word4);
            gameEl.textContent = tempWord;
            break;
        case 5:
            tempWord = hideRandomLetters(wordsBank.word5);
            gameEl.textContent = tempWord;
            break;
    };
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

function displayWord(word) {
    var tempWord = "";
    for(var i =0; i < word.length; i++) {
        tempWord += word[i];
        tempWord += " ";
    };
    return tempWord;
};

btnEl.addEventListener("click", function() {
    var gameStatus = true;
    var timeLeft = timer;
    prepareWord();
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        if(timeLeft === 0) clearInterval(timeInterval);
    }, 1000);


});

