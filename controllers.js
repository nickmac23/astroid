app.controller('SpaceController', function($scope, $firebaseArray){

   var shipsRef = new Firebase("https://spacearena.firebaseio.com/ships");
   $scope.ships = $firebaseArray(shipsRef);

   $scope.addShip = function(name) {
   $scope.tempShipObj = {};
   $scope.tempShipObj.shipName = name;

     $scope.ships.$add($scope.tempShipObj).then(function(data){

          })

   }
   


})
