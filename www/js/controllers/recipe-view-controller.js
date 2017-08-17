'use strict';

smartApp.controller('RecipeViewCtrl', function($scope, $window,$q, RecipeFactory) {

    RecipeFactory.get10Recipes()
    .then( (recievedRecipes) => {
        $scope.recipes = recievedRecipes.data.recipes;
    })
    .catch( (err) => {
        console.log("Error",err );
    });

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