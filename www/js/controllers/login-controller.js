'use strict';

smartApp.controller('LoginCtrl', function($scope, UserFactory, $window) {
  //initializing a blank loginInfo Object to watch for user input
  $scope.loginInfo = {
    email: '',
    password: ''
  };

  $scope.login = () => {
    UserFactory.loginUser($scope.loginInfo).then(data => {
      // because the link changes on ionic serve --lab serving according to the open platforms at given point, functionality to navigate according to the given path.
      let url = $window.location.href.split('/');
      url.pop();
      url = url.join('/');
      $window.location.href = `${url}main-options`;
    });
  };
});
