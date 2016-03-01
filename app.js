var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var ship1 = new Image();
  ship1.src = 'pic/blueships1.png';
var bullet1 = new Image();
  bullet1.src = 'pic/Bluecenter.png';

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
var Bullet = {
  x: 0,
  y: 0,
  dv: 10,
  ang: 0,
  val: false,
  draw: function () {
    this.x += this.dv * Math.sin(this.ang);
    this.y -= this.dv * Math.cos(this.ang);
    ctx.drawImage(bullet1, this.x - 25 , this.y - 10)
  },
  fire: function(x, y, dir, val) {
    this.x = x;
    this.y = y;
    this.ang = dir;
    this.val = true;
  }
}


var keysDown = {};
addEventListener("keydown", function (e) {
  if( e.which === 32){
    Bullet.fire(Ship.x, Ship.y, Ship.rad, true);

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
    if( Bullet.val){
      Bullet.draw()
    }
    Ship.draw();
    window.requestAnimationFrame(gameLogic);
  }
  gameLogic();
  //window.requestAnimationFrame(gameLogic);
