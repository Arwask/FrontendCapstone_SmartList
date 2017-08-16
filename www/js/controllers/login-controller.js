'use strict';

smartApp.controller('LoginCtrl', function($scope, UserFactory, $window) {
    
    $scope.loginInfo = {
        email: "",
        password: ""
    };


    $scope.login = () => {
        console.log("$scope.loginInfo",$scope.loginInfo );
    UserFactory.loginUser($scope.loginInfo)
    .then( (data) => {
        console.log("data",data );
        let url = ($window.location.href).split("/");
                  url.pop();
                  url = url.join('/');
                  // console.log("$window.location.href", $window.location.href);
                 console.log("url", url);
                 $window.location.href = `${url}recipes/view`;
        // $window.location.href = "recipes/view";
        });
    };    
});