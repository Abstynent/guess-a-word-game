var winsEl = document.querySelector("#wins");
var lossesEl = document.querySelector("#losses");
var timerEl = document.querySelector("#timer");
var btnEl = document.querySelector("#btn-start");

var wins = 0;
var losses = 0;
var timer = 10;

winsEl.innerHTML = wins;
lossesEl.innerHTML = losses;
timerEl.innerHTML = timer;