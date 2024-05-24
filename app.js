let score = 0
let gameInterval
let scoreText
const blockSize = 25
const rows = innerWidth / blockSize  
const cols = 21.5
let snakeX = 400
let snakeY = 200

let snake = []
let velocityX = 0
let velocityY = 0

let foodX
let foodY
let context



window.onload = function(){
    scoreText = document.getElementById("score")
    board =  document.getElementById("board")
    board.width = rows * blockSize
    board.height = cols * blockSize
    context = board.getContext("2d")

    if (innerWidth < 847) {
        context.fillStyle = "black"
        context.fillRect(0, 0, board.width, board.height)
        context.font = '20px Arial';
        context.fillStyle = 'white';
        context.fillText(`El tamaño de tu pantalla es de:`, (board.width / 2) - 135, (board.height / 2) - 100);
        context.fillText(` ${innerWidth} x ${innerHeight}`, (board.width / 2) - 50, (board.height / 3) + 25);
        context.fillText(`minimo tamaño de pantalla requerido:`, (board.width / 2) - 165, (board.height / 2) - 10);
        context.fillText(` 847 x 671`, (board.width / 2) - 50, (board.height / 2) + 20);
   
    }else{
        document.addEventListener("keydown", (e) =>{
            if (e.code == "ArrowUp" && velocityY != 1) {
                velocityY = -1
                velocityX = 0
            }
    
            if (e.code == "ArrowDown" && velocityY != -1) {
                velocityY = 1
                velocityX = 0
            }
    
            if (e.code == "ArrowRight" && velocityX != -1) {
                velocityY = 0
                velocityX = 1
            }
    
            if (e.code == "ArrowLeft" && velocityX != 1) {
                velocityY = 0
                velocityX = -1
            }
        })
    
        
    
        gameInterval = setInterval(gameLoop, 100)
    }
    
    function gameLoop() {
        
        context.fillStyle = "white"
        context.fillRect(0, 0, board.width, board.height)
    
        for (let i = 0; i < board.width; i++) {
            for (let j = 0   ; j < board.height; j++) {
                let x = i * blockSize 
                let y = j * blockSize 
                context.strokeStyle = '#E0E0E0 ';
                context.lineWidth = 1;
                context.strokeRect(x, y, board.width, board.height);
            }
        }
        //Serpiente
        context.fillStyle = "#1DECDF"
        snakeX +=  velocityX * blockSize
        snakeY += velocityY * blockSize
        context.fillRect(snakeX, snakeY, blockSize, blockSize)
        for (let i = 0; i < snake.length; i++) {
            context.fillRect(snake[i][0], snake[i][1], blockSize, blockSize)
        }
    
        for (let i = snake.length - 1; i > 0; i--) {
            snake[i] = snake[i - 1]
        }
    
        if (snake.length > 0) {
            snake[0] = [snakeX, snakeY]
        }
    
       for (let i = 1; i < snake.length; i++) {
        if (snakeX ==  snake[i][0] && snakeY == snake[i][1]) {
            gameOver()
        }
       }
    
        if (snakeX > board.width || snakeX < 0 || snakeY > board.height || snakeY < 0) {
            gameOver()
        }
    
        //Comida
        context.fillStyle = "orange"
        context.fillRect(foodX, foodY, blockSize, blockSize)
        
        scoreText.textContent = score
        if (snakeX == foodX && snakeY == foodY) {
            score++
            snake.push([foodX, foodY])
            aleatoryFood()
        }
    }
    aleatoryFood()
    
    function aleatoryFood() {
        foodX = Math.floor(Math.random() * rows) * blockSize
        foodY = Math.floor(Math.random() * cols) * blockSize
    }
    
    function gameOver(){
        context.font = '50px Arial';
        context.fillStyle = 'black';
        context.fillText('Game over!', (board.width / 2) - 70, board.height / 2);
    
        context.font = '20px Arial';
        context.fillStyle = 'black';
        context.fillText(`your score: ${score}`, (board.width / 2), board.height / 2 + 30);
    
        clearInterval(gameInterval)
    
        setInterval(() =>{
            window.location.reload()
        }, 2000)
    }
}



