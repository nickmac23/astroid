var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var ship1 = new Image();
  ship1.src = 'pic/blueships1.png';
var bullet1 = new Image();
  bullet1.src = 'pic/Bluecenter.png';
var astroid = new Image();
  astroid.src = 'pic/Astromedium.png'

var Ship = {
  x: canvas.width/2,
  y: canvas.height/2,
  vy: 0,
  vx: 0,
  thrust: 0.1,
  rad: 0,
  draw: function () {
    move();
    this.x += this.vx;
    this.y -= this.vy;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad);
    ctx.drawImage(ship1, -(ship1.width/2), -(ship1.height/2));
    ctx.restore();
  }
}
function Asteroids (){
  this.x = 0;
  this.y = 0;
  this.vx = 1;
  this.vy = 1;
  this.start = function () {
    this.x = Math.random() * (canvas.width - 0);
    this.y = Math.random() * (canvas.height - 0);
    var check = Math.floor(Math.random() * 4);
    console.log(check);
    if(check === 0){
      this.y = 0 + 300;
      this.vy = 2;
    }if(check === 2){
      this.y = canvas.height - 300;
      this.vy = -2;
    }if(check === 3){
      this.x = 0 + 300;
      this.vx = 2;
    }if(check === 1){
      this.x = canvas.width - 300;
      this.vx = -2;
    };
  };
  this.draw = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.bounce();
    ctx.drawImage(astroid, this.x , this.y )
  }
  this.bounce = function () {
    if( this.x + astroid.width > canvas.width || this.x < 0){
      this.vx = -this.vx;
    }
    if( this.y + astroid.height > canvas.height || this.y < 0){
      this.vy = -this.vy;
    }
  }
}
Astroid1 = new Asteroids ();
Astroid2 = new Asteroids ();
Astroid3 = new Asteroids ();

function Bullets (positionX, positionY, angle){
  this.x = positionX;
  this.y = positionY;
  this.angle = angle;
  this.dv = 10;
  this.val = false;
  this.timer = 0;
  this.fire = function (x, y, dir, val) {
    this.x = x;
    this.y = y;
    this.angle = dir;
    this.val = true;
  };
  this.draw = function (){
    this.x += this.dv * Math.sin(this.angle);
    this.y -= this.dv * Math.cos(this.angle);
    ctx.drawImage(bullet1, this.x - 25 , this.y - 10)
  }
};
var Bullet = new Bullets (0, 0, Ship.rad);
var Bullet1 = new Bullets (0, 0, Ship.rad);

var keysDown = {};
addEventListener("keydown", function (e) {
  if( e.which === 32){
    if (Bullet.val) {
      Bullet1.fire(Ship.x, Ship.y, Ship.rad, true)
    }else{
      Bullet.fire(Ship.x, Ship.y, Ship.rad, true);
    }
  };
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var degree = 0;
function move (key) {
  if(39 in keysDown ) {degree += 5};
  if(37 in keysDown) {degree -= 5};
  if(degree === 360 || degree === -360){
    degree = 0;
  }
  Ship.rad = (Math.PI/180)*degree;
  if(38 in keysDown){
    Ship.vx += Ship.thrust * Math.sin(Ship.rad);
    Ship.vy += Ship.thrust * Math.cos(Ship.rad);
  }if(40 in keysDown){
    Ship.vx -= Ship.thrust * Math.sin(Ship.rad);
    Ship.vy -= Ship.thrust * Math.cos(Ship.rad);
  }
}



  function gameLogic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if( Bullet.val ){
      Bullet.draw()
    }
    if( Bullet1.val ){
      Bullet1.draw()
    }
    Astroid1.draw();
    Astroid2.draw();
    Astroid3.draw();
    Ship.draw();
    window.requestAnimationFrame(gameLogic);
  }
  Astroid1.start();
  Astroid2.start();
  Astroid3.start();
  gameLogic();
  //window.requestAnimationFrame(gameLogic);
