let body;
let leftWheel;
let rightWheel;
let cannon;

function Tank(x, y, type) {
    /**
     * type
     *   0 - player
     *   1 - npc
     */
    this.type = type;
    this.xpos = x;
    this.ypos = y;
    /**
     * vector
     *   axis
     *     x - 0
     *     y - 1
     *   direction
     *     1 - neg
     *     (-1) - pos
     */
    this.vector = {
        axis: 1,
        direction: -1
    };
    this.headingDirection = {
        axis: 1,
        direction: -1
    };
    this.r = 10;
    this.toDelete = false;
    this.speedRate = 0.3;
    this.parts = {
        body,
        leftWheel,
        rightWheel,
        cannon
    }

    this.show = function () {
        if (this.type === 1) {
            rectMode(CENTER);
            noStroke();
            fill(255);
            body = rect(this.xpos, this.ypos, this.r * 2, this.r * 2);            
            fill(115);
            switch (this.vector.axis) {
                case 1:
                    leftWheel = rect(this.xpos - 10, this.ypos, 10, 30);
                    rightWheel = rect(this.xpos + 10, this.ypos, 10, 30);                    
                    break;
                case 0:
                    leftWheel = rect(this.xpos, this.ypos + 10, 30, 10);
                    rightWheel = rect(this.xpos, this.ypos - 10, 30, 10);
                    break;
            }            
            fill(1);
            switch (this.vector.direction) {                
                case 1: 
                    if (this.vector.axis === 1) {                        
                        cannon = rect(this.xpos, this.ypos + 10, 4, 20);
                    } else {
                        cannon = rect(this.xpos - 10, this.ypos, 20, 4);
                    }
                    break;
                case (-1):
                    if(this.vector.axis === 0) {
                        cannon = rect(this.xpos + 10, this.ypos, 20, 4);
                    } else {
                        cannon = rect(this.xpos, this.ypos - 10, 4, 20);
                    }
                    break;
            }            
        } else {
            rectMode(CENTER);
            noStroke();
            fill(100, 0, 110);
            leftWheel = rect(this.xpos - 10, this.ypos, 10, 30);
            rightWheel = rect(this.xpos + 10, this.ypos, 10, 30);
            fill(255, 0, 100);
            body = rect(this.xpos, this.ypos, this.r * 2, this.r * 2);
            fill(1);
            cannon = rect(this.xpos, this.ypos - 10, 4, 20);
        }

    }

    this.setSpeedRate = function (val) {
        this.speedRate = val;
    }

    this.setVector = function (a, d) {
        this.vector.axis = a;
        this.vector.direction = d;
    }

    this.setHeadingDirection = function (a, d) {
        this.headingDirection.axis = a;
        this.headingDirection.direction = d;
    }

    this.move = function () {

        if (this.xpos - 10 < 0) {
            // left wall
            this.vector.direction = (-1);
        }
        if (this.xpos + 10 > width) {
            //right wall
            this.vector.direction = 1;
        }
        if (this.ypos - 10 < 0) {
            //top wall
            this.vector.direction = 1;
        }
        if (this.ypos + 10 > height) {
            this.vector.direction = (-1);
        }

        if (this.type === 1) {
            switch (this.vector.axis) {
                case 1:
                    this.ypos += (10 * this.speedRate) * this.vector.direction;
                    break;
                case 0:
                    this.xpos -= (10 * this.speedRate) * this.vector.direction;
                    break;
            }
        } else {
            switch (this.vector.axis) {
                case 1:
                    this.ypos += (10 * this.speedRate) * this.vector.direction;
                    break;
                case 0:
                    this.xpos -= (10 * this.speedRate) * this.vector.direction;
                    break;
            }
        }
    }
}


