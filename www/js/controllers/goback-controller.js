smartApp.controller('goBack', function($scope, $q, $ionicHistory, $window, $ionicSideMenuDelegate, UserFactory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack(); // functionality of the back button on all pages. It keeps tab of the navigation history and when back button is pushed, it goes back to previous page.
  };

  // Toggling of the menu on the right side of the app to access the main tabs at any time in the app.
  $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };

  // The logout button on the menu functionality
  $scope.logOut = () => {
    UserFactory.logout().then(data => {
      $window.location.href = '/';
    });
  };
});
