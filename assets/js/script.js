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
    word1: ["javascript"],
    word2: ["boolean"],
    word3: ["class"],
    word4: ["array"],
    word5: ["button"],
    count: 5
};

// ////////////////////////////////////////////

function prepareWord() {
    var rndSelection = Math.floor(Math.random() * wordsBank.count) + 1;
    var tempWord = "";
    var selectedWord = "";
    switch(1) { // change value later !!!!!!!!
        case 1: 
            var selectedWord = wordsBank.word1;
            tempWord = hideRandomLetters(selectedWord);
        case 2:
        case 3:
        case 4:
        case 5:
    };
};

function hideRandomLetters(word) {
    var tempWord = [];
    for(var i = 0; i < word.length; i++) {
        var rndNumber = Math.floor(Math.random() * 2);
        if(rndNumber === 0) tempWord[i] = word[i];
        else tempWord[i] = "_";
    }
    return tempWord;
};
prepareWord();

