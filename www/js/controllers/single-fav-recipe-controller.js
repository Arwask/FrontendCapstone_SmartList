'use strict';

smartApp.controller('SingleFavRecipeCtrl', function($scope, $window, $stateParams,$location, fbDataFactory, RecipeFactory) {
    
    let currentRecipeId = $stateParams.recipeId;
    console.log("currentRecipeId", currentRecipeId);
    

    $scope.deleteRecipe = () => {
        fbDataFactory.deleteRecipeFromFB(currentRecipeId)
        .then( (responseText) => {
            console.log("response check?", responseText);
            $window.location.reload();
        })
        .catch( (err) => {
            console.log("err", err);
        });
    };

    RecipeFactory.getSingleRecipeById(currentRecipeId)
    .then( (recievedData) => {
        console.log("recievedData",recievedData.data );
        $scope.recipes = recievedData.data;
        // console.log("$scope.recipes",$scope.recipes.title);
    })
    .catch( (err) => {
        console.log("err",err );
    });
});