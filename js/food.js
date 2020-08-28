import { onSnake, expandSnake, incrementScore, SNAKE_SPEED } from "./snake.js"
import {randomGridPosition} from "./grid.js"

let food = getRandomPosition();
const EXPANSION_RATE = 1;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    incrementScore(SNAKE_SPEED);
    food = getRandomPosition();
  }
}

export function draw(gameboard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameboard.appendChild(foodElement);
}

function getRandomPosition() {
  let newFoodPosition;
  while (newFoodPosition == null  || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition
}

