const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "";
let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box
};
let score = 0;

document.addEventListener("keydown", updateDirection);

function updateDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, 400, 400);

  // Desenha a cobrinha
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Desenha a comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move a cobrinha
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  // Game over
  if (
    headX < 0 || headX >= 400 || headY < 0 || headY >= 400 ||
    snake.some((segment, i) => i !== 0 && segment.x === headX && segment.y === headY)
  ) {
    clearInterval(game);
    alert("Game Over! Pontuação: " + score);
    return;
  }

  // Comeu a comida
  if (headX === food.x && headY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };
  snake.unshift(newHead);
}

let game = setInterval(draw, 100);
