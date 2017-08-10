smartApp.controller('CreateListCtrl', function($scope, $window, fbDataFactory, UserFactory) {

    // $scope.listName = "";
    let currentUser = null;
    UserFactory.isAuthenticated()
    .then( (user) => {
    currentUser = UserFactory.getUser(); 
    })

    $scope.listObj= {
        uid: currentUser,
        listName: ""
    }

    $scope.addNewList = () => {
        $scope.listObj.uid = currentUser; //TODO: make it into one obj. 
        fbDataFactory.addNewListToFB($scope.listObj)
        .then( (data) => {
            $window.location.reload();
        })
        .catch( (err) => {
            console.log("err",err );
        });
    }


});