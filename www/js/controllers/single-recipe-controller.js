'use strict';

smartApp.controller('SingleRecipeCtrl', function($scope, $stateParams, $timeout, $ionicLoading, $ionicPopup, RecipeFactory, fbDataFactory, UserFactory) {
    // console.log("stateParams", $stateParams.recipeId);
    $scope.show = function() {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner>'
    });
    };

     $scope.hide = function(){
        $ionicLoading.hide();
    };


    $scope.show($ionicLoading)
    let Recipeid = $stateParams.recipeId;
    RecipeFactory.getSingleRecipeById(Recipeid)
    .then( (recievedData) => {
        // console.log("recievedData",recievedData.data );
        $scope.recipes = recievedData.data;
        $scope.NavTitle = recievedData.data.title
        $scope.hide($ionicLoading);
    })
    .catch( (err) => {
        console.log("err",err );
    });

    $scope.saveRecipe = () => {
        console.log("clicked save");
        UserFactory.isAuthenticated()
        .then( (user) => {
            let currentUser = UserFactory.getUser();   
            console.log("currentUser??",currentUser );
            let recipeObj = {
                uid: currentUser,
                recipe_id: Recipeid
                };
            fbDataFactory.addRecipeToFirebase(recipeObj)
            .then( (data) => {
                // console.log("data", data);
                var myPopup = $ionicPopup.alert({
                title: 'Successfully saved in Recipe Book',
                template: 'Access it any time via Recipe Book option.'
                });
                myPopup.then(function(res) {
                 
                 // console.log('They better select a list');
                });
                $timeout(function() {
                    myPopup.close(); // close the popup after 3 seconds for some reason
                }, 2000);
            });
        });
    };
});