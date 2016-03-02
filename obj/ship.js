var bullet1 = new Image();
  bullet1.src = 'pic/Bluecenter.png';

function Ships (pic, move) {
  this.x = canvas.width/2,
  this.y = canvas.height/2,
  this.vy = 0.5,
  this.vx = 0,
  this.thrust = 0.1,
  this.rad = 0,
  this.val = true,
  this.img = pic;
  this.wall = function () {
    if(this.x > canvas.width){this.x = 0};
    if(this.x < 0){this.x = canvas.width};
    if(this.y > canvas.height){this.y = 0};
    if(this.y < 0){this.y = canvas.height};

  },
  this.draw = function () {
    move();
    this.wall();
    this.x += this.vx;
    this.y -= this.vy;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad);
    ctx.drawImage(this.img, -(this.img.width/2), -(this.img.height/2));
    ctx.restore();
  }
}

function Bullets (positionX, positionY, angle){
  this.x = positionX;
  this.y = positionY;
  this.angle = angle;
  this.dv = 10;
  this.val = false;
  this.inity = 0;
  this.initx = 0;
  this.fire = function (x, y, dir, val) {
    this.x = x;
    this.y = y;
    this.initx = x;
    this.inity = y;
    this.angle = dir;
    this.val = true;
  };
  this.draw = function (){
    this.wall();
    this.x += this.dv * Math.sin(this.angle);
    this.y -= this.dv * Math.cos(this.angle);
    var dx = Math.pow(this.initx - this.x, 2)
    var dy = Math.pow(this.inity - this.y, 2 )
    if( Math.sqrt( dx + dy ) > 300 ){
      this.val = false;
      this.y = 0;
      this.x = 0;
    }
    ctx.drawImage(bullet1, this.x - 25 , this.y - 10)
  },
  this.wall = function () {
    if(this.x > canvas.width){this.x = 0};
    if(this.x < 0){this.x = canvas.width};
    if(this.y > canvas.height){this.y = 0};
    if(this.y < 0){this.y = canvas.height};
  }
};
