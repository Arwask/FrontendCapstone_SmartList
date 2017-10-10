'use strict';

smartApp.controller('RegisterCtrl', function($scope, $http, $q, $window, UserFactory) {
  $scope.registerInfo = {
    email: '',
    password: ''
  };

  $scope.register = () => {
    //TODO: validate that user doesn't exist
    UserFactory.createUser($scope.registerInfo).then(userData => {
      UserFactory.loginUser($scope.registerInfo).then(data => {
        //dynamic url navigation because the url changes according to the platforms open in the browser when using ionic serve --lab for serving on local host. Navigate them to main page once done
        let url = $window.location.href.split('/');
        url.pop();
        url = url.join('/');
        $window.location.href = `${url}main-options`;
      });
    });
  };

  //dynamic url change as above. Navigate to Main options page once done.
  $scope.loginWithGoogle = () => {
    UserFactory.logUserWithGoogle().then(userData => {
      let url = $window.location.href.split('/');
      url.pop();
      url = url.join('/');
      $window.location.href = `${url}main-options`;
    });
  };
});
