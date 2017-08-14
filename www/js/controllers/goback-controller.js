smartApp.controller('goBack', function($scope,$q, $ionicHistory, $window, $ionicSideMenuDelegate, UserFactory) {

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  $scope.toggleRightSideMenu = function() {
    console.log("Something clicked?????");
      $ionicSideMenuDelegate.toggleRight();
   };

   $scope.logOut = () => {
    UserFactory.logout()
    .then( (data) => {
        // alert('successfully logged out');
        $window.location.href = "/";
    });
   }

})