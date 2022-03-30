const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class SnakeParts{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let soo = 20;
let kichthuoco = canvas.width / soo;

// điểm bắt đầu của rắn
let ranX = 10;
let ranY = 10;
const snakeParts = [];
let duoiran = 2;

//điểm bắt đầu của mồi
let moiX = 5;
let moiY = 5;

let xVelocity=0;
let yVelocity=0;

let score = 0;

// game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if(result) {
        return;
    }

    clearScreen();
    ktraran();
    drawran();
    drawmoi();
    drawScore();

    if(score > 2) {
        speed = 11;
    }
    if(score>5) {
        speed = 15;
    }
    if(score>7) {
        speed = 20;
    }

    setTimeout(drawGame, 1000/speed);
}

function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }
    if(ranX < 0) {
        gameOver = true;
    }
    if(ranX === soo) {
        gameOver = true;
    }
    else if (ranY < 0) {
        gameOver = true;
    }
    else if (ranY === soo) {
        gameOver = true;
    }

    for(let i =0; i< snakeParts.length; i++) {
        let parts = snakeParts[i];
        if (parts.x === ranX && parts.y === ranY) {
            gameOver = true;
            break;
        }
    }
    if(gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';

        let gradient = ctx.createLinearGradient(0,0, canvas.width, 0);
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');
        ctx.fillStyle = gradient;

        ctx.fillText('Game Over!', canvas.width/6.5, canvas.height/2);
    }
    return gameOver;
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText('Score: ' + score, canvas.width-50, 10);
}
function clearScreen() {
    ctx.fillStyle = 'pink';
    ctx.fillRect(0,0,canvas.width, canvas.height);
}
function drawran() {

    ctx.fillStyle ='green';
    for(let i = 0; i<snakeParts.length;i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x*soo, part.y * soo, kichthuoco, kichthuoco);
    }
    snakeParts.push(new SnakeParts(ranX, ranY));
    if(snakeParts.length > duoiran) {
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange'
    ctx.fillRect(ranX * soo, ranY * soo, kichthuoco, kichthuoco);
    }

function changeSnakePosition() {
    ranX = ranX + xVelocity;
    ranY = ranY + yVelocity;
}

function drawmoi() {
    ctx.fillStyle='red';
    ctx.fillRect(moiX * soo, moiY * soo, kichthuoco, kichthuoco)
}
function ktraran() {
    if( moiX === ranX && moiY === ranY) {
    moiX = Math.floor(Math.random() * soo);
    moiY = Math.floor(Math.random() * soo);
    duoiran++;
    score++;
    }
}
document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //up
    if (event.keyCode === 38) {
        if ( yVelocity === 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if (event.keyCode === 40) {
        if ( yVelocity === -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if (event.keyCode === 37) {
        if ( xVelocity === 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if (event.keyCode === 39) {
        if ( xVelocity === -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}


drawGame();