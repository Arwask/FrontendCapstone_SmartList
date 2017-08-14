smartApp.controller('goBack', function($scope,$q, $ionicHistory, $ionicSideMenuDelegate) {

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  $scope.toggleRightSideMenu = function() {
    console.log("Something clicked?????");
      $ionicSideMenuDelegate.toggleRight();
   };

})