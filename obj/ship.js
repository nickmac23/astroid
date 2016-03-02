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
