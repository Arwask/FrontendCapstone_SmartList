'use strict';

smartApp.controller('SingleFavRecipeCtrl', function($scope, $window, $stateParams,$location, fbDataFactory, RecipeFactory) {
    

    let currentRecipeId = $stateParams.recipeId;  

    $scope.deleteRecipe = () => {
        fbDataFactory.deleteRecipeFromFB(currentRecipeId)
        .then( (responseText) => {
            $window.location.reload();
        })
        .catch( (err) => {
            console.log("err", err);
        });
    };

    RecipeFactory.getSingleRecipeById(currentRecipeId)
    .then( (recievedData) => {
        $scope.recipes = recievedData.data;
        $scope.NavTitle = recievedData.data.title; 
    })
    .catch( (err) => {
        console.log("err",err );
    });
});