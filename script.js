document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const scoreDisplay = document.getElementById("score");
    const blockSize = 20;
    const boardSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let score = 0;

    function draw() {
        board.innerHTML = "";
        snake.forEach(segment => {
            const snakeElement = document.createElement("div");
            snakeElement.style.left = `${segment.x * blockSize}px`;
            snakeElement.style.top = `${segment.y * blockSize}px`;
            snakeElement.classList.add("snake");
            board.appendChild(snakeElement);
        });

        const foodElement = document.createElement("div");
        foodElement.style.left = `${food.x * blockSize}px`;
        foodElement.style.top = `${food.y * blockSize}px`;
        foodElement.classList.add("food");
        board.appendChild(foodElement);

        scoreDisplay.textContent = `Score: ${score}`;
    }

    function move() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            createFood();
            score += 10;
        } else {
            snake.pop();
        }
    }

    function createFood() {
        food = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize)
        };
    }

    function checkCollision() {
        if (
            snake[0].x < 0 ||
            snake[0].x >= boardSize ||
            snake[0].y < 0 ||
            snake[0].y >= boardSize
        ) {
            return true;
        }

        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }

        return false;
    }

    function changeDirection(event) {
        const K_KEY = 75;
        const J_KEY = 74;
        const H_KEY = 72;
        const L_KEY = 76;

        const keyPressed = event.keyCode;

        if (keyPressed === H_KEY && dx === 0) {
            dx = -1;
            dy = 0;
        }
        if (keyPressed === L_KEY && dx === 0) {
            dx = 1;
            dy = 0;
        }
        if (keyPressed === K_KEY && dy === 0) {
            dx = 0;
            dy = -1;
        }
        if (keyPressed === J_KEY && dy === 0) {
            dx = 0;
            dy = 1;
        }
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        dx = 0;
        dy = 0;
        score = 0;
        createFood();
    }

    function gameLoop() {
        if (checkCollision()) {
            resetGame();
        }

        move();
        draw();
        setTimeout(gameLoop, 100);
    }

    createFood();
    draw();
    document.addEventListener("keydown", changeDirection);
    gameLoop();
});