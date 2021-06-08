"use strict";

let background = document.querySelector("body").style;
let answer = generateNumber();
let number = document.querySelector(".number");
let guess = document.querySelector(".guess");
let check = document.querySelector(".check");
let again = document.querySelector(".again");
let message = document.querySelector(".message");
let score = document.querySelector(".score");
let highscore = document.querySelector(".highscore");
let gameOver = false;

function generateNumber() {
  return Math.floor(Math.random() * 20 + 1);
}

function gameLogic(e) {
  if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
    let value = Number(guess.value);

    if (guess.value === "" || gameOver === true) return;

    if (value < 0 || value > 20) {
      message.textContent = "😒 Between 1 and 20";
      return;
    }

    if (value < answer) {
      message.textContent = "📉 Too low!";
      score.textContent = String(Number(score.textContent) - 1);
    } else if (value > answer) {
      message.textContent = "📈 Too high!";
      score.textContent = String(Number(score.textContent) - 1);
    } else {
      background.backgroundColor = "#60b347";
      number.textContent = answer;
      message.textContent = "🎉 Correct number!";
      if (Number(score.textContent) > Number(highscore.textContent)) {
        highscore.textContent = score.textContent;
      }
      gameOver = true;
    }

    if (Number(score.textContent) === 0) {
      background.backgroundColor = "#ad0000";
      number.textContent = answer;
      message.textContent = "😔 You lose";
      gameOver = true;
    }
  }
}

function resetGame() {
  background.backgroundColor = "#222";
  answer = generateNumber();
  number.textContent = "?";
  guess.value = "";
  message.textContent = "🤔 Start guessing...";
  score.textContent = "10";
  gameOver = false;
}

check.addEventListener("click", gameLogic);
guess.addEventListener("keydown", gameLogic);
again.addEventListener("click", resetGame);
