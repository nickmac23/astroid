function Asteroids (width, height, size, pic, ship, bullets, update, breaker){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.size= size;
  this.img= pic;
  this.val = true;
  this.width = width;
  this.height = height;
  this.start = function (px, py) {
    this.vx = Math.random() * (3 + 3) - 3;
    this.vy = Math.random() * (3 + 3) - 3;
    if(px){
      this.x = px;
      this.y = py;
    }else{
      var top = (Math.random() * (canvas.height - 0));
      var bot = (Math.random() * (canvas.width - 0));
      this.x = 200 * ( 1 - ( top/bot) );
      this.y = 200 * ( 1 - ( bot/top ) );
    }
  };
  this.draw = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.bounce();
    this.wall();
    ctx.drawImage(this.img, this.x , this.y )
  }
  this.bounce = function () {
    if (this.x <= ship.x  &&
     this.x + this.width  > ship.x &&
     this.y < ship.y  &&
     this.height + this.y > ship.y) {
       ship.val = false;
    }for (var i = 0; i < bullets.length; i++) {
      if (this.x < bullets[i].x  &&
        this.x + this.width  > bullets[i].x &&
       this.y < bullets[i].y  &&
       this.height - 30 + this.y > bullets[i].y && bullets[i].val === true) {
         update('A', ship.val);
         update('s', ship.val);
         bullets[i].val = false;
         this.val = false;
         if( this.size === 'big'){
           breaker (this.x, this.y);
         }
      }
    }
  },
  this.wall = function () {
    if(this.x > canvas.width){this.x = 0 - this.width/2};
    if(this.x + this.width < 0){this.x = canvas.width};
    if(this.y > canvas.height){this.y = 0 - this.height/2};
    if(this.y + this.height < 0){this.y = canvas.height};
  }
}
