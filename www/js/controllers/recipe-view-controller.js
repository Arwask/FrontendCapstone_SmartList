'use strict';

smartApp.controller('RecipeViewCtrl', function($scope, $window,$q,$ionicLoading, RecipeFactory) {

    $scope.show = function() {
    $ionicLoading.show({
      template:'<ion-spinner></ion-spinner>'
    });
    };

     $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.show($ionicLoading)
    RecipeFactory.get10Recipes()
    .then( (recievedRecipes) => {
        $scope.recipes = recievedRecipes.data.recipes;
        $scope.hide($ionicLoading);
    })
    .catch( (err) => {
        console.log("Error",err );
    })
    // .finally( ($ionicLoading) => {
    // })

    let recipeIdArray = [];

    $scope.searchedRecipe = (searchText) => {

        RecipeFactory.searchedRecipes(searchText)
        .then( (searchedData) => {
            searchedData.data.forEach( (recipe) => {
                recipeIdArray.push(recipe.id);
            });
            RecipeFactory.getRecipeById(recipeIdArray)  
            .then( (Recipedata) => {
                $scope.recipes = Recipedata;
            });
        })
        .catch( (err) => {
            console.log("err",err );
        });
    };

});