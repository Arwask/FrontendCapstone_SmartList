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
        // $window.location.href = "recipes/view";
        });
    };    
});