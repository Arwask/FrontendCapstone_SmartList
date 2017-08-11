smartApp.controller('RegisterCtrl', function($scope, $http, $q, $window, UserFactory, ActualURL) {

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
                $window.location.href = `${ActualURL}/main-options`;
            });

        });
    };

$scope.loginWithGoogle = () => {

    UserFactory.logUserWithGoogle()
    .then( (userData) => {
        // console.log("userData", userData.data);
        // $window.location.href = `${ActualURL}/main-options`;
    })
}
});