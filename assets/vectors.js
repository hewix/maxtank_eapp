const axisValues = [0,1];
const directionValues = [1, (-1)];

function selectRandomAxis() {    
    return axisValues[Math.floor(Math.random() * axisValues.length)];
}

function selectRandomDirection() {
    return directionValues[Math.floor(Math.random() * directionValues.length)];
}

function notifyVectorSetup() {
    if (gameState === "play1") {
        function moveTank1() { }
        (function loopMove() {        
            var rand = Math.round(Math.random() * 1000) + 500;
            setTimeout(function () {
                enemyTankArray[0].setVector(selectRandomAxis(), selectRandomDirection());
                moveTank1();
                loopMove();
            }, rand);
        }());
        
        function moveTank2() { }
        (function loopMove() {
            var rand = Math.round(Math.random() * 1000) + 500;
            setTimeout(function () {
                enemyTankArray[1].setVector(selectRandomAxis(), selectRandomDirection());
                moveTank2();
                loopMove();
            }, rand);
        }());
        
        function moveTank3() { }
        (function loopMove() {
            var rand = Math.round(Math.random() * 1000) + 500;
            setTimeout(function () {
                enemyTankArray[2].setVector(selectRandomAxis(), selectRandomDirection());
                moveTank3();
                loopMove();
            }, rand);
        }());
        
        function moveTank4() { }
        (function loopMove() {
            var rand = Math.round(Math.random() * 1000) + 500;
            setTimeout(function () {
                enemyTankArray[3].setVector(selectRandomAxis(), selectRandomDirection());
                moveTank4();
                loopMove();
            }, rand);
        }());
        
        function orderShoot() { }
        (function loopShoot() {
            var rand = Math.round(Math.random() * 1000) + 500;    
            setTimeout(function () {
                enemyTankArray.forEach(element => {
                    let bullet = new Bullet(element.xpos, element.ypos, true);
                    bullet.setVector(element.vector.axis, element.vector.direction);            
                    bullets.push(bullet);            
                });
                orderShoot();
                loopShoot();
            }, rand);
        }());
    }
}



