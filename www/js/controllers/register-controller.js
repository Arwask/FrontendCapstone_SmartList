'use strict';

smartApp.controller('RegisterCtrl', function($scope, $http, $q, $window, UserFactory) {

$scope.registerInfo = {
    email: "",
    password:""
};

$scope.register = () => {
        //TODO: validate that user doesn't exist
        console.log("You clicked register");
        console.log("$scope.registerInfo", $scope.registerInfo);
        UserFactory.createUser($scope.registerInfo)
        .then( (userData) => {
            console.log("New User:", userData);
            UserFactory.loginUser($scope.registerInfo)
            .then( (data) => {
                let url = ($window.location.href).split("/");
                  url.pop();
                  url = url.join('/');
                  // console.log("$window.location.href", $window.location.href);
                 console.log("url", url);
                 $window.location.href = `${url}main-options`;
            });

        });
    };

$scope.loginWithGoogle = () => {

    UserFactory.logUserWithGoogle()
    .then( (userData) => {
        let url = ($window.location.href).split("/");
        url.pop();
        url = url.join('/');
        console.log("$window.location.href", $window.location.href);
        console.log("url", url);
        $window.location.href = `${url}main-options`;
    });
};
});