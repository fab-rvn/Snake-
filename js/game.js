import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, SNAKE_SPEED, score } from "./snake.js"
import { update as updateFood, draw as drawFood } from "./food.js"
import { outsideGrid } from "./grid.js"


let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");
const levelTextElemtn = document.getElementById("level-text");
const scoreTextElement = document.getElementById("score-text");
const gameOverSection = document.getElementById("game-over-section");
const finalScore = document.getElementById("final-score");
const infoBar = document.getElementById("info-bar");
const playAgainBtn = document.getElementById("play-again-btn");

levelTextElemtn.innerHTML = `<p>Level ${SNAKE_SPEED}</p>`;
scoreTextElement.innerHTML = `<p">Score ${score}</p>`;

// GAME LOOP 
function main(currentTime) {
  if ( gameOver) {
      // if (confirm("Game Over! Press ok to restart")) {
    //   window.location = "/";
    // }
    infoBar.classList.toggle("hide");
    gameBoard.classList.toggle("hide");
    gameOverSection.classList.toggle("hide");
    finalScore.innerText = score;

    playAgainBtn.addEventListener("click", () => {
      
      infoBar.classList.toggle("hide");
      gameBoard.classList.toggle("hide");
      gameOverSection.classList.toggle("hide");
      window.location = "/";
    })
    return;
  }

  window.requestAnimationFrame(main);
  const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondSinceLastRender < 1 / SNAKE_SPEED) return;
  
  console.log("render");
  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main)

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}


function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}