function Bullet(x, y, isMob) {
    this.xpos = x;
    this.ypos = y;
    this.r = 3.5;
    this.speedRate = 1;
    this.vector = {        
        axis: 1,
        direction: -1
    };    
    this.isMobBullet = isMob;

    this.hits = function (tank) {
        let d = dist(this.xpox, this.ypos, tank.xpos, tank.ypos);
        if (d < this.r + tank.r + 5) {
            return true;
        } else {
            return false;
        }
        // or with ternary?
        // return (d < this.r + tank.r + 5) ? true : false;
    }

    this.show = function () {
        if (this.isMobBullet) {
            noStroke();
            fill(255, 255, 0);
            ellipse(this.xpos, this.ypos, this.r * 2, this.r * 2);
        } else {
            noStroke();
            fill(255, 110, 0);
            ellipse(this.xpos, this.ypos, this.r * 2, this.r * 2);
        }        
    }

    this.setVector = function (a, d) {
        this.vector.axis = a;
        this.vector.direction = d;
    }

    this.move = function () {
        switch (this.vector.axis) {
            case 1:
                this.ypos += (10 * this.speedRate) * this.vector.direction;
                break;
            case 0: 
                this.xpos -= (10 * this.speedRate) * this.vector.direction;
                break;
        }        
    }

    this.hitTarget = function (target) {        
        let d = dist(this.xpos, this.ypos, target.xpos, target.ypos);
        if ( d < this.r + target.r + 5) {
            return true;
        } else {
            return false;
        }
        // or with ternary?
        // return (d < this.r + target.r + 5) ? true : false;
    }
}