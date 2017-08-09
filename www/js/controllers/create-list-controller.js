smartApp.controller('CreateListCtrl', function($scope, $window, fbDataFactory, UserFactory) {

    // $scope.listName = "";
    let currentUser = null;
    UserFactory.isAuthenticated()
    .then( (user) => {
        console.log("user??", user);
    currentUser = UserFactory.getUser(); 
    })

    $scope.listObj= {
        uid: currentUser,
        listName: ""
    }

    $scope.addNewList = () => {
        // $scope.$apply()
        $scope.listObj.uid = currentUser; //TODO: make it into one obj. 
        // console.log("currentUser", currentUser);
        console.log("listObj",$scope.listObj );
        fbDataFactory.addNewListToFB($scope.listObj)
        .then( (data) => {
            console.log("new list data?", data);
        })
        .catch( (err) => {
            console.log("err",err );
        });
    }


});