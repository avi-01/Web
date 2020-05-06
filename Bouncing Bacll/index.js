const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
} 

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}


Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
            // const tan = (balls[j].y - this.y)/(balls[j].x - this.x);
            // const cos = Math.sqrt(1/(1+(tan*tan)));
            // const sin = tan*cos;

            // // if(j==0)
            // //     console.log(tan,cos,sin);

            // const n1 = this.velY*cos + this.velX*sin;
            // const n2 = balls[j].velY*cos + balls[j].velX*sin;
            // const m = (this.velY*sin + this.velX*cos + balls[j].velY*sin + balls[j].velX*cos)/2;

            // this.velX = n1*cos + m*sin;
            // this.velY = m*cos + n1*sin;


            // balls[j].velX = n2*cos + m*sin;
            // balls[j].velY = m*cos + n2*sin;


            this.velX = -(this.velX) ;
            this.velY = -(this.velY);

            balls[j].velX = -(balls[j].velX);
            balls[j].velY = -(balls[j].velY);


            // balls[j].velX = (((2*this.size)*this.velX) - ((this.size - balls[j].size)*balls[j].velX))/(this.size + balls[j].size);
            // this.velX = (((this.size - balls[j].size)*this.velX) + ((2*balls[j].size)*balls[j].velX))/(this.size + balls[j].size);


            // balls[j].velY = (((2*this.size)*this.velY) - ((this.size - balls[j].size)*balls[j].velY))/(this.size + balls[j].size);
            // this.velY = (((this.size - balls[j].size)*this.velY) + ((2*balls[j].size)*balls[j].velY))/(this.size + balls[j].size);


        //   balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
}

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

let balls = [];

while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
}


// for (let i = 0; i < balls.length; i++) {
//       balls[i].draw();
//     //   balls[i].update();
// }

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loop);
}

loop();