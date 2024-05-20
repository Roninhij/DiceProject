let scores, currentScore, activePlayer, targetScore, gamePlaying;

const diceDOM1 = document.querySelector("#die1");
const diceDOM2 = document.querySelector("#die2");
const score1DOM = document.querySelector("#score1");
const score2DOM = document.querySelector("#score2");
const current1DOM = document.querySelector("#current1");
const current2DOM = document.querySelector("#current2");
const setupContainer = document.querySelector(".setup-container");
const gameContainer = document.querySelector(".game-container");

document.querySelector("#start-game").addEventListener("click", startGame); // Add event listener to the start game button
document.querySelector("#roll-dice").addEventListener("click", rollDice); // Add event listener to the roll dice button
document.querySelector("#hold").addEventListener("click", hold); // Add event listener to the hold button
document.querySelector("#new-game").addEventListener("click", newGame);

function startGame() {
  targetScore = parseInt(document.querySelector("#target").value); // The score that the user needs to reach in order to wins the game
  setupContainer.classList.add("hidden"); // it hide the score from the user so they cant see the points
  setupContainer.classList.add("hidden"); // a container that holds the score and the target score
  gameContainer.classList.remove("hidden");
  init(); // sets a value to start the game
}

function newGame() {
  setupContainer.classList.remove("hidden");
  gameContainer.classList.add("hidden");
  init();
}

function init() {
  scores = [0, 0]; //start the game with 0 points for both players
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  diceDOM1.style.display = "none";
  diceDOM2.style.display = "none";

  score1DOM.textContent = "0";
  score2DOM.textContent = "0";
  current1DOM.textContent = "0";
  current2DOM.textContent = "0";
}

function rollDice() {
  if (gamePlaying) {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    diceDOM1.style.display = "block";
    diceDOM2.style.display = "block";
    diceDOM1.innerHTML = `<img src="dice-${dice1}.png" alt="Dice ${dice1}">`;
    diceDOM2.innerHTML = `<img src="dice-${dice2}.png" alt="Dice ${dice2}">`;

    if (dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score" + (activePlayer + 1)).textContent = "0";
      nextPlayer();
    } else {
      currentScore += dice1 + dice2; // if dice 1 is 3 and dice 5 u add them and it will give 7. 7 will be ur current score
      document.querySelector("#current" + (activePlayer + 1)).textContent =
        currentScore;
    }
  }
}

function hold() {
  if (gamePlaying) {
    scores[activePlayer] += currentScore; // whatever the user roles and holds that will be the current score

    document.querySelector("#score" + (activePlayer + 1)).textContent =
      scores[activePlayer];

    if (scores[activePlayer] === targetScore) {
      alert("Player " + (activePlayer + 1) + " wins!"); //tells the users who won the game
      gamePlaying = false;
    } else if (scores[activePlayer] > targetScore) {
      alert("Player " + (activePlayer + 1)) + " loses!"; // whoever failed to reach the target score fails
      gamePlaying = false;
    } else {
      nextPlayer(); // if the user doesnt reach the target score then it will move to the next player
    }
  }
}

function nextPlayer() {
  currentScore = 0;
  document.querySelector("#current" + (activePlayer + 1)).textContent = "0"; // if the user rolls a 6 and 6 then the current score will be 0
  activePlayer = activePlayer === 0 ? 1 : 0; // if the user rolls a 6 and 6 then the current score will be 0
}
