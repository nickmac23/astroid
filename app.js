var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;



var img = new Image();
img.src = 'pic/blueships1.png';

var Ship = {
  x: canvas.width/2,
  y: canvas.height/2,
  vy: 0,
  vx: 0,
  thrust: 0.2,
  degree: 0,
  rad: 0,
  move: function (key) {
    if(key === 39){this.degree += 10};
    if(key === 37){this.degree -= 10};
    if( this.degree === 360 || this.degree === -360){
      this.degree = 0;
    }
    this.rad = (Math.PI/180)* this.degree;
    if(key === 38){
      this.vx +=  this.thrust * Math.sin(this.rad);
      this.vy +=  this.thrust * Math.cos(this.rad);
      console.log('vx: ' + this.vx);
      console.log('vy: ' + this.vy);
    }
  },
  draw: function () {
    this.x += this.vx;
    this.y -= this.vy;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad);
    ctx.drawImage(img, -(img.width/2), -(img.height/2));
    ctx.restore();
  }
}

// img.onload = function(){
//   ctx.drawImage(img, ship.x, ship.y);
// }

document.addEventListener('keydown', function(e){
    Ship.move(e.which);
  },false)

  function gameLogic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Ship.draw();
    window.requestAnimationFrame(gameLogic);
  }
  gameLogic();
  //window.requestAnimationFrame(gameLogic);
