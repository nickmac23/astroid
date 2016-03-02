$(document).ready(function(){
  var picArray = ['pic/ships/blueships1.png', 'pic/ships/flacon.png', 'pic/ships/mship1.png', 'pic/ships/topdownfighter.png']
  var count = 0;
  $('#shipPic').attr('src', picArray[count]);
  $('.arrow').on('click', function () {
    if($(this).attr('id')=== 'right'){
      count++;
      if( count > picArray.length - 1 ){
        count = 0;
      }
      $('#shipPic').attr('src', picArray[count]);
    }if($(this).attr('id') === 'left'){
      count--;
      if( count < 0){
        count = picArray.length -1 ;
      }
      $('#shipPic').attr('src', picArray[count]);
    }if($(this).attr('id') === 'launch'){
      console.log('co');
    }
    console.log(count);
  })
})
