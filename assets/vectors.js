const axisValues = [0, 1];
const directionValues = [1, (-1)];

function selectRandomAxis() {
    return axisValues[Math.floor(Math.random() * axisValues.length)];
}

function selectRandomDirection() {
    return directionValues[Math.floor(Math.random() * directionValues.length)];
}

function notifyVectorSetup() {
    if (gameState === "play1") {
        enemyTankArray.forEach(enemyTank => {
            let rand = Math.round(Math.random() * 2000) + 800;
            setInterval(() => {
                enemyTank.setVector(selectRandomAxis(), selectRandomDirection());
            }, rand);
            console.log(rand);
        });
    }

    var rand = Math.round(Math.random() * 2000) + 1500;
    setInterval(function () {
        enemyTankArray.forEach(element => {
            let bullet = new Bullet(element.xpos, element.ypos, true);
            bullet.setVector(element.vector.axis, element.vector.direction);
            bullets.push(bullet);
        });
    }, rand);
}



