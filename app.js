var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth * 0.7;
ctx.canvas.height = window.innerHeight * 0.87;
var level = 0;
var score = 0;
var astroidTD = localStorage.getItem('stroidTD') >= 0 ? +localStorage.getItem('stroidTD') : 0;

$(document).ready(function(){
  var nameS = localStorage.getItem('captain') ? localStorage.getItem('captain') : '';
  var picArray = ['pic/ships/blueships1.png', 'pic/ships/flacon.png', 'pic/ships/mship1.png', 'pic/ships/topdownfighter.png']
  var picCount = 0;

  if( nameS === ''){
    $('#bName').on('click', function () {
      var nameS = $('#name').val();
      localStorage.setItem('captain', nameS );
      $('header').html('<h1> Welcome aboard ' + nameS + '! </h1><h5> Our warpdrive has malfunctioned and dropped us into an astroid feild! <br> Your mission is to clear all the astroids! Launch your ship as soon as you are ready. </h5>'  )

    })
  }else{
    $('header').html('<h1> Welcome back Captain ' + nameS +'! Your ship is ready:')
  }
  $('#shipPic').attr('src', picArray[picCount]);

  $('.arrow').on('click', function () {
    if($(this).attr('id')=== 'right'){
      picCount++;
      if( picCount > picArray.length - 1 ){
        picCount = 0;
      }
      $('#shipPic').attr('src', picArray[picCount]);
    }if($(this).attr('id') === 'left'){
      picCount--;
      if( picCount < 0){
        picCount = picArray.length -1 ;
      }
      $('#shipPic').attr('src', picArray[picCount]);
    }if($(this).attr('id') === 'launch'){
      update('R')
      game(picArray[picCount]);
      $('header').html('<h1> Warning... Astroids Approching! </h1>');
      $('header').css('background-color', 'rgb(219, 230, 14)');
    }

  })
  function update (x){
    if(x === 'R'){ level = 0; score = 0;}
    if(x === 'L'){level++};
    if(x === 'S'){score += 100};
    if(x === 's')(score += 10);
    if( x === 'A'){
      astroidTD++;
      localStorage.setItem('stroidTD', astroidTD);
    }
    $('#scoreBoard').html('<h2> Lvl: ' + level + '</h2> <p> current score: ' + score + '</p> <h3> Astroids destroyed: ' + astroidTD + '</h3>')
  }

function game (shipPic) {
  var ship1 = new Image();
    ship1.src = shipPic;
  var bullet1 = new Image();
    bullet1.src = 'pic/Bluecenter.png';
  var astroidMed = new Image();
    astroidMed.src = 'pic/Astromedium.png'
  var astroidBig = new Image();
    astroidBig.src = 'pic/Asteroid.png'
  var explode = new Image();
    explode.src = 'pic/boom.png'
  var count = 0;


  var ship = new Ships (ship1, move);

  var collection = [];
  var breakArray = [];
  var small = 2;
  var big = 1;
  function reset () {
    collection = [];
    for (var x = 0; x < small; x++ ) { collection.push(new Asteroids (100, 100, 'small', astroidMed, ship, bullets, update, breaker)) };
    for (var x = 0; x < big; x++) { collection.push(new Asteroids (150, 120, 'big', astroidBig, ship, bullets, update, breaker)) };
    for (var i = 0; i < collection.length; i++) {
      collection[i].start();
    }
    small++;
    big++;
  }
  function breaker (x, y) {
    for (var i = 0; i < 2; i++) {
      collection.push(new Asteroids (100, 100, 'small', astroidMed, ship, bullets, update, breaker));
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
  var bullets =[bul1 = new Bullets (0, 0, ship.rad), bul2 = new Bullets (0, 0, ship.rad), bul3 = new Bullets (0, 0, ship.rad)];

  var keysDown = {};
  addEventListener("keydown", function (e) {
    if( e.which === 32 && ship.val === true){
        bullets[count].fire(ship.x, ship.y, ship.rad, true);
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
    ship.rad = (Math.PI/180)*degree;
    if(38 in keysDown){
      ship.vx += ship.thrust * Math.sin(ship.rad);
      ship.vy += ship.thrust * Math.cos(ship.rad);
    }if(40 in keysDown){
      ship.vx -= ship.thrust * Math.sin(ship.rad);
      ship.vy -= ship.thrust * Math.cos(ship.rad);
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
        update('L');
        update('S')
        reset();
      }if(ship.val){
        ship.draw();
      }
      window.requestAnimationFrame(gameLogic);
    }


    reset();
    gameLogic();
}
});
