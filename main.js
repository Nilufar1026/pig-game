"use strict";

//select element
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//start game
let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.innerHTML = 0;
  score1El.innerHTML = 0;
  current0El.innerHTML = 0;
  current1El.innerHTML = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).innerHTML = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

//rolling dice function
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.generating a random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled
    if (dice != 1) {
      //add current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).innerHTML = currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add curent score to activeplay's score
    scores[activePlayer] += currentScore;
    //score[0]=score[0]+currentScore
    document.getElementById(`score--${activePlayer}`).innerHTML =
      scores[activePlayer];

    //2. check if players core is >=100 true finish game
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3.false swith plays
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", function () {
  init();
});
