// constants 
const NEW_GAME = "Start game";
const PLAYER_LOST = "Game over!";
const PLAYER_WINS = "You won!";

// global variables
let gameState = "init";
let enemyTankCount = 4;
let tankCountSlider = null;
let tankCounter = null;

// objects
let playerTank;
let enemyTankArray = [];
let bullets = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    frameRate(60);
}

function initGame() {
    background(1, 50, 100);
    let startButton = createButton(NEW_GAME);    
    startButton.position((width / 2 - startButton.width / 2) + 10, 475);
    startButton.mousePressed(setupGame1);
    tankCountSlider = createSlider(1, 7, 4, 1);
    tankCountSlider.size(400);
    tankCountSlider.position((width / 2 - tankCountSlider.width)-55, 150);
    fill(200, 200, 200);    
    text('# of enemy tanks', (width / 2 - 25), 100);    
    /*
    fill(200, 200, 200);    
    text(tankCountSlider.value(), width / 2 + 15, 180);
    */
    noLoop();
}

function setupGame1() {
    removeElements();
    gameState = "play1";    
    // create player's tank    
    playerTank = new Tank(width / 2, height / 2, 0);
    playerTank.vector.direction = 0;
    // create enemy tanks    
    for (let i = 0; i < tankCountSlider.value(); i++) {
        enemyTank = new Tank(Math.floor(Math.random() * 500) + 100, Math.floor(Math.random() * 500) + 100, 1)
        enemyTankArray.push(enemyTank);
        notifyVectorSetup();
    }                
    loop();
}

function playLevel1() {
    background(51);
    textSize(32);
    fill(0, 102, 153);
    playerTank.show();
    playerTank.move();
    enemyTankArray.forEach(tank => {
        tank.show();
        tank.move();
    });
    bullets.forEach((bullet, bulletIndex) => {
        bullet.show();
        bullet.move();
        if (bullet.xpos > width || bullet.xpos < 0 || bullet.ypos > height || bullet.ypos < 0) {
            bullets.splice(bulletIndex, 1)
        }
        if (bullet.isMobBullet === true) {
            if (bullet.hitTarget(playerTank)) {
                gameState = "lost";
            }
        }
        enemyTankArray.forEach((tank, tankIndex) => {
            if (bullet.isMobBullet === false) {
                if (bullet.hitTarget(tank)) {
                    enemyTankArray.splice(tankIndex, 1);
                    bullets.splice(bulletIndex, 1);
                }
            }
        });
    });
    if (!enemyTankArray.length) {
        gameState = "won";
        createScreen(NEW_GAME);
    }
}

function playLevel2() {    
    background(140,100,30);
    textSize(32);
    fill(0, 102, 153);
    playerTank = new Tank(width / 2, height / 2, 0);
    playerTank.vector.direction = 0;
    // create enemy tanks    
    for (let i = 0; i < enemyTankCount; i++) {
        enemyTank = new Tank(Math.floor(Math.random() * 500) + 100, Math.floor(Math.random() * 500) + 100, 1)
        enemyTankArray.push(enemyTank);
    }
    playerTank.show();
    playerTank.move();
    enemyTankArray.forEach(tank => {
        tank.show();
        tank.move();
    });
    bullets.forEach((bullet, bulletIndex) => {
        bullet.show();
        bullet.move();
        if (bullet.xpos > width || bullet.xpos < 0 || bullet.ypos > height || bullet.ypos < 0) {
            bullets.splice(bulletIndex, 1)
        }
        if (bullet.isMobBullet === true) {
            if (bullet.hitTarget(playerTank)) {
                gameState = "lost";
            }
        }
        enemyTankArray.forEach((tank, tankIndex) => {
            if (bullet.isMobBullet === false) {
                if (bullet.hitTarget(tank)) {
                    enemyTankArray.splice(tankIndex, 1);
                    bullets.splice(bulletIndex, 1);
                }
            }
        });
    });
    if (!enemyTankArray.length) {
        gameState = "won";
        createScreen(PLAYER_WINS);
    }
}

function keyPressed() {
    if (keyCode === CONTROL) {
        let bullet = new Bullet(playerTank.xpos, playerTank.ypos, false);
        bullet.setVector(playerTank.headingDirection.axis, playerTank.headingDirection.direction)
        bullets.push(bullet);
    }
    if (keyCode === RIGHT_ARROW) {
        playerTank.setVector(0, -1);
        playerTank.setHeadingDirection(0, -1);
        playerTank.setLastTankStance(0, -1);
    }
    if (keyCode === LEFT_ARROW) {
        playerTank.setVector(0, 1);
        playerTank.setHeadingDirection(0, 1);
        playerTank.setLastTankStance(0, 1);
    }
    if (keyCode === DOWN_ARROW) {
        playerTank.setVector(1, 1);
        playerTank.setHeadingDirection(1, 1);
        playerTank.setLastTankStance(1, 1);
    }
    if (keyCode === UP_ARROW) {
        playerTank.setVector(1, -1);
        playerTank.setHeadingDirection(1, -1);
        playerTank.setLastTankStance(1, -1);
    }
}

function keyReleased() {
    if (keyCode != CONTROL) {
        playerTank.vector.direction = 0;
    }
}

function draw() {
    switch (gameState) {
        case "init":
            initGame();
            break;
        case "play1":
            playLevel1();
            break;
        case "won":
            gameWon();
            break;
        case "lost": {
            gameLost();
            break;
        }
    }
}

function gameLost() {
    createScreen(PLAYER_LOST);
}

function gameWon() {
    createScreen(NEW_GAME);
}

function createScreen(screenTitle) {
    removeElements();
    enemyTankArray = [];
    bullets = []
    background(50, 50, 100);
    fill(255, 255, 255);
    var title = screenTitle;
    var buttonTitle = NEW_GAME;
    var titleWidth = textWidth(title);
    text(title, width / 2 - titleWidth / 2, height / 2);
    button = createButton(buttonTitle);
    button.position((width / 2 - button.width / 2) + 10, 475);
    button.mousePressed(setupGame1);
}

/* 
 * TODO (1) add more levels - level2 is almost ready, add logic to switch state depending on level#
 * TODO (2) simplify individual vector setup for enemy tanks
 * TODO (3) create "homing" tank -> cannon turns and shoots towards player
 * TODO (3) extra HP tanks
 */



