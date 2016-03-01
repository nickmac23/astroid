  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth * 0.8;
  ctx.canvas.height = window.innerHeight * 0.8;

  var ship1 = new Image();
    ship1.src = 'pic/mship1.png';
  var bullet1 = new Image();
    bullet1.src = 'pic/Bluecenter.png';
  var astroidMed = new Image();
    astroidMed.src = 'pic/Astromedium.png'
  var astroidBig = new Image();
    astroidBig.src = 'pic/asteroid.png'
  var explode = new Image();
    explode.src = 'pic/boom.png'
  var count = 0;



  function Ships (pic) {
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
      ctx.drawImage(this.img, -(ship1.width/2), -(ship1.height/2));
      ctx.restore();
    }
  }
  var Ship = new Ships (ship1);

  function Asteroids (width, height, size, pic){
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
      if (this.x <= Ship.x  &&
       this.x + this.width  > Ship.x &&
       this.y < Ship.y  &&
       this.height + this.y > Ship.y) {
         Ship.val = false;
      }for (var i = 0; i < bullets.length; i++) {
        if (this.x < bullets[i].x  &&
          this.x + this.width  > bullets[i].x &&
         this.y < bullets[i].y  &&
         this.height - 30 + this.y > bullets[i].y && bullets[i].val === true) {
           bullets[i].val = false;
           this.img = explode;
           this.val = false;
           if( this.size === 'big'){
             breaker (this.x, this.y);
           }
        }
      }
    },
    this.wall = function () {
      if(this.x > canvas.width){this.x = 0};
      if(this.x + this.width < 0){this.x = canvas.width};
      if(this.y > canvas.height){this.y = 0};
      if(this.y + this.height < 0){this.y = canvas.height};
    }
  }

  var collection = [];
  var breakArray = [];
  var small = 2;
  var big = 1;
  function reset () {
    collection = [];
    for (var x = 0; x < small; x++ ) { collection.push(new Asteroids (100, 100, 'small', astroidMed)) };
    for (var x = 0; x < big; x++) { collection.push(new Asteroids (150, 120, 'big', astroidBig)) };
    for (var i = 0; i < collection.length; i++) {
      collection[i].start();
    }
    small++;
    big++;
  }
  function breaker (x, y) {
    for (var i = 0; i < 2; i++) {
      collection.push(new Asteroids (100, 100, 'small', astroidMed));
      console.log(collection.length - 1);
      collection[ collection.length - 1].start(x, y)
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
  var bullets =[bul1 = new Bullets (0, 0, Ship.rad), bul2 = new Bullets (0, 0, Ship.rad), bul3 = new Bullets (0, 0, Ship.rad)];

  var keysDown = {};
  addEventListener("keydown", function (e) {
    if( e.which === 32){
        bullets[count].fire(Ship.x, Ship.y, Ship.rad, true);
        count++;
        if(count > 2){
          count = 0;
        }
      }
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
      var chck = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < bullets.length; i++) {
        if(bullets[i].val){
          bullets[i].draw();
        }
      }for (var i = 0; i < collection.length; i++) {
        if(collection[i].val){
          chck++;
          collection[i].draw();
        }

      }if(chck === 0){
        reset();
      }if(Ship.val){
        Ship.draw();
      }
      window.requestAnimationFrame(gameLogic);
    }


    reset();
    gameLogic();
    //window.requestAnimationFrame(gameLogic);
