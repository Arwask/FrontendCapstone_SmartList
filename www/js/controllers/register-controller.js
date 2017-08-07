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
            UserFactory.loginUser($scope.registerInfo);
        });
    };

});