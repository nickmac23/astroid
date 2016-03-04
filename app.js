var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth * 0.75;
ctx.canvas.height = window.innerHeight * 0.75;
var highScore = localStorage.getItem('score') >= 0 ? +localStorage.getItem('score') : 0;
var nameS = localStorage.getItem('captain') ? localStorage.getItem('captain') : 'recruit';

$(document).ready(function(){

  var scoreListRef = new Firebase('https://astroidz.firebaseio.com/');
  var smallAstroid = 2;
  var bigAstroid = 1;
  var level = 0;
  var score = 0;
  var astroidTD = localStorage.getItem('stroidTD') >= 0 ? +localStorage.getItem('stroidTD') : 0;
  var picArray = ['pic/ships/blueships1.png', 'pic/ships/flacon.png', 'pic/ships/mship1.png', 'pic/ships/topdownfighter.png']
  var picCount = 0;

  if( nameS === 'recruit'){
    $('#bName').on('click', function () {
      var nameS = $('#name').val();
      localStorage.setItem('captain', nameS );
      $('footer').html('<h2> Welcome ' + nameS + '! Click on the arrow keys to scroll through the ships. Press the launch button when you are ready to play.  Use arrow keys to move and space bar to shoot.</h2>'  )

    })
  }else{
    $('footer').html('<h1> Welcome back ' + nameS +'! Your ship is ready.')
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
      smallAstroid = 2;
      bigAstroid = 1;
      update('R', ship.val);
      game(picArray[picCount]);
    }
  })

  function animate(val) {
    if(val){
      $('.lBoard').attr('value', 0);
      $('header').hide('slow');
      $('footer').hide('slow');
      $('#ship').hide('slow');
      $('#ladderBoard').hide('slow');
      $('#scoreBoard').css('position', 'fixed').css('background-color', 'transparent').css('color', 'white').css('border', 'none').css('top', '2px').css('left', '2px');
      $('canvas').show();
    }else{
      $('canvas').hide();
      $('header').show('slow');
      $('footer').show('slow');
      $('#scoreBoard').hide();
      $('#scoreBoard').css('position', 'static').css('background-color', 'rgba(172, 172, 164, 0.87)').css('color', 'black').css('border', 'black 1px solid');
      $('nav').show('slow');
    }
  }

  function update (x, dead){

    if(x === 'R'){ level = 0; score = 0;}
    if(x === 'L'){level++};
    if(x === 'S'){score += 100};
    if(x === 's')(score += 10);
    if(dead && localStorage.getItem('score') < score){
      localStorage.setItem('score', score);
      highScore = localStorage.getItem('score');
      fireName = typeof localStorage.getItem('captain') === 'string' ?  localStorage.getItem('captain') : 'recruit' ;
      var userScoreRef = scoreListRef.child(fireName);
      userScoreRef.setWithPriority({name:fireName, score:highScore}, -1  * highScore);

    }
    if( x === 'A'){
      astroidTD++;
      localStorage.setItem('stroidTD', astroidTD);
    }
    $('#scoreBoard').html('<p> Lvl: ' + level + '<br> High score: ' + highScore+ '<br> current score: '+ score  + ' <br> Asteroids destroyed: ' + astroidTD + '</p>')

  }

function game (shipPic) {
  animate(true);

  var ship1 = new Image();
    ship1.src = shipPic;
  var astroidMed = new Image();
    astroidMed.src = 'pic/Astromedium.png'
  var astroidBig = new Image();
    astroidBig.src = 'pic/Asteroid.png'
  var astroidtinny = new Image();
    astroidtinny.src = 'pic/tinnya.png'


  var ship = new Ships (ship1, move);

  var collection = [];
  var breakArray = [];
  function reset () {
    collection = [];
    for (var x = 0; x < smallAstroid; x++ ) { collection.push(new Asteroids (100, 100, 'small', astroidMed, ship, bullets, update, breaker)) };
    for (var x = 0; x < bigAstroid; x++) { collection.push(new Asteroids (150, 120, 'big', astroidBig, ship, bullets, update, breaker)) };
    for (var i = 0; i < collection.length; i++) {
      collection[i].start();
    }
    smallAstroid++;
    bigAstroid++;
  }
  function breaker (x, y, size) {
    var aSize = size === 'big' ? 'small' : 'tinny';
    var aPic = size === 'big' ? astroidMed : astroidtinny;
    for (var i = 0; i < 2; i++) {
      collection.push(new Asteroids (100, 100, aSize, aPic, ship, bullets, update, breaker));
      collection[ collection.length - 1].start(x, y)
    }
  }
  var bullets =[bul1 = new Bullets (0, 0, ship.rad), bul2 = new Bullets (0, 0, ship.rad), bul3 = new Bullets (0, 0, ship.rad)];
  var count = 0;

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
        update('L', ship.val);
        update('S', ship.val)
        reset();
      }if(ship.val){
        ship.draw();
      }else{
        animate(false);
        return;
      }
      window.requestAnimationFrame(gameLogic);
    }

    reset();
    gameLogic();
  }

  scoreListRef.on("child_added", function(snapshot) {
    var scores = snapshot.val();
    ladderBoard (scores.name, scores.score);
  })

    function ladderBoard (nm, sc){
      if(+sc > $('#1').attr('value')){
        $('#1').text('1st place: '+ nm + '-' + sc + 'pts');
        $('#1').attr('value', sc);
        return

      }if(+sc > $('#2').attr('value')){
        $('#2').text('2nd place: '+ nm + '-' + sc + 'pts');
        $('#2').attr('value', sc);
        return

      }if(+sc > $('#3').attr('value')){
        $('#3').text('3rd place: '+ nm + '-' + sc + 'pts');
        $('#3').attr('value', sc);
        return

      }if(+sc > $('#4').attr('value')){
        $('#4').text('4th place: '+ nm + '-' + sc + 'pts');
        $('#4').attr('value', sc);
        return

      }if(+sc > $('#5').attr('value')){
        $('#5').text('5th place: '+ nm + '-' + sc + 'pts');
        $('#5').attr('value', sc);
        return
      }

    }
  update();
});
