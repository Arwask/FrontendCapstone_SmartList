'use strict';

smartApp.controller('LoginCtrl', function($scope, UserFactory, $window) {
    
    $scope.loginInfo = {
        email: "",
        password: ""
    };


    $scope.login = () => {
    UserFactory.loginUser($scope.loginInfo)
    .then( (data) => {
        let url = ($window.location.href).split("/");
                  url.pop();
                  url = url.join('/');
                  // console.log("$window.location.href", $window.location.href);
                 console.log("url", url);
                 $window.location.href = `${url}main-options`;
        // $window.location.href = "recipes/view";
        });
    };    
});